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
 * DESIGN.md §B.2a — the card is LIGHT ONLY. A share preview has no way to know the
 * reader's scheme, and the light palette is the one every wireframe is drawn in and the
 * one that prints (§D.8). §B.12's mark is deliberately not on it: the favicon is browser
 * chrome and putting it here would make it a logo.
 */

/* DESIGN.md §B.2, light studio. Four values and no fifth. */
const SHEET = '#F1F3F0';
const FLOOR = '#0F2A2E';
const MUTED = '#4E6468';

export const CARD = { width: 1200, height: 630 } as const;

const require = createRequire(import.meta.url);

/*
  DESIGN.md §B.3's two families, as static instances. The site itself ships the variable
  woff2 builds; satori reads woff/ttf/otf and cannot apply a variation axis, so the card
  loads @fontsource's static 600 and 400 cuts of the same two faces rather than rendering
  Anek at its default weight and calling it the display face. These are build-time
  devDependencies and nothing about them reaches the browser.
*/
function face(pkg: string, file: string): Buffer {
  return readFileSync(require.resolve(`@fontsource/${pkg}/files/${file}`));
}

const FONTS = [
  { name: 'Anek Latin', data: face('anek-latin', 'anek-latin-latin-600-normal.woff'), weight: 600 as const, style: 'normal' as const },
  { name: 'Instrument Sans', data: face('instrument-sans', 'instrument-sans-latin-400-normal.woff'), weight: 400 as const, style: 'normal' as const },
  { name: 'Instrument Sans', data: face('instrument-sans', 'instrument-sans-latin-600-normal.woff'), weight: 600 as const, style: 'normal' as const },
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
  const bandHeight = spec.showFloor ? 372 : 132;
  const floorWidth = Math.round((FLOOR_CROP.w / FLOOR_CROP.h) * bandHeight);

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
          fontFamily: 'Instrument Sans',
          fontWeight: 600,
          fontSize: 24,
          color: MUTED,
          letterSpacing: '0.01em',
        },
        children: spec.showFloor ? '' : 'TheGeekDogs',
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
              fontFamily: 'Anek Latin',
              fontWeight: 600,
              fontSize: spec.title.length > 34 ? 56 : 68,
              lineHeight: 1.04,
              letterSpacing: '-0.015em',
              color: FLOOR,
              maxWidth: 1000,
            },
            children: spec.title,
          }),
          el('div', {
            style: {
              marginTop: 20,
              fontFamily: 'Instrument Sans',
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
      backgroundColor: FLOOR,
      overflow: 'hidden',
    },
    children: spec.showFloor
      ? [
          el('img', {
            src: floorDataUri(),
            width: floorWidth,
            height: bandHeight,
            style: { marginRight: 40 },
          }),
        ]
      /* Nothing is written in the band on the other cards. It is the room's own
         ground bookending the card exactly as it bookends the page (§B.9), and
         COPY.md has no string for this slot — so none is invented for it. */
      : [],
  });

  return el('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      width: CARD.width,
      height: CARD.height,
      backgroundColor: SHEET,
    },
    children: [words, band],
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
