/**
 * The studio floor's two plans, computed rather than typed.
 *
 * DESIGN.md §C.1 — standard 2:1 isometry, 128 x 64 modules, camera front-centre. The
 * projection below is the one §C.3's ASCII plan describes: columns A-F run screen
 * right-and-down, rows 1-5 run screen left-and-down, so the plan's near corner (row 5)
 * lands at the bottom of the screen and the empty chair at F5 is the closest cell to
 * the viewer. §C.3's own arithmetic is the check: a 6 x 5 plan projects to
 * (6+5) x 64 = 704 wide and (6+5) x 32 = 352 tall, which is exactly what `wide()` below
 * produces.
 *
 * DESIGN.md §C.10 — the portrait plan is the *same* symbols at different `<use>`
 * transforms and a different `viewBox`. Nothing here duplicates geometry; every entry
 * is a placement.
 */

/** Module half-width and half-height, DESIGN.md §C.1. */
export const HW = 64;
export const HH = 32;

/** DESIGN.md §C.3 — the desktop scene box. */
export const WIDE_BOX = { w: 792, h: 560 } as const;
/** DESIGN.md §C.7 — the portrait scene box. */
export const TALL_BOX = { w: 320, h: 520 } as const;

/**
 * Where the 6 x 5 room sits inside the 792 x 560 box. §C.3 asks for 44px of horizontal
 * margin each side, which is what `tx` is. `ty` centres the drawn room (its extremes are
 * the cabins' wall tops at -48 and the floor's near corner at 352) in the box, which
 * leaves a wider vertical margin than §C.3's ~30px estimate — a margin is the one thing
 * that can only help the focus ring on an edge station, so it is left generous.
 */
const WIDE_ORIGIN = { tx: 44, ty: 128 } as const;
/** x of plan column 0 / row 0, chosen so the projected diamond starts at local x = 0. */
const WIDE_X0 = 5 * HW;

/** Screen point of the plan lattice node (c, r), in room-local units. */
export function wpt(c: number, r: number): { x: number; y: number } {
  return { x: WIDE_X0 + HW * (c - r), y: HH * (c + r) };
}

export const WIDE_TRANSFORM = `translate(${WIDE_ORIGIN.tx} ${WIDE_ORIGIN.ty})`;

/** DESIGN.md §C.7 — the portrait plan's uniform scale. One scale keeps one room. */
export const TALL_SCALE = 0.6;

export type StationShape = 'cabin' | 'agent' | 'chair';

interface WideCell {
  /** Plan column of the station's far corner. */
  c: number;
  /** Plan row of the station's far corner. */
  r: number;
  /** Footprint in modules: 2 for a cabin, 1 for everything else. */
  span: number;
}

interface TallCell {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Placement {
  /** Index in the roster, which is DESIGN.md §C.8's tab order and the DOM order. */
  i: number;
  shape: StationShape;
  /** Room-local transform for the desktop plan. */
  wideTransform: string;
  /** Scene-local transform for the portrait plan. */
  tallTransform: string;
  /** Button centre and size, as percentages of each scene box. */
  wide: { x: string; y: string };
  tall: { x: string; y: string };
  /** Nameplate anchor in the portrait scene's own units. */
  tallPlateX: number;
  tallPlateY: number;
  /** Painter's-algorithm rank for the desktop plan; the portrait plan draws in DOM order. */
  wideDepth: number;
}

/**
 * DESIGN.md §C.3 and §C.7, by roster index. Index 0 and 1 are the two cabins, 2-8 the
 * seven agent desks in COPY.md §2.4's pipeline order, 9 the empty chair. Keying on the
 * index rather than on a slug is what keeps this table honest against §C.8: the order
 * *is* the argument, so the plan reads the same list the DOM does.
 */
const WIDE_CELLS: WideCell[] = [
  { c: 0, r: 0, span: 2 }, // Sahib's cabin, A1-B2
  { c: 0, r: 2, span: 2 }, // Tanya's cabin, A3-B4
  { c: 2, r: 0, span: 1 }, // Spec Writer, C1
  { c: 4, r: 0, span: 1 }, // Designer, E1
  { c: 3, r: 1, span: 1 }, // Programmer, D2
  { c: 5, r: 1, span: 1 }, // Test Engineer, F2
  { c: 2, r: 2, span: 1 }, // Security Auditor, C3
  { c: 4, r: 2, span: 1 }, // Reviewer, E3
  { c: 3, r: 3, span: 1 }, // Release Watcher, D4
  { c: 5, r: 4, span: 1 }, // the empty chair, F5
];

/**
 * DESIGN.md §C.7's portrait grid, and its own height arithmetic:
 * 88 + 8 + 88 + 12 + 64 + 8 + 64 + 8 + 64 + 12 + 96 = 512, in a 520 box with 8 for the
 * lamp cone's spill. The three agent columns are (320 - two 8px gaps) / 3 = 101.33.
 */
const COL_W = (TALL_BOX.w - 16) / 3;
const COL_X = [0, COL_W + 8, 2 * (COL_W + 8)] as const;
const TALL_CELLS: TallCell[] = [
  { x: 0, y: 8, w: 320, h: 88 }, // Sahib's cabin, full width
  { x: 0, y: 104, w: 320, h: 88 }, // Tanya's cabin, full width
  { x: COL_X[0], y: 204, w: COL_W, h: 64 },
  { x: COL_X[1], y: 204, w: COL_W, h: 64 },
  { x: COL_X[2], y: 204, w: COL_W, h: 64 },
  { x: COL_X[0], y: 276, w: COL_W, h: 64 },
  { x: COL_X[1], y: 276, w: COL_W, h: 64 },
  { x: COL_X[2], y: 276, w: COL_W, h: 64 },
  { x: COL_X[0], y: 348, w: COL_W, h: 64 },
  { x: 216, y: 424, w: 104, h: 96 }, // the chair, alone at the bottom right
];

/**
 * Each symbol's own bounding box, which is also its `viewBox`. The `<use>` that places a
 * symbol carries the same four numbers as x/y/width/height, so the desktop plan renders
 * every symbol at exactly 1:1 and the portrait plan is one uniform scale off it.
 */
export const BOX = {
  mod: { x: -64, y: 0, w: 128, h: 64 },
  dk: { x: -46, y: -14, w: 92, h: 58 },
  mon: { x: 0, y: -40, w: 38, h: 50 },
  ch: { x: -16, y: -32, w: 32, h: 40 },
  agent: { x: -64, y: -40, w: 128, h: 104 },
  seat: { x: -46, y: -84, w: 92, h: 134 },
  cabin: { x: -136, y: -48, w: 272, h: 184 },
} as const;

const SHAPE_BOX = { cabin: BOX.cabin, agent: BOX.agent, chair: BOX.seat } as const;

/** DESIGN.md §C.3 and §C.7 — button footprints, per station class, per plan. */
export const TARGETS = {
  wide: {
    /*
      §C.3 gives the cabin button as "= 232 x 148". Two 2 x 2 cabins one module apart
      project to centres 128 apart in x and 64 apart in y, so any pair of rectangles
      wider than 128 *and* taller than 64 overlaps, and the nearer button would steal
      the farther cabin's own clicks. 128 x 136 is the largest pair that cannot: it
      keeps §C.3's height almost exactly and takes the width down to the one value that
      makes the two footprints meet without crossing. Both dimensions are still far past
      44 x 44, and the same arithmetic clears the Security Auditor's desk directly below.
    */
    cabin: { w: 128, h: 136 },
    agent: { w: 112, h: 56 },
    chair: { w: 128, h: 88 },
  },
  tall: {
    cabin: { w: 320, h: 88 },
    agent: { w: COL_W, h: 64 },
    chair: { w: 104, h: 96 },
  },
} as const;

const round = (n: number): number => Math.round(n * 10000) / 10000;
const pct = (n: number, of: number): string => `${round((n / of) * 100)}%`;
const num = (n: number): string => String(Math.round(n * 100) / 100);

export function placements(): Placement[] {
  return WIDE_CELLS.map((cell, i) => {
    const shape: StationShape = i < 2 ? 'cabin' : i === WIDE_CELLS.length - 1 ? 'chair' : 'agent';
    const node = wpt(cell.c, cell.r);

    /*
      The button sits on the centre of the *artwork*, not of the module. A desk is 104
      units tall and its button is §C.3's 56, so where those 56 land decides whether a
      pointer on the monitor hits the desk it is over; centring on the module put the
      whole monitor outside its own target. The offsets below are each symbol's own
      bounding-box centre, except the chair's, which is biased down off the lamp cone so
      the target covers the desk and the seat rather than the light above them.
    */
    const lift = shape === 'cabin' ? 44 : shape === 'chair' ? 10 : 12;
    const centre = {
      x: WIDE_ORIGIN.tx + node.x,
      y: WIDE_ORIGIN.ty + node.y + lift,
    };

    const tall = TALL_CELLS[i];
    if (!tall) throw new Error(`The portrait plan has no cell for station ${i}.`);
    const box = SHAPE_BOX[shape];
    /* Anchor each symbol by its own bounding-box centre, so a station sits in its
       portrait cell the same way it sits on its module. The two cabins are the one
       exception: their artwork is taller than §C.7's 88px row, so they are hung from
       four units above the row instead and overlap the row below, which is what an
       isometric object nearer the camera does anyway. */
    const anchorY = shape === 'cabin' ? box.y : box.y + box.h / 2;
    const targetY = shape === 'cabin' ? tall.y - 4 : tall.y + tall.h / 2;
    const tallT = {
      x: tall.x + tall.w / 2 - TALL_SCALE * (box.x + box.w / 2),
      y: targetY - TALL_SCALE * anchorY,
    };

    return {
      i,
      shape,
      wideTransform: `translate(${node.x} ${node.y})`,
      tallTransform: `translate(${num(tallT.x)} ${num(tallT.y)}) scale(${TALL_SCALE})`,
      wide: { x: pct(centre.x, WIDE_BOX.w), y: pct(centre.y, WIDE_BOX.h) },
      tall: {
        x: pct(tall.x + tall.w / 2, TALL_BOX.w),
        y: pct(tall.y + tall.h / 2, TALL_BOX.h),
      },
      /* A cabin's plate sits on its own near edge; every other station's floats above
         its desk, in the gap §C.7's row arithmetic already leaves there. */
      tallPlateX: tall.x + tall.w / 2,
      /* Ten units above the row rather than three: the focus ring reaches six units past
         the button's own top edge, and at three the ring drew straight through the plate. */
      tallPlateY: shape === 'cabin' ? tall.y + tall.h - 12 : tall.y - 10,
      wideDepth: (cell.c + cell.span) * 100 + (cell.r + cell.span) * 100 + cell.c,
    };
  });
}

/** The desktop plan paints far to near: by the near corner's depth, then by column. */
export function wideOrder<T extends { wideDepth: number }>(list: T[]): T[] {
  return [...list].sort((a, b) => a.wideDepth - b.wideDepth);
}

/** DESIGN.md §C.3 — the 6 x 5 floor's own module lattice, for the seams. */
export const WIDE_MODULES = Array.from({ length: 6 }, (_, c) =>
  Array.from({ length: 5 }, (_, r) => wpt(c, r)),
).flat();

/** The projected outline of the whole 6 x 5 slab. */
export const WIDE_SLAB = [wpt(0, 0), wpt(6, 0), wpt(6, 5), wpt(0, 5)]
  .map((p) => `${p.x} ${p.y}`)
  .join(' ');

/**
 * DESIGN.md §C.9 — the still frame. Nine stations, nine *different* static opacities,
 * in DOM order. A uniform value would look switched-off-but-on.
 */
export const STILL_GLOW = [0.84, 0.82, 0.62, 0.74, 0.68, 0.8, 0.64, 0.76, 0.7];
