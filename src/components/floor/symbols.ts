import { BOX } from './plan';

/**
 * DESIGN.md §C.1 and §C.10 — the studio floor's `<defs>`: one gradient and eight
 * symbols, authored once.
 *
 * They live here as markup rather than inside the component because two renderers need
 * the same drawing: the page's own inline scene, and the build-time OG card
 * (`src/lib/og/floor-card.ts`, PLAN.md §1.7), which reuses these symbols instead of
 * redrawing the room a second way. Nothing about a symbol's geometry is typed twice, and
 * the placements both renderers use come from `plan.ts`, which is the same single source
 * of truth for where a station sits.
 *
 * Fills are class names, not values. On the page they resolve from the four §C.1 tokens
 * the component scopes to `.floor__scene`; in the standalone card they resolve from the
 * light-scheme `<style>` block the card writes into its own SVG root.
 */

/** Every `<use>` repeats its symbol's own bounding box, so nothing is scaled by accident. */
function u(id: keyof typeof BOX, x: number, y: number): string {
  const b = BOX[id];
  return `<use href="#fl-${id}" x="${b.x + x}" y="${b.y + y}" width="${b.w}" height="${b.h}"/>`;
}

/** The glow rectangle is sheared onto the monitor's screen plane, never filtered. */
export const SHEAR = 'matrix(1 .5 0 1 0 0)';

/** The desk inside a cabin stands one module-half back from the cabin's far corner. */
export const CABIN_DESK_Y = 24;

const D = CABIN_DESK_Y;

/**
 * The lamp, on its own: DESIGN.md §C.1's one gradient and the fixture that hangs it.
 *
 * It is split out of `FLOOR_DEFS` because a THIRD renderer needs exactly this much and
 * no more — DESIGN.md §B.11's empty room on `/404`, which is "the floor slab and the
 * lamp, no desks, no chair" and "reuses the floor's slab symbol and its lamp gradient
 * and adds nothing, so it costs roughly zero new bytes". Taking the whole of
 * `FLOOR_DEFS` there would have shipped seven desk symbols, two cabins and an occupant
 * to a page that draws none of them; re-typing the gradient would have made the site's
 * one light two drawings. This is the one string both pages read.
 */
export const LAMP_DEFS = `<linearGradient id="fl-cone" x1="0" y1="0" x2="0" y2="1">
    <stop class="fl-cone-a" offset="0"/>
    <stop class="fl-cone-b" offset="1"/>
  </linearGradient>

  <symbol id="fl-lamp" viewBox="-15 -84 30 28" overflow="visible">
    <path class="fl-lit" d="M-1-84h2v20h-2Z"/>
    <path class="fl-shadow" d="M-11-64h22l4 8h-30Z"/>
  </symbol>`;

export const FLOOR_DEFS = `<defs>
  ${LAMP_DEFS}

  <symbol id="fl-mod" viewBox="-64 0 128 64" overflow="visible">
    <path class="fl-seam" d="M0 0 64 32 0 64-64 32Z"/>
  </symbol>

  <symbol id="fl-dk" viewBox="-46 -14 92 58" overflow="visible">
    <path class="fl-slab" d="M-44 10 0 32 0 42-44 20Z"/>
    <path class="fl-shadow" d="M44 10 0 32 0 42 44 20Z"/>
    <path class="fl-top" d="M0-12 44 10 0 32-44 10Z"/>
  </symbol>

  <symbol id="fl-mon" viewBox="0 -40 38 50" overflow="visible">
    <path class="fl-shadow" d="M2-39 36-22 36 8 2-9Z"/>
  </symbol>

  <symbol id="fl-ch" viewBox="-16 -32 32 40" overflow="visible">
    <path class="fl-shadow" d="M-16-32 0-24 0-2-16-10Z"/>
    <path class="fl-lit" d="M0-8 16 0 0 8-16 0Z"/>
  </symbol>

  <symbol id="fl-agent" viewBox="-64 -40 128 104" overflow="visible">
    ${u('ch', -24, 42)}
    ${u('dk', 0, 0)}
    ${u('mon', 0, 0)}
  </symbol>

  <symbol id="fl-occ" viewBox="-11 -47 22 49" overflow="visible">
    <path class="fl-shadow" d="M0-32 10-27 10-4 0 1-10-4-10-27Z"/>
    <circle class="fl-lit" cx="0" cy="-40" r="6"/>
  </symbol>

  <symbol id="fl-seat" viewBox="-46 -84 92 140" overflow="visible">
    ${u('lamp', 0, 0)}
    ${u('dk', 0, -14)}
    <path class="fl-lit" d="M-16 15 6 26 6 40-16 29Z"/>
    <path class="fl-shadow" d="M-16 15 6 26 2.6 27.7-19.4 16.7Z"/>
    <path class="fl-lit" d="M-16 29 6 40-16 51-38 40Z"/>
    <path class="fl-shadow" d="M-38 40-16 51 6 40 6 45-16 56-38 45Z"/>
    <path class="fl-shadow" d="M-40 45h4v10h-4ZM4 45h4v10h-4Z"/>
  </symbol>

  <symbol id="fl-cabin-s" viewBox="-136 -48 272 184" overflow="visible">
    <path class="fl-wall" d="M0-40 128 24 128 64 0 0Z"/>
    <path class="fl-wall" d="M0-40-128 24-128 64 0 0Z"/>
    <path class="fl-lit" d="M0 0 128 64 0 128-128 64Z"/>
    <g transform="${SHEAR}">
      <rect class="fl-lit" x="34" y="-34" width="60" height="28"/>
      <rect class="fl-shadow" x="40" y="-28" width="14" height="8"/>
      <rect class="fl-shadow" x="62" y="-28" width="14" height="8"/>
      <rect class="fl-shadow" x="51" y="-15" width="14" height="8"/>
      <path class="fl-mark" d="M54-24h8"/>
      <path class="fl-mark" d="M69-20 60-15"/>
    </g>
    <g transform="rotate(-12 -26 ${D + 50})">${u('ch', -26, D + 50)}</g>
    ${u('dk', 0, D)}
    ${u('mon', 0, D)}
    ${u('occ', -20, D + 44)}
    <g transform="matrix(1 -0.5 0 1 0 0)">
      <rect class="fl-shadow" x="-36" y="${D - 22}" width="14" height="34"/>
      <rect class="fl-shadow" x="-32" y="${D + 12}" width="6" height="5"/>
    </g>
    <path class="fl-shadow" d="M-70 78h14l-3 12h-8Z"/>
    <path class="fl-lit" d="M-63 78c-10-4-12-12-9-18 6 2 9 9 9 18Z"/>
    <path class="fl-lit" d="M-63 78c-3-10-1-19 5-23 2 8 0 16-5 23Z"/>
    <path class="fl-lit" d="M-63 78c7-4 11-10 11-16-6 2-10 8-11 16Z"/>
  </symbol>

  <symbol id="fl-cabin-t" viewBox="-136 -48 272 184" overflow="visible">
    <path class="fl-wall" d="M0-40 128 24 128 64 0 0Z"/>
    <path class="fl-wall" d="M0-40-128 24-128 64 0 0Z"/>
    <path class="fl-lit" d="M0 0 128 64 0 128-128 64Z"/>
    <g transform="${SHEAR}">
      <rect class="fl-shadow" x="36" y="-34" width="56" height="30"/>
      <rect class="fl-lit" x="41" y="-30" width="46" height="13"/>
      <rect class="fl-mark-fill" x="41" y="-16" width="46" height="8"/>
    </g>
    <g transform="rotate(-12 -26 ${D + 50})">${u('ch', -26, D + 50)}</g>
    ${u('dk', 0, D)}
    ${u('mon', 0, D)}
    ${u('occ', -20, D + 44)}
    <g transform="${SHEAR}">
      <rect class="fl-shadow" x="52" y="${D + 30}" width="34" height="6"/>
      <rect class="fl-lit" x="56" y="${D + 18}" width="7" height="12"/>
      <rect class="fl-lit" x="66" y="${D + 18}" width="7" height="12"/>
      <rect class="fl-lit" x="76" y="${D + 18}" width="7" height="12"/>
    </g>
    <g transform="matrix(1 -0.5 0 1 0 0)">
      <rect class="fl-shadow" x="-40" y="${D + 4}" width="20" height="4"/>
      <rect class="fl-lit" x="-39" y="${D}" width="20" height="4"/>
      <rect class="fl-shadow" x="-38" y="${D - 4}" width="20" height="4"/>
    </g>
  </symbol>
</defs>`;
