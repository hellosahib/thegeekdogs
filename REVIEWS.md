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
