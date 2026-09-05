# REVIEWS.md

Append-only. Every verdict, who gave it, what evidence it cited, and how each disagreement resolved. Newest at the bottom. Verdicts are `APPROVED`, `CHANGES REQUESTED` (numbered items with evidence) or `BLOCKED` (to `QUESTIONS.md`).

---

## 2026-09-05 · Pass 1 kickoff · Orchestrator

Routing:
- Design Lead (Opus) → `DESIGN.md` Pass 1: reference study, three worlds, floor composition, work cards, stage indicator, motion spec.
- Copywriter (Opus) → `COPY.md` Pass 1: every route, every string, `[CONFIRM]` / `[FILL]` markers preserved.
- Fact Checker (Sonnet) → `FACTS.md`: Play Store, GitHub, company sites, LinkedIn attempt, date arithmetic.
- Engineer (Sonnet) → `PLAN.md`: stack, schemas, floor technique, budget accounting, CI, QA scripts.

Design and copy run in parallel per §14; convergence round follows. Engineer's feasibility notes (`PLAN.md` §10) go to Design Lead before Pass 2. No code before human gate 1 (Direction).

## 2026-09-05 · FACTS.md Pass 1 · Orchestrator review of Fact Checker

Verdict: **APPROVED**. 46 rows, every row cites a URL and a status from the fixed vocabulary; Data Safety section quoted verbatim; GitHub reads are plain and carry a placement recommendation with reasons. Evidence: `FACTS.md` rows 1 to 46, `docs/scratch/fact-checker.md`.

Findings routed:
- Row 2 CONTRADICTED: live listing shows 4.3★, brief says 4.6★. → Copywriter round 2 item 1; `QUESTIONS.md` item 36.
- Row 6: developer of record on the public listing is "TheGeekDogs", not a person. → Copywriter round 2 item 2.
- Row 18: Keenai Bengaluru office not on company site. → Copywriter round 2 item 4; `QUESTIONS.md` item 37.
- Rows 40 to 42: Sahib's posts not publicly findable. → Copywriter round 2 item 3; `QUESTIONS.md` item 38.
- Section (b): GitHub placement. → Copywriter round 2 item 9; `QUESTIONS.md` item 39.
- Row 11: corrected Data Safety not live; privacy flag stays OFF. Already `QUESTIONS.md` items 14 and 15.

## 2026-09-05 · COPY.md Pass 1 · Orchestrator review of Copywriter

Verdict: **CHANGES REQUESTED**, 10 items, sent as round 2.
Evidence: automated scan of `COPY.md` found zero banned words and zero em-dashes; manual read of all 910 lines.
1. "4.6" rating in five places contradicts `FACTS.md` row 2 (4.3). → 4.3 plus `[CONFIRM]`.
2. §4.1 "Developer of record: Sahib Singh" contradicts `FACTS.md` row 6. → cut.
3. §6.3 post titles and reaction counts unverifiable (`FACTS.md` rows 40 to 42). → `[CONFIRM]`.
4. §6.2 "Singapore and Bengaluru" (`FACTS.md` row 18). → `[CONFIRM]`.
5. §2.8 body addresses the engineer ("one field in the content"), not the visitor. → rewrite.
6. §7.1 "isn't X, it's Y" device against the charter. → rewrite.
7. §6.1 texture line lists fleet among finance employers, undercutting itself. → tighten.
8. §2.4 Test Engineer card last sentence stumbles. → one clean sentence.
9. §6.5, §7.5 GitHub markers now have the Fact Checker's read. → cite it, owners decide.
10. Appendix B totals. → recount.
Approved as-is: hero variant A with reasoning; floor cards; empty chair; four gates; contact page; 404; accessible-name patterns in §10.2 (gate spoken in the button name is the strongest accessibility idea on the site).

## 2026-09-05 · PLAN.md Pass 1 · Orchestrator review of Engineer

Verdict: **CHANGES REQUESTED**, 10 items, sent as round 2.
Evidence: manual read of all 452 lines; slop scan clean.
1. §1.8 Cloudflare Web Analytics is believed to have no custom-event API, which fails brief §13's CTA and mailto click tracking. → verify against docs; if so, switch to Plausible and cost it in `QUESTIONS.md`.
2. §2 `deskPosition` enum has six slots; `COPY.md` §2.4 has seven desks. → slot ids validated against the floor component, not hard-coded.
3. §2 `people.pronouns` required; brief supplies Sahib's only. → optional.
4. §2 `sameAs` shown in schema then retracted in a note. → remove from block.
5. §1.5 clause about printing the placeholder name in Devanagari. → delete; it is never printed.
6. §3 example markup with an arrow glued to link text, banned by brief §9.4. → remove.
7. §9 `placeholder` grep will match `placeholder=` attributes. → rule: no placeholder attributes; add `[CONFIRM` to the list.
8. §8.1 resource-summary assertions depend on the CI static server gzipping. → verify or add a gzip script.
9. §4.5 `content-visibility: auto` without `contain-intrinsic-size` risks CLS. → add.
10. §6 compact variant uses `title` for hidden labels. → visually-hidden text.
Approved as-is: zero-framework islands policy; Motion One mini plus CSS idle loops; Lenis out; HTML buttons over decorative SVG; `data-blur-strategy` toggle defaulting to static; floor budget script; build order and blockers; risk ranking.

## 2026-09-05 · COPY.md round 2 · Orchestrator

Verdict: **APPROVED**, pending the copy-and-design convergence round once `DESIGN.md` lands, and `QUESTIONS.md` item 42 (gate-label mapping). All ten items applied; spot-checked §2.7, §2.8, §4.5, §4.8, §6.1, §6.2, §7.1, §2.4 and Appendix B. Remaining "4.6" strings are the §4.6 heading and its cross-references. Marker count now 19 CONFIRM, 13 FILL.

## 2026-09-05 · PLAN.md round 2 · Orchestrator

Verdict: **APPROVED**, pending the Engineer's feasibility read of `DESIGN.md` once it lands. All ten items applied and spot-checked (§1.8, §2 `deskSlot`, §4.5, §6, §8.1, §9). Analytics reversed to Plausible with evidence: Cloudflare Web Analytics FAQ states no custom events (https://developers.cloudflare.com/web-analytics/faq/); Plausible tagged events documented (https://plausible.io/docs/custom-event-goals); cost $9/month routed to `QUESTIONS.md` item 35. CI static server switched to Lighthouse CI's `staticDistDir` server, which gzips; `npx serve` confirmed not to.

## 2026-09-05 · DESIGN.md Pass 1 · Orchestrator review of Design Lead

Verdict: **CHANGES REQUESTED**, 6 items, sent as round 2. Direction itself approved for presentation at human gate 1.
Evidence: manual read of §A, §B, §C, §D.6 to §D.8, §E, §F.1 to §F.6, §G.1 to §G.5, §H, §I, §J; all nine contrast ratios recomputed independently by script and matching to two decimals; §9.4 pattern scan found no banned device in the spec itself.
1. "4.6" rating in §B.6, §B.8, §B.9, §J contradicts `FACTS.md` row 2. → 4.3.
2. §B.8 header "ONE link, no nav" leaves /work/, /sahib/, /tanya/, /contact/ unreachable at 360; brief §14 fails orphan pages. 1440 header label "Email" disagrees with `COPY.md` "Contact". → show the 360 route to every page; align labels.
3. §B.9 wireframe uses middle dots in the roster line its own note forbids. → commas.
4. §B.8, §B.9, §C.7 print a desk count; `COPY.md` §2.2 forbids it and supplies the intro. → use the copy, size it, keep or drop the marker.
5. Agent order (Reviewer before Test Engineer) differs from `COPY.md` §2.4 pipeline order. → align or justify.
6. §C.6 fixed slot supersedes `PLAN.md` §4.3. → note the reconciliation.
Approved as-is: "the room is lit, the page is printed"; six tokens with the lamp rule; Anek Latin plus Instrument Sans; five principles; hero A; five agent desks plus two humans plus the chair, with every gate represented; the chair found by stillness, light, emptiness, nearness and pipeline position; default card content is the chair (no interaction needed to receive the argument); mobile as a portrait re-plan with the panel below, not a sheet; cards on static translucent white with no live blur; stage states on size, structure and connector pattern; Sahib's coverage map with attributed/asserted/empty cell states rather than a hidden gap; Tanya's shared-core layout with T2 documented and blocked on content; no scroll-driven effects anywhere; reduced-motion still frames as designed end frames.
Routed: §I items 1 to 11 → `QUESTIONS.md` items 45 to 55. `[COPY NEEDED]` markers → Copywriter round 3. Feasibility read → Engineer round 3.

Arbitration: `PLAN.md` §4.3 (popover / bottom sheet) vs `DESIGN.md` §C.6 (fixed slot, default content the chair). Resolved for the Design Lead by remit (visual judgement) and because the design is strictly less code. Engineer updates `PLAN.md` in round 3.

## 2026-09-05 · DESIGN.md round 2 · Orchestrator

Verdict: **APPROVED for human gate 1**, pending the Engineer's feasibility verdict (round 3) and the Copywriter's ≤ 12-word floor lead-in (round 3). All six items applied and spot-checked: rating now 4.3 everywhere except the `4.6vw` clamp; 360 gets a plain 44px nav row under the wordmark plus a footer nav repeat, no hamburger; 1440 header ends in "Contact"; no middle dots remain in any wireframe; agent DOM and tab order now match `COPY.md` §2.4 pipeline order; §C.6 notes the `PLAN.md` §4.3 reconciliation. Floor intro from `COPY.md` §2.2 sets to four lines at 360, so the `[COPY NEEDED: ≤ 12 words]` marker stays for the Copywriter.

## 2026-09-05 · COPY.md round 3 (convergence with DESIGN.md) · Orchestrator

Verdict: **APPROVED for human gate 3 review.** Hero body cut from 45 to 24 words; floor lead-in 10 words with the empty-chair sentence held in long form (the chair's card is the default panel content, so the argument stays on screen); second-product label "Wedding planner" at 15 characters; /work/ short intro 17 words; 404 reduced to a four-word headline and one link; all eleven `[COPY NEEDED]` markers in `DESIGN.md` answered; banned-word and em-dash scans zero. Markers now 20 CONFIRM, 13 FILL.

## 2026-09-05 · PLAN.md round 3 (design feasibility review) · Engineer verdict, Orchestrator arbitration

Engineer verdict on `DESIGN.md` as a build spec: **APPROVED** (`PLAN.md` §13). Evidence: font files measured with `pyftsubset` (Anek Latin two-axis 69,680 B subset; 52,076 B with `wdth` restricted to 75 to 100; Instrument Sans 20,328 B); floor composition re-costed at ~15 KB raw; `tnum` confirmed present in Anek Latin; URLs in `docs/scratch/engineer.md`.

Orchestrator review of the Engineer's four follow-ups:
1. Card slot min-height at ≥ 1024 missing from `DESIGN.md` §C.6. → Design Lead supplies the number at build step 3, once copy for the longest card is final. Pass 2 item; not blocking gate 1.
2. Font payload ~71 KB with the `wdth` restriction. → Accepted; no design cost; README updated.
3. Stage connectors as inline SVG so the dashed pattern and the "track fills" moment render exactly. → Accepted.
4. Compact home stage view as a `<table>`. → **CHANGES REQUESTED, deferred to build step 2.** Brief §6.2 is explicit: "Semantically it's an ordered list with the current step marked via `aria-current="step"`." A table also has no defined place for `aria-current="step"`. The compact view keeps one `<ol>` per product; the shared stage-name header row is a visible labelled row aligned by CSS grid, and each `<ol>` carries an accessible name naming its product. The screen-reader comparison the Engineer wants comes from the two lists sharing identical item text in identical order. Resolved by remit: the brief outranks both agents.

Arbitration record for the pass:
- `PLAN.md` §4.3 popover vs `DESIGN.md` §C.6 fixed slot → Design Lead (visual judgement; less code).
- Cloudflare Web Analytics vs Plausible → Engineer's finding stands (Cloudflare cannot meet brief §13); cost decision to the human (`QUESTIONS.md` item 35).
- `<table>` vs `<ol>` for the compact stage view → brief §6.2.

## 2026-09-05 · Pass 1 closed · Orchestrator

All four Pass 1 artifacts approved for presentation at human gate 1: `DESIGN.md` (round 2), `COPY.md` (round 3), `FACTS.md` (round 1), `PLAN.md` (round 3). No surface exceeded three rounds. `QUESTIONS.md` holds 55 items. No code written. Next action is the human's.

## 2026-09-05 · Human gate 1 (Direction) · passed with amendments

Owners answered all 55 `QUESTIONS.md` items. Items 29 to 31 left blank; Orchestrator proceeds on the recommendations (hero A, Sahib S1, Tanya T1 re-checked against the resume) and has said so in `QUESTIONS.md`. Amendments to `DESIGN.md` from the answers: seven agent desks, human desks as cabins with persona props, home work-card strip included, contact plate prints the address, no logo, no dark mode, print omits the floor. Sahib's coverage map fills (iOS at Motive and smallcase, KMP at Motive). Analytics is Firebase Analytics by owner request; the brief's Google Analytics exclusion was "unless asked", and this is the ask; Engineer keeps it inside the JS budget with consent-mode defaults so no banner is needed.

Two corrections from Tanya's resume, routed to Fact Checker round 2: her degree is from Meerut Institute of Engineering and Technology under Dr. A.P.J. Abdul Kalam Technical University (Lucknow), not the Kerala university `FACTS.md` row 36 confirmed; her Naskay title was Android Intern, not Android Developer.

Routing this round: Fact Checker round 2 (resume, answers, Pocket Manager codebase at `~/AndroidStudioProjects/PocketManager-Android`, pipeline evidence) → Copywriter round 4 follows it. Design Lead round 3 in parallel. Engineer starts build step 1 in parallel (local commits only; no remote until the owner confirms the repo name). Orchestrator supplied `docs/scratch/references.md` for item 55.

## 2026-09-05 · Owner change · dark mode on all pages

Item 49 reversed by the owner: every page ships a dark scheme. Consequences: three worlds × two schemes, six palettes to hold at AA. Design Lead round 4 (queued behind round 3, which is running on the old instruction) supplies dark tokens for studio, Sahib and Tanya, recomputes every text pair, decides whether a manual toggle ships alongside `prefers-color-scheme`, and re-checks the floor and the acrylic cards on a dark studio ground. Engineer adds the dark blocks and the QA contrast script's dark pass in build step 2. Sahib's world is already dark; it needs a light counterpart rather than a dark one, and the Design Lead decides whether "dark mode" on his page means inverting or deepening.
Addendum, same day: owner confirms a manual light/dark toggle on every page. Design Lead round 4 specs its placement (header, per DESIGN.md §B.8/§B.9 nav row), its two states without colour-only distinction, its focus ring, and its accessible name via `[COPY NEEDED]`. Engineer: `data-theme` attribute on the root set from a stored preference with `prefers-color-scheme` as the fallback, applied before first paint to avoid a flash, no framework, inside the JS budget. The toggle is the one place a user action changes the whole page's tokens, so every world's dark and light sets must both pass the contrast script.

## 2026-09-05 · FACTS.md round 2 · Orchestrator

Verdict: **APPROVED.** Education corrected to Dr. A.P.J. Abdul Kalam Technical University (Lucknow) via MIET Meerut, with both institutions fetched; Naskay title corrected to Android Intern; Motive title to Software Engineer 2; a one-month Naskay/HSBC boundary mismatch caught. Codebase audit cites file paths: Kotlin, Compose-only, Hilt, Room, WorkManager, Glance, minSdk 23, first commit 2020-11-28, Firebase Analytics and Crashlytics present so "on-device only" is never claimed. Pipeline claim upgraded to CONFIRMED from the scheduled task, `factory/` logs, and the repo contract stating humans cut releases and the agent never pushes. Phone-number audit of the repo: zero hits outside the resume PDF. Three owner questions routed to `QUESTIONS.md` 61 to 63.

## 2026-09-05 · DESIGN.md round 3 (Pass 2, owner answers) · Orchestrator

Verdict: **APPROVED.** Ten stations re-planned at both breakpoints (360: 3 × 6 portrait room, smallest target 101 × 64; 1440: 6 × 5); cabins with two props plus one wall piece each, crossed so the pair does not read as the stereotype §9.4 forbids; card-slot min-height now computed (344px at ≥ 1024, 320px below 768) from the longest card; floor accounting ~20.5 KB raw / ~7.8 KB gzipped against the 80 KB line; Sahib's map filled; T1 stands with a new argument (the ten-station floor is already the site's pipeline diagram, so T2 would duplicate it). No rating errors remain.
Of the nine §I items: 1 (prop approval), 5 (mobile floor height), 8 (person-page closing CTA) → `QUESTIONS.md` 64 to 66. 2, 3, 4 → Copywriter round 4 is mapping the gates. 6 → resolved by `FACTS.md` §(d). 7 → T1 stands (item 31 blank means the recommendation). 9 → stale; the subhead was cut to 24 words in copy round 3. Design Lead round 4 removes the stale items and adds the dark scheme and toggle.

## 2026-09-05 · Build step 1 · Engineer report, Orchestrator verification

Engineer delivered 8 local commits on `main`, no remote. Orchestrator re-ran `npm run build` and `qa:no-slop`, `qa:images`, `qa:contrast`, `qa:weight`: all pass; `dist/` holds `index.html` and `404.html`; zero `placeholder=` attributes. Engineer's Lighthouse (3 mobile runs): Perf 100, A11y 100, Best Practices 96 (missing favicon only), SEO 100; LCP 1.3 to 1.5 s; CLS 0; JS 0 B gzipped; CSS 5.7 KB gzipped; fonts 134 KB unsubsetted (subsetting is step 8); Firebase Analytics measured at 15.8 KB gzipped, idle-loaded, consent-mode denied by default. Tailwind `@theme` indirection needed `@theme inline`; recorded in `docs/scratch/engineer.md`.
Routed: rendered-page review → Design Lead reviewer (writes `docs/reviews/step1-design-review.md`). Favicon → Design Lead round 5 (artwork, not the Engineer's to invent). Astro 5 out of security support → `QUESTIONS.md` 67. Omitted-for-copy items → Engineer step 2 once `COPY.md` round 5 lands.

## 2026-09-05 · COPY.md round 4 · Orchestrator

Verdict: **CHANGES REQUESTED**, 4 items (round 5): "reads code review with" → "shares code review with" on both human cards; Tanya's floor card body tightened to ≤ 30 words; §4.4 names three gates while claiming four, add the security review clause; §7.1 "both ends of the work either side of them" rewritten. Approved as-is: engagement copy with "One project at a time" opening §2.9's second paragraph; the four gates with owners; §4.3 Build and §4.4 Review process from the codebase audit; proof paragraph 2 and §5.4 rewritten without the cut-feature line per item 12; privacy variants deleted per item 14; markers down from 33 to 8, all mapped to open questions.

## 2026-09-05 · COPY.md round 5 · Orchestrator

Verdict: **APPROVED for the Fact Checker's line-by-line pass and human gate 3.** Four lines tightened as requested; scans zero. Copy is now complete except eight `[CONFIRM]` markers, each tied to an open `QUESTIONS.md` item (56, 60, 61, 62, 63, the design-review owner, the permanent reaction-count caveat, and the headshots).

## 2026-09-05 · Step 1 rendered review · Design Lead reviewer → Engineer

Verdict: **CHANGES REQUESTED, 17 items**, `docs/reviews/step1-design-review.md`, 26 screenshots at 360/390/768/1024/1440 plus focus, reduced-motion and mid-scroll states in `docs/reviews/step1/`. Orchestrator read all 17: every item cites a screenshot and a DESIGN.md section; none contradicts a standing arbitration. Item 14 (a fourth amber on the final CTA button) resolved for the wireframe: the address is lamp text on the floor with a rule, not a filled button. Item 16 is the Design Lead's own inconsistency (§E.1 table vs §E.2/§E.3 wireframes) → Design Lead round 5. Items 1 to 15 and 17 → Engineer step 2. Passed: focus rings, reduced motion, greyscale legibility of the track, plate release point, grid and section padding.

## 2026-09-05 · DESIGN.md round 4 (dark scheme, toggle) · Orchestrator

Verdict: **APPROVED.** Six dark/light pairs recomputed by script (5.06, 7.54, 1.21, 12.71, 14.09, 5.15) and matching. Sahib's existing palette is his dark scheme; his world carries the `[data-theme="light"]` overrides. Toggle is the fifth nav item at 360, lamp glyph, shape-distinguished states. Two findings ruled: the light future-node stroke at 2.65:1 fails the 3:1 line for a meaningful graphic, so the priced fix is applied (Perf & A11y rule outranks palette preference); OG images render in the light scheme only and `theme-color` is emitted per scheme with a `media` attribute (Engineer decision).

## 2026-09-05 · FACTS.md round 3 (line-by-line copy pass) · Fact Checker → Orchestrator

Fact Checker verdict: **CHANGES REQUESTED**, 76 rows, 2 CONTRADICTED, 3 UNVERIFIABLE, 8 must-cut-or-confirm. Orchestrator rulings:
- "50+ global markets" → "50 global markets" (source says 20+ currencies, 50 markets). Upheld.
- "Same pipeline" extended to the second product: unaudited. Upheld; shipping copy drops the clause, `QUESTIONS.md` 68 asks, the clause returns if yes.
- "283 reactions and 13 reposts" printed bare while Tanya's figures are attributed. Upheld; attribute.
- "Items 11 and 13 settled the no-form decision": wrong citation; no item authorises it. Upheld as a doc fix; `QUESTIONS.md` 69 asks; mailto-only stands as the stated assumption meanwhile.
- "Flutter, Dart" at Keenai: **overruled.** Brief §7 row marks it confirmed from his own profile, and the owners reviewed that row. OWNER-PROVIDED, printable.
- Motive Fleet App feature list: **overruled.** It is the brief §7 row's product description, marked confirmed; copy already frames it as the product, not his tasks. Printable.
Copywriter round 6 applies the four upheld items.

## 2026-09-05 · COPY.md round 6 · Orchestrator

Verdict: **APPROVED. COPY.md is at human gate 3 (Copy).** Four fact-check items applied: "50 global markets"; the second product's "same pipeline" clause moved to a variant pending `QUESTIONS.md` 68; the reaction count attributed ("By his account … on LinkedIn"); the no-form note corrected to cite item 69. Scans zero. Remaining `[CONFIRM]` markers all map to open questions 56, 60 to 63, the design-review owner, and the headshots.

## 2026-09-05 · DESIGN.md round 5 · Orchestrator

Verdict: **APPROVED.** Connector rule settled (solid out of the current node; the table was normative, the build already matched). Future-node stroke raised to `rgba(15,42,46,.60)` in light: 4.01 on sheet and 3.83 on band, recomputed by the Orchestrator and matching. OG light-only and per-scheme `theme-color` recorded. New §B.12 favicon: the lamp cone alone, `--lamp` on `--floor`, one SVG plus 32/180/512 PNGs, never on the page. → Engineer step 3 produces the files.

## 2026-09-05 · Owner answers 56 to 69 · Orchestrator routing

Both cut the release (56) → Copywriter round 7. Firebase keys go in `.env` by the owner; the site must build without them (57) → already so; Engineer verifies a keyless build in step 3. Repo `thegeekdogs.com`, local commits only, a human pushes (58). Adjectives recorded as register, never printed (59). Pocket Manager screenshots from an emulator build (60) → step 4. Sahib's older resume (61) and the four LinkedIn posts (62, verified by the Orchestrator in Chrome: 110 / 283 / 92 / 17 reactions; the Android 16 post carries exactly 283 reactions and 13 reposts) → Fact Checker round 4. Naskay project named (63), props approved (64), floor height accepted (65), person-page CTAs use own addresses (66), Astro 7 (67) → Engineer step 3, same pipeline for the second product (68) → variant text ships, email only (69). New item 70: design-review owner.
Resume flags for the Fact Checker: Motive start Oct 2023 vs the brief's Nov; smallcase end Sept 2023; Cleartrip title Android Intern; smallcase iOS work was the Tickertape Flutter app, which strains item 45's "native iOS at smallcase"; a Udacity iOS Nanodegree the brief omits.

## 2026-09-05 · Human gate 3 (Copy) · passed with two amendments

Owner read `COPY.md` and approved it, with: location Bengaluru only (footer line and any other user-facing mention of New Delhi removed); design review owned by both (closes item 70). Instruction: bake it into the site. Routing: Copywriter round 8 applies the two amendments plus Fact Checker round 4's resume corrections, then Engineer step 3 transcribes the final copy into content files for every route.

## 2026-09-05 · COPY.md round 7 · Orchestrator

Verdict: **APPROVED.** Ship approval names both under §2.6; the second product's pipeline text ships; Naskay project named; adjectives recorded as register only; markers down to 6, all tied to open items. Round 8 queued for: Bengaluru only, design review by both (item 70), and Fact Checker round 4's resume corrections.

## 2026-09-05 · Owner clarification, item 45 → item 72

smallcase/Tickertape: native Android and native iOS, then Flutter. Motive: native Android, native iOS, KMP. OWNER-CONFIRMED. Fact Checker round 4's expected CONTRADICTED (partial) row on this point is resolved by the owner's statement; the row should record both sources and this ruling. Copywriter round 8 and Design Lead (coverage map §F) apply it.

## 2026-09-05 · FACTS.md round 4 · Orchestrator rulings

Fact Checker verdict on Sahib's page: CHANGES REQUESTED, 5 CONTRADICTED rows, 7 questions. Rulings:
1. Native iOS at smallcase and Motive: **closed by the owner's item 72** (native Android and native iOS at Tickertape, then Flutter; native Android, native iOS and KMP at Motive). The resume is older and silent, not contradicting. Copy prints item 72's wording; the resume's Tickertape Flutter launch is the later phase and is printed as such.
2. Motive title "Android Engineer" vs resume "Android Developer": both owner sources; brief §5.4 says the owners' corrections override profile text and the brief prints Engineer. Keep. Moot on the site beyond the role line.
3, 4, 5. Month-level date differences: the site prints years only (2023 – 2025, 2020 – 2023); Pocket Manager's project window is not printed. Moot; recorded.
6. "Android Basics Nanodegree" vs "Android Nanodegree": print the resume's own wording, "Udacity Android Nanodegree", true under either programme.
7. Add: Udacity iOS Nanodegree (supports the iOS claim); leading the team that launched the Tickertape Flutter app for iOS and migrated Android to Flutter; the Motive design-components library across Driver and Fleet apps and the Views-to-Compose migration; Cleartrip hotel booking on an app with 10M+ downloads. Skip: IIIT-B data science (off-thesis). All attributed as his own account where a figure appears.
LinkedIn rows 40 to 42 upgraded to CONFIRMED on the Orchestrator's logged-in check. → Copywriter round 8.

## 2026-09-05 · DESIGN.md round 6 · Orchestrator

Verdict: **APPROVED.** Coverage map cells re-attributed per item 72 (smallcase: Android app, Tickertape native iOS, Tickertape Flutter; Motive: Fleet and Driver apps, Compose migration, KMP components library); the unattributed "honest line" deleted; Pocket Manager `[BLOCKED]` markers cleared. Filled region reads as a staircase falling right to left, all five columns and rows covered. Geometry unchanged, so step 6's build spec is stable.

## 2026-09-05 · COPY.md round 8 · Orchestrator

Verdict: **CHANGES REQUESTED, 3 items** (round 9). Bengaluru-only footer, design review by both, item 72 stacks, Nanodegree wording, Cleartrip title, post figures printed plainly with four URLs: all approved. Back: "by his own account" three times on one page (once, at most); the Cleartrip 10M download figure is a store fact and needs no attribution; §2.3's home role line dropped "native" to satisfy an Orchestrator scan that was broader than the rule it enforced, so it goes back to the brief's wording. Card small print also needs trimming to card length. Markers now 2 (screenshots, headshots).

## 2026-09-05 · COPY.md round 9 · Orchestrator

Verdict: **APPROVED. COPY.md is final for the build.** Role line restored to the brief's wording; attribution once per page; card lines at 35/35/14 words. Two markers remain (screenshot and headshot alt lines), both tied to assets that do not exist yet; the Engineer omits those `alt` sources until the assets land. Engineer step 3 transcribes every route from this version.

## 2026-09-05 · Build step 2 · Orchestrator verification and routing

Orchestrator rebuilt and re-ran `qa:no-slop`, `qa:images`, `qa:contrast`, `qa:weight`, `check-floor-budget`: all pass; six commits; `data-theme` wired. Viewed `docs/reviews/step2/engineer/home-1440-light.png`: section order and fill alternation match §B.9; no template chrome; ambers limited to the plate and the address.
Routed: rendered review → Design Lead reviewer (`docs/reviews/step2-design-review.md`, both schemes, rules on the two plate conflicts). Three `[COPY NEEDED]` strings → Copywriter round 10. Step 3 (Astro 7, favicon files, the SVG scene, "Lights on") → Interaction Engineer.
Queued for Copywriter round 11 (after round 10 frees the file): §2.6 ends with "a fifth thing" and "a sixth" under a headline that says four. Remove the ordinals; one plain sentence that design review and the release itself stay with both of them.

## 2026-09-05 · Asset capture (QUESTIONS.md 10, 60) · QA → Orchestrator

Pocket Manager: 12 emulator captures (Pixel 6 Pro, Android 15, app 2.0.0), light and dark, ten seeded INR transactions, no names. Three mismatches with the drafted alt lines (no separate categories screen; percentages not totals; export lives in Settings and is labelled Beta) → Copywriter round 11. Wedding planner: icons and five screenshots copied from `~/FlutterProjects/wedme`, feature graphic excluded, no screenshot shows the placeholder name. 01 shows the multi-function board (cleared). 02 and 05 show a vendor-comparison board: excluded under brief §5.3. 03 (who paid what) and 04 (payment schedule) show features on §5.3's reachable list; the Orchestrator reads them as usable and item 73 asks the owner to confirm. The repo records the captures as simulator, not physical device; the site prints no "real-device screenshots" claim, so nothing is wrong on the page.
Process fault: the Engineer's blanket `git add` in step 2 committed superseded captures. Orchestrator committed the corrected set (`d4566df`) and added a git-hygiene rule to both engineer charters.

## 2026-09-05 · COPY.md round 10 · Orchestrator

Verdict: **APPROVED**, with one flag routed: Tanya's "Owns" list runs 96 characters against a two-line card; round 11 trims it or the Design Lead raises the slot min-heights to 372/348.

## 2026-09-05 · COPY.md round 11 · Orchestrator

Verdict: **APPROVED.** §2.6 ordinals gone; Tanya's gate list at exactly 80 characters with all seven kept, so the slot min-heights stand; Pocket Manager alt lines now describe the captured screens (home, calendar, statistics with the percentage card, settings data rows); wedding planner alt for 01 only, 03 and 04 marked for item 73, 02 and 05 never ship. Two markers remain (item 73, headshots). Copy is final for Engineer steps 4 to 7.

## 2026-09-05 · Step 2 rendered review · Design Lead reviewer → Orchestrator

Verdict: **CHANGES REQUESTED, 15 items** (13 defects, 2 recorded), `docs/reviews/step2-design-review.md`, 130 screenshots across five breakpoints, both schemes, focus, activation, reduced motion, mid-scroll, toggle states. Step 1 items: 15 of 17 closed; 1 and 9 closed above 768 only.
Rulings accepted by the Orchestrator: (a) below 768 the plate is the same 260 × 56 inset plate, not a full-bleed bar; (b) the keep-out lane is withdrawn, the reserve is the +56px bottom padding plus a composition rule (no load-bearing mark in the bottom-right 276 × 72 at ≥ 768), and the split forms and side-by-side slot return to 1024. → Design Lead round 7 writes both into `DESIGN.md` §B.10 and §B.5; Engineer applies the 15 items in the steps 4 to 7 run.
Most important: the lane re-gridded five of seven sections to 1044px against 1200px elsewhere; the plate covers the default chair card and the track at 360; the four gate bodies are not `COPY.md` §2.6 (the owners' names are missing) and must be re-transcribed from the final copy. Remove one thing: the card slot's border.

## 2026-09-05 · Step 2 Perf & A11y audit · Auditor → Orchestrator

Verdict: **CHANGES REQUESTED, not blocking.** Lighthouse mobile ×3, both schemes: 100 / 100 / 96 / 100, LCP ~1.39 s, CLS 0, TBT 0; every §11 line clears. axe-core: 0 violations on four route × scheme combinations. Keyboard: skip link first, ten stations in the specified order with byte-exact names, visible two-tone ring on every stop, no trap. Report at `docs/reviews/step2-a11y-perf-audit.md`.
Rulings:
1. Favicon (BP 96): lands in step 3.
2. The card slot's `aria-live="polite"` re-announces a full card on every Tab through the roster (also the design reviewer's item 14). Ruling: focus and hover write to the slot silently, because the station button's own name already speaks the name and gate; only activation (Enter, Space, click) announces the card. Engineer implements in steps 4 to 7.
3. Two inline text links at 20px tall at 360: WCAG 2.2's inline-text exception applies; no change required; the Engineer may add vertical padding if free.
4. Screen-reader pass not run: enabling VoiceOver is a system setting no agent changes. → `QUESTIONS.md` 74, a human task before gate 4.

## 2026-09-05 · DESIGN.md round 7 · Orchestrator

Verdict: **APPROVED.** Spec now agrees with the step 2 rulings: one inset 260 × 56 plate at every breakpoint; keep-out lane withdrawn; the composition rule stated once in §B.10 ("No load-bearing mark … bottom-right 276 × 72 CSS px at ≥ 768 while the plate is present"); the proof track's axis ends at x 1132 on a 100px pitch with the band keeping cols 7 to 12; split forms and the side-by-side slot back at 1024 (slot min-height 392px there); card-slot border removed per §J. Engineer steps 4 to 7 build to this.

## 2026-09-05 · Build step 3 (floor scene, Astro 7, favicon) · Interaction Engineer → Orchestrator

Orchestrator rebuilt and re-ran the QA gates and the floor budget: all pass; `npm audit --omit=dev` finds 0 vulnerabilities. Engineer's numbers: Astro 7.3.1; floor 5,125 B gzipped against the 80 KB line; smallest target at 360 is 64 px; Lighthouse 100 / 100 / 100 / 100 in both schemes; LCP is the h1 at 1.40 to 1.46 s; no motion library (CSS keyframes carry the stagger and the hold). Orchestrator viewed `floor-1440-light.png` and `floor-360-dark.png`: the room reads and the lit chair is alone at the front; at 360 the still-unapplied step 2 plate ruling covers the card title and two nameplates collide. Four measured deviations from §C are argued in `docs/scratch/engineer.md` for the Design Lead to rule on.
Routed: floor rendered review → Design Lead reviewer (`docs/reviews/step3-floor-review.md`). Step 2 items, audit rulings, copy re-transcription, steps 4, 5 and 7 → Engineer run A. Person pages → run B after A.

## 2026-09-05 · Step 3 floor rendered review · Design Lead reviewer → Orchestrator

Verdict as filed: **BLOCKED, 17 items, 3 blockers** (`docs/reviews/step3-floor-review.md`, 47 screenshots, `measurements.json`). Orchestrator classification: merge-blocking defects for the Interaction Engineer, not a human question; no owner decision is needed.
Blockers: (1) the floor is dead to pointer and touch at every breakpoint; `elementFromPoint` returns `<main>` at all ten stations; only the keyboard reaches a station. This is the "control wired to nothing" failure brief §14 names and it ships under no circumstances. (2) Below 768 the plate is still the full-bleed bar over the chair's default card (step 2 ruling (a), being applied in run A). (3) The keep-out lane still pads the floor shell and shrinks the 1440 scene to 654 × 462 (ruling (b), run A).
Deviation rulings accepted by the Orchestrator: cabin buttons 128 × 136 (accepted, §C.3 corrected; Sahib's nameplate moves out of Tanya's target); buttons centred on artwork (accepted); nameplates on their own module (accepted for the wide plan only); portrait plan below 1024 (sent back: its arithmetic assumed the withdrawn lane; §C.3's 704-wide room fits 768's content width). Remove one thing: the skewed wall-mounted cabin nameplate.
Routing: Design Lead round 8 writes the accepted deviations into §C now. Interaction Engineer floor fix runs after run A releases the repo, before run B.

## 2026-09-05 · DESIGN.md round 8 · Orchestrator

Verdict: **APPROVED.** §C now carries the accepted deviations and the corrected portrait plan: wide plan at ≥ 768 (856 × 520 at 1440, 682 × 414 at 1024 with the tightest target 89 × 44.6); portrait 3 × 6 below 768 with rows summing to 520, plates confined to each button's top band, smallest target 101.3 × 68; cabin nameplate horizontal on its own cabin floor, Sahib's at (396, 204); new §C.11 pointer requirement with the acceptance test (`elementFromPoint` at each station centre returns that button, ten of ten, at six widths in both schemes). Interaction Engineer floor fix builds to this once run A frees the repo.

## 2026-09-05 · Build run A · Engineer → Orchestrator verification

Orchestrator rebuilt (6 pages), re-ran no-slop, images, links, contrast, weight and the floor budget (all pass), confirmed five OG PNGs, and ran an independent pointer hit-test: `elementFromPoint` at every station centre returns that station's button, 10 of 10 at 360, 768 and 1440. The step 3 blocker (a `pointer-events: none` wrapper) is closed. Engineer's numbers: Lighthouse 100 / 100 / 100 / 100 on all five routes in both schemes; LCP 1.40 to 1.48 s; CLS 0 except `/contact/` 0.030; home CSS 9.7 KB and inline JS 1.2 KB gzipped; keyless build ships 0 B analytics; JSON-LD typed with `schema-dts`, not validated against a network validator. Step 2 items 1 to 13 fixed, 14 as ruled, 15 recorded. Flagged for the Design Lead: `/work/` at 768 to 1023 puts the tracks inside the plate's band.
Routing: floor pass to the round 8 spec → Interaction Engineer now (repo free). Rendered review of run A → Design Lead reviewer on `scratchpad/dist-runA`. Built-output fact pass → Fact Checker on the same copy. Run B (person pages) after the floor pass.

## 2026-09-05 · Run A built-output fact pass · Fact Checker → Orchestrator

Fact Checker verdict as filed: BLOCKED, because `/sahib/` and `/tanya/` are absent. Orchestrator reclassifies to **CHANGES REQUESTED**: the person pages are run B by the brief's build order (§14 step 6, Tanya last) and their absence is recorded in `docs/scratch/engineer.md`; nav and strip links land with them. Clean: every forbidden term and marker at zero across HTML, JSON-LD, OG filenames, sitemap; meta verbatim; JSON-LD matches FACTS.md with no invented pronouns and no address beyond Bengaluru; five alt lines verbatim; shipped images show no placeholder branding; stage strings exact.
Rulings on the three findings:
1. `/404.html` carries the contact plate in addition to its one link. Arbitration: the plate is site chrome specified by DESIGN.md §B.10 for every page; COPY.md §9's "one link" governs page content. The plate stays; COPY.md §9 gains a sentence saying so.
2. COPY.md §1 still describes the plate as a "Start a project" label; QUESTIONS.md 53 chose the plain address and the build follows 53. COPY.md §1 is stale → Copywriter round 12 updates the label and its accessible name.
3. The strip prints years only per DESIGN.md §D.5 while COPY.md §7.2 holds "Jan 2024 – now". Years only is the rule; COPY.md §7.2 conforms → round 12.

## 2026-09-05 · COPY.md round 12 · Orchestrator

Verdict: **APPROVED.** Plate label is the address per page with the accessible name "Email <address>. Opens a new message about a project."; 404 note records the plate as chrome; §7.2 years only. Engineer run B applies the plate's accessible name and the person-page addresses.

## 2026-09-05 · Run A rendered review · Design Lead reviewer → Orchestrator

Verdict as filed: **BLOCKED, 13 items (3 blockers)**, `docs/reviews/runA-design-review.md`, 288 screenshots. Orchestrator classification: merge-blocking engineering defects, no human decision. All 15 step 2 items verified closed; the plate is one component at 80 route × width × scheme combinations; §B.5's grid holds everywhere.
Blockers: (1) the floor scene never instantiates the lamp cone, chair seat or lit desk tops on the page in either scheme, although the OG card draws them (the Orchestrator's earlier 1440 screenshot from step 3 showed a cone, so run A regressed it or the frozen copy predates a fix; the floor pass now running re-checks); (2) `/contact/` at 1024, the plate strikes Tanya's address on first paint; (3) the future-node stroke shipped at `.45`, not the round 5 `.60`, 2.65:1, failing SC 1.4.11.
Ruling accepted: `/work/` 768 to 930 puts track marks under the plate; §B.10's composition rule is amended to "no load-bearing mark's right edge inside the plate's 276px band at ≥ 768, anywhere in the wrapper"; §E.2's vertical track runs to 930. → Design Lead round 9 writes it. Items 1 to 13 → Engineer run B, with the floor pass's output.

## 2026-09-05 · DESIGN.md round 9 · Orchestrator

Verdict: **APPROVED.** Composition rule now reads on right edges anywhere in the plate's wrapper, with prose and headings exempt; `/contact/` goes 3-up inside cols 1 to 9 at ≥ 1024 (row ends at x 738 against the band at 748) and stacks below; `/work/` runs the vertical track to 930 and the horizontal from 931; §E.1 carries `.60` only, so the `.45` in the build is an engineering miss. Spec is stable for run B.

## 2026-09-05 · Floor pass 2 · Interaction Engineer → Orchestrator verification

Orchestrator rebuilt and ran `qa:floor` (pointer 10 of 10 at six widths in both schemes; nameplates 10 of 10 clear) and the floor budget: pass. Engineer's numbers: floor 6,149 B gzipped; smallest target 101.3 × 68 at 360 and 89 × 44.7 at 1024; scene 856 × 520 at 1440; Lighthouse 100 × 4 in both schemes. Root cause of the unlit scene (run A review blocker 1): the SVG defs moved to `set:html` in run A were outside Astro's style scoping, so every `.fl-*` fill fell back to black; fixed. Floor review items all closed (10 this pass, 7 already by run A).
Open, ruled: the lamp cone (~8,600 units²) is smaller than the 260 × 56 plate, so §C.3's "largest area of accent colour on the site" is literally false. Ruling: the sentence describes the scene, not the chrome; the plate is chrome; the Design Lead rewrites the sentence to say "in the scene" at the next spec touch. The 6% warm offset stays unbuilt (four-fill line wins). Below 768 the plate crossing the default card at some scroll offsets is §B.10's own ruling and stands.
Routing: run B → Engineer (person pages Sahib then Tanya, the 13 run A items, copy round 12, nav and strip links, §J cuts). Rendered review of run B covers the floor again.

## 2026-09-05 · DESIGN.md round 10 · Orchestrator

Verdict: **APPROVED.** Below 768 the plate is 112 × 56 with the composition rule now binding there too; on `/` the sticky wrapper begins after the floor section so the card panel is never overlaid; bottom reserve +72; no JS, identical under reduced motion. The 112 plate cannot print the address, so it carries a ≤ 9-character label with the address in its accessible name → Copywriter round 13. §C.3 mechanism 2 now describes the scene only. Engineer applies at the end of run B (instructed to re-read §B.10).

## 2026-09-05 · COPY.md round 13 · Orchestrator

Verdict: **APPROVED.** Sub-768 plate label "Email" (5 characters), address kept in the accessible name. Run B applies it with the round 10 plate.

## 2026-09-05 · Build run B · Engineer → Orchestrator verification

Orchestrator rebuilt (8 pages) and re-ran no-slop, images, links, contrast, weight, floor, plate, worlds and the floor budget: all pass. Engineer's numbers: 13 of 13 run A items closed; Lighthouse 100 × 4 on all seven routes in both schemes; LCP 1.42 to 1.51 s; CLS 0 except `/contact/` 0.030; person pages 0 B external JS, 450 B inline; shared CSS 12.4 KB gzipped. Sahib's map is a real `<table>` with explicit roles; Tanya's T1 is one layout module plus one token partial with shared components on generic tokens only, so T2 is a one-import swap. Two new gates added (`qa:worlds`, `qa:plate`).
Held by the Engineer: the sub-768 plate (its label landed in copy round 13 after the run started) and `/404`'s empty room. Flagged for the Design Lead: §B.9's proof split cannot hold a 100px axis at 1024.
Routing, all on the frozen `scratchpad/dist-runB`: Design Lead rendered review of all routes and the floor; Fact Checker built-output pass; Perf & A11y final audit. On the repo: Engineer pass for the plate label and the 404 room. Design Lead round 11 for the 1024 proof split.

## 2026-09-05 · DESIGN.md round 11 · Orchestrator

Verdict: **APPROVED.** Proof section stacks below 1440 (prose cols 1 to 7; the two-runner track cols 1 to 6 with the axis at x 48 to 448, 100px pitch, last ring 291px clear of the band at 1024) and splits only at 1440 where it already works. The 1200 threshold was rejected by arithmetic (axis would end 97px inside the band). Engineer applies in the consolidated fix run after the three reviews land.

## 2026-09-05 · Run B built-output fact pass · Fact Checker → Orchestrator

Verdict: **APPROVED**, one pre-flagged difference (the sub-768 plate label, being applied in pass C). Sweep: zero hits on twenty terms across HTML, sitemap, OG filenames; pronouns clean. `/sahib/` and `/tanya/` match `COPY.md` §6 and §7 verbatim, four post hrefs in the right order, both quotes as `<blockquote>`, no headshot placeholder. All ten map cells trace to item 72 and `FACTS.md`. JSON-LD, meta and both new OG images verbatim. Facts gate (human gate 2) is satisfied from the checker's side; the remaining owner items are 23 (headshots) and 73 (wedding screenshots 03 and 04).

## 2026-09-05 · Run B Perf & A11y audit · Auditor → Orchestrator

Verdict: **CHANGES REQUESTED, not blocking.** 48 Lighthouse runs (8 routes × 2 schemes × 3): 100 × 4 everywhere except 404's SEO at 66 (noindex, expected); worst LCP 1,514 ms on `/work/pocket-manager/`; worst CLS 0.0063; TBT 0 in 48 of 48. axe: 0 violations in 16 combinations. Contrast: every pair matches `DESIGN.md`. Fonts: 133,852 B shipped against a 70,708 B target, a 63 KB gap for subsetting (PLAN.md §1.5) → the consolidated fix run.
Rulings: (1) `/tanya/` print keeps the three-column grid; DESIGN.md §D.8 says cards flatten to one column and the output is a document you would attach to an email; the whole page collapses to one column in print → fix run. (2) Tanya's DOM order diverging from visual order at ≥ 1024 via grid areas: DOM order is the reading order the spec defines (core, then edges); recorded, no change. (3) The concurrent edit adding a 404 SEO assertion of 0.9 to `lighthouserc.json` cannot pass while the page is `noindex`; the fix run either exempts 404 from the SEO category or asserts what noindex allows.
Auditor's veto: not exercised. Human passes still owed: real device (brief §14) and VoiceOver (`QUESTIONS.md` 74).

## 2026-09-05 · Run B full-site rendered review · Design Lead reviewer → Orchestrator

Verdict as filed: **BLOCKED, 30 items** (`/` 3 blockers + 7; `/work/` 1; pocket-manager 1; wedding-planner 2; contact 1; `/sahib/` 6; `/tanya/` 7; 404 2), `docs/reviews/runB-design-review.md`, 221 screenshots, 5 print PDFs. Orchestrator classification: merge-blocking engineering and spec items; no owner decision. Verified closed: 13 of 13 run A items; six palettes hex-exact on eight routes; pointer 10/10 at six widths.
Blockers: the plate strikes `1,000+ downloads` at 768 to 1022, covers the Designer station at 768 to 1023, and strikes the card's "Owns" line at three widths. Root: §B.10's wrapper still spans the floor above 768 and the spec exempted the card slot, contradicting its own "never covers content" promise.
Arbitration, two Design Lead sessions in conflict on the proof band at 1024: round 11 chose stacking below 1440; the reviewer refuses the stacked render (right 46% empty for 918px) and prescribes one grid in two rows (prose, figures and links cols 1 to 7, caption cols 8 to 12, then the two-runner track spanning cols 1 to 9 at 100px pitch, last node x 652, 96px clear). Rendered evidence outranks arithmetic alone: **the reviewer's layout wins.** Same instrument for Tanya's band, her core back to cols 4 to 9 at 1024 to 1439. The plate wrapper becomes unconditional at every width; the card-slot exemption is removed.
Equality of ambition: the design holds; the render at 1024 to 1439 does not (a 31-character prose column against his ten-product diagram); items T1, T2, T4 close it with content already written.
Routing: Design Lead round 12 writes the arbitration into §B.9, §B.10, §E.3, §G.3. Consolidated Engineer fix run after pass C: all 30 items, the audit's three, font subsetting.

## 2026-09-05 · COPY.md round 14 · Orchestrator

Verdict: **APPROVED.** Map section line "What he ships and where"; cards section line "The roles behind the map". Both to the consolidated fix run.

## 2026-09-05 · Pass C · Engineer → Orchestrator verification

Orchestrator rebuilt and re-ran no-slop, links, plate, floor: pass. Engineer's numbers: sub-768 plate 112 × 56 labelled "Email" with per-world mailto and the unchanged accessible name; wrapper on `/` starts at the floor's end, sweep 0 of 88 positions escaping; `qa:plate` 566 marks at eight widths, 0 inside the band; 404 empty room at 615 B gzipped; a real CLS 0.0596 on 404 from `contain-intrinsic-size` found and fixed; 404's SEO assertion now targets the eight audits noindex allows, closing the audit's finding 3. Lighthouse 100 × 4 on eight routes in both schemes.
Open for the consolidated run: the 30 review items (several plate collisions at 768 to 1023 may already be closed by this pass's wrapper change; the run verifies each by number), round 12 spec, round 14 strings, Tanya print collapse, font subsetting and fallback metrics (`/contact/` CLS 0.030).

## 2026-09-05 · DESIGN.md round 12 · Orchestrator

Verdict: **APPROVED.** The arbitration is in the spec: proof band at 1024 to 1439 as one grid in two rows (track cols 1 to 9, centres 252 to 652, 96px clear), the 1440 split kept (23px clear); the plate rule now absolute ("never covers content … at any scroll position, at any width, on any route") with named no-span regions (the floor section on `/`, all of `/contact/`) and the card-slot exemption gone; Tanya at 1024 to 1439 with Android cols 1 to 3, core 4 to 9 (47-character measure, was 31), iOS 10 to 12; print collapses to one column; §K presentation packet for Tanya with six frames, three passages and one question. Of the 30 review items, 26 were spec-side and are now written; 4 (T1, T3, T5, E1) are build-side. Run D's part E is unblocked; the "Round 12" line exists in the scratch file.

## 2026-09-05 · Build run D · Engineer → Orchestrator verification

Orchestrator rebuilt and re-ran every gate: pass (`qa:plate` reports 7 sub-768 collisions as flagged, not failed, pending the spec reconciliation below). Engineer's numbers: 28 items closed incl. part E after round 12 landed mid-run; fonts 68,460 B (under the 70,708 target); home 94,841 B gzipped total; CLS 0.0001 on all eight routes both schemes; map states 2.97:1 light / 2.91:1 dark; selected station fill 2.36 / 2.61:1 with the 1px chalk edge carrying the distinction; Lighthouse 100 everywhere except 404's SEO by design; worst LCP 1,506 ms.
Left: T1 (copy: the Android-edge Motive annotation; COPY.md §7.2 has one sentence and splitting it is writing copy) → Copywriter round 15. Tick geometry in §G.3a not expressible with the platform label first → Design Lead round 13. Seven `qa:plate` collisions below 768 because §B.8's 360 wireframe draws the figures to x 309 against the 128px band at 232, and §B.10 declares Tanya's "Owns" line covered by being full width → Design Lead round 13 reconciles. H9's selected fill at 2.36:1: the spec's own glow ceiling makes 3:1 unreachable and the stroke carries it; Orchestrator accepts, Design Lead records it in §C.8.

## 2026-09-05 · COPY.md round 15 · Orchestrator

Verdict: **APPROVED.** Android-edge annotation for Motive, 15 words, resume-sourced, no repeated figures. To run E.

## 2026-09-05 · DESIGN.md round 13 · Orchestrator

Verdict: **APPROVED.** Below 768 the proof figures stack in three rows (numeral column from x 20, label from x 104, ink ends x 162, 70px clear of the band); the "Owns" line wraps in the same width; ticks align to the platform label's baseline 50px below the band's top and attach to the layer, not a card; §C.8 records the selected fill at 2.36 / 2.61:1 with the 1px chalk edge carrying the state; the warm offset is deleted; new §I.1 disposition table. Spec is complete for run E.
