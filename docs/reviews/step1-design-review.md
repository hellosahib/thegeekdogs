# Step 1 — Design Lead review of rendered output

Reviewer: Design Lead (review role). Reviewed the rendered pages only, at 360 / 390 / 768 / 1024 / 1440,
plus keyboard focus after three Tabs, `prefers-reduced-motion: reduce`, and mid-scroll sticky states at
360 and 1440. Screenshots in `docs/reviews/step1/`. Measurements quoted below are read off the rendered
page (computed geometry), not off the stylesheet.

Deliberate omissions listed by the Engineer (floor, person pages, nav links, footer "Elsewhere" group,
hero secondary button, favicon, OG image, work/contact routes, font subsetting) are not counted against
this build and are not listed as items.

## Verdict

CHANGES REQUESTED

---

## Items

### 1. The sticky plate covers the build-stage track at 1440. §B.10, §E.3
`home-1440-scrollmid.png`. Scrolled to the middle of the page, the 260 × 56 plate sits directly on top of
the Pocket Manager runner's `Live` node — the largest mark on the track and the one the whole component
exists to show — and clips the top of the Wedding planner row and both `Stage:` lines. §B.10 states the
plate "never covers content"; the +56px bottom reserve on `section--reserve` only protects the section's
last line, not content that passes under the plate mid-scroll. The proof section's diagram runs the full
content width to x≈1160, and the plate occupies x 1164–1424, so at ≥768 the two are always on a collision
course. Fix by constraining the diagram (or any section the plate can overlay) to end left of x = viewport
− 276, or by moving the plate off the axis the track occupies. Same class of problem, less severe, at 360:
`home-360-scrollmid.png` and `home-360-focus3tab.png` show the full-width bar covering the tail of gate 1's
body text.

### 2. The two runners do not share one axis. §E.3, §B.6 principle 4
`track-1440-zoom.png`. §E.3's entire mechanism is "two rows share one axis, the eye compares positions".
Measured node centres at 1440: Pocket Manager 333 / 537 / 740 / 944 / 1151; Wedding planner 333 / 539 /
744 / 950 / 1155. Every column after the first is 2–8px out between the two rows, because the 18px current
node is laid out in flow and pushes the nodes after it rightward by the size difference. Visible in the zoom
as the Wedding planner's final hollow node sitting right of the Pocket Manager's `Live` node. Same at 1024
and 768. The five column positions must be fixed by the axis, not by the sum of preceding node widths.

### 3. The stage labels are not aligned to the nodes they name. §E.3
`track-1440-zoom.png`, `home-1024-full.png`, `home-768-full.png`. Measured at 1440, label text centres are
356 / 576 / 744 / 912 / 1147 against node centres 333 / 537 / 740 / 944 / 1151 — drift of +23, +39, +4,
−32, −4. `Building` reads 39px right of its own node and `Submitted for review` 32px left of its own, so
the header row and the runners are two grids rather than one. The first and last cells align only because
they are set `start` and `end`. Centre every label on its node's x, or place labels and nodes in the same
column track.

### 4. The four gates are a 2 × 2 grid, not a hung-numeral list. §B.8, §B.9
`home-1440-full.png`, `home-1024-full.png`, `home-768-full.png`. §B.9's wireframe sets the four gates as
one hung-numeral column in cols 2–7; the render is a two-column grid at ≥768. §B.9's closing paragraph makes
"seven sections, seven families — nothing repeats" the explicit test, and a 2-up grid is the same family the
proof section already uses on this page.

### 5. The closing line is not anchored right at 1440. §B.9
`home-1440-full.png`. "That's the difference between generated software and shipped software." sets flush
left under the grid at display-body size. §B.9 anchors it in cols 9–12, vertically centred to the whole
gate group, at display-section size, and states it is "not a card and not a pull-quote" — the anchoring is
what makes it read as the section's conclusion rather than as a fifth item.

### 6. The numerals are not hung and not two-digit. §B.8, §B.9
`home-360-full.png`, `home-1440-full.png`. Rendered as `1. Architecture review.` with the marker inline in
the bold title. §B.8 specifies the numeral hung in the 20px margin at 360; §B.9 shows `01`–`04`. As rendered
the numbers are list markers rather than the only numbered sequence on the site, which is what §B.8's note
("the ONLY numbered sequence on the site") is protecting.

### 7. No numeral-large treatment anywhere, and nothing is tabular. §B.3, §B.4, §B.6 principle 2
`home-360-full.png`, `home-1440-full.png`. §B.8 line 332 and §B.9 line 528 specify `4.3★ / 24 reviews /
1K+ installs` as a three-across numeral-large block, 24–28px Anek at `wdth` 87.5 with `tabular-nums` and a
micro label under each. The render carries those figures only inside the body paragraph in Instrument 400.
Checked every leaf element on the rendered page: `font-variant-numeral` is `normal` everywhere, and the
`numeral-large` step of §B.4's scale is unused on both pages. Principle 2 makes the numbers the
second-loudest type on the site; right now they are the same size and face as the prose around them.

### 8. Body measure is ~79 characters, not ≤ 62. §B.4
`home-1440-full.png`, `home-1024-full.png`. The hero body's first line at 1440 renders "A two-person mobile
studio. Agents do the volume work. Then a person reviews the" — 79 characters. Measured max-width is
683.8px at 16.56px, i.e. 41.3em; the same 41.3em cap applies at 768 and 1024. §B.4 caps body at 62ch. A
`62ch` cap in CSS measures 62 zero-widths, which in Instrument Sans is roughly 79 average characters —
the cap needs to be expressed in em (≈32em) or the ch value reduced. §B.9 also puts the hero body in
cols 1–6 (588px); it renders at 684px.

### 9. The proof section is not the split band. §B.9, §B.5
`home-1440-full.png`. §B.9 sets this section as a full-bleed `--band` split: headline and prose in cols 1–5,
the compact stage view in cols 7–12. The render puts it on `--sheet` with the prose full width and the
diagram stacked below it across the whole content width. Two consequences: the page's fill alternation is
inverted (rendered sheet → band → sheet → floor; §B.8/§B.9 put the gates on sheet and the proof on band),
and the diagram loses the column it was sized for, which is what puts it under the plate in item 1.

### 10. §2.7 paragraph 2, §2.8's headline/body and §2.8's caption are not on the page. §B.9, COPY §2.7, §2.8
`home-1440-full.png`, `home-360-full.png`. Missing strings: "A second app sits behind it in final touches,
built through the same pipeline and stopped at the same gates. There's no date on it. The list of what's
left is short, and a person decides when it ends." and "One shipped, one nearly there." §B.9 line 530
requires the caption beside the two-product track and COPY §2.8 supplies it explicitly for that slot. As
rendered the track has no heading, caption or framing line of any kind. None of these are on the Engineer's
deferred list.

### 11. The whole "What you get" section is missing. §B.8, §B.9, COPY §2.9
`home-1440-full.png`, `home-360-full.png`. §B.8 and §B.9 both give this section a slot between the proof
band and the final CTA — "the quietest section on the site", one display line and one paragraph. COPY §2.9
now carries finished copy for the headline, the body and the second paragraph. §B.8's wireframe annotates
only the `[FILL — timeline, engagement model]` fragment as not shipping, not the section. Not on the
Engineer's deferred list.

### 12. The footer's location line is missing. COPY §1
`home-1440-full.png`, `404-1440-full.png`. "Bengaluru and New Delhi. We work in IST." is specified in
COPY §1's footer block and is absent at every breakpoint on both pages. The "Elsewhere" group and the nav
repeat are correctly absent per the Engineer's deferred item 3; this line is not part of either.

### 13. /404 has no contact plate. §B.10
`404-360-full.png`, `404-768-full.png`, `404-1024-full.png`, `404-1440-full.png`, `404-1440-scrollmid.png`.
§B.10's address table lists `/404` among the pages that print `thegeekdogs@gmail.com` on the plate. No plate
renders on that page at any width or in any state. Not on the Engineer's deferred list.

### 14. A fourth amber. §B.2
`home-1440-full.png`, `home-360-full.png`. §B.2 limits `--lamp` to exactly three places: the empty chair's
light, the inner half of the focus ring, and the contact plate. The rendered page has three amber fills —
the plate, the skip link, and the final CTA's `Email thegeekdogs@gmail.com` button, an amber plate with ink
text 260px wide that reads as a second copy of the contact plate. §B.8 and §B.9 both set this address as
lamp *text* on `--floor` with a rule under it, not as a filled button. Either the CTA takes the wireframe's
form, or §B.2's list gains a fourth entry and says why the plate's identity is not diluted by it. (The skip
link is amber only while focused; flagging it, not calling it, since it sits inside the focus family.)

### 15. /404 ends on a loose edge. §B.5
`404-1440-full.png`, `404-360-full.png`. The footer's `--band` block stops and roughly 110px (1440) to
280px (360) of bare `--sheet` shows below it to the bottom of the viewport, because the page is shorter
than the viewport. The band needs to run to the bottom on a short page, or the page needs to fill the
viewport.

### 16. DESIGN.md contradicts itself on the current node's outgoing connector — for the spec owner, not the Engineer
`track-1440-greyscale-zoom.png`. §E.1's table gives the Current node an outgoing connector of "2px solid
`--floor`", and the render follows it. §E.2's and §E.3's ASCII both show the connector leaving `◉` as
dashed. The build is right against the normative table; the two wireframes need correcting so the next
reviewer does not read this as a defect. Flagging rather than editing, since DESIGN.md is being edited
elsewhere.

### 17. The one thing to remove: the trailing `Stage:` line at ≥ 768. §E.3, COPY §10.4
`track-1440-zoom.png`, `home-768-full.png`. At ≥768 the shared header row already names all five stages and
the current node is the largest mark on the axis, so "Stage: Live" / "Stage: Final touches" states the same
fact a third time, in a slot §E.3's ≥768 form does not have. It is also the content the plate collides with
in item 1. Keep it at <768, where §E.3 requires the current stage as words because the four other labels are
dropped; remove it at ≥768. COPY §10.4 in any case places that line *above* each track, not trailing it.

---

## Checks that passed

- Focus ring is two-tone, offset, and visible on the focused control after three Tabs, on both pages and at
  both widths. §B.2. `home-360-focus3tab.png`, `home-1440-focus3tab.png`, `404-360-focus3tab.png`,
  `404-1440-focus3tab.png`.
- `prefers-reduced-motion: reduce` renders identically to the default, as it must when no motion ships.
  §H.4. `home-360-reducedmotion.png`, `home-1440-reducedmotion.png`, `404-360-reducedmotion.png`,
  `404-1440-reducedmotion.png`.
- The build-stage states survive greyscale on size and structure alone: done = 10px filled disc, current =
  18px ring with a concentric core, future = hollow disc with a dashed connector. §E.1.
  `track-1440-greyscale-zoom.png`, `home-360-greyscale.png`, `home-1440-greyscale.png`.
- Plate geometry: full-width 360 × 56 bar with a 2px ink top border at <768; 260 × 56 with a 2px ink border
  and a 16px viewport inset at 768, 1024 and 1440 — measured right edges 752, 1008, 1424. §B.10.
  `home-360-scrollmid.png`, `home-1440-scrollmid.png`, `home-768-full.png`.
- The plate releases exactly at the final CTA: measured sticky-wrapper bottom equals the CTA section's top
  at all four widths (2310, 1864, 2053, 2264). §B.10. `home-1440-full.png`.
- h1 line count: 3 lines at 360, 2 at 768, 2 at 1024, 2 at 1440. §B.4. `home-360-full.png`,
  `home-768-full.png`, `home-1024-full.png`, `home-1440-full.png`.
- Outer margins measured 20 / 32 / 48 / 60 and content max 1200 at 1440 (shell 1320 with 60 padding).
  §B.5. `home-1440-full.png`, `404-1024-full.png`, `404-768-full.png`.
- Section vertical padding measured 72 / 96 / 128 / 160 by breakpoint, plus the +56 plate reserve on the two
  sections the plate can overlay. §B.5, §B.10. `home-1440-full.png`.
- The hero void at 1440 is empty across cols 8–12 and reserves height, so filling it later causes no reflow.
  §B.9. `home-1440-full.png`, `home-1440-focus3tab.png`.
- No template chrome: no all-caps eyebrows, no middle-dot meta strings, no arrow glyphs, no rounded card
  kit, no gradient washes, no monospace labels, and one numbered sequence only. §9.4. All home screenshots.
- Nothing is printed that COPY.md does not contain — every visible string on both pages matches COPY §1,
  §2.1, §2.6, §2.7, §2.8, §2.10, §9 or §10.4 verbatim. `home-1440-full.png`, `404-1440-full.png`.
- /404 prints COPY §9 exactly: "This page isn't here." and "Back to the studio", and nothing else.
  `404-360-full.png`, `404-1440-full.png`.
- 390 renders as 360 does, with no intermediate breakage. `home-390-full.png`, `404-390-full.png`.

---

## Seen

Every screenshot below was opened and looked at.

`home-360-full.png`, `home-390-full.png`, `home-768-full.png`, `home-1024-full.png`, `home-1440-full.png`,
`home-360-focus3tab.png`, `home-1440-focus3tab.png`, `home-360-reducedmotion.png`,
`home-1440-reducedmotion.png`, `home-360-scrollmid.png`, `home-1440-scrollmid.png`,
`home-360-greyscale.png`, `home-1440-greyscale.png`, `track-1440-zoom.png`,
`track-1440-greyscale-zoom.png`, `404-360-full.png`, `404-390-full.png`, `404-768-full.png`,
`404-1024-full.png`, `404-1440-full.png`, `404-360-focus3tab.png`, `404-1440-focus3tab.png`,
`404-360-reducedmotion.png`, `404-1440-reducedmotion.png`, `404-360-scrollmid.png`,
`404-1440-scrollmid.png`.

26 files, in `docs/reviews/step1/`.
