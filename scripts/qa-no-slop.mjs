#!/usr/bin/env node
/**
 * qa:no-slop — PLAN.md §9, agents/qa.md "Automated, blocking".
 *
 * Greps the BUILT output only. Source may legitimately contain a marker in a
 * schema comment; dist/ may not contain one anywhere.
 */
import { htmlFiles, read, rel, report, requireDist, walk, DIST } from './lib/dist.mjs';

requireDist();

const PATTERNS = [
  { name: 'lorem', re: /\blorem\b/i },
  { name: 'ipsum', re: /\bipsum\b/i },
  { name: 'TODO', re: /\bTODO\b/ },
  { name: 'FIXME', re: /\bFIXME\b/ },
  { name: 'XXX', re: /\bXXX\b/ },
  // Catches the HTML placeholder= attribute too. That is the point: every field
  // hint on this site is real, visible text in the DOM, never attribute-only.
  { name: 'placeholder', re: /placeholder/i },
  { name: '[FILL]', re: /\[FILL/i },
  { name: '[CONFIRM', re: /\[CONFIRM/i },
  { name: 'coming soon', re: /coming soon/i },
  { name: 'example.com', re: /example\.com/i },
  { name: 'John Doe', re: /John Doe/i },
  { name: 'Jane Doe', re: /Jane Doe/i },
  /*
    `Milan` was blocked here while it was a working title the site had not committed to
    (COPY.md §5.3). QUESTIONS.md item 78 settled it as the product's public name, so the
    pattern is gone rather than commented into a disabled state: a blocklist that carries
    entries it does not enforce stops being readable as the list of what may not ship.
    The bundle-id fragment below is a different thing and still blocked — an internal
    identifier has no reason to reach a page.
  */
  // The second product's bundle-id fragment, in content or in a file path.
  { name: 'wedme', re: /wedme/i },
  // A bare dead-link fragment. href="#section-id" is a legitimate in-page anchor.
  { name: 'href="#"', re: /href="#"/ },
];

const failures = [];

for (const file of htmlFiles()) {
  const lines = read(file).split('\n');
  lines.forEach((line, index) => {
    for (const { name, re } of PATTERNS) {
      if (re.test(line)) {
        failures.push(`${rel(file)}:${index + 1}  matched ${name}  ${line.trim().slice(0, 120)}`);
      }
    }
  });
}

// The engineer's own reasoning — a design ruling, a cut copy string, a §-reference —
// belongs in REVIEWS.md and DESIGN.md, never in an HTML comment: comments in an
// Astro template body (or in a markup string reached through `set:html`) are not
// stripped by `compressHTML` and ship verbatim in the built page (COPY.md §7.1's
// second `/tanya/` paragraph did exactly this — cut from render, left live in a
// comment). The only comment Astro itself may emit in static output is a
// conditional comment (`<!--[if ...]>`), which this allows; every other `<!--` in
// dist is a source-level leak and fails the build. Confirmed by inspection that
// `compressHTML` (on by default here) strips inter-tag whitespace but not comments,
// so this gate is not redundant against that setting — and it is kept regardless,
// since a future template could reintroduce a comment even if it were.
const COMMENT_RE = /<!--(?!\[if\s)[\s\S]*?-->/g;
for (const file of htmlFiles()) {
  const content = read(file);
  let match;
  while ((match = COMMENT_RE.exec(content)) !== null) {
    const line = content.slice(0, match.index).split('\n').length;
    const snippet = match[0].replace(/\s+/g, ' ').trim().slice(0, 120);
    failures.push(`${rel(file)}:${line}  HTML comment in dist  ${snippet}`);
  }
}

// PLAN.md §1.10 — a backstop against an uppercase route bypassing the schema
// regex. Scoped to page URLs: a build tool's content-hashed asset filename is
// not a URL anyone types, and its hash is legitimately mixed-case.
for (const file of walk(DIST)) {
  const path = rel(file);
  if (/wedme/i.test(path)) failures.push(`${path}  matched wedme (file path)`);
  if (!file.endsWith('.html')) continue;
  const route = path.slice('dist/'.length);
  if (/[A-Z]/.test(route)) failures.push(`${path}  uppercase character in a built route`);
}

process.exit(report('qa:no-slop', failures));
