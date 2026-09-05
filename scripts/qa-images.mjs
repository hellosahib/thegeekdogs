#!/usr/bin/env node
/**
 * qa:images — PLAN.md §9.
 *
 * Every <img> carries an alt attribute (alt="" is a deliberate, valid answer;
 * a missing attribute is not), and every referenced local image resolves to a
 * file that actually exists in dist/.
 */
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { htmlFiles, read, rel, report, requireDist, DIST } from './lib/dist.mjs';

requireDist();

const failures = [];

function referencedPaths(value) {
  // Handles both src="..." and a srcset's comma-separated candidate list.
  return value
    .split(',')
    .map((candidate) => candidate.trim().split(/\s+/)[0])
    .filter(Boolean);
}

function checkExists(file, url) {
  if (!url || /^(https?:)?\/\//.test(url) || url.startsWith('data:') || url.startsWith('mailto:')) {
    return;
  }
  const clean = url.split(/[?#]/)[0];
  if (!clean.startsWith('/')) return;
  const onDisk = join(DIST, clean);
  if (!existsSync(onDisk)) {
    failures.push(`${rel(file)}  references a missing asset: ${url}`);
  }
}

for (const file of htmlFiles()) {
  const html = read(file);

  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    const tag = match[0];
    if (!/\salt\s*=/i.test(tag)) {
      failures.push(`${rel(file)}  <img> without an alt attribute: ${tag.slice(0, 120)}`);
    }
    const src = /\ssrc\s*=\s*"([^"]*)"/i.exec(tag);
    if (src) checkExists(file, src[1]);
    const srcset = /\ssrcset\s*=\s*"([^"]*)"/i.exec(tag);
    if (srcset) for (const url of referencedPaths(srcset[1])) checkExists(file, url);
  }

  for (const match of html.matchAll(/<source\b[^>]*>/gi)) {
    const srcset = /\ssrcset\s*=\s*"([^"]*)"/i.exec(match[0]);
    if (srcset) for (const url of referencedPaths(srcset[1])) checkExists(file, url);
  }
}

process.exit(report('qa:images', failures));
