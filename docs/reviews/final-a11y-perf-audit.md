# Full-site audit — Perf & A11y (final build, commit 6283b4a)

**Auditor:** Perf & A11y Auditor · **Date:** 2026-09-05 · **Subject:** frozen copy of the final build output (commit `6283b4a`, "build run E, and the evidence behind it"), served from `scratchpad/dist-final` — all seven content routes plus `404.html` (`/`, `/work/`, `/work/pocket-manager/`, `/work/wedding-planner/`, `/sahib/`, `/tanya/`, `/contact/`, `404.html`). Same method as `docs/reviews/runB-a11y-perf-audit.md`, run again on the frozen final copy, plus checks for everything that changed since run B: subset fonts and fallback font metrics (runs D/E), the sub-768 contact plate and its accessible name, Tanya's three-layer core/edge band and its ticks at 1024 and 1440, the print collapse fix, and the 404 room.

**Method note.** No repo file was edited and no source was touched. `scripts/check-floor-pointer.mjs` takes no CLI path argument — it imports `DIST` from `./lib/dist.mjs` unconditionally, confirmed again by reading the script directly — so, same as run B, I worked from a scratch copy of `scripts/` (`scratchpad/scripts-final/`) with only `lib/dist.mjs`'s `DIST` constant re-pointed at the frozen `dist-final` path, and ran every dist-reading gate (`qa-console`, `qa-images`, `qa-links`, `qa-worlds`, `qa-plate`, `check-floor-budget`, `check-floor-pointer`, `measure-bundles`) through that copy. Full combined stdout: `docs/reviews/final/audit/budget/gates-output.txt`. Dark scheme was reproduced exactly as run B did it — a second copy of the frozen dist with the inline theme-bootstrap script's default flipped from `'light'` to `'dark'` in all 8 HTML files (confirmed: "dark bootstrap flipped in 8 html file(s)" in the Lighthouse run log) — nothing shipped was changed.

## Verdict: **APPROVED**

*(Originally filed as **CHANGES REQUESTED, not blocking**, below, on the pre-stroke build; closed by the "S2 closed" section appended at the end of this document, against commit `df1da79` on the live repo, `npm run build`, served from `dist/` directly — no scratch-copy repointing, no source edits. The original filing is left intact for the record.)*

Every §11 budget line clears with wide margin on all eight routes in both schemes; axe-core returns **zero violations** on all 16 route × scheme combinations; keyboard traversal, focus visibility, reduced motion, print, and the pointer acceptance test all pass. Three items that run B flagged are now **closed** in this build (Tanya's print collapse, the 404 SEO CI-assertion bug, and font subsetting). This was not `APPROVED` at filing because one new, measured, non-waived shortfall existed: **the S2 map-cell fill/ground contrast (2.97:1 light / 2.91:1 dark) sits under WCAG 2.2's 3:1 non-text-contrast minimum for meaningful graphics** — a dramatic improvement on run B's 1.13:1/1.16:1, and the exact number DESIGN.md's own spec targets, but still, arithmetically, a fail against the stated 3:1 line, not a pass with margin (Finding 1, **now closed on the stroke — see "S2 closed" below**). One informational item recurs unchanged from run B (Finding 2, Tanya's DOM-vs-visual order at ≥1024) and is not a WCAG violation. Real-hardware and live-VoiceOver passes remain owed to a human — see "What could not be run" — and are not treated as blocking criteria by this or any prior round of this audit.

---

## 1. Lighthouse — mobile, throttled, 3 runs × 8 routes × 2 schemes (48 runs)

`lighthouse` (programmatic API), one shared headless Chrome instance, `formFactor: mobile`, `throttlingMethod: devtools`, `screenEmulation` at 360×640 @2x, against a gzip-encoding local static server (a bare `http.createServer` under-reports CSS/HTML transfer size). Full summary: `docs/reviews/final/audit/lighthouse/summary.json`.

| Route | Scheme | Perf | A11y | BP | SEO | LCP (avg of 3) | LCP (max of 3) | CLS (max) | TBT (max) |
|---|---|---|---|---|---|---|---|---|---|
| `/` | light | 100 | 100 | 100 | 100 | 1461 ms | 1464 ms | 0.0001 | 0 ms |
| `/` | dark | 100 | 100 | 100 | 100 | 1457 ms | 1468 ms | 0.0001 | 0 ms |
| `/work/` | light | 100 | 100 | 100 | 100 | 1437 ms | 1443 ms | 0.0001 | 0 ms |
| `/work/` | dark | 100 | 100 | 100 | 100 | 1452 ms | 1457 ms | 0.0001 | 0 ms |
| `/work/pocket-manager/` | light | 100 | 100 | 100 | 100 | 1512 ms | 1521 ms | 0.0001 | 0 ms |
| `/work/pocket-manager/` | dark | 100 | 100 | 100 | 100 | 1516 ms | 1519 ms | 0.0001 | 0 ms |
| `/work/wedding-planner/` | light | 100 | 100 | 100 | 100 | 1508 ms | 1517 ms | 0.0001 | 0 ms |
| `/work/wedding-planner/` | dark | 100 | 100 | 100 | 100 | 1512 ms | 1514 ms | 0.0001 | 0 ms |
| `/sahib/` | light | 100 | 100 | 100 | 100 | 1450 ms | 1466 ms | 0.0001 | 0 ms |
| `/sahib/` | dark | 100 | 100 | 100 | 100 | 1467 ms | 1473 ms | 0.0001 | 0 ms |
| `/tanya/` | light | 100 | 100 | 100 | 100 | 1448 ms | 1456 ms | 0.0001 | 0 ms |
| `/tanya/` | dark | 100 | 100 | 100 | 100 | 1462 ms | 1466 ms | 0.0001 | 0 ms |
| `/contact/` | light | 100 | 100 | 100 | 100 | 1443 ms | 1445 ms | 0.0001 | 0 ms |
| `/contact/` | dark | 100 | 100 | 100 | 100 | 1448 ms | 1458 ms | 0.0001 | 0 ms |
| `404.html` | light | 100 | 100 | 100 | **66** | 1442 ms | 1451 ms | 0.0001 | 0 ms |
| `404.html` | dark | 100 | 100 | 100 | **66** | 1445 ms | 1451 ms | 0.0001 | 0 ms |

Against §11 (Perf/A11y/BP/SEO ≥ 95/100/95/100, LCP < 2000 ms, CLS < 0.05): **every content route clears every line with wide margin.** Worst LCP across all 48 individual runs is **1521 ms** (`/work/pocket-manager/`, light) — 479 ms of headroom under the 2000 ms ceiling. CLS is **0.0001** on literally every one of the 48 runs, content routes and 404 alike — a categorical improvement on run B's `/contact/` figure of 0.0063 (and the Engineer's self-reported 0.030 for that route in an earlier build), and it corroborates the fallback-font-metrics work: the built CSS ships `ascent-override`/`descent-override`/`line-gap-override`/`size-adjust` on both `Anek Latin fallback` and `Instrument Sans fallback` `@font-face` rules, tuned so the fallback and the webfont occupy the same box and swapping in doesn't move layout. TBT is **0 ms** on all 48 runs.

`404.html`'s SEO score of 66 is unchanged from run B and is not a §11 defect: the sole failing audit is `is-crawlable`, because `404.html` correctly ships `<meta name="robots" content="noindex">`, and Lighthouse's SEO category penalises any noindexed page by design. **Run B's Finding 3 is closed in the live repo**: `lighthouserc.json` now sets `"categories:seo": "off"` for the `.*\/404\.html$` URL pattern (confirmed by reading the file directly), rather than asserting a `minScore` that a 66 could never satisfy.

## 2. Transfer sizes as served, gzip

Ran `check-floor-budget.mjs` and `measure-bundles.mjs` against the frozen dist (repointed method above). Full output: `docs/reviews/final/audit/budget/gates-output.txt`; per-route breakdown: `docs/reviews/final/audit/budget/transfer-sizes-per-route.txt`.

| Line (brief §11) | Budget | Measured | Result |
|---|---|---|---|
| JS transferred, home | ≤ 100 KB gz | **0 B external** (inline module scripts only, 1,165 B gz across 3 inline `<script>` tags, counted inside the HTML) | PASS |
| CSS transferred, home (shared across all 8 routes) | ≤ 40 KB gz | **13,312 B** (raw 74,896 B) | PASS, 67% headroom |
| Studio floor SVG + JS | ≤ 80 KB gz (81,920 B) | **6,813 B** (34,174 B raw floor markup + 2 inline module scripts) | PASS, 91.7% headroom |
| Total page weight, home | ≤ 1.2 MB (1,258,291 B) | **95,517 B** (HTML 13,221 + CSS 13,312 + inline JS 1,253 + fonts 68,984, per `measure-bundles.mjs`'s own reconciled total) | PASS, 92.4% headroom |

**Zero external `<script>` files on any of the 8 routes** — confirmed by regex scan of every HTML file; the JS line is trivially satisfied site-wide. Per-route HTML + inline-JS gzip sizes (CSS is one shared 13,312 B file across all routes):

| Route | HTML gz | Inline JS gz (script count, raw bytes) | External scripts |
|---|---|---|---|
| `/` | 13,221 B | 1,165 B (3 scripts, 2,436 B raw) | 0 |
| `/work/` | 4,457 B | 532 B (2 scripts, 1,027 B raw) | 0 |
| `/work/pocket-manager/` | 5,738 B | 532 B (2 scripts, 1,027 B raw) | 0 |
| `/work/wedding-planner/` | 4,605 B | 532 B (2 scripts, 1,027 B raw) | 0 |
| `/sahib/` | 6,748 B | 532 B (2 scripts, 1,027 B raw) | 0 |
| `/tanya/` | 6,622 B | 532 B (2 scripts, 1,027 B raw) | 0 |
| `/contact/` | 3,893 B | 532 B (2 scripts, 1,027 B raw) | 0 |
| `404.html` | 3,843 B | 532 B (2 scripts, 1,027 B raw) | 0 |

**Fonts — subsetting is now done; run B's Finding 5 is closed.** `dist-final/fonts/` ships two files: **48,432 B** (`anek-latin-subset.woff2`) and **20,552 B** (`instrument-sans-subset.woff2`) — **68,984 B total**, gzip-equal to raw since woff2 is already compressed. This is **under** PLAN.md §1.5's own measured target of 70,708 B (69.1 KB), and a **63.5%** cut from run B's shipped, unsubsetted **133,852 B**. `qa-worlds.mjs` and `qa-plate.mjs` (run directly against this frozen dist) both PASS, so the subset was not cut so tight that any rendered glyph is missing from a real page.

## 3. axe-core — every route, both schemes (16 combinations)

`axe-core` 4.13.0 (vendored, `node_modules/axe-core/axe.min.js`), injected via `page.addScriptTag`, run with `wcag2a`, `wcag2aa`, `wcag21aa`, `wcag22aa`, `best-practice` tags. Full output: `docs/reviews/final/audit/axe/axe-results.json`.

| Route | Scheme | Violations | Passes | Incomplete |
|---|---|---|---|---|
| `/` | light / dark | **0** | 40 | 1 |
| `/work/` | light / dark | **0** | 38 | 1 |
| `/work/pocket-manager/` | light / dark | **0** | 41 | 0 |
| `/work/wedding-planner/` | light / dark | **0** | 40 | 0 |
| `/sahib/` | light / dark | **0** | 46 | 0 |
| `/tanya/` | light / dark | **0** | 39 | 0 |
| `/contact/` | light / dark | **0** | 38 | 0 |
| `404.html` | light / dark | **0** | 38 | 0 |

**Zero violations across all 16 route × scheme combinations.** The recurring "incomplete" (needs-review, not a fail) item is `color-contrast`, and it now appears on both `/` and `/work/` in both schemes (run B saw it only on `/`) — axe cannot compute contrast automatically for SVG `<text>` sitting on a busy, painted background (the floor scene's station nameplates, and `/work/`'s shared track/aria-current iconography). Resolved by inspection, same as run B: `.fl-plate` fill is `var(--tgd-on-room)` with `paint-order: stroke; stroke: var(--fl-ground); stroke-width: 3px` — a halo matching the room's own ground colour — so the worst case is chalk-on-room, already well above AA. Not a defect.

## 4. Keyboard traversal — every route, plus the sub-768 plate's accessible name

Full trace: `docs/reviews/final/audit/keyboard/tab-order.json`, at 1440×900, light scheme.

**Home (34 stops, unchanged shape from run B), confirmed against DESIGN.md/COPY.md:** skip link → wordmark → 4 nav links → theme toggle → 2 CTAs → the **ten stations in DOM order** (Sahib Singh → Tanya Jain → Spec Writer → Designer → Programmer → Test Engineer → Security Auditor → Reviewer → Release Watcher → Ship approval, names matching COPY.md's patterns exactly, gate spoken inline, chair's distinct pattern intact) → strip row links → Play Store link → **"Read how it gets built"** (a build-stage link, new copy since run B, correctly reachable and named) → contact plate → final CTA → footer (email, nav repeat, 4 social links, each carrying "Opens a new tab." in its accessible name).

**Focus ring visible on every one of the 34 stops**, no exceptions: `outline: solid 3px` in `--floor` or `--chalk` depending on background, plus the `--lamp` inner ring (`box-shadow: rgb(242, 169, 59) 0 0 0 2px`) on every stop. No focus trap.

**The card slot's silent-on-focus / announce-on-activation behaviour**, re-verified behaviourally (`docs/reviews/final/audit/keyboard/slot-behavior.json`): tabbing onto "Sahib Singh" leaves the `aria-live="polite"` announcer empty while the visible slot swaps silently; pressing Enter writes the full card text to the announcer; tabbing onward to "Tanya Jain" swaps the visible slot again without touching the (still-stale) announcer text. Unchanged from run B, still correct.

**The sub-768 plate's accessible name, checked directly at 360 and 1440** (`docs/reviews/final/audit/keyboard/plate-accessible-name.json`), on all six routes that carry the plate:

| Width | Visible label | `plate__address` display | `aria-label` |
|---|---|---|---|
| 360 | `Email` (112 × 56 box) | `none` | `Email <address>. Opens a new message about a project.` |
| 1440 | `<address>` (260 × 56 box) | `block` | `Email <address>. Opens a new message about a project.` |

**The accessible name is byte-identical in pattern at both widths on every route** — only the *visible* text changes (a short "Email" label below 768, the full address at 1440+); the address itself is always spoken, per-world (`thegeekdogs@gmail.com` on `/`, `/work/*`; `sahiboffc@gmail.com` on `/sahib/`; `jaintanya999@gmail.com` on `/tanya/`). No regression, no width-dependent ambiguity.

## 5. Accessibility tree

Full data: `docs/reviews/final/audit/a11y-tree/tree.json`.

- **Landmarks:** `banner`, `navigation` (Primary), `main`, `contentinfo` on every route; the 8 content routes additionally carry a second `navigation` (Footer) for **5 landmarks total**, while `404.html` has **4** (no footer nav — the room is deliberately minimal, and this is consistent with the "404 room" design, not a defect).
- **One `h1` per page, no skipped heading level, on all 8 routes:**

| Route | Heading level sequence |
|---|---|
| `/` | 1,2,3,3,3,3,3,3,3,3,3,3,2,2,2,3,3,3,3,2,2,2,2 |
| `/work/` | 1,2,2,2 |
| `/work/pocket-manager/` | 1,2,2,2,2,2 |
| `/work/wedding-planner/` | 1,2,2,2,2 |
| `/sahib/` | 1,2,2,2,2,2 |
| `/tanya/` | 1,2,2,2 |
| `/contact/` | 1,2,3,3,3,2 |
| `404.html` | 1,2 |

No sequence jumps by more than one level anywhere. `/sahib/` now carries one more level-2 heading than run B's `1,2,2,2` (COPY.md round 14's new map/cards section lines, "What he ships and where" / "The roles behind the map") — still no skip.

- **`aria-current="step"`:** home carries 2 (`"Live. Where it is now."` / `"Final touches. Where it is now."`), both `<li>` inside an `<ol>`.
- **Images:** every `<img>` (4 on `/work/pocket-manager/`, 1 on `/work/wedding-planner/`) has a real, non-generic `alt`; confirmed also by `qa:images` PASS.
- **Sahib's map, real `<table>`, roles survive the sub-1024 restyle:** at 768px, CSS `display` on the table is `block` but `role="table"` is retained with **6 `columnheader`s and 5 `rowheader`s** still present — confirmed by DOM query, matching run B.
- **The quotes on `/tanya/` as quotation semantics:** two real `<blockquote class="quote">` elements (each wrapping a `<p>`, not styled paragraphs). Unchanged from run B: both blockquotes share one `<cite>Sahib Singh, who worked alongside her at Motive.</cite>` in a `<p class="quote__attribution">` placed *after* both — confirmed by reading the rendered DOM directly. Not a WCAG violation (axe found nothing); see Finding 2 below, carried forward.

## 6. Reduced motion — `/`, `/sahib/`, `/tanya/`

Playwright context `reducedMotion: 'reduce'`. `docs/reviews/final/audit/motion/reduced-motion.json`.

| Route | `document.getAnimations({subtree:true})` | `document.readyState` |
|---|---|---|
| `/` | **0** | complete |
| `/sahib/` | **0** | complete |
| `/tanya/` | **0** | complete |

Zero running animations on all three — unchanged from run B.

## 7. Contrast

**(a) Token-level, computed against the frozen build's own compiled CSS**, via `qa-worlds.mjs` repointed at `dist-final`: 40 computed tokens/baselines across 4 routes × 2 schemes, all matching DESIGN.md's published hex. Same run also reports Tanya's tick geometry at 1024 and 1440 (§6 covers this in full). Full output inside `docs/reviews/final/audit/budget/gates-output.txt`.

**(b) Pixel-level spot checks, sampled from actual rendered screenshots (not computed style).** `docs/reviews/final/audit/contrast/pixel-contrast.json`.

| Check | Method | Result | Needs | Verdict |
|---|---|---|---|---|
| Future-node stroke, light, `/work/wedding-planner/` | 4× DPR screenshot of the "Submitted for review" node; darkest pixel sampled from the ring's **top arc only** (a first pass that scanned the full perimeter was contaminated by the horizontal progress-track line, which is fully opaque and sits through the ring's vertical centre — corrected by restricting the scan band, see script comments) vs. a corner background pixel | **4.02 : 1** — exactly matching the token math (`--node-future-stroke:#0f2a2e99`, alpha 0x99 = 0.60, over `--sheet`) | ≥ 3 : 1 | **PASS** |
| Future-node stroke, CSS variable in frozen build | Read from `dist-final/_astro/style.*.css`: `--node-future-stroke:#0f2a2e99` light, `#e8ede973` (alpha ≈ 0.45) dark | Matches DESIGN.md's round-4 fix exactly — unchanged from run B | — | **PASS** |
| Sahib's `--s-dim` on `--s-panel` | Computed on the live page, light scheme | `#545c74` on `#e0e2ec` → **5.15 : 1** (token unchanged from run B) | AA body 4.5:1 | **PASS** |
| **S2 — the map's filled cells vs. the ground (`--s-fill` on `--s-ground`), light, `/sahib/`, 1024px matrix layout** | 4× DPR screenshot; 6×6px patch, averaged, sampled inside each cell's own padding inset (away from text/border), a filled cell vs. an empty cell | Pixel: **2.97 : 1** — token read confirms `--s-fill:#868aa0` on `--s-ground:#eeeff4` | **3 : 1** (non-text, meaningful graphic) | **FAIL**, by 0.03 |
| **S2, same check, dark** | Same method, dark scheme | Pixel: **2.91 : 1** — token read confirms `--s-fill:#5e6480` on `--s-ground:#161c2e` | **3 : 1** | **FAIL**, by 0.09 |

**S2 called plainly: both measurements fail the 3:1 non-text-contrast minimum for a meaningful graphic (WCAG 2.2 SC 1.4.11), even though this is a deliberate, spec'd, and dramatically-improved value** — DESIGN.md §F.4b documents the exact same numbers (2.97:1 light / 2.91:1 dark) as the intended fix for run B's 1.13:1/1.16:1 finding, and the fix genuinely closed the "reads as an accident" problem the earlier value had. But the number chosen is still arithmetically under the line the spec itself cites as its target formula for a non-text distinction, not over it. This is not waived because it is close, deliberate, or a large improvement: it is Finding 1 below, and it is not treated as blocking because the map's information (which product, which company) is also carried by visible text in every cell, filled or not, so no content is lost to a colour-blind or low-vision reader — but the "shape of the filled region" reading §F.1 asks for is exactly the thing a sub-3:1 step doesn't reliably deliver.

**(c) Full pair-level arithmetic** (all palettes, live-repo `src/styles/tokens.css`, supporting evidence only per the same caveat as run B) was not re-run for the final build since (a) and (b) above are the primary, dist-sourced evidence and already surfaced the one material change (S2).

## 8. Touch targets at 360 CSS px

Full data: `docs/reviews/final/audit/touch-targets/targets-360.json` — every route.

**Nothing on any route falls under WCAG 2.2 SC 2.5.8's 24×24 CSS px AA minimum** once the inline-text-link exception is applied — the same standing ruling run B recorded (step 2 Finding 3 / ruling 3). The recurring exceptions are unchanged: the header's 4 nav links (35–43px wide × 44px tall — height clears 44, only width, governed by the link's own text, falls short of the 44px *house* target), "Open Pocket Manager in the Play Store" (285×20, not an inline text link but a standing exception), the footer email link (187×20), and `404.html`'s "Back to the studio home page" (131×20). One item is new since run B — **"Read how it gets built"** (156×20 on home) — but it is a plain inline text link (`isTextLink: true`), the same exception class as every other under-44 item here, not a new class of defect.

## 9. Print — `/sahib/` and `/tanya/`, including the collapse fix

Playwright `page.emulateMedia({media:'print'})` + `page.pdf()`, loaded from the **dark**-default server so a pass proves the "print always uses light tokens" rule rather than trivially matching an already-light page. PDFs: `docs/reviews/final/audit/print/{sahib,tanya}-print.pdf`; previews: `docs/reviews/final/audit/print/{sahib,tanya}-print-preview.png`; raw checks: `docs/reviews/final/audit/print/print-checks.json`.

| Check | `/sahib/` | `/tanya/` |
|---|---|---|
| Floor omitted | N/A — no floor section on person pages | N/A |
| Theme toggle `display` | `none` | `none` |
| Contact plate `display` | `none` | `none` |
| Body background, loaded **dark** | `rgb(238,239,244)` = his light `--s-ground` | `rgb(237,238,238)` = her light `--t-ground` |
| Body text colour | `rgb(26,32,51)` = his light `--s-ink` | `rgb(27,32,32)` = her light `--t-ink` |
| Cards flattened | `transform: none`, `box-shadow: none`, solid white background | Same |
| Name once | `<h1>Sahib Singh</h1>` (count 1) | `<h1>Tanya Jain</h1>` (count 1) |
| Person's own address, once | `.print-address` count = 1 (`sahiboffc@gmail.com`) | `.print-address` count = 1 (`jaintanya999@gmail.com`) |

**Run B's Finding 1 is closed.** `.core-band__grid`'s three children (`core`, `edge--android`, `edge--ios`, plus the gates link) now measure `display: block` in print, `grid-template-columns` is irrelevant once display is block, and every child shares the same `left: 48` with sequential `top` offsets (739 → 1822 → 2268 → 2350) — a genuine single-column stack in DOM order (core, then Android, then iOS), confirmed by reading `src/layouts/tanya/LayoutA.astro`: a global `.grid{display:block}` print reset (added to cover "person pages and anything a later round adds") plus this component's own tidy-up (ticks suppressed in print, since a connector between two now-stacked blocks says nothing).

## 10. Pointer — `scripts/check-floor-pointer.mjs`, run directly against this frozen dist

The script does **not** accept a CLI path override (confirmed by reading it: `DIST` is imported unconditionally from `./lib/dist.mjs`), so it was run via the repointing method above — a real, independent execution, not a citation. Full output: `docs/reviews/final/audit/budget/gates-output.txt`.

**10 of 10 stations, at all six widths (360, 390, 768, 1024, 1440, 1920), in both schemes: `elementFromPoint` returns the station's own button, and nameplates clear every other station's button box at every width in both schemes.** `PASS check-floor-pointer`.

## 11. Tanya's three-layer layout — ticks at 1024/1440, and reading order at all four named widths

`qa-worlds.mjs` (repointed): `/tanya/ @ 1024` — 2 ticks ending on the core's own x 286 and 738, three labels on one baseline, 51.0px below the band's top edge; `/tanya/ @ 1440` — 2 ticks ending on x 426 and 1014, same baseline geometry. (§G.3a's "50" is reported, not asserted, per the script's own comment — this is descriptive geometry, not a pass/fail gate, and the measured 51.0px is a 1px rounding difference from the spec's nominal figure, not a defect.)

**DOM-vs-visual reading order**, all four widths (`docs/reviews/final/audit/keyboard/tanya-reading-order.json`): DOM order is always `core → edge--android → edge--ios → gates-link`. At **360 and 768**, visual order matches DOM order exactly. At **1024 and 1440**, the `@media (min-width:1024px)` grid-area placement puts `edge--android` first (leftmost), `core` second, `edge--ios` third — so visual order diverges from DOM/reading order at both named ≥1024 widths. This is unchanged from run B and is not re-raised as a new defect (see Finding 2 — carried forward, informational).

## 12. The 404 room

- **Lighthouse:** 100/100/100/66 in both schemes; the 66 is the `is-crawlable` audit doing exactly its job against a correctly-`noindex`ed page (§1). CLS **0.0001**, matching every other route — the CLS regression run C's own history mentions (`0.0596` from `contain-intrinsic-size`, since fixed) does not recur here.
- **axe-core:** 0 violations, 38 passes, both schemes (§3).
- **Accessibility tree:** 4 landmarks (`banner`, `navigation` (Primary), `main`, `contentinfo` — no footer nav, matching the room's deliberate minimalism), heading sequence `1,2` (§5).
- **Touch targets:** 5 targets under 44px at 360, all in the same standing-exception class as every other route (§8).
- **`lighthouserc.json`:** `categories:seo` is `"off"` for the 404 URL pattern — run B's Finding 3 is closed (§1).

---

## Findings

**Finding 1 (closed — see "S2 closed" below, confirmed on commit `df1da79`) — the S2 map-cell fill (`--s-fill` on `--s-ground`) measures under the 3:1 non-text-contrast minimum for a meaningful graphic, in both schemes.** `docs/reviews/final/audit/contrast/pixel-contrast.json`, `map-cells-{light,dark}-1024.png`. Pixel-sampled and token-confirmed: **2.97:1 light, 2.91:1 dark** — both under WCAG 2.2 SC 1.4.11's 3:1 line. This is the exact value DESIGN.md §F.4b specs as the fix for run B's 1.13:1/1.16:1 (a dramatic, real improvement — the "staircase" shape is now perceptible where it wasn't before), and it is not waived here simply because it is close or deliberate: measured against the number the check asked about, it fails. Mitigating factor, not an excuse: every cell (filled or empty) also carries visible text (the product name, when filled), so the map's *information* does not depend on the fill/ground step alone — only the "shape of the filled region" reading is weakened for a low-vision viewer relying on that boundary rather than reading each cell's text. **Action:** nudge `--s-fill`'s luminance a small amount further from `--s-ground` in both schemes (something in the range of 3.0–3.2:1 would clear the line with a small, likely visually-negligible, margin) — a token change, not a layout change, and worth a Design Lead round rather than a unilateral auditor fix, since §F.4b's own text ties this exact ratio to "matched on ratio rather than on hex distance" against the lit-cell/filled-cell pair (§B.2/§B.2a) and a change here may have knock-on ratios to re-check.

**Finding 2 (informational, carried forward from run B, unchanged) — Tanya's three-column layout's DOM order matches visual order at 360 and 768, but diverges at 1024 and 1440.** `docs/reviews/final/audit/keyboard/tanya-reading-order.json`. DOM order is always `core → edge--android → edge--ios`. At ≥1024, the grid-area placement puts Android first (left), core second (middle), iOS third (right) — a sighted keyboard user tabbing through hears/reads the core's content before Android's, while visually Android sits to its left. Not a WCAG violation (SC 1.3.2 is about whether a sequence is "meaningful," and each block is independently coherent) — recorded again since this audit re-measured all four named widths.

**Finding 3 (informational) — Tanya's two adjacent quotes still share one `<cite>`, associated only by proximity, not programmatically.** Unchanged from run B (`docs/reviews/final/audit/a11y-tree/tree.json`, confirmed against the rendered DOM directly): two real `<blockquote class="quote">` elements, followed by one `<p class="quote__attribution"><cite>Sahib Singh, who worked alongside her at Motive.</cite></p>` covering both. Real quotation semantics (axe found nothing) but no programmatic link from the second blockquote to the citation that also covers it. Not raised as a WCAG failure.

**Finding 4 (closed since run B, confirmed) — font subsetting is done.** §2: **68,984 B shipped**, under PLAN.md's own 70,708 B target, down from run B's unsubsetted 133,852 B (a 63.5% cut). `qa-worlds`/`qa-plate` PASS against this exact frozen build, so no glyph is missing from a rendered page.

**Finding 5 (closed since run B, confirmed) — Tanya's print/PDF layout now collapses to one column.** §9: `.core-band__grid` is `display:block` in print with every child sharing the same left edge in DOM order (core, Android, iOS). Run B's Finding 1 is closed.

**Finding 6 (closed since run B, confirmed, recorded for the paper trail) — `lighthouserc.json`'s 404 SEO assertion is now correctly configured.** §1: `"categories:seo": "off"` for the 404 URL pattern, rather than a `minScore` a `noindex`d page's 66 could never satisfy. Run B's Finding 3 is closed.

---

## What could not be run

- **A live screen-reader session (VoiceOver).** Not run, same reason as every prior audit in this project: driving VoiceOver requires enabling it system-wide via Accessibility permissions and produces audible speech and real system-state changes, out of bounds for an unattended agent. **Owed to a human.** Substitute evidence: full Chromium accessibility-tree snapshots (§5) showing exactly what a screen reader's accessibility API would expose — not a live read, and not claimed as equivalent.
- **Real mid-tier Android hardware on a throttled real 4G connection.** **Owed to a human.** Every timing number above is Lighthouse's simulated DevTools-protocol throttling. TBT reads 0 ms on all 48 runs, a strong signal, not a substitute.

## Artefacts

All evidence lives under `docs/reviews/final/audit/`:
- `lighthouse/summary.json` — all 16 route × scheme combinations, averaged + per-run scores/metrics
- `axe/axe-results.json` — full axe-core results, all 16 combinations
- `keyboard/tab-order.json`, `keyboard/slot-behavior.json`, `keyboard/tanya-reading-order.json`, `keyboard/plate-accessible-name.json` — tab stops, slot behaviour trace, Tanya DOM-vs-visual order at 4 widths, the plate's accessible name at 360/1440 on every route that carries it
- `a11y-tree/tree.json` — landmarks, headings, `aria-current`, images, external-link names, blockquotes, Sahib's map role/display data, all 8 routes
- `contrast/pixel-contrast.json`, `contrast/future-node-crop.png`, `contrast/map-cells-{light,dark}-1024.png` — the pixel-sampled spot checks, including the S2 map-cell check
- `touch-targets/targets-360.json` — every interactive element's bounding box at 360px, all 8 routes
- `print/{sahib,tanya}-print.pdf`, `print/{sahib,tanya}-print-preview.png`, `print/print-checks.json` — print evidence, including the `.core-band__grid` collapse measurement
- `motion/reduced-motion.json` — animation counts, `/`, `/sahib/`, `/tanya/`
- `screenshots/` — focus-ring screenshots per route, reduced-motion stills
- `budget/gates-output.txt` — full stdout of `qa-console`, `qa-images`, `qa-links`, `qa-worlds`, `qa-plate`, `check-floor-budget`, `check-floor-pointer`, `measure-bundles`, all run directly against this frozen dist; `budget/transfer-sizes-per-route.txt` — per-route HTML/inline-JS gzip breakdown

---

## S2 closed — stroke re-check on the fixed build (commit `df1da79`)

**Auditor:** Perf & A11y Auditor · **Date:** 2026-09-05 · **Subject:** the live repo at commit `df1da79` ("fix(sahib): 1.5px ink stroke on filled map cells, asserted at 3:1 in qa:contrast"), the Engineer/Orchestrator fix for Finding 1 above, landed via DESIGN.md round 14 (§F.4c) and REVIEWS.md's "Map-cell stroke" entry. Built fresh with `npm run build` (Astro, 8 pages, "Complete!") and served directly from `dist/` on a static file server — **no scratch-copy repointing this time**, since the check needed is a pixel/DOM check against `/sahib/` only, not the `DIST`-importing CLI gates. No repo file was edited; no source was touched.

**Method.** Playwright `1.63.0` (already vendored as this repo's own `@playwright/test` devDependency — no new dependency added) driving Chromium, one `newContext` per scheme at **1440×1000, `deviceScaleFactor: 4`** (the same 4× DPR §7(b) already uses), with `colorScheme: 'light'` / `'dark'` set on the context and **no stored `tgd-theme`**, so the page's own bootstrap script resolves `data-theme` from `matchMedia('(prefers-color-scheme: dark)')` exactly as a real visitor's OS preference would — confirmed by reading `document.documentElement.getAttribute('data-theme')` back after load in both runs (`light` / `dark`, matching the requested scheme). This is a lighter-touch method than run B/final's scratch-copy-and-flip-the-bootstrap-default approach, and is possible here only because this check doesn't need the `DIST`-importing CLI gates re-run, only the rendered page and a scheme switch.

Pixel sampling is **not** visual estimation: `page.screenshot({clip})` produces a real PNG for a small clip rectangle, decoded to a raw RGB buffer with `sharp` (already a project dependency). A 16px-wide vertical strip is cut across the boundary under test and averaged column-wise into one RGB triple per device-pixel row; the longest contiguous run of rows matching the ink token (±6 per channel tolerance, to allow for the JPEG-free PNG's own negligible compression noise, of which none was actually observed — every transition below is a hard, single-row jump with zero blended pixels) is treated as the stroke, and a patch is taken from its centre; a second patch is taken from the centre of the ground-coloured run immediately outside it. Ratio computed exactly per §B.2's printed method: sRGB channel `c/12.92` (≤0.03928) else `((c+0.055)/1.055)^2.4`, `L = 0.2126R + 0.7152G + 0.0722B`, ratio `= (L_light + 0.05) / (L_dark + 0.05)`.

**Cells sampled**, chosen per §F.4c's own instruction — "along a filled cell's long edge on the *outer* side of the boundary, away from corners and away from any adjacent filled cell's shared edge":

| Role | Cell | Why this one |
|---|---|---|
| Filled cell, 1.5px stroke | Motive / native iOS, `Motive Fleet and Driver apps` (matrix row 1, col 0) | Top edge borders the Keenai row's *empty* native-iOS cell above it — a true exterior edge, not a seam shared with another filled cell (the Motive row's own three-cell bar shares edges only with its horizontal neighbours, not vertically here) |
| Lit cell, 2px stroke | Keenai Global / end to end with AI, `Backend, frontend, tests` | Top edge is the table's own top-right exterior corner-adjacent edge, sampled away from the corner itself |
| Empty cell | Keenai Global / native iOS (unfilled) | Centre of the cell vs. a patch outside the table entirely, to confirm the two-state grammar's "empty is nothing" |

**Results.**

| Check | Light | Dark | Needs | Verdict |
|---|---|---|---|---|
| Filled cell's 1.5px `--s-ink` stroke vs `--s-ground`, outer edge | `#1A2033` vs `#EEEFF4` → **14.09 : 1** | `#E9EAF0` vs `#161C2E` → **14.11 : 1** | 3 : 1 | **PASS** |
| Lit cell's 2px `--s-ink` border vs `--s-ground` | `#1A2033` vs `#EEEFF4` → **14.09 : 1** | `#E9EAF0` vs `#161C2E` → **14.11 : 1** | 3 : 1 | **PASS** |
| Empty cell's edge — inside the cell vs. outside the table (no stroke claimed) | `#EEEFF4` vs `#EEEFF4` → **1.00 : 1** | `#161C2E` vs `#161C2E` → **1.00 : 1** | n/a | **PASS** — confirms "empty means nothing," no phantom line |

Both stroke numbers are the exact **14.09 : 1** light / **14.11 : 1** dark that DESIGN.md §F.4c specifies and the fix commit's message claims (raw computed values 14.0861 / 14.1103, rounding to the same two decimal places). The lit cell's separately-specified 2px border lands on the identical pair of colours and therefore the identical ratio, matching §F.4c's own table ("The lit cell's 2px `--s-ink` border vs `--s-ground` — its boundary … 14.09 : 1 … 14.11 : 1"). The empty-cell check returns exactly 1:1 in both schemes because no border is painted there at all — sampled colour is the ground on both sides of the (non-existent) boundary, which is what the two-state grammar promises and what run B's original three-state design explicitly removed.

Screenshots: `docs/reviews/final/audit/contrast/sahib-map-1440-light.png`, `sahib-map-1440-dark.png` (the coverage map alone, cropped to the `<table>`), and `sahib-1440-light.png`, `sahib-1440-dark.png` (full 1440×1000 viewport with the map in page context, contact plate and surrounding sections visible).

**Cell inventory and text, re-confirmed unchanged.** Read directly off the rendered DOM (`data-filled` / `data-lamp` attributes and each cell's `.map__cell-surface` / `.map__cell-product` text), in both schemes identically:

Ten filled cells total (nine bounded, one lit) — no more, no fewer, no different ones:
- Keenai Global — **Flutter**: "Keenai Wealth, Keenai Pulse"; **end to end with AI** (lit): "Backend, frontend, tests"
- Motive — **native iOS**: "Motive Fleet and Driver apps"; **native Android**: "Motive Fleet and Driver apps; Views to Compose"; **KMP**: "Design-components library across Fleet and Driver"
- smallcase — **native iOS**: "Tickertape"; **native Android**: "smallcase Android app"; **Flutter**: "Tickertape Flutter for iOS, Android migrated"
- Cleartrip — **native Android**: "Cleartrip Android app"
- TheGeekDogs — **native Android**: "Pocket Manager"

Fifteen cells carry `data-filled="false"` (no attribute at all) — no border, no fill, matching the two-state grammar exactly. This is byte-identical to the cell list DESIGN.md §F.1 and item 72 describe and to the set the pre-stroke build (§7(b) above, `map-cells-{light,dark}-1024.png`) already reported: same ten cells, same companies, same products, same shape (the staircase descending right to left, the Motive and smallcase three-cell bars, the single unbroken native-Android column). Nothing about *which* cells are filled, or what they say, moved — only the boundary around them did.

**One informational note, not a defect and not re-opening Finding 1.** `CoverageMap.astro` declares `border: 1.5px solid var(--s-ink)` for filled non-lamp cells (confirmed by reading the source directly), but the pixel scan shows Chromium's `border-collapse: collapse` resolution painting that edge at a clean, unblended **4 device px at 4× DPR — 1 CSS px, not the nominal 1.5** (`getComputedStyle(...).borderTopWidth` independently reads back `"1px"` for these cells in this engine, versus the `2px` lamp border, which paints at the full 8 device px it declares — only the fractional non-lamp width is affected). This reads as a collapsed-table border-width rounding characteristic of the browser engine, not a colour or cascade problem: on both sides of every boundary sampled above, the measured colour is byte-exact to the declared token (`--s-ink` / `--s-ground`, in both schemes), with a hard single-row transition and zero anti-aliased blending observed anywhere. Since WCAG's contrast ratio is a function of the two colours only, not the stroke's width, this does not change any number above. It is recorded because DESIGN.md §F.4c's own stated reason for choosing 1.5px over 1px was specifically to survive "the auditor's 4× DPR sample" at a 6×6 patch; the patches used here were narrowed to fit the actually-painted band rather than blindly applying 6×6 (which would have pulled in a partial fill or ground row and understated the ratio) — flagged explicitly here, in the same spirit as this document's own earlier note about narrowing the future-node scan band (§7(b)) rather than silently working around a measurement problem.

**S2 verdict: PASS, closed.** The stroke-vs-ground ratio measures 14.09:1 in light and 14.11:1 in dark on the actual rendered, unmodified build — more than 4× the WCAG 2.2 SC 1.4.11 3:1 line for a meaningful graphic, in both schemes, with the map's ten filled cells and their text unchanged from every prior audit round. Finding 1 is closed.
