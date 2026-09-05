/**
 * Lighthouse, mobile, 3 runs, every route, both schemes — run D.
 *
 * Same method every previous run used: a gzip-encoding static server (a bare
 * http.createServer under-reports CSS/HTML transfer size), and for the dark pass a
 * scratch copy of dist/ whose inline theme-bootstrap default is flipped to 'dark',
 * because neither LHCI nor a Chrome flag can seed localStorage or prefers-color-scheme
 * for a static run. Nothing shipped is changed to produce the dark numbers.
 */
import { createServer } from 'node:http';
import { gzipSync } from 'node:zlib';
import { readFile, stat, mkdir, rm, cp, readdir } from 'node:fs/promises';
import { readFileSync, writeFileSync } from 'node:fs';
import { extname, join } from 'node:path';
import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';

const REPO = '/Users/sahib.singh/FlutterProjects/tgd_website';
const SCRATCH = process.argv[2] ?? '/tmp/lh-rund';
const OUT = join(REPO, 'docs/reviews/runD/engineer/lighthouse');
const ROUTES = process.env.LH_ROUTES
  ? process.env.LH_ROUTES.split(',')
  : [
      '/index.html',
      '/work/index.html',
      '/work/pocket-manager/index.html',
      '/work/wedding-planner/index.html',
      '/sahib/index.html',
      '/tanya/index.html',
      '/contact/index.html',
      '/404.html',
    ];
const RUNS = Number(process.env.LH_RUNS ?? 3);
const SCHEMES = (process.env.LH_SCHEMES ?? 'light,dark').split(',');

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.woff2': 'font/woff2',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.webmanifest': 'application/manifest+json',
  '.txt': 'text/plain; charset=utf-8',
};
const COMPRESSIBLE = new Set(['.html', '.css', '.js', '.svg', '.json', '.xml', '.webmanifest', '.txt']);

function serve(dir) {
  return new Promise((resolveServer) => {
    const server = createServer(async (req, res) => {
      const url = new URL(req.url, 'http://localhost');
      let file = join(dir, decodeURIComponent(url.pathname));
      try {
        if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
        const body = await readFile(file);
        const ext = extname(file);
        res.setHeader('Content-Type', TYPES[ext] ?? 'application/octet-stream');
        if (COMPRESSIBLE.has(ext) && /\bgzip\b/.test(req.headers['accept-encoding'] ?? '')) {
          const gz = gzipSync(body);
          res.setHeader('Content-Encoding', 'gzip');
          res.setHeader('Content-Length', gz.length);
          res.end(gz);
        } else {
          res.setHeader('Content-Length', body.length);
          res.end(body);
        }
      } catch {
        res.statusCode = 404;
        res.end('not found');
      }
    });
    server.listen(0, '127.0.0.1', () => resolveServer({ port: server.address().port, server }));
  });
}

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

await mkdir(OUT, { recursive: true });
await rm(SCRATCH, { recursive: true, force: true });
await mkdir(SCRATCH, { recursive: true });
await cp(join(REPO, 'dist'), join(SCRATCH, 'light'), { recursive: true });
await cp(join(REPO, 'dist'), join(SCRATCH, 'dark'), { recursive: true });
let flipped = 0;
for (const file of await walk(join(SCRATCH, 'dark'))) {
  if (!file.endsWith('.html')) continue;
  const text = readFileSync(file, 'utf8');
  const next = text.replace("var scheme = 'light';", "var scheme = 'dark';");
  if (next !== text) flipped += 1;
  writeFileSync(file, next);
}
console.log(`dark bootstrap flipped in ${flipped} html file(s)`);

const summary = [];
for (const scheme of SCHEMES) {
  const { port, server } = await serve(join(SCRATCH, scheme));
  const chrome = await launch({ chromeFlags: ['--headless=new', '--no-sandbox'] });
  for (const route of ROUTES) {
    const rows = [];
    for (let run = 0; run < RUNS; run += 1) {
      const result = await lighthouse(
        `http://127.0.0.1:${port}${route}`,
        { port: chrome.port, output: 'json', logLevel: 'error' },
        {
          extends: 'lighthouse:default',
          settings: { formFactor: 'mobile', throttlingMethod: 'devtools', screenEmulation: { mobile: true, width: 360, height: 640, deviceScaleFactor: 2, disabled: false } },
        },
      );
      const lhr = result.lhr;
      rows.push({
        perf: Math.round(lhr.categories.performance.score * 100),
        a11y: Math.round(lhr.categories.accessibility.score * 100),
        bp: Math.round(lhr.categories['best-practices'].score * 100),
        seo: Math.round(lhr.categories.seo.score * 100),
        lcp: Math.round(lhr.audits['largest-contentful-paint'].numericValue),
        cls: lhr.audits['cumulative-layout-shift'].numericValue,
        tbt: Math.round(lhr.audits['total-blocking-time'].numericValue),
      });
    }
    const row = {
      route,
      scheme,
      perf: Math.min(...rows.map((r) => r.perf)),
      a11y: Math.min(...rows.map((r) => r.a11y)),
      bp: Math.min(...rows.map((r) => r.bp)),
      seo: Math.min(...rows.map((r) => r.seo)),
      lcpMax: Math.max(...rows.map((r) => r.lcp)),
      clsMax: Math.max(...rows.map((r) => r.cls)),
      tbtMax: Math.max(...rows.map((r) => r.tbt)),
      runs: rows,
    };
    summary.push(row);
    console.log(
      `${scheme.padEnd(5)} ${route.padEnd(36)} P${row.perf} A${row.a11y} B${row.bp} S${row.seo}` +
        `  LCP ${row.lcpMax}ms  CLS ${row.clsMax.toFixed(4)}  TBT ${row.tbtMax}ms`,
    );
  }
  await chrome.kill();
  server.close();
}
writeFileSync(join(OUT, 'summary.json'), JSON.stringify(summary, null, 2));
console.log('written', join(OUT, 'summary.json'));
