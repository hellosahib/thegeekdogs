/**
 * The floor's `Owns` card at 360 and 390 — run E.
 *
 * `/`'s default card is the empty chair's (§C.6), which carries no `Owns` line, so the
 * mark run B blocked on (B3, "Sahib owns … the releas") is not on screen until a human
 * desk is opened. This opens Sahib's, then shoots the panel and reports where the card's
 * `Owns` line ends against the plate's band — which on `/` is a band the plate is not in,
 * because round 12 took the floor section out of its wrapper at every width.
 */
import { join } from 'node:path';
import { chromium } from 'playwright';
import { serveDist } from '../../../../scripts/lib/serve.mjs';

const OUT = new URL('.', import.meta.url).pathname;
const { base, close } = await serveDist();
const browser = await chromium.launch();

for (const scheme of ['light', 'dark']) {
  for (const width of [360, 390]) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: scheme });
    const page = await ctx.newPage();
    await page.goto(base + '/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3200);

    const opened = await page.evaluate(() => {
      const card = [...document.querySelectorAll('.station-card')].find((c) =>
        c.querySelector('.station-card__gate-name'),
      );
      if (!card) return null;
      for (const other of document.querySelectorAll('.station-card')) other.hidden = other !== card;
      const line = card.querySelector('.station-card__gate-name');
      const range = document.createRange();
      range.selectNodeContents(line);
      const rects = [...range.getClientRects()].filter((r) => r.width > 0);
      const plate = document.querySelector('.plate');
      let wrapper = plate?.parentElement ?? null;
      while (wrapper && getComputedStyle(wrapper).display === 'contents') wrapper = wrapper.parentElement;
      return {
        name: card.querySelector('.station-card__name')?.textContent?.trim() ?? '',
        inkRight: Math.round(Math.max(...rects.map((r) => r.right))),
        band: window.innerWidth - 128,
        inWrapper: Boolean(wrapper && wrapper.contains(line)),
      };
    });

    await page.locator('.floor__slot').scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    await page
      .locator('.floor__slot')
      .screenshot({ path: join(OUT, `home-owns-${width}-${scheme}.png`) });
    console.log(
      `${scheme} ${width}  ${opened.name}'s card: the Owns line ends x ${opened.inkRight}, band at x ${opened.band}, inside the plate's wrapper: ${opened.inWrapper}`,
    );
    await ctx.close();
  }
}

await browser.close();
close();
