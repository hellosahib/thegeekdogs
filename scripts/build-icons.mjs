#!/usr/bin/env node
/**
 * build-icons — DESIGN.md §B.12.
 *
 * Four files, all exported from the one SVG, which is the source of truth. Run this
 * after editing `public/favicon.svg` and never hand-edit a PNG.
 *
 * No .ico and no 16px PNG: §B.12 authors the geometry on a 32 grid precisely so the
 * 32px PNG downsamples cleanly to 16, and no maskable variant, because a maskable icon
 * needs 40% safe padding and that shrinks the cone to the size the mark was designed to
 * avoid. `apple-touch-icon.png` is full-bleed and opaque — iOS masks it, and a
 * self-rounded tile gets rounded twice.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const PUBLIC = new URL('../public/', import.meta.url).pathname;
const source = readFileSync(join(PUBLIC, 'favicon.svg'));

const OUT = [
  { file: 'favicon-32.png', size: 32 },
  { file: 'apple-touch-icon.png', size: 180 },
  { file: 'icon-512.png', size: 512 },
];

for (const { file, size } of OUT) {
  await sharp(source, { density: 2400 })
    .resize(size, size, { fit: 'fill' })
    .png({ compressionLevel: 9, palette: true })
    .toFile(join(PUBLIC, file));
  console.log(`      ${file}  ${size} x ${size}`);
}
console.log('PASS  build-icons');
