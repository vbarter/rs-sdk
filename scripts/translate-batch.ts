#!/usr/bin/env bun
/**
 * Batch translation helper.
 * Reads zh_extracted.json, splits into batches, outputs batch files for manual/AI translation.
 *
 * Usage:
 *   bun scripts/translate-batch.ts split   # Split into batch files
 *   bun scripts/translate-batch.ts merge   # Merge translated batches back
 *   bun scripts/translate-batch.ts stats   # Show translation progress
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync } from 'fs';
import { resolve, join } from 'path';

const EXTRACTED = resolve(import.meta.dir, '../server/engine/translations/zh_extracted.json');
const BATCH_DIR = resolve(import.meta.dir, '../server/engine/translations/batches');
const OUTPUT = resolve(import.meta.dir, '../server/engine/translations/zh.json');

const BATCH_SIZE = 200;

const command = process.argv[2] || 'stats';

if (command === 'split') {
    const data = JSON.parse(readFileSync(EXTRACTED, 'utf-8'));
    const entries = Object.entries(data).filter(
        ([k, v]) => !k.startsWith('_meta') && !k.startsWith('==') && typeof v === 'string'
    );

    if (!existsSync(BATCH_DIR)) {
        mkdirSync(BATCH_DIR, { recursive: true });
    }

    const totalBatches = Math.ceil(entries.length / BATCH_SIZE);
    console.log(`Splitting ${entries.length} entries into ${totalBatches} batches of ${BATCH_SIZE}`);

    for (let i = 0; i < totalBatches; i++) {
        const batch = entries.slice(i * BATCH_SIZE, (i + 1) * BATCH_SIZE);
        const batchObj: Record<string, string> = {};
        for (const [k, v] of batch) {
            batchObj[k] = v as string;
        }
        const batchFile = join(BATCH_DIR, `batch_${String(i + 1).padStart(3, '0')}.json`);
        writeFileSync(batchFile, JSON.stringify(batchObj, null, 4), 'utf-8');
    }

    console.log(`Created ${totalBatches} batch files in ${BATCH_DIR}`);
} else if (command === 'merge') {
    // Merge all batch files and existing zh.json
    const existing = existsSync(OUTPUT) ? JSON.parse(readFileSync(OUTPUT, 'utf-8')) : {};

    const batchFiles = existsSync(BATCH_DIR)
        ? readdirSync(BATCH_DIR)
              .filter((f) => f.endsWith('.json'))
              .sort()
        : [];

    let merged = 0;
    for (const file of batchFiles) {
        const batch = JSON.parse(readFileSync(join(BATCH_DIR, file), 'utf-8'));
        for (const [k, v] of Object.entries(batch)) {
            if (typeof v === 'string' && v !== k) {
                // Only merge if actually translated (value differs from key)
                existing[k] = v;
                merged++;
            }
        }
    }

    writeFileSync(OUTPUT, JSON.stringify(existing, null, 4), 'utf-8');
    console.log(`Merged ${merged} translations into ${OUTPUT}`);
} else {
    // Stats
    const data = JSON.parse(readFileSync(EXTRACTED, 'utf-8'));
    const entries = Object.entries(data).filter(
        ([k]) => !k.startsWith('_meta') && !k.startsWith('==')
    );

    const existing = existsSync(OUTPUT) ? JSON.parse(readFileSync(OUTPUT, 'utf-8')) : {};
    const translated = Object.entries(existing).filter(
        ([k, v]) => typeof v === 'string' && v !== k && v !== '' && !k.startsWith('==') && !k.startsWith('_')
    );

    console.log(`Total extracted: ${entries.length}`);
    console.log(`Already translated: ${translated.length}`);
    console.log(`Remaining: ${entries.length - translated.length}`);
}
