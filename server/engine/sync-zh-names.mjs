/**
 * Sync ZH_NAMES from webclient I18n.ts into server translations/zh.json
 *
 * - Extracts ZH_NAMES key-value pairs from I18n.ts
 * - Replaces Chinese punctuation with English punctuation in values
 * - Adds an "== Item / Entity Names ==" section marker before "== Skill Names =="
 * - Inserts all new entries (skipping existing keys) after that marker
 * - Writes back valid JSON with 4-space indent
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// --- Step 1: Read and parse ZH_NAMES from I18n.ts ---
const i18nPath = resolve(__dirname, '../webclient/src/util/I18n.ts');
const i18nContent = readFileSync(i18nPath, 'utf8');

// Extract the ZH_NAMES block
const startMarker = 'const ZH_NAMES: Record<string, string> = {';
const startIdx = i18nContent.indexOf(startMarker);
if (startIdx === -1) {
    console.error('ERROR: Could not find ZH_NAMES in I18n.ts');
    process.exit(1);
}

// Find the matching closing `};`
let braceDepth = 0;
let endIdx = -1;
for (let i = startIdx + startMarker.length - 1; i < i18nContent.length; i++) {
    if (i18nContent[i] === '{') braceDepth++;
    else if (i18nContent[i] === '}') {
        braceDepth--;
        if (braceDepth === 0) {
            endIdx = i + 1;
            break;
        }
    }
}

if (endIdx === -1) {
    console.error('ERROR: Could not find closing brace of ZH_NAMES');
    process.exit(1);
}

const zhNamesBlock = i18nContent.substring(startIdx + startMarker.length, endIdx - 1);

// Parse key-value pairs from the TypeScript object literal
// Handles both 'key': 'value' and "key": 'value' styles
const zhNames = new Map();
const entryRegex = /(?:'([^']*(?:\\.[^']*)*)'|"([^"]*(?:\\.[^"]*)*)")\s*:\s*'([^']*(?:\\.[^']*)*)'/g;
let match;
while ((match = entryRegex.exec(zhNamesBlock)) !== null) {
    const key = match[1] ?? match[2];
    const value = match[3];
    zhNames.set(key, value);
}

console.log(`Extracted ${zhNames.size} entries from ZH_NAMES`);

// --- Step 2: Read zh.json ---
const zhJsonPath = resolve(__dirname, 'translations/zh.json');
const zhJsonContent = readFileSync(zhJsonPath, 'utf8');
const zhJson = JSON.parse(zhJsonContent);

console.log(`Existing zh.json has ${Object.keys(zhJson).length} entries`);

// --- Step 3: Replace Chinese punctuation in values ---
function replacePunctuation(str) {
    return str
        .replace(/\uff01/g, '!')   // ！ -> !
        .replace(/\uff1f/g, '?')   // ？ -> ?
        .replace(/\u3002/g, '.')   // 。 -> .
        .replace(/\uff0c/g, ',');  // ， -> ,
}

// --- Step 4: Build new zh.json with the marker and entries ---
// We need to insert "== Item / Entity Names ==" and the new entries
// right before "== Skill Names =="

const skillNamesKey = '== Skill Names ==';
const newSectionKey = '== Item / Entity Names ==';

// Check which keys already exist
let addedCount = 0;
let skippedCount = 0;

// Build ordered entries: everything before "== Skill Names ==",
// then the new section marker + new entries, then the rest.
const oldKeys = Object.keys(zhJson);
const skillIdx = oldKeys.indexOf(skillNamesKey);

if (skillIdx === -1) {
    console.error('ERROR: Could not find "== Skill Names ==" in zh.json');
    process.exit(1);
}

// Collect new entries (not already in zh.json)
const newEntries = new Map();
for (const [key, value] of zhNames) {
    if (!(key in zhJson)) {
        newEntries.set(key, replacePunctuation(value));
        addedCount++;
    } else {
        skippedCount++;
    }
}

console.log(`Will add ${addedCount} new entries, skipping ${skippedCount} existing`);

// Reconstruct the JSON object in order
const result = {};

for (let i = 0; i < oldKeys.length; i++) {
    const key = oldKeys[i];

    // Insert our new section right before "== Skill Names =="
    if (key === skillNamesKey) {
        result[newSectionKey] = '';
        for (const [nk, nv] of newEntries) {
            result[nk] = nv;
        }
    }

    result[key] = zhJson[key];
}

// --- Step 5: Write back ---
const output = JSON.stringify(result, null, 4);
writeFileSync(zhJsonPath, output + '\n', 'utf8');

console.log(`Written zh.json with ${Object.keys(result).length} total entries`);
console.log('Done!');
