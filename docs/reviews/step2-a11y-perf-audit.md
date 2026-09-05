# Step 2 output — Perf & A11y audit

**Auditor:** Perf & A11y Auditor · **Date:** 2026-09-05 · **Subject:** frozen copy of the build-step-2 output, served from `dist-step2` (a copy taken by the calling agent from the repo's `dist/` mid-build; `git worktree` was not needed because the frozen copy already existed).

**What exists at this point in the build.** Per `PLAN.md` §11's build order, step 2 delivers only the home page structure and copy, with the studio floor as a **static semantic roster** (no isometric SVG yet — that is step 3). The frozen `dist-step2/` contains exactly two HTML files: `index.html` (home) and `404.html`. There is no `/work/`, `/sahib/`, `/tanya/`, or any other route yet. Wherever this audit's brief asks for "both routes," the two available documents (home, 404) are what was audited; every check that assumes a second content route (e.g. "one person page") is marked **not applicable at this stage** below, not failed.

## Verdict: **CHANGES REQUESTED**

Nothing found blocks step 2 on budget or on a hard WCAG 2.2 AA failure — Lighthouse clears every §11 line with margin, axe-core returns **zero violations** on every route × scheme combination, and the computed contrast arithmetic matches DESIGN.md's published figures exactly across all 56 checked pairs in all six palettes. This is not an APPROVED, though, because four independently-actionable gaps exist between what COPY.md/DESIGN.md specify and what actually shipped (missing favicon causing a real console error, a missing roster-line paragraph, an aria-live region that re-announces a full card on every Tab press, and a stale close-control spec) — none of which is a blocking regression today, but all of which should be resolved before step 2 is folded into step 4-7, per this auditor's no-waiver charter. See Findings 1-4.

---

## 1. Lighthouse — mobile, throttled, 3 runs, both routes, both schemes

Method: `npx lighthouse`, `--form-factor=mobile --screenEmulation.mobile --throttling-method=devtools`, against a local static server that gzip-encodes responses (matching GitHub Pages' real transfer behavior — the frozen dist has no build-time gzip artifacts, so a plain static server without `Content-Encoding: gzip` would have under-reported compressed transfer size; this was caught and corrected mid-audit, see Finding 5). Dark scheme has no first-class Lighthouse toggle for `prefers-color-scheme`, so a second, otherwise-identical copy of the frozen dist was served with the inline theme-bootstrap script's default flipped from `'light'` to `'dark'` (one-line, mechanical, documented here) — this reproduces the dark render path exactly since the page's own dark-mode CSS activates on `[data-theme="dark"]` regardless of how that attribute got set. Full JSON per run: `docs/reviews/step2/audit/lighthouse/`.

| Route | Scheme | Perf | A11y | BP | SEO | LCP (avg of 3) | CLS | TBT |
|---|---|---|---|---|---|---|---|---|
| `/` (home) | light | 100 | 100 | 96 | 100 | 1392 ms | 0 | 0 ms |
| `/` (home) | dark | 100 | 100 | 96 | 100 | 1388 ms | 0 | 0 ms |
| `/404.html` | light | 100 | 100 | 96 | 66 | 1373 ms | 0 | 0 ms |
| `/404.html` | dark | 100 | 100 | 96 | 66 | 1371 ms | 0 | 0 ms |

**Brief §11 line:** Perf/A11y/BP/SEO ≥ 95/100/95/100, LCP < 2000 ms, CLS < 0.05.

- **Home passes every line** with real margin (LCP ~1.39 s vs. the 2.0 s ceiling, TBT 0 ms).
- **BP is 96, not 100, on every route/scheme** — one repeatable audit failure, `errors-in-console`, on a `favicon.ico` 404. Passes the ≥95 line today but is a real, fixable defect. See Finding 1.
- **404's SEO score of 66 is not a defect**: the sole failing audit is `is-crawlable`, because `404.html` correctly ships `<meta name="robots" content="noindex">`. Lighthouse's SEO category penalizes any noindex page regardless of intent; `lighthouserc.json` in the repo only asserts the ≥100 SEO line against `index.html`, so 404 was never in scope for that number. Flagged here for the record, not counted against the verdict.
- LCP element on every run is the `<h1>` — confirms brief §6's "the headline paints first" is honored even before the floor's SVG exists.

## 2. Transfer sizes as served, gzip

`scripts/measure-bundles.mjs` (`qa:weight`) and `scripts/check-floor-budget.mjs` (`qa:floor`) run against the frozen `dist-step2` (via a local copy of `scripts/lib/dist.mjs` re-pointed at the frozen path, since the real script hard-codes `<repo>/dist`, which is being actively written by another agent).

| Line (brief §11) | Budget | Measured | Result |
|---|---|---|---|
| JS transferred, home | ≤ 100 KB gz | **0 B** (no external JS file; the floor's interaction script is a small inline `<script type="module">` counted inside the HTML) | PASS |
| CSS transferred, home | ≤ 40 KB gz | **7,829 B** (`qa:weight`) / 8,002 B (Lighthouse transferSize, header overhead) | PASS, 79% headroom |
| Studio floor SVG + JS | ≤ 80 KB gz | **2,069 B** — no SVG yet, only the roster markup + the two inline interaction scripts (`qa:floor` explicitly passes-and-says-so until the SVG exists, per its own comment) | PASS (not yet load-bearing) |
| Total page weight, home | ≤ 1.2 MB | **148,212 B** (`qa:weight`) / 148,864 B (Lighthouse) | PASS, 88% headroom |

Font payload (woff2, not gzip-compressible further) is 133,852 B and is the largest line item by far — not a budget line itself, but the thing to watch if a third weight/family is added later (PLAN.md §10 item 5).

## 3. axe-core — both routes, both schemes

`@axe-core/playwright` is not installed; used the vendored `axe-core` (`node_modules/axe-core/axe.min.js`, a transitive dependency) injected via `page.addScriptTag`, run with `wcag2a`, `wcag2aa`, `wcag22aa`, `best-practice` tags. Full output: `docs/reviews/step2/audit/axe/axe-violations.json`.

| Route | Scheme | Violations | Passes | Incomplete |
|---|---|---|---|---|
| `/` | light | **0** | 39 | 0 |
| `/` | dark | **0** | 39 | 0 |
| `/404.html` | light | **0** | 38 | 0 |
| `/404.html` | dark | **0** | 38 | 0 |

Zero violations, zero incomplete (manual-review) items, on every combination.

## 4. Keyboard-only traversal

Script: `docs/reviews/step2/audit/keyboard/tab-order.json` (23 stops recorded, home page, light scheme, 1440×900).

**Order, confirmed correct against COPY.md §10.2 and DESIGN.md §C.8:**

1. Skip link ("Skip to main content") — **first**, as required.
2. Wordmark link
3. Theme toggle button
4. Primary CTA ("Start a project…")
5. Secondary CTA ("Look around the studio floor")
6–15. The ten roster stations, **in exact DOM order**: Sahib Singh → Tanya Jain → Spec Writer → Designer → Programmer → Test Engineer → Security Auditor → Reviewer → Release Watcher → Ship approval.
16–23. Play Store link, plate link, final CTA, footer links.

Every one of the ten station buttons' accessible names matched COPY.md §10.2's patterns **verbatim**, including the gate name spoken in-line (e.g. `"Security Auditor, agent. Checked by security and privacy review. Open its card."`) and the exact human/chair patterns. Gate-name strings also cross-checked exactly against COPY.md §2.4's table (Product spec review / Design review / Code review / QA on real devices / Security and privacy review / Code review / Ship approval) — no drift.

**Enter and Space:** both open/swap the targeted station's card in the fixed slot, confirmed by data-attribute state before/after (`keyboard.interaction` in the JSON). **Escape:** no harmful effect — focus stays on the same element, no navigation, no state change. **No focus trap:** traversal reaches the footer's last link and the sequence ends there; nothing loops back into the floor.

**Focus ring, visible on every stop:** two-tone ring confirmed programmatically (`outline: solid 3px` + `box-shadow: rgb(242,169,59) 0 0 0 2px`, i.e. `--chalk`/`--floor` outer + `--lamp` inner, exactly DESIGN.md §B.2/§C.8's spec) on all 23 stops, and visually on two screenshots:
- `docs/reviews/step2/audit/screenshots/focus-nav-link.png` — "Look around the floor" secondary CTA.
- `docs/reviews/step2/audit/screenshots/focus-station.png` — the "Sahib Singh" station button.

**One behavioral note, not a failure:** tabbing through the roster swaps the visible card on **focus alone** (not only Enter/Space) — this is DESIGN.md §C.6's explicit spec ("Hover, focus and tap all replace the slot's content, identically"), so it is correct as designed. See Finding 2 for the accessibility risk this creates when combined with the slot's `aria-live="polite"`.

## 5. Accessibility tree — landmarks, headings, lists, `aria-current`

Full tree: `docs/reviews/step2/audit/a11y-tree.json`.

- **Landmarks:** `banner` (header), `main` (`#main`), `contentinfo` (footer). No `nav` landmark exists yet — expected, there is nothing to navigate to until other routes ship.
- **Headings:** exactly one `h1`; the sequence runs h1 → h2 (floor lead) → h3×10 (station cards) → h2×2 (work-card strip names) → h2 (gates) → h3×4 (gate items) → h2 (proof) → h2 (offer) → h2 (final CTA) → h2 (footer "Elsewhere"). **No skipped level anywhere.**
- **Roster:** a real `<ul>` with 10 `<li>`, each containing one focusable `<button>` — matches brief §6's "real list … layer the isometric scene on top" instruction (there is no scene yet to layer).
- **Build-stage track:** both product tracks are `<ol class="track__list">` with `aria-current="step"` on the current `<li>`, per-item sr-only text following COPY.md §10.4's exact pattern (`"Live. Where it is now."`, `"Specced. Done."`, `"Submitted for review. Not yet."`) — verified byte-for-byte.
- **Card slot live-region behavior:** `div.floor__slot` carries `aria-live="polite"` and its content is swapped on every `click`/`pointerover`/`focusin` of a station. See Finding 2 — this is where check 6's "does a swap get announced" question resolves to "yes, on every tab press," which is a real screen-reader UX risk worth a live pass before sign-off, not just tree inspection.
- **Discrepancy against PLAN.md §13 item 4:** the round-3 design review explicitly resolved the ≥768 compact stage-track comparison to a semantic `<table>` "which gives screen readers the row/column-header relationship." The shipped markup instead uses two independent `<ol>` lists with an `aria-hidden` header row (`.track__head`). This isn't a WCAG failure — each `<li>`'s sr-only text is fully self-labeling (`"Specced. Done."` etc. needs no header context) — but it is a deviation from what PLAN.md says was decided. Flagged for the Engineer to confirm as an intentional, equivalent simplification rather than a dropped requirement.

## 6. Screen reader

**Not run.** Driving VoiceOver from a script on this Mac requires enabling it (audibly, system-wide) via UI-scripting/Accessibility permissions on the user's live machine, which this audit treats as out of bounds for an unattended background check — it would change real system state and produce audible speech outside of a sandboxed test target. Per this check's own instruction, no screen-reader pass is claimed. The chromium accessibility tree (§5 above) and the axe-core automated pass (§3) are the substitutes on record, and they are not equivalent to a live screen-reader pass — brief §12 and the auditor's own charter both require an actual screen-reader run on the home page and one person page before final sign-off. **This remains an open item for a follow-up pass with a real device/VoiceOver session**, and per this auditor's charter it must happen before merge, not be waived.

## 7. Reduced motion

`prefers-reduced-motion: reduce` emulated via Playwright context (`reducedMotion: 'reduce'`), home page, 500 ms settle time.

- `document.getAnimations({ subtree: true })` → **0 running animations**, `document.readyState === 'complete'`.
- Expected: this build has no SVG floor yet (no idle glow loop exists to suppress), so a 0-animation result is trivially true at this stage rather than proof the future idle loop honors reduced motion. **Re-run this exact check once the isometric floor (step 3) ships** — it is not yet a meaningful pass/fail on DESIGN.md §C.9's actual subject matter.

## 8. Contrast

Two methods, both against the **frozen build's own compiled CSS** (not the live repo's `src/styles/tokens.css`, which another agent may be editing mid-build):

**(a) Full computed-style re-check**, all 6 palettes (studio/sahib/tanya × light/dark), reading `getComputedStyle` custom-property values in a real browser after setting `[data-world]`/`[data-theme]`, same pairs and published figures as `scripts/qa-contrast.mjs`: **56/56 pairs checked, 0 failures, every ratio matches DESIGN.md's published figure to within the script's own tolerance.** Full output: `docs/reviews/step2/audit/contrast/contrast-computed.json`. (Sahib's and Tanya's worlds aren't rendered on any page yet — no person pages exist — but their token math is already correct in the shipped CSS bundle, ahead of need.)

**(b) Three rendered pairs, sampled from the live page** (not estimated):

| Pair | Light | Dark | Screenshot |
|---|---|---|---|
| Plate ink on amber (`.plate`, the persistent contact plate) | `#0F2A2E` on `#F2A93B` → **7.56:1** | `#07181B` on `#F2A93B` → **9.10:1** | `screenshots/plate-light.png` |
| Dark scheme's muted hero text (`.hero__body.muted`) | — | `#93A6A8` on `#18292D` → **5.93:1** | `screenshots/muted-text-dark.png` |

Both match DESIGN.md's published figures exactly (7.56 / 9.10 / 5.93), confirming the token arithmetic in §8(a) is what's actually painted, not just what's declared.

## 9. Touch targets at 360 CSS px

Full list: `docs/reviews/step2/audit/touch-targets/targets-360.json` (23 interactive elements measured).

**Everything below 44×44:**

| Element | Size | Note |
|---|---|---|
| "Open Pocket Manager in the Play Store" link | 285.42 × **20** | Plain inline text link, sized only by its own line-height, not a button. Likely qualifies for WCAG 2.2 SC 2.5.8's "target constrained by the line-height of non-target text" exception, but it's borderline since the link is its own paragraph rather than running inline in a sentence — a judgment call, not an automatic pass. Flagged rather than waived; see Finding 3. |
| Footer "thegeekdogs@gmail.com" link | 186.78 × **20** | Same situation as above — plain text link, same exception question. |

**Everything else at 360 clears 44×44**, including the 10 roster station buttons (320×56, well above the floor) and the theme toggle (exactly 44×44, matching DESIGN.md §B.10a's stated target).

**On DESIGN.md §C.7's stated exceptions for the roster:** those numbers (agent desks 101×64, cabins 320×88, the chair 104×96, smallest dimension 64px = 45% over the 44px floor) describe the **future isometric SVG desks at the portrait mobile layout**, which does not exist in this build yet. The roster currently on the page is the plain semantic `<button>` list (320×56 each) that step 2's build order calls for — it already clears 44×44 with margin, so §C.7's exception arithmetic isn't yet load-bearing; it will become the relevant number to re-check once step 3's SVG floor replaces this list visually (the semantic list itself is expected to remain in the DOM per brief §6's progressive-enhancement instruction).

---

## Findings

**Finding 1 — Missing favicon costs a real, fixable Best Practices point on every route.** `dist-step2/index.html` and `404.html` have no `<link rel="icon">` at all, and no favicon file exists in `dist/` or `public/`. Every browser request for `/favicon.ico` 404s, which Lighthouse's `errors-in-console` audit flags, dropping Best Practices from a clean 100 to 96 on every route × scheme tested (still above the ≥95 line, but one more regression away from failing it). DESIGN.md itself (the section beginning "Two colours, and no third… the favicon is not on it") fully specifies a favicon glyph (the lamp-cone mark on `--floor`, with published 7.56:1/9.10:1 mark-on-ground ratios for light/dark) that has simply not been wired up yet. **Action:** ship the specified favicon asset + `<link rel="icon">` before step 4-7 close. Evidence: `docs/reviews/step2/audit/lighthouse/home-light-run1.json` → `audits["errors-in-console"]`.

**Finding 2 — The card slot's `aria-live="polite"` re-announces the entire opened card on every Tab press through the roster, not just on Enter/Space activation.** Confirmed via the keyboard-interaction test: simply tabbing past a station (the `focusin` handler) already swaps `[data-floor-slot]`'s visible child, and that container is `aria-live="polite"`. This matches DESIGN.md §C.6's explicit instruction ("Hover, focus and tap all replace the slot's content, identically") — it is not a coding mistake — but it means a screen-reader user tabbing through all ten stations hears, for each one: the button's own accessible name (which already states the role and its gate, per COPY.md §10.2), immediately followed by the live region announcing the newly revealed card's full name/lead/body/gate text a second time. Over ten stations that is a lot of repeated, overlapping speech, and it risks talking over the next Tab press's own announcement. This is exactly what brief §12's "test with an actual screen reader" is for, and it hasn't happened yet (§6 above). **Action:** get a live screen-reader pass on this exact interaction before sign-off; if it reads as badly as the DOM inspection suggests, consider whether the slot should announce only on explicit activation (Enter/Space/click) rather than on every focus move, or whether `aria-live="off"` with an explicit "card opened" cue on activation reads better. This is a design-and-engineering decision, not something this auditor can resolve unilaterally — raised here rather than waived. Evidence: `docs/reviews/step2/audit/keyboard/tab-order.json` (`interaction` block) and `docs/reviews/step2/audit/a11y-tree.json` (`liveRegions`).

**Finding 3 — Two plain-text links measure 20px tall at 360, below the 44×44 floor, and the WCAG 2.2 SC 2.5.8 "inline text" exception is a judgment call, not an automatic pass.** "Open Pocket Manager in the Play Store" (285×20) and the footer's "thegeekdogs@gmail.com" (187×20) are both sized purely by font line-height with no padding, unlike every other interactive element on the page (which all clear 44×44). Per this auditor's charter ("never estimate a contrast ratio… never waive a budget line"), the analogous discipline applies here: the exception should be confirmed deliberately, not assumed. **Action:** either add vertical padding to reach 44px (cheapest, most defensible), or have the Design Lead/QA explicitly record that these qualify for SC 2.5.8's exception and why. Evidence: `docs/reviews/step2/audit/touch-targets/targets-360.json`.

**Finding 4 — Two copy-deck items specified for the floor are absent from the shipped markup, and one is stale against a superseded design decision.** (a) COPY.md §2.4's "roster line" — the screen-reader-first sentence "`The full pipeline` / `Spec Writer, Designer, Programmer, Test Engineer, Security Auditor, Reviewer and Release Watcher.`" that DESIGN.md §B.8/§B.9 call for "at every breakpoint" — does not appear anywhere in `dist-step2/index.html` (confirmed by direct string search). The ten roster buttons individually still convey each role, so this isn't a hard accessibility gap today, but it's a specified piece of copy that never made it into the build. (b) COPY.md §10.2's "Card close control" (`Close` / `Close this card`) has no corresponding element in the DOM — reasonably so, since DESIGN.md §C.6 replaced the popover/sheet pattern with a fixed, always-visible slot that has nothing to dismiss, which makes the close-control spec in COPY.md stale rather than a build gap. **Action:** (a) confirm with the Copywriter/Engineer whether the roster line should be added now or is intentionally deferred to step 3; (b) have COPY.md's §10.2 close-control entry either removed or explicitly marked superseded so it doesn't get "fixed" by someone adding a dead button later. Evidence: grep of `dist-step2/index.html` for the roster-line and close-control strings (zero matches either way).

**Finding 5 (methodology note, not a defect) — the frozen dist has no gzip artifacts; measuring "transfer size" against a plain static file server under-reports it.** The audit's first Lighthouse pass used a bare `http.createServer` with no `Content-Encoding`, which reported CSS transfer at ~36.9 KB (the raw byte count) rather than the ~8 KB it actually gzips to. Caught and corrected by switching to a server that gzip-encodes on `Accept-Encoding: gzip` (matching real GitHub Pages behavior) before drawing any conclusion from the §1/§2 numbers above. Recorded here so a future audit of this same frozen copy doesn't re-introduce the same measurement error. Evidence: `docs/reviews/step2/audit/lighthouse/` (all files postdate the fix; pre-fix runs were discarded, not retained).

## What could not be run

- **A live screen-reader pass** (§6) — not run, for the reasons stated there. This is a hard requirement of brief §12 and this auditor's own charter before final sign-off, and is **not waived** by the automated substitutes used here.
- **A true second content route.** Only `/` and `/404.html` exist at this build stage; checks framed around "both routes" or "one person page" were run against what exists and explicitly marked not-yet-applicable where the second route doesn't exist yet (e.g., the compact stage-track table comparison, the person-page work cards, `/sahib/`/`/tanya/` keyboard/screen-reader passes).
- **The isometric SVG floor's actual reduced-motion/idle-loop behavior** (§7) — there is no SVG yet to test; the 0-animations result recorded is real but not yet meaningful against DESIGN.md §C.9's actual subject.
- **Real mid-tier Android device / real 4G hardware INP measurement** — this audit used Lighthouse's DevTools-protocol throttling (simulated), not a physical device, per this auditor's charter's own prohibition on treating a desktop/simulated profile as final evidence for the mobile budget. TBT (the CI proxy for INP-adjacent blocking) reads 0 ms on every run, which is a strong signal, but the charter's real-device INP pass is a separate, still-open requirement flagged for the full-site audit at PLAN.md §11 build-order step 8, not something a static two-page step-2 build can satisfy yet.

## Artefacts

All evidence lives under `docs/reviews/step2/audit/`:
- `lighthouse/` — 12 raw Lighthouse JSON reports (2 routes × 2 schemes × 3 runs)
- `axe/axe-violations.json` — full axe-core results, all 4 route/scheme combinations
- `keyboard/tab-order.json` — all 23 tab stops, accessible names, focus-ring computed styles, Enter/Space/Escape interaction trace
- `contrast/contrast-computed.json` — 56-pair computed-style contrast check across all 6 palettes
- `touch-targets/targets-360.json` — bounding boxes for all 23 interactive elements at 360px width
- `a11y-tree.json` — landmarks, headings, lists, live regions, `aria-current` nodes
- `screenshots/` — `focus-nav-link.png`, `focus-station.png` (visible two-tone focus ring), `plate-light.png`, `muted-text-dark.png` (rendered contrast spot-checks)
- `full-audit-report.json` — the combined raw output all of the above tables were drawn from
