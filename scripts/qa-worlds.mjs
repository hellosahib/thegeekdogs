#!/usr/bin/env node
/**
 * qa:worlds — the three worlds, measured in a browser, on the built pages.
 *
 * `qa:contrast` reads the token file and layers the blocks the way the cascade *should*
 * work. This one asks the browser what actually computed, on the real page, in both
 * schemes, and asserts it against DESIGN.md's published hex.
 *
 * It exists because of a regression this run caused and then found by measuring rather
 * than by reading: moving Tanya's tokens into their own partial (PLAN.md §1.2's
 * swappable token partial) with the import at the TOP of tokens.css put her
 * `[data-world="tanya"]` block BEFORE `:root`. Both selectors are specificity (0,1,0) —
 * a pseudo-class and an attribute selector weigh the same — so `:root` won on source
 * order and her entire page rendered the studio palette. Nothing failed: the build was
 * clean, `astro check` was clean, `qa:contrast` was clean, because it layers by selector
 * name rather than by document order, and at a glance the page looked like a pale
 * achromatic page, which is exactly what hers is meant to look like.
 *
 * The lesson is the one the floor's `set:html` scoping bug already taught one layer up:
 * a fault that only a rendered page shows needs a check that reads a rendered page.
 */
import { chromium } from 'playwright';
import { report } from './lib/dist.mjs';
import { serveDist } from './lib/serve.mjs';

/**
 * DESIGN.md §B.2 and §B.2a (studio), §F.4 and §F.4a (Sahib), §G.1 and §G.1a (Tanya).
 * `--tgd-surface` is the page ground, `--tgd-surface-alt` the field that steps away from
 * it, `--tgd-ink` the primary text and `--tgd-accent` the world's one signal.
 */
const EXPECTED = [
  {
    route: '/',
    world: 'studio',
    light: { surface: '#f1f3f0', alt: '#e2e6e1', ink: '#0f2a2e', accent: '#f2a93b' },
    dark: { surface: '#18292d', alt: '#213539', ink: '#e8ede9', accent: '#f2a93b' },
  },
  {
    route: '/work/',
    world: 'studio',
    light: { surface: '#f1f3f0', alt: '#e2e6e1', ink: '#0f2a2e', accent: '#f2a93b' },
    dark: { surface: '#18292d', alt: '#213539', ink: '#e8ede9', accent: '#f2a93b' },
  },
  {
    route: '/sahib/',
    world: 'sahib',
    // §F.4a: HIS PALETTE IS THE DARK ONE. [data-theme="light"] carries the overrides.
    light: { surface: '#eeeff4', alt: '#e0e2ec', ink: '#1a2033', accent: '#f2a93b' },
    dark: { surface: '#161c2e', alt: '#1f2841', ink: '#e9eaf0', accent: '#f2a93b' },
  },
  {
    route: '/tanya/',
    world: 'tanya',
    light: { surface: '#edeeee', alt: '#dcdede', ink: '#1b2020', accent: '#8a5a08' },
    dark: { surface: '#191b1b', alt: '#282b2b', ink: '#e9eaea', accent: '#f2a93b' },
  },
];

const { base, close } = await serveDist();
const browser = await chromium.launch();
const failures = [];
let checked = 0;

for (const scheme of ['light', 'dark']) {
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: scheme,
  });
  const page = await ctx.newPage();

  for (const entry of EXPECTED) {
    await page.goto(base + entry.route, { waitUntil: 'load' });
    const got = await page.evaluate(() => {
      const root = document.documentElement;
      const cs = getComputedStyle(root);
      const read = (name) => cs.getPropertyValue(name).trim().toLowerCase();
      return {
        world: root.dataset.world,
        theme: root.dataset.theme,
        surface: read('--tgd-surface'),
        alt: read('--tgd-surface-alt'),
        ink: read('--tgd-ink'),
        accent: read('--tgd-accent'),
      };
    });

    if (got.world !== entry.world) {
      failures.push(`${entry.route}: data-world is "${got.world}", expected "${entry.world}"`);
    }
    if (got.theme !== scheme) {
      failures.push(`${entry.route} (${scheme}): data-theme is "${got.theme}"`);
    }

    for (const key of ['surface', 'alt', 'ink', 'accent']) {
      checked += 1;
      if (got[key] !== entry[scheme][key]) {
        failures.push(
          `${entry.route} (${scheme}): --tgd-${key === 'alt' ? 'surface-alt' : key} computed ${got[key]}, DESIGN.md says ${entry[scheme][key]}`,
        );
      }
    }
    console.log(
      `      ${`${entry.route} ${scheme}`.padEnd(22)} ${got.surface} / ${got.alt} / ${got.ink} / ${got.accent}`,
    );
  }

  await ctx.close();
}

await browser.close();
close();

console.log(`      ${checked} computed token(s) checked on ${EXPECTED.length} routes in 2 schemes`);
process.exit(report('qa:worlds', failures));
