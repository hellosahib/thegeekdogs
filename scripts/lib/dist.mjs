import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
export const DIST = join(ROOT, 'dist');

/** Every QA script runs against the built output, never against source. */
export function requireDist() {
  if (!existsSync(DIST)) {
    console.error('dist/ does not exist. Run `npm run build` first.');
    process.exit(1);
  }
}

export function walk(dir, predicate = () => true) {
  const out = [];
  const stack = [dir];
  while (stack.length > 0) {
    const current = stack.pop();
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      const full = join(current, entry.name);
      if (entry.isDirectory()) stack.push(full);
      else if (predicate(full)) out.push(full);
    }
  }
  return out.sort();
}

export function htmlFiles() {
  return walk(DIST, (f) => f.endsWith('.html'));
}

export function read(file) {
  return readFileSync(file, 'utf8');
}

export function rel(file) {
  return relative(ROOT, file);
}

export function sizeOf(file) {
  return statSync(file).size;
}

export function report(name, failures) {
  if (failures.length === 0) {
    console.log(`PASS  ${name}`);
    return 0;
  }
  console.error(`FAIL  ${name} — ${failures.length} problem(s)`);
  for (const line of failures) console.error(`      ${line}`);
  return 1;
}
