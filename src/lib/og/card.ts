import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { floorSceneSvg, FLOOR_CROP } from './floor-card';

/**
 * PLAN.md §1.7 — the OG cards, drawn at build time from the same content the page
 * renders, so the card and the page cannot disagree about what they say.
 *
 * Satori turns a JSX-shaped tree into SVG (glyphs come out as paths, so the rasteriser
 * needs no fonts of its own) and `@resvg/resvg-js` turns that into the PNG. Both run
 * inside a prerendered endpoint, so this costs nothing at runtime.
 *
 * **The card is DARK ONLY, and the redesign is what flipped it.** A share preview has no
 * way to know the reader's scheme, so it has to pick one, and it should pick the one the
 * site is: this site is dark-first, a visitor with no stored choice lands in the dark
 * room, and a card in the light scheme would be a preview of a page most people never
 * see. The favicon is deliberately not on it: that mark is browser chrome, and putting
 * it here would make it a logo.
 */

/* The dark scheme's own grounds and inks. Four values and no fifth. */
const GROUND = '#080C18';
const VOID_BAND = '#04060B';
const INK = '#EAECF2';
const MUTED = '#96A0B5';
const ACCENT = '#DF8FE2';

export const CARD = { width: 1200, height: 630 } as const;

const require = createRequire(import.meta.url);

/*
  The site's two families, as static instances. The site itself ships the variable woff2
  builds; satori reads woff/ttf/otf and cannot apply a variation axis, so the card loads
  @fontsource's static 600 and 400 cuts of the same two faces rather than rendering one
  weight and calling it two. These are build-time devDependencies and nothing about them
  reaches the browser.
*/
function face(pkg: string, file: string): Buffer {
  return readFileSync(require.resolve(`@fontsource/${pkg}/files/${file}`));
}

const FONTS = [
  { name: 'Schibsted Grotesk', data: face('schibsted-grotesk', 'schibsted-grotesk-latin-600-normal.woff'), weight: 600 as const, style: 'normal' as const },
  { name: 'Schibsted Grotesk', data: face('schibsted-grotesk', 'schibsted-grotesk-latin-400-normal.woff'), weight: 400 as const, style: 'normal' as const },
  { name: 'Spline Sans Mono', data: face('spline-sans-mono', 'spline-sans-mono-latin-400-normal.woff'), weight: 400 as const, style: 'normal' as const },
  { name: 'Spline Sans Mono', data: face('spline-sans-mono', 'spline-sans-mono-latin-600-normal.woff'), weight: 600 as const, style: 'normal' as const },
];

export interface CardSpec {
  /** The card's own big line. COPY.md's "OG image text", first line. */
  title: string;
  /** The line under it. COPY.md's "OG image text", second line. */
  line: string;
  /** The home card is the one that shows the floor (brief §12). */
  showFloor?: boolean;
}

/**
 * The floor, rasterised once and reused. resvg renders raster `<image>` payloads
 * reliably and nested SVG ones less so, so the scene becomes a PNG before it is handed
 * to satori rather than being embedded as SVG and hoped for.
 */
let floorPng: string | undefined;
function floorDataUri(): string {
  if (!floorPng) {
    const scale = 3;
    const png = new Resvg(floorSceneSvg(), {
      fitTo: { mode: 'width', value: FLOOR_CROP.w * scale },
    })
      .render()
      .asPng();
    floorPng = `data:image/png;base64,${png.toString('base64')}`;
  }
  return floorPng;
}

/** A satori element. Its shape is React-like without React being involved. */
type Node = { type: string; props: Record<string, unknown> };
const el = (type: string, props: Record<string, unknown>): Node => ({ type, props });

function tree(spec: CardSpec): Node {
  /*
    Run A item 11 — the four non-home cards ended in a 1200 x 135 strip of --floor with
    nothing at all in it. It is not the room, because nothing is in it, and it is not a
    rule, so it read as a crop that lost its picture. The review offered two remedies and
    §B.12 rules one of them out in terms — the favicon's cone "never appears ... in an OG
    card", so putting that mark in the band would make it a logo — which leaves the
    other: the band comes off and the card is the sheet. The home card keeps its floor,
    because the floor is IN it.
  */
  const bandHeight = spec.showFloor ? 372 : 0;
  const floorWidth = Math.round((FLOOR_CROP.w / FLOOR_CROP.h) * (bandHeight || 1));

  const words = el('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      padding: '60px 60px 0',
    },
    children: [
      /* COPY.md §1's site name as the card's wordmark — except on the home card,
         whose own title IS the site name (§2.11) and would otherwise print twice. */
      el('div', {
        style: {
          display: 'flex',
          height: 30,
          fontFamily: 'Spline Sans Mono',
          fontWeight: 400,
          fontSize: 21,
          color: ACCENT,
          letterSpacing: '0.14em',
        },
        children: spec.showFloor ? '' : 'THEGEEKDOGS',
      }),
      el('div', {
        style: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          flexGrow: 1,
        },
        children: [
          el('div', {
            style: {
              fontFamily: 'Schibsted Grotesk',
              fontWeight: 600,
              fontSize: spec.title.length > 34 ? 56 : 68,
              lineHeight: 1.04,
              letterSpacing: '-0.03em',
              color: INK,
              maxWidth: 1000,
            },
            children: spec.title,
          }),
          el('div', {
            style: {
              marginTop: 20,
              fontFamily: 'Schibsted Grotesk',
              fontWeight: 400,
              fontSize: 30,
              lineHeight: 1.45,
              color: MUTED,
              maxWidth: 900,
            },
            children: spec.line,
          }),
        ],
      }),
    ],
  });

  const band = el('div', {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      height: bandHeight,
      backgroundColor: VOID_BAND,
      overflow: 'hidden',
    },
    children: [
      el('img', {
        src: floorDataUri(),
        width: floorWidth,
        height: bandHeight,
        style: { marginRight: 40 },
      }),
    ],
  });

  return el('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      width: CARD.width,
      height: CARD.height,
      backgroundColor: GROUND,
      /* With no band under them the words take the whole card, so they keep the same
         60px optical margin at the bottom that they already have at the top. */
      paddingBottom: spec.showFloor ? 0 : 60,
    },
    children: spec.showFloor ? [words, band] : [words],
  });
}

export async function renderCard(spec: CardSpec): Promise<Buffer> {
  const svg = await satori(tree(spec) as never, {
    width: CARD.width,
    height: CARD.height,
    fonts: FONTS,
  });
  return Buffer.from(
    new Resvg(svg, { fitTo: { mode: 'width', value: CARD.width } }).render().asPng(),
  );
}
