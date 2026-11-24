# TheGeekDogs Engineering: social and video design language

The look of the YouTube banner (`banner.svg`) and profile picture (`profile.svg`), written
down so every video, reel, thumbnail and post looks like it came from the same channel.

This is for social and video only. The website has its own dark design in the root
`DESIGN.md`; don't mix the two.

**The idea in one line:** Apple-clean. One focal point, lots of empty space, near-black
text on off-white, and orange used sparingly as the one accent.

---

## 1. Principles

1. **One thing per frame.** Each frame or slide makes one point. If it needs two, it needs two frames.
2. **Empty space is part of the design.** Leave at least a third of the frame empty. Don't fill corners with decoration.
3. **Orange is the highlight, not the background.** Use it for one word, one number, one shape per frame, never for full backgrounds.
4. **Type does the work.** No outlines, drop shadows, stickers, emoji in titles or busy patterns. Size and weight create the hierarchy.
5. **Centred and calm.** Centre titles by default. Motion is slow and smooth, never bouncy.

---

## 2. Colour

### Light (default: titles, thumbnails, explainers, posts)

| Token | Hex | Use |
|---|---|---|
| `paper` | `#FBFBFD` | Background |
| `ink` | `#1D1D1F` | Headlines, logo outline, primary text |
| `grey` | `#6E6E73` | Subheads, captions, secondary text |
| `line` | `#D2D2D7` | Dividers, card borders, chart gridlines |
| `orange` | `#FF5E1A` | Accent start, logo ears (`#FF6B1A`) |
| `amber` | `#FFA53A` | Accent end |

### Dark (code walkthroughs, screen recordings, terminal-heavy segments)

| Token | Hex | Use |
|---|---|---|
| `night` | `#000000` | Background |
| `night-2` | `#1D1D1F` | Cards, code panels |
| `snow` | `#F5F5F7` | Headlines, primary text |
| `night-grey` | `#86868B` | Secondary text |
| `orange` → `amber` | `#FF5E1A` → `#FFA53A` | Same accent, unchanged |

### Accent rules

- **The gradient:** `#FF5E1A` → `#FFA53A`, left to right. Use it on text (one or two words), never as a background fill.
- **The glow:** a soft radial behind the focal point, `#FF8A2A` at about 22% opacity in the centre fading to 0. It's the only background colour allowed.
- **One accent per frame.** If "Dogs" is orange, nothing else on that frame is.
- Don't add other accent colours (no blue, purple or green). For charts, use `ink`, `grey` and `line`, with orange for the one series that matters.

---

## 3. Typography

All from Google Fonts, so they look the same on every computer and in every editor.

| Role | Font | Weight | Letter spacing |
|---|---|---|---|
| Headline / title | **Inter Tight** | 600 (SemiBold) | −2.5% (−0.025em) |
| Subhead / body | **Inter** | 400 (Regular) | −1% |
| Emphasis in body | **Inter** | 600 | −1% |
| Captions (reels) | **Inter** | 600 | 0 |
| Code | **JetBrains Mono** | 400 / 600 | 0 |

### Sizes at 1920×1080 (scale proportionally for other sizes)

| Role | Size | Colour |
|---|---|---|
| Hero title | 120–160 px | `ink` (accent word in gradient) |
| Section title | 80–96 px | `ink` |
| Subhead | 40–48 px | `grey` |
| Body / bullet | 36–40 px | `ink` |
| Lower-third name | 36 px Inter Tight 600 | `ink` |
| Lower-third role | 28 px Inter 400 | `grey` |
| Code | 28–34 px | `snow` on `night-2` |

### Rules

- Sentence case everywhere ("How LLMs actually work", not "How LLMs Actually Work"). The only all-caps text allowed is acronyms (LLM, AI, API).
- Title lines stay short: 2–6 words. Break long titles into title + subhead.
- Never more than two weights on one frame.
- Line height: 1.05 for headlines, 1.35 for body.

---

## 4. The logo

The dog-head mark from `profile.svg`:

- **On light:** outline and nose `ink #1D1D1F`, ears `orange #FF6B1A`, no fill.
- **On dark:** outline and nose `snow #F5F5F7`, ears `orange #FF6B1A`.
- **Clear space:** at least half the mark's width on every side.
- **Placement:** centred above the title (as on the banner), or small in a corner as a watermark at 60% opacity.
- **Wordmark:** "TheGeek" in `ink` + "Dogs" in the orange gradient, always one word, Inter Tight 600.
- Don't recolour the ears, add shadows or outlines, rotate it, or put it on a busy background.

---

## 5. Layout and safe areas

Spacing uses an **8 px grid**. Keep at least a 96 px margin at 1920×1080.

| Format | Size | Safe area / notes |
|---|---|---|
| YouTube video | 1920×1080 (or 3840×2160) | Keep text inside the centre 1728×972 (5% margin) |
| YouTube thumbnail | 1280×720 | Bottom-right 220×100 is covered by the duration badge |
| YouTube banner | 2560×1440 | Everything inside the centre 1546×423 |
| Reel / Short | 1080×1920 | Keep text between 250 px from the top and 420 px from the bottom; avoid the right 120 px (buttons) |
| Instagram post | 1080×1350 (4:5) | 64 px margin |
| Carousel slide | 1080×1350 | Same layout on every slide; slide number `grey` bottom right |
| Profile picture | 1080×1080 | Content inside the centre circle |

---

## 6. Templates

### Title card (video intro, thumbnail base)
Background `paper` + glow. Small logo centred on top, title in Inter Tight 600 with one word in the gradient, one-line subhead in `grey` under it. Exactly the banner's layout.

### Thumbnail
- 2–4 words max, 140–180 px, left-aligned or centred.
- One key word in the gradient.
- Optional: a face or a single object (phone, screen) on the right, cut out cleanly on `paper`. No arrows, circles or red outlines.

### Lower third
White card (`#FFFFFF`, 16 px radius, 1 px `line` border) bottom left, 96 px from the edges. Name in `ink`, role in `grey`. Slides in from 24 px below with a fade.

### Code segment
Switch to the dark palette. Code panel on `night-2`, 24 px radius, JetBrains Mono. Highlight the one line that matters with a 4 px orange bar on the left and an 8% orange background tint. Dim the other lines to 50%.

### Reel captions
Inter 600, 56–64 px, `ink` on a `#FFFFFF` pill at 90% opacity (light videos) or `snow` on `#000000` at 70% (dark videos). One line at a time, at most 5 words. Highlight the key word in orange (solid `#FF6B1A`, not the gradient, for readability while moving).

### Carousel / post
Slide 1 is a title card. Content slides: section title at the top, one idea in the middle, `grey` source or footnote at the bottom. Last slide: logo + "Follow for more engineering, AI and LLMs."

---

## 7. Motion (videos and reels)

- **Easing:** ease-out (cubic-bezier 0.22, 1, 0.36, 1) for things coming in, ease-in-out for things moving.
- **Duration:** 300–500 ms for UI and text, 600–800 ms for full-frame transitions.
- **Allowed:** fade, fade + 16–24 px slide up, slow scale (100% → 104% over the shot), crossfade between scenes.
- **Not allowed:** bounce, spin, glitch, whoosh-zoom, wipes, star or shape transitions.
- Text animates in by line or by word, never by letter.
- Logo sting (intro/outro, ≤ 1.5 s): ears fade in orange, outline draws on, wordmark fades up under it.

---

## 8. Voice on screen

- Tagline: **Geeks with paws.**
- Short, plain, confident. "Here's how attention works", not "In this video we will be exploring…"
- Numbers and facts get the orange highlight, not adjectives.
- Sign-off line: "Learn with the pack."

---

## 9. Quick checklist before publishing

- [ ] Background is `paper` (or `night` for code) with at most the soft glow
- [ ] Only one orange accent on each frame
- [ ] Inter Tight for titles, Inter for text, JetBrains Mono for code
- [ ] Sentence case, title ≤ 6 words
- [ ] Text inside the safe area for that format
- [ ] Logo has clear space and correct colours
- [ ] Motion is fades and slides only

---

## Source files

- `banner.svg`: the reference for title-card layout, glow and wordmark. Render on any machine with Chrome; fonts load from Google Fonts.
- `profile.svg`: the reference for the logo on light.
- Edit the SVGs and re-export; never hand-edit the PNGs.
