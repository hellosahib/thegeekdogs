#!/usr/bin/env node
/**
 * qa:links — PLAN.md §9.
 *
 * Two checks, both against the built output:
 *   1. linkinator crawls dist/ from the home page and reports any broken link,
 *      internal or external.
 *   2. every page in dist/ (404.html excepted, which is unreachable by design)
 *      is present in sitemap-0.xml, so no page ships orphaned.
 */
import { existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { LinkChecker } from 'linkinator';
import { DIST, htmlFiles, read, rel, report, requireDist } from './lib/dist.mjs';

requireDist();

const failures = [];

const checker = new LinkChecker();
const result = await checker.check({
  path: DIST,
  recurse: true,
  timeout: 20000,
  retry: true,
  // The site's own canonical origin: <link rel="canonical"> and og:url point at
  // https://thegeekdogs.com/, which is this very build once it is deployed.
  // Fetching it from a pre-deploy checker tests the currently-live site, not the
  // one being checked, so it is skipped here and covered by the deploy instead.
  // Nothing else is skipped; no external 404 is silenced.
  linksToSkip: ['^https://thegeekdogs\\.com/'],
});

for (const link of result.links) {
  if (link.state === 'BROKEN') {
    failures.push(`${link.status ?? '???'}  ${link.url}  (from ${link.parent ?? 'root'})`);
  }
}

const checked = result.links.filter((l) => l.state === 'OK').length;
const skipped = result.links.filter((l) => l.state === 'SKIPPED').length;

// Orphan check.
const sitemapPath = join(DIST, 'sitemap-0.xml');
if (!existsSync(sitemapPath)) {
  failures.push('dist/sitemap-0.xml is missing — the sitemap integration did not run.');
} else {
  const sitemap = read(sitemapPath);
  const listed = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname));
  for (const file of htmlFiles()) {
    const path = relative(DIST, file);
    if (path === '404.html') continue;
    const route = '/' + path.replace(/index\.html$/, '');
    if (!listed.has(route)) failures.push(`${rel(file)}  built but not listed in the sitemap (orphan)`);
  }
}

console.log(`      ${checked} link(s) OK, ${skipped} skipped (mailto and other non-http schemes)`);
process.exit(report('qa:links', failures));
