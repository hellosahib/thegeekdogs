#!/usr/bin/env node
/**
 * qa:contrast — PLAN.md §9, §5.2.
 *
 * Reads the token values out of src/styles/tokens.css and computes the WCAG 2.x
 * contrast ratio for every text-on-background pair DESIGN.md lists — now for SIX
 * palettes, not three: each of the three worlds in both schemes (§B.2, §B.2a, §F.4,
 * §F.4a, §G.1, §G.1a). Two assertions per pair:
 *
 *   1. the ratio clears its threshold — 4.5 for body text, 3.0 for large text;
 *   2. the ratio matches the figure DESIGN.md publishes, to two decimals, which is
 *      what catches a mistyped hex in the token layer.
 *
 * The token file is layered exactly as the browser layers it: :root first, then the
 * world's own block, then that world's [data-theme] override block. `var()` references
 * are resolved inside the resulting scope, so an alias like `--ink` is checked at the
 * value it actually computes to in that scheme rather than at the one it was written
 * with.
 *
 * Two pairs are checked in the *other* direction, because DESIGN.md's lamp rule depends
 * on them failing: --lamp on the light --sheet is 1.79:1 and on Sahib's light ground
 * 1.74:1. If either ever clears AA, a token moved and the rule needs rewriting.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, report } from './lib/dist.mjs';

const raw = readFileSync(join(ROOT, 'src', 'styles', 'tokens.css'), 'utf8');

// Comments and @media wrappers carry no colour decisions; stripping them keeps the
// block parser below honest about which selector a declaration belongs to.
const css = raw.replace(/\/\*[\s\S]*?\*\//g, '').replace(/@media[^{]*\{(?:[^{}]*\{[^{}]*\})*[^{}]*\}/g, '');

/** selector text -> Map(name -> raw value) */
const BLOCKS = new Map();
for (const match of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
  const selector = match[1].trim().replace(/\s+/g, ' ');
  const decls = new Map();
  for (const decl of match[2].matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/g)) {
    decls.set(decl[1], decl[2].trim());
  }
  BLOCKS.set(selector, decls);
}

/** Layer the blocks the way the cascade does, then resolve every var() reference. */
function scope(world, theme) {
  const selectors = [
    ':root',
    `[data-world='${world}']`,
    `[data-world='${world}'][data-theme='${theme}']`,
  ];
  const flat = new Map();
  for (const selector of selectors) {
    for (const [name, value] of BLOCKS.get(selector) ?? []) flat.set(name, value);
  }

  const resolved = new Map();
  const resolve = (name, seen = new Set()) => {
    if (resolved.has(name)) return resolved.get(name);
    if (seen.has(name)) throw new Error(`Cyclic custom property: ${name}`);
    seen.add(name);
    const value = flat.get(name);
    if (value === undefined) return undefined;
    const ref = /^var\((--[a-z0-9-]+)\)$/.exec(value);
    const out = ref ? resolve(ref[1], seen) : value;
    resolved.set(name, out);
    return out;
  };
  for (const name of flat.keys()) resolve(name);
  return resolved;
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
const PALETTES = [
  {
    name: 'studio, light',
    world: 'studio',
    theme: 'light',
    // DESIGN.md §B.2.
    pairs: [
      ['--ink', '--sheet', 13.53, 'body'],
      ['--ink', '--band', 11.96, 'body'],
      ['--card-ink', '--card-surface', 14.55, 'body'],
      ['--muted', '--sheet', 5.62, 'body'],
      ['--muted', '--band', 4.97, 'body'],
      ['--card-ink-2', '--card-surface', 6.05, 'body'],
      ['--chalk', '--floor', 12.74, 'body'],
      ['--chalk-72', '--floor', 7.25, 'body'],
      ['--lamp', '--floor', 7.56, 'body'],
      ['--floor', '--lamp', 7.56, 'body'],
      ['--btn-ink', '--btn-fill', 12.74, 'body'],
    ],
    // The lamp rule's load-bearing failure.
    forbidden: [['--lamp', '--sheet', 1.79]],
  },
  {
    name: 'studio, dark',
    world: 'studio',
    theme: 'dark',
    // DESIGN.md §B.2a.
    pairs: [
      ['--ink', '--sheet', 12.71, 'body'],
      ['--ink', '--band', 10.85, 'body'],
      ['--muted', '--sheet', 5.93, 'body'],
      ['--muted', '--band', 5.06, 'body'],
      ['--chalk', '--floor', 15.34, 'body'],
      ['--chalk-72', '--floor', 8.33, 'body'],
      ['--lamp', '--floor', 9.1, 'body'],
      ['--lamp', '--sheet', 7.54, 'body'],
      ['--lamp', '--band', 6.44, 'body'],
      ['--card-ink', '--card-surface', 12.47, 'body'],
      ['--card-ink-2', '--card-surface', 5.18, 'body'],
      ['--floor', '--chalk', 15.34, 'body'],
      ['--floor', '--lamp', 9.1, 'body'],
      ['--btn-ink', '--btn-fill', 15.34, 'body'],
    ],
    forbidden: [],
  },
  {
    name: 'sahib, dark (his default)',
    world: 'sahib',
    theme: 'dark',
    // DESIGN.md §F.4, §F.6.
    pairs: [
      ['--s-ink', '--s-ground', 14.11, 'body'],
      ['--s-ink', '--s-panel', 12.16, 'body'],
      ['--s-dim', '--s-ground', 5.73, 'body'],
      ['--s-dim', '--s-panel', 4.94, 'body'],
      ['--lamp', '--s-ground', 8.48, 'body'],
      ['--lamp', '--s-panel', 7.31, 'body'],
      ['--card-ink', '--s-card-surface', 12.34, 'body'],
      ['--card-ink-2', '--s-card-surface', 5.13, 'body'],
    ],
    forbidden: [],
  },
  {
    name: 'sahib, light',
    world: 'sahib',
    theme: 'light',
    // DESIGN.md §F.4a.
    pairs: [
      ['--s-ink', '--s-ground', 14.09, 'body'],
      ['--s-ink', '--s-panel', 12.52, 'body'],
      ['--s-dim', '--s-ground', 5.79, 'body'],
      ['--s-dim', '--s-panel', 5.15, 'body'],
      ['--s-ink', '--lamp', 8.1, 'body'],
      ['--card-ink', '--s-card-surface', 14.44, 'body'],
      ['--card-ink-2', '--s-card-surface', 6.0, 'body'],
    ],
    // §F.4a: --lamp on his light ground is fill-only, by the restated lamp rule.
    forbidden: [['--lamp', '--s-ground', 1.74]],
  },
  {
    name: 'tanya, light',
    world: 'tanya',
    theme: 'light',
    // DESIGN.md §G.1.
    pairs: [
      ['--t-ink', '--t-ground', 14.18, 'body'],
      ['--t-ink', '--t-core', 12.2, 'body'],
      ['--t-edge', '--t-ground', 5.59, 'body'],
      ['--t-edge', '--t-core', 4.81, 'body'],
      ['--lamp-ink', '--t-ground', 5.09, 'body'],
      // §G.1 records this one as body-fail, large-pass; the accompanying constraint
      // restricts --lamp-ink on --t-core to large text and non-text marks.
      ['--lamp-ink', '--t-core', 4.38, 'large'],
      ['--card-ink', '--t-card-surface', 15.66, 'body'],
      ['--card-ink-2', '--t-card-surface', 6.17, 'body'],
    ],
    forbidden: [],
  },
  {
    name: 'tanya, dark',
    world: 'tanya',
    theme: 'dark',
    // DESIGN.md §G.1a.
    pairs: [
      ['--t-ink', '--t-ground', 14.35, 'body'],
      ['--t-ink', '--t-core', 11.85, 'body'],
      ['--t-edge', '--t-ground', 6.19, 'body'],
      ['--t-edge', '--t-core', 5.11, 'body'],
      ['--lamp-ink', '--t-ground', 8.66, 'body'],
      ['--lamp-ink', '--t-core', 7.15, 'body'],
      ['--card-ink', '--t-card-surface', 13.47, 'body'],
      ['--card-ink-2', '--t-card-surface', 5.31, 'body'],
    ],
    forbidden: [],
  },
];

const THRESHOLD = { body: 4.5, large: 3.0 };

/*
  DESIGN.md derives four of these tokens by compositing an alpha over a ground and
  publishes the ratio from the *unrounded* composite while publishing the colour as a
  rounded hex. The token layer can only carry the hex, so those pairs land within 0.03
  of the published figure rather than on it. 0.05 is the tolerance for them; every other
  pair is held to 0.011, which is what catches a mistyped hex — a wrong hex moves a
  ratio by whole units, never by hundredths.
*/
const DERIVED = new Set(['--chalk-72', '--card-surface', '--s-card-surface', '--t-card-surface']);
const tolerance = (fg, bg) => (DERIVED.has(fg) || DERIVED.has(bg) ? 0.05 : 0.011);

const failures = [];
let checked = 0;

for (const palette of PALETTES) {
  const tokens = scope(palette.world, palette.theme);
  console.log(`      ${palette.name}`);

  for (const [fg, bg, published, size] of palette.pairs) {
    const fgHex = tokens.get(fg);
    const bgHex = tokens.get(bg);
    if (!fgHex || !bgHex) {
      failures.push(`${palette.name}: ${fg} on ${bg} — token not found in that scope`);
      continue;
    }
    const computed = ratio(fgHex, bgHex);
    const threshold = THRESHOLD[size];
    if (computed < threshold) {
      failures.push(
        `${palette.name}: ${fg} on ${bg} — ${computed.toFixed(2)}:1 fails AA ${size} (${threshold})`,
      );
    }
    if (Math.abs(computed - published) > tolerance(fg, bg)) {
      failures.push(
        `${palette.name}: ${fg} on ${bg} — computed ${computed.toFixed(2)}:1 but DESIGN.md publishes ${published}:1`,
      );
    }
    checked += 1;
    console.log(`        ${`${fg} on ${bg}`.padEnd(42)} ${computed.toFixed(2)}:1  AA ${size}`);
  }

  for (const [fg, bg, published] of palette.forbidden) {
    const computed = ratio(tokens.get(fg), tokens.get(bg));
    if (Math.abs(computed - published) > tolerance(fg, bg)) {
      failures.push(
        `${palette.name}: ${fg} on ${bg} — computed ${computed.toFixed(2)}:1, the lamp rule is written against ${published}:1`,
      );
    }
    console.log(
      `        ${`${fg} on ${bg}`.padEnd(42)} ${computed.toFixed(2)}:1  fill only, never a mark or text`,
    );
  }
}

console.log(`      ${checked} pair(s) checked across ${PALETTES.length} palettes`);
process.exit(report('qa:contrast', failures));
