import { BOX } from './plan';

/**
 * The studio floor's `<defs>`: four gradients and ten symbols, authored once.
 *
 * They live here as markup rather than inside the component because two renderers need
 * the same drawing: the page's own inline scene, and the build-time OG card
 * (`src/lib/og/floor-card.ts`), which reuses these symbols instead of redrawing the room
 * a second way. Nothing about a symbol's geometry is typed twice, and the placements
 * both renderers use come from `plan.ts`, which is the same single source of truth for
 * where a station sits.
 *
 * **The geometry here is unchanged by the redesign.** Every path, every bounding box and
 * every `<use>` offset is the one the isometric plan already computed; what changed is
 * the material each surface is made of. The room used to be four flat fills on paper. It
 * is now a lit object: a gradient slab, glass planes at three alphas, desk sides and
 * shadow faces off a four-step ramp, and screens on an accent-to-cool gradient.
 *
 * Fills are class names, not values, for the same reason they always were: on the page
 * they resolve from the tokens the component scopes to `.floor__scene`; in the
 * standalone OG card they resolve from the `<style>` block the card writes into its own
 * SVG root. A material change is a stylesheet edit, not a redraw.
 *
 * Three notes that used to sit as HTML comments inside the markup below. They are here
 * instead because this string is injected with `set:html` and an HTML comment inside it
 * ships to `dist/` — which `qa:no-slop` fails, correctly: shipped comments are how
 * internal notes reach strangers.
 *
 * **The dog heads** are DELIBERATELY near-abstract: two ear shapes, a rounded head, a
 * muzzle bar. Geometric marks, not illustration. If real illustration is ever
 * commissioned this is the slot it replaces, at the same size and the same anchor. There
 * are two forms — pointed ears and folded ears — so that adjacent desks differ and the
 * seven agents do not read as seven copies of one object.
 *
 * **An agent's station** takes its head the only way an SVG symbol can take a parameter:
 * there are two of the symbol, one per head form.
 *
 * **A cabin** is three glass planes — two walls and a floor — at .10 / .16 / .06 with
 * .30 / .30 / .20 strokes, which is what makes a corner read as two panes meeting rather
 * than as one shape with a fold in it. The props inside it are unchanged.
 */

/** Every `<use>` repeats its symbol's own bounding box, so nothing is scaled by accident. */
function u(id: keyof typeof BOX, x: number, y: number): string {
  const b = BOX[id];
  return `<use href="#fl-${id}" x="${b.x + x}" y="${b.y + y}" width="${b.w}" height="${b.h}"/>`;
}

/** The glow rectangle is sheared onto the monitor's screen plane, never filtered. */
export const SHEAR = 'matrix(1 .5 0 1 0 0)';

/**
 * The isometric skew for a LEFT-facing plane. Text drawn inside it reads as painted on
 * the wall rather than floating in front of it, which is what puts the two humans' names
 * on their own cabins instead of on the floor beside them.
 */
export const WALL_SKEW = 'matrix(1 -0.5 0 1 0 0)';

/** The desk inside a cabin stands one module-half back from the cabin's far corner. */
export const CABIN_DESK_Y = 24;

const D = CABIN_DESK_Y;

/**
 * The lamp, on its own: the fixture that hangs the room's one real light, plus the cone
 * gradient that makes the light legible AS light rather than as a pale triangle.
 *
 * It is split out of `FLOOR_DEFS` because a THIRD renderer needs exactly this much and
 * no more — the empty room on `/404`, which is the floor slab and the lamp, no desks and
 * no chair. Taking the whole of `FLOOR_DEFS` there would ship seven desk symbols, two
 * cabins and an occupant to a page that draws none of them.
 */
export const LAMP_DEFS = `<linearGradient id="fl-cone" x1="0" y1="0" x2="0" y2="1">
    <stop class="fl-cone-a" offset="0"/>
    <stop class="fl-cone-b" offset="1"/>
  </linearGradient>

  <linearGradient id="fl-slab-g" x1="0" y1="0" x2=".7" y2="1">
    <stop class="fl-slab-a" offset="0"/>
    <stop class="fl-slab-b" offset="1"/>
  </linearGradient>

  <symbol id="fl-lamp" viewBox="-15 -84 30 28" overflow="visible">
    <path class="fl-cord" d="M-1-84h2v20h-2Z"/>
    <path class="fl-shade" d="M-11-64h22l4 8h-30Z"/>
  </symbol>`;

export const FLOOR_DEFS = `<defs>
  ${LAMP_DEFS}

  <linearGradient id="fl-glass-g" x1="0" y1="0" x2=".4" y2="1">
    <stop class="fl-glass-a" offset="0"/>
    <stop class="fl-glass-b" offset="1"/>
  </linearGradient>

  <linearGradient id="fl-screen-g" x1="0" y1="0" x2="0" y2="1">
    <stop class="fl-screen-a" offset="0"/>
    <stop class="fl-screen-b" offset="1"/>
  </linearGradient>

  <symbol id="fl-mod" viewBox="-64 0 128 64" overflow="visible">
    <path class="fl-tile" d="M0 0 64 32 0 64-64 32Z"/>
  </symbol>

  <symbol id="fl-dk" viewBox="-46 -14 92 58" overflow="visible">
    <path class="fl-side" d="M-44 10 0 32 0 42-44 20Z"/>
    <path class="fl-deep" d="M44 10 0 32 0 42 44 20Z"/>
    <path class="fl-pane" d="M0-12 44 10 0 32-44 10Z"/>
  </symbol>

  <symbol id="fl-mon" viewBox="0 -40 38 50" overflow="visible">
    <path class="fl-body" d="M2-39 36-22 36 8 2-9Z"/>
    <path class="fl-glow fl-screen" d="M6-33 32-20 32 2 6-11Z"/>
  </symbol>

  <symbol id="fl-ch" viewBox="-16 -32 32 40" overflow="visible">
    <path class="fl-body" d="M-16-32 0-24 0-2-16-10Z"/>
    <path class="fl-seatpad" d="M0-8 16 0 0 8-16 0Z"/>
  </symbol>

  <symbol id="fl-dog-p" viewBox="-24 -34 48 40" overflow="visible">
    <path class="fl-ear" d="M-15-18-21-33-6-27Z"/>
    <path class="fl-ear" d="M15-18 21-33 6-27Z"/>
    <path class="fl-head" d="M-15-17Q-15-27-5-27H5Q15-27 15-17V-8Q15 2 0 2Q-15 2-15-8Z"/>
    <rect class="fl-muzzle" x="-6" y="-7" width="12" height="7" rx="3.5"/>
  </symbol>

  <symbol id="fl-dog-f" viewBox="-24 -34 48 40" overflow="visible">
    <path class="fl-ear" d="M-15-19Q-24-24-22-12Q-16-12-14-16Z"/>
    <path class="fl-ear" d="M15-19Q24-24 22-12Q16-12 14-16Z"/>
    <path class="fl-head" d="M-15-17Q-15-27-5-27H5Q15-27 15-17V-8Q15 2 0 2Q-15 2-15-8Z"/>
    <rect class="fl-muzzle" x="-6" y="-7" width="12" height="7" rx="3.5"/>
  </symbol>

  <symbol id="fl-agent" viewBox="-64 -40 128 104" overflow="visible">
    ${u('ch', -24, 42)}
    ${u('dk', 0, 0)}
    ${u('mon', 0, 0)}
    ${u('dog-p', -22, 6)}
  </symbol>

  <symbol id="fl-agent-f" viewBox="-64 -40 128 104" overflow="visible">
    ${u('ch', -24, 42)}
    ${u('dk', 0, 0)}
    ${u('mon', 0, 0)}
    ${u('dog-f', -22, 6)}
  </symbol>

  <symbol id="fl-occ" viewBox="-11 -47 22 49" overflow="visible">
    <path class="fl-body" d="M0-32 10-27 10-4 0 1-10-4-10-27Z"/>
    <circle class="fl-headround" cx="0" cy="-40" r="6"/>
  </symbol>

  <symbol id="fl-seat" viewBox="-46 -84 92 140" overflow="visible">
    ${u('lamp', 0, 0)}
    ${u('dk', 0, -14)}
    <path class="fl-seatpad" d="M-16 15 6 26 6 40-16 29Z"/>
    <path class="fl-deep" d="M-16 15 6 26 2.6 27.7-19.4 16.7Z"/>
    <path class="fl-seatpad" d="M-16 29 6 40-16 51-38 40Z"/>
    <path class="fl-deep" d="M-38 40-16 51 6 40 6 45-16 56-38 45Z"/>
    <path class="fl-deep" d="M-40 45h4v10h-4ZM4 45h4v10h-4Z"/>
  </symbol>

  <symbol id="fl-cabin-s" viewBox="-136 -48 272 184" overflow="visible">
    <path class="fl-wall-r" d="M0-40 128 24 128 64 0 0Z"/>
    <path class="fl-wall-l" d="M0-40-128 24-128 64 0 0Z"/>
    <path class="fl-cabin-floor" d="M0 0 128 64 0 128-128 64Z"/>
    <g transform="${SHEAR}">
      <rect class="fl-pane" x="34" y="-34" width="60" height="28"/>
      <rect class="fl-body" x="40" y="-28" width="14" height="8"/>
      <rect class="fl-body" x="62" y="-28" width="14" height="8"/>
      <rect class="fl-body" x="51" y="-15" width="14" height="8"/>
      <path class="fl-mark" d="M54-24h8"/>
      <path class="fl-mark" d="M69-20 60-15"/>
    </g>
    <g transform="rotate(-12 -26 ${D + 50})">${u('ch', -26, D + 50)}</g>
    ${u('dk', 0, D)}
    ${u('mon', 0, D)}
    ${u('occ', -20, D + 44)}
    <g transform="${WALL_SKEW}">
      <rect class="fl-body" x="-36" y="${D - 22}" width="14" height="34"/>
      <rect class="fl-body" x="-32" y="${D + 12}" width="6" height="5"/>
    </g>
    <path class="fl-body" d="M-70 78h14l-3 12h-8Z"/>
    <path class="fl-plant" d="M-63 78c-10-4-12-12-9-18 6 2 9 9 9 18Z"/>
    <path class="fl-plant" d="M-63 78c-3-10-1-19 5-23 2 8 0 16-5 23Z"/>
    <path class="fl-plant" d="M-63 78c7-4 11-10 11-16-6 2-10 8-11 16Z"/>
  </symbol>

  <symbol id="fl-cabin-t" viewBox="-136 -48 272 184" overflow="visible">
    <path class="fl-wall-r" d="M0-40 128 24 128 64 0 0Z"/>
    <path class="fl-wall-l" d="M0-40-128 24-128 64 0 0Z"/>
    <path class="fl-cabin-floor" d="M0 0 128 64 0 128-128 64Z"/>
    <g transform="${SHEAR}">
      <rect class="fl-body" x="36" y="-34" width="56" height="30"/>
      <rect class="fl-pane" x="41" y="-30" width="46" height="13"/>
      <rect class="fl-mark-fill" x="41" y="-16" width="46" height="8"/>
    </g>
    <g transform="rotate(-12 -26 ${D + 50})">${u('ch', -26, D + 50)}</g>
    ${u('dk', 0, D)}
    ${u('mon', 0, D)}
    ${u('occ', -20, D + 44)}
    <g transform="${SHEAR}">
      <rect class="fl-body" x="52" y="${D + 30}" width="34" height="6"/>
      <rect class="fl-pane" x="56" y="${D + 18}" width="7" height="12"/>
      <rect class="fl-pane" x="66" y="${D + 18}" width="7" height="12"/>
      <rect class="fl-pane" x="76" y="${D + 18}" width="7" height="12"/>
    </g>
    <g transform="${WALL_SKEW}">
      <rect class="fl-body" x="-40" y="${D + 4}" width="20" height="4"/>
      <rect class="fl-pane" x="-39" y="${D}" width="20" height="4"/>
      <rect class="fl-body" x="-38" y="${D - 4}" width="20" height="4"/>
    </g>
  </symbol>
</defs>`;
