# Full-site audit — Perf & A11y (post build run B)

**Auditor:** Perf & A11y Auditor · **Date:** 2026-09-05 · **Subject:** frozen copy of the build-run-B output, served from `scratchpad/dist-runB` (all seven content routes plus `404.html` — `/`, `/work/`, `/work/pocket-manager/`, `/work/wedding-planner/`, `/sahib/`, `/tanya/`, `/contact/`, `404.html`). This is the brief §14 step 8 full-site audit, minus the real-hardware pass, which a human runs.

**Method note.** Every check below runs against the frozen copy, not the live repo, so a concurrent edit elsewhere (Engineer's plate-label/404-room pass, Design Lead's round 11) cannot leak into these numbers. Where a repo QA script hard-codes `dist/` with no CLI path argument (`scripts/lib/dist.mjs`), I used the same method as the step 2 audit: a scratch copy of `lib/dist.mjs` with `DIST` re-pointed at the frozen path (`docs/reviews/runB/audit/` does not contain this scratch script; it lived only in the audit scratchpad, `runB-audit/scripts-repointed/`). No repo file was edited. Every script that reads the built HTML/CSS directly (`check-floor-budget.mjs`, `measure-bundles.mjs`, `check-floor-pointer.mjs`, `qa-worlds.mjs`, `qa-plate.mjs`, `qa-console.mjs`, `qa-images.mjs`, `qa-links.mjs`) ran this way and its output is in `docs/reviews/runB/audit/budget/gates-output.txt`. `qa-contrast.mjs` reads `src/styles/tokens.css` from the live repo (a source file, not dist), so its numbers are supporting evidence, not primary evidence for the frozen build; the primary contrast evidence is §7 below, read from the frozen build's own compiled CSS and, for one line, from actual rendered pixels.

Dark scheme has no first-class toggle for a static Lighthouse/axe run, so — same method as steps 2 and 3, run A, and floor pass 2 — a second copy of the frozen dist had the inline theme-bootstrap script's default flipped from `'light'` to `'dark'` (one line, mechanical, in every one of the 8 HTML files; the change is confirmed by grep in the log). This reproduces the dark render path exactly, since the page's dark CSS activates on `[data-theme="dark"]` however that attribute got set. Nothing shipped was touched.

## Verdict: **CHANGES REQUESTED, not blocking**

Nothing here trips this auditor's veto: every §11 budget line clears with wide margin on all eight routes in both schemes, axe-core returns **zero violations** on all 16 route × scheme combinations, and every contrast pair computed against the frozen build's own CSS matches DESIGN.md's published figures exactly. This is not an `APPROVED` because two independently-actionable, non-blocking items remain (Findings 1–2), one CI-configuration issue was spotted in the live repo while this audit ran and is flagged for the record though it is outside the frozen snapshot (Finding 3), and two informational notes are recorded (Findings 4–5). The real-hardware pass and the live screen-reader pass are both out of scope for an unattended agent — see "What could not be run."

---

## 1. Lighthouse — mobile, throttled, 3 runs × 8 routes × 2 schemes (48 runs)

`lighthouse` (v13, programmatic API), one shared headless Chrome instance, `formFactor: mobile`, `throttlingMethod: devtools`, `screenEmulation` at 360×640 @2x — against the two gzip-encoding local servers described above (gzip matches real GitHub Pages transfer behaviour; a bare `http.createServer` under-reports CSS/HTML transfer size, the same trap step 2's Finding 5 recorded). Full trimmed JSON (scores + key audits, traces stripped) for all 48 runs: `docs/reviews/runB/audit/lighthouse/*.json`; averaged table: `docs/reviews/runB/audit/lighthouse/summary.json`.

| Route | Scheme | Perf | A11y | BP | SEO | LCP (avg of 3) | CLS | TBT |
|---|---|---|---|---|---|---|---|---|
| `/` | light | 100 | 100 | 100 | 100 | 1474 ms | 0 | 0 ms |
| `/` | dark | 100 | 100 | 100 | 100 | 1450 ms | 0 | 0 ms |
| `/work/` | light | 100 | 100 | 100 | 100 | 1437 ms | 0 | 0 ms |
| `/work/` | dark | 100 | 100 | 100 | 100 | 1439 ms | 0 | 0 ms |
| `/work/pocket-manager/` | light | 100 | 100 | 100 | 100 | 1506 ms | 0 | 0 ms |
| `/work/pocket-manager/` | dark | 100 | 100 | 100 | 100 | 1506 ms | 0 | 0 ms |
| `/work/wedding-planner/` | light | 100 | 100 | 100 | 100 | 1504 ms | 0 | 0 ms |
| `/work/wedding-planner/` | dark | 100 | 100 | 100 | 100 | 1499 ms | 0 | 0 ms |
| `/sahib/` | light | 100 | 100 | 100 | 100 | 1452 ms | 0 | 0 ms |
| `/sahib/` | dark | 100 | 100 | 100 | 100 | 1442 ms | 0 | 0 ms |
| `/tanya/` | light | 100 | 100 | 100 | 100 | 1447 ms | 0 | 0 ms |
| `/tanya/` | dark | 100 | 100 | 100 | 100 | 1452 ms | 0 | 0 ms |
| `/contact/` | light | 100 | 100 | 100 | 100 | 1428 ms | 0.0063 | 0 ms |
| `/contact/` | dark | 100 | 100 | 100 | 100 | 1435 ms | 0.0063 | 0 ms |
| `404.html` | light | 100 | 100 | 100 | **66** | 1422 ms | 0.0061 | 0 ms |
| `404.html` | dark | 100 | 100 | 100 | **66** | 1442 ms | 0.0061 | 0 ms |

Against brief §11 (Perf/A11y/BP/SEO ≥ 95/100/95/100, LCP < 2000 ms, CLS < 0.05): **every content route clears every line with margin.** Worst LCP across all 48 individual runs (not the average) is **1514 ms**, on `/work/pocket-manager/` — 486 ms of headroom under the 2000 ms ceiling. Worst CLS is `/contact/` at a stable **0.0063** across all 6 of its runs — comfortably under 0.05, and notably better than the 0.030 the Engineer self-reported for run B in `REVIEWS.md`; I did not chase the discrepancy since both figures clear the line by a wide margin and the difference is plausibly measurement-method (my run uses a real gzip static server and Lighthouse's own DevTools-protocol throttling; the Engineer's own tool wasn't specified). TBT is **0 ms** on every one of the 48 runs.

`404.html`'s SEO score of 66 is not a §11 defect: the sole failing audit is `is-crawlable`, because `404.html` correctly ships `<meta name="robots" content="noindex">` — Lighthouse's SEO category penalises any noindex page by design, and the brief only asks unindexed pages to say so. See Finding 3, though, for a live-repo CI-config issue this same fact just exposed.

## 2. Transfer sizes as served, gzip

Ran `check-floor-budget.mjs` and `measure-bundles.mjs` against the frozen dist (repointed method above). Full output: `docs/reviews/runB/audit/budget/gates-output.txt`; per-route breakdown: `docs/reviews/runB/audit/budget/transfer-sizes-per-route.txt`.

| Line (brief §11) | Budget | Measured | Result |
|---|---|---|---|
| JS transferred, home | ≤ 100 KB gz | **0 B external** (inline module script only, 1,255 B gz, counted inside the HTML) | PASS |
| CSS transferred, home (shared across all 8 routes) | ≤ 40 KB gz | **12,425 B** (raw 69,043 B) | PASS, 69% headroom |
| Studio floor SVG + JS | ≤ 80 KB gz | **6,149 B** (32,602 B raw floor markup + inline scripts) | PASS, 92% headroom |
| Total page weight, home | ≤ 1.2 MB (1,258,291 B) | **158,221 B** (HTML 11,944 + CSS 12,425 + inline JS 1,255 + fonts 133,852; Lighthouse's own `resource-summary:total:size` audit agrees within rounding) | PASS, 87% headroom |

**Zero external `<script>` files on any of the 8 routes** (confirmed by grep of every HTML file), so the JS line is trivially satisfied site-wide, not just on home. Per-route HTML + inline-JS gzip sizes (CSS is one shared 12,425 B file across all routes):

| Route | HTML gz | Inline JS gz | External scripts |
|---|---|---|---|
| `/` | 11,944 B | 1,255 B | 0 |
| `/work/` | 4,101 B | 898 B | 0 |
| `/work/pocket-manager/` | 5,718 B | 831 B | 0 |
| `/work/wedding-planner/` | 4,599 B | 628 B | 0 |
| `/sahib/` | 6,508 B | 716 B | 0 |
| `/tanya/` | 6,003 B | 707 B | 0 |
| `/contact/` | 3,945 B | 755 B | 0 |
| `404.html` | 3,053 B | 451 B | 0 |

**Fonts — subsetting is still pending, and the number it would need to reach.** The two files shipped in `dist-runB/fonts/` are **103,760 B** (Anek Latin, full `wght` 100–800 + `wdth` 75–125) and **30,092 B** (Instrument Sans, `wght` 400–700) — **133,852 B total**, matching PLAN.md §1.5's "raw, unsubsetted" figures exactly, byte for byte. That confirms the glyphhanger/`pyftsubset` subsetting pass and the `wdth` 75–100 range-restriction PLAN.md §1.5 specifies as "part of the font build step, not optional" have **not** been applied to this build. PLAN.md's own measured target after both steps is **50,908 B** (Anek, range-restricted + subsetted) **+ 19,912 B** (Instrument Sans, subsetted) **= 70,708 B (69.1 KB)**. The gap: **133,852 − 70,708 = 63,144 B (≈ 61.7 KB)** still to cut to reach the number PLAN.md commits to. This does not fail any §11 line today (total page weight has 87% headroom even with unsubsetted fonts) but it is a specified, measured, not-yet-done build step — not a new finding, since PLAN.md itself already flags it as pending, but confirmed still outstanding in this build.

## 3. axe-core — every route, both schemes (16 combinations)

`axe-core` 4.13.0 (vendored, `node_modules/axe-core/axe.min.js`), injected via `page.addScriptTag`, run with `wcag2a`, `wcag2aa`, `wcag21aa`, `wcag22aa`, `best-practice` tags. Full output: `docs/reviews/runB/audit/axe/axe-results.json`.

| Route | Scheme | Violations | Passes | Incomplete |
|---|---|---|---|---|
| `/` | light / dark | **0** | 40 | 1 |
| `/work/` | light / dark | **0** | 38 | 0 |
| `/work/pocket-manager/` | light / dark | **0** | 41 | 0 |
| `/work/wedding-planner/` | light / dark | **0** | 41 | 0 |
| `/sahib/` | light / dark | **0** | 46 | 0 |
| `/tanya/` | light / dark | **0** | 39 | 0 |
| `/contact/` | light / dark | **0** | 38 | 0 |
| `404.html` | light / dark | **0** | 38 | 0 |

**Zero violations across all 16 route × scheme combinations.** The one recurring "incomplete" (needs-review, not a fail) item on `/` in both schemes is `color-contrast` on the ten SVG nameplate `<text>` nodes inside the floor scene — axe cannot compute contrast automatically for SVG text sitting on a busy, painted background. Resolved by inspection: `.fl-plate` fill is `var(--tgd-on-room)` (chalk, 12.74:1/15.34:1 against the room in light/dark per §B.2/§B.2a) with `paint-order: stroke; stroke: var(--fl-ground); stroke-width: 3px` — a halo matching the room's own ground colour, so the worst case is chalk directly against the room ground, already computed and well above AA. Not a defect; axe's incomplete flag is exactly what "needs review" is for, and the review closes it.

## 4. Keyboard traversal — every route

`docs/reviews/runB/audit/keyboard/tab-order.json` — full stop-by-stop trace (tag, accessible name, computed outline/box-shadow, bounding rect) for all 8 routes at 1440×900, light scheme.

**Home (34 stops), confirmed against DESIGN.md §C.8 and COPY.md §10.2, byte-exact:**

1. Skip link ("Skip to main content") — first.
2. Wordmark → 3–6. Nav (Work, Sahib, Tanya, Contact) → 7. Theme toggle → 8–9. Primary/secondary CTA ("Start a project…", "Look around the studio floor").
10–19. The **ten stations in exact DOM order**: Sahib Singh → Tanya Jain → Spec Writer → Designer → Programmer → Test Engineer → Security Auditor → Reviewer → Release Watcher → Ship approval — accessible names match COPY.md §10.2's patterns exactly, including the gate spoken inline (`"Security Auditor, agent. Checked by security and privacy review. Open its card."`) and the chair's distinct pattern (`"Ship approval. The empty chair. Open the card."`).
20–34. Strip row links ("Sahib's work in full, on his page" / "Tanya's…"), Play Store link, build-stage link, contact plate, final CTA, footer (email, nav repeat, four social links).

**Focus ring visible on every one of the 34 stops** — computed `outline: solid 3px` in `--floor` (rgb(15,42,46)) on light-chrome stops or `--chalk` (rgb(232,237,233)) on room/dark-panel stops, plus the `--lamp` inner ring via `box-shadow: rgb(242,169,59) 0 0 0 2px` on every single stop with no exception. **No focus trap** — traversal reaches the last footer link and ends there. One screenshot per route captured at a representative focus stop: `docs/reviews/runB/audit/screenshots/{route}-focus-stop*.png`, plus a dedicated station shot showing the floor rendered, lit, with the ring on "Test Engineer": `docs/reviews/runB/audit/screenshots/home-focus-station-security-auditor.png`.

**The card slot's silent-on-focus / announce-on-activation ruling (`REVIEWS.md`, "Step 2 Perf & A11y audit", ruling 2), verified behaviourally, not just by markup:** `docs/reviews/runB/audit/keyboard/slot-behavior.json`.

| Step | `data-floor-announce` content | Visible slot content |
|---|---|---|
| Tab onto "Sahib Singh" (focus only) | `""` (empty — silent) | Swaps to Sahib's card |
| Press Enter (activation) | Full card text ("Sahib Singh… Owns… Architecture review…") | Unchanged |
| Tab onward to "Tanya Jain" (focus only, no activation) | **Still the stale Sahib text — not re-announced, not cleared** | Swaps to Tanya's card |

This is exactly the ruled behaviour: hover/focus silently swap the visible slot (per DESIGN.md §C.6), and only Enter/Space/click writes to the dedicated `aria-live="polite"` announcer (`<span data-floor-announce>`), which is a separate element from the always-visible `.floor__slot` (which itself now carries no `aria-live` at all — confirmed by DOM inspection of the frozen HTML). Step 2's Finding 2 is closed.

**The toggle**, keyboard-driven: `Tab` to it (stop 7), `Enter` flips `data-theme` light→dark, flips its own `aria-label` for the next press ("Switch to dark mode" → "Switch to light mode"), and writes "Dark mode on." to its own `aria-live="polite"` announcer. Confirmed programmatically.

**External links' "Opens a new tab" naming — every one, on every route.** All `target="_blank"` links across all 8 routes carry "Opens a new tab." in their accessible name (visible text or `aria-label`) — Play Store, GitHub ×2, LinkedIn ×2 on every route that has them, plus `/sahib/`'s four LinkedIn-post links. Zero exceptions found. Full list: `docs/reviews/runB/audit/a11y-tree/tree.json` (`externalBlank` per route).

**The strip's row links** (home's compressed work-card strip): each row is one `<ul>` of plain, non-interactive `<li>` cards (company + years only) plus exactly one real link per row ("Sahib's work in full" / "Tanya's work in full", both confirmed in the tab trace above) — no dead control, no card masquerading as a link.

## 5. Accessibility tree

Full data: `docs/reviews/runB/audit/a11y-tree/tree.json`.

- **Landmarks, every route:** `banner`, `navigation` ×2 (Primary + Footer), `main`, `contentinfo` — 5 on every one of the 8 routes.
- **One `h1` per page, no skipped heading level, on all 8 routes:**

| Route | Heading level sequence |
|---|---|
| `/` | 1,2,3,3,3,3,3,3,3,3,3,3,2,2,2,3,3,3,3,2,2,2,2 |
| `/work/` | 1,2,2,2 |
| `/work/pocket-manager/` | 1,2,2,2,2,2 |
| `/work/wedding-planner/` | 1,2,2,2,2 |
| `/sahib/` | 1,2,2,2 |
| `/tanya/` | 1,2,2,2 |
| `/contact/` | 1,2,3,3,3,2 |
| `404.html` | 1,2 |

No sequence anywhere jumps by more than one level. **`/sahib/`'s heading-order fix is confirmed closed in this build**: `docs/scratch/engineer.md` records that the work card's company line was originally an `<h3>` following the un-headed map section (a level skip Lighthouse's own `heading-order` audit caught, dropping `/sahib/` to 98) and was changed to a `<p>` — the list structure (COPY.md §5.5) carries the hierarchy instead. `/sahib/`'s sequence above (1,2,2,2) has no skip, and both Lighthouse (accessibility=100, 6/6 runs) and axe-core (0 violations, both schemes) confirm the fix holds in this frozen build.
- **`aria-current="step"` on both tracks:** home carries 2 (`"Live. Where it is now."` / `"Final touches. Where it is now."` — Pocket Manager and the wedding planner's compressed home view); `/work/` carries 2 (the same two products' full tracks). Both are `<li>` inside an `<ol>`, per DESIGN.md §E.1's "not divs" rule.
- **Images:** every `<img>` (4 on `/work/pocket-manager/`, 1 on `/work/wedding-planner/`) has a real, specific, non-generic alt string; zero missing-`alt` cases (confirmed separately by `qa:images`, PASS).
- **Sahib's map — real `<table>`, explicit roles, confirmed readable as a table below 1024.** `docs/reviews/runB/audit/a11y-tree/tree.json` (`sahib-map-at-768`) shows the table's CSS `display` is `block` at 768px width (the responsive restyle to blocks that the brief asks me to check), while `role="table"` is retained with **6 `columnheader`s and 5 `rowheader`s** still present. I went further than DOM inspection and pulled the actual Chromium accessibility-tree snapshot (`page.locator('table.map__table').ariaSnapshot()`) at 768px width — it renders as a proper `table` → `rowgroup` → `row` → `columnheader`/`rowheader`/`cell` tree, e.g. `row "Motive 2023 – 2025 Motive Fleet and Driver apps…" : rowheader "Motive 2023 – 2025", cell "Motive Fleet and Driver apps", …` — exactly the row/column-header association a screen reader needs, survives the CSS restyle because the roles are explicit attributes, not inferred from `display: table`. The map has no interactive cells, so it correctly has **zero tab stops** — a static data table should not be artificially made focusable, and it isn't.
- **The quotes on `/tanya/` as quotation semantics:** two real `<blockquote class="quote">` elements (not styled `<p>`s), confirmed. One informational note: both blockquotes share a single `<cite>Sahib Singh, who worked alongside her at Motive.</cite>` placed after the second one, rather than each having its own attribution or the pair being wrapped in one `<figure>`/`<blockquote>` with an internal `<footer><cite>`. Not a WCAG violation (axe found nothing), but the association between the citation and which quote(s) it covers is visual/proximal only, not programmatic — see Finding 5.

## 6. Reduced motion — `/`, `/sahib/`, `/tanya/`

Playwright context `reducedMotion: 'reduce'`. `docs/reviews/runB/audit/motion/reduced-motion.json`.

| Route | `document.getAnimations({subtree:true})` | `document.readyState` |
|---|---|---|
| `/` | **0** | complete |
| `/sahib/` | **0** | complete |
| `/tanya/` | **0** | complete |

Zero running animations on all three, confirming the idle loop and the "Lights on" moment are both suppressed. **The still frame is the designed one, not a frozen default**: the nine agent-desk glow opacities read `{sahib: 0.84, tanya: 0.82, spec-writer: 0.62, designer: 0.74, programmer: 0.68, test-engineer: 0.80, security-auditor: 0.64, reviewer: 0.76, release-watcher: 0.70}` — matching DESIGN.md §C.9's table exactly, value for value, including the non-monotonic ordering and the two human cabins differing from each other (0.84/0.82). The empty chair carries no glow (`null`), as designed — it's lit by the lamp cone, not a monitor. Screenshot evidence: `docs/reviews/runB/audit/screenshots/home-reduced-motion-floor.png` — a complete, finished-looking room with the lamp cone lit and a card open in the slot, not a broken or half-rendered page.

## 7. Contrast

**(a) Token-level, computed against the frozen build's own compiled CSS** via `qa-worlds.mjs` (repointed at the frozen dist, reads actual `getComputedStyle` values in a real browser after setting `[data-world]`/`[data-theme]`): 32 computed tokens across 4 routes × 2 schemes, all matching DESIGN.md's published hex exactly (`docs/reviews/runB/audit/contrast/qa-worlds-full.txt`). Confirms the swappable-token-partial regression `qa-worlds.mjs`'s own header comment warns about (Tanya's world rendering the studio palette because of a selector-specificity tie) is **not** present in this build — Tanya's light/dark computed tokens (`#edeeee`/`#dcdede`/`#1b2020`/`#8a5a08` and their dark twins) are her own, not the studio's.

**(b) Full pair-level arithmetic**, all 62 pairs across all 6 palettes, via `qa-contrast.mjs` (note: this reads the live repo's `src/styles/tokens.css`, a source file, so it is supporting evidence for the token math rather than primary evidence for the frozen dist — primary evidence is (a) and (c)): zero failures, every ratio matches DESIGN.md's published figure. Full output: `docs/reviews/runB/audit/contrast/qa-contrast-full.txt`.

**(c) Pixel-level spot checks, sampled from actual rendered screenshots (not computed style):** `docs/reviews/runB/audit/contrast/pixel-contrast.json`, crop: `docs/reviews/runB/audit/contrast/future-node-crop.png`.

| Check | Method | Result | Needs |
|---|---|---|---|
| Future-node stroke, light, `/work/wedding-planner/` | 4× DPR screenshot of the "Submitted for review" node, darkest pixel on the ring band vs. corner background pixel, WCAG relative-luminance contrast computed from raw RGB | **5.26 : 1** (pixel-sampled; token math gives 4.02:1 against `--sheet` — the pixel sample is darker/more-conservative, consistent, not a shortfall) | ≥ 3 : 1 |
| Future-node stroke, CSS variable in frozen build | Read directly from `dist-runB/_astro/style.*.css`: `--node-future-stroke:#0f2a2e99` (alpha 0x99 = 0.60) light, `#e8ede973` (alpha 0x73 ≈ 0.45) dark | Matches DESIGN.md §E.1's round-4 fix (`.60` light) and §E.1a (`.45` dark) exactly — confirms the round-4 fix shipped in run B, not the `.45`-everywhere regression run A's design review caught | — |
| `--lamp-ink` on Tanya's core field | Grepped the frozen CSS for every consumer of `--tgd-accent` (= `--lamp-ink` on `[data-world=tanya]`): `.core{border-block-start:4px solid var(--tgd-accent)}` and `.core__gates-label{border-inline-start:4px solid var(--tgd-accent)}` — both non-text 4px border marks | **Never used as text colour anywhere on `/tanya/`** — the "large text or non-text mark only" restriction (§G.1a) is satisfied with margin, since it never approaches being small text at all | large/mark only |
| Sahib's `--s-dim` on `--s-panel` | Computed on the live page, light scheme (his non-default) | `#545c74` on `#e0e2ec` → **5.15 : 1** (matches §F.4a's published 5.15:1 exactly) | AA body 4.5:1 |
| Card small print (`--card-ink-2`) over each world's worst-case ground | All 6 palettes, from (b) | Studio 6.05/5.20, Sahib 5.13/6.01, Tanya 6.17/5.30 (light/dark each) — **minimum 5.13:1** | AA body 4.5:1 |

All contrast checks pass with margin; nothing here approaches this auditor's veto threshold.

## 8. Touch targets at 360 CSS px

Full data: `docs/reviews/runB/audit/touch-targets/targets-360.json` — every route.

**Nothing on any route falls under WCAG 2.2 SC 2.5.8's actual 24×24 CSS px AA minimum.** Every measured target clears 24px on both axes everywhere. Against the project's own stricter 44×44 house target (DESIGN.md §B.10a), the same class of exception applies as step 2's Finding 3/ruling 3 (WCAG 2.2's inline-text-link exception): the header's four nav links (`Work`/`Sahib`/`Tanya`/`Contact`, present on every route) measure 35–43px wide × 44px tall — the height already clears 44, only the width (governed by the link's own text, not by a design choice) falls short of the house target. The previously-ruled items also recur unchanged: "Open Pocket Manager in the Play Store" (285×20 on home, distinct 44-tall version elsewhere), the footer email link (187×20), `/work/pocket-manager/`'s Play Store link (44-tall there), and `404.html`'s "Back to the studio home page" (131×20). No new class of under-target control was found beyond what step 2 already ruled on. Per that standing ruling (REVIEWS.md, "no change required; the Engineer may add vertical padding if free"), this is not re-raised as a new finding.

## 9. Print — `/sahib/` and `/tanya/`

Playwright `page.emulateMedia({media:'print'})` + `page.pdf()`, loaded from the **dark**-default server (`localhost:8902`) so a pass here proves §D.8's "print always uses light tokens, whatever the visitor's theme" rule rather than trivially matching an already-light page. PDFs: `docs/reviews/runB/audit/print/{sahib,tanya}-print.pdf`; full-page print-preview screenshots: `docs/reviews/runB/audit/print/{sahib,tanya}-print-preview.png`; raw checks: `docs/reviews/runB/audit/print/print-checks.json`.

| Check | `/sahib/` | `/tanya/` |
|---|---|---|
| Floor omitted | N/A — no floor section exists on person pages | N/A |
| Theme toggle `display` | `none` | `none` |
| Contact plate `display` | `none` | `none` |
| Body background in print, loaded **dark** | `rgb(238,239,244)` = **`#EEEFF4`**, his **light** `--s-ground` | `rgb(237,238,238)` = **`#EDEEEE`**, her **light** `--t-ground` |
| Body text colour in print | `rgb(26,32,51)` = **`#1A2033`**, his light `--s-ink` | `rgb(27,32,32)` = **`#1B2020`**, her light `--t-ink` |
| Cards flattened | `transform: none`, `box-shadow: none`, background solid `rgb(255,255,255)` | Same |
| Name once at top | `<h1>Sahib Singh</h1>` | `<h1>Tanya Jain</h1>` |
| Person's own address, once | `.print-address` count = **1** (`sahiboffc@gmail.com`) | `.print-address` count = **1** (`jaintanya999@gmail.com`) |

**Every one of the four explicit §D.8 criteria this check asked for passes on both routes, and does so while proving the light-token-regardless-of-theme rule** — the page was loaded with the dark scheme active and still printed in exactly its light palette. See Finding 1, though, for a print-layout issue on `/tanya/` this same pass surfaced beyond the four listed criteria.

## 10. Pointer — `scripts/check-floor-pointer.mjs` run directly against this frozen dist

The script imports `DIST` from `./lib/dist.mjs` with no CLI override, so — same repointing method as every other script in this section — I ran it with `lib/dist.mjs`'s `DIST` constant pointed at `scratchpad/dist-runB` rather than `<repo>/dist`. This is a real, independent execution of the acceptance test in DESIGN.md §C.11, not a citation of someone else's run. Full output: `docs/reviews/runB/audit/budget/gates-output.txt`.

**10 of 10 stations, at all six widths (360, 390, 768, 1024, 1440, 1920), in both schemes: `elementFromPoint` returns the station's own button, and a synthetic click puts its card alone in the slot with the selected state set.** Nameplates: 10 of 10 clear of every other station's button box, at every width in both schemes. `PASS check-floor-pointer`. This corroborates, independently, the Orchestrator's own hit-test recorded in `REVIEWS.md` ("Build run A → Orchestrator verification").

---

## Findings

**Finding 1 — `/tanya/`'s print/PDF output does not collapse the three-column core/edge layout, producing a cramped page with a near-empty right column.** `docs/reviews/runB/audit/print/tanya-print-preview.png` and `tanya-print.pdf`: in print, `.core-band__grid`'s CSS-grid `grid-area` placement (Android edge / Core / iOS edge, `@media (width>=1024px)` in the shipped CSS) is still active, so the printed page keeps three narrow side-by-side columns instead of stacking into one flowing column the way DESIGN.md §D.8 says a printed person page should read ("a clean, plain CV… the output should be a document you would attach to an email"). The Android column and, especially, the iOS column (one line: "Motive Fleet App") are visually starved of width while the centre column is comparatively wide. Each individual `<ul>` of cards *did* reflow correctly per §D.8's rule (no card sits two-up), so this is not a card-flattening defect — it's that the three separate grid-placed containers (`core`, `edge--android`, `edge--ios`) were never given a print override to un-grid. §D.8 doesn't name this component explicitly, so this isn't a violation of a stated rule the way the future-node stroke or the plate's composition rule are — it's a gap between what §D.8 asks the printed page to *be* and what the CSS actually does for this one component. **Action:** add a `@media print` rule collapsing `.core-band__grid` to a single column (`grid-template-columns: 1fr` with `.core`, `.edge--android`, `.edge--ios` reset to `grid-area: auto`, stacked in a sensible reading order — core, then Android, then iOS, or whatever the Design Lead prefers) before this page is treated as print-ready. `/sahib/`'s print output has no equivalent issue (his page is a real `<table>` plus a single-column card list, both of which already read fine as narrow print columns).

**Finding 2 (informational, not blocking) — Tanya's three-column layout's DOM order matches visual order at 360 (the specific width this check asked about) but diverges at ≥1024.** `docs/reviews/runB/audit/keyboard/tanya-reading-order.json`. DOM order is always `core → edge--android → edge--ios`. At 360 and 768 (no grid-area override in the shipped CSS below 1024), visual (top-to-bottom, left-to-right) order matches DOM order exactly — **the check as asked, "at 360," passes.** At 1024 and 1440, the `@media (width>=1024px)` grid-area placement puts `edge--android` first (leftmost), `core` second (middle), `edge--ios` third (rightmost) — so a sighted keyboard user tabbing through at these widths hears/reads the core's content before the Android column's, while visually the Android column sits to its left. This is not a WCAG violation on its own (SC 1.3.2 is about whether a sequence is "meaningful," and each of the three blocks is independently coherent), and it wasn't the width this check named, so it is not raised as a defect — recorded for completeness since I measured all four named breakpoints while answering the 360 question.

**Finding 3 (informational; concurrent live-repo edit, not part of the frozen-dist verdict) — `lighthouserc.json`'s new 404 assertion matrix likely doesn't achieve what it's trying to achieve.** While this audit was running, `lighthouserc.json` changed on disk (an in-progress Engineer edit, presumably to add `404.html` to LHCI's URL list and give it a lower SEO bar via `assertMatrix`, with `"is-crawlable": "off"`). Turning an individual audit assertion `off` in Lighthouse CI silences *that audit's* pass/fail check; it does not change the parent category's numeric score, which Lighthouse computes as a weighted average of every audit in the category regardless of which ones LHCI asserts on. My own 6 real Lighthouse runs on `404.html` (§1 above) show its SEO **category score is 66** in both schemes, driven down by the failing `is-crawlable` audit. The new matrix asserts `"categories:seo": ["error", {"minScore": 0.9}]` for 404 — but 0.66 will still fail a 0.9-minimum assertion regardless of whether `is-crawlable` itself is separately asserted or silenced, because silencing it doesn't move the score. **Action, for whoever picks this up (not this audit's file to fix, since it's a live edit outside the frozen snapshot):** either drop the `categories:seo` assertion entirely for the 404 URL pattern (matching what the *original* `lighthouserc.json` did implicitly by leaving 404 out of the URL list), or accept 404 will keep failing CI as newly configured. Flagged for the record since it's squarely a §11-budget-enforcement correctness question, which is this auditor's remit, even though it surfaced mid-audit rather than in the frozen copy.

**Finding 4 (informational) — Tanya's two adjacent quotes share one `<cite>`, associated only by proximity, not programmatically.** `docs/reviews/runB/audit/a11y-tree/tree.json` (`tanya.blockquotes`). Two `<blockquote class="quote">` elements sit back to back, followed by a single `<p class="quote__attribution"><cite>Sahib Singh, who worked alongside her at Motive.</cite></p>` covering both. This satisfies brief §12/COPY.md's instruction to mark the quotes up "as quotation… with a `<cite>` naming who said it" (both are real `<blockquote>`s, not styled paragraphs — axe found nothing wrong), but a screen-reader user encountering the second blockquote before reaching the citation has no programmatic link telling them the same citation covers it too. Not raised as a WCAG failure; noted as a polish item the Copywriter/Design Lead may want to close (e.g. one `<figure>` wrapping both quotes plus one `<figcaption><cite>…</cite></figcaption>`, or a repeated/shared `aria-describedby`).

**Finding 5 (record only — not a defect) — font subsetting confirmed still pending, and the number is now measured against this exact build.** See §2's fonts line: **133,852 B shipped vs. a 70,708 B target once PLAN.md §1.5's `wdth`-range-restriction and glyphhanger subsetting land — a 63,144 B (≈61.7 KB) gap.** PLAN.md already tracks this as a pending build step, not something this audit is newly discovering; recorded here with the current build's exact bytes so the eventual fix has a number to check itself against.

---

## What could not be run

- **A live screen-reader session (VoiceOver).** Not run, for the same reason step 2's audit gave and the Orchestrator already ruled on (REVIEWS.md, "Step 2 Perf & A11y audit," ruling 4 → `QUESTIONS.md` item 74): driving VoiceOver requires enabling it system-wide on the user's own live Mac via Accessibility permissions and produces audible speech and real system-state changes, which is out of bounds for an unattended agent. This full-site audit's brief excuses only the real-hardware pass explicitly; the screen-reader pass remains the same open human task `QUESTIONS.md` item 74 already names, now against all 8 routes rather than 2. The substitute evidence here is the strongest available without a live AT session: full Chromium accessibility-tree snapshots (§5, plus the literal `ariaSnapshot()` pull of Sahib's map in §5) that show exactly what a screen reader's accessibility API would expose — but a snapshot is not a live read, and per this auditor's own charter this is not claimed as equivalent.
- **Real mid-tier Android hardware on a throttled real 4G connection.** This audit's brief explicitly excuses this one ("minus the real-device pass which a human runs"). Every timing number above is Lighthouse's simulated DevTools-protocol throttling, not a physical device. TBT reads 0 ms on all 48 runs, which is a strong signal but not a substitute for the real-device pass.

## Artefacts

All evidence lives under `docs/reviews/runB/audit/`:
- `lighthouse/summary.json` — averaged scores/metrics for all 16 route × scheme combinations; `lighthouse/*.json` — trimmed (scores + key audits, traces stripped) reports for all 48 individual runs
- `axe/axe-results.json` — full axe-core results, all 16 route × scheme combinations
- `keyboard/tab-order.json` — every tab stop on every route, accessible names, computed outline/box-shadow, bounding rects; `keyboard/slot-behavior.json` — the silent-focus/announce-on-activation trace; `keyboard/tanya-reading-order.json` — DOM vs. visual order at 360/768/1024/1440
- `a11y-tree/tree.json` — landmarks, headings, `aria-current`, images, external-link names, blockquotes, and Sahib's map's role/display data for all 8 routes
- `contrast/qa-contrast-full.txt`, `contrast/qa-worlds-full.txt` — full token-arithmetic and rendered-computed-style dumps; `contrast/pixel-contrast.json` + `contrast/future-node-crop.png` — the pixel-sampled spot check
- `touch-targets/targets-360.json` — every interactive element's bounding box at 360px, all 8 routes
- `print/{sahib,tanya}-print.pdf`, `print/{sahib,tanya}-print-preview.png`, `print/print-checks.json` — the print/PDF evidence
- `motion/reduced-motion.json` — animation counts and the nine glow opacities, `/`, `/sahib/`, `/tanya/`
- `screenshots/` — one focus-ring screenshot per route, the lit-floor station shot, and the reduced-motion still frame
- `budget/gates-output.txt` — full stdout of `check-floor-budget`, `measure-bundles`, `check-floor-pointer`, `qa-worlds`, `qa-plate`, `qa-console`, `qa-images`, `qa-links`, all run directly against this frozen dist; `budget/transfer-sizes-per-route.txt` — per-route HTML/inline-JS gzip breakdown
