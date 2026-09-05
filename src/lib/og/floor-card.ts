import { FLOOR_DEFS } from '../../components/floor/symbols';
import {
  BOX,
  STILL_GLOW,
  WIDE_MODULES,
  WIDE_SLAB,
  WIDE_TRANSFORM,
  placements,
  wideOrder,
} from '../../components/floor/plan';
import { SHEAR, CABIN_DESK_Y } from '../../components/floor/symbols';

/**
 * The studio floor, as a standalone SVG for the build-time OG card (PLAN.md §1.7, brief
 * §12: "the home OG image should show the floor").
 *
 * It reuses the page's own `<defs>` and the same `plan.ts` placements, so the card and
 * the room cannot drift: a change to a symbol or to where a station sits reaches both.
 * The two differences from the page's scene are deliberate and are what "standalone"
 * means — the four §C.1 fills are written into the file's own `<style>` at their LIGHT
 * values (§B.2a: the OG card is light-only, whatever scheme the visitor is in), and the
 * room is cropped to itself, since the page's 792 x 560 box carries margin the card has
 * no use for.
 *
 * No nameplates. At the size a share card is actually seen, 13px labels are noise, and
 * COPY.md §10.2's one sentence is what carries the scene to anyone who cannot see it.
 */

/** DESIGN.md §B.2 and §C.1, light scheme. The card never renders the dark palette. */
const FILLS = {
  ground: '#0F2A2E',
  lit: 'rgba(232,237,233,.22)',
  shadow: '#0A1E21',
  glow: '#E8EDE9',
  lamp: '#F2A93B',
} as const;

/**
 * The drawn room's own extent inside the 792 x 560 scene box: x from the left margin to
 * the far column's edge, y from the cabins' wall tops to the near corner of the slab.
 */
export const FLOOR_CROP = { x: 40, y: 70, w: 712, h: 424 } as const;

export function floorSceneSvg(): string {
  const scene = wideOrder(placements());

  const stations = scene
    .map((p) => {
      const glowY = p.shape === 'cabin' ? CABIN_DESK_Y - 37 : -37;
      const body =
        p.shape === 'cabin'
          ? `<use href="#fl-cabin-${p.i === 0 ? 's' : 't'}" x="${BOX.cabin.x}" y="${BOX.cabin.y}" width="${BOX.cabin.w}" height="${BOX.cabin.h}"/>`
          : p.shape === 'agent'
            ? `<use href="#fl-agent" x="${BOX.agent.x}" y="${BOX.agent.y}" width="${BOX.agent.w}" height="${BOX.agent.h}"/>`
            : `<use href="#fl-seat" x="${BOX.seat.x}" y="${BOX.seat.y}" width="${BOX.seat.w}" height="${BOX.seat.h}"/><path class="fl-cone" d="M-9-56 9-56 44 10-44 10Z"/>`;
      /* §C.9's still frame: nine stations, nine different static opacities. The chair
         has no monitor and therefore no glow, which is the point of it. */
      const glow =
        p.i < 9
          ? `<rect class="fl-glow" x="5" y="${glowY}" width="28" height="24" transform="${SHEAR}" opacity="${STILL_GLOW[p.i]}"/>`
          : '';
      return `<g transform="${p.wideTransform}">${body}${glow}</g>`;
    })
    .join('');

  const modules = WIDE_MODULES.map(
    (m) => `<use href="#fl-mod" x="${m.x - 64}" y="${m.y}" width="128" height="64"/>`,
  ).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${FLOOR_CROP.x} ${FLOOR_CROP.y} ${FLOOR_CROP.w} ${FLOOR_CROP.h}" width="${FLOOR_CROP.w}" height="${FLOOR_CROP.h}">
<style>
  .fl-slab{fill:${FILLS.ground}}
  .fl-lit{fill:${FILLS.lit}}
  .fl-shadow{fill:${FILLS.shadow}}
  .fl-top{fill:${FILLS.lit}}
  .fl-glow{fill:${FILLS.glow}}
  .fl-wall{fill:${FILLS.shadow};stroke:${FILLS.lit};stroke-width:1}
  .fl-seam{fill:none;stroke:${FILLS.lit};stroke-width:1}
  .fl-mark{fill:none;stroke:${FILLS.glow};stroke-width:1.5;opacity:.55}
  .fl-mark-fill{fill:${FILLS.glow};opacity:.4}
  .fl-cone{fill:url(#fl-cone)}
  .fl-cone-a{stop-color:${FILLS.lamp};stop-opacity:.5}
  .fl-cone-b{stop-color:${FILLS.lamp};stop-opacity:.06}
</style>
${FLOOR_DEFS}
<rect x="${FLOOR_CROP.x}" y="${FLOOR_CROP.y}" width="${FLOOR_CROP.w}" height="${FLOOR_CROP.h}" fill="${FILLS.ground}"/>
<g transform="${WIDE_TRANSFORM}"><polygon class="fl-slab" points="${WIDE_SLAB}"/>${modules}${stations}</g>
</svg>`;
}
