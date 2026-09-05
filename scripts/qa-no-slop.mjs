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
  // The placeholder product name, case-sensitive whole word (COPY.md §5.3).
  { name: 'Milan', re: /\bMilan\b/ },
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
