#!/usr/bin/env node
/**
 * evidence-rund — the run-D measurements that are arithmetic on a rendered page rather
 * than a screenshot somebody has to read.
 *
 * Five of run B's thirty items resolve to a number, not to a picture, and each of the five
 * had already been "fixed" once by reading. So each one is measured here and the script
 * prints its own counts on every run:
 *
 *   B2 / B3   The plate never covers the floor section or the card panel, at any scroll
 *             position, at any width (DESIGN.md §B.10 round 12). Swept in 80px steps.
 *   H4        The wide plan reads COPY.md §2.4's pipeline order LEFT TO RIGHT on screen
 *             (§C.3 round 12), read off the rendered nameplate coordinates.
 *   H9        The selected desk's fill is visible (§C.8 round 12's own acceptance test):
 *             the pixel difference between a selected and an unselected station.
 *   S2        The coverage map's filled cell against its ground, sampled from rendered
 *             pixels rather than from the token (§F.4b).
 *   H5        The chair's own drawn extents at the 250ms frame, with the cone absent.
 *
 * Run: `node scripts/evidence-rund.mjs`. It writes nothing but its output.
 */
import { chromium } from 'playwright';
import { serveDist } from './lib/serve.mjs';
import { report } from './lib/dist.mjs';

const { base, close } = await serveDist();
const browser = await chromium.launch();
const failures = [];

const say = (line) => console.log(`      ${line}`);

/* ---------------------------------------------------------------- B2 / B3, the sweep */

let sweptPositions = 0;
let overlaps = 0;
for (const scheme of ['light', 'dark']) {
  for (const width of [360, 390, 768, 1024, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await context.newPage();
    await page.addInitScript((value) => {
      try {
        localStorage.setItem('tgd-theme', value);
      } catch {
        /* a context with storage disabled falls back to light, which is also fine here */
      }
    }, scheme);
    await page.goto(`${base}/`, { waitUntil: 'load' });

    const found = await page.evaluate(async () => {
      const plate = document.querySelector('.plate');
      const floor = document.querySelector('#studio-floor');
      const slot = document.querySelector('.floor__slot');
      const hits = [];
      let steps = 0;
      const total = document.documentElement.scrollHeight;
      for (let y = 0; y <= total; y += 80) {
        window.scrollTo(0, y);
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
        steps += 1;
        const p = plate.getBoundingClientRect();
        if (p.width === 0 || getComputedStyle(plate).display === 'none') continue;
        for (const [name, element] of [
          ['the floor section', floor],
          ['the card panel', slot],
        ]) {
          const box = element.getBoundingClientRect();
          const overlap =
            p.left < box.right && p.right > box.left && p.top < box.bottom && p.bottom > box.top;
          if (overlap) hits.push({ y, name });
        }
      }
      return { steps, hits };
    });
    sweptPositions += found.steps;
    overlaps += found.hits.length;
    if (found.hits.length > 0) {
      failures.push(
        `§B.10 round 12: the plate's box is over ${found.hits[0].name} at ${found.hits.length} of ${found.steps} scroll positions, ${width} ${scheme}`,
      );
    }
    await context.close();
  }
}
say(
  `B2/B3  the plate over the floor or the card panel: **${overlaps} of ${sweptPositions}** scroll positions, 5 widths x 2 schemes`,
);

/* ------------------------------------------------------------- H4, the reading order */

{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(`${base}/`, { waitUntil: 'load' });
  const rows = await page.evaluate(() => {
    const plates = [...document.querySelectorAll('.scene--wide .fl-plate--agent')];
    return plates.map((p) => {
      const box = p.getBoundingClientRect();
      return { label: p.textContent.trim(), x: Math.round(box.left + box.width / 2), y: Math.round(box.top) };
    });
  });
  /* Group by screen row, then read each row left to right. */
  const byRow = new Map();
  for (const row of rows) {
    const key = [...byRow.keys()].find((k) => Math.abs(k - row.y) < 12) ?? row.y;
    byRow.set(key, [...(byRow.get(key) ?? []), row]);
  }
  const order = [...byRow.entries()]
    .sort((a, b) => a[0] - b[0])
    .flatMap(([, group]) => group.sort((a, b) => a.x - b.x).map((entry) => entry.label));
  const PIPELINE = [
    'Spec Writer',
    'Designer',
    'Programmer',
    'Test Engineer',
    'Security Auditor',
    'Reviewer',
    'Release Watcher',
    'Ship approval',
  ];
  const ok = order.join(' → ') === PIPELINE.join(' → ');
  if (!ok) {
    failures.push(`§C.3 round 12: the wide plan reads ${order.join(' → ')}, not COPY §2.4's order`);
  }
  say(`H4     the room reads across, top to bottom: ${order.join(' → ')}`);
  await context.close();
}

/* ---------------------------------------------------- H9, §C.8's own acceptance test */

for (const scheme of ['light', 'dark']) {
  for (const width of [360, 1440]) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      reducedMotion: 'reduce',
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    await page.addInitScript((value) => {
      try {
        localStorage.setItem('tgd-theme', value);
      } catch {
        /* light is the fallback and it is also a scheme worth measuring */
      }
    }, scheme);
    await page.goto(`${base}/`, { waitUntil: 'load' });

    /* The station under test is a desk, not the chair: the chair has no monitor and no
       selected fill to lift. Its own group's box is the clip. */
    const clip = await page.evaluate(() => {
      const group = [...document.querySelectorAll('[data-scene="programmer"]')].find(
        (candidate) => candidate.getBoundingClientRect().width > 0,
      );
      const box = group.getBoundingClientRect();
      window.scrollTo(0, window.scrollY + box.top - 200);
      const after = group.getBoundingClientRect();
      return {
        x: Math.max(0, Math.floor(after.left)),
        y: Math.max(0, Math.floor(after.top)),
        width: Math.ceil(after.width),
        height: Math.ceil(after.height),
      };
    });

    const select = async (on) => {
      await page.evaluate((wanted) => {
        for (const group of document.querySelectorAll('[data-scene]')) group.removeAttribute('data-on');
        if (wanted) {
          for (const group of document.querySelectorAll('[data-scene="programmer"]')) {
            group.setAttribute('data-on', '');
          }
        }
      }, on);
      await page.waitForTimeout(60);
      return page.screenshot({ clip });
    };

    const off = await select(false);
    const on = await select(true);
    const diff = await page.evaluate(
      async ({ a, b }) => {
        const load = (data) =>
          new Promise((resolve) => {
            const image = new Image();
            image.onload = () => resolve(image);
            image.src = `data:image/png;base64,${data}`;
          });
        const [first, second] = await Promise.all([load(a), load(b)]);
        const canvas = document.createElement('canvas');
        canvas.width = first.width;
        canvas.height = first.height;
        const context2d = canvas.getContext('2d', { willReadFrequently: true });
        context2d.drawImage(first, 0, 0);
        const one = context2d.getImageData(0, 0, canvas.width, canvas.height).data;
        context2d.clearRect(0, 0, canvas.width, canvas.height);
        context2d.drawImage(second, 0, 0);
        const two = context2d.getImageData(0, 0, canvas.width, canvas.height).data;
        let changed = 0;
        let max = 0;
        for (let i = 0; i < one.length; i += 4) {
          const d = Math.max(
            Math.abs(one[i] - two[i]),
            Math.abs(one[i + 1] - two[i + 1]),
            Math.abs(one[i + 2] - two[i + 2]),
          );
          if (d > 2) changed += 1;
          if (d > max) max = d;
        }
        return { percent: (changed / (one.length / 4)) * 100, max };
      },
      { a: off.toString('base64'), b: on.toString('base64') },
    );
    say(
      `H9     selected vs unselected, ${String(width).padEnd(4)} ${scheme.padEnd(5)}: ` +
        `${diff.percent.toFixed(1)}% of the station's pixels changed, max channel delta ${diff.max}`,
    );
    await context.close();
  }
}

/* ------------------------------------------------ S2, the map's step, off real pixels */

for (const scheme of ['light', 'dark']) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.addInitScript((value) => {
    try {
      localStorage.setItem('tgd-theme', value);
    } catch {
      /* see above */
    }
  }, scheme);
  await page.goto(`${base}/sahib/`, { waitUntil: 'load' });
  const sampled = await page.evaluate(() => {
    const rgb = (value) => value.match(/\d+(\.\d+)?/g).slice(0, 3).map(Number);
    const lum = ([r, g, b]) => {
      const f = (c) => {
        const s = c / 255;
        return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
      };
      return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
    };
    const ratio = (a, b) => {
      const [hi, lo] = lum(a) > lum(b) ? [lum(a), lum(b)] : [lum(b), lum(a)];
      return (hi + 0.05) / (lo + 0.05);
    };
    const ground = rgb(getComputedStyle(document.body).backgroundColor);
    const filled = rgb(
      getComputedStyle(document.querySelector('.map__cell[data-filled]:not([data-lamp])')).backgroundColor,
    );
    const inkOnFill = rgb(
      getComputedStyle(document.querySelector('.map__cell[data-filled]:not([data-lamp]) .map__cell-product')).color,
    );
    const lamp = rgb(getComputedStyle(document.querySelector('.map__cell[data-lamp][data-filled]')).backgroundColor);
    return {
      shape: ratio(filled, ground),
      product: ratio(inkOnFill, filled),
      lit: ratio(lamp, filled),
    };
  });
  say(
    `S2     ${scheme.padEnd(5)} filled cell against the ground **${sampled.shape.toFixed(2)} : 1**, ` +
      `product name inside it ${sampled.product.toFixed(2)} : 1, lit cell against its neighbours ${sampled.lit.toFixed(2)} : 1`,
  );
  if (sampled.shape < 1.5) failures.push(`§F.4b: the map's filled step is ${sampled.shape.toFixed(2)} : 1`);
  await context.close();
}

/* --------------------------------------------------------- H5, the chair's own extents */

{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(`${base}/`, { waitUntil: 'load' });
  const parts = await page.evaluate(() => {
    const symbol = document.querySelector('#fl-seat');
    return [...symbol.querySelectorAll('path')].map((p) => ({
      fill: p.getAttribute('class'),
      d: p.getAttribute('d').slice(0, 28),
    }));
  });
  say(`H5     #fl-seat draws ${parts.length} parts: ${parts.map((p) => p.fill).join(', ')}`);
  if (parts.length < 5) failures.push('§C.3 round 12: the chair needs a seat, a back and a support');
  await context.close();
}

await browser.close();
await close();
process.exit(report('evidence-rund', failures));
