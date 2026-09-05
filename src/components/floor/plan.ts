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

/**
 * DESIGN.md §C.3 — the desktop scene box. 856 x 520: the 6 x 5 room projects to
 * 704 x 352, the cabin walls lift the drawn room to 704 x 392, and §C.3 adds 76 each
 * side horizontally (the nameplates overhang their module by up to 51, the focus ring
 * by 8) and 64 each side vertically. The old 792 x 560 is withdrawn — it was 88 too
 * narrow for the plates and 40 too tall for a room whose lamp hangs over its nearest
 * cell, which is what the step-3 review measured at 1440 (item 6).
 */
export const WIDE_BOX = { w: 856, h: 520 } as const;
/** DESIGN.md §C.7 — the portrait scene box. Same 520, so nothing jumps at the switch. */
export const TALL_BOX = { w: 320, h: 520 } as const;

/**
 * Where the 6 x 5 room sits inside the 856 x 520 box, written so §C.3's own coordinates
 * come out of it: module (c, r) — c = 1…6, r = 1…5 — centres at
 * (396 + 64(c - r), 72 + 32(c + r)). That puts the floor's back vertex at y 104, its
 * near vertex at y 456, its left corner at x 76 and its right at x 780.
 */
const WIDE_ORIGIN = { tx: 76, ty: 104 } as const;
/** x of plan column 0 / row 0, chosen so the projected diamond starts at local x = 0. */
const WIDE_X0 = 5 * HW;

/** Screen point of the plan lattice node (c, r), in room-local units. */
export function wpt(c: number, r: number): { x: number; y: number } {
  return { x: WIDE_X0 + HW * (c - r), y: HH * (c + r) };
}

export const WIDE_TRANSFORM = `translate(${WIDE_ORIGIN.tx} ${WIDE_ORIGIN.ty})`;

/**
 * DESIGN.md §C.7 — the portrait plan's scales, one per station class, each of them the
 * ratio §C.7 states rather than a number chosen by eye: every button carries a 20-unit
 * nameplate band across its top and "the artwork [takes] the remaining 48 (agents),
 * 68 (cabins) or 72 (the chair)". A symbol's scale is therefore its band height over
 * its own bounding-box height, which is what makes the plate band actually empty.
 */
export const TALL_PLATE_BAND = 20;

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
  /** The same point as numbers, for anything that has to measure rather than place it —
      §B.11's empty room crops its viewBox to the slab and the lamp above this node. */
  wideNode: { x: number; y: number };
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
 * DESIGN.md §C.7's portrait grid, row for row, and its own height arithmetic:
 * 88 + 8 + 88 + 12 + 68 + 8 + 68 + 8 + 68 + 12 + 92 = 520. The three agent columns are
 * (320 - two 8px gaps) / 3 = 101.33, and the rows are 68 rather than 64 because §C.7's
 * plate band came *inside* the button: the plate rule bought target height rather than
 * costing it. The ten cells are pairwise disjoint — 8 units between columns, 8 or 12
 * between rows — which is the whole of §C.7's proof that no plate can land in another
 * station's target.
 */
const COL_W = (TALL_BOX.w - 16) / 3;
const COL_X = [0, COL_W + 8, 2 * (COL_W + 8)] as const;
const TALL_CELLS: TallCell[] = [
  { x: 0, y: 0, w: 320, h: 88 }, // row 1 — Sahib's cabin, full width
  { x: 0, y: 96, w: 320, h: 88 }, // row 2 — Tanya's cabin, full width
  { x: COL_X[0], y: 196, w: COL_W, h: 68 }, // row 3 — Spec Writer
  { x: COL_X[1], y: 196, w: COL_W, h: 68 }, //         Designer
  { x: COL_X[2], y: 196, w: COL_W, h: 68 }, //         Programmer
  { x: COL_X[0], y: 272, w: COL_W, h: 68 }, // row 4 — Test Engineer
  { x: COL_X[1], y: 272, w: COL_W, h: 68 }, //         Security Auditor
  { x: COL_X[2], y: 272, w: COL_W, h: 68 }, //         Reviewer
  { x: COL_X[0], y: 348, w: COL_W, h: 68 }, // row 5 — Release Watcher; c2 and c3 empty
  { x: 216, y: 428, w: 104, h: 92 }, // row 6 — the chair, alone at the near right
];

/**
 * Each symbol's own bounding box, which is also its `viewBox`. The `<use>` that places a
 * symbol carries the same four numbers as x/y/width/height, so the desktop plan renders
 * every symbol at exactly 1:1 and the portrait plan is one uniform scale off it.
 */
export const BOX = {
  mod: { x: -64, y: 0, w: 128, h: 64 },
  /* The pendant lamp's own fixture — cord and shade, no light. It is a shared symbol
     rather than two paths inside `#fl-seat` because DESIGN.md §B.11's empty room on
     /404 hangs the same lamp over the same cell with no chair under it. */
  lamp: { x: -15, y: -84, w: 30, h: 28 },
  dk: { x: -46, y: -14, w: 92, h: 58 },
  mon: { x: 0, y: -40, w: 38, h: 50 },
  ch: { x: -16, y: -32, w: 32, h: 40 },
  occ: { x: -11, y: -47, w: 22, h: 49 },
  agent: { x: -64, y: -40, w: 128, h: 104 },
  seat: { x: -46, y: -84, w: 92, h: 140 },
  cabin: { x: -136, y: -48, w: 272, h: 184 },
} as const;

/**
 * What each station class actually draws, which is not always its placement box.
 *
 * DESIGN.md §C.7 gives the portrait plan an artwork band per station — 48 for an agent
 * desk, 68 for a cabin, 72 for the chair — and these are the boxes that band holds. The
 * chair's is the one that differs from its symbol: §C.7 puts the lamp's cord and cone
 * *above* the chair's cell, rising "through c3, over floor and not over a station", so
 * the 84 units of cord in `#fl-seat` are deliberately outside the band and reach up into
 * row 5's empty right cell. The cabin's drops the 16 units of empty box below its floor
 * patch. Both are the drawing's own extents, measured off the symbols in `symbols.ts`.
 */
const ART_BOX = {
  cabin: { x: -136, y: -40, w: 272, h: 168 },
  agent: BOX.agent,
  chair: { x: -64, y: -26, w: 128, h: 90 },
} as const;

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
  /*
    §C.7 — the smallest target anywhere in the portrait set is 101.3 x 68, and 68 is
    55% above the 44 x 44 floor.
  */
  tall: {
    cabin: { w: 320, h: 88 },
    agent: { w: COL_W, h: 68 },
    chair: { w: 104, h: 92 },
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
    const box = ART_BOX[shape];
    /*
      DESIGN.md §C.7 — every portrait button carries its nameplate in a 20-unit band
      across its top, and the artwork takes the remaining height: 48 for an agent desk,
      68 for a cabin, 72 for the chair. So a station's scale is its own band height over
      its own bounding-box height, and its artwork is anchored to the band rather than
      to the cell. Nothing here is chosen by eye: the three scales fall out of §C.7's
      three numbers, and the band above every one of them is genuinely empty, which is
      what makes the plate rule's disjointness proof true of the picture and not only
      of the rectangles.
    */
    const artTop = tall.y + TALL_PLATE_BAND;
    const artH = tall.h - TALL_PLATE_BAND;
    const scale = artH / box.h;
    const tallT = {
      x: tall.x + tall.w / 2 - scale * (box.x + box.w / 2),
      y: artTop - scale * box.y,
    };

    return {
      i,
      shape,
      wideTransform: `translate(${node.x} ${node.y})`,
      wideNode: node,
      tallTransform: `translate(${num(tallT.x)} ${num(tallT.y)}) scale(${round(scale)})`,
      wide: { x: pct(centre.x, WIDE_BOX.w), y: pct(centre.y, WIDE_BOX.h) },
      tall: {
        x: pct(tall.x + tall.w / 2, TALL_BOX.w),
        y: pct(tall.y + tall.h / 2, TALL_BOX.h),
      },
      tallPlateX: tall.x + tall.w / 2,
      /*
        DESIGN.md §C.7's portrait nameplate rule, and it is the opposite of the wide
        plan's on purpose: the plate sits at the TOP of its own button, above its own
        station's artwork, never below it. "Below" is forced on the checkerboard by the
        occlusion of the desk behind-left (§C.3); a 3-up orthogonal grid has nothing
        behind-left to occlude. Each plate is centred on its button's x-axis inside the
        button's top 20 units — box y `top + 2` to `top + 18` — so it lies wholly inside
        its own button, and the ten buttons are pairwise disjoint. A rectangle inside one
        member of a disjoint set is inside no other member: that is a proof, and it is
        what the step-3 review found missing when nine of the ten plates sat in a
        neighbour's target at 360 and 768 and `Tanya Jain` and `Designer` abutted at a
        0px gap. The anchor below is the band's centre; the plate is set with a central
        dominant baseline so `top + 10` is the box's middle and not a baseline.
      */
      tallPlateY: tall.y + TALL_PLATE_BAND / 2,
      wideDepth: (cell.c + cell.span) * 100 + (cell.r + cell.span) * 100 + cell.c,
    };
  });
}

/** The desktop plan paints far to near: by the near corner's depth, then by column. */
export function wideOrder<T extends { wideDepth: number }>(list: T[]): T[] {
  return [...list].sort((a, b) => a.wideDepth - b.wideDepth);
}


/** The projected outline of the whole 6 x 5 slab. */
export const WIDE_SLAB = [wpt(0, 0), wpt(6, 0), wpt(6, 5), wpt(0, 5)]
  .map((p) => `${p.x} ${p.y}`)
  .join(' ');

/**
 * DESIGN.md §C.9 — the still frame. Nine stations, nine *different* static opacities,
 * in DOM order. A uniform value would look switched-off-but-on.
 */
export const STILL_GLOW = [0.84, 0.82, 0.62, 0.74, 0.68, 0.8, 0.64, 0.76, 0.7];
