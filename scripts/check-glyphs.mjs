#!/usr/bin/env node
/**
 * qa:glyphs — README.md "The fonts are a build step" section.
 *
 * `public/fonts/*.woff2` are committed, hand-cut artifacts (`npm run fonts`, PLAN.md
 * §1.5) and CI never regenerates them — `astro build` alone does not touch them. That
 * means a copy edit that introduces a character outside whatever subset happens to be
 * committed renders as tofu, silently, on the live site: nothing else in `npm run qa`
 * looks at glyph coverage. This script is that gate.
 *
 * It walks every built `dist/**\/*.html`, extracts every character actually painted on
 * the page (element text nodes, plus the `alt`, `aria-label` and `title` attributes —
 * `<meta name="description">`'s `content` is never rendered, so it is skipped), maps
 * each character to the face the site's own CSS would use to render it, and checks that
 * face's `cmap` (read straight off the committed `.woff2` with `fontkit`) actually has a
 * glyph for it. Whitespace and characters a browser never draws (zero-width joiners,
 * the soft hyphen, control characters) are exempt.
 *
 * The face mapping is read out of the CSS, not hard-coded as a guess: every source
 * `<style>` block and `src/styles/*.css` file is scanned for rules that set
 * `font-family: var(--tgd-font-display)` or `var(--tgd-font-body)`, which gives an
 * ordered list of (selector, face) pairs. A dist element's face is then resolved the way
 * the browser resolves inherited `font-family` — walk from the element up through its
 * ancestors, and at each level prefer an explicit body-face match over a display-face
 * match (the one same-element conflict in this codebase, `.fl-plate.fl-plate--agent` in
 * `StudioFloor.astro`, is exactly a body override declared after the display rule) —
 * stopping at the first level that matches either. `<body>` itself always matches (it
 * carries the base `font-family: var(--tgd-font-body)` rule), so the walk always
 * terminates. A character reachable only through an attribute (`alt`/`aria-label`/
 * `title`) has no such CSS path, so it is required to exist in BOTH faces, per the
 * "when in doubt, require both" rule.
 *
 * Run: `npm run qa:glyphs`, against a fresh `npm run build`.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { openSync } from 'fontkit';
import { DIST, ROOT, htmlFiles, read, rel, report, requireDist } from './lib/dist.mjs';

requireDist();

/* --------------------------------------------------------- 1. the two faces' cmaps */

/*
  Two faces, and the axis between them changed with the redesign.

  It used to be display vs body — two proportional faces, one for headings and numerals,
  one for prose. It is now proportional vs MONO: Schibsted Grotesk sets every heading and
  every paragraph on the site, and Spline Sans Mono sets every number, every eyebrow,
  every uppercase micro-label, every email address, every date range and every nameplate
  in the isometric room.

  `--tgd-font-display` and `--tgd-font-body` both resolve to Schibsted and are both kept
  as token names, because a rule that reaches for either means "the proportional face"
  and this scan reads the CSS rather than a list. `--tgd-font-mono` is the new one, and
  it is the one that decides whether a character has to exist in the mono subset.
*/
const FACES = {
  sans: { file: 'schibsted-grotesk-subset.woff2', label: 'Schibsted Grotesk (headings and prose)' },
  mono: { file: 'spline-sans-mono-subset.woff2', label: 'Spline Sans Mono (numbers, labels, addresses)' },
};

for (const face of Object.values(FACES)) {
  const path = join(ROOT, 'public', 'fonts', face.file);
  face.font = openSync(path);
  face.has = (code) => face.font.hasGlyphForCodePoint(code);
}

/* -------------------------------------------------- 2. read the face map out of the CSS */

/**
 * Every place the site declares `font-family: var(--tgd-font-display | --tgd-font-body)`,
 * in source order: `src/styles/global.css` first (the base rules — `body`, `h1`–`h3`,
 * `.numeral`, `.button`, `.lamp-address`, …), then every component/page `<style>` block
 * that overrides it for a specific class. Source order matters: when two rules for the
 * SAME element both match (the `.fl-plate` / `.fl-plate--agent` case), the one that
 * appears later wins, same as the cascade it is standing in for.
 */
function sourceFiles() {
  const files = [join(ROOT, 'src', 'styles', 'global.css')];
  const stack = [join(ROOT, 'src')];
  while (stack.length > 0) {
    const dir = stack.pop();
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) stack.push(full);
      else if (entry.name.endsWith('.astro') || (entry.name.endsWith('.css') && !files.includes(full))) {
        files.push(full);
      }
    }
  }
  return files;
}

/**
 * Pull `<style>…</style>` blocks out of an .astro file (or return a .css file whole),
 * with CSS comments stripped first. A `/* … *\/` block routinely contains prose with
 * commas and bare words (this file's own source comments are full of them), and
 * without stripping it the rule scanner below would read straight through it into the
 * next real selector and mistake half the comment for part of that selector list.
 */
function cssOf(file) {
  const src = readFileSync(file, 'utf8');
  const css = file.endsWith('.css')
    ? src
    : [...src.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)].map((m) => m[1]).join('\n');
  return css.replace(/\/\*[\s\S]*?\*\//g, ' ');
}

/**
 * A simple, non-nested-brace rule scanner: `selector-list { …declarations… }`. It is not
 * a CSS parser (no @media/@supports awareness, no specificity), but every rule this site
 * uses to switch `font-family` is a plain selector list with no nesting inside the block
 * that contains the declaration, so this reliably finds the innermost matching block even
 * when it sits inside `@layer base { … }`.
 */
function extractFaceSelectors(css, selectors) {
  const ruleRe = /([^{}]+)\{([^{}]*)\}/g;
  for (const match of css.matchAll(ruleRe)) {
    const [, selectorList, body] = match;
    let face = null;
    if (/font-family:\s*var\(--tgd-font-mono\)/.test(body)) face = 'mono';
    else if (/font-family:\s*var\(--tgd-font-(display|body)\)/.test(body)) face = 'sans';
    if (!face) continue;
    for (let selector of selectorList.split(',')) {
      selector = selector.trim().replace(/\s+/g, ' ');
      if (!selector || selector.startsWith('@') || selector.startsWith(':')) continue;
      // Take the last simple component (leftmost part of a compound like `a.button` is
      // ignored in favour of both parts individually — a.button and button-typed rules
      // are not used here, so splitting on element boundaries is enough).
      for (const simple of selector.split(/\s+/)) {
        for (const piece of simple.split(/(?=\.)/)) {
          const cleaned = piece.trim();
          if (cleaned) selectors.push({ selector: cleaned, face });
        }
      }
    }
  }
}

const faceRules = [];
for (const file of sourceFiles()) extractFaceSelectors(cssOf(file), faceRules);

if (faceRules.length === 0) {
  console.error('FAIL  qa:glyphs — found no font-family: var(--tgd-font-*) rules in src/. Check the CSS scan.');
  process.exit(1);
}

/** Does this one ancestor (tag + class list) match a given face rule's selector? */
function matches(tag, classes, selector) {
  if (selector.startsWith('.')) return classes.has(selector.slice(1));
  return selector.toLowerCase() === tag;
}

/**
 * Resolve the face for one element, walking outward from itself. `chain` is
 * [self, parent, grandparent, …, <html>].
 *
 * The MONO rules are checked first at each level, because mono is always the override:
 * `body` carries the proportional face for the whole document and every mono element on
 * the site reaches for it explicitly, on itself or on a wrapper. So a hit on mono at a
 * level is a deliberate switch, and a hit on sans at the same level is the inherited
 * default it is switching away from.
 */
function resolveFace(chain) {
  for (const { tag, classes } of chain) {
    const monoHit = faceRules.some((r) => r.face === 'mono' && matches(tag, classes, r.selector));
    if (monoHit) return 'mono';
    const sansHit = faceRules.some((r) => r.face === 'sans' && matches(tag, classes, r.selector));
    if (sansHit) return 'sans';
  }
  return 'sans'; // <body> always carries the base rule; this is only a fallback.
}

/* --------------------------------------------------------- 3. a minimal HTML walker */

const SKIP_TAGS = new Set(['script', 'style', 'template']);
const VOID_TAGS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta',
  'param', 'source', 'track', 'wbr',
]);

const NAMED_ENTITIES = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
  mdash: '—', ndash: '–', hellip: '…', shy: '­',
  lsquo: '‘', rsquo: '’', ldquo: '“', rdquo: '”',
  copy: '©', reg: '®', trade: '™', star: '★',
};

function decodeEntities(text) {
  return text.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (whole, body) => {
    if (body[0] === '#') {
      const code = body[1] === 'x' || body[1] === 'X'
        ? parseInt(body.slice(2), 16)
        : parseInt(body.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : whole;
    }
    return NAMED_ENTITIES[body] ?? whole;
  });
}

/**
 * Characters a browser is never asked to paint a glyph for: whitespace (including the
 * non-breaking space's own visual is a blank, but it still needs a glyph, so it is NOT
 * exempt — only true zero-width/format characters and the soft hyphen are), control
 * characters, and Unicode format characters (zero-width space/joiner/non-joiner, the
 * BOM, bidi marks, the variation selectors).
 */
function isExempt(code) {
  if (code <= 0x20) return true; // control chars, space, tab, newline
  if (code === 0x00ad) return true; // soft hyphen
  if (code >= 0x200b && code <= 0x200f) return true; // ZWSP, ZWNJ, ZWJ, LRM, RLM
  if (code === 0x2028 || code === 0x2029) return true; // line/paragraph separator
  if (code === 0xfeff) return true; // BOM / ZWNBSP
  if (code >= 0xfe00 && code <= 0xfe0f) return true; // variation selectors
  return false;
}

/**
 * Walk one HTML document. Calls `onText(text, chain, source)` for every text run and
 * every alt/aria-label/title attribute value, where `chain` is the ancestor stack
 * (self-first) at that point and `source` is 'text' or 'attr'.
 */
function walkHtml(rawHtml, onText) {
  // HTML comments are never painted — Astro leaves engineering notes in the built
  // output (e.g. "<!-- COPY.md §2.7's secondary link. -->") and they must not be
  // mistaken for visible text.
  const html = rawHtml.replace(/<!--[\s\S]*?-->/g, '');
  const tagRe = /<(\/?)([a-zA-Z][a-zA-Z0-9-]*)((?:\s+[^<>]*?)?)\s*(\/?)>/g;
  const attrRe = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*("([^"]*)"|'([^']*)'|(\S+))/g;

  const stack = []; // [{tag, classes}], outermost last removed
  const skipDepth = { script: 0, style: 0, template: 0 };
  let lastIndex = 0;

  function chainFor() {
    return [...stack].reverse(); // self-first
  }

  function inSkipped() {
    return Object.values(skipDepth).some((n) => n > 0);
  }

  let match;
  while ((match = tagRe.exec(html)) !== null) {
    const [whole, closing, rawTag, attrString] = match;
    const tag = rawTag.toLowerCase();

    // Text between the previous tag and this one.
    const between = html.slice(lastIndex, match.index);
    lastIndex = match.index + whole.length;
    if (between && !inSkipped() && stack.length > 0) {
      const text = decodeEntities(between);
      if (text.trim().length > 0 || /\S/.test(text)) onText(text, chainFor(), 'text');
    }

    if (closing) {
      if (SKIP_TAGS.has(tag) && skipDepth[tag] > 0) skipDepth[tag] -= 1;
      // Pop the stack back to (and including) the matching open tag, tolerating
      // mismatched/unclosed tags in generated markup by only popping same-tag entries
      // down to the nearest match.
      for (let i = stack.length - 1; i >= 0; i -= 1) {
        if (stack[i].tag === tag) {
          stack.length = i;
          break;
        }
      }
      continue;
    }

    const classMatch = /\bclass\s*=\s*"([^"]*)"/.exec(attrString) || /\bclass\s*=\s*'([^']*)'/.exec(attrString);
    const classes = new Set((classMatch ? classMatch[1] : '').split(/\s+/).filter(Boolean));

    if (!inSkipped()) {
      for (const attrMatch of attrString.matchAll(attrRe)) {
        const name = attrMatch[1].toLowerCase();
        if (name !== 'alt' && name !== 'aria-label' && name !== 'title') continue;
        const raw = attrMatch[3] ?? attrMatch[4] ?? attrMatch[5] ?? '';
        const value = decodeEntities(raw);
        if (value.trim().length > 0) onText(value, [{ tag, classes }, ...chainFor()], 'attr');
      }
    }

    const selfClosing = match[4] === '/' || VOID_TAGS.has(tag);
    if (!selfClosing) {
      stack.push({ tag, classes });
      if (SKIP_TAGS.has(tag)) skipDepth[tag] = (skipDepth[tag] ?? 0) + 1;
    }
  }
}

/* -------------------------------------------------------------------- 4. run the gate */

/** file -> character -> Set of faces required ('sans' | 'mono' | both) collapsed */
const uncovered = new Map(); // character -> Set<file>

function recordMissing(char, file) {
  if (!uncovered.has(char)) uncovered.set(char, new Set());
  uncovered.get(char).add(file);
}

let filesWalked = 0;
let charsChecked = 0;

for (const file of htmlFiles()) {
  filesWalked += 1;
  const html = read(file);
  const label = rel(file);

  walkHtml(html, (text, chain, source) => {
    for (const char of text) {
      const code = char.codePointAt(0);
      if (isExempt(code)) continue;
      charsChecked += 1;

      if (source === 'attr') {
        // No CSS path renders an attribute value directly — required in doubt, per the
        // brief, means covered by both faces.
        if (!FACES.sans.has(code) || !FACES.mono.has(code)) recordMissing(char, label);
        continue;
      }

      const face = resolveFace(chain);
      if (!FACES[face].has(code)) recordMissing(char, label);
    }
  });
}

const failures = [...uncovered.entries()]
  .sort((a, b) => a[0].codePointAt(0) - b[0].codePointAt(0))
  .map(([char, files]) => {
    const code = char.codePointAt(0).toString(16).toUpperCase().padStart(4, '0');
    return `U+${code} ${JSON.stringify(char)} — not in the committed subset — found in: ${[...files].sort().join(', ')}`;
  });

console.log(`      ${filesWalked} built file(s) walked, ${charsChecked} character(s) checked`);
for (const face of Object.values(FACES)) {
  console.log(`      ${face.file.padEnd(34)} ${face.font.characterSet.length} code points`);
}

process.exit(report('qa:glyphs', failures));
