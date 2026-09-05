# Final build — Design Lead review of rendered output

Reviewer: Design Lead (review role). **Reviewed the rendered pages only, never the stylesheet.**
Build: commit `6283b4a`, after build runs D and E. Every frame and every number in this document was
taken against the frozen copy at
`scratchpad/dist-final`, served statically and driven with Playwright, so nothing in the repo can
have moved under the review. The frozen copy was diffed against `dist/` before the first screenshot:
**identical, byte for byte.**

What was driven: all eight routes — `/`, `/work/`, `/work/pocket-manager/`,
`/work/wedding-planner/`, `/contact/`, `/sahib/`, `/tanya/`, `/404.html` — at **360, 390, 768, 1024,
1440 in both schemes**, full page; the floor additionally at **1920** in both; `reduce` on `/`,
`/sahib/` and `/tanya/` at 360 and 1440 in both; the three orchestrated moments at two instants each
(and a third instant on "Lights on", because the first two land inside the same phase); three focus
stops on every route plus a station's ring on the floor; the card slot after a real pointer click, at
four widths in both schemes, with **every one of the ten cards forced into it and measured**; both
person pages printed — as PDF, as a print-media render at A4's own 794px width, and again with every
fill suppressed; and all seven OG PNGs. On top of that, a **plate sweep**: eight routes × eight
widths × every 40px of scroll, **4,756 positions across the 56 route/width pairs that carry a plate** —
testing the plate's rectangle against the *ink* rectangles (not the boxes) of every mark on §B.10's own list plus nine selectors the list
does not name, so that this review can rule on the ones it does not name rather than inherit them.

**266 PNGs, 4 print PDFs and 6 measurement files written to `docs/reviews/final/`.** (The `audit/`
and `qa/` subdirectories already in that folder belong to the Perf & A11y Auditor and to QA; they are
not mine and are not re-listed here.) Geometry, ink extents, fills, contrast, hit-tests, reflow and
pixel differences are read off the rendered page into `measure-final.json`, `measure-probe.json`,
`measure-probe2.json`, `measure-probe3.json`, `measure-probe4.json` and `plate-sweep.json` — never
off CSS.

**The two exemptions build run E recorded are confirmed as recorded and are not counted as items**:
the plate crossing the middle line of `/tanya/`'s Android annotation at 360
(`plate-over-android-note-360-light.png` — `.edge__note` is off `qa:plate`'s list by §G.3a and the
round-13 promise lets prose run under the band), and the gates line carrying **six** items where
§G.3a's wireframe draws five (`tanya-band-1440-light.png` — the count is COPY §2.3's and the copy
wins).

---

## Verdict

**CHANGES REQUESTED**

**Thirty of thirty run-B items are closed**, and most of them are closed on the number as well as on
the render. The three blockers are gone by rule rather than by case: the plate's wrapper on `/` is
`.plate-span__after-floor`, its top edge is **exactly** the floor section's bottom edge at 360, 390,
768, 1024 and 1440 (1927.6 / 1906.6 / 1661.7 / 1512.7 / 1800.8, `wrapTop === floorBottom` at all
five), and it contains neither the floor nor the card slot at any width. `/contact/` carries no plate
at any width. And across 4,756 scroll positions on eight routes at eight widths, **not one mark on
§B.10's own list is touched by the plate anywhere on the site** — no stage node, no figure, no
figure label, no nameplate, no gates line, no card date, no printed address, no CTA, no lit map cell.

Everything else that was measured is right. Six palettes to the hex. One grid everywhere. The room
reads forwards. The chair reads as a chair. The selected desk can be seen. The axis fills its own
block. The map's staircase is legible in light. Motive lands on three layers with two ticks on one
baseline. The quotes are quotations again. Print is right from a dark-seeded context, and the map's
three states survive with every fill suppressed.

It is not approved, and it is two things, both of them at the widths that carry the traffic and both
of them mine.

**N1 — at 360 and 390 the plate strikes through three of the map's product names on `/sahib/`.**
`plate-over-map-360-light.png` renders `Design-components library acr` over `Driver`. §F.1's own lead
sentence on that page is *"A filled cell means a product we can name"*; the name is the diagram's
payload and losing part of it loses the claim. The selector is simply not on `qa:plate`'s list, which
is why every gate passed.

**N2 — the card slot's reservation is a border-box number and its cards need 48px more, so opening a
card moves the page.** At 1024 the floor section grows **905.8 → 944.5** and the document **5758 →
5797**; at 768, 35.3px; at **360, 57px**. §C.6's `min-height` exists precisely so the panel does not
resize, and §B.10 reserve 2's stated purpose is that it "stops any CLS". Run B's item H6 asked for
416 at 1024 and got exactly 416 — the item is closed and the defect it was raised to remove is not,
because run B's own arithmetic (mine) compared card *content* to a *border-box* number and never
added the padding back.

Neither is a violation of a rule as that rule is written, which is why this is CHANGES REQUESTED and
not BLOCKED. Both are cheap: N1 is a composition, the same instrument §B.8's figures and §G.3a's
gates block already used; N2 is four numbers.

---

## The thirty run-B items, verified

| # | Run B item | Closed | Evidence |
|---|---|---|---|
| **B1 / H1** | The plate strikes through `1,000+` at 768–1022 | **Yes** | Figures stack below 768 and take cols 1–5 of 8 / 1–7 of 12 above. Widest ink is `downloads`: **x 168.8 at 360 and 390** against bands at 232 / 262; **398.4 at 768** against 492; 483 at 1024; 527 at 1440. `home-proof-768-light.png`, `home-360-light-full.png`, `measure-probe.json` → `proof-*` |
| **B2 / H2** | The plate covers the Designer station at 768–1023 | **Yes** | The wrapper is unconditional. `wrapper-*` in `measure-probe.json`: `containsFloor: false` at all five widths, `wrapTop === floorBottom` at all five. No `.floor__scene text` hit at any of 4,756 scroll positions. `floor-1440-light.png`, `plate-sweep.json` |
| **B3 / H3** | The plate strikes the card's `Owns` line at 768 / 1024 / 1440 | **Yes** | `containsSlot: false` at every width. Sahib's card renders `Architecture review, code review, design review, the release cut.` whole. `card-after-click-1440-light.png`, `card-after-click-1024-light.png` |
| **H4** | The room reads its pipeline backwards at ≥ 768 | **Yes** | Across and down at 1440: Spec Writer → Designer · Programmer · Test Engineer → Security Auditor · Reviewer · Release Watcher → Ship approval. `floor-1440-light.png`, `measure-probe.json` → `plates-1440` |
| **H5** | The chair does not read as a chair; its plate sets on the cone < 768 | **Yes** | At the 250ms frame with the cone absent — §C.3's own acceptance test — the object has a seat, a rim, a back and two legs. `chair-1440-light-nocone.png`, `chair-360-dark-nocone.png`. The plate sets on bare `--floor` below the pool at 360. `floor-360-dark.png` |
| **H6** | The 1024 slot reservation is 15px short of its own longest card | **Yes, as written** | `min-height` is **320 / 320 / 264 / 416 / 352** at 360 / 390 / 768 / 1024 / 1440 — §C.6 round 12 exactly — and 416 > Sahib's 406.7 content. `measure-probe.json` → `slotres-*`. **The residual is new item N2.** |
| **H7** | Five stage labels, two alignments | **Yes** | All five `text-align: center` in every form at 768, 1024, 1440 on `/` and at 931, 1024, 1440 on `/work/`. `home-proof-1024-light.png`, `work-track-1440-light.png` |
| **H8** | The strip card is full content width at 768 | **Yes** | No card anywhere exceeds **420** (`offsetWidth`): 320 / 350 / 420 / 358 / 420 on `/`. `home-768-light-full.png` |
| **H9** | The selected fill is built to spec and cannot be seen | **Yes** | Pixel-differenced under `reduce`: **31.6% of the station's pixels changed, max channel delta 174 at 1440**; 6.8% / 110 at 360 — §I.1 round 13's replacement test (≥ 60 on the face, ≥ 100 on the edge) met twice over. Visible at 1:1. `desk-unselected-1440-light.png` against `desk-selected-1440-light.png` |
| **H10** | The proof band at 1024–1439 | **Yes** | One grid, two rows: lead **x 48 → 579.3** (cols 1–7), aside **603.3 → 976** (cols 8–12), track below spanning **48 → 738**, node centres **252 / 352 / 452 / 552 / 652**, last ring 661 against a band at 748. No second content width. `home-proof-1024-light.png` |
| **W1** | The horizontal axis fills 70% of its own band block | **Yes** | The axis takes its block's inner edges: **931 →** track 32–899, nodes 41–622, 24 clear; **1024 →** 48–738, 57–715, 24 clear; **1440 →** 120–1014, 129–1005, 150 clear. `work-track-1440-light.png`, `work-track-931-light.png` |
| **PM1** | Run A's cut is unspent, and there is a better one | **Yes** | The `Build` list is `list-style-type: none`, `padding-left: 0`, separation by space. `pm-build-1440-light.png` |
| **WP1** | The differentiator is a 280px thumbnail in a 1200px row | **Yes** | **384px wide — cols 1–4 exactly at 1440** — inside the section it is evidence for, with COPY §5.2's paragraph in cols 6–10 top-aligned beside it. `wp-diff-1440-light.png`, `wp-diff-768-light.png` |
| **WP2** | The bullet markers on "What's in it" | **Yes** | Seven lines, no markers, no indent. `wp-diff-1440-light.png` |
| **C1** | The plate prints the studio address 300px from itself | **Yes** | `/contact/` carries **no plate** at 360, 390, 768, 930, 931, 1024, 1440 or 1920. Three addresses 3-up in cols 1–9. `contact-routes-1024-light.png`, `plate-sweep.json` |
| **S1** | 5,235px of one fill; `--s-panel` is never a section block | **Yes** | Two full-bleed `--s-panel` (`#E0E2EC`) blocks — the cards section and the background section — neither adjacent to the map. `sahib-1440-light-full.png` |
| **S2** | The map's two-state grammar is 1.13 : 1 in light | **Yes** | `--s-fill` `#868AA0` against `--s-ground` `#EEEFF4`; the staircase is legible at a glance in light, and the lit cell keeps its 2px `--s-ink` border so no state is carried by fill alone. `sahib-map-1440-light.png`, `mapfills-1440-light-1600ms.png` |
| **S3** | The work card at 768 overhangs its own stand | **Yes** | Same cap as H8: 420 at 768 on `/sahib/` and `/tanya/`. `sahib-cards-768-light.png` |
| **S4** | The closing address prints twice | **Yes** | The links row is `Sahib on GitHub · Sahib on LinkedIn`; `sahiboffc@gmail.com` prints once, at the close. `sahib-1440-light-full.png` |
| **S5** | In default print the map's marks lose their state | **Yes** | With every fill suppressed the three states survive on stroke plus size: empty = small thin outline, filled = larger heavy outline, lit = larger with a double stroke. `print-sahib-nobg-map.png` |
| **S6** | The map and the cards arrive with no section line | **Yes** | `What he ships and where` and `The roles behind the map`. `sahib-1440-light-full.png` |
| **T1** | Motive lands on two layers; one tick, floating | **Yes** | Motive is the first mark in all three fields — Android annotation, core card, iOS annotation — and the two ticks leave the core's own boundary at **x 426 and x 1014 at 1440**, **286 and 738 at 1024**, on the platform label's baseline, one baseline shared by all three labels (`top: 36` for all three). `tanya-band-1440-light.png`, `measure-final.json` → `ticks` |
| **T2** | The iOS column is a labelled void | **Yes** | Each field ends at its own content: at 1440 core **1242.3**, Android **830**, iOS **102** in a 1351.9 band; at 1024, 1327.6 / 979.7 / 102 in 1461.3. No field stretched, no rule or fill below content. `tanya-band-1024-light.png` |
| **T3** | Two 2px full-height rules are the loudest marks on her page | **Yes** | `border-left-width: 0px` on both edges at 1024 and 1440; 2px kept at 360, 390 and 768 where §G.3 asks for it. `tanya-band-1440-dark.png`, `tanya-band-360-light.png` |
| **T4** | The core's measure is 31 characters at 1024 | **Yes** | Core x **286 → 738** at 1024, body **388px at 16px — ~47 characters over 15 lines** (was 245 / 31 / 24). 524px at 1440. `tanya-band-1024-light.png` |
| **T5** | The quotes lost their marks and kept the pull-quote rule | **Yes** | Both quotes print inside their quotation marks, `border-left-width: 0px`, attribution `font-style: normal` in Instrument Sans Variable. `tanya-quotes-1440-light.png`, `print-tanya-p1.png` |
| **T6** | "The core draws" is a single wipe | **Yes** | At 300ms the core is drawn to y≈490 while the Android edge has reached y≈120 and the iOS edge is not yet visible. The dependency order is visible. `coredraws-1440-light-300ms.png` against `coredraws-1440-light-1300ms.png` |
| **T7** | The plate takes her `Owns` line at 768 | **Yes** | One gate per line, six lines, ink ending **x 207.2 at 360 and 390**, **219.2 at 768**, against bands at 232 / 262 / 492. `plate-over-android-note-360-light.png` (same frame), `measure-probe.json` → `gates-*` |
| **E1** | There is no empty room on `/404` | **Yes** | The floor slab and the lamp, no desks, no chair. `404-1440-light-full.png`, `empty-room-360-dark.png` |
| **E2** | §J's cut is unspent, and it is the clearest of the eight | **Yes** | The footer is the studio line, the location line, the address, the employer note and the rights line. No nav repeat, no `Elsewhere`. Header nav kept. `404-1440-light-full.png` |

**Thirty of thirty.** Two (H6, T2) are closed on the rule they were disposed under and carry a
residual noted below or above; nothing is re-opened.

---

## New items

### N1. `/sahib/` at 360 and 390 — the plate strikes through the map's product names. §B.10 reserve 1, §F.1, §F.4b
`plate-over-map-360-light.png` (opened), `plate-over-map-390-dark.png` (opened),
`sahib-map-360-light.png`, `plate-sweep.json` → `sahib/360`, `sahib/390`

Measured ink right edges on the row strips against a band at **232** (360) and **262** (390):

| Line | 360 | 390 |
|---|---|---|
| `Design-components library across Fleet and Driver` | **319.3** | **319.3** |
| `Tickertape Flutter for iOS, Android migrated` | **317.8** | **317.8** |
| `Motive Fleet and Driver apps; Views to Compose` | **279.6** | **345.3** |

Rendered at 360 the reader gets `Design-components library acr` and then `Driver`. At 768 the same
lines are clear (widest ink 373.3 against 492), so this is a sub-768 composition problem only.

`.map__cell-product` is not on `qa:plate`'s list and is not named by any exemption. It is not prose in
a container in the sense §G.3a used to take `.edge__note` off the list: at ≤ 390 the strip **is** the
map, and §F.1's lead sentence tells the reader in terms that the filled cell's payload is a name.
**I rule the strip's product line a load-bearing mark below 768** — a mark read as a unit, whose
meaning is lost when part of it is hidden — which makes this an item against the rule as written, not
a new rule.

The fix is the same instrument §B.8 used for the figures and §G.3a for the gates: **the product line
gets its own break before the band.** Set the strip's product line to a measure of
`100vw − 128 − 20` below 768 — it is the field's content, not a diagram with a fixed minimum extent,
so it may narrow — or give the label and the name their own rows. No lane, no `padding-right`, no
second content width. `.map__cell-product` should join `qa:plate`'s mark list at the same time so it
cannot come back quietly.

### N2. The card slot's reservation is short by its own padding, so opening a card moves the page. §C.6, §B.10 reserve 2
`slot-default-1024-light.png` against `slot-longest-1024-light.png` (both opened),
`measure-probe.json` → `slotres-*`

`min-height` is a border-box number and the slot carries 24px of padding top and bottom, so the
reservation available to a card is `min-height − 48`:

| Width | `min-height` | Reserved for content | Tallest card | Section grows |
|---|---|---|---|---|
| 360 | 320 | 272 | **329.0** (Sahib) | **905 → 1342, +57.0** |
| 390 | 320 | 272 | 303.1 | +31.1 |
| 768 | 264 | 216 | 251.3 (Tanya) | **1137.8 → 1173.1, +35.3** |
| 1024 | 416 | 368 | **406.7** (Sahib) | **905.8 → 944.5, +38.7** |
| 1440 | 352 | 304 | 339.2 | 0 — the scene is taller and absorbs it |

At 1440 nothing moves. At 1024, 768 and 360 the whole floor section and everything under it steps
down when the visitor opens a human's card, and at 360 that is 57px under the reader's own thumb.
Lighthouse does not see it because an input-initiated shift inside 500ms is excluded from CLS, which
is exactly why it needed a rendered review.

§C.6's rule is *"the fix is the copy or the padding — never a shorter reservation"*, and the
arithmetic to correct is mine. **Re-derive as tallest content + 48 + slack: 384 / 304 / 464 / 392**
at 360–390 / 768 / 1024 / 1440. The 384 covers 377 at 360 and 351 at 390 in one number, so the 360
row still serves both.

### N3. `/`'s proof axis starts 204px inside its own row at 1024. §B.9, §E.3, run B's own 1024 ruling
`home-proof-1024-light.png` (opened), `measure-probe.json` → `proof-1024`

Row 2 of the proof band runs **x 48 → 738**. The axis's first node centre is at **252** and its last
at 652, so the track sits 204px inside its block's left edge and stops 86px short of its right — a
400px diagram in a 690px row. This is the fault run B item W1 raised about 48px on `/work/`, at four
times the size, and it is not the Engineer's: **run B's 1024 ruling asked for both "the axis takes
col 1's left edge" and "five node centres at a 100px pitch anchored so the last node lands at x 652",
and five nodes at 100px ending at 652 begin at 252.** Both sentences cannot hold. The build took the
testable one, which is the right call.

Resolve it the way §E.2 resolved the same question for `/work/`: **anchor the first node at the
row's own left edge and let the pitch fall out** — `(652 − 57) / 4 = 148.75`, which is wider than the
100px pitch the two-line `Submitted for review` reservation needs and therefore free. The band's
clearance is unchanged because the last node does not move.

### N4. `/tanya/` — the plate covers the `iOS` platform label at 1024 and 1440. §G.3a, §I.1 row 2
`plate-over-ios-label-1024-light.png` (opened), `plate-sweep.json` → `tanya/1024`, `tanya/1440`

At 1024 the iOS field runs x 762 → 976 and the label `iOS` ends at **799.2** against a band at 748;
at 1440 the field's annotation `Motive Fleet App` ends at **1171.9** against 1164. At the plate's
rest row the band's label line reads `Android` · `Shared core` · *(covered)*.

§G.3a exempts the iOS field in terms — "prose in a container, which §B.10 exempts" — and that
exemption is why `.edge__note` came off the mark list. But §I.1 round 13 then made the platform label
the thing a tick *attaches to*: "a tick is the point at which a platform layer attaches to the core.
It attaches to the layer's **name**." A name that anchors a structural mark is not a caption, and
§G.3a's own promise that "no load-bearing mark on this page goes right of col 9 at any width" is
about to be untrue of one under its own later rule. The two sentences are both mine and they were
written a round apart.

This is the smallest of the four and it does not need to close before ship. It closes either by
moving the three platform labels into the band's own header row inside cols 1–9 — which round 13
already floated as the alternative to the tick taking the label's row — or by ruling explicitly that
a platform label is a caption and letting the exemption stand. It should not be left implicit.

---

## §J — "remove one thing", the state per route

| Route | §J's round-12 row | State | Evidence |
|---|---|---|---|
| `/` | **The floor's seam grid** | **UNSPENT** | `.fl-seam` renders, `stroke: rgba(232,237,233,.22)`. At 1920 the grid runs a full module past the occupied plan on every side, which is §J's own second reason for the cut. `floor-1920-dark.png`, `floor-1440-light.png` |
| `/work/` | The store link on the index row | **Spent** | The index rows carry `Read the case study` and `See what's in build` and nothing else. `work-track-1440-light.png` |
| `/work/pocket-manager/` | The bulleted list in `Build` | **Spent** | Markers and indent gone; separation by space. `pm-build-1440-light.png` |
| `/work/wedding-planner/` | The bullet markers on "What's in it" | **Spent** | Seven lines, no glyphs, no indent. `wp-diff-1440-light.png` |
| `/contact/` | The split header | **Spent** | One header line — headline and intro in one column, cols 10–12 the page's one §B.9 void. `contact-routes-1024-light.png` |
| `/sahib/` | The duplicated email in the closing links row | **Spent** | Links row is GitHub · LinkedIn; the address prints once. `sahib-1440-light-full.png` |
| `/tanya/` | The intro's second paragraph | **Spent** | The intro is the role line, one paragraph and her address. `tanya-1440-light-full.png` |
| `/404` | The footer's nav repeat and the `Elsewhere` block | **Spent** | Footer is studio line, location, address, employer note, rights line. `404-1440-light-full.png` |
| everywhere | The noise texture on the work-card surface | **Spent** | `.card` and its pseudo-elements carry `background-image: none`; the object is base, edge and tilt. `sahib-cards-1440-light.png` |
| everywhere | The toggle's 28 × 28 plate (contingent) | Not called | The toggle is exempt; its plate is only spendable if the row has to pay, and it does not. |

**Nine of ten rows spent. `/`'s is the one that is not**, and it is the site's front page. §J put the
seam grid first in §C.10's own weight order and gave it a second reason; both still hold at 1920,
where the room's footprint reads a module larger than anything standing in it. It should be cut
before ship, and it costs bytes rather than meaning.

---

## Passed

- **The plate never touches a mark on its own list, anywhere.** 8 routes × 8 widths × every 40px of
  scroll — **4,756 positions** — against the *ink* of `.card__years`, `.work-card__years`,
  `.track__node`, `.full-track__node`, `.full-track__label`, `.routes__address a`, `.lamp-address`,
  `.close__address`, `.button`, `.map__cell[data-lamp][data-filled]`, `.figures__figure`,
  `.figures__label`, `.floor__scene text` and `.core__gates-line`. **Zero hits.** §B.10.
  `plate-sweep.json`
- **The wrapper is unconditional and it is exact.** On `/` the plate's containing block begins on the
  floor section's bottom edge to the tenth of a pixel at every width, and contains neither the scene
  nor the slot. `/contact/` has no plate at all. §B.10. `measure-probe.json` → `wrapper-*`
- **Six palettes to the hex, on every route in both schemes.** Studio light `#F1F3F0 / #0F2A2E /
  #F2A93B` with `--chalk #E8EDE9` and `--band #E2E6E1`; Sahib light `#EEEFF4 / #1A2033 / #E0E2EC`
  plus round 12's new `--s-fill #868AA0`; Tanya dark `#191B1B / #E9EAEA / #282B2B / #F2A93B`. No
  drift. §B.2, §B.2a, §F.4, §F.4a, §F.4b, §G.1, §G.1a. `measure-final.json`
- **One grid, every section, every route, every width.** Content 320 / 350 / 704 / 928 / 1200 with
  margins 20 / 20 / 32 / 48 / 60; no `padding-right`, no reserved band, no second content width, no
  keep-out lane. §B.5. `measure-final.json`
- **§C.11 pointer acceptance: 10 of 10 stations at 360, 390, 768, 1024, 1440 and 1920, in both
  schemes** — `elementFromPoint` at each button's centre returns that station, and a real click puts
  that station's card in the slot. `measure-final.json` → `pointer`, `card-after-click-*.png`
- **"Lights on" is intact, and it is now measured rather than inferred.** From `load`: at 250ms the
  cabins are lit and the far monitors are not, at 1400ms the wave has crossed the room, at 2700ms
  `data-lights` is gone and all three `.fl-cone` elements are at opacity 1 — the cone arrives last
  and alone, after a hold with nothing happening. §H.3.
  `lightson-1440-light-{250,1400,2700}ms.png`, `measure-probe4.json`
- **"The map fills" and "The core draws" both read as sequences.** The map's cells fill and the lamp
  cell arrives last; the core draws ahead of its edges by a visible margin.
  `mapfills-1440-light-{300,1600}ms.png`, `coredraws-1440-light-{300,1300}ms.png`
- **Reduced motion renders the finished frame on all three pages, in both schemes.** Identical to
  each animation's last frame. §C.9, §H.4. `reduced-{home,sahib,tanya}-1440-{light,dark}.png`,
  `home-360-light-reduced.png`, `tanya-1440-dark-reduced.png`
- **Focus is right on every route.** The first three stops on all eight routes are the skip link, the
  wordmark and the first nav item, each with a 3px solid outline at 3px offset in that world's own
  ink, each ≥ 44px tall. On the floor, the station ring is the two-tone construction on the button
  rectangle and it contains the desk, its monitor and its plate. §B.2, §C.8.
  `focus-*-stop{1,2,3}-1440-light.png`, `station-focus-1440-dark.png`
- **The default card is the empty chair's, at every breakpoint in both schemes, with no interaction**,
  and the slot draws no container. §C.6. `slot-default-1024-light.png`, `floor-*-{light,dark}.png`
- **§E.2's 930/931 switch is exact.** Vertical with all five labels at 930; horizontal from 931 with
  the axis on its block's inner edges and 24px clear. `work-track-930-light.png`,
  `work-track-931-light.png`
- **The three build states survive greyscale on all three tracks**, solid out of `◉` and dashed from
  the first future node. §E.1, §E.1a. `work-track-*.png`, `home-proof-*.png`
- **Print is right, and it is right from a dark-seeded context.** Light tokens on the root whatever
  the theme (`#EEEFF4` / `#EDEEEE`); `.grid` and `.person-links` to `display: block`, so both person
  pages print as one column; cards at `transform: none` with no shadow and the 420 cap lifted; plate
  and toggle `display: none`; each page opening with that person's own name and address. §D.8.
  `print-{sahib,tanya}-p1.png`, `print-{sahib,tanya}-screen.png`, `print-{sahib,tanya}.pdf`
- **All seven OG cards are light-scheme, carry COPY.md's strings word for word, and none ends in an
  empty band.** The home card shows the lit room. §B.2a. `dist-final/og/*.png`, all seven opened
- **The dark floor band keeps its full-bleed inversion and the boundary reads**, because the region
  carries the only lit surfaces on the page — §I open question 4, closed on render again at 1440 and
  1920. `home-1440-dark-full.png`, `floor-1920-dark.png`
- **No template chrome anywhere on the site.** No eyebrow, no middle-dot meta string, no arrow glyph,
  no gradient wash, no monospace label, no rounded card kit, no outlined container, no accented word
  in a headline, one numbered sequence on the site, no bulleted list left with a glyph. §9.4.
- **Neither person page is softer, rounder, paler or more decorative than the other.** Same two
  families, same card object, same numeral treatment, no hue on hers that his does not have and none
  on his that hers does not; in dark hers is the stricter of the two. Brief §9.3's stereotype trap is
  cleanly avoided in design *and*, now, in render — see the packet.

---

## Seen

`docs/reviews/final/` — **266 PNGs, 4 print PDFs and 6 measurement files.** (`audit/` and `qa/` in
the same folder are the Auditor's and QA's and are not mine.)

**Opened by eye, 43 site frames plus all seven OG cards**, chosen to cover every family, both ends of
the range and both schemes:
`home-{1440-light,1440-dark,360-light}-full`; `home-proof-{768,1024}-light`;
`floor-1440-light`, `floor-360-dark`, `floor-1920-dark`;
`lightson-1440-light-{250,2400,2700}ms`, `lightson-1440-dark-{1400,2400}ms`;
`chair-{1440-light-nocone,1440-light-lit,360-dark-nocone}`;
`station-focus-1440-dark`, `card-after-click-1440-light`,
`desk-{unselected,selected}-1440-light`, `slot-{default,longest}-1024-light`;
`work-track-{1440,930}-light`; `pm-build-1440-light`; `wp-diff-1440-light`;
`contact-routes-1024-light`; `404-1440-light-full`;
`sahib-1440-light-full`, `sahib-map-360-light`, `mapfills-1440-light-{300,1600}ms`,
`plate-over-map-{360-light,390-dark}`, `print-sahib-nobg-map`;
`tanya-band-{1440,1024,360}-light`, `coredraws-1440-light-300ms`,
`plate-over-android-note-360-light`, `plate-over-ios-label-1024-light`,
`reduced-tanya-1440-light`, `print-tanya-p1`;
and **all seven OG cards** in `dist-final/og/`.

**The remaining PNGs are the other route × width × scheme combinations of the same families.** Their
geometry, ink extents, fills, hit tests, reflow, focus geometry and pixel differences were read
numerically rather than by eye, from `measure-final.json` (80 route × width × scheme readings plus
the tick geometry, the pointer sweep and the slot's per-card heights), `measure-probe.json` (the
wrapper chain, the gates block's per-item ink, the map's sub-768 ink, the slot reservation with every
card forced, `/work/`'s anchors at five widths, the proof band at five widths, the floor's plate
order, both person pages' card widths and section fills, and the quotes' computed style),
`measure-probe2.json` (24 focus stops and the station ring), `measure-probe3.json` (the seam grid, the
`/work/` index links, `/contact/`'s header and `/tanya/`'s intro — the four live §J rows),
`measure-probe4.json` (the "Lights on" phases and the four desk pixel differences) and
`plate-sweep.json` (**4,756 scroll positions across 8 routes × 8 widths**, ink-accurate, on the 14
listed marks and 9 unlisted candidates: 26 hits, **0 of them on a listed mark**).

**Three things were looked at and are deliberately not items.**

1. **The home OG card still crops the chair.** The cone's pool and the chair's base run off the
   card's bottom edge (`og/home.png`). Run B recorded it as worth ten minutes and not worth a round;
   that ruling stands.
2. **`/`'s first stage label pokes 26px into the left page margin at 768.** `Specced` is centred on a
   node at x 32 and its ink starts at x 6 against a content edge at 32 (`home-proof-768-light.png`).
   §E.3 permits the row's ink to overhang the axis by up to half a label and half of `Specced` is
   26px, so this is at the limit of the exemption rather than past it. Worth a look if that section
   is ever reopened; not worth reopening it.
3. **§G.5's own rendered test asks for "three Motive cards" and the build ships one card and two
   annotations.** §I.1 round 13 is what changed it — the tick attaches to the layer's name and "the
   pairing is carried by content" — so the build is right and §G.5's sentence is a round out of date.
   It is named here so the packet can say it plainly rather than have Tanya find it.

---

## What closes this review

N1 and N2. Both are numbers and a line break; neither needs new copy, a new component or a new rule,
and neither touches anything shared. N3 and N4 are recorded for the next spec round and do not gate
the ship. `/`'s §J row — the seam grid — should be cut in the same pass, because §J's whole point is
that it is decided in advance and not relitigated at the end.

The presentation packet for Tanya is in `docs/reviews/tanya-packet.md` and is ready now: every item
§K held it back for — T1, T2, T3, T4 and §D.8's print ruling — is closed, and none of the four new
items changes the structure she is being asked about. N4 is on her page and the packet names it out
loud.
