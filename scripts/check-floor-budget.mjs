#!/usr/bin/env node
/**
 * check-floor-budget — PLAN.md §4.6, §7, §8.
 *
 * The studio floor's SVG is inline in the HTML document, so Lighthouse cannot
 * attribute it as a separate resource. This script is the authority on the
 * 80KB-gzipped line instead: it extracts the floor section from the built home
 * page, adds the floor's own JS module, gzips the pair, and fails over budget.
 *
 * The floor is built in a later step. Until the section exists, this passes and
 * says so — it is wired into CI from step 1 so the budget is never discovered
 * late.
 */
import { existsSync, readFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { join } from 'node:path';
import { DIST, report, requireDist, walk } from './lib/dist.mjs';

requireDist();

const BUDGET = 80 * 1024;
const home = join(DIST, 'index.html');

if (!existsSync(home)) {
  console.error('FAIL  check-floor-budget — dist/index.html is missing');
  process.exit(1);
}

const html = readFileSync(home, 'utf8');
const section = /<section\b[^>]*\bid="studio-floor"[\s\S]*?<\/section>/.exec(html);

if (!section) {
  console.log('PASS  check-floor-budget — no #studio-floor section in dist/index.html yet');
  console.log(`      budget ${BUDGET} B gzipped, wired and ready`);
  process.exit(0);
}

// Every JS module the home page loads counts against the floor line, because the
// floor's interaction script is the only client JS the home page has. Astro inlines a
// module small enough to be worth inlining rather than emitting a file, and it is
// hoisted out of the section it came from, so both forms are collected here — counting
// only <script src> would have measured the floor's script at zero.
const external = [...html.matchAll(/<script[^>]*\bsrc="([^"]+)"/g)]
  .map((m) => m[1])
  .filter((src) => src.startsWith('/'))
  .map((src) => join(DIST, src))
  .filter((file) => existsSync(file));

const inline = [...html.matchAll(/<script\b[^>]*\btype="module"[^>]*>([\s\S]*?)<\/script>/g)].map(
  (m) => m[1],
);

const payload = Buffer.concat([
  Buffer.from(section[0], 'utf8'),
  ...external.map((file) => readFileSync(file)),
  ...inline.map((code) => Buffer.from(code, 'utf8')),
]);

const raw = payload.byteLength;
const gzipped = gzipSync(payload).byteLength;

console.log(
  `      floor markup + ${external.length} external + ${inline.length} inline module script(s): ${raw} B raw, ${gzipped} B gzipped`,
);
console.log(`      budget ${BUDGET} B gzipped`);

const failures = gzipped > BUDGET ? [`floor is ${gzipped} B gzipped, over the ${BUDGET} B line`] : [];
process.exit(report('check-floor-budget', failures));
