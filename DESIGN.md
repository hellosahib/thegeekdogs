# DESIGN.md — thegeekdogs.com

**Spec of record. Dark-first, dimensional.**

This document replaces the 2,739-line print-inspired spec that shipped runs A–F. That
document now lives at [`docs/design-legacy.md`](docs/design-legacy.md), unchanged, as
history. **It does not describe the site any more and must not be read as if it does** —
it is kept because a lot of its rulings were argued from measurement and the arguments
are worth having on file, not because any of its values are live.

What changed: the visual system, the motion, and how the studio floor is rendered.
What did not: the routes, the information architecture, the copy, the content collections,
and the isometric plan the floor is built on. Every coordinate in the room came out of
`src/components/floor/plan.ts` before this redesign and comes out of it now.

---

## A. The idea

An ink-blue room. Frosted glass panels floating over a lit isometric floor, an orchid
accent, and a brass colour reserved for actual light.

The old site was a document — off-white paper, petrol ink, a printed sensibility. This one
is a **place**. The distinction is not decorative: the site's entire argument is that there
is a floor with two people on it and one chair nobody sits in, and a room can say that in a
way a page cannot.

Three rules hold the whole system together, and everything below is downstream of them.

1. **The accent is the only signal colour.** Orchid means "this is the thing to press, or
   the thing to notice". Nothing else is orchid.
2. **The lamp colour is reserved for light and for live state.** Brass appears on a light
   source, on the current stage of a build track, on the one lit cell of the coverage map,
   and on the label of a section that is about the room itself. It is never a call to
   action — the closing CTA and both person-page addresses are accent-filled, deliberately,
   because a button is not a light.
3. **If it is a number, a label, or an address, it is mono.** Everything else is Schibsted.

---

## B. Tokens

All of them live in `src/styles/tokens.css`, and that is the only file that carries a
literal colour. Two layers: the handoff's own names, then the `--tgd-*` semantic names the
shared components and the QA scripts consume.

**One axis: scheme.** `data-theme` on the root element. The three-world axis (`data-world`)
is gone with the design that needed it — both people now sit in the same room, and what
distinguishes their pages is the evidence on them, not the palette under it.

**The site is dark-first.** `:root` carries the dark values; `[data-theme="light"]`
overrides them. This is the reverse of the file it replaces, and it is what makes the
no-JS default dark: a document with no attribute renders `:root`, and `:root` is the dark
room. `qa:schemes` asserts exactly that, with JavaScript disabled and the OS asking for
light.

### B.1 Colour

| Token | Dark | Light | Use |
|---|---|---|---|
| `--ground` | `#080C18` | `#EFEFF3` | page background |
| `--void` | `#04060B` | `#E4E5EB` | recessed bands: floor, closing CTA, footer |
| `--raise` | `#0D1322` | `#F7F7FA` | raised bands: the four gates, the coverage map |
| `--ink` | `#EAECF2` | `#0A0E18` | primary text |
| `--ink-2` | `#C9CEDB` | `#2E3646` | secondary text inside glass panels |
| `--dim` | `#96A0B5` | `#474E5E` † | body copy, labels, muted text |
| `--accent` | `#DF8FE2` | `#7E2988` † | orchid, the one signal colour |
| `--accent-ink` | `#160A18` | `#FFFFFF` | text on an accent-filled surface |
| `--lamp` | `#E9B968` | `#6B4809` † | brass; light sources and live state only |
| `--plate-halo` | `var(--void)` | `#FFFFFF` | the outline under a floor nameplate |
| `--grain-o` | `.5` | `.22` | film-grain overlay opacity |

`--line`, `--line-2`, `--glass`, `--card` and `--fill` are alphas written against
`--f-ink-rgb`, so one variable inverts every translucent surface on the page at the same
moment it inverts the room.

**The accent is a different hue value per scheme, not one hue at two lightnesses.** Orchid
reads as light-on-dark and fails on a light ground; the light scheme uses a deeper purple.
Same for the lamp. They are not to be unified.

† **Three light values are not the handoff's published hex**, and the reason is measured.
The handoff prints `--dim #565E70`, `--accent #8B2E96` and `--lamp #7A5310`, and chose all
three *for* their contrast on a light ground. On the rendered page — on the `--void` and
`--raise` bands, under the film grain, and on glass sitting over them — they measured
3.66:1, 4.03:1 and 3.84:1 against AA's 4.5. Each is now one step deeper on the same hue in
the same role. The handoff's reasoning is kept; its arithmetic is corrected. `qa:schemes`
asserts the corrected values so that a future edit back toward either the published number
or a lighter one fails rather than merges.

### B.2 The floor's own ramp

The room needs a ramp of its own because it is a lit 3D object, not a flat surface: a slab,
two wall planes, desk sides and shadow faces all have to read as different angles to one
light, and two greys cannot do that.

| Token | Dark | Light | Use |
|---|---|---|---|
| `--f-ink-rgb` | `234,236,242` | `10,14,24` | base for every `rgba()` in the SVG |
| `--f-a` / `--f-b` | `#141C2E` / `#070A12` | `#D8DBE6` / `#B4BACB` | slab gradient, near and far |
| `--f-c` / `--f-d` | `#0A0F1A` / `#05070C` | `#8D95A8` / `#767F94` | desk sides, monitor bodies, dog heads; deepest faces |
| `--f-screen-2` | `#7FD7E8` | `#2C7C8E` | monitor gradient, cool end |
| `--f-cone` | `#E9B968` | `#C98A12` | lamp cone |

**Every `rgba()` inside the SVG is written `rgba(var(--f-ink-rgb), <alpha>)`. This is the
mechanism to preserve** — it is what makes light mode work at all. If that token ever fails
to resolve, `rgba(, .1)` is an invalid declaration and every fill falls back to opaque
black; `qa:schemes` asserts it resolves, because the build passes either way.

### B.3 Type

**Schibsted Grotesk** (400/500/600/700) for headings and body. **Spline Sans Mono**
(400/500/600) for every number, eyebrow, uppercase micro-label, email address, date range
and floor nameplate.

Both are self-hosted, subset from the built `dist/` by `npm run fonts`, and both are
preloaded — the mono carries the hero eyebrow, every nameplate and every figure, so a late
swap moves marks inside the isometric scene rather than only reflowing a paragraph. Each
face ships a metric-matched local fallback so `font-display: swap` costs no layout shift;
the mono's fallback list is system monospace, not Helvetica, because a metric match fixes
layout and not appearance.

Roles are in `tokens.css` as `--step-*`. `font-variant-numeric: tabular-nums` on every
number; `text-wrap: balance` on headings, `pretty` on body.

### B.4 Space, radii, elevation

Page gutter `clamp(20px, 3.4vw, 56px)`, max content width `1360px`, section padding
`clamp(64px, 7vw, 120px)`.

Radii: 12 matrix cells · 14 stat tiles · 16 list and company cards · 18 role cards · 20
large glass panels · 999 every button and pill.

**Glass panel:** a 160° gradient from `rgba(--f-ink-rgb, .10)` to `.035`, a 1px `.14`
border, `blur(22px) saturate(1.4)`, `0 40px 80px -50px #000` plus a `.14` white inset.
Always ship `-webkit-backdrop-filter` alongside. **Card:** the `--card` fill, `--line`
border, `blur(14px)`.

**`backdrop-filter` is a progressive enhancement and the fills stand without it.** A
`@supports not` block raises every glass fill to an opaque `color-mix` against the page
ground, and the sticky header goes fully opaque there — it sits over scrolling body copy,
and a 72%-alpha ground with no blur behind it puts moving text under a static nav.

---

## C. Layout

There are no breakpoints to speak of. Every multi-column block is
`repeat(auto-fit, minmax(min(100%, <min>), 1fr))` and wraps when its column cannot hold its
minimum, at whatever width that happens to be.

Four exceptions, each with a reason that is not "it looked better":

1. **The coverage map scrolls, it does not reflow** (§E.2).
2. **The stage track becomes five rows below 560** — five labels across 320px give 64px
   each, and `Submitted for review` cannot set in 64px.
3. **The shared core is three columns from 1000**, one below it.
4. **The floor's two-up row engages at 1200, not at 800** (§D.4). This one overrides the
   handoff's own note, and §D.4 says why.

---

## D. The studio floor

`src/components/floor/` — `plan.ts` (geometry), `symbols.ts` (materials), `StudioFloor.astro`.

### D.1 What is unchanged

The plan. Standard 2:1 isometry, a 6 × 5 room, two cabins at grid (320,0) and (192,64),
seven agent desks on a checkerboard in pipeline order, the empty chair at the near corner.
Every path, every bounding box and every `<use>` offset is what the isometric plan already
computed. The scene box grew from 856 × 520 to 856 × 560 and the room's origin dropped 14
units, and that is the whole of the geometric change.

### D.2 What is new

- **Cabins are three glass planes** — two walls and a floor at `.10` / `.16` / `.06` with
  `.30` / `.30` / `.20` strokes, which is what makes a corner read as two panes meeting
  rather than one shape with a fold in it.
- **Names are lettered on the cabin's own left wall**, not floated below it.
  `matrix(1 -0.5 0 1 0 0)` is the isometric skew for a left-facing plane, so type drawn
  inside it reads as painted on the wall. The anchor is `-66, -32`; the handoff's is
  `-66, -19`, and the 13 units are not taste — a left wall faces down-screen-left, which is
  exactly where the other cabin stands, and at `-19` Sahib's name reached into Tanya's
  button and `check-floor-pointer` failed it at every width.
- **Seven near-abstract dog heads**, two ear forms alternating so no two adjacent desks
  carry the same object. They are geometric marks, not illustration; if real illustration
  is ever commissioned, this is the slot it replaces, at the same size and anchor.
- **A distinct lamp-coloured role mark above each head** — dot, two dots, bar, ring,
  diamond, dash, hollow ring, in pipeline order. It rides at `y -48` rather than `-32`,
  because the checkerboard puts the next station exactly 64 units down-screen and that
  station's nameplate sits 32 units below its node: at `-32` seven marks sat under seven
  nameplates and `qa:contrast` read them at 1.45:1.
- **Monitors** carry an accent→cool gradient and breathe on a 4.8s idle, **staggered per
  desk** off each station's own index. A room whose nine screens breathe in unison looks
  mechanical rather than occupied.
- **The empty chair sits under three cone volumes** — a floor pool, a mid volume and the
  shaft from the shade. One triangle reads as a shape; three stacked ones read as light.
- **A dashed accent pipeline** runs the seven desks in order and terminates at the chair,
  with a 4px accent dot travelling it on `offset-path`, 9s linear. The line and the travel
  are one geometry, derived from the same placements as everything else.
- **The room lights from the pointer**: a 260px brass radial tracking `--mx` / `--my` on
  the scene wrapper.

### D.3 Nameplates

Mono 12px in `--dim`, with a **6px `paint-order: stroke` halo in `--plate-halo`** painted
under the glyphs — the device a map uses for a place name over a coastline, and the only
thing that keeps a label legible as it crosses a slab, a desk face and a pool of light
inside one word.

The halo's width and its colour are both numbers the measurement chose. At 4px the light
scheme's `Security Auditor` measured 3.36:1 with the desk face bleeding through its own
label; at 5px, 3.72:1. And in light, `--void` is a mid grey that a 12px glyph's thinnest
strokes still let the desk through, so the halo goes to white there — the strongest ground
available, and again what a printed map does. The chair's plate is the room's conclusion,
so it is the one plate set in the lamp.

### D.4 The two-up row, and why it is 1200 and not 800

The handoff puts the scene and the panel side by side "down to roughly 800px". **They
cannot be.** The ten stations are transparent hit targets sized as a percentage of the
scene box, so the room's touch targets are a function of how wide the scene is — and
sharing the row with a 300px panel makes an agent desk's button 43.8px tall at 1440 and
37px at 1024, under the 44 × 44 floor this repo enforces, at *every* width the side-by-side
form exists at. The target cannot simply be made taller either: adjacent agent modules are
64 units apart, so anything over 64 makes two buttons overlap.

So the row engages where the scene can still carry a legal target:

| Width | Form | Agent button |
|---|---|---|
| ≥ 1200 | two-up, scene takes twice the free space the panel does | 44.1px at 1200, 49.8px at 1440 |
| 740–1199 | stacked; the scene takes the full content width | ≥ 45.8px |
| < 740 | the portrait plan | 68px by construction |

The room is the site's one bold moment and it is also its only invisible controls. Where
those two pull apart, the controls win.

### D.5 The panel

A glass panel showing the selected station: a mono kind-label in the lamp
(`Human · cabin`, `Agent · desk 3`, `The empty chair`), the name, an optional lede in
`--ink-2`, body in `--dim`, then a divided footer with a mono field label and its value.

**It is a reservation, not a box.** Tall enough for the longest card, so opening a station
never reflows the section under the reader's thumb — a floor on the *content* box, because
`box-sizing: border-box` is site-wide and a border-box minimum is short by the panel's own
padding at both ends. The value is width-dependent, because the longest card is not the
same card at every width. `check-floor-slot` opens all ten at five widths and fails on any
movement at all.

**Default selection is the empty chair**, server-rendered. It is the page's argument, so it
is what you land on, and it is right before any JavaScript runs and stays right if none
ever does.

---

## E. The two person pages

They mirror each other structurally and differ in exactly one place, which is the point.
**His evidence is breadth, so his centre is a matrix. Hers is how the work is put together,
so her centre is an architecture.** Cloning his layout onto her page would print the one
thing about her that is not true.

### E.1 The portrait slot

Both pages reserve a 366 × 440 glass frame beside the h1, and **the reservation is visibly
deliberate**: a 135° hairline hatch, a 96px circle holding the person's monogram, and a
mono micro-label reading `Portrait slot · 366 × 440`. No headshot exists for either
founder. A reader who sees this understands one is coming; nobody sees a broken image. When
a real portrait arrives it fills the frame and all three of those elements go.

The label is set in `--ink-2`, not `--dim`: on glass over a raised band it measured 3.86:1
in light and 4.48:1 in dark.

### E.2 The coverage map

Five surfaces against five places. A cell is filled only where a real product can be named.
Two states, attributed or empty — **the gaps are as informative as the fills**, and a
two-state map cannot lie by omission. It is a real `<table>`: a matrix whose meaning is
"this surface, at this place" needs row and column headers.

**It does not reflow. It scrolls.** Six columns at an 840px minimum inside a focusable,
labelled horizontal scroller. The stacked form it replaces turned a matrix into five lists
and lost the one thing a matrix is for — you cannot see a hole in a column you are reading
one row at a time.

One lit cell: end-to-end-with-AI at Keenai, a 2px lamp border on a lamp wash with a halo.
It is where the studio's argument and this person's day job are the same fact.

### E.3 The shared core

One central glass column is the core; two flanking columns are the native edges. Content
sits in the column that owns it. The core is the widest field because it is the one
everything agrees on, and the edges are narrower because that is the claim — the platform
code stays small because the core settled it first. The grid says so before a word of the
copy does.

DOM order is core, Android, iOS at every width: the order it is read in, and the order it
collapses into. One company appearing on more than one layer is the argument, not a
duplication bug.

---

## F. Motion

| Behaviour | Detail |
|---|---|
| Hero lines | `riseline`, staggered `0 / .1 / .26 / .42 / .56s` |
| Cursor glow, hero | `--hx`/`--hy` from `pointermove`, eased home on leave |
| Cursor glow, floor | `--mx`/`--my` on the scene wrapper |
| Monitor idle | 4.8s, staggered per desk |
| Pipeline handoff | 4px dot on `offset-path`, 9s linear |
| Scroll reveals | `opacity 0 / translateY(22px)` → settled, `.8s`, once per element |
| Stat counters | cubic ease-out over 1,100ms, on the same trigger |
| Card hover | `translateY(-6px)` composed with the card's own resting tilt |
| Scheme change | `.5s` on background, colour and border only |

### F.1 The reveal rule — read this before touching it

**Nothing is hidden until the code that un-hides it has proved it is running.**

The hidden state is written by the same module that owns the `IntersectionObserver`, and
only after the observer has been constructed. A page whose JavaScript never executes — a
parse error, a blocked bundle, a browser that refuses the module — renders every element
visible. A reveal that fails leaves content on the page; it never removes it. A 1.2s
failsafe covers the other direction, an observer that is alive but never fires.

The counters count the number the page **already prints**: the element's own text is the
source, so the figure is right before the script runs, right if it never runs, and right
for a reader with motion turned off.

Under `prefers-reduced-motion: reduce` the moment is absent rather than shortened, and
every revealed element is forced visible.

---

## G. Print

The screen design is a lit dark room. Paper is neither lit nor dark, and a browser that
suppresses backgrounds would print `--ink` on white at 1.1:1 — an unreadable document,
produced silently. One block forces the light tokens, flattens every translucent surface,
drops the grain, the toggle, the header nav and the floor, and removes every resting tilt.

---

## H. The gates

`npm run qa` runs twelve. Two were rewritten for this redesign and two were retired.

- **`qa:contrast` — rewritten, and it is the important one.** It no longer reads
  `tokens.css`. Text now sits on glass over gradients over lit geometry, and a `.05`-alpha
  fill over a gradient has no single background colour. So the gate renders each page
  twice — as it ships, and with the text's fill made transparent — **diffs the two, keeps
  only the pixels that changed**, and measures the text colour against the darkest *and*
  the lightest of those pixels in the text-free render. The diff is what makes it honest: a
  bounding box also contains the logo beside the wordmark and the ground outside a pill's
  corners, and neither has a letter anywhere near it. The nameplate halo is deliberately
  left painting, because what a reader's eye meets behind those letters *is* the halo.
  1,858 runs, two schemes, 390 and 1440. Tightest: 4.48:1.
- **`qa:schemes` — replaces `qa:worlds`.** Same lesson (a fault only a rendered page shows
  needs a check that reads a rendered page), new axis. It asserts the computed palette on
  every route in both schemes, that `--f-ink-rgb` resolves, and that with JavaScript
  disabled the page still paints the dark room.
- **`qa:plate` — retired.** It measured a sticky contact plate's band. There is no plate.
- **`qa:glyphs` — repointed.** Its axis was display-vs-body; it is now proportional-vs-mono.

`check-floor-pointer`, `check-floor-slot` and `check-floor-budget` are unchanged and all
three found real defects in this build, which is the argument for having kept them.

---

## I. Open

- **The studio card's closing line** (`4.3 stars, 1,000+ downloads, still shipping.`) is
  the design handoff's sentence, not COPY.md's, and one word is changed on purpose: the
  handoff writes `installs`, COPY.md §2.7's display string is `downloads`, and the site
  must not round one number two ways. It is in `src/lib/copy.ts` with its provenance and
  it needs the Copywriter's sign-off.
- **The wordmark now carries a mark** — the same near-abstract dog head the desks use, at
  26px. QUESTIONS.md item 48 ruled "there is no logo"; the handoff's own header draws one.
  The handoff was taken. It is the one place this build overrode a recorded owner decision
  on grounds of design fidelity rather than measurement, and it should be confirmed.
- Headshots for both founders (item 23), and the wedding planner's remaining screenshots
  (item 73).
- Real-device and VoiceOver passes.
