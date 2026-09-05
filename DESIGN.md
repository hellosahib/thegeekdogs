# DESIGN.md — TheGeekDogs.com

Design Lead, Pass 1. Proposal only. Nothing here is approved; the Direction human gate (§14 of the brief) decides.

Scope of this document: art direction, three token systems, layout, hierarchy, responsive behaviour, the studio floor composition, the work-card treatment, the build-stage indicator, motion spec. No application code. No user-facing copy — drafted copy from §7 is quoted only to size the boxes, and copy that does not exist yet is marked `[COPY NEEDED]`. Facts that do not exist in §5 are marked `[BLOCKED]` and never guessed.

Contrast arithmetic is done, not estimated. Method is printed in §B.2 so anyone can re-run it.

---

## A. Reference study (§5.6)

Five URLs were fetched, then a second targeted round. Two returned usable design content. Two returned a directory listing rather than the portfolio. One returned nothing.

### A.1 `dribbble.com/shots/26995447-Personal-Portfolio-Website-Animations` — **not seen**

Two fetch attempts returned no page content. I have not seen this shot and will not describe it. If the Orchestrator can supply a screenshot or an accessible mirror, this section gets rewritten; until then it contributes nothing to the direction.

### A.2 `wallofportfolios.in/portfolios/diodona-maenggartama/` — **directory page, not the portfolio**

What loaded is Wall of Portfolios' own profile card for the designer: name, "Multidisciplinary" role line, company affiliation, a silver achievement badge, message/bookmark/profile actions, and the platform's exclusivity line about how few portfolios get listed. A second fetch asking specifically for outbound links to the designer's own site reported that the page contains none. So I saw the directory's chrome, not Diodona Maenggartama's work.

**Mechanism visible in what I did see** (the directory, not the portfolio): hierarchy is built almost entirely by size jump plus whitespace — one large name, one small role line, then icon-and-label pairs on a strict repeating spacing interval. No rules, no cards-within-cards, no accent colour doing hierarchy work. The expensive feeling comes from a very small number of type sizes reused with discipline.

**Take:** the discipline of few type sizes, hierarchy carried by size jump and vertical space rather than by decoration. **Leave:** everything else, because I did not see the actual work. **Gap to close:** the designer's real portfolio URL.

### A.3 `wallofportfolios.in/portfolios/geonwoo-john-yang/` — **directory page, not the portfolio**

Same situation. Large name, "Multidisciplinary Designer" line, a portrait given room, consistent icon spacing, neutral white/grey field, the same platform badge and exclusivity messaging. Second fetch confirmed no outbound link to his own site.

**Mechanism visible:** the portrait is the only saturated thing on the page, and it is surrounded by more space than it needs. Restraint here is not "less content", it is "one thing allowed to be loud".

**Take:** exactly that — one element per view is permitted to be loud, and it earns it by having empty space around it, not by being large. That principle drives the empty chair's staging in §C. **Leave:** the profile-card layout itself, which is a directory pattern and has nothing to do with a studio site.

### A.4 `abhaysingh.in` — **seen, and the most useful of the five**

Section order: positioning statement → featured case studies → a philosophy line → additional project previews → contact. The H1 is a claim about what he does for clients ("Design rescue for noteworthy brands"), not a name and not a job title. Each featured project is a compact unit: project name, one line of context, then three quantified results printed as short label/value pairs — a duration, a revenue movement, an audience movement. Body copy is minimal. The philosophy section is a single line. Footer is one line.

**Mechanisms that make it read expensive:**

1. **The numbers carry the hierarchy, not the type scale.** `5 years`, `0 → ₹40m`, `100k ↑` are doing the persuading. The prose around them is deliberately small and short. There is no third type size fighting the first two.
2. **Every project is the same shape.** Name, context, three metrics. Because the shape repeats exactly, the eye stops parsing layout after the first one and starts comparing values. That is a scanning affordance, not decoration.
3. **Credibility before work.** The positioning claim is above the case studies. The visitor is told what the site is arguing before being shown evidence for it.
4. **Withheld:** no logo wall, no testimonial carousel, no process diagram, no "my skills". The page is short because the evidence is dense.

**Take:** all four. This is the closest reference to what §3 needs. Specifically: (a) the H1 is a claim, which validates hero variant A over C; (b) the metric-as-hierarchy move becomes design principle 2 and directly justifies §6.1's decision to put dates in the price position on the work cards; (c) the repeating-unit-so-you-compare-values move becomes the work-card grid and the two-product build-stage view; (d) credibility-before-work becomes the home section order.

**Leave:** the arrow glyphs used as affordances (`See ↓`, `→`). §9.4 explicitly bans `→` appended to link text, and the arrows on this site would be the generic-template tell that everything else avoids. Also leave the "additional projects" tail — we have two products, not seven, and a thin tail would advertise thinness.

### A.5 `amix-design.com/tl/web-g-threejs/` — **seen; useful as a counter-example**

A vertical gallery of six browser-based 3D games, each entry a consistent card unit, on a dark neutral field so the screenshots carry all the colour. Japanese headline with an English subtitle beneath. The page states that the page itself is rendered with Three.js r185.

**Mechanism:** the atmosphere comes from the ground being dark and unsaturated so that a small number of bright things read as lit. Also: the curated set is six items, not sixty, and the technical flex is stated in one line of body copy rather than performed in chrome.

**Take, and only this:** the dark unsaturated ground as a way to make a small amount of light read as atmosphere. That is the entire mechanism behind the studio floor being a full-bleed ink band with one lamp in it — a lit room, not a glowing page. And the "state the flex in one line, don't perform it" discipline, which is the tone §3 asks for.

**Leave:** the stack. §6 already rules out WebGL and the Engineer restates it (PLAN.md §10.3). §6 calls this site "the ambition ceiling for atmosphere, not a stack recommendation" and that is exactly how it is used here — the ambition is borrowed at 1/50th the weight, in SVG, with real DOM nodes and real focus rings, which WebGL cannot give.

### A.6 What the study changed

Nothing in the direction came from a surface. Three things came from mechanism:

- Numbers, not adjectives, carry hierarchy (A.4). → principle 2, work-card date treatment, the stage view.
- One thing per view is loud, and it earns it with surrounding emptiness (A.3). → the empty chair's staging.
- A dark unsaturated ground makes small light read as atmosphere (A.5). → the floor is a full-bleed ink band, not a page-coloured diagram.

---

## B. Studio world — home, `/work/*`, `/contact/`, `/404`

### B.1 The idea in one line

**The room is lit; the page is printed.** There is exactly one room on this site — the studio floor — and it obeys a single light source from the upper left. Everything outside the room is a printed sheet: flat, quiet, no shadows, no glow. The acrylic work cards are the hinge between the two, because they are printed things that sit in a lit room, which is why they get an edge highlight and a contact shadow and nothing else does.

This is the mechanism that lets §9.4's "spend boldness in one place" be a rule you can actually apply: if an element needs light to be understood and it is not in the room, the element is wrong.

### B.2 Tokens

Six named values. Contrast computed per WCAG 2.x: channel `c` in sRGB 0–1, linearised as `c/12.92` when `c ≤ 0.03928` else `((c+0.055)/1.055)^2.4`; `L = 0.2126R + 0.7152G + 0.0722B`; ratio `= (L_light + 0.05) / (L_dark + 0.05)`.

| Token | Hex | Relative luminance L | Role |
|---|---|---|---|
| `--floor` | `#0F2A2E` | 0.019547 | Deep petrol. The room's ground **and** all primary text on light surfaces. One value doing two jobs is what ties the printed page to the room. |
| `--sheet` | `#F1F3F0` | 0.890932 | The page. Cool off-white with a faint green cast so it reads as device-UI neutral, not editorial cream (§9.4). |
| `--band` | `#E2E6E1` | 0.781986 | Section alternation, and the only permitted backdrop behind a work card. |
| `--muted` | `#4E6468` | 0.117335 | Secondary text on light surfaces only. Never used on `--floor`. |
| `--chalk` | `#E8EDE9` | 0.836074 | Text and marks on `--floor`. |
| `--lamp` | `#F2A93B` | 0.475689 | The one signal. Used in exactly three places: the empty chair's light, the inner half of every focus ring, and the persistent contact plate. |

Two derived values, printed because they carry text:

| Derived | Composite | L | Where |
|---|---|---|---|
| `--chalk` at 72% over `--floor` | `#ABB6B5` | 0.454500 | Secondary text inside the room. |
| White at 82% over `--band` | `#FAFBFA` | 0.962205 | The worst-case work-card surface. See §D.6. |

**Every text-on-background pair in use:**

| Foreground | Background | Ratio | AA body (4.5) | AA large (3.0) |
|---|---|---|---|---|
| `--floor` `#0F2A2E` | `--sheet` `#F1F3F0` | **13.53 : 1** | pass | pass |
| `--floor` | `--band` `#E2E6E1` | **11.96 : 1** | pass | pass |
| `--floor` | card surface `#FAFBFA` | **14.55 : 1** | pass | pass |
| `--muted` `#4E6468` | `--sheet` | **5.62 : 1** | pass | pass |
| `--muted` | `--band` | **4.97 : 1** | pass | pass |
| `--muted` | card surface `#FAFBFA` | **6.05 : 1** | pass | pass |
| `--chalk` `#E8EDE9` | `--floor` | **12.74 : 1** | pass | pass |
| `--chalk` @72% `#ABB6B5` | `--floor` | **7.25 : 1** | pass | pass |
| `--lamp` `#F2A93B` | `--floor` | **7.56 : 1** | pass | pass |
| `--floor` | `--lamp` (contact plate, ink on amber) | **7.56 : 1** | pass | pass |

**One failure, and the rule that follows from it:**

`--lamp` on `--sheet` is **1.79 : 1**. It fails everything. Therefore:

> **Lamp rule.** `--lamp` may be a *fill* on a light surface but never a *mark* and never *text* on one, and any lamp fill on a light surface carries a 2px `--floor` border so its boundary has 13.53 : 1. On `--floor` it is unrestricted, including as text.

This is why the build-stage indicator (§E) carries its three states on shape, size and stroke pattern rather than on colour — which §6.2 requires anyway.

**Focus ring** (WCAG 2.2 SC 1.4.11 needs 3 : 1 against adjacent colour): a two-tone ring, 3px outer + 2px inner, 3px offset. The outer is the maximum-contrast neutral for the surface it lands on — `--floor` on light (13.53 : 1), `--chalk` on the room (12.74 : 1). The inner is always `--lamp`, so focus has one identity everywhere while the outer ring is what carries the contrast. `outline: none` is never used without this replacement.

Borders are derived at alpha rather than tokenised: card edge highlight `rgba(255,255,255,.72)` top/left and `rgba(15,42,46,.14)` bottom/right; hairlines inside a card `rgba(15,42,46,.12)`. These are decorative separators, not information carriers, so they are not held to 3 : 1. Structural separation between sections is done with fill changes (`--sheet` ↔ `--band` ↔ `--floor`) and space, never with rules — §9.4 bans broadsheet hairlines and this removes the temptation entirely.

### B.3 Typeface roles

Two families. The Engineer's ceiling is two (PLAN.md §10.5) and I am not spending the third.

| Role | Face | Why |
|---|---|---|
| **Display** — h1, section heads, company names, dates | **Anek Latin** (SIL OFL, variable: `wght` 100–800, `wdth` 75–125, by Ek Type). Self-hosted, subset, from the foundry's variable release via Fontsource. | It is not Inter, not Space Grotesk, not a serif, not the tech-default. It is drawn by an Indian foundry for a multi-script superfamily, and the studio ships a Hindi UI in its second product — so if a Devanagari string ever has to appear, **Anek Devanagari** is the same skeleton rather than a mismatched second decision. The `wdth` axis is what lets one file cover a 60px hero and a condensed tabular date without a second family. |
| **Body** — all prose, card small print, labels | **Instrument Sans** (SIL OFL, variable `wght` 400–700). | A grotesque with slightly warm terminals that stays neutral at 16px and does not read as a system font. Reads as "written by a person", which is the tone §3 asks for, without any editorial affectation. |
| **Numerals / data** — dates, ratings, install counts, stage positions | **Anek Latin at `wdth` 87.5, `wght` 500, `font-variant-numeric: tabular-nums`, tracking 0.** Not a third family. | Dates and counts are the persuasion (A.4, principle 2). Condensing them gives them a distinct "ticket" quality and lets columns of them align, without a monospace face — which §9.4 bans as a label default and which would drag the developer-portfolio costume in with it. |

**Justification against §9.4:** no serif display; no monospace-for-every-label; no cream+serif+terracotta; no tracked-out all-caps eyebrows anywhere (there are no eyebrows in this system at all — sections are separated by fill and space, and a section head is a plain sentence-case display line); no one-word colour accent in a headline (`--lamp` cannot be text on light surfaces, which makes that mistake impossible by construction).

**Fallback if `tabular-nums` is unavailable in the shipped Anek Latin build:** add **Spline Sans Mono** (OFL, variable) *for numerals only*, ~25 KB subset, and tell the Perf Auditor. This is the only circumstance in which a third face is permitted.

### B.4 Type scale

Two sizes do the work; everything between them is weight and width, not size. That is the mechanism from A.4.

| Step | 360 | 1440 | Line height | Face / axis |
|---|---|---|---|---|
| display-hero | 38px | 60px `clamp(2.375rem, 4.6vw, 3.75rem)` | 1.04 | Anek 600 / `wdth` 100, tracking −0.015em |
| display-section | 27px | 40px `clamp(1.6875rem, 2.8vw, 2.5rem)` | 1.10 | Anek 600 |
| numeral-large | 24px | 28px | 1.0 | Anek 500 / `wdth` 87.5, tnum |
| title | 20px | 22px | 1.2 | Anek 600 |
| body | 16px | 17px | 1.62 | Instrument 400 |
| small | 14px | 14px | 1.5 | Instrument 400/600 |
| micro | 13px | 13px | 1.45 | Instrument 500 |

Measure: display ≤ 28ch, body ≤ 62ch. The h1 must set as two sentences on two lines at ≥ 1024 and may run to three at 360; it may not run to four.

### B.5 Grid and rhythm

8px base grid; type set on a 4px sub-grid.

| Breakpoint | Cols | Outer | Gutter | Content | Column |
|---|---|---|---|---|---|
| 360 | 4 | 20 | 16 | 320 | 68 |
| 768 | 8 | 32 | 20 | 704 | 70.5 |
| 1024 | 12 | 48 | 24 | 928 | 55.3 |
| 1440 | 12 | 60 | 24 | 1200 | 78 |

Page max-width 1320 (content 1200); it stops growing there. Section vertical padding: 72 / 96 / 128 / 160 by breakpoint. Spacing scale 4-8-12-16-24-32-48-64-96-128-160; nothing else.

The floor section and the final CTA section are the only two full-bleed regions; they break the container to the viewport edge. Everything else stays in the grid.

### B.6 Design principles

Five, each specific to this brief. Generic ones are not here on purpose.

1. **The room is lit; the page is printed.** One light source, upper left, governs the floor's shading, the acrylic cards' edge highlights and their contact shadows. Nothing outside the room gets a shadow. If an element needs elevation to be understood and it is not in the room, redesign the element.

2. **A claim gets a number or it gets cut.** 4.3 stars, 24 reviews, 1K+ installs, five stages, four gates, four stacks, seven years, two people. Numerals are the second-loudest type on this site after the display and they are tabular so columns of them compare. Adjectives get body size. This is why the dates take the price position on a shelf-talker (§6.1) and why the two-product stage view is the centrepiece of the proof section rather than a paragraph.

3. **Nothing important is behind a hover.** Every state a pointer can reach is reachable by tap and by keyboard, produces the identical result, and produces it in the identical place on screen. This is why the floor's interaction card lives in a fixed slot rather than following the cursor, and it is a design constraint before it is an accessibility one — most of the traffic is Android on mobile data (§4).

4. **Stillness is the accent.** In a room where every station idles, the one that does not move is where the eye lands. Generalised: the current build stage is the only node with two concentric parts; the 2025 column is the only lit column on Sahib's map; the shared core is the only marked column on Tanya's. The site never has two loud things at once, and the loud thing is usually the quiet one.

5. **The Play Store is the vernacular, not "studio" abstraction.** Ratings, install counts, "last updated", stage tracks, portrait screens, 44px targets, a real store link. Where a design-industry convention and a store convention disagree, take the store convention — the people being sold to open apps, not agency sites. Concretely this rules out: a case-study hero image with a floating browser chrome; a "selected work 01/02" index; a process diagram with abstract shapes.

### B.7 Hero variant: **A**

> **AI writes a lot of our code. It doesn't get the last word.**

Conversion is job one (§2, §8), and A is the only variant whose headline contains the actual differentiator — B states the outcome without the mechanism, and C makes a stranger scroll before learning anything, which is a luxury a two-person studio's first impression cannot afford. A also gives the page its two-CTA structure honestly: "Start a project" is the conversion, and "Look around the floor" is the only in-page link that hands the visitor to the one bold moment, which means the floor is entered deliberately rather than encountered.

Copy constraint back to the Copywriter: A's drafted subhead is 33 words and sets to five lines at 360, which pushes the primary CTA below the fold on a 640-tall viewport. **The subhead needs to fit ≤ 3 lines at 360 (≈ 26 words at this measure).** Not rewriting it here — that is not my remit.

### B.8 Home page, 360

Content 320, margins 20. Sections in §7 order.

```
┌────────────────────────────────────────┐ 360
│ 20│                                 │20 │
│   thegeekdogs                          │  48  header row 1. wordmark, display
│                                        │      600, links home. not sticky.
│                                        │      [BLOCKED: wordmark?]
│   Work    Sahib    Tanya    Contact    │  44  header row 2. THE NAV. the same
│   ────────────────────────────────────  │      four items as 1440, COPY.md §1
│                                        │      labels. small 14px --floor,
│                                        │      44px tall targets, 24px apart,
│                                        │      236 of the 320 used. no
│                                        │      hamburger, no disclosure.
│                                        │  72  --sheet
│   AI writes a lot of                   │      h1, Anek 600, 38/1.04, --floor
│   our code. It doesn't                 │      3 lines max at 360
│   get the last word.                   │
│                                        │  24
│   TheGeekDogs is a two-person studio   │      body 16/26, --muted, 62ch cap
│   running an agent fleet on every      │      [COPY: fit 3 lines / ~26 words]
│   build, with human review before      │
│   anything reaches you.                │
│                                        │  32
│   ┌──────────────────────────────────┐ │      primary: --floor fill,
│   │        Start a project           │ │  48  --chalk text, 12.74:1
│   └──────────────────────────────────┘ │
│   ┌──────────────────────────────────┐ │      secondary: 1.5px --floor
│   │     Look around the floor        │ │  48  outline, --floor text
│   └──────────────────────────────────┘ │
│                                        │  72
╞════════════════════════════════════════╡      FULL BLEED. --floor ground.
│▓▓▓▓▓▓▓▓▓▓▓▓▓ THE FLOOR ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│      the one bold moment.
│▓                                      ▓│  48
│▓  Two desks have people at            ▓│      display-section 27px --chalk.
│▓  them. The rest are agents.          ▓│      COPY.md §2.2 verbatim. 84 chars
│▓  One chair stays empty on            ▓│      at ~26ch on 320 => FOUR lines.
│▓  purpose.                            ▓│      [COPY NEEDED: <= 12 words. four
│▓                                      ▓│  16   lines is one more than the
│▓  Open any desk to see the job and    ▓│       block should carry]
│▓  the human who checks it.            ▓│      instruction line, COPY.md §2.2.
│▓                                      ▓│      body 16/26 chalk@72%, 2 lines.
│▓  ┌──────────────────────────────┐    ▓│  32
│▓  │ portrait room, 320 x 470     │    ▓│      iso scene. plan and stations
│▓  │ 2 modules wide, 4 deep       │    ▓│      in §C.3. targets >= 88x72.
│▓  │ see §C for the plan          │    ▓│
│▓  └──────────────────────────────┘    ▓│
│▓                                      ▓│  20
│▓  ┌──────────────────────────────┐    ▓│      CARD PANEL. below the scene,
│▓  │ Ship approval                │    ▓│      never over it. min-height
│▓  │                              │    ▓│      reserved for the longest
│▓  │ This chair stays empty. No   │    ▓│      card => zero CLS.
│▓  │ agent decides that something │    ▓│      DEFAULT CONTENT = the chair,
│▓  │ is ready for your users. A   │    ▓│      so the argument is on screen
│▓  │ person does, every release.  │    ▓│      before any interaction.
│▓  └──────────────────────────────┘    ▓│
│▓                                      ▓│  40
│▓  The full pipeline                   ▓│      the seven roles as text.
│▓  Spec Writer, Designer, Programmer,  ▓│      Designer and Release Watcher
│▓  Test Engineer, Security Auditor,    ▓│      are here and not on the floor
│▓  Reviewer, Release Watcher.          ▓│      (§C.2). small 14px, chalk@72%
│▓                                      ▓│  72
╞════════════════════════════════════════╡
│                                        │  72  --sheet
│   Four things we don't hand            │      display-section
│   to an agent.                         │
│                                        │  40
│ 01  Architecture review                │      the ONLY numbered sequence on
│     Before a line is written, a        │      the site. §9.4 permits it: the
│     person decides the shape...        │      gates are genuinely ordered.
│                                        │      numeral hung in the 20px
│ 02  Code review                        │      margin at 360; title Anek 600
│     Every change is read by a          │      20px; body 16/26 --muted
│     human before it merges...          │
│                                        │
│ 03  QA on real devices                 │
│     Physical phones, not just an       │
│     emulator...                        │
│                                        │
│ 04  Security and privacy review        │
│     What the app collects, where       │
│     it goes, what's stored...          │
│                                        │  40
│   That's the difference between        │      closing line, display-section
│   generated software and shipped       │      --floor. NOT a card, NOT a
│   software.                            │      pull-quote. Just the line.
│                                        │  72
╞════════════════════════════════════════╡
│░░░░░░░░░░░░░░ --band ░░░░░░░░░░░░░░░░░░│  72  full-bleed band
│░                                      ░│
│░  We run this on our own app first.   ░│      display-section
│░                                      ░│  32
│░  Pocket Manager has been in the      ░│      body --muted
│░  Play Store since 2020, maintained   ░│
│░  by the same pipeline...             ░│
│░                                      ░│  16
│░  4.3★   24 reviews   1K+ installs    ░│      numeral-large 24px tabular
│░  ────   ──────────   ───────────     ░│      + micro label under each.
│░                                      ░│      3 across at 320: 96px each.
│░                                      ░│  24
│░  Open it in the Play Store           ░│      real link, no arrow glyph
│░                                      ░│  40
│░  ┌──────────────────────────────┐    ░│      COMPACT STAGE VIEW (§E.3)
│░  │ Pocket Manager               │    ░│      mobile form: name, 5-node
│░  │ ●─●─●─●─◉        Live        │    ░│      mini track, current stage
│░  ├──────────────────────────────┤    ░│      named as text.
│░  │ [second app]                 │    ░│      [BLOCKED: does product 2
│░  │ ●─●─◉╌○╌○   Final touches    │    ░│       appear at all? Q9]
│░  └──────────────────────────────┘    ░│
│░                                      ░│  24
│░  A second app is in final touches    ░│      body --muted
│░  behind it...                        ░│
│░                                      ░│  72
╞════════════════════════════════════════╡
│                                        │  72  --sheet. quietest section.
│   You'll be holding something          │      display-section
│   before you're bored of the           │
│   kickoff.                             │
│                                        │  24
│   The first thing we hand over is a    │      body
│   working build you can open on        │
│   your phone.                          │
│                                        │
│   [FILL — timeline, engagement         │      visible TODO per §4. does not
│    model, first conversation]          │      ship; blocks the Copy gate.
│                                        │  72
╞════════════════════════════════════════╡
│▓▓▓▓▓▓▓▓▓▓ --floor, FULL BLEED ▓▓▓▓▓▓▓▓▓│  72  bookends the room.
│▓                                      ▓│
│▓  Tell us what you're building.       ▓│      display-section --chalk
│▓                                      ▓│  24
│▓  One email, a real reply from one    ▓│      body chalk@72%
│▓  of us, and a straight answer.       ▓│
│▓                                      ▓│  32
│▓  thegeekdogs@gmail.com               ▓│      numeral-large size, Anek 600,
│▓  ─────────────────────               ▓│      --lamp (7.56:1 on floor, so
│▓                                      ▓│      legal here and ONLY here)
│▓                                      ▓│  72
│▓  Work        Sahib                   ▓│      FOOTER NAV. the four COPY.md §1
│▓  Tanya       Contact                 ▓│      labels repeated 2-up, small
│▓                                      ▓│      14px --chalk, 44px rows. the
│▓                                      ▓│  24  second route to every page.
│▓  Sahib on GitHub                     ▓│      small, chalk@72%
│▓  Tanya on GitHub                     ▓│
│▓                                      ▓│  24
│▓  TheGeekDogs. A two-person mobile    ▓│      micro, chalk@72%. studio line,
│▓  studio.                             ▓│      rights line and the employer
│▓  © 2026 TheGeekDogs                  ▓│      note, stacked on their own
│▓  Company names on this site are the  ▓│      lines. no middle dots anywhere
│▓  founders' employment history...     ▓│      in this block (§9.4).
│▓                                      ▓│  56  reserve for the sticky plate
╞════════════════════════════════════════╡
│▒▒▒▒ thegeekdogs@gmail.com  (--lamp) ▒▒▒│  56  PERSISTENT CONTACT (§B.10)
└────────────────────────────────────────┘      sticky bottom bar, released
                                                before the final CTA.
```

**How the other four pages are reached at 360, and why there is no hamburger.** The nav is a
plain row of four links sitting on its own 44px line directly under the wordmark, and the same
four labels repeat as a 2-up block in the footer. `Work`, `Sahib`, `Tanya` and `Contact` at 14px
measure roughly 236px of the 320px content width including three 24px gaps, so all four fit on one
line with real 44px targets and nothing has to be hidden behind a control. That is the whole
argument for this over a disclosure: a hamburger costs a button, a panel, a focus trap, an
`aria-expanded` state and a tap before anyone can see where the site goes — more code and more
interaction than simply printing the four destinations, which is the same trade the floor's fixed
card slot makes in §C.6. It also means the navigation is **one component at every breakpoint**:
the 360 row and the 1440 header carry identical labels in identical order, wrap instead of
collapse, and the footer repeat is the second route to every page from the bottom of every page,
which is what satisfies the §14 QA gate. The header is still not sticky and it still holds no
contact link — the contact action is the persistent plate (§B.10), which is why slot 4 can be
`Contact` rather than `Email us`. Cost to the fold: the header grows 64 → 92px, which puts the
primary CTA's bottom edge at ~464px on a 640-tall viewport. It stays above the fold, so §B.7's
subhead constraint is unchanged.

### B.9 Home page, 1440

Content 1200, 12 cols × 78 + 11 gutters × 24, outer 60. Column ruler shown as `1..12`.

```
   ├──1──┼──2──┼──3──┼──4──┼──5──┼──6──┼──7──┼──8──┼──9──┼─10──┼─11──┼─12──┤

┌──────────────────────────────────────────────────────────────────────────┐
│ thegeekdogs                            Work    Sahib    Tanya    Contact │ 72
│                                                                          │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                     160  │  --sheet
│ AI writes a lot of our code.                                             │  h1 60/1.04
│ It doesn't get the last word.                        (cols 1-9)          │  2 lines, one
│                                                                          │  sentence each
│ TheGeekDogs is a two-person studio running an                            │  body 17/28
│ agent fleet on every build...          (cols 1-6, 62ch)                   │  --muted
│                                                                          │
│ [ Start a project ]  [ Look around the floor ]     (cols 1-5)            │
│                                                                          │
│                                        cols 8-12 DELIBERATELY EMPTY.     │  the only void
│                                        the void sets up the room that    │  on the page.
│                                        arrives full-bleed next. if the   │  reserved
│                                        headshot route resolves (Q23),    │  520 x 420 so
│                                        the two portraits land here.      │  filling it
│                                        [BLOCKED: headshot route]         │  causes no
│                                                                     160  │  reflow.
╞══════════════════════════════════════════════════════════════════════════╡
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ FULL BLEED --floor. THE ROOM. ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│ 128
│▓                                                                        ▓│
│▓ Two desks have people at them.                                         ▓│  display-section 40px
│▓ The rest are agents. One chair                    (cols 1-8)           ▓│  --chalk. COPY.md §2.2
│▓ stays empty on purpose.                                                ▓│  verbatim. 3 lines here,
│▓                                                                        ▓│  4 at 360 (§B.8).
│▓ Open any desk to see the job and the human who checks it.              ▓│  instruction, body 17/28
│▓                                        [COPY NEEDED: <=12 words]       ▓│  chalk@72%, 1 line.
│▓                                                                        ▓│
│▓ ┌────────────────────────────────────────┐  ┌───────────────────────┐  ▓│
│▓ │                                        │  │ CARD SLOT             │  ▓│
│▓ │   isometric scene, cols 1-8            │  │ cols 9-12, 366 wide   │  ▓│
│▓ │   856 x 520, 5 wide x 4 deep plan      │  │ vertically centred    │  ▓│
│▓ │   see §C.3 for the station plan        │  │ to the scene          │  ▓│
│▓ │                                        │  │                       │  ▓│
│▓ │   the empty chair sits alone at        │  │ min-height reserved   │  ▓│
│▓ │   near-right, lit, with two clear      │  │ for the longest card  │  ▓│
│▓ │   floor modules of nothing around it   │  │                       │  ▓│
│▓ │                                        │  │ default = Ship        │  ▓│
│▓ └────────────────────────────────────────┘  │ approval              │  ▓│
│▓                                             └───────────────────────┘  ▓│
│▓                                                                        ▓│
│▓ The full pipeline                                                      ▓│
│▓ Spec Writer, Designer, Programmer, Test Engineer,      (cols 1-8)      ▓│  small, chalk@72%
│▓ Security Auditor, Reviewer, Release Watcher.                           ▓│  [set as a wrapped
│▓                                                                   128  ▓│   sentence, not a
╞══════════════════════════════════════════════════════════════════════════╡   dotted meta strip]
│                                                                     160  │  --sheet
│ 01  Architecture review                    │  That's the difference      │
│     Before a line is written, a person     │  between generated          │  the closing line
│     decides the shape: what the data       │  software and shipped       │  is anchored in
│     looks like, where the boundaries       │  software.                  │  cols 9-12,
│     are.                (cols 2-7)         │                             │  vertically
│                                            │  (cols 9-12,                │  centred to the
│ 02  Code review                            │   display-section)          │  whole group.
│     Every change is read by a human...     │                             │  it is not a
│                                            │                             │  card and not a
│ 03  QA on real devices                     │                             │  pull-quote.
│     Physical phones, not just an           │                             │
│     emulator...                            │                             │
│                                            │                             │
│ 04  Security and privacy review            │                             │
│     What the app collects, where it        │                             │
│     goes, what's stored, what's exposed.   │                             │
│                                                                     160  │
╞══════════════════════════════════════════════════════════════════════════╡
│░░░░░░░░░░░░░░░░░░░░ FULL BLEED --band ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 128 ░│
│░                                          │                             ░│
│░ We run this on our own app first.        │  Pocket Manager             ░│  the compact
│░                          (cols 1-5)      │  ●───●───●───●───◉          ░│  two-product
│░ Pocket Manager has been in the Play      │  Specced Building Final  ... ░│  stage view.
│░ Store since 2020, maintained by the      │                             ░│  ONE set of
│░ same pipeline and the same review        │  [second app]               ░│  column headers,
│░ gates.                                   │  ●───●───◉╌╌╌○╌╌╌○          ░│  two runners.
│░                                          │                             ░│  (cols 7-12)
│░ 4.3★      24          1K+                │  one shipped, one nearly    ░│  §E.3
│░ rating    reviews     installs           │  there.                     ░│
│░                                          │  [COPY NEEDED: <=8 words]   ░│
│░ Open it in the Play Store                │                             ░│
│░                                                                    128 ░│
╞══════════════════════════════════════════════════════════════════════════╡
│                                                                     160  │  --sheet
│           You'll be holding something before you're                      │  quietest
│           bored of the kickoff.              (cols 3-10)                 │  section on the
│                                                                          │  site. one
│           The first thing we hand over is a working build you            │  display line,
│           can open on your phone.            (cols 3-9, 62ch)            │  one paragraph,
│                                                                          │  no device, no
│           [FILL — timeline, engagement model]                            │  card, nothing.
│                                                                     160  │
╞══════════════════════════════════════════════════════════════════════════╡
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ FULL BLEED --floor. bookends the room. ▓▓▓▓▓▓▓▓▓▓▓ 128 ▓▓│
│▓                                                                        ▓│
│▓ Tell us what you're building.        (cols 1-6)                        ▓│
│▓                                                                        ▓│
│▓ One email, a real reply from one of us, and a straight                 ▓│
│▓ answer about whether we're the right fit.                              ▓│
│▓                                                                        ▓│
│▓ thegeekdogs@gmail.com     (--lamp, 7.56:1, legal on floor only)        ▓│
│▓                                                        cols 8-12 empty ▓│
│▓ ────────────────────────────────────────────────────────────────       ▓│
│▓ github.com/hellosahib   github.com/Tanya-jain99          (micro)   128 ▓│
└──────────────────────────────────────────────────────────────────────────┘
                              ┌──────────────────────────┐
                              │ thegeekdogs@gmail.com    │  PERSISTENT CONTACT:
                              └──────────────────────────┘  260x56 plate, --lamp
                                            (bottom-right, 16px inset, released
                                             before the final CTA section)
```

**Layout families used, one each:** asymmetric-left hero with a void; full-bleed scene plus fixed slot; hung-numeral list with an anchored closing line; split band with a diagram; narrow centred statement; full-bleed inverted CTA. Six sections, six families — nothing repeats.

**One deliberate exception to page-theme lock:** the floor and the final CTA invert to `--floor` while the rest of the page is `--sheet`. This is not section-level theme flicker; the room is a place, entered once and bookended once, and inverting it is what makes it read as somewhere rather than as a panel.

### B.10 The persistent contact affordance

§8: not a chat bubble, not an exit modal. It is the empty chair's nameplate, reused — the same amber plate with ink text, because the thing you are being invited to do is talk to the person who signs off.

- **Mechanism:** `position: sticky; bottom: 0` on an element inside a wrapper that spans from the end of the hero to the start of the final CTA. It appears when the hero leaves, follows down the page, and retires on its own when the real CTA arrives. No JS, no scroll listener, no dismiss state.
- **< 768:** full-bleed bar, 56px tall, `--lamp` fill, 2px `--floor` top border, the email as a `mailto:` link filling the bar. Whole bar is the target.
- **≥ 768:** 260 × 56 plate, bottom-right, 16px inset from the viewport, same colours, same 2px border.
- **Reserve:** every section it can overlay gets +56px bottom padding, so it never covers content and never causes CLS.
- Contrast: `--floor` on `--lamp` = 7.56 : 1; plate boundary against `--sheet` via its ink border = 13.53 : 1.

### B.11 `/work/*`, `/contact/`, `/404`

Same tokens, same grid, no new devices.

- **`/work/`** — two entries, each a `--band` block: product name, one line, the full labelled build-stage track (§E), a store link where one exists. No hero image. `[COPY NEEDED: /work/ index intro, ≤ 20 words]`
- **`/work/pocket-manager/`** — problem, build, review process, outcome, store link, per §8. Screenshots in the real device aspect ratio (portrait 9:19.5), max two above the fold, explicit dimensions. The full stage track sits directly under the h1 because "Live" is the strongest fact on the page.
- **`/work/wedding-planner/`** — identical shell, descriptive title, stage at Final touches, no dates anywhere, no store link (there is nothing to link to). `[BLOCKED: whether this route ships at all — QUESTIONS.md item 9.]`
- **`/contact/`** — three addressed blocks per §8 (studio, Sahib, Tanya) as a 3-up at ≥1024, stacked at 360. No orchestrated moment; a contact page's job is to be answered, not performed. `[BLOCKED: whether this page carries a form at all, or only the email — depends on QUESTIONS.md items 1 and 11.]`
- **`/404`** — the only page that shows an **empty room**: the floor slab and the lamp, no desks, no chair. It reuses the floor's slab symbol and its lamp gradient and adds nothing, so it costs roughly zero new bytes. One line, one link home. `[COPY NEEDED: 404 line, ≤ 12 words.]` This is the one joke the site gets, and it is a joke that is also the argument.

---

## C. The studio floor (§6)

### C.1 Projection and light

Standard 2:1 isometric (30° rows), camera at front-centre. Single light source upper-left, which is the same light that lifts the work cards' top-left edge. Floor modules are 128 × 64 in scene units. The scene never rotates, never parallaxes, and never responds to the pointer position — it is a room you look at, not a toy you spin.

Four fills in the whole scene, all derived from the six tokens:

| Fill | Value | Use |
|---|---|---|
| floor slab | `--floor` | the ground |
| surface, lit | `--chalk` @ 22% over floor | desk tops, chair seat |
| surface, shadow | `--floor` darkened, `#0A1E21` | desk right faces, contact shadows |
| glow | `--chalk` @ 55–85% | monitors |
| lamp | `--lamp`, one 2-stop linear gradient | the empty chair's cone only |

### C.2 Five agent desks, not seven

**Decision: two human desks + five agent desks + one empty chair = eight stations.**

§6 asks for five to six agent desks; §7's table lists seven roles and says to cut to five if the floor gets crowded, keeping Security Auditor and Reviewer. At 360 with a portrait room, eight stations already give ~88 × 72 targets; nine or ten would drop below a comfortable touch target, and the brief is explicit that accessibility is never what gets cut.

The five on the floor are chosen so that **every human gate in §7 is represented at least once**, which makes the scene legible as a pipeline rather than as a mascot lineup:

| Desk | Gate it feeds |
|---|---|
| Spec Writer | Architecture review |
| Programmer | Human code review |
| Test Engineer | QA pass |
| Security Auditor | Security review |
| Reviewer | Human code review |

The order of that table is **COPY.md §2.4's pipeline order** — spec, code, tests, scan, review —
and it is the order used by the plan below, by the DOM and by the tab order in §C.8. Pass 1 put
Reviewer third, next to Programmer, on the grounds that the two share a gate. That was the wrong
read: work is written, then tested, then scanned, and the human diff review is the last thing
that happens before the release cut, which is why the Reviewer desk is the one immediately
upstream of the empty chair. Copy owns the pipeline narrative and the narrative is the argument,
so the design follows it.

**Designer** and **Release Watcher** appear in the roster text directly beneath the scene, per §7's instruction. The desk count does **not** change between breakpoints — the DOM roster is one list, and changing its contents with viewport width would break §6's semantic-first requirement.

One flag: omitting **Designer** from the visible floor may read as the studio quietly acknowledging it has no design discipline (§5.4 says neither founder is a designer). That is a real risk and it is open question 3 below.

### C.3 Composition — plan

ASCII cannot honestly draw isometry, so this is the **plan** (top-down). The projection maps plan-x to screen right-down and plan-y to screen right-up; the near corner of the plan is the bottom of the screen.

**Desktop plan, 5 modules wide × 4 deep (scene 856 × 520 at 1440):**

```
  back-left ──────────────────────────────────────────── back-right
   ┌────────┬────────┬────────┬────────┬────────┐
 1 │        │ SPEC   │        │ PROG-  │        │   row 1, far
   │   ·    │ WRITER │   ·    │ RAMMER │   ·    │
   ├────────┼────────┼────────┼────────┼────────┤
 2 │ SAHIB  │        │ TEST   │        │ SECUR. │   row 2
   │ ▓▓▓▓   │   ·    │ ENGIN. │   ·    │ AUDITOR│
   ├────────┼────────┼────────┼────────┼────────┤
 3 │ TANYA  │        │ REVIEW │        │        │   row 3
   │ ▓▓▓▓   │   ·    │ -ER    │   ·    │   ·    │
   ├────────┼────────┼────────┼────────┼────────┤
 4 │        │        │        │        │ ┌────┐ │   row 4, near
   │   ·    │   ·    │   ·    │   ·    │ │CHAIR│ │
   │        │        │        │        │ │ ☐   │ │
   └────────┴────────┴────────┴────────┴────────┘
  front-left ────────────────────────────────────── front-right
                                            ▲
                         the whole of row 4 is empty except this
```

**How the eye is led to the empty chair — five mechanisms, all free:**

1. **It is the only station that does not move.** Every other desk has a monitor glow on a slow idle loop. The chair does not. In a moving field, the still thing is what you look at (principle 4). This is the whole trick and it costs nothing.
2. **It is the only lit thing.** A pendant lamp above it casts a cone in `--lamp` onto the desk. It is the single largest area of accent colour on the entire site, and `--lamp` appears nowhere else in the scene.
3. **Emptiness around it.** Row 4 is otherwise completely bare — four empty modules to its left. Every other station has a neighbour within one module. From A.3: one thing is allowed to be loud, and it earns it with the space around it.
4. **It is nearest.** Front-right in an isometric projection is the closest cell to the viewer and renders largest.
5. **It is downstream.** Reading the plan as a pipeline, work moves back-to-front and left-to-right, and it now reads in COPY.md §2.4's order exactly — Spec Writer and Programmer across the far row, Test Engineer and Security Auditor across the middle, Reviewer alone above the chair; the chair is the terminal node. The two human desks in column A are angled so their monitors face across the room toward it.

### C.4 Human desks vs agent desks

They must read as the same room but not the same class of thing. §6: humans get "more detail and warmth", agents are "deliberately more schematic".

| | Human desk | Agent desk |
|---|---|---|
| Footprint | 1.5 × 1 modules | 1 × 1 module |
| Silhouette | Bespoke geometry per person — desk, monitor, a chair that is pulled out at a slight angle, and one personal object each `[BLOCKED: what object — nothing in §5 supports inventing one; until answered, both human desks ship with a second monitor instead, which is supportable and neutral]` | One shared `<symbol>`, instanced five times with only a translate. Identical to each other on purpose. |
| Chair | Present, occupied, pulled out | Present, pushed in, square to the desk |
| Nameplate | Name in `--chalk`, title case, Anek 600 | Role in `--chalk` @72%, Instrument 600, smaller |
| Detail budget | ~14 path segments each | ~9 path segments, shared |
| Warmth | Desk top gets the lit fill at 22%; the human desks additionally get a 6% warm offset toward `--lamp` in their surface fill, which is below the threshold at which it reads as a colour and above the threshold at which the room feels uneven | Neutral lit fill only |

The distinction is carried by **footprint, uniqueness and occupancy**, in that order. Not by colour, and not by size alone — five identical things next to two different things is the read, and it is the honest one.

### C.5 Idle state — one loop

One loop for the whole scene, on one property.

- **What moves:** the monitor glow rectangle's `opacity`, and nothing else. No transform, no position, no colour change, no scale. Zero layout, zero paint outside the glow rect, composited.
- **Amplitude:** opacity 0.55 → 0.85 → 0.55. ±0.15 around a 0.70 midpoint.
- **Period:** 4800ms, easing `cubic-bezier(.4, 0, .6, 1)` — symmetric, so the loop has no direction and no perceptible "start".
- **Phase:** each desk offset by `index × 600ms`. Seven working stations across 4800ms means they are never in unison. A unison pulse reads as a page-wide effect; staggered pulses read as seven people working independently, which is the point.
- **The empty chair does not participate.** Its lamp cone is static at full. See C.3 mechanism 1.
- No blink, no cursor, no typing. §6 says "one idle loop, low amplitude, no jitter" and this is the minimum thing that satisfies "reads as working".

### C.6 The interaction card

**Contents**, in this order:

1. Name (human) or role (agent) — Anek 600, title size, `--chalk`.
2. One line of what they do — Instrument 400, body, `--chalk` @72%.
3. **For agents only:** a distinct sub-block, separated by 16px and a 1px `rgba(232,237,233,.16)` rule — the label "Checked by" in micro `--chalk`@72%, then the gate name in Instrument 600 body `--chalk`. §6 is explicit that the flex and the reassurance arrive in the same card and must not be split, so this sub-block is part of the card, never a separate tooltip or a second interaction.
4. **For the chair:** the Ship approval copy, no worker, no "Checked by" block. It is the only card with an absence in it, and the absence is visible because every other card has a block there and this one has empty space.

**Placement — a fixed slot, not a cursor-following popover.** This is a change from PLAN.md §4.3 and it is a visual-judgement call, not a feasibility one (it is also strictly less code — no `popover`, no anchor positioning, no light-dismiss, no focus containment). The Engineer is updating PLAN.md §4.3 to the fixed slot in this round, so the popover and the bottom sheet come out of that document and the two specs do not disagree.

- **≥ 1024:** cols 9–12, 366px wide, vertically centred to the scene, min-height reserved for the longest card so nothing reflows.
- **768–1023:** below the scene, full content width, min-height reserved.
- **< 768:** below the scene, full width. See C.7.
- **Default content at every breakpoint: the empty chair's card.** Nobody has to interact to receive the argument. This is the single highest-value decision in the floor spec, because most visitors will not touch anything.
- Hover, focus and tap all replace the slot's content, identically, in the same place. Nothing important is behind a hover (principle 3).

### C.7 Mobile decision: **tappable floor, portrait re-plan, panel below**

**Decision: a tappable floor with the card panel pinned directly below the scene. Not a vertical roster, and not a bottom sheet.**

Why not a vertical roster: the floor is the one bold moment on the site, and 80%+ of traffic is mobile. Throwing the moment away on the viewport where it matters most is exactly the "reduced, not designed" outcome §6 forbids.

Why not a bottom sheet (PLAN.md §4.3's default): a sheet covers the room, so you cannot see the desk you just tapped while reading its card; dismissing it costs a gesture; and it means the default state on load is "no card", which throws away the free argument in C.6.

Why not shrink the desktop plan to fit: 5 modules across 320px gives ~64px desks. Below a comfortable target and illegible.

**The move:** the same eight stations are re-planned into a **portrait room, 2 modules wide × 4 deep**, scene 320 × 470. Same `<symbol>`s, same DOM, same order, different `<use>` transforms and `viewBox` — a layout change, not a content change. Targets land at ~88 × 72.

**360 wireframe of the floor section:**

```
┌────────────────────────────────────────┐ 360
│▓▓▓▓▓▓▓▓ --floor, full bleed ▓▓▓▓▓▓▓▓▓▓▓│
│▓                                      ▓│
│▓  Two desks have people at            ▓│  display-section 27px --chalk.
│▓  them. The rest are agents.          ▓│  COPY.md §2.2 verbatim, four lines
│▓  One chair stays empty on            ▓│  at 320 (see §B.8 for the count).
│▓  purpose.                            ▓│  [COPY NEEDED, <=12 words]
│▓                                      ▓│  16
│▓  Open any desk to see the job and    ▓│  instruction line, body 16/26,
│▓  the human who checks it.            ▓│  chalk@72%, two lines.
│▓                                      ▓│  32
│▓  ┌──────────────────────────────┐    ▓│  scene 320 x 470
│▓  │  plan: 2 wide x 4 deep       │    ▓│  (drawn here as plan, not iso)
│▓  │  ┌─────────┬─────────┐       │    ▓│
│▓  │  │ SAHIB   │ SPEC    │ row 1 │    ▓│  humans in the near-left column
│▓  │  │ ▓▓▓▓▓   │ WRITER  │       │    ▓│  so the two people are the first
│▓  │  ├─────────┼─────────┤       │    ▓│  thing read, top-left, and the
│▓  │  │ TANYA   │ PROG-   │ row 2 │    ▓│  first thing in tab order
│▓  │  │ ▓▓▓▓▓   │ RAMMER  │       │    ▓│
│▓  │  ├─────────┼─────────┤       │    ▓│
│▓  │  │ TEST    │ SECUR.  │ row 3 │    ▓│  agents run in COPY.md §2.4's
│▓  │  │ ENGIN.  │ AUDITOR │       │    ▓│  pipeline order, read row-major
│▓  │  ├─────────┼─────────┤       │    ▓│
│▓  │  │ REVIEW  │         │ row 4 │    ▓│  the chair keeps its isolation:
│▓  │  │ -ER     │  ┌────┐ │       │    ▓│  one empty module to its left,
│▓  │  │         │  │CHAIR│ │  ◀── │    ▓│  nearest to the viewer, lit,
│▓  │  └─────────┴──┴────┴─┴───────┘    ▓│  and still
│▓  └──────────────────────────────┘    ▓│
│▓                                      ▓│  20
│▓  ┌──────────────────────────────┐    ▓│  CARD PANEL, always visible,
│▓  │ Ship approval                │    ▓│  never an overlay, no dismiss.
│▓  │                              │    ▓│  min-height 168 reserved for
│▓  │ This chair stays empty. No   │    ▓│  the longest card.
│▓  │ agent decides that something │    ▓│  default = the chair.
│▓  │ is ready for your users.     │    ▓│
│▓  │ A person does, every         │    ▓│  the selected desk keeps a
│▓  │ release, every time.         │    ▓│  persistent selected state in
│▓  └──────────────────────────────┘    ▓│  the scene, so the panel and
│▓                                      ▓│  the room stay connected
│▓  The full pipeline                   ▓│
│▓  Spec Writer, Designer, Programmer,  ▓│  the two off-floor roles are
│▓  Test Engineer, Security Auditor,    ▓│  here, in text
│▓  Reviewer, Release Watcher.          ▓│
│▓                                      ▓│
└────────────────────────────────────────┘
```

At 360 the room is entered from the near-left where the two people are, and read downward to the chair. That is the same argument as the desktop plan, told in a portrait room.

### C.8 Keyboard

- **Tab order:** Sahib → Tanya → Spec Writer → Programmer → Test Engineer → Security Auditor → Reviewer → Ship approval. Humans first, chair last, and the five agents in COPY.md §2.4's pipeline order — tests, then scan, then review, then the release cut. This is DOM order at every breakpoint regardless of visual position, because the order is the argument, and the argument is Copy's to state.
- **Focus treatment:** the two-tone ring from §B.2, on the room's surface: 3px `--chalk` outer (12.74 : 1 against `--floor`) + 2px `--lamp` inner, 3px offset, 4px radius, following the desk button's rectangle rather than the desk's silhouette — a ring that traces an isometric parallelogram is illegible at 2px and expensive to draw.
- **Focus is never the only indicator.** A focused desk also takes the selected fill (its desk-top surface lifts to `--chalk` @ 34%) and updates the card slot, exactly as hover and tap do.
- Skip link above the floor. The floor's roster is reachable and readable in order by screen reader with the SVG `aria-hidden`, per PLAN.md §4.1.

### C.9 Reduced motion — the still state

`prefers-reduced-motion: reduce` removes the "Lights on" moment (§H) and the idle loop. It removes nothing else.

The still frame is **designed, not stopped**: each monitor glow renders at a *different* static opacity — 0.62, 0.70, 0.78, 0.66, 0.74 for the five agents, 0.80 for each human desk — so the room reads as seven stations lit slightly differently, which is what a room looks like. A uniform 0.70 across all seven would look switched-off-but-on. The lamp cone is at full. The card slot still swaps content on interaction, instantly, with no fade and no slide.

Nothing is missing from this frame. It is a finished picture of the same room.

### C.10 Weight strategy — hitting ≤ 80 KB gzipped

The Engineer calls this the tightest line on the site (PLAN.md §7). The composition is built to leave headroom rather than to consume it.

- **Shared symbols.** One `<symbol>` for the agent desk, instanced 5× with `<use transform="translate(x,y)">`. One for the empty chair. One for a floor module. Only the two human desks are bespoke geometry, and they share their monitor and chair sub-symbols with the agent desk.
- **Two plans, one geometry.** The portrait mobile plan is the *same* symbols at different `<use>` transforms, swapped by CSS at the breakpoint. There is not a second scene.
- **Four fills, no more** (§C.1). One `<linearGradient>` in total, for the lamp cone.
- **No `<filter>` anywhere.** No `feGaussianBlur`, no `feDropShadow`. Contact shadows are flat opaque parallelograms at a fixed offset. This is both the budget decision and the mobile-paint decision (PLAN.md §10.4).
- **No embedded raster, no base64, no external asset.**
- **Coordinates rounded to one decimal**, integer where possible; a 128 × 64 module grid makes most vertices integral by construction.
- **Text is real DOM text**, never outlined paths — it stays selectable, crisp at any zoom, and translatable.
- **No per-desk bespoke CSS.** Desk positions come from a single `--x` / `--y` custom-property pair per button, set once; the CSS rule is written once. This is aimed at the Engineer's specific concern that per-desk positioning CSS is the biggest unknown in the CSS budget.

Rough accounting: symbols ~2.5 KB raw, floor slab + seams ~1 KB, eight `<use>` + eight buttons + labels ~3.5 KB, scene CSS ~4 KB, floor JS ~4 KB. Well inside the line before compression. **The headroom is deliberately not spent.** If the composition has to grow, it grows into detail on the two human desks, because those are the ones §6 says are the point.

---

## D. Work cards (§6.1)

### D.1 Dimensions

| | 360 | 1024 |
|---|---|---|
| Layout | 1 column | 2 columns |
| Card width | 320 (full content) | 316 |
| Min height | 168 | 196 |
| Gap | 28 vertical | 32 vertical, 32 horizontal |
| Padding | 20 all round, 24 bottom | 24 all round, 28 bottom |

The 28px vertical gap is not arbitrary: a 320px card tilted 2.5° overshoots ~7px at each end, so 28px keeps ≥ 20px of real air between cards and stops the tilts from reading as collisions. At 1440 the grid goes to 3 columns at 328 wide.

### D.2 The base and the contact shadow

The card meets a surface, and the surface is directly beneath it.

- **Stand:** a 4px-tall bar, 56% of the card width, centred, flush with the card's bottom edge, filled `--band` with its lowest 1px at `rgba(15,42,46,.22)`. It reads as the lip of an acrylic holder.
- **Contact shadow:** `0 2px 3px -1px rgba(15,42,46,.38)` — tight, dark, immediately under the stand.
- **Ambient shadow:** `0 10px 24px -12px rgba(15,42,46,.16)` — wide, faint, well below the contact shadow's density.

The ratio between them is the whole illusion: a floating div gets one soft shadow, an object resting on a counter gets a dark tight one plus a faint wide one. Both are `box-shadow`, neither is a filter, neither ever animates.

### D.3 The edge

Real acrylic catches light on its cut edge, and the light comes from upper-left (§B.1).

Two inset box-shadows rather than four borders, so the corners have no seam:

- `inset 1px 1px 0 rgba(255,255,255,.72)` — top and left, lit
- `inset -1px -1px 0 rgba(15,42,46,.14)` — bottom and right, in shade

Corner radius 3px across every card and every hierarchy level on this site. One radius scale, no exceptions — §9.4's SaaS-card-kit ban is partly about radius soup, and 3px is small enough to read as a cut edge rather than as a UI card.

### D.4 Tilt

Under 3°, varied, deterministic by index so it is reproducible and printable. `transform-origin: bottom center`, so the stand stays planted while the card leans.

| Card index | Rotation |
|---|---|
| 1 | −1.4° |
| 2 | +0.8° |
| 3 | −2.1° |
| 4 | +1.7° |
| 5 | −0.6° |
| 6+ | repeat the cycle |

Never animated, at any breakpoint, under any motion preference. It is a layout property (§6.1 says so explicitly). Removed only in print.

### D.5 Typography, mapped to the shelf-talker

```
┌──────────────────────────────────┐
│                                  │
│  Motive                          │  company. Anek 600, 22/26 at 360,
│  Fleet management, US            │  24/28 at 1024. --floor. THE THING.
│                                  │  one line under it: Instrument 400,
│  2023 - 2025                     │  14/20, --muted, <= 38 chars.
│                                  │
│  ──────────────────────────────  │  the number, in the price position:
│  Android Engineer                │  Anek 500, wdth 87.5, tabular,
│  Motive Fleet App                │  24px at 360 / 28px at 1024, --floor.
│  Kotlin                          │  hyphen, not en-dash.
│                                  │
└──────────────────────────────────┘  1px rgba(15,42,46,.12) full width.
      ▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁              role: Instrument 600, 13px, --floor.
                                    product: Instrument 400, 13px, --muted.
                                    stack: Instrument 400, 13px, --muted.
```

Four levels, and the order is the shelf-talker's, not a CV's: **company largest → dates in the price position → role and products as small print.** §6.1 is explicit that the title does not go in the price position, because a visitor scanning a work history is scanning for duration.

**One change from §7's source table:** §7 renders products and stack as `Motive Fleet App · Kotlin`. §9.4 bans middle-dot meta strings. On the card they are two lines. The information is identical and the template tell is gone.

Semantics (also PLAN.md §5.5): the cards are a `<ul>` of roles read as company → dates → role → products. Everything above is CSS over that list.

### D.6 Backdrop treatment — option 2, static translucent white, no live blur

§6.1 offers three. **Choose: a static semi-transparent white with an optional fine noise, and no `backdrop-filter` at all.** This matches the Engineer's default (PLAN.md §5.1) and it is the right call on three independent grounds:

1. **Option 3 (blur on hover/focus only) is disqualified by the brief itself.** It means the object's material appears only for pointer users. Touch has no hover (§4), so 80%+ of traffic would see a different object. That is not a perf trade-off, it is a broken design.
2. **Option 1 (one shared blurred layer) still costs a compositing layer that has to be re-rasterised as it scrolls, on the exact pages where a visitor scrolls a column of a dozen cards** — the person pages. The INP risk in §11 is real and this is where it would land.
3. **The illusion does not need it.** §6.1 says three details carry it: a base, an edge, a tilt. All three are in place and all three are free. A live blur would be adding the expensive fourth thing to prop up three cheap things that already work.

Option 2 is also the only one of the three that prints correctly, that is identical under `prefers-reduced-transparency`, and that behaves identically on every device — which matters on a site arguing that it tests on real hardware.

**Spec:** card fill = white at **82%** on light grounds, **90%** on dark grounds (see §F.4 for why). Optional noise: a single tiled SVG turbulence pattern at 96 × 96, `opacity .035`. The noise is on the "remove one thing" list (§J) — the card works without it.

### D.7 The controlled background band, and the worst case

**Rule: nothing but `--sheet` or `--band` may sit behind a work card in the studio world.** No photograph, no gradient, no floor. This is the constraint PLAN.md §10.8 asks for, stated as a design rule so the contrast check has a fixed worst case instead of a scroll-dependent one.

`--band` `#E2E6E1` is the darker of the two, so it is the worst case.

**Worst-case composite:** white at 82% over `#E2E6E1`
`R = 0.82(255) + 0.18(226) = 249.8` · `G = 0.82(255) + 0.18(230) = 250.5` · `B = 0.82(255) + 0.18(225) = 249.6`
→ effective card surface **`#FAFBFA`**, L = **0.962205**

| Card text | Ratio on `#FAFBFA` | AA body |
|---|---|---|
| `--floor` `#0F2A2E` (company, dates, role) | **14.55 : 1** | pass |
| `--muted` `#4E6468` (one-liner, products, stack) | **6.05 : 1** | pass |

**Safety margin:** if the Engineer needs more transparency, at 70% opacity the surface becomes `#F6F8F6` (L = 0.933815) and `--muted` still reads at **5.88 : 1**. So **0.70 is the floor and 0.82 is the spec.** Below 0.70, `--muted` must be replaced with `--floor` on the small print, and that is a design change, not a tuning knob.

### D.8 Print

Cards flatten to a plain CV, because somebody will print or PDF a person page. Under `@media print` the tilt goes to `transform: none`, the fill goes to solid `#fff`, every shadow and the stand and the edge highlight are removed, the card's own padding drops to zero, and the `<ul>` reflows to a single column with a single 1px bottom rule between items and no rule under the last; the company and the date range set on one line with the date right-aligned so a printed column of dates still scans, `--muted` resolves to `#444`, `--lamp` never prints, `page-break-inside: avoid` applies per item, the studio floor and the persistent contact plate are `display: none`, and the person's name and email print once at the top of page 1. The output should be a document you would attach to an email, which is the actual reason anyone prints this.

---

## E. Build-stage indicator (§6.2)

### E.1 Three states that survive greyscale

Each state differs on **three redundant channels** — size, internal structure, and the pattern of the line leading out of it — so removing colour, or removing lightness, still leaves two.

| | Done | Current | Future |
|---|---|---|---|
| Shape | filled disc | ring with a concentric core | hollow disc |
| Diameter | 10px | **18px** | 10px |
| Fill | `--floor` solid | core: `--floor` solid, 8px, with a 4px clear gap inside the ring | none — the ground shows through |
| Stroke | none | 3px `--floor` on the ring | 1.5px `rgba(15,42,46,.45)` |
| Outgoing connector | 2px solid `--floor` | 2px solid `--floor` | 2px **dashed** `rgba(15,42,46,.22)`, 4-4 |
| Label | Instrument 500, `--muted` | Instrument 600, `--floor` | Instrument 400, `--muted` |

The current node is the largest thing on the track and the only one with two concentric parts (principle 4 again: it is distinct by structure, not by shine). On `--floor` grounds the inner core becomes `--lamp` (7.56 : 1) — but that is emphasis only; the size and structure still carry it, so the greyscale test passes with colour switched off entirely.

Semantics: an `<ol>`, current step marked `aria-current="step"`. Not divs (§6.2).

### E.2 The full track

**≥ 768 — horizontal**, five nodes evenly spaced, labels beneath. "Submitted for review" wraps to two lines, so the label row reserves two lines of height for all five nodes and no layout shifts.

```
   ●───────●───────◉───╌╌╌╌○╌╌╌╌╌╌╌○
Specced  Building  Final    Submitted   Live
                   touches  for review
```

**< 768 — vertical**, because five labels across 320px gives 64px each and "Submitted for review" cannot set. Nodes in a column, connector vertical, label to the right, 44px row height.

```
 ●  Specced
 │
 ●  Building
 │
 ◉  Final touches            <- current, 18px, ring + core
 ╎
 ○  Submitted for review
 ╎
 ○  Live
```

No dates, no estimates, no "expected in" anywhere in this component. There is no slot for one, which is the point.

### E.3 Compact home variant — both products, one axis

§6.2 asks for one compressed view showing the pipeline at a glance: one shipped, one nearly there.

**≥ 768: one set of stage labels, two runners.** A single column header row carrying the five stage names, then two rows of nodes aligned to those columns, each row labelled with its product at the left. Because the two rows share one axis, the eye compares positions instead of reading two separate diagrams — the A.4 mechanism, applied.

```
                 Specced   Building   Final touches   Submitted   Live
                    │          │            │             │         │
 Pocket Manager     ●──────────●────────────●─────────────●─────────◉
                    │          │            │             │         │
 [second app]       ●──────────●────────────◉╌╌╌╌╌╌╌╌╌╌╌╌╌○╌╌╌╌╌╌╌╌╌○
```

**< 768: one row per product,** product name, a 5-node mini-track (nodes only, 140px total, no per-node labels), and the current stage printed as text beside it. Only the four non-current labels are dropped — the fact a visitor actually needs stays as words.

```
 Pocket Manager
 ●─●─●─●─◉                    Live

 [second app]
 ●─●─◉╌○╌○                    Final touches
```

The `<ol>` supplies the full label text in both forms; at < 768 the four non-current labels are visually hidden but present for screen readers, and the node graphics are `aria-hidden`.

`[BLOCKED: whether the second product appears at all (QUESTIONS.md item 9). If it does not, this component degrades to a single-runner track for Pocket Manager and the section keeps the §7 line about the app in build, attributed generically.]`
`[COPY NEEDED: the descriptive label for the second product in this view, ≤ 18 characters, since the placeholder name may not appear (§5.3).]`

---

## F. Sahib's world (§9.2)

His axis is **range**. Three directions were considered; two are proposed here with reasoning, the third is documented in the scratch file with the reason it was dropped.

### F.1 Direction S1 — the coverage map *(recommended)*

**The breadth itself is the composition.** The page's centre is a matrix: five columns for the surfaces he has shipped on — native iOS, native Android, KMP, Flutter, and *end to end with AI (backend, frontend, tests)* — crossed against the five places he has shipped from — Cleartrip, smallcase, Motive, Keenai Global, TheGeekDogs. Each cell that is filled names a real product. The takeaway is not any single cell; it is the **shape of the filled region**, which spans the whole width and seven years.

The fifth column exists in exactly one row: Keenai Global, 2025. It is the newest, smallest, and only lit region of the map. §5.4 calls the Keenai fact "the single most important fact on the page", and this composition makes it the visual event rather than a bullet in the middle of a scroll.

The finance thread is the texture, per §5.4's instruction to pick one spine and let the other be texture: four of the five rows are finance or fintech, and the row labels carry that as a one-line domain note rather than as a second diagram.

**Why this over the others:** it is the only one where a stranger gets the argument without reading; §9.2 literally describes it ("the breadth itself is the composition"); and it is the shape of contribution rather than a sequence, which keeps it distinct from Tanya's page in the way §9.2 asks.

**The honest-gap problem, and how the design handles it.** §5.4 asserts production work in all four stacks, but §7's work-card table attributes only Android/Kotlin, Dart/Flutter and the end-to-end AI work. Native iOS and KMP currently have no company or product behind them. So cells get **three** states, on the same grammar as §E:

| Cell state | Treatment | Means |
|---|---|---|
| Attributed | filled, product name printed inside | we can name the product |
| Asserted | outlined, 1.5px, no fill, no product name | the owners state it; no product named yet |
| Empty | nothing | no claim |

If the gap closes, the "asserted" state disappears and every cell is attributed. If it does not, the map ships with attributed cells only and one honest line beneath instead of two blank columns. Either way the layout survives and the gap is visible rather than hidden — which is the same discipline §7's proof section is selling.

`[BLOCKED: which employers or products carry Sahib's production native-iOS and KMP work? §5.4 asserts all four stacks; §7's table attributes only three. This is a hole in the page's central argument.]`

### F.2 Direction S2 — teaching-led

His writing is the entry point. The page opens with the three verified post subjects framed as the questions he answers — `channelFlow` vs `callbackFlow`; Android 16 dropping orientation locks and the duplicate-fragment bug; `ViewModel` vs `onSaveInstanceState` vs `SavedStateHandle` — with the work history underneath.

**The case for it:** to a technical buyer this is the most persuasive page we could build. Someone who explains reentrancy and lifecycle correctly in public is someone you trust with your architecture, and one of those posts drew 283 reactions and 13 reposts, which is a number and therefore usable (principle 2). It also links straight to §3: teaching is what review looks like when it is done out loud.

**Why not:** §5 verifies exactly three post subjects. A writing-led *spine* with three items is thin, and adding a fourth is the invention failure §14 warns about. It is retained as the recommended **second section** of S1 rather than as the page's structure, so it costs nothing now and can be promoted the moment more posts are confirmed.

### F.3 Recommended: **S1**, with S2's material as its second section.

### F.4 Tokens for S1

Sahib's world inverts the studio: his page is a dark ground, because a coverage map reads as light marks on dark, and because the ground being dark makes the single lit column unmissable. The hue is shifted off the studio petrol to indigo-slate so the two are visibly different rooms, not one theme reskinned.

| Token | Hex | L | Role |
|---|---|---|---|
| `--s-ground` | `#161C2E` | 0.011983 | Page ground. |
| `--s-panel` | `#1F2841` | 0.021905 | Raised surface — the map's field, section blocks. |
| `--s-ink` | `#E9EAF0` | 0.824605 | Primary text, filled cells. |
| `--s-dim` | `#8E96AC` | 0.305420 | Secondary text, row and column labels. |
| `--lamp` | `#F2A93B` | 0.475689 | Shared with the studio. Used **only** on the 2025 end-to-end-with-AI column. |

| Foreground | Background | Ratio | AA body |
|---|---|---|---|
| `--s-ink` | `--s-ground` | **14.11 : 1** | pass |
| `--s-ink` | `--s-panel` | **12.16 : 1** | pass |
| `--s-dim` | `--s-ground` | **5.73 : 1** | pass |
| `--s-dim` | `--s-panel` | **4.94 : 1** | pass |
| `--lamp` | `--s-ground` | **8.48 : 1** | pass |
| `--lamp` | `--s-panel` | **7.31 : 1** | pass |
| `--floor` `#0F2A2E` | work-card surface `#E8E8EA` | **12.34 : 1** | pass |
| `--muted` `#4E6468` | work-card surface `#E8E8EA` | **5.13 : 1** | pass |

`--s-panel` sits only 1.16× above `--s-ground` in luminance. That is intentional — panels on a dark ground are separated by an inset 1px `rgba(233,234,240,.14)` top-left edge highlight (the same acrylic language as the work cards, inverted) plus space, not by fill contrast. A panel that fights the ground on brightness makes a dark page look like a grid of boxes.

### F.5 Typefaces on Sahib's page

Same two families, same roles, different emphasis. The **numerals role does more work here than anywhere else on the site**: years, row counts, the seven-year span. Column headers and row labels set in Anek Latin at `wdth` 87.5 / `wght` 500 so the matrix's labels are condensed and the grid can be narrower without shrinking type. Body prose stays Instrument Sans. No new face.

### F.6 Work cards on Sahib's page

The `<ul>` of roles from §D, unchanged in structure, sitting on `--s-ground`. Two changes, both computed:

- **Card fill goes to 90% white** (not 82%), because 82% over `#161C2E` composites to `#D5D6D9` where `--muted` reads at **4.32 : 1** and fails AA. At 90% the surface is `#E8E8EA` and `--muted` reads at **5.13 : 1** (table above). So: **82% on light grounds, 90% on dark grounds**, one rule, derived rather than eyeballed.
- The controlled-band rule from §D.7 still applies: `--s-ground` and `--s-panel` are the only permitted backdrops, and `--s-ground` is the worst case.

The cards live **below** the map, as the attribution layer: the map makes the claim, the cards are the receipts. Each attributed cell in the map is the same company as a card below it.

### F.7 Sahib, 360

```
┌────────────────────────────────────────┐ 360  --s-ground
│  ← thegeekdogs                         │  64  quiet way back (§8), not a
│                                        │      bolted-on studio header
│                                        │  56
│  Sahib Singh                           │      Anek 600, 38/1.04, --s-ink
│                                        │  16
│  Mobile across native iOS, native      │      body 16/26, --s-dim
│  Android, KMP and Flutter. Builder     │      [drafted, §7 floor card]
│  at Keenai Global.                     │
│                                        │  24
│  ┌──────────────────────────────────┐  │      portrait slot, 320 x 320
│  │  [BLOCKED: headshot route, Q23]  │  │      reserved with explicit
│  │  space reserved, not filled      │  │      dimensions so filling it
│  └──────────────────────────────────┘  │      later causes no reflow
│                                        │  56
│  Where he has shipped                  │      display-section 27px
│  [COPY NEEDED: map lead-in, <=14 wds]  │
│                                        │  24
│  ┌──────────────────────────────────┐  │      THE MAP. at 360 it rotates:
│  │            iOS And KMP Flt  AI   │  │      surfaces become COLUMNS at
│  │ Keenai      ·   ·   ·   ■   ▣    │  │      44px each (5 x 44 = 220),
│  │ 2025-        finance             │  │      companies become ROWS at
│  │ ─────────────────────────────────│  │      64px. product names move
│  │ Motive      ·   ■   ·   ·   ·    │  │      out of the cells into the
│  │ 2023-25      fleet               │  │      row's own line, since a
│  │ ─────────────────────────────────│  │      44px cell cannot hold text.
│  │ smallcase   ·   ■   ·   ■   ·    │  │
│  │ 2020-23      investing           │  │      ■ attributed  ▣ lamp (2025)
│  │ ─────────────────────────────────│  │      □ asserted    · empty
│  │ Cleartrip   ·   ■   ·   ·   ·    │  │
│  │ 2019-20      travel              │  │      the finance thread reads
│  │ ─────────────────────────────────│  │      down the domain column as
│  │ TheGeekDogs ·   ?   ·   ?   ·    │  │      texture, not as a second
│  │ 2020-        personal finance    │  │      diagram
│  └──────────────────────────────────┘  │
│                                        │      [BLOCKED: iOS and KMP
│  [honest line if the gap stays open]   │       columns, see §F.1]
│                                        │  56
│  What he writes about                  │      S2's material, as section 2
│  ─ channelFlow vs callbackFlow         │      three verified subjects.
│  ─ Android 16, orientation locks,      │      283 reactions on the third
│    and the duplicate-fragment bug      │      is a number -> it prints.
│  ─ ViewModel vs SavedStateHandle       │
│                                        │  56
│  Seven years, four companies           │      the work cards (§D)
│  ┌──────────────────────────────────┐  │      1 column at 360, white at
│  │ Keenai Global                    │  │      90% on --s-ground
│  │ Wealth-tech, Singapore & B'luru  │  │
│  │ 2025 - now                       │  │
│  │ ─────────────────────────────────│  │
│  │ Builder (AVP, Mobile)            │  │
│  │ Keenai Wealth                    │  │
│  │ Flutter, Dart                    │  │
│  └──────────────────────────────────┘  │
│       ▁▁▁▁▁▁▁▁▁▁▁▁                     │      tilt -1.4 deg
│  ┌──────────────────────────────────┐  │
│  │ Motive ...                       │  │      tilt +0.8 deg
│  └──────────────────────────────────┘  │      ... and so on, §D.4
│                                        │
│  github.com/hellosahib                 │      [BLOCKED: prominence depends
│                                        │       on the Fact Checker's read
│  Tell us what you're building.         │       of the profile]
│  thegeekdogs@gmail.com                 │
└────────────────────────────────────────┘
```

### F.8 Sahib, 1440

```
   ├──1──┼──2──┼──3──┼──4──┼──5──┼──6──┼──7──┼──8──┼──9──┼─10──┼─11──┼─12──┤
┌──────────────────────────────────────────────────────────────────────────┐
│ ← thegeekdogs                                                        72  │  --s-ground
├──────────────────────────────────────────────────────────────────────────┤
│                                                                     128  │
│ Sahib Singh                                    ┌──────────────────────┐  │  h1 60/1.04
│                          (cols 1-6)            │ [BLOCKED: headshot]  │  │
│ Mobile across native iOS, native Android,      │ 366 x 440 reserved   │  │  portrait slot
│ KMP and Flutter. Builder at Keenai Global,     │ cols 9-12            │  │  cols 9-12
│ shipping features end to end with AI.          └──────────────────────┘  │
│                                                                     128  │
├──────────────────────────────────────────────────────────────────────────┤
│ Where he has shipped                                     (cols 1-6)      │
│                                                                          │
│              native   native                        end to end           │  THE MAP,
│              iOS      Android    KMP      Flutter   with AI              │  full 12 cols.
│            ┌────────┬─────────┬─────────┬─────────┬──────────────┐       │  columns are
│ Keenai     │   ·    │    ·    │    ·    │ Keenai  │  backend,    │ 2025- │  surfaces,
│ wealth     │        │         │         │ Wealth  │  frontend,   │       │  rows are
│            │        │         │         │         │  tests  ▣    │       │  places.
│            ├────────┼─────────┼─────────┼─────────┼──────────────┤       │
│ Motive     │   ·    │ Motive  │    ·    │    ·    │      ·       │ 2023- │  ▣ = --lamp.
│ fleet      │        │ Fleet   │         │         │              │  25   │  the ONLY lit
│            │        │ App     │         │         │              │       │  cell on the
│            ├────────┼─────────┼─────────┼─────────┼──────────────┤       │  page, and it
│ smallcase  │   ·    │  ■      │    ·    │   ■     │      ·       │ 2020- │  is the newest
│ investing  │        │         │         │         │              │  23   │  and smallest
│            ├────────┼─────────┼─────────┼─────────┼──────────────┤       │  region.
│ Cleartrip  │   ·    │ Clear-  │    ·    │    ·    │      ·       │ 2019- │
│ travel     │        │ trip    │         │         │              │  20   │  the filled
│            ├────────┼─────────┼─────────┼─────────┼──────────────┤       │  region's SHAPE
│ TheGeek-   │   ·    │  ?      │    ·    │   ?     │      ·       │ 2020- │  is the argument
│ Dogs       │        │         │         │         │              │       │  -- it spans
│ personal   │        │         │         │         │              │       │  the full width
│ finance    └────────┴─────────┴─────────┴─────────┴──────────────┘       │  and 7 years.
│                                                                          │
│ [BLOCKED: iOS and KMP columns have no attribution in §5/§7 - §F.1]       │
│                                                                     128  │
├──────────────────────────────────────────────────────────────────────────┤
│ What he writes about              │  channelFlow vs callbackFlow         │  S2 material.
│                     (cols 1-4)    │  Android 16, orientation locks,      │  three verified
│ Technical writing, in public,     │  and the duplicate-fragment bug      │  subjects. no
│ regularly.                        │  ViewModel vs onSaveInstanceState    │  fourth invented.
│                                   │  vs SavedStateHandle    (cols 6-12)  │
│                                                                     128  │
├──────────────────────────────────────────────────────────────────────────┤
│ Seven years, four companies                              (cols 1-6)      │
│                                                                          │
│ ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                     │  work cards,
│ │ Keenai       │  │ Motive       │  │ smallcase    │                     │  3-up at 1440,
│ │ Global       │  │ Fleet mgmt   │  │ Investing    │                     │  328 wide,
│ │ 2025 - now   │  │ 2023 - 2025  │  │ 2020 - 2023  │                     │  white @ 90%
│ │ ─────────────│  │ ─────────────│  │ ─────────────│                     │  on --s-ground
│ │ Builder      │  │ Android Eng. │  │ SDE1>SDE2>SE │                     │
│ └──────────────┘  └──────────────┘  └──────────────┘                     │  tilts -1.4,
│    ▁▁▁▁▁▁▁▁         ▁▁▁▁▁▁▁▁          ▁▁▁▁▁▁▁▁                           │  +0.8, -2.1
│ ┌──────────────┐  ┌──────────────┐                                       │  then +1.7, -0.6
│ │ Cleartrip    │  │ TheGeekDogs  │                                       │
│ └──────────────┘  └──────────────┘                                       │
│                                                                     128  │
├──────────────────────────────────────────────────────────────────────────┤
│ Tell us what you're building.   thegeekdogs@gmail.com   github.com/...   │
└──────────────────────────────────────────────────────────────────────────┘
```

The page is the shape of breadth, not a CV list: the map is the argument, the cards are the footnotes, and the CV order (newest first) is preserved only inside the footnotes.

---

## G. Tanya's world (§9.3)

Her axis is **the system, not the timeline**. Both directions below are spatial and relational; neither is a dated list; neither is softer or more decorative than Sahib's. Both are documented to the same depth so that swapping is a decision already reasoned through (§9.3), and both share **the same token set**, which makes the swap a layout-module change and nothing else.

### G.1 Shared tokens (both directions)

Her world is the most achromatic of the three, and that is a positional argument, not an absence: she is the person who makes the work *legible* and *repeatable*, so her page is the most rigorously aligned and least decorated surface on the site. Giving her a hue would have been the easiest way to fall into the stereotype §9.3 forbids; giving her the strictest grid is the opposite move.

| Token | Hex | L | Role |
|---|---|---|---|
| `--t-ground` | `#EDEEEE` | 0.853266 | Page ground. Near-neutral, faintly cool. |
| `--t-core` | `#DCDEDE` | 0.727321 | The shared-core field (T1) / the node field (T2). |
| `--t-ink` | `#1B2020` | 0.013703 | Primary text and every structural stroke. Genuinely achromatic, not a tinted near-black posing as sophistication — pure `#000` vibrates against a light ground at body sizes, and that is the whole reason. |
| `--t-edge` | `#56605F` | 0.111704 | Secondary text, platform-edge labels, connector strokes. |
| `--lamp-ink` | `#8A5A08` | 0.127331 | The dark counterpart of `--lamp`, so the studio's one signal can appear on a light ground. Marks the shared core. |

| Foreground | Background | Ratio | AA body | AA large |
|---|---|---|---|---|
| `--t-ink` | `--t-ground` | **14.18 : 1** | pass | pass |
| `--t-ink` | `--t-core` | **12.20 : 1** | pass | pass |
| `--t-edge` | `--t-ground` | **5.59 : 1** | pass | pass |
| `--t-edge` | `--t-core` | **4.81 : 1** | pass | pass |
| `--lamp-ink` | `--t-ground` | **5.09 : 1** | pass | pass |
| `--lamp-ink` | `--t-core` | **4.38 : 1** | **fail** | pass |
| `--t-ink` | work-card surface `#F9F9F9` | **15.66 : 1** | pass | pass |
| `--t-edge` | work-card surface `#F9F9F9` | **6.17 : 1** | pass | pass |

**One constraint follows:** `--lamp-ink` is body-legal on `--t-ground` only. On `--t-core` it is **large text (≥ 24px, or ≥ 19px bold) or non-text marks only.** Since its job on this page is a 4px column cap and a section marker, that is where it stays.

Work cards on her page sit on `--t-core` (worst case), white at 82%, composite `#F9F9F9` — computed in the table above.

### G.2 Typefaces (both directions)

Same two families. Emphasis differs from Sahib's: on her page the **width axis carries structure rather than data**. Column and layer labels set in Anek Latin at `wdth` 75 / `wght` 600 — condensed, so a narrow structural column can carry a full-size label without shrinking it, which is what lets the three-column layout hold at 1024. Prose in Instrument Sans. Numerals get the least emphasis of the three worlds, deliberately: her argument is not a count.

### G.3 Direction T1 — the shared core *(recommended)*

**The page's own layout is a KMP architecture.** One fixed central column is the shared core; two flanking columns are the native edges, Android on the left, iOS on the right. Content sits in the column that owns it: anything shared — a practice, a workflow decision, a review gate, an architectural rule — sits in the core; anything platform-specific sits in an edge column, narrower and indented. The core is a continuous vertical field running the full page height, so it reads as a spine rather than as a stack of sections.

Her work history attaches as **annotations pinned to the layer they belong to**, not as a chronological run: Motive and its KMP work pin to the core, HSBC's REST/Retrofit work pins to the Android edge, Naskay pins to the Android edge.

The visitor learns the shape of KMP by reading a page built in it. That is the argument delivered by structure rather than by claim, which is the highest form of what §9.3 is asking for.

The connection §9.3 requires to the home page is direct and should be stated on the home page too: the four gates are the core, and the review discipline the studio sells is the same discipline this layout is drawn from.

**Why this over T2:** it can be built entirely from facts §5 supports — KMP as shared core, native Android and iOS at the edges, developer productivity, workflow, practices, three companies. T2 cannot.

**T1 at 1440:**

```
   ├──1──┼──2──┼──3──┼──4──┼──5──┼──6──┼──7──┼──8──┼──9──┼─10──┼─11──┼─12──┤
┌──────────────────────────────────────────────────────────────────────────┐
│ ← thegeekdogs                                                        72  │  --t-ground
├──────────────────────────────────────────────────────────────────────────┤
│                                                                     128  │
│ Tanya Jain                       ┌───────────────────────────────────┐   │  h1 60/1.04
│                    (cols 1-5)    │ [BLOCKED: headshot route, Q23]    │   │  --t-ink
│ Native Android and KMP, and the  │ 366 x 440 reserved, cols 9-12     │   │
│ iOS side too. She owns how the   └───────────────────────────────────┘   │
│ work gets made.                                                          │
│                                                                     128  │
├──────────────────────────────────────────────────────────────────────────┤
│  ANDROID       │▒▒▒▒▒▒▒▒ SHARED CORE ▒▒▒▒▒▒▒▒│        iOS               │
│  cols 1-3      │▒     cols 4-9, --t-core     ▒│        cols 10-12        │
│  --t-ground    │▒  4px --lamp-ink top cap    ▒│        --t-ground        │
│                │▒                            ▒│                          │
│                │▒  What belongs to everyone  ▒│                          │  the core is
│                │▒                            ▒│                          │  ONE continuous
│  Android-only  │▒  The practice. The review  ▒│  iOS-only concerns       │  field running
│  concerns      │▒  gate. The workflow rule.  ▒│  live here. narrower,    │  the section's
│  live here.    │▒  The shared-core decision. ▒│  indented, --t-edge      │  full height,
│  narrower,     │▒                            ▒│  labels.                 │  not a stack
│  indented.     │▒  [COPY NEEDED: the core    ▒│                          │  of blocks.
│                │▒   statement, ~40 words]    ▒│                          │
│  ┌──────────┐  │▒                            ▒│                          │  edges are
│  │ HSBC     │  │▒  ┌──────────────────────┐  ▒│                          │  narrower AND
│  │ REST,    │  │▒  │ Motive               │  ▒│  ┌──────────┐            │  indented, so
│  │ Retrofit │  │▒  │ 2024 - now           │  ▒│  │ [iOS     │            │  the hierarchy
│  │ 2021-23  │  │▒  │ Kotlin, Coroutines,  │  ▒│  │  edge    │            │  survives even
│  └──────────┘  │▒  │ KMP                  │  ▒│  │  work]   │            │  in greyscale
│                │▒  └──────────────────────┘  ▒│  └──────────┘            │
│  ┌──────────┐  │▒                            ▒│  [BLOCKED: what iOS      │  work cards
│  │ Naskay   │  │▒  the KMP work pins to the  ▒│   work can be named?     │  attach to the
│  │ MVVM     │  │▒  core, because that is     ▒│   §5.4 says she works    │  layer they
│  │ 2020-21  │  │▒  where it lives            ▒│   the iOS side; §7's     │  belong to, not
│  └──────────┘  │▒                            ▒│   table names nothing]   │  to a date
│                │▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│                          │
│                                                                     128  │
├──────────────────────────────────────────────────────────────────────────┤
│ The review gates below are hers.                          (cols 4-9)     │  the §9.3
│ [COPY NEEDED: the link back to the home page's four gates, ~25 words]    │  connection,
│                                                                          │  made on the
│ github.com/Tanya-jain99      Tell us what you're building.               │  core column
└──────────────────────────────────────────────────────────────────────────┘
```

**T1 at 360** — the three columns collapse to one, and the structure survives as **indentation depth plus a rule**, not as horizontal position. Core content is full width on `--t-core`; edge content is inset 24px with a 2px `--t-ink` left rule and a condensed platform label above it. The reader still learns which things are shared and which are platform-specific, which is the only thing the layout has to survive.

```
┌────────────────────────────────────────┐ 360  --t-ground
│  ← thegeekdogs                         │  64
│                                        │  56
│  Tanya Jain                            │      Anek 600, 38/1.04, --t-ink
│                                        │  16
│  Native Android and KMP, and the iOS   │      body, --t-edge
│  side too. She owns how the work       │
│  gets made.                            │
│                                        │  24
│  ┌──────────────────────────────────┐  │      portrait slot 320 x 320
│  │ [BLOCKED: headshot route, Q23]   │  │      reserved
│  └──────────────────────────────────┘  │
│                                        │  56
│ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ │      4px --lamp-ink cap: the ONLY
│ ▒  SHARED                            ▒ │      colour on the page, marking
│ ▒                                    ▒ │      the core. label Anek wdth 75.
│ ▒  What belongs to everyone          ▒ │
│ ▒                                    ▒ │      --t-core field, full bleed to
│ ▒  The practice. The review gate.    ▒ │      the content edges. 20px pad.
│ ▒  The workflow rule.                ▒ │
│ ▒                                    ▒ │
│ ▒  ┌──────────────────────────────┐  ▒ │      the Motive card sits INSIDE
│ ▒  │ Motive                       │  ▒ │      the core field, because the
│ ▒  │ Fleet management, US         │  ▒ │      KMP work is shared work.
│ ▒  │ 2024 - now                   │  ▒ │      white @82% on --t-core,
│ ▒  │ ─────────────────────────────│  ▒ │      surface #F9F9F9, 15.66:1
│ ▒  │ Software Engineer, Android   │  ▒ │
│ ▒  │ Kotlin, Coroutines, KMP      │  ▒ │
│ ▒  └──────────────────────────────┘  ▒ │
│ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ │
│                                        │  40
│  │ ANDROID EDGE                        │      inset 24px + 2px --t-ink
│  │                                     │      left rule. depth replaces
│  │ ┌────────────────────────────────┐  │      horizontal position.
│  │ │ HSBC                           │  │
│  │ │ Global bank                    │  │
│  │ │ 2021 - 2023                    │  │
│  │ │ ───────────────────────────────│  │
│  │ │ Software Engineer              │  │
│  │ │ REST APIs, Retrofit            │  │
│  │ └────────────────────────────────┘  │
│  │      ▁▁▁▁▁▁▁▁▁▁▁                    │
│  │ ┌────────────────────────────────┐  │
│  │ │ Naskay Technologies            │  │
│  │ │ ...                            │  │
│  │ └────────────────────────────────┘  │
│                                        │  40
│  │ iOS EDGE                            │
│  │ [BLOCKED: what iOS work can be      │
│  │  named? §5.4 says she works the     │
│  │  iOS side; §7's table names none]   │
│                                        │  56
│  The review gates below are hers.      │      the §9.3 home-page link,
│  [COPY NEEDED: ~25 words]              │      restated here
│                                        │
│  github.com/Tanya-jain99               │
│  Tell us what you're building.         │
└────────────────────────────────────────┘
```

### G.4 Direction T2 — the pipeline she owns *(documented, not recommended)*

**Her page is the studio floor seen from above, as a process rather than as a room.** A directed graph of the build pipeline — spec, build, review, QA, security, release — laid out as a plan, with edges showing the path work takes. Selecting a node reveals the practice at that point, the tooling decision behind it, and where she did it. §7 says the review gates are hers; this makes the page an argument about the gates.

**The case for it:** it is the strongest possible link between her page and the site's pitch (§9.3's explicit ask), it is unambiguously diagrammatic and non-chronological, and it reuses the floor's plan vocabulary without repeating the floor's room.

**Why not now: content.** §5 gives her subject areas — developer productivity, refining workflows, introducing better development practices, KMP discussions — but not one *named* practice, tool or workflow change. A node graph with unnamed nodes is an empty diagram, and naming them is invention. `[BLOCKED: three to six specific practices, tools or workflow changes Tanya introduced, with where. Without these T2 cannot be built honestly.]`

**T2 tokens: identical to G.1.** Not similar — identical. Connector strokes use `--t-edge` (5.59 : 1 on `--t-ground`, comfortably over the 3 : 1 a meaningful graphic needs). The node field uses `--t-core`. The traversed path is marked with `--lamp-ink` at large-mark sizes only. **Swapping T1 for T2 is a layout-module change and a page-content change; it touches no token and no shared component.** That is exactly the swappability §9.3 requires.

**T2 at 1440:**

```
   ├──1──┼──2──┼──3──┼──4──┼──5──┼──6──┼──7──┼──8──┼──9──┼─10──┼─11──┼─12──┤
┌──────────────────────────────────────────────────────────────────────────┐
│ ← thegeekdogs                                                        72  │
├──────────────────────────────────────────────────────────────────────────┤
│ Tanya Jain                       ┌───────────────────────────────────┐   │
│ She owns how the work gets made. │ [BLOCKED: headshot route]         │   │
│                    (cols 1-5)    └───────────────────────────────────┘   │
├──────────────────────────────────────────────────────────────────────────┤
│  THE GRAPH  (cols 1-8)                       │  PANEL (cols 9-12)        │
│                                              │                           │
│         ┌────────┐        ┌────────┐         │  fixed slot, same         │  same interaction
│         │ SPEC   │───────▶│ BUILD  │         │  pattern as the floor's   │  grammar as the
│         └────────┘        └───┬────┘         │  card slot (§C.6):        │  floor: fixed
│                               │              │  hover, focus and tap     │  slot, default
│                          ┌────▼───┐          │  all land here.           │  content, no
│         ┌────────┐◀──────│ REVIEW │          │                           │  cursor tracking
│         │  QA    │       └────┬───┘          │  default content = the    │
│         └───┬────┘            │              │  node she is most         │
│             │            ┌────▼─────┐        │  associated with.         │
│             └───────────▶│ SECURITY │        │                           │
│                          └────┬─────┘        │  [BLOCKED: node content   │
│                          ┌────▼────┐         │   -- see above]           │
│                          │ RELEASE │         │                           │
│                          └─────────┘         │                           │
│                                              │                           │
│  the graph is a PLAN, not a line: work       │                           │
│  loops back from review, which is the        │                           │
│  honest shape and the persuasive one         │                           │
├──────────────────────────────────────────────────────────────────────────┤
│  Where she has done this                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                    │  work cards,
│  │ Motive       │  │ HSBC         │  │ Naskay       │                    │  3-up, attached
│  └──────────────┘  └──────────────┘  └──────────────┘                    │  to nodes, not
│     ▁▁▁▁▁▁▁▁         ▁▁▁▁▁▁▁▁         ▁▁▁▁▁▁▁▁                           │  to dates
└──────────────────────────────────────────────────────────────────────────┘
```

**T2 at 360:** the graph becomes a vertical traversal — nodes in a single column, connectors in the left gutter drawn as 2px `--t-edge` strokes including the loop-back from review, each node 64px tall and a full-width `<button>`; the panel opens inline directly beneath the selected node rather than as a sheet, for the same reason as §C.7. The loop-back edge survives because it is drawn in the gutter, which is the one thing that must not be lost when the graph goes vertical.

### G.5 Recommendation and equality of ambition

**Recommend T1.** T2 is the better idea and is documented so it can be swapped the moment its content exists — which is a live possibility, since her sign-off comes after the build (§9.3).

On equality: her page carries the harder layout problem of the two (a three-field structure that has to survive collapse to one column while keeping its meaning, versus Sahib's matrix which collapses by rotation), and it does not pad. §7 warns against padding her row count to match his; she has three companies and gets three cards, and the page does not compensate by inflating anything. Nothing on her page is softer, rounder, paler or more decorative than his; if anything hers is the stricter of the two.

---

## H. Motion spec (§10)

### H.1 Shared timing tokens

| Token | Value | Meaning |
|---|---|---|
| `--dur-1` | 120ms | State acknowledgement — press, focus ring, selected fill. |
| `--dur-2` | 200ms | A small element changing — card slot content, a stage node. |
| `--dur-3` | 360ms | An element entering or leaving — the mobile card panel. |
| `--dur-4` | 640ms | One step of the page's orchestrated moment. |
| `--ease-out` | `cubic-bezier(.16, 1, .3, 1)` | Things arriving. |
| `--ease-inout` | `cubic-bezier(.65, 0, .35, 1)` | Things moving between two known states. |
| `--ease-idle` | `cubic-bezier(.4, 0, .6, 1)` | The only easing permitted on a loop. Symmetric, so the loop has no direction. |
| `--loop-floor` | 4800ms | The floor's idle period. The only loop on the site. |

Every animation is interruptible. Nothing blocks text paint. There are **no scroll-driven effects anywhere on this site** — no parallax, no scroll-linked scrub, no reveal-on-scroll. That is a deliberate choice, not an omission: it removes an entire class of budget risk and reduced-motion risk, and §9.4's "spend boldness once" implies the scroll itself should be boring. Sections do not fade up. Cards do not lift on hover.

### H.2 How each world uses them differently

- **Studio — motion is spatial.** Uses all four durations. Things arrive from the direction they belong to: the floor's card-slot content enters with an 8px translate from the scene's side, so the card visibly comes *from* the desk. `--ease-out` for arrivals, `--ease-idle` for the one loop.
- **Sahib — motion is incremental.** Uses `--dur-1`, `--dur-2` and `--dur-4` once. Nothing slides; cells only fade and take a 1px scale on fill. Rationale: breadth is a quantity argument, so the motion should accumulate rather than travel.
- **Tanya — motion is structural.** Uses `--dur-2`, `--dur-3` and `--dur-4` once. Nothing fades in; elements move into alignment. Rationale: her subject is structure, so motion should show dependency order, not arrival.

### H.3 The one orchestrated moment per page

| Page | Named moment | What happens |
|---|---|---|
| `/` | **Lights on** | Fires only after the h1 has painted. Monitor glows come up in DOM order — Sahib, Tanya, then the five agents — at 90ms stagger, `--dur-4` each, opacity 0 → their loop-start value. Then a **400ms hold with nothing happening**, and the empty chair's lamp cone comes up alone over 900ms. Total ~2.3s. Nothing moves position; nothing is offscreen-then-onscreen; nothing blocks paint. The hold is the moment: the room fills, then stops, then one light comes on where nobody is sitting. |
| `/work/pocket-manager/`, `/work/wedding-planner/` | **The track fills** | Stage nodes fill left to right at 90ms stagger and **stop hard at the current node**. Future nodes never animate at all — no fade, no pulse, nothing. The animation stops exactly where the truth stops, which is the same rule the whole site is selling. |
| `/sahib/` | **The map fills** | Coverage cells fade up column by column: iOS, Android, KMP, Flutter — then a 300ms hold — then the end-to-end-with-AI column arrives alone in `--lamp`. 120ms per column. The hold makes the 2025 fact the event. |
| `/tanya/` (T1) | **The core draws** | The shared-core field's boundary draws top to bottom over 900ms; each edge column's content becomes visible only as the core passes its row. The edges cannot appear before the core does, which is the architectural claim made as choreography. |
| `/tanya/` (T2) | **The path resolves** | Graph edges draw in traversal order, including the loop-back from review, 140ms per edge. |
| `/work/`, `/contact/`, `/404` | none | A contact page's job is to be answered, not performed. |

### H.4 Reduced motion, per page

`prefers-reduced-motion: reduce` removes idle loops and orchestrated moments. It removes nothing else, and every still state is a designed frame.

| Page | What is removed | What the still state looks like |
|---|---|---|
| `/` | "Lights on"; the floor's idle loop | The room at §C.9's still frame — seven glows at seven *different* static opacities, lamp cone at full. The card slot still swaps content, instantly, no slide, no fade. The sticky contact plate still appears (it is `position: sticky`, never animated). |
| `/work/*` | "The track fills" | The track renders complete: done nodes filled, current node at 18px with its ring and core, future nodes hollow with dashed connectors. Identical to the end frame of the animation. |
| `/sahib/` | "The map fills" | The map renders fully filled, with the end-to-end column in `--lamp`. Identical to the end frame. |
| `/tanya/` T1 | "The core draws" | Core field fully drawn, both edge columns visible, `--lamp-ink` cap present. |
| `/tanya/` T2 | "The path resolves" | All edges drawn, including the loop-back. |
| everywhere | nothing else | Focus rings, selected states and the card-slot swap all still respond, at 0ms. Response to a user action is not decoration and it is not removed — §10 says motion answering a user action is always welcome, and instant is a valid duration. |

The reduced-motion site is a complete, still, finished site (§4). It is not the site with the animation subtracted; on every page above, the still frame *is* the animation's last frame, which is why it looks finished.

### H.5 Note to the Interaction Engineer

Library choice is not mine. The only thing this spec requires of it: the one loop must be pure CSS wrapped in `@media (prefers-reduced-motion: no-preference)` so the default, unconditional state is the still one (PLAN.md §4.4 already plans this and it is the right call). Everything else here is a one-shot on `opacity` and `transform` only. No property outside `opacity`, `transform` and — for the stage nodes — `stroke-dashoffset` is ever animated on this site. Blur radius is never animated (§6.1), and there is no exception.

---

## I. Open questions

Each answerable in one sentence. These are design decisions that need a human; factual and copy gaps are already in `QUESTIONS.md` and are not repeated here. Item 4 below expands `QUESTIONS.md` item 32.

1. **Dark mode:** do we ship a `prefers-color-scheme: dark` variant, or lock the site to one appearance per world? *(Recommendation: lock it. Three worlds × two schemes is six palettes to keep at AA and it doubles the review surface for no stated benefit.)*
2. **The compressed work-card strip on the home page** (§6.1 permits it "only if it earns its place"): include or omit? *(Recommendation: omit. The floor already spent the boldness, and the strip would put the same component on four of seven pages.)*
3. **Omitting the Designer desk from the visible floor** (§C.2): acceptable, or does it read as the studio quietly admitting it has no design discipline given §5.4? *(If it is a problem, the fix is to swap Spec Writer out for Designer, which costs nothing but breaks the one-desk-per-gate mapping.)*
4. **Floor station count:** five agent desks confirmed, or six? *(Recommendation: five. §6 asks for five to six; five keeps every touch target above 88 × 72 at 360 and lets every one of the four human gates be represented.)*
5. **Does a TheGeekDogs wordmark or logo exist, and may we use it?** Nothing in §5 names one, so the header currently sets the studio name in the display face. *(This is a real gap: a site with no mark at all is a choice, and it should be a deliberate one.)*
6. **Sahib's native-iOS and KMP attribution** (§F.1): can a company or product be named for each, or does the coverage map ship with two columns carrying the "asserted" state and an honest line beneath? *(This is the largest hole in his page's argument.)*
7. **Tanya's iOS work** (§G.3): is there anything nameable for the iOS edge column, or does that column carry the structure with no card in it? *(§5.4 says she works the iOS side; §7's table names nothing there.)*
8. **Hero subhead length** (§B.7): may the Copywriter cut variant A's subhead from 33 words to ≤ 26 so the primary CTA stays above the fold at 360 on a 640-tall viewport?
9. **The persistent contact plate** (§B.10): does it print the email address in plain text — scrapeable — or carry a label over a `mailto:`? *(Design prefers the plain address; it is more credible on a page arguing you will get a real reply.)*
10. **Do the person pages print with the studio floor omitted entirely** (recommended) **or with the roster as a text list?** Somebody will PDF these.
11. **Two of the five §5.6 references were unreachable** (§A.1–A.3). Can anyone supply the Dribbble shot as an image, and the two designers' actual portfolio URLs? *(Not blocking; the direction stands on the two references that resolved.)*

---

## J. Before-ship: remove one thing (§9.4)

Per page, the thing to cut in the final pass. These are pre-committed so the decision is not relitigated when everyone is attached to the work.

| Page | Remove |
|---|---|
| `/` | The compressed work-card strip, if open question 2 came back as "include". If it did not ship, remove the floor's faint floor-seam lines instead — the desks define the room without them. |
| `/work/` | The one-line description under each product name. The product name and its stage track say enough on an index page. |
| `/work/pocket-manager/` | The Play Store badge graphic. The 4.3 / 24 / 1K+ figures already carry it, and the badge is Google's chrome sitting inside our composition. |
| `/work/wedding-planner/` | The second device screenshot. One real screen of the multi-function view is the differentiator (§5.3); a second one dilutes it. |
| `/sahib/` | The finance-domain annotation running down the map's row labels. It is texture competing with the map, and the work cards below already carry the domains. |
| `/tanya/` | The platform glyphs at the edge columns. The words "Android" and "iOS" are shorter, clearer and cheaper than any icon. |
| `/contact/` | The second call to action. One email, one link, one answer. |
| `/404` | Everything except the line and the link home. The empty room is the joke; a nav menu underneath it is not. |
| everywhere | The noise texture on the work-card surface (§D.6). The base, the edge and the tilt carry the object; the noise is the fourth thing propping up three that already work. |
