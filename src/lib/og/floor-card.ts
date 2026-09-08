import { FLOOR_DEFS } from '../../components/floor/symbols';
import {
  BOX,
  STILL_GLOW,
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
 * values — the card is DARK-only, whatever scheme the visitor is in, because the site is
 * dark-first and a share preview should look like the page it links to — and the room is
 * cropped to itself, since the page's own scene box carries margin the card has no use
 * for.
 *
 * No nameplates. At the size a share card is actually seen, 13px labels are noise, and
 * COPY.md §10.2's one sentence is what carries the scene to anyone who cannot see it.
 */

/**
 * The dark scheme's floor ramp, flattened to literals.
 *
 * The page resolves every one of these from a token — and every `rgba()` in the room
 * from `--f-ink-rgb`, which is the mechanism that lets one variable invert the whole
 * scene. A standalone SVG handed to satori has no `:root` to read, so the same values
 * are written out here. They are the dark half of `tokens.css` and nothing else: if the
 * room's ramp changes there, these five lines change with it.
 */
const FILLS = {
  ground: '#04060B',
  ink: '234,236,242',
  slabA: '#141C2E',
  slabB: '#070A12',
  side: '#0A0F1A',
  deep: '#05070C',
  screen: '#7FD7E8',
  accent: '#DF8FE2',
  lamp: '#E9B968',
} as const;

/**
 * The drawn room's own extent inside DESIGN.md §C.3's 856 x 520 scene box, with eight
 * units of air on each side: the slab runs x 76 to 780, the cabins' wall tops sit at
 * y 64 and the slab's near corner — where the lamp's pool ends — at y 456. The page's
 * own box carries 76 and 64 of margin for the nameplates and the focus ring, and the
 * card prints neither, so it crops to the drawing.
 */
export const FLOOR_CROP = { x: 68, y: 56, w: 720, h: 408 } as const;

export function floorSceneSvg(): string {
  const scene = wideOrder(placements());

  const stations = scene
    .map((p) => {
      const glowY = p.shape === 'cabin' ? CABIN_DESK_Y - 37 : -37;
      const body =
        p.shape === 'cabin'
          ? `<use href="#fl-cabin-${p.i === 0 ? 's' : 't'}" x="${BOX.cabin.x}" y="${BOX.cabin.y}" width="${BOX.cabin.w}" height="${BOX.cabin.h}"/>`
          : p.shape === 'agent'
            ? `<use href="#fl-agent${p.i % 2 === 0 ? '-f' : ''}" x="${BOX.agent.x}" y="${BOX.agent.y}" width="${BOX.agent.w}" height="${BOX.agent.h}"/>`
            : `<path class="fl-cone" d="M0 0 64 32 0 64-64 32Z"/><use href="#fl-seat" x="${BOX.seat.x}" y="${BOX.seat.y}" width="${BOX.seat.w}" height="${BOX.seat.h}"/><path class="fl-cone" d="M0-26 44-4 0 18-44-4Z"/><path class="fl-cone" d="M-9-56 9-56 44-4-44-4Z"/>`;
      /* §C.9's still frame: nine stations, nine different static opacities. The chair
         has no monitor and therefore no glow, which is the point of it. */
      const glow =
        p.i < 9
          ? `<rect class="fl-glow" x="5" y="${glowY}" width="28" height="24" transform="${SHEAR}" opacity="${STILL_GLOW[p.i]}"/>`
          : '';
      return `<g transform="${p.wideTransform}">${body}${glow}</g>`;
    })
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${FLOOR_CROP.x} ${FLOOR_CROP.y} ${FLOOR_CROP.w} ${FLOOR_CROP.h}" width="${FLOOR_CROP.w}" height="${FLOOR_CROP.h}">
<style>
  .fl-slab{fill:url(#fl-slab-g);stroke:rgba(${FILLS.ink},.16);stroke-width:1}
  .fl-slab-a{stop-color:${FILLS.slabA}}
  .fl-slab-b{stop-color:${FILLS.slabB}}
  .fl-tile{fill:url(#fl-slab-g)}
  .fl-pane{fill:url(#fl-glass-g);stroke:rgba(${FILLS.ink},.28);stroke-width:1}
  .fl-glass-a{stop-color:#EAECF2;stop-opacity:.2}
  .fl-glass-b{stop-color:#EAECF2;stop-opacity:.05}
  .fl-wall-r{fill:rgba(${FILLS.ink},.1);stroke:rgba(${FILLS.ink},.3);stroke-width:1}
  .fl-wall-l{fill:rgba(${FILLS.ink},.16);stroke:rgba(${FILLS.ink},.3);stroke-width:1}
  .fl-cabin-floor{fill:rgba(${FILLS.ink},.06);stroke:rgba(${FILLS.ink},.2);stroke-width:1}
  .fl-side{fill:${FILLS.side}}
  .fl-deep{fill:${FILLS.deep}}
  .fl-body{fill:${FILLS.side};stroke:rgba(${FILLS.ink},.2);stroke-width:1}
  .fl-seatpad{fill:rgba(${FILLS.ink},.22)}
  .fl-headround{fill:rgba(${FILLS.ink},.5)}
  .fl-plant{fill:rgba(${FILLS.ink},.34)}
  .fl-cord{fill:rgba(${FILLS.ink},.4)}
  .fl-shade{fill:${FILLS.side};stroke:rgba(${FILLS.lamp.slice(1)},.55);stroke-width:1}
  .fl-ear{fill:rgba(${FILLS.ink},.55)}
  .fl-head{fill:${FILLS.side};stroke:rgba(${FILLS.ink},.62);stroke-width:1.6}
  .fl-muzzle{fill:rgba(${FILLS.ink},.62)}
  .fl-screen{fill:url(#fl-screen-g)}
  .fl-screen-a{stop-color:${FILLS.accent};stop-opacity:.85}
  .fl-screen-b{stop-color:${FILLS.screen};stop-opacity:.35}
  .fl-glow{fill:url(#fl-screen-g)}
  .fl-mark{fill:none;stroke:rgba(${FILLS.ink},.45);stroke-width:1.4}
  .fl-mark-fill{fill:rgba(${FILLS.ink},.24)}
  .fl-edge{stroke:rgba(${FILLS.ink},.16);stroke-width:1}
  .fl-cone{fill:url(#fl-cone);opacity:.7}
  .fl-cone-a{stop-color:${FILLS.lamp};stop-opacity:.55}
  .fl-cone-b{stop-color:${FILLS.lamp};stop-opacity:.03}
</style>
${FLOOR_DEFS}
<rect x="${FLOOR_CROP.x}" y="${FLOOR_CROP.y}" width="${FLOOR_CROP.w}" height="${FLOOR_CROP.h}" fill="${FILLS.ground}"/>
<g transform="${WIDE_TRANSFORM}"><polygon class="fl-slab fl-edge" points="${WIDE_SLAB}"/>${stations}</g>
</svg>`;
}
