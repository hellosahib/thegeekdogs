# Final QA gate — the no-slop gate, manual half

**Subject:** frozen build at `commit 6283b4a`, tested against the frozen copy
`scratchpad/dist-final` (not the working-tree `dist/`).
**Automated half:** already green — all ten `qa:*` scripts passed before this run started.
**This document:** the manual, evidenced half of `agents/qa.md` / `docs/brief.md` §14.
**Run date:** 2026-09-05. **Tooling:** Playwright (Chromium), against a local static
server over `dist-final`, plus direct grep of the built HTML.
**Scripts used to produce this evidence** live outside the repo, in the session scratchpad
(`scratchpad/qa-scripts/check1..7-*.mjs`), so as not to touch anything in the tracked
tree. Nothing in the repo was edited to produce this report.

## Verdict: **APPROVED**

All seven agent-executable checks pass with evidence, zero controls found wired to
nothing, zero console errors/warnings across 16 page loads, and the theme toggle
persists correctly across a reload. The eighth check — real hardware — cannot be run by
an agent; it is handed to the owners below as a five-item checklist, per `agents/qa.md`
("Real device: at least one mid-range Android on a throttled connection. Not an
emulator."). That item is a standing human gate, not a missing fact, so it does not
change the verdict to `BLOCKED`; it is the one box this document cannot tick itself.

One non-blocking documentation note is carried below (check 1).

---

## Check-by-check

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Every interactive element does something | **PASS** — 164 controls across 8 routes, 0 flags | `docs/reviews/final/qa/check1/inventory.json`, `inventory-summary.md`, `inventory-<route>-overview.png` (8 files) |
| 2 | Touch path on the floor (360/390 touch, 1440 mouse) | **PASS** — 10/10 stations at both widths, 10/10 hover+click at 1440 | `docs/reviews/final/qa/check2/touch-floor-results.json`, `touch-{360,390}-{sahib-singh,designer,ship-approval}-{before,after}.png` (12 files), `mouse-1440-designer-{hover,click}.png` |
| 3 | Theme toggle: keyboard, tap, no flash, persistence, `theme-color` | **PASS** | `docs/reviews/final/qa/check3/theme-toggle-results.json`, `keyboard-{before,after}.png`, `tap-{before,after}-390.png`, `no-flash-dark-stored-first-paint.png`, `persisted-after-reload.png` |
| 4 | Reduced motion: `getAnimations()` empty, still frame complete | **PASS** — 0 running animations on all 6 page/scheme combinations | `docs/reviews/final/qa/check4/reduced-motion-results.json`, `reduced-{home,sahib,tanya}-{light,dark}-full.png` |
| 5 | Every content field real; PM/WP screenshots are the real captures | **PASS** | `docs/reviews/final/qa/check5/content-grep-results.txt`, `pm-shipped-img-{1..4}.png`, `wp-shipped-img-1.png` |
| 6 | No forms; mailto addresses are exactly the three allowed | **PASS** | `docs/reviews/final/qa/check6/forms-mailto-results.txt` |
| 7 | Console: zero errors/warnings, every route, both schemes | **PASS** — 16/16 page loads clean | `docs/reviews/final/qa/check7/console-results.json` |
| 8 | Real device (mid-range Android, throttled 4G) | **DEFERRED TO OWNERS** — not agent-executable | Checklist below |

### 1. Every interactive element does something

Crawled all 8 routes at 1440px with Playwright, enumerated every `<a>` and `<button>`,
and classified each one's action from its `href`/`target`/`data-*` attributes: navigate,
`mailto:`, in-page anchor, external-new-tab, theme toggle, or card-slot swap.

- **164 controls total, 0 flags.** No `href="#"`, no anchor with an empty/missing
  `href`, no button with an unclassifiable action.
- **Every external link** (Play Store, 2×GitHub, 2×LinkedIn, plus 4 LinkedIn post
  permalinks on `/sahib/`) carries `target="_blank" rel="noopener noreferrer"` and an
  accessible name ending in "Opens a new tab." (via a visually-hidden span or an
  explicit `aria-label`), confirmed by regex against the accessible name in the crawl
  and by direct grep of the built HTML.
- **Every `mailto:` link** matches COPY.md §1's per-page address table (see check 6).
- **The 10 floor stations** are `<button data-station="…">`, each classified as
  "swaps card slot," and verified functionally in check 2.

**Non-blocking note:** COPY.md §10.2 specifies a "Card close control" (label `Close`,
accessible name `Close this card`). No such element exists in the built DOM on any
route — there is nothing to close, because the floor's card slot always holds content
(the empty chair's card by default, per DESIGN.md §C.6) and hover/focus/click only ever
*replace* the slot's content, never clear it. This is consistent with DESIGN.md's
explicit rejection of a dismissible bottom-sheet (§C.7: "it means the default state on
load is 'no card', which throws away the free argument"). Nothing is broken or wired to
nothing — the copy string is simply unused. Recommend COPY.md §10.2 drop the close
control's copy, or the Design Lead confirm a state where it is needed.

### 2. Touch path on the floor

Playwright mobile emulation (`hasTouch: true`, `isMobile: true`) at **360** and **390**:
tapped all ten stations at each width. At every tap, the card slot's `[data-card]`
element for that station became visible and every other card stayed hidden, and the
tapped station's button carried `data-selected="true"`. **20/20 taps correct.**
Screenshots before/after captured for three representative stations — a human cabin
(`sahib-singh`), an agent desk (`designer`), and the empty chair (`ship-approval`) — at
both widths (12 images).

Mouse pass at **1440**: hovering each station showed that station's card with the
selected state set (the "preview"), and a subsequent click committed the same state
(no visual difference between hover-preview and click-commit, which is correct per
DESIGN.md §C.6 — "Hover, focus and tap all replace the slot's content, identically").
**10/10 hover, 10/10 click.** Screenshots captured for the `designer` station's hover
and click states.

### 3. The theme toggle

- **Keyboard:** confirmed the toggle is the last stop after the skip link and the 4 nav
  links in tab order (per DESIGN.md §B.10a), pressed Enter, and the page flipped
  `light → dark` instantly, the `aria-live` region announced "Dark mode on.", and the
  button's `aria-label` updated to "Switch to light mode."
- **Tap:** same result on a 390px touch context.
- **No flash:** seeded `localStorage` with `tgd-theme: dark` before navigation and read
  `document.documentElement`'s `data-theme` attribute immediately at `commit` (before
  `load`) — it was already `"dark"`, confirming the inline pre-hydration script runs
  before first paint. The screenshot taken right after shows the dark scheme, not a
  light flash.
- **Persistence:** clicked the toggle, confirmed `localStorage.tgd-theme` was written,
  reloaded the page, and `data-theme` was still `"dark"` after reload (screenshot
  attached).
- **`theme-color` follows the scheme:** the built HTML emits two `<meta name="theme-color">`
  tags, one per `prefers-color-scheme` media query (`#F1F3F0` light / `#18292D` dark),
  and a context with no stored choice resolves the correct one for its OS scheme in
  both directions. Per DESIGN.md §I (round 5, item 4), this tag is intentionally scoped
  to the **OS** preference rather than rewritten by the manual override — a documented,
  accepted mismatch, not a defect.

### 4. Reduced motion

Emulated `prefers-reduced-motion: reduce` on `/`, `/sahib/`, `/tanya/`, both colour
schemes (6 combinations). `document.getAnimations()` returned an empty array on every
one after `networkidle` + 800ms settle — **0 running animations everywhere.**
Full-page screenshots confirm each still frame is complete per DESIGN.md §H.4: the
floor's nine glow states and lamp cone at rest, no partial fade on any element.

### 5. Every content field is real

- Grepped the built HTML for slop patterns beyond the automated `qa:no-slop` list
  (`sample`, `Acme`, `foo`/`foobar`, `dummy`, `test@test.*`, "your company",
  `555-####`, stock-photo hosts, stray `[ALL CAPS]` brackets, generic
  "N years of experience" boilerplate) — **zero matches** across all 8 built pages.
- **Pocket Manager's 4 screenshots** (`01-home`, `02-calendar`, `04-categories`,
  `05-export`) and **the wedding planner's 1 screenshot**
  (`01-planning-board-functions`) were compared against `docs/assets/pocket-manager/README.md`
  and `docs/assets/wedding-planner/README.md`. Filenames match the source captures
  exactly; the shipped `<img>` aspect ratios (280×607, 603×1311) match the real
  source dimensions (1440×3120, 1206×2622) to within rounding; and the built alt text
  was checked sentence-by-sentence against each README's "what is on screen"
  description — e.g. `04-categories.png`'s alt ("seven days of spending as a bar chart
  and… each category's share… as a percentage") was verified against the actual pixels
  of the source PNG, which does show both the bar chart and the donut breakdown on one
  scrolled screen. No stand-in or mismatched image found. (Byte-hash comparison against
  the source assets found no exact matches, which is expected — Astro's image pipeline
  re-encodes/resizes on build — so the check fell back to dimension ratio + content
  cross-reference instead, both of which passed.)

### 6. Forms and mailto

- **Zero `<form>` elements** anywhere in the built site — consistent with the brief's
  "no forms, email only."
- **23 `mailto:` links total**, all three addresses and no others:
  `thegeekdogs@gmail.com` (16), `jaintanya999@gmail.com` (4), `sahiboffc@gmail.com` (3) —
  matching COPY.md §1's per-page table (studio address on `/`, `/work/*`, `/contact/`,
  `/404`; Sahib's on `/sahib/`; Tanya's on `/tanya/`; all three on `/contact/`).

### 7. Console

Crawled all 8 routes in both `light` and `dark` colour-scheme contexts (16 page loads),
capturing `console.error`, `console.warning`, uncaught `pageerror`, failed requests, and
non-OK HTTP responses. **Zero of any of the above, on any load.**

### 8. Real device — owners' checklist

Not runnable by an agent (no physical hardware, no real carrier network, no OS mail-app
handoff). Per `agents/qa.md`, this is run by the owners on **one mid-range Android, on a
throttled connection, not an emulator.** Five items to tick:

1. **Cold-load every one of the 8 routes over a real throttled connection** (SIM data
   or a throttled Wi-Fi AP — not Chrome DevTools' simulated throttle) and confirm each
   page becomes interactive without a long blank/white hold or a visible layout jump.
2. **Tap through all ten floor stations with a finger** on `/`, at the phone's native
   size; confirm the card panel swaps on every tap with no missed/double-tap and no
   station that needs a second touch to register.
3. **Turn on Settings → Accessibility → Remove animations**, reload `/`, `/sahib/`,
   `/tanya/`, and confirm each renders the finished, still state immediately — no idle
   loop, matching this document's `check4` screenshots.
4. **Tap the theme toggle, then force-quit and reopen the browser** (not just refresh)
   and confirm the chosen scheme survived process death, not only a soft reload.
5. **Tap each of the three `mailto:` affordances** (persistent contact plate, `/sahib/`,
   `/tanya/`) and confirm the phone's real mail app opens with the correct address
   pre-filled — this is the one behaviour Playwright's `mailto:` markup check cannot
   exercise, since it never actually hands off to an OS mail client.

---

## Controls inventory (all wired — check 1)

| Route | Links | Buttons | Total |
|---|---|---|---|
| `/` | 23 | 11 | 34 |
| `/work/` | 18 | 1 | 19 |
| `/work/pocket-manager/` | 17 | 1 | 18 |
| `/work/wedding-planner/` | 16 | 1 | 17 |
| `/sahib/` | 24 | 1 | 25 |
| `/tanya/` | 21 | 1 | 22 |
| `/contact/` | 18 | 1 | 19 |
| `/404.html` | 9 | 1 | 10 |
| **Total** | **146** | **18** | **164** |

(`/`'s 11 buttons = the theme toggle + 10 floor stations; every other route's 1 button
is its own theme toggle — one per page, per DESIGN.md §B.10a, no second instance in any
footer.)

---

## Evidence index

All evidence lives under `docs/reviews/final/qa/`:

```
check1/  inventory.json, inventory-summary.md, inventory-<route>-overview.png (×8)
check2/  touch-floor-results.json, touch-{360,390}-{station}-{before,after}.png (×12), mouse-1440-designer-{hover,click}.png
check3/  theme-toggle-results.json, keyboard-{before,after}.png, tap-{before,after}-390.png, no-flash-dark-stored-first-paint.png, persisted-after-reload.png
check4/  reduced-motion-results.json, reduced-{home,sahib,tanya}-{light,dark}-full.png (×6)
check5/  content-grep-results.txt, pm-shipped-img-{1..4}.png, wp-shipped-img-1.png
check6/  forms-mailto-results.txt
check7/  console-results.json
```
