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
