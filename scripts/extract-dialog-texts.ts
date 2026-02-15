#!/usr/bin/env bun
/**
 * Extract all dialog texts from .rs2 script files for translation.
 *
 * Scans server/content/scripts/**\/*.rs2 and extracts:
 * - ~chatnpc("...") → NPC dialog text (strips <p,xxx> prefix)
 * - ~chatplayer("...") → Player dialog text (strips <p,xxx> prefix)
 * - ~mesbox("...") → System message box text
 * - ~p_choice2/3/4/5("text", id, ...) → Dialog choice option texts
 * - ~p_choice2/3/4/5_header(..., "header") → Header texts
 * - ~chatnpc_specific("name", npc, "text") → NPC-specific dialog + name
 *
 * Output: server/engine/translations/zh_extracted.json
 *   Format: { "English text": "English text", ... } (placeholder for translation)
 */

import { readdirSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { join, resolve } from 'path';

const SCRIPTS_DIR = resolve(import.meta.dir, '../server/content/scripts');
const OUTPUT_FILE = resolve(import.meta.dir, '../server/engine/translations/zh_extracted.json');
const EXISTING_ZH = resolve(import.meta.dir, '../server/engine/translations/zh.json');

// Collect all unique texts
const texts = new Set<string>();
// Collect NPC names separately
const npcNames = new Set<string>();

// Stats
const stats = {
    chatnpc: 0,
    chatplayer: 0,
    mesbox: 0,
    pchoice: 0,
    chatnpc_specific: 0,
    skippedVariable: 0,
    totalFiles: 0,
};

/**
 * Strip <p,emotion> prefix from text.
 * The server's SPLIT_INIT handler does this before translation.
 */
function stripEmotionPrefix(text: string): string {
    if (text.startsWith('<p,') && text.indexOf('>') !== -1) {
        return text.substring(text.indexOf('>') + 1);
    }
    return text;
}

/**
 * Check if text contains dynamic variables that prevent static translation.
 * We still include texts with <displayname> since that's a fixed placeholder.
 */
function hasUntranslatableVariables(text: string): boolean {
    // Skip texts that are purely variable references
    if (text.startsWith('$')) return true;

    // Allow <displayname> - it's a fixed tag preserved in translation
    // Allow <br> - line break tag
    const withoutDisplayname = text.replace(/<displayname>/gi, '').replace(/<br>/gi, '');

    // Check for dynamic variables like <$var>, <tostring(...)>, <nc_name(...)>, etc.
    // But NOT <p,xxx> which we already stripped
    if (/<\$[^>]+>/.test(withoutDisplayname)) return true;
    if (/<tostring\([^)]+\)>/.test(withoutDisplayname)) return true;
    if (/<nc_name\([^)]+\)>/.test(withoutDisplayname)) return true;
    if (/<oc_name\([^)]+\)>/.test(withoutDisplayname)) return true;
    if (/<lc_name\([^)]+\)>/.test(withoutDisplayname)) return true;
    if (/<lowercase\([^)]+\)>/.test(withoutDisplayname)) return true;
    if (/<uppercase\([^)]+\)>/.test(withoutDisplayname)) return true;
    if (/<plural\([^)]+\)>/.test(withoutDisplayname)) return true;
    if (/<enum\([^)]+\)>/.test(withoutDisplayname)) return true;

    return false;
}

function addText(text: string): void {
    const stripped = stripEmotionPrefix(text.trim());
    if (!stripped || stripped.length === 0) return;

    if (hasUntranslatableVariables(stripped)) {
        stats.skippedVariable++;
        return;
    }

    texts.add(stripped);
}

/**
 * Find all .rs2 files recursively
 */
function findRs2Files(dir: string): string[] {
    const files: string[] = [];

    function walk(d: string) {
        for (const entry of readdirSync(d, { withFileTypes: true })) {
            const fullPath = join(d, entry.name);
            if (entry.isDirectory()) {
                walk(fullPath);
            } else if (entry.name.endsWith('.rs2')) {
                files.push(fullPath);
            }
        }
    }

    walk(dir);
    return files;
}

/**
 * Extract all quoted strings from a function call.
 * Handles nested quotes and multi-argument patterns.
 */
function extractQuotedStrings(line: string, startIdx: number): string[] {
    const results: string[] = [];
    let i = startIdx;

    while (i < line.length) {
        // Find next opening quote
        const quoteStart = line.indexOf('"', i);
        if (quoteStart === -1) break;

        // Find closing quote (handle escaped quotes)
        let quoteEnd = quoteStart + 1;
        while (quoteEnd < line.length) {
            if (line[quoteEnd] === '\\' && quoteEnd + 1 < line.length) {
                quoteEnd += 2; // skip escaped char
                continue;
            }
            if (line[quoteEnd] === '"') break;
            quoteEnd++;
        }

        if (quoteEnd < line.length) {
            results.push(line.substring(quoteStart + 1, quoteEnd));
        }
        i = quoteEnd + 1;
    }

    return results;
}

function processFile(filePath: string): void {
    const content = readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    for (const line of lines) {
        const trimmed = line.trim();

        // ~chatnpc("text")
        const chatnpcMatch = trimmed.match(/~chatnpc\s*\("([^"]+)"\)/);
        if (chatnpcMatch) {
            addText(chatnpcMatch[1]);
            stats.chatnpc++;
        }

        // ~chatplayer("text")
        const chatplayerMatch = trimmed.match(/~chatplayer\s*\("([^"]+)"\)/);
        if (chatplayerMatch) {
            addText(chatplayerMatch[1]);
            stats.chatplayer++;
        }

        // ~mesbox("text")
        const mesboxMatch = trimmed.match(/~mesbox\s*\("([^"]+)"\)/);
        if (mesboxMatch) {
            addText(mesboxMatch[1]);
            stats.mesbox++;
        }

        // ~chatnpc_specific("name", npc_id, "text")
        // Also handle nc_name(xxx) as first arg
        const specificMatch = trimmed.match(/~chatnpc_specific\s*\("([^"]+)",\s*\w+,\s*"([^"]+)"\)/);
        if (specificMatch) {
            // First arg is NPC name (if it's a string literal, not a function)
            npcNames.add(specificMatch[1]);
            addText(specificMatch[2]);
            stats.chatnpc_specific++;
        }

        // ~p_choice2("text", id, "text", id)
        // ~p_choice3("text", id, "text", id, "text", id)
        // ~p_choice4(...) ~p_choice5(...)
        // ~p_choice2_header(..., "header")
        const pchoiceMatch = trimmed.match(/~p_choice[2-5](?:_header)?\s*\(/);
        if (pchoiceMatch) {
            const startIdx = trimmed.indexOf('(', trimmed.indexOf('~p_choice'));
            const quoted = extractQuotedStrings(trimmed, startIdx);
            for (const q of quoted) {
                // Skip very short or numeric-only strings
                if (q.length > 0 && !/^\d+$/.test(q)) {
                    addText(q);
                    stats.pchoice++;
                }
            }
        }

        // ~objbox(obj_id, "text") or ~objbox(obj_id, zoom, "text")
        const objboxMatch = trimmed.match(/~objbox\s*\([^,]+,\s*(?:\d+,\s*)?"([^"]+)"\)/);
        if (objboxMatch) {
            addText(objboxMatch[1]);
        }

        // ~chatobj("text", obj_id, zoom) pattern
        const chatobjMatch = trimmed.match(/~chatobj\s*\("([^"]+)"/);
        if (chatobjMatch) {
            addText(chatobjMatch[1]);
        }
    }
}

// Main
console.log('Scanning .rs2 files...');
const rs2Files = findRs2Files(SCRIPTS_DIR);
stats.totalFiles = rs2Files.length;
console.log(`Found ${rs2Files.length} .rs2 files`);

for (const file of rs2Files) {
    processFile(file);
}

console.log('\n=== Extraction Stats ===');
console.log(`Total files scanned: ${stats.totalFiles}`);
console.log(`~chatnpc calls: ${stats.chatnpc}`);
console.log(`~chatplayer calls: ${stats.chatplayer}`);
console.log(`~mesbox calls: ${stats.mesbox}`);
console.log(`~p_choice options: ${stats.pchoice}`);
console.log(`~chatnpc_specific: ${stats.chatnpc_specific}`);
console.log(`Skipped (dynamic variables): ${stats.skippedVariable}`);
console.log(`\nUnique texts extracted: ${texts.size}`);
console.log(`Unique NPC names: ${npcNames.size}`);

// Load existing translations to exclude already-translated texts
let existingTranslations: Record<string, string> = {};
if (existsSync(EXISTING_ZH)) {
    try {
        existingTranslations = JSON.parse(readFileSync(EXISTING_ZH, 'utf-8'));
    } catch (e) {
        console.warn('Could not parse existing zh.json');
    }
}

const alreadyTranslated = new Set<string>();
for (const [key, value] of Object.entries(existingTranslations)) {
    if (typeof value === 'string' && value !== key && value !== '' && !key.startsWith('==')) {
        alreadyTranslated.add(key);
    }
}

// Build output: only texts not yet translated
const output: Record<string, string> = {};
const sortedTexts = [...texts].sort();

let newCount = 0;
for (const text of sortedTexts) {
    if (!alreadyTranslated.has(text)) {
        output[text] = text; // placeholder: English = English
        newCount++;
    }
}

// Add NPC names section
const npcOutput: Record<string, string> = {};
const sortedNames = [...npcNames].sort();
for (const name of sortedNames) {
    if (!alreadyTranslated.has(name)) {
        npcOutput[name] = name;
    }
}

console.log(`\nAlready translated: ${alreadyTranslated.size}`);
console.log(`New texts to translate: ${newCount}`);
console.log(`New NPC names to translate: ${Object.keys(npcOutput).length}`);

// Write output
const finalOutput = {
    _meta: {
        description: 'Extracted dialog texts for translation',
        totalTexts: newCount,
        npcNames: Object.keys(npcOutput).length,
        generatedAt: new Date().toISOString(),
    },
    '== Dialog Texts ==': '',
    ...output,
    '== NPC Names ==': '',
    ...npcOutput,
};

writeFileSync(OUTPUT_FILE, JSON.stringify(finalOutput, null, 4), 'utf-8');
console.log(`\nWritten to: ${OUTPUT_FILE}`);
