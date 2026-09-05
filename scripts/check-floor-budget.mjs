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
// floor's interaction script is the only client JS the home page has.
const scripts = [...html.matchAll(/<script[^>]*\bsrc="([^"]+)"/g)]
  .map((m) => m[1])
  .filter((src) => src.startsWith('/'))
  .map((src) => join(DIST, src))
  .filter((file) => existsSync(file));

const payload = Buffer.concat([
  Buffer.from(section[0], 'utf8'),
  ...scripts.map((file) => readFileSync(file)),
]);

const raw = payload.byteLength;
const gzipped = gzipSync(payload).byteLength;

console.log(`      floor markup + ${scripts.length} script(s): ${raw} B raw, ${gzipped} B gzipped`);
console.log(`      budget ${BUDGET} B gzipped`);

const failures = gzipped > BUDGET ? [`floor is ${gzipped} B gzipped, over the ${BUDGET} B line`] : [];
process.exit(report('check-floor-budget', failures));
