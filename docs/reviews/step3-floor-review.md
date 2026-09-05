# Step 3 — the studio floor, rendered review

**Design Lead, 2026-09-05.** Reviewed: the built `dist` copied to
`scratchpad/dist-step3` immediately after `npm run build`, served statically and driven with
Playwright. Floor section of `/` at 360, 390, 768, 1024, 1440 and 1920 in both schemes; at 360 and
1440 additionally reduced motion, "Lights on" sampled at 200 / 600 / 1400 / 2300 ms and instrumented
per-frame, the focus ring, the card slot after Enter on the third station and after activating a
cabin, a real-pointer hover and a real-pointer click, and the favicon at 16 and 32 px. Every file in
`docs/reviews/step3/` was opened and looked at. Measurements in
`docs/reviews/step3/measurements.json`.

## Verdict: **BLOCKED**

The drawing is good. The projection is right, the four fills hold in both schemes, the room fills and
then one light comes on where nobody is sitting, and the reduced-motion frame is a finished picture
rather than a stopped one. Those were the hard parts and they are done.

It is blocked on three things, none of them the drawing. **The floor is not operable by pointer at
any breakpoint** — mouse and touch do nothing, at every width, in both schemes. And **both rulings
from the step 2 review are unbuilt**: the sub-768 plate is still a full-bleed bar sitting across the
empty chair's card, and the keep-out lane is still re-gridding the floor section. The third of those
is also the premise of one of the four deviations below, which is why the deviations have to be ruled
before anything is rebuilt.

---

## Rulings on the four deviations (engineer.md, "Build step 3")

### 1. The portrait plan runs below 1024, not below 768 — **SEND BACK**

The arithmetic is correct and the premise is not. "The floor sits inside the contact plate's keep-out
lane, which leaves 460 of 704px at 768" measures the floor inside a lane that **was withdrawn
entirely by the step 2 review, ruling (b)**, and that §B.5 now forbids in terms: *"No section carries
an extra `padding-right`, a reserved right band or a keep-out lane."* The lane is still rendering —
`measurements.json` → `shells`: the floor shell's `padding-right` is **276px at 768, 276px at 1024
and 216px at 1440** against a left padding of 32 / 48 / 60. Item 3 below.

Take the lane out and the premise evaporates. §C.3's room projects to exactly **704 × 352**, which is
768's content width to the pixel; scaled into a 704 box the agent buttons are ~100 × 50 and the
cabins ~114 × 121, all past 44 × 44. Deviation 1 also breaks §C.6 and §B.5 at 1024, where the
side-by-side is supposed to arrive and instead does not (item 5). Build §C.7's `< 768` boundary as
written, after the lane is gone. If the 6 × 5 plan still cannot hold 44 × 44 at 768 on a clean grid,
come back with that measurement and I will re-rule.

### 2. Cabin buttons 128 × 136, not §C.3's "232 × 148" — **ACCEPT, into the spec**

The overlap arithmetic is right and §C.3's number was wrong. Two 2 × 2 cabins one module apart
project to centres 128 apart in x and 64 in y, so any pair wider than 128 steals the neighbour's
clicks; 128 × 136 is the largest pair that cannot, and both dimensions clear 44 by a wide margin
(measured 128 × 136 at 1920, `measurements.json`). §C.3's "≈ 232 × 148" is amended to 128 × 136.

One correction rides with the acceptance: the *buttons* no longer overlap, but Sahib's *nameplate*
lands inside Tanya's button at 1024, 1440 and 1920 (`plateOverStation`: `["Sahib Singh",
"tanya-jain"]`). Move the plate, not the button. See item 7.

### 3. Buttons centred on the artwork, not on the module — **ACCEPT, into the spec**

Verified rendered. `detail-desk-focus-1440.png`: the ring around Programmer contains that desk, its
monitor and its plate. A target that does not contain the thing it names is not a target, and the
module centre is an accident of the projection, not a design decision. §C.3's target line gains
"centred on the drawn station, not on the plan module".

### 4. Agent nameplate on the near half of its own module — **ACCEPT for the wide plan; SEND BACK for the portrait plan**

In the wide plan it does exactly what the note claims: at 1024, 1440 and 1920 every plate sits inside
its own station's button and inside no other (`measurements.json` → `plateOverStation`). Accepted
there.

In the portrait plan the same rule fails completely and was not re-checked. At 360 and 768, **nine of
the ten plates sit inside another station's target**: `Spec Writer`, `Designer` and `Programmer` are
all inside **Tanya's cabin button**; `Test Engineer` is inside Spec Writer; `Security Auditor` inside
Designer; `Reviewer` inside Programmer; `Release Watcher` inside Test Engineer. Rendered, the focus
ring on Spec Writer is drawn around a box labelled "Test Engineer"
(`slot-enter-third-360.png`), and the ring on Programmer is drawn around a box labelled "Reviewer"
(`focus-360.png`). The portrait plan needs the plate above its own station, not below it — the
occlusion argument that forces "below" on the checkerboard does not apply to a 3-up orthogonal grid.

---

## Items

### Blockers

**1. The whole floor is dead to pointer and touch, at every breakpoint, in both schemes. §C.6, §C.7, §B.6 principle 3**
`hover-agent-1440.png`, `hover-agent-360.png`, `pointerclick-cabin-1440.png`,
`pointerclick-cabin-360.png`. A real mouse hover over Security Auditor's desk changes nothing; a real
mouse click on Tanya's cabin changes nothing — the card left up by the keyboard is still the card on
screen after both. `document.elementFromPoint` at the centre of all ten stations returns `<main>` at
360, 768, 1024, 1440 and 1920 — **0 of 9 sampled points inside any station is inside that station**.
The cause is inherited from the wrapper the floor sits in, not from the floor's own boxes: the chain
from `button.station` up to `main` reports `pointer-events: none` at every level, originating on the
sticky-plate wrapper introduced in step 2. Keyboard focus and Enter work perfectly (`focus-1440.png`,
`slot-enter-third-1440.png`), which is why the Engineer's own target-size table reads clean — it
measures rectangles, not hit tests. §C.6 requires "hover, focus and tap all replace the slot's
content, identically"; §C.7's whole mobile decision is "a tappable floor", on the viewport where 80%+
of the traffic is. Nothing else on this page matters until this is fixed, and it should be fixed with
a regression test that clicks a station, not with a CSS edit that is checked by eye.

**2. Below 768 the contact plate is still a full-bleed bar, and it still lands on the empty chair's card. §B.10, §C.6, step 2 ruling (a)**
`floor-360-light.png`, `floor-360-dark.png`, `floor-390-light.png`, `floor-390-dark.png`. The bar
runs the full 360 / 390 and covers the middle two lines of the default card — *"…that something is
ready for your users. A person does,"* — which is the one sentence §C.6 calls the highest-value
decision in the floor spec. On `focus-360.png` and `slot-enter-third-360.png` it covers the entire
`Checked by` block, so a keyboard user at 360 gets the flex and not the reassurance, which §6 says
must never be split. In `scene-zoom-360x2.png` it also bisects the lamp cone. Step 2's ruling (a)
withdrew the `< 768` bar from the spec and told the Engineer to render the same 260 × 56 plate,
inset 16px. Build the plate.

**3. The keep-out lane is still re-gridding the floor section. §B.5, step 2 ruling (b)**
`measurements.json` → `shells`. Floor shell `padding-right` is 276 / 276 / 216 at 768 / 1024 / 1440
against left padding 32 / 48 / 60; the header shell at the same widths keeps the full margin. §B.5
was rewritten after step 2 to say there is one grid with no reserved right band, and it is still not
true on the rendered page. Everything in items 4–6 falls out of this one, and so does deviation 1.

### Composition and spec

**4. The card slot still has a border. §J, §C.6**
`floor-1024-light.png`, `floor-1440-light.png`, `floor-360-light.png` — a 1px rule around the
reservation at every breakpoint (`slotBorder: 1px`). This is `/`'s pre-committed cut in §J and §C.6
states the no-container rule outright: *"It is a reservation, not a box."* It is worst at 1024, where
the slot renders as a **700 × 344 outlined empty rectangle** with roughly 250px of ruled-off
emptiness under three lines of text — the exact object step 2 predicted, and the only outlined
rectangle on the site, which is the SaaS-card-kit tell §9.4 bans by name.

**5. The side-by-side slot arrives at 1440, not at 1024. §C.6, §B.5**
`floor-1024-light.png`, `floor-1024-dark.png`. At 1024 the slot is 700 wide and sits *below* the
scene (`slot.y` 783.8 against a scene ending at 759.7). §C.6: *"The side-by-side arrives at 1024, and
it always did… Any wording that puts this arrangement at 1440 is stale and is overruled by this
line."* §B.5: *"The split forms engage at 1024."* Both sections say 1024 and the page says 1440.

**6. At 1440 the scene does not use its column, and it is smaller than it is at 1024. §B.9, §C.3**
Measured scenes: **792 × 560 at 1920** (correct), **654 × 462.4 at 1440**, **700 × 494.9 at 1024**.
§B.9's wireframe gives the scene cols 1–8 at 792 × 560 at 1440. Rendered it is 17% short in each
dimension — 68% of the specified area — and the room gets *smaller* as the viewport grows from 1024
to 1440, which no visitor can be expected to make sense of. In `floor-1440-light.png` the room sits
in the left half of a 1440 × 945 section with a void to its right and below it that is larger than
the room. Cause is item 3.

**7. At 360 and 768, "Tanya Jain" and "Designer" read as one two-line label. §C.7, §C.4**
`detail-360-tanya-designer.png`, `floor-360-light.png`, `floor-768-light.png`. The two plates abut
with a 0px gap — Tanya's baseline at y 413.7, Designer's box starting at y 413.7 — one in `--chalk`,
one in chalk@72%, stacked and centred on the same axis. The plain reading is that Tanya Jain is the
Designer. That is a factual misstatement of a real person's role produced by a layout accident, on
the page whose §2.3 copy says Software Engineer 2 and product spec. This is the specific case
deviation 4 has to answer, and it is the worst thing at 360 after the plate.

**8. Nobody is in either cabin. §C.4, §C.3, COPY.md §2.2**
`scene-zoom-1920x2.png`, `detail-cabins-idle-1440.png`, `scene-zoom-360x2.png`. §C.4 carries the
human/agent distinction on "enclosure, footprint, uniqueness and **occupancy**", and the chair spec is
"present, occupied, pulled out at a slight angle". Rendered, each cabin has a dark abstract post
where the occupant should be, and no figure. So the room contains ten empty seats, the section
heading says "Two desks have people at them", and the argument the whole composition is built to make
— *one* chair is empty on purpose — has nothing to distinguish it. Occupancy is the cheapest of the
four distinctions to draw and it is the one carrying the copy.

**9. The empty chair does not read as a chair, and it is not the largest area of accent colour. §C.3 mechanisms 2 and 4, §C.1**
`detail-chair-1440.png`, `scene-zoom-1920x2.png`, `lightson-1440-2300ms.png`. Under the cone there is
a lit plinth and a dark right face; there is no chair silhouette at any breakpoint. The cone renders
as a translucent olive wedge over the object rather than as light falling on it, and it is
comprehensively out-shouted by the contact plate, which is 260 × 56 of solid `--lamp` on the same
screen. Two consequences: §C.3 mechanism 4 ("it is nearest and renders largest") is not delivered —
the largest light area in the room is actually the cabins' floor patch — and the chair's card says
"This chair stays empty" about an object no one can identify as a chair.

**10. The two human cards carry no gate block. §C.6 item 4, COPY.md §2.3**
`slot-cabin-1440.png`, `slot-cabin-360.png`. Tanya's card renders name, role line and body and stops;
there is no `Owns` label and no gate list. COPY.md §2.3 has supplied both the label and both lists
since round 5, so this is no longer blocked on copy. §C.6's 344 / 392 / 320 reservations were
computed *from Tanya's card with that block*, so its absence is also what makes the empty box in item
4 as large as it is.

**11. The readable roster is gone. §B.8, §B.9, COPY.md §2.4**
The floor section's text content is the lead-in, the instruction, the station names and the open
card — there is no `The full pipeline` label and no wrapped sentence under the scene at any
breakpoint (`floor-1440-light.png`, `floor-360-light.png`). §B.8 and §B.9 both put it there at every
breakpoint, and the engineer note's reason ("its label is still not a string COPY.md contains") is
stale: COPY.md §2.4 gives the label and the sentence verbatim. The SVG is correctly `aria-hidden`, so
right now the seven roles exist only as ten button names — nothing on the page states the pipeline as
a sentence.

**12. The selected station is not visible in the room. §C.8, §C.7**
`detail-desk-unselected-1440.png` against `detail-desk-selected-1440.png`, captured under reduced
motion so only the state differs. §C.8 says a focused or selected desk lifts its top surface to
`--chalk` @ 34%; the two frames are effectively indistinguishable. §C.7 asks for a persistent
selected state "so the panel and the room stay connected" — at 360 the panel is below the fold of the
scene, which is precisely when that connection has to carry.

### Smaller

**13. The agent nameplates set below the type scale. §B.4, §C.4**
13 SVG units in a 792 viewBox drawn at 654 → **10.7 CSS px at 1440**; 11 units at 1:1 → **11 CSS px
at 360 and 768**. §B.4's smallest step is micro at 13px and there is nothing below it. Cabin plates
are 12.4px at 1440. Contrast is fine (measured 7.25 : 1 light, 8.30 : 1 dark for an agent plate;
14.5 : 1 and 16.2 : 1 for a cabin plate) — the problem is size, not colour.

**14. One object, two nameplate treatments. §C.4, §9.4**
`detail-cabinplate-light.png` against `detail-360-tanya-designer.png`. At ≥ 1024 the cabin plate is
skewed onto the wall face (`matrix(1 -0.5 0 1 0 0)`) and reads as italic; at ≤ 768 the same plate is
plain horizontal type. It is the only skewed text on the site, it crosses the wall's top edge, and
the two breakpoints disagree about what the object is.

**15. The plates are printed on the desks. §C.4**
`detail-desk-idle-1440.png`, `detail-agentplate-light.png`. §C.4 has the agent role "floating above
the desk"; rendered, each label is set across its own desk's near edge and crosses three fills. It is
legible and it passes contrast, but it is text on artwork rather than text beside it, and it is what
makes items 7 and 13 land harder than they need to.

**16. The lamp cone comes up in ~620ms, not 900ms. §H.3**
Instrumented per frame with the scene in the viewport: glows complete at **1038–1040ms**, cone starts
at **1654–1657ms**, cone full at **2270–2273ms**. The hold and the start are right; the rise is
`--dur-4`-shaped rather than the specified 900ms, which makes the one deliberate slow moment on the
page 30% quicker than designed. `lightson-1440-1400ms.png` / `lightson-1440-2300ms.png`.

**17. The seam grid is bigger than the room. §C.3, §C.10**
`scene-zoom-1440x2.png`. The floor seams run a full module past the occupied plan on every side, so
the room's apparent footprint is larger than anything standing in it and the chair's isolation is
partly drawn by ruled lines rather than by emptiness. §C.10 already has seam lines first in the cut
order.

---

## Passed

- **§C.9 still frame, designed not stopped.** Nine glows at nine different static opacities, matching
  §C.9's table value for value — 0.84, 0.82, 0.62, 0.74, 0.68, 0.80, 0.64, 0.76, 0.70 — with
  `animation-name: none` under `reduce`. `floor-360-light-reduced.png`, `floor-1440-light-reduced.png`,
  `floor-1440-dark-reduced.png`, `floor-360-dark-reduced.png`. The still frame is indistinguishable
  from a finished picture of the same room, which is what §H.4 asks for.
- **§C.5 idle loop.** Opacity only, one rect per station, nine distinct phases at rest (0.56, 0.56,
  0.61, 0.72, 0.81, 0.85, 0.82, 0.74, 0.63) — no unison, no jitter, no transform.
- **§H.3 "Lights on".** Nine glows in DOM order at ~67ms stagger, complete at ~1040ms; **617ms of
  nothing**; then the cone alone. `lightson-1440-200ms.png` (two cabins lit, seven agents dark, no
  cone) → `-600ms` (room filling in pipeline order) → `-1400ms` (room full, no lamp) → `-2300ms`
  (lamp up). Humans first, nothing moves position, nothing offscreen-then-on. The hold is clearly
  perceptible and it is the best moment on the page.
- **§C.6 default content.** The empty chair's card is up at every breakpoint in both schemes with no
  interaction. `floor-*-{light,dark}.png`.
- **§C.6 item 3.** The agent card's `Checked by` sub-block renders with its 16px / 1px rule / 16px
  and the correct gate string — `Product spec review` for Spec Writer, `Code review` for Programmer.
  `slot-enter-third-1440.png`, `focus-1440.png`.
- **§C.8 focus ring and keyboard.** Two-tone 3px `--chalk` outer + 2px `--lamp` inner, 3px offset,
  4px radius, on the button rectangle; focus updates the slot; ten stops in §C.2's order.
  `focus-1440.png`, `detail-desk-focus-1440.png`.
- **§C.1 and §B.2a, both schemes from one scene.** Four fills, one gradient, no filter, no raster, one
  geometry; in dark the floor drops and the lit surfaces read *more* strongly, exactly as §B.2a
  argues. `floor-1920-dark.png`, `floor-1440-dark.png`, `floor-360-dark.png`.
- **§C.10 text is real text.** Every nameplate is a live `<text>` node, selectable and translatable,
  no outlined paths.
- **§10.2 accessible names and `aria-hidden`.** All three `<svg>` roots carry `aria-hidden="true"`
  with `focusable="false"`; button names follow §10.2's three patterns and speak the gate string.
  The roster is not read twice.
- **§B.12 favicon.** Cord, cone, 3-unit gap, pool — three bands of decreasing width, `--floor` ground
  and `--lamp` mark, no radius, no gradient. Survives 16px with the cord still present, and the 32px
  PNG matches the SVG. `favicon-16.png`, `favicon-32.png`, `favicon-zoom.png`.
- **§9.4.** Nothing template-like crept in with the scene: no eyebrow, no middle-dot meta, no
  hairline rules between sections, no hover lift, no accented word. The one exception is the slot's
  outline, which is item 4.
- **COPY.md §10.2 OG/static alt.** Not applicable yet and therefore not a fail: the page ships no
  `<img>` and no `og:image`, so the static-image fallback the alt line exists for does not exist.
  It comes due with the OG image at step 7 — the alt string is written and waiting.

## Seen

`docs/reviews/step3/` — 12 floor sections at 360 / 390 / 768 / 1024 / 1440 / 1920 × light / dark;
4 reduced-motion frames at 360 and 1440 × light / dark; 8 "Lights on" frames at 200 / 600 / 1400 /
2300 ms at 360 and 1440; `focus-{360,1440}`; `slot-enter-third-{360,1440}`; `slot-cabin-{360,1440}`;
`hover-agent-{360,1440}`; `pointerclick-cabin-{360,1440}`; `scene-zoom-{360,1440,1920}x2`;
`detail-chair-1440`; `detail-desk-{idle,focus,selected,unselected}-1440`;
`detail-cabins-{idle,selected}-1440`; `detail-360-tanya-designer`;
`detail-{agent,cabin,chair}plate-{light,dark}`; `favicon-{16,32,zoom}`; `measurements.json`.
`docs/reviews/step3/engineer/` was left as the Engineer's own record and is not re-listed here.

## Remove one thing

**The wall-mounted, skewed cabin nameplate.** Set "Sahib Singh" and "Tanya Jain" on the same
horizontal baseline as every other plate on the floor, in `--chalk` at the same size step, and drop
the door-plate conceit. It buys back the only skewed type on the site, the only nameplate treatment
that changes between breakpoints, and the least legible text on the page — and it costs nothing,
because §C.4 says in its own words that the cabin/desk distinction is carried by enclosure,
footprint, uniqueness and occupancy, "in that order". None of those four is the plate. Fix item 8 and
the cabins will not need a label to be read as the humans' rooms at all.
