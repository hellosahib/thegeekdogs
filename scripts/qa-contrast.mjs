#!/usr/bin/env node
/**
 * qa:contrast — PLAN.md §9, §5.2.
 *
 * Reads the token values out of src/styles/tokens.css and computes the WCAG 2.x
 * contrast ratio for every text-on-background pair DESIGN.md lists (§B.2, §F.4,
 * §G.1). Two assertions per pair:
 *
 *   1. the ratio clears its threshold — 4.5 for body text, 3.0 for large text;
 *   2. the ratio matches the figure DESIGN.md publishes, to two decimals, which
 *      is what catches a mistyped hex in the token layer.
 *
 * One pair is checked in the other direction: --lamp on --sheet is 1.79:1 and
 * DESIGN.md's lamp rule forbids it as text or as a mark. If that pair ever
 * clears AA, a token moved and the rule needs rewriting.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, report } from './lib/dist.mjs';

const css = readFileSync(join(ROOT, 'src', 'styles', 'tokens.css'), 'utf8');

/** Pulls every `--name: #rrggbb;` declaration out of the token file. */
const TOKENS = new Map();
for (const match of css.matchAll(/(--[a-z0-9-]+)\s*:\s*(#[0-9a-fA-F]{6})\s*;/g)) {
  TOKENS.set(match[1], match[2].toLowerCase());
}

function channel(value) {
  const c = value / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function luminance(hex) {
  const r = channel(parseInt(hex.slice(1, 3), 16));
  const g = channel(parseInt(hex.slice(3, 5), 16));
  const b = channel(parseInt(hex.slice(5, 7), 16));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function ratio(a, b) {
  const la = luminance(a);
  const lb = luminance(b);
  const [light, dark] = la > lb ? [la, lb] : [lb, la];
  return (light + 0.05) / (dark + 0.05);
}

/** [foreground token, background token, DESIGN.md's published ratio, size class] */
const PAIRS = [
  // DESIGN.md §B.2, the studio world.
  ['--floor', '--sheet', 13.53, 'body'],
  ['--floor', '--band', 11.96, 'body'],
  ['--floor', '--card-surface', 14.55, 'body'],
  ['--muted', '--sheet', 5.62, 'body'],
  ['--muted', '--band', 4.97, 'body'],
  ['--muted', '--card-surface', 6.05, 'body'],
  ['--chalk', '--floor', 12.74, 'body'],
  ['--chalk-72', '--floor', 7.25, 'body'],
  ['--lamp', '--floor', 7.56, 'body'],
  ['--floor', '--lamp', 7.56, 'body'],

  // DESIGN.md §F.4, Sahib's world.
  ['--s-ink', '--s-ground', 14.11, 'body'],
  ['--s-ink', '--s-panel', 12.16, 'body'],
  ['--s-dim', '--s-ground', 5.73, 'body'],
  ['--s-dim', '--s-panel', 4.94, 'body'],
  ['--lamp', '--s-ground', 8.48, 'body'],
  ['--lamp', '--s-panel', 7.31, 'body'],
  ['--floor', '--s-card-surface', 12.34, 'body'],
  ['--muted', '--s-card-surface', 5.13, 'body'],

  // DESIGN.md §G.1, Tanya's world.
  ['--t-ink', '--t-ground', 14.18, 'body'],
  ['--t-ink', '--t-core', 12.2, 'body'],
  ['--t-edge', '--t-ground', 5.59, 'body'],
  ['--t-edge', '--t-core', 4.81, 'body'],
  ['--lamp-ink', '--t-ground', 5.09, 'body'],
  // DESIGN.md §G.1 records this one as body-fail, large-pass; the accompanying
  // constraint restricts --lamp-ink on --t-core to large text and non-text marks.
  ['--lamp-ink', '--t-core', 4.38, 'large'],
  ['--t-ink', '--t-card-surface', 15.66, 'body'],
  ['--t-edge', '--t-card-surface', 6.17, 'body'],
];

const THRESHOLD = { body: 4.5, large: 3.0 };

const failures = [];
const rows = [];

for (const [fg, bg, published, size] of PAIRS) {
  const fgHex = TOKENS.get(fg);
  const bgHex = TOKENS.get(bg);
  if (!fgHex || !bgHex) {
    failures.push(`${fg} on ${bg}: token not found in tokens.css`);
    continue;
  }
  const computed = ratio(fgHex, bgHex);
  const threshold = THRESHOLD[size];
  if (computed < threshold) {
    failures.push(`${fg} on ${bg}: ${computed.toFixed(2)}:1 fails AA ${size} (${threshold})`);
  }
  if (Math.abs(computed - published) > 0.011) {
    failures.push(
      `${fg} on ${bg}: computed ${computed.toFixed(2)}:1 but DESIGN.md publishes ${published}:1`,
    );
  }
  rows.push(`${fg} on ${bg}`.padEnd(40) + `${computed.toFixed(2)}:1  AA ${size}`);
}

// DESIGN.md §B.2's one documented failure, and the lamp rule that follows from it.
const lampOnSheet = ratio(TOKENS.get('--lamp'), TOKENS.get('--sheet'));
if (Math.abs(lampOnSheet - 1.79) > 0.011) {
  failures.push(
    `--lamp on --sheet: computed ${lampOnSheet.toFixed(2)}:1, DESIGN.md's lamp rule is written against 1.79:1`,
  );
}
rows.push('--lamp on --sheet'.padEnd(40) + `${lampOnSheet.toFixed(2)}:1  forbidden as text or mark`);

for (const row of rows) console.log(`      ${row}`);
console.log(`      ${PAIRS.length} pair(s) checked`);
process.exit(report('qa:contrast', failures));
