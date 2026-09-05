#!/usr/bin/env node
/**
 * Copies the self-hosted variable font binaries out of the Fontsource packages
 * into public/fonts/, so the site never touches a font CDN (brief §11).
 *
 * PLAN.md §1.5 names the exact builds:
 *   Anek Latin     — latin-standard (wght 100-800 + wdth 75-125), the display/numeral face.
 *   Instrument Sans — latin-wght (wght 400-700), the body face.
 *
 * Run: npm run fonts:sync
 */
import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'public', 'fonts');

const FILES = [
  [
    'node_modules/@fontsource-variable/anek-latin/files/anek-latin-latin-standard-normal.woff2',
    'anek-latin-latin-standard-normal.woff2',
  ],
  [
    'node_modules/@fontsource-variable/instrument-sans/files/instrument-sans-latin-wght-normal.woff2',
    'instrument-sans-latin-wght-normal.woff2',
  ],
];

mkdirSync(out, { recursive: true });

let total = 0;
for (const [from, name] of FILES) {
  const src = join(root, from);
  const dest = join(out, name);
  copyFileSync(src, dest);
  const bytes = statSync(dest).size;
  total += bytes;
  console.log(`${name.padEnd(48)} ${String(bytes).padStart(7)} B`);
}
console.log(`${'total'.padEnd(48)} ${String(total).padStart(7)} B (${(total / 1024).toFixed(1)} KB)`);
