import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { glob } from 'astro/loaders';
import type { Loader } from 'astro/loaders';

type GlobOptions = Parameters<typeof glob>[0];

function hasJsonFiles(dir: string): boolean {
  if (!existsSync(dir)) return false;
  const stack = [dir];
  while (stack.length > 0) {
    const current = stack.pop();
    if (current === undefined) break;
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      if (entry.isDirectory()) stack.push(join(current, entry.name));
      else if (entry.name.endsWith('.json')) return true;
    }
  }
  return false;
}

/**
 * `glob()`, except that an empty source directory yields an empty collection
 * quietly instead of a build warning.
 *
 * The `people` and `agents` collections are defined now — the schema is the
 * content contract and it should exist before the content does — but their
 * entries arrive in a later build step. An empty collection is a correct state
 * for them, not a problem to report, and the build must not depend on their
 * being populated. Every warning the build does emit stays a real one, which is
 * what lets `qa:build` fail on any warning at all.
 */
export function optionalGlob(options: GlobOptions): Loader {
  const inner = glob(options);
  const base = typeof options.base === 'string' ? options.base : String(options.base ?? '.');

  return {
    ...inner,
    load: async (context) => {
      const dir = new URL(base.replace(/\/?$/, '/'), context.config.root).pathname;
      if (!hasJsonFiles(dir)) {
        context.store.clear();
        return;
      }
      return inner.load(context);
    },
  };
}
