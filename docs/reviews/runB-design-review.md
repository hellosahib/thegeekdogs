# Build run B — Design Lead review of rendered output

Reviewer: Design Lead (review role). **Reviewed the rendered pages only, never the stylesheet.**
Every screenshot was taken against the frozen copy at
`scratchpad/dist-runB`, served statically and driven with Playwright, so the concurrent work in the
repo cannot have moved under this review.

Routes: `/`, `/work/`, `/work/pocket-manager/`, `/work/wedding-planner/`, `/contact/`, `/sahib/`,
`/tanya/`, `/404.html` — **all eight**, at 360 / 390 / 768 / 1024 / 1440 in both schemes, plus 800 /
850 / 900 / 930 / 931 / 960 / 1000 / 1023 / 1280 for the plate-band sweep and the `/work/`
breakpoint. `/`'s floor additionally at 1920, under `reduce` at 360 and 1440 in both schemes,
"Lights on" at 250 / 1400 / 2400 ms at two widths, a station's focus ring, and the card slot after
Enter and after a real pointer click. `/sahib/`: the map at 360 / 768 / 1024 / 1440 in both schemes,
"The map fills" at 300 and 1600 ms, `reduce`, the cards in both schemes, print as PDF with
backgrounds on and off, rendered. `/tanya/`: the band at the same four widths in both schemes,
"The core draws" at 300 and 1300 ms, the quotes, `reduce`, print. Both product pages: the
screenshots' rendered aspect, the count above the fold, and the layout held with every image
response aborted. The seven OG PNGs in `dist-runB/og/`.

**221 PNGs, 5 print PDFs and 4 measurement files written to `docs/reviews/runB/`** (the Engineer's own
`runB/engineer/` is left as their record and is not re-listed). Geometry, colour, hit-testing and ink
extents are read off the rendered page into `measure-full.json`, `measure-person.json`,
`measure-floor.json` and `measure-routes.json`, not off CSS. See "Seen" for exactly which files were
opened by eye and which were read as measurement.

Deliberate omissions on the Engineer's own list — the sub-768 plate (two `[COPY NEEDED]` strings),
both headshots, font subsetting, fallback-metric matching, §C.4's 6% warm offset, and `/404`'s empty
room — are recorded once each below and are **not** counted against this build as items.

---

## Verdict

**BLOCKED**

The two person pages have landed and they are real pages, not stubs. **Thirteen of thirteen run A
items are closed or substantially closed**, both run A rulings are built to the letter — `/contact/`
runs 3-up inside cols 1–9 with the third address 33px clear of the band at 1024, and `/work/`'s
track is vertical to 930 and horizontal from 931 with 125px of clearance at the tightest width —
and every one of the six palettes matches DESIGN.md to the hex on every route in both schemes.
§C.11's pointer acceptance is **10 of 10 stations at six widths in both schemes**, the floor is lit,
the cabins are occupied, the nameplates are horizontal and no type on the site sets below 13px.
That is a large, clean run.

It is blocked on one thing, seen in three places, and half of it is mine.

**§B.10's composition rule is broken on the two routes that carry the site's argument.** At 768–1022
on `/` the plate strikes through `1,000+` and `downloads` — the install count, which §B.6 principle 2
makes the second-loudest type on the site (`plate-over-figures-900-light.png`). At 768–1023 on `/`
it covers the whole Designer station, artwork and nameplate together
(`plate-over-scene-900-light.png`). And at **768, 1024 and 1440**, with the longest card open in the
floor's slot, it strikes through the card's `Owns` line so that the page says Sahib owns
"architecture review, code review, design review, the releas"
(`plate-over-panel-1024-light.png`). The same fault takes Tanya's `Owns` line at 768
(`plate-over-gates-768-light.png`).

The first two are build failures against the rule as I amended it in run A — a load-bearing mark's
right edge inside the band. The third is mine: §B.10 exempts the card slot from the band **and**
promises in the same section that "the panel's text is never covered — not at rest, not mid-scroll,
at any scroll position, at any width." Both sentences cannot stand. I resolve them in the ruling
below.

Everything else on this list is an item, and the two person pages carry most of them.

---

## Run A items verified

| # | Run A item | Closed |
|---|---|---|
| **B1** | The scene defines `#fl-cone`, `#fl-seat` and the lit desk tops and instantiates none of them | **Yes.** The wide scene carries 10 `<use>`s across `#fl-cabin-s`, `#fl-cabin-t`, `#fl-agent`, `#fl-seat`; `#fl-occ` puts a figure in each cabin; the lamp cone renders over the chair at all six widths in both schemes and the page now matches its own OG card. `floor-1440-{light,dark}.png`, `floor-1920-light.png`, `lightson-1440-2400ms.png` |
| **B2** | `/contact/` — the plate covers the third printed address at 1024 | **Yes.** 3-up inside cols 1–9; `jaintanya999@gmail.com`'s ink ends x **715** at 1024 against a band beginning at 748 (33 clear) and x 930 at 1440 against 1164. `contact-routes-1024-light.png` |
| **B3** | `/work/` — both stage tracks run under the plate 768–922 | **Yes.** Vertical with all five labels to 930; horizontal from 931, axis ending x **580** against a band at **655**. Node pitch scales with the column span (100 / 118.8 / 159.6 at 931 / 1024 / 1440), and `Submitted for review` still sets in two lines with no shift. `work-track-930-light.png`, `work-track-931-light.png` |
| **4** | The future-node stroke is the pre-round-5 `.45` and fails SC 1.4.11 | **Yes.** `--node-future-stroke` renders at alpha `0x99` = **0.60** in light and `0x73` = **0.45** in dark, exactly §E.1/§E.1a. Rendered, future nodes read as hollow discs with a dashed connector on all three tracks. `work-track-1440-light.png`, `home-proof-1440-light.png` |
| **5** | Two components on the whole build use §B.5's twelve columns | **Yes on the four studio routes.** `/work/` splits its headline (cols 1–5) from its intro (7–12); both case studies set each section as a heading rail beside its prose; `/contact/` splits its header and takes cols 1–9. Both person pages are on the grid. §B.9's four home-page voids are its own drawn arrangement and correctly untouched. `work-track-1440-light.png`, `pm-1440-light-full.png` |
| **6** | `/work/` — the full track is a fixed 567px object that never answers the grid | **Substantially.** The axis now takes a column span rather than a max-width, and the plate clearance falls out of the rule instead of an accident. It still fills only ~70% of its `--band` block at 1440 (axis x168–966 in a block ending x1014). Item W1. |
| **7** | `/work/pocket-manager/` — four screenshots above the fold at ≥ 1024 | **Yes.** 2 × 2 from 768 up; **two** above the fold at 768, 1024 and 1440, measured. Aspect 0.4613 against 9:19.5's 0.4615, explicit `width`/`height` on every `<img>`, first eager. `pm-1440-light-full.png`, `measure-routes.json` → `shots-pm-*` |
| **8** | Both product pages carry no fill change from header to footer | **Yes on the product pages** — Problem / Build / Review process / Outcome alternate `--sheet` and `--band`, measured. **Now true of the two person pages instead**: `/sahib/` is 5,235px of one `--s-ground` with `--s-panel` used nowhere as a section block. Item S1. |
| **9** | `/work/wedding-planner/` — one screenshot in a four-column grid | **Half.** The grid is now built for the one shot it has (no collapsed tracks). The composition is not: the differentiator renders as a 280 × 609 thumbnail alone at the far left of a 1200px row, which is the sentence the item ended on. Item WP1. |
| **10** | Home — the proof band's shared label row does not sit on cols 7–12 | **Yes, as ruled.** The row's ink runs x **732 → 1132**, §B.10's axis exactly. The cost is that the three middle labels centre on their nodes while `Specced` and `Live` are edge-aligned. Item H7. |
| **11** | The four non-home OG cards end in an empty 135px `--floor` band | **Yes.** All six non-home cards are the sheet, no band. All seven are light-scheme, all seven strings are COPY.md's verbatim. `og/*.png` |
| **12** | §J's pre-committed cut for `/`: the skewed cabin nameplates | **Yes.** `Sahib Singh` and `Tanya Jain` are horizontal, 15px, `--chalk`, on the near half of their own cabin floor, at §C.3's coordinates, and each sits inside its own button and no other at every width. `floor-1440-light.png` |
| **13** | §J's pre-committed cut for `/work/`: the one-line descriptions | **Yes.** Neither entry prints its one-liner; the name and the track carry the row. `work-track-1440-light.png` |

Thirteen of thirteen. Two (6, 9) are closed on the mechanism and open on the composition; both are
items below rather than re-openings.

---

## Blockers

### B1. `/` — the plate strikes through `1,000+` at every width from 768 to 1022. §B.10, §B.6 principle 2, COPY §2.7
`plate-over-figures-900-light.png`, `plate-over-figures-768-light.png`, `home-proof-1440-light.png`

Measured ink right edges against the band (`100vw − 276`):

| vw | band | `1,000+` ink ends | |
|---|---|---|---|
| 768 | 492 | **573.4** | inside by 81 |
| 850 | 574 | **628.1** | inside by 54 |
| 900 | 624 | **661.4** | inside by 37 |
| 1000 | 724 | **728.1** | inside by 4 |
| 1023 | 747 | 743.4 | clear |
| 1440 | 1164 | 527.0 | clear |

Rendered at 900 the figure reads `1,0` and its label reads `dow`. A number is the one mark on this
site that cannot survive being clipped — §B.6 principle 2 is *a claim gets a number or it gets cut*,
and the install count is one of the three the proof band is built around. This is the same class of
failure run A blocked on, on a mark the amended rule names by kind.

### B2. `/` — the plate covers the whole Designer station, artwork and nameplate, from 768 to 1023. §B.10, §C.3, §C.11
`plate-over-scene-900-light.png`

The floor's SVG nameplates are inside the plate's band at every width in that range: at 900 the band
begins at 624 and `Test Engineer` ends at **718.8**, `Designer` at **701.7**. Rendered at 900 the
plate sits squarely on the Designer desk; the station, its monitor and its label are gone. §B.10's
change three withdraws the plate's wrapper from the floor **below 768 only**, so from 768 to 1023 —
where the wide plan draws at 0.82 scale and the room reaches furthest right — the plate is over the
room. The room is the one bold moment (§9.4) and a station is a mark read as a unit.

### B3. `/` and `/tanya/` — the plate strikes through the `Owns` line, at 768, 1024 **and** 1440. §B.10 reserve 3, §C.6 item 4, §6
`plate-over-panel-1024-light.png` (opened), `plate-over-gates-768-light.png` (opened);
`plate-over-panel-{768,1440}-light.png` captured and measured

With Sahib's card open in the floor's slot and the card scrolled to the plate's rest position, the
covered text at all three widths is, verbatim:

> `Architecture review, code review, design review, the release`

`cut.` is under the plate. The visitor is told he owns "the releas". The same happens to Tanya's
core `Owns` list at 768, where `ASO, release cut.` goes under the plate on her own page.

§B.10 reserve 3 says in terms: *"The floor's card panel takes no plate allowance at all… The
panel's text is never covered — not at rest, not mid-scroll, not at any scroll position, at any
width."* And §C.6 item 4 makes the `Owns` block the answer to *which human checks it*, which §6
forbids splitting from the flex. This is not a build failure against a rule — the build honours
§B.10's other sentence, which exempts the slot from the band as prose. **The two sentences
contradict and I own the contradiction.** Resolution in the ruling below.

---

## `/` — home and the floor

**H1.** *(blocker B1, above)*
**H2.** *(blocker B2, above)*
**H3.** *(blocker B3, above)*

### H4. The room reads its pipeline backwards at every width ≥ 768. §C.3 mechanism 5, §C.2, COPY §2.4
`floor-1440-light.png`, `floor-1024-light.png`, `floor-768-dark.png`, against `lightson-360-1400ms.png`

Measured plate centres in scene units at 1440, against §C.3's own projection `x = 396 + 64(c − r)`:
Security Auditor and Release Watcher at **396**, Spec Writer / Programmer / Reviewer at **524**,
Designer and Test Engineer at **652**. So the two screen rows read left-to-right as **5 · 3 · 2** and
**7 · 6 · 4**. The build renders §C.3's coordinates exactly; the plan itself reverses the order.

§C.3 mechanism 5 claims "work moves back-to-front and **left-to-right**, and it reads in COPY.md
§2.4's order exactly, terminating at the chair". Rendered, a visitor reading the labels across gets
Security Auditor → Programmer → Designer. The DOM, the tab order, the roster sentence and the
portrait plan all run forwards; only the wide plan runs backwards, and the portrait plan at 360
proves it can be got right (`Spec Writer · Designer · Programmer` / `Test Engineer · Security
Auditor · Reviewer` / `Release Watcher`, row-major, correct). Run A saw this and passed it to the
floor review; the floor review did not rule. **It is mine, and I rule it a defect in §C.3's plan,
not in the build.** The fix is the plan: mirror the agent columns so C–F reads left-to-right on
screen, or swap the checkerboard's parity. Nothing else in §C.3 moves.

### H5. The empty chair still does not read as a chair, and at < 768 its nameplate is set on the cone. §C.3 mechanisms 2 and 4, §C.4, §C.1
`lightson-1440-250ms.png`, `floor-360-dark.png`, `floor-360-light.png`

At 250 ms, before the cone comes up, the chair is a lit slab over a small dark box. There is no back,
no legs, no silhouette at any width. The card that opens on it says "This chair stays empty" about an
object nobody can identify as a chair, and §B.12's whole favicon argument is that "the chair is
implied by what the cone points at". Step 3 raised this and it is unchanged.

Second, and new: **at 360 and 390 the plate `Ship approval` is set across the cone**, chalk@72% on
`--lamp` — roughly 1.6 : 1, the least legible text on the page, at the width where 80%+ of the
traffic is. §C.3 is explicit: "text beside the thing, never on it." The portrait plan's rule puts
the plate in the button's top 20 units; the cone rises through that band. The cone or the plate has
to move, and the cone is the mark.

### H6. The card slot's 1024 reservation is 15px short of its own longest card. §C.6
Measured with each card forced visible in the slot: at **1024** the tallest card is **Sahib's at
406.7px** against `min-height: 392px`; Tanya's is 380.8. At 1440 the two humans tie at 339.2 against
344 — 4.8px of slack, not the ~13 §C.6 states. At 768 the tallest is 251.3 against 344, 93px of
over-reservation.

§C.6 computed 392 from *Tanya's* card before design review and the release cut had owners; COPY
§2.3 round 12 put both names on both lists and Sahib's gate line is now the long one. §C.6's own
rule applies: "the fix is the copy or the padding — never a shorter reservation", and PLAN.md §4.3's
assertion should have failed the build. **Raise 1024 to 416** and re-derive 1440 with the same
arithmetic; 768's 344 should come down to 264 rather than reserving 93px of void under a two-line
card.

### H7. The proof band's five stage labels use two alignments. §E.2, §E.3, §B.10
`home-proof-1440-light.png`

Run A item 10's fix works — the row's ink runs 732 → 1132, the axis exactly. The cost is visible:
`Final touches`, `Submitted for review` and the middle nodes are centred on their nodes, while
`Specced` is left-aligned to node 1 and `Live` right-aligned to node 5, so the two end labels sit
half a pitch off the dot they name. In a five-item row, three centred and two edge-aligned reads as a
mistake rather than as a rule. Resolved in the 1024 ruling below: all five centre, and the row's ink
is allowed to overhang the axis, which §B.10 exempts as prose.

### H8. The compressed strip card is the full content width at 768. §D.1, §D.2, §D.5
`home-768-light-full.png`, and the same fault at scale on `sahib-cards-768-light.png`

At 768 a compressed card is **704 × 112** and a full card on `/sahib/` is **710 × 250–330**. Two
things break. The stand is 56% of the card width (§D.2), so a 710px card overhangs its own lip by
~155px each side and reads as a slab balanced on a wedge rather than an object resting on a counter
— the illusion §D.2 says is the whole point. And §D.5's shelf-talker hierarchy needs the date in the
*price position* at the right of a narrow object; at 710px the company and the date sit together at
the left with 500px of white beside them. §D.1's table has a 360 row and a 1024 row and no 768 row,
and the build filled the gap with "full width". **Cap the card at 420 and left-align it in its
column**, at every width where the grid gives more. This is my ruling on the question the Engineer
recorded rather than invented.

### H9. The selected fill is built to spec and cannot be seen. §C.8, §C.7
`desk-selected-1440.png` against `desk-unselected-1440.png`

Pixel-differenced under `reduce` so only the state differs: **13.4% of the desk's pixels change, max
channel delta 27** at 1440, 3.0% at 360 — which is §C.8's 22% → 34% `--chalk` lift over `--floor`,
built exactly. At 1:1 the two frames are indistinguishable. §C.8 says focus is never the only
indicator and §C.7 asks for a persistent selected state "so the panel and the room stay connected",
which matters most at 360 where the panel is below the scene's fold. **The amplitude is my spec's
and it is too small**: take the selected desk top to `--chalk` @ 52%, or give the selected station a
1px `--chalk` top-edge inset, which the room already draws elsewhere.

### H10. The proof band at 1024–1439 — see the ruling.

---

## `/work/`

### W1. The horizontal axis fills 70% of its own band block. §E.2, §B.5, run A item 6
`work-track-1440-light.png`, `work-track-931-light.png`

Node pitch now scales (100 / 118.8 / 159.6 at 931 / 1024 / 1440), which is the mechanism run A asked
for. Rendered at 1440 the label row runs x168 → 966 inside a `--band` block that runs x120 → 1014,
so the axis starts 48 inside its block and stops 48 short of it, and at 930 the vertical track sits
in the left 250px of an 866-wide block. Give the axis the block's own inner edges — anchor at the
block's left padding and end at `min(block right, band − 24)`.

---

## `/work/pocket-manager/`

### PM1. Run A's "remove one thing" is unspent, and there is now a bulleted list to spend instead. §J
`pm-1440-light-full.png`, `shots-pm-1440.png`

Four screenshots still ship. Run A nominated `05-export.png` — "by COPY §4.7's own account, not a
screen at all, a row in settings tagged Beta". The Engineer's note is fair (the two-above-the-fold
fix did not need it), so the nomination is still available and it is still the right one. Second
candidate, and I prefer it: **the seven-item bulleted list in `Build`**. It is one of only two
bulleted lists on the site, §B.2 separates with space, and the four feature lines read faster
without a glyph in front of them.

---

## `/work/wedding-planner/`

### WP1. The differentiator is a 280px thumbnail alone in a 1200px row. §B.11, §J, run A item 9
`wp-1440-light-full.png`, `measure-routes.json` → `shots-wp-*`

The grid is fixed. The composition is not. §J's row for this route says one real screen of the
multi-function view **is** the differentiator; rendered it is the smallest object on a 3,104px page,
at the far left, with 940px of empty sheet beside it and nothing to read there. Either give it the
column it deserves (2× scale, cols 1–4, with §5.2's differentiator paragraph in cols 6–10 beside it)
or let it run full-bleed at the section's own width. Do not leave it at 280.

### WP2. §J's second candidate is unspent: the bullet markers on "What's in it". §J
Run A nominated them. Seven short lines separated by space read faster than seven with a glyph in
front of them, and this is the site's other bulleted list.

---

## `/contact/`

### C1. §J's pre-committed cut is unspent: the plate prints the studio address 300px from itself. §J, §B.10
`contact-routes-1024-light.png`, `contact-1440-light-full.png`

§J's row for this route is "the second call to action. One email, one link, one answer." The page is
three printed addresses and the plate is a fourth printing of the first of them. Run A said I would
write the exception and it is not written yet; I write it in the ruling section below.

Otherwise this page is clean: 3-up in cols 1–9 at ≥ 1024, stacked below, all three addresses in full
as `mailto:` over the visible address, no form, cols 10–12 as the page's one §B.9 void.

---

## `/sahib/`

### S1. 5,235px of one fill, and `--s-panel` is never a section block. §F.4, §B.2, §B.9, run A item 8
`sahib-1440-light-full.png`, `sahib-360-light-full.png`

Measured: every section on `/sahib/` computes `rgba(0,0,0,0)` over the body at every width in both
schemes. §F.4 names `--s-panel` for "the map's field, **section blocks**"; only the map's filled
cells take it. Run A item 8 blocked the two product pages for exactly this and they were fixed; the
fault moved to the longer page. Six sections separated by space alone over 5,235px, with the largest
gaps (390 / 540 / 400px) between the map, the cards and the writing section, reads as an unfinished
page rather than a quiet one. Put the writing section or the background section on `--s-panel`; the
map is the page's one loud thing and the alternation should step around it.

### S2. The map's two-state grammar is a 1.13 : 1 step in light, and reads properly only in dark. §F.1, §F.4a
`sahib-map-1440-light.png` against `sahib-map-1440-dark.png`; pixels sampled off the rendered PNG

Sampled: filled cells `#E0E2EC`, empty cells `#EEEFF4`, lit cell `#F2A93B` with a 2px `--s-ink`
border — §F.1 and §F.4a exactly, and honestly built. But §F.1's argument is that "the takeaway is
the **shape** of the filled region… a staircase descending right to left", and at 1.13 : 1 that
shape is at the edge of perception in light; the product names do the work and the diagram reads as
a table. In dark the same map is immediately legible as a shape, which is §F.4's own case for the
dark ground made against its light counterpart. **At 360 the row strips solve it** — five marks per
row, ink / empty / lamp — and the shape reads better at 360 than at 1440
(`sahib-map-360-light.png`). Either bring the light filled cell down a step, or give the light map
the same mark discipline the strips already have.

### S3. The work card at 768 is 710px wide and overhangs its own stand. §D.1, §D.2, §D.5
`sahib-cards-768-light.png` — see item H8, which is the same ruling and covers both pages.

### S4. The closing address prints twice, 40px apart. §B.10, COPY §6.5, §J
`sahib-1440-light-full.png`

The page closes with a links row containing `Sahib on GitHub · Sahib on LinkedIn ·
sahiboffc@gmail.com` and then, immediately under it, `sahiboffc@gmail.com` again at display size with
a rule under it. COPY §6.5 writes one email link. This is **`/sahib/`'s "remove one thing"**: drop
the address from the links row and keep the closing one.

### S5. In default print the map's marks lose their state. §D.8, §E.1's greyscale discipline
`print-sahib-nobg-p1.png` against `print-sahib-p1.png`

§D.8's light-token rule works and the whole class of failure it exists to remove is gone — a page
read in dark prints in light tokens, cards flatten to `transform: none` on solid white with no
shadow and no padding, the plate and the toggle are `display: none`, and the floor is omitted on `/`.
That is a clean pass.

But with the browser's own print-background suppression on — the default — the map's five-mark row
strips lose their fill: empty marks vanish entirely, filled marks become a thin outline, and the lit
mark becomes an amber outline at **1.87 : 1 on white**. The state is carried by fill alone, which is
exactly what §E.1 refuses to do for the stage indicator and for the same reason. Give the marks the
stage indicator's discipline (a stroke plus a size difference) or set `print-color-adjust: exact` on
the strip.

### S6. The map arrives with no section line, and so do the cards. §F.7, §F.8, COPY gap
Rendered, `/sahib/` has three headings: the h1, `He writes it down` and `Background`. §F.7 and §F.8
both draw `Where he has shipped` above the map and `Seven years, four companies` above the cards.
The Engineer is right that COPY.md writes neither string, so this is a **copy gap, not a build
fault** — recorded here so the Copywriter gets it: two display-section lines, ≤ 5 words each.

---

## `/tanya/`

### T1. Motive lands on two layers, not three, and there is one tick, not two. §G.3, §G.5
`tanya-band-1440-light.png`, `tanya-band-1024-light.png`, `tanya-band-360-light.png`

§G.3's headline argument is drawn as a heading in the wireframe: **ONE COMPANY, THREE LAYERS**, with
"a 2px `--t-ink` tick running out of the core's card into the edge column" on each side, and "the two
ticks out of the core **are** the KMP shape, drawn."

Rendered: the core holds the Motive card; the iOS edge holds a label, one 20px dash and the three
words `Motive Fleet App`; and the **Android edge holds HSBC and Naskay and no Motive at all.** The
Jetpack Compose migration — the Android-only half of the same job, which §G.3 names as the Android
edge's first content and §G.4's practice table lists at row 2 — is printed inside the core card's
small print instead. So Motive appears on two layers, one tick exists, and the tick is a floating
dash 60px above and 300px right of the card it is supposed to leave. **The page's central claim is
half built.** This is the item to fix first on this page and it is not a copy problem: the string is
already on the card.

### T2. The iOS column is a labelled void, 180 × 1450 at 1440 and 135 × 1705 at 1024. §G.3, §G.5, §9.4
`tanya-band-1440-light.png`, `tanya-band-1024-light.png`, `tanya-band-1440-dark.png`

Measured at 1440: Android edge x120–402 (cards end y675, then 775px of nothing), core x426–810, iOS
edge x834–1014 carrying three words at the top and then **1,395px of nothing**. At 1024 the band is
1,705px tall and roughly 60% of its area is empty. §G.3's own words for what item 46 bought are that
it "fills the iOS column with a named product **rather than with structure alone**"; rendered it is
structure with a caption in it, which is the condition §G.5 says was closed.

### T3. Two 2px full-height rules are the loudest marks on her page. §9.4, §B.2, §B.6 principle 4
`tanya-band-1440-dark.png`

Both edge columns take a 2px `--t-ink` left rule running the **full 1,450px height of the band**, top
to bottom, on both sides. In dark those two rules are near-white and are the brightest things on the
page — brighter than her text. §9.4 bans the broadsheet hairline by name, §B.2 says structural
separation is done with fill and space and never with rules, and §B.6 principle 4 says the site never
has two loud things at once. §G.3 asks for a rule on the **edge blocks at 360**, where depth replaces
horizontal position and the rule is doing real work; at ≥ 1024 the three columns are already
separated by the core's fill and by indentation, and the rules are drawing a box around emptiness.
Cut them at ≥ 1024, or run them only to the last card in their column.

### T4. The core's measure is 31 characters at 1024. §B.4, §G.1
Measured: `core__body` is **245px at 16px = ~31 ch over 24 lines** at 1024, and 336px = ~41 ch over 18
lines at 1440. §B.4 caps body at 62 ch and states no floor because none was needed; 31 ch over 24
lines is a newspaper column, and §C.6 treats ~29 ch as the narrowest tolerable measure for a *card*.
This follows from the Engineer's cols 4–7 allocation (§G.3 draws the core at cols 4–9), which
follows from the same 1024 arithmetic as the proof band. The ruling below moves it.

### T5. The quotes lost their quotation marks and kept the pull-quote rule. COPY §7.1, §9.4
`tanya-quotes-1440-light.png`, `tanya-quotes-360-light.png`

COPY §7.1 supplies both quotes inside typographic quotation marks and adds a note addressed to me:
"the two quotes are short and load-bearing… **they must read as quotation, not as pull-quote
decoration**." Rendered, the marks are dropped, the text sets at body size in `--t-ink`, and the only
cue is a left rule — which is the pull-quote convention. `always looking for ways to improve
developer productivity` opens lower-case with nothing to say it is someone else's sentence. The
instruction is inverted exactly. Print the marks; the rule can go.

Two smaller notes on the same block: the attribution sets in synthesised oblique (Instrument Sans
ships no italic), and the section occupies cols 4–9 in a 619px-tall band that is ~70% empty.

### T6. "The core draws" is a single wipe, so the dependency order is not visible. §H.3, §H.1
`tanya-coredraws-300ms.png`

At 300ms the core **and both edge columns** are clipped at the same y. §H.3's claim is that "each edge
column's content becomes visible only as the core passes its row… the edges cannot appear before the
core does, which is the architectural claim made as choreography." With zero lag between core and
edge the claim is technically true and visually absent, and what a visitor sees is a reveal wipe —
the generic move §H.1 removes from the rest of the site by banning scroll-driven effects. Give the
edges a 120ms lag behind the core's boundary and the architecture becomes visible. It is one delay.

### T7. The plate takes her `Owns` line at 768. — blocker B3.

---

## `/404`

### E1. There is no empty room. §B.11
`404-1440-light-full.png`, `404-360-dark-full.png`

§B.11 gives `/404` "the floor slab and the lamp, no desks, no chair", reusing the floor's own slab
symbol and lamp gradient for "roughly zero new bytes", and calls it "the one joke the site gets, and
a joke that is also the argument". The page is a headline, a link, the plate and the site chrome. The
Engineer recorded this rather than fixing it because it was outside run B's scope; run A did not
review `/404`. **It is now reviewed and it is an item.**

### E2. §J's cut is unspent, and it is the clearest of the eight. §J
§J's row: "Everything except the line and the link home. The empty room is the joke; **a nav menu
underneath it is not.**" Rendered, the page carries the full header nav (four links plus the toggle)
and the full footer — studio line, location line, address, a four-item nav repeat, an `Elsewhere`
block with four outbound links, the employer note and the rights line. A 1,120px page of which 615px
is footer. The header nav can stay (it is site chrome on every route); **the footer's nav repeat and
the `Elsewhere` block are the menu §J names and they should not print here.**

---

## The ruling on §B.9's proof split at 1024

The Engineer flagged this and the flag is correct. The arithmetic in `docs/scratch/engineer.md` is
right: at 1024 col 7 starts at x524 and the plate's band at 748, leaving 224px for an axis that needs
500 at the 100px pitch that keeps `Submitted for review` on two lines; shrinking the pitch to 56 is
the three-line label defect step 2 raised and this build closed. Splitting at cols 7–12 at 1024 is
refused, and it stays refused.

**But what was built instead is worse than either option, and I am not accepting it.**
`home-proof-1024-light.png`: the band stacks to prose in cols 1–5 with the track beneath it in the
same half, the three figures cross the full content width on their own row, and **the right 46% of a
918px-tall section is empty from its top edge to its bottom.** That is two content widths in one
block, the void §B.9 permits exactly once and spends in the hero, and the shape run A item 5 was
written about. The same allocation is what squeezes Tanya's core to 31 characters (item T4).

> **Ruled. §B.5's "the split forms engage at 1024" holds for §C.6's card slot and for the gates'
> anchored closing line, and it does **not** hold for a two-column arrangement whose second column is
> a diagram with a fixed minimum extent. The proof band and Tanya's three-field band are both of
> that kind. They engage where their diagram fits and are one grid, two rows, below it.**

What the Engineer should build:

**1. `/`, the proof band, 1024–1439 — one grid, two rows, no second content width.**
- *Row 1.* §2.7's headline, paragraph 1, the three figures and the two links in **cols 1–7**
  (a 62ch measure at 1024, against the current 5-column 505px). §2.8's caption `One shipped, one
  nearly there.` and its note in **cols 8–12**, top-aligned. The void is filled by prose, which
  §B.10's rule exempts, and the figures stop being the only thing that crosses the block.
- *Row 2.* The two-runner shared-axis track spanning **cols 1–9**, full width of the row. The product
  labels sit **above** their runners as §B.9 already draws them, so the axis takes col 1's left edge;
  five node centres at a **100px pitch** anchored so the last node lands at **x 652** at 1024 —
  **96px clear** of the band at 748, measured, and better at every width above. `Submitted for
  review` keeps its two lines and the label row keeps its reserved height.
- *≥ 1440.* Unchanged. §B.9's split as built: axis 732 → 1132, last ring closing at 1141, 23px clear
  of the band at 1164.
- *< 768.* Unchanged: §E.3's one-row-per-product form.

**2. All five stage labels centre on their nodes, in both forms.** The row's ink may overhang the
axis by up to half a label; §B.10 exempts prose and this row is five words, not five marks. This
retires the two-alignment inconsistency run A item 10's fix introduced (item H7) and it is the same
rule at every width.

**3. `/tanya/`, the core band, 1024–1439 — the same instrument.** The band's three fields go back to
§G.3's own allocation with the plate accounted for: **Android cols 1–3, core cols 4–9, iOS cols
10–12** at ≥ 1440, and at 1024–1439 the iOS field leaves the row rather than being crushed into cols
8–9. At 1024 the band is **Android cols 1–3, core cols 4–9** — a 690px core, a 62ch measure, item T4
closed — with the iOS edge as a **full-width row beneath the core**, carrying its label, the tick and
the Fleet App annotation on one line inside cols 1–9. The core stays the widest field and the edges
stay narrower and indented, which is §G.3's hierarchy, and no load-bearing mark goes right of col 9.

**4. The card slot keeps its exemption and gains a vertical one.** §B.10 reserve 3's two sentences
contradict (blocker B3) and this is how they resolve: the slot stays exempt from the *horizontal*
band, and the plate's wrapper **does not span the floor section at any width**, not only below 768.
§B.10's change three becomes unconditional. The cost is the plate's absence over the room at ≥ 768,
which is the same trade change three already priced at < 768 and accepted; a contact plate over the
room is the definition of obtrusive at 1440 as much as at 360. This closes B2 and B3 on `/` in one
declaration and needs no new mechanism — it is one containing block.

**5. Blocker B1 and Tanya's `Owns` line are ordinary applications of the rule as written.** The
figures row moves inside cols 1–7 (point 1) and the `Owns` line moves inside cols 4–9 (point 3).
`qa:plate` should add `.figures__figure`, `.figures__label`, the floor's SVG `text` nodes and
`.core__gates-line` to the marks it measures; all four are load-bearing and none of the four was in
the 432.

I will write points 1–4 into §B.5, §B.9, §B.10, §E.3 and §G.3 in the next spec round. Build to the
text above in the meantime.

---

## Passed

- **Every token matches DESIGN.md to the hex, on all eight routes, in both schemes.** Studio light
  `#F1F3F0 / #0F2A2E / #F2A93B`, studio dark `#18292D / #E8EDE9`, Sahib light `#EEEFF4 / #1A2033`,
  Sahib dark `#161C2E / #E9EAF0`, Tanya light `#EDEEEE / #1B2020 / #8A5A08`, Tanya dark
  `#191B1B / #E9EAEA / #F2A93B`. Six palettes, sixteen route × scheme readings, no drift.
  §B.2, §B.2a, §F.4, §F.4a, §G.1, §G.1a. `measure-full.json`
- **One grid, every section, every route, every width.** Content 320 / 350 / 704 / 928 / 1200 with
  outer margins 20 / 20 / 32 / 48 / 60 on all eight routes; no `padding-right`, no reserved band, no
  second content width. §B.5. `measure-full.json`
- **The room is lit, and it is the only lit region.** Cabin walls, occupants, lit desk tops, shadow
  faces, the seam grid and the amber cone all render, at six widths in both schemes, and in dark the
  lit surfaces read *more* strongly against a deeper floor exactly as §B.2a argues. §B.1, §B.2a,
  §C.1. `floor-{360,390,768,1024,1440,1920}-{light,dark}.png`
- **§I open question 4, answered.** The dark floor band does keep its full-bleed inversion and the
  1.21 : 1 boundary reads — because the region carries the only lit surfaces on the page, which is
  what §B.2a predicted. Rendered at 360 and at 1440. `home-1440-dark-full.png`,
  `plate-over-scene-900-light.png`. Close the question.
- **§C.11 pointer acceptance: 10 of 10 stations, six widths, both schemes** — `elementFromPoint` at
  each button's centre returns that station, and a real mouse click puts that station's card in the
  slot. Hover, focus and tap land identically in the same place. §C.6, §C.7, §C.11, §B.6 principle 3.
  `card-after-click-1440-light.png`
- **The default card is the empty chair's, at every breakpoint in both schemes, with no
  interaction.** §C.6. `floor-*-{light,dark}.png`
- **The focus ring is the two-tone construction on the button rectangle** — 3px `--chalk` outer, 2px
  `--lamp` inner, 3px offset — and the ring contains the desk, its monitor and its plate. The agent
  card's `Checked by` sub-block renders with its 16 / 1px rule / 16 and the correct gate string.
  §B.2, §C.6, §C.8. `station-focus-1440-dark.png`
- **The nameplates are horizontal, 15px for cabins and 13px for agents, each inside its own button
  and inside no other, at every width.** No type anywhere on the site sets below 13px. §B.4, §C.3,
  §C.4, §J. `floor-1440-light.png`, `measure-floor.json`
- **"Lights on" is intact.** Two cabins, then seven agents in DOM order; room full at ~1.4s; a
  perceptible hold with nothing happening; then the cone alone. §H.3.
  `lightson-{360,1440}-{250,1400,2400}ms.png`
- **Reduced motion renders the finished frame on every page.** The floor's still state, the map fully
  filled with the lamp column, the core fully drawn — each identical to its animation's last frame,
  at 360 and 1440 in both schemes. §C.9, §H.4. `floor-*-reduced.png`, `sahib-map-*-reduced.png`,
  `tanya-band-*-reduced.png`
- **The three build states survive greyscale in both schemes on all three tracks**, with the future
  stroke now at `.60` light / `.45` dark, solid out of `◉` and dashes from the first future node.
  §E.1, §E.1a. `work-track-*.png`, `home-proof-*.png`
- **§E.2's 930/931 switch is exact.** Vertical with all five labels to 930; horizontal from 931 with
  the axis 75px clear. `work-track-{930,931}-{light,dark}.png`
- **The screenshots hold their layout with every image response aborted** — identical dimensions and
  identical document heights on both product pages; two above the fold on `/work/pocket-manager/` at
  every width ≥ 768; the wedding planner's single shot laid out for one. §B.11.
  `measure-routes.json` → `shots-*`, `shots-*-lazypending.png`
- **Print is right, and it is right from a dark-seeded context.** Light tokens on the root whatever
  the theme; cards at `transform: none`, solid white, no shadow, no stand, no padding; plate and
  toggle `display: none`; the floor omitted on `/`; each person page opening with that person's own
  name and address. §D.8. `print-{sahib,tanya}-p1.png`, `print-{sahib,tanya}-screen.png`
- **All seven OG cards are light-scheme, carry COPY.md's strings word for word, and none ends in an
  empty band.** The home card shows the lit room. §B.2a. `dist-runB/og/*.png`
- **The full nav ships on every route** — four labels plus the toggle, one row at ≥ 768 and a second
  44px row at 360, the toggle last and right-aligned, the footer repeat on every page. The toggle's
  glyph is the shade alone in light and the shade plus a filled cone in dark, monochrome in every
  world. §B.8, §B.10a. `404-360-dark-full.png`
- **The work-card strip carries two cards per person at every width, two fields each, with both row
  links.** Years only on every date on the strip and on both person pages. §B.8, COPY §2.9a.
- **No template chrome anywhere on the two new routes.** No eyebrow, no middle-dot meta string, no
  arrow glyph, no gradient wash, no monospace label, no rounded card kit, no outlined container, no
  accented word in a headline, one numbered sequence on the site. §9.4.
- **Neither person page is softer, rounder, paler or more decorative than the other.** Same two
  families, same card object, same numeral treatment, no hue on hers that his does not have and none
  on his that hers does not. Brief §9.3's stereotype trap is cleanly avoided. See the equality note
  under the packet below.

---

## Seen

`docs/reviews/runB/` — **221 PNGs and 5 print PDFs**, plus the seven PNGs in `dist-runB/og/`.

**Opened by eye, 59 files**, chosen to cover every family in both schemes and at both ends of the
range: `floor-{360,768,1024,1440,1920}-light`, `floor-{360,768,1440}-dark`,
`floor-1440-light-reduced`; `lightson-1440-{250,2400}ms`, `lightson-360-1400ms`;
`station-focus-1440-dark`, `card-after-click-1440-light`, `desk-{selected,unselected}-1440`;
`plate-over-{slot-1440-light, slot-768-light, scene-900-light, figures-900-light, gates-768-light, panel-1024-light}`;
`home-{360-light,768-light,1440-dark}-full`, `home-proof-{1024,1440}-light`;
`sahib-1440-light-full`, `sahib-map-{360-light,1440-light,1440-dark}`, `sahib-cards-768-light`,
`sahib-mapfills-300ms`; `tanya-1440-light-full`, `tanya-band-{360,1024,1440}-light`,
`tanya-band-1440-dark`, `tanya-quotes-{360,1440}-light`, `tanya-coredraws-300ms`;
`work-track-{930,931,1440}-light`; `contact-routes-{360,1024}-light`; `pm-1440-light-full`,
`wp-1440-light-full`; `404-1440-light-full`, `404-360-dark-full`;
`print-{sahib,tanya}-p1`, `print-sahib-nobg-p1`; and all seven OG cards.

**The remaining 162 PNGs are the other route × width × scheme combinations of the same families**, and
the two print PDFs rendered from them.
Their geometry, fills, ink extents, hit tests and type sizes were read numerically rather than by
eye, from `measure-full.json` (80 route × width × scheme readings: document height, shell box and
padding, plate box and text, section fills, h1 line counts, world tokens), `measure-person.json` (60
readings: the map's cells and lit cell, the core and both edges, the ticks, the quotes, every card's
box and date ink, every rule), `measure-floor.json` (12 readings: scene box and `viewBox`, every
`<use>`, the slot's box, border, min-height and content, all ten stations, all ten SVG plates with
their size and fill) and `measure-routes.json` (72 plate-band readings across eight routes and nine
widths, plus the track's orientation and node boxes at six widths and the screenshot rows). Every
item and every "passed" line above cites a file that was opened.

Two things were looked at and are **not** items:

1. **The home OG card crops the chair.** The cone's pool and the chair's base run off the card's
   bottom edge. It is the site's front door and it is the only card with a picture in it; worth ten
   minutes at some point, not worth a round.
2. **The six non-home OG cards are now indistinguishable except by string.** Run A offered two fixes
   for the empty band and the Engineer took the one I offered. It is closed as ruled. If a later pass
   wants them to carry something, each page owns a mark that would do it — the map's staircase, the
   core's three columns — and §B.12 rules out only the favicon's cone.

---

## Before ship: remove one thing, per route

| Route | Remove |
|---|---|
| `/` | **The plate over the room.** Not decoration but the honest cut here: making §B.10's change-three wrapper unconditional removes blockers B2 and B3 and takes the one amber rectangle off the one bold moment. §9.4 spends boldness in one place and the plate is currently spending it twice on the same screen. |
| `/work/` | **The 48px of dead margin at each end of the axis** (item W1). Let the track's ends be its block's ends and the diagram stops looking like it was dropped in. |
| `/work/pocket-manager/` | **The bulleted list in `Build`** — one of the site's two bulleted lists, on a page whose four feature lines read faster separated by space. Run A's nomination (the fourth screenshot) remains available and is still right if this one is refused. |
| `/work/wedding-planner/` | **The bullet markers on "What's in it"** — run A's nomination, still unspent, still the cheapest improvement on the page. |
| `/contact/` | **The sticky plate.** §J's row is "the second call to action. One email, one link, one answer." The plate is a fourth printing of `thegeekdogs@gmail.com` on a page whose whole content is three printed addresses. Run A said I would write the exception; it is written above. |
| `/sahib/` | **The duplicated address in the links row** (item S4). §J's own row for this page — the finance-domain annotation down the map's row labels — was never built, so this is the live nomination. |
| `/tanya/` | **The two full-height 2px edge rules at ≥ 1024** (item T3). §J's own row for this page — the platform glyphs — was never built either. The rules are the only broadsheet mark on the site and they are drawing a box around a void. |
| `/404` | **The footer's nav repeat and the `Elsewhere` block** (item E2). §J names this cut by hand and it is still unspent. |

---

## Presentation packet for Tanya

Per brief §9.3, she reviews a finished page and must have the alternative in front of her or she can
only say yes or "something's off". **Show her T1 rendered, in this order: `tanya-band-1440-light.png`
and `tanya-band-1440-dark.png` first — the three-field structure at its best, with the shared core as
a continuous field, the `--lamp-ink` cap and one company in the core — then
`tanya-band-360-light.png`, which is the honest proof that the structure survives collapse as
indentation plus a rule rather than as horizontal position, then `tanya-quotes-1440-light.png` and
`print-tanya-p1.png` so she sees both how her recommendation is quoted and what her page prints as.**
Show `tanya-band-1024-light.png` too and say plainly that the narrow core and the empty iOS column
are the items above and are being fixed, so she is not asked to sign off on a defect. **For T2, put
DESIGN.md §G.4 in front of her in full — the practice-to-node table, the 1440 graph wireframe and the
360 vertical traversal — together with §G.5, which is the argument for T1 over it and names the one
fact that would flip the decision (the floor dropping back to five agent desks).** Alongside those,
give her §9.3 itself and §G.1's paragraph on why her world is the most achromatic surface on the
site, because the one thing she should be asked directly is whether the strictness reads as rigour or
as austerity — and no screenshot answers that for her.

**On equality of ambition (§G.5, brief §9.3).** Hers is the harder layout problem and the design
holds it: three fields collapsing to one column with the meaning intact, against a matrix that
collapses by rotation. Nothing on her page is softer, rounder, paler or more decorative than his, and
in dark hers is the stricter of the two. But **as rendered, at 1024–1439, hers reads as the lesser
page** — a 31-character prose column between two mostly empty gutters, with the iOS field carrying
three words down 1,700px, while his map is a dense diagram naming ten products across nine columns.
Items T1, T2 and T4 and point 3 of the 1024 ruling are what close the gap, and none of them needs new
content: the Compose migration, the Fleet App and the second tick are all already written.
