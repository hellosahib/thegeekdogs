/**
 * The two person pages as they print — run E.
 *
 * A4 at its own 794px CSS width, with `emulateMedia('print')` so the print stylesheet is
 * the one that lays the page out, rather than a screen render scaled down. Two artefacts
 * per page: the PDF someone would actually attach to an email, and a PNG of the same
 * width with backgrounds suppressed, which is the form a printer produces and the form
 * §D.8's rulings have to survive.
 *
 * Run from the repo root, against a built `dist/`:
 *   node docs/reviews/runE/engineer/print-pdf.mjs
 */
import { join } from 'node:path';
import { chromium } from 'playwright';
import { serveDist } from '../../../../scripts/lib/serve.mjs';

const OUT = new URL('.', import.meta.url).pathname;
const { base, close } = await serveDist();
const browser = await chromium.launch();

for (const [route, name] of [
  ['/sahib/', 'sahib'],
  ['/tanya/', 'tanya'],
]) {
  const ctx = await browser.newContext({ viewport: { width: 794, height: 1123 } });
  const page = await ctx.newPage();
  await page.goto(base + route, { waitUntil: 'networkidle' });
  await page.emulateMedia({ media: 'print' });
  await page.waitForTimeout(600);
  await page.pdf({
    path: join(OUT, `print-${name}.pdf`),
    format: 'A4',
    printBackground: false,
    margin: { top: '14mm', bottom: '14mm', left: '14mm', right: '14mm' },
  });
  await page.screenshot({ path: join(OUT, `print-${name}-nobg.png`), fullPage: true });
  console.log(`written print-${name}.pdf and print-${name}-nobg.png`);
  await ctx.close();
}

await browser.close();
close();
