#!/usr/bin/env node
/**
 * qa:build — PLAN.md §9.
 *
 * `astro check` with zero errors, zero warnings and zero hints, then a fresh
 * `astro build` whose log must contain no warning-level line.
 */
import { spawnSync } from 'node:child_process';
import { ROOT, report } from './lib/dist.mjs';

const failures = [];

function run(label, args) {
  const result = spawnSync('npx', args, { cwd: ROOT, encoding: 'utf8', shell: false });
  const output = `${result.stdout ?? ''}${result.stderr ?? ''}`;
  process.stdout.write(output);
  if (result.status !== 0) failures.push(`${label} exited ${result.status}`);
  return output;
}

// astro check prints its summary across four lines, colourised.
const strip = (text) => text.replace(/\[[0-9;]*m/g, '');
const checkOutput = strip(run('astro check', ['astro', 'check']));
const checkSummary = /Result[\s\S]*?(\d+)\s+errors?[\s\S]*?(\d+)\s+warnings?[\s\S]*?(\d+)\s+hints?/i.exec(
  checkOutput,
);
if (checkSummary) {
  const [, errors, warnings, hints] = checkSummary;
  if (Number(errors) > 0) failures.push(`astro check reported ${errors} error(s)`);
  if (Number(warnings) > 0) failures.push(`astro check reported ${warnings} warning(s)`);
  if (Number(hints) > 0) failures.push(`astro check reported ${hints} hint(s)`);
} else {
  failures.push('astro check produced no parsable result line');
}

const buildOutput = strip(run("astro build", ["astro", "build"]));
for (const line of buildOutput.split('\n')) {
  if (/\[WARN\]|\bwarning:/i.test(line)) failures.push(`build warning: ${line.trim()}`);
}

process.exit(report('qa:build', failures));
