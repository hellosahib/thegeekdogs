#!/usr/bin/env node
/**
 * qa:weight — the gzip measurement behind PLAN.md §7's budget table.
 *
 * Reports the gzipped size of every JS and CSS file in dist/, plus the font
 * payload and the total page weight of the home page, against the brief §11
 * lines. Lighthouse CI asserts the same numbers over a real server; this script
 * gives them locally, per file, so a regression has a name attached.
 */
import { existsSync, readFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { join } from 'node:path';
import { DIST, rel, report, requireDist, walk } from './lib/dist.mjs';

requireDist();

const BUDGETS = {
  script: 100 * 1024,
  stylesheet: 40 * 1024,
  total: 1258291,
};

function gz(file) {
  return gzipSync(readFileSync(file)).byteLength;
}

function group(extension) {
  return walk(DIST, (f) => f.endsWith(extension)).map((file) => ({
    file,
    raw: readFileSync(file).byteLength,
    gzipped: gz(file),
  }));
}

const scripts = group('.js');
const styles = group('.css');
// woff2 already carries its own Brotli-based compression; gzip does not shrink
// it further (PLAN.md §1.5), so raw bytes are the transfer bytes.
const fonts = walk(DIST, (f) => f.endsWith('.woff2')).map((file) => ({
  file,
  raw: readFileSync(file).byteLength,
  gzipped: readFileSync(file).byteLength,
}));

function total(list) {
  return list.reduce((sum, item) => sum + item.gzipped, 0);
}

function print(label, list) {
  console.log(`      ${label}`);
  if (list.length === 0) console.log('        (none)');
  for (const item of list) {
    console.log(`        ${rel(item.file).padEnd(56)} ${String(item.raw).padStart(8)} B raw  ${String(item.gzipped).padStart(8)} B gz`);
  }
  console.log(`        ${'subtotal'.padEnd(56)} ${''.padStart(8)}      ${String(total(list)).padStart(8)} B gz`);
}

print('JavaScript', scripts);
print('CSS', styles);
print('Fonts (woff2, already compressed)', fonts);

const homeHtml = join(DIST, 'index.html');
const homeGz = existsSync(homeHtml) ? gz(homeHtml) : 0;
const pageTotal = homeGz + total(styles) + total(scripts) + total(fonts);

console.log(`      home HTML                                                ${String(homeGz).padStart(8)} B gz`);
console.log(`      home page total (HTML + CSS + JS + fonts)                ${String(pageTotal).padStart(8)} B gz`);

const failures = [];
if (total(scripts) > BUDGETS.script) failures.push(`JS ${total(scripts)} B gz over the ${BUDGETS.script} B line`);
if (total(styles) > BUDGETS.stylesheet) failures.push(`CSS ${total(styles)} B gz over the ${BUDGETS.stylesheet} B line`);
if (pageTotal > BUDGETS.total) failures.push(`home page ${pageTotal} B over the ${BUDGETS.total} B line`);

process.exit(report('qa:weight', failures));
