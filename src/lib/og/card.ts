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
 * **The card wears the social brand, not the site's dark room.** A share preview lands in
 * feeds next to the Instagram and YouTube channels, so it follows docs/social/DESIGN.md:
 * off-white paper, one soft orange glow, Inter Tight titles, Inter lines, near-black ink
 * and orange only on "Dogs". The dog mark sits on it as the brand's logo. The home card
 * keeps the floor, as a dark inset under the words, because brief §12 puts it there.
 */

/* docs/social/DESIGN.md §2, light palette. */
const PAPER = '#FBFBFD';
const INK = '#1D1D1F';
const GREY = '#6E6E73';
const ORANGE = '#FF5E1A';
const AMBER = '#FFA53A';
const EARS = '#FF6B1A';
const FLOOR_BAND = '#04060B';

export const CARD = { width: 1200, height: 630 } as const;

const require = createRequire(import.meta.url);

/*
  Inter Tight (titles) and Inter (lines), the social brand's two families, as @fontsource's
  static cuts: satori reads woff/ttf/otf and cannot apply a variation axis. Build-time
  devDependencies; nothing about them reaches the browser.
*/
function face(pkg: string, file: string): Buffer {
  return readFileSync(require.resolve(`@fontsource/${pkg}/files/${file}`));
}

const FONTS = [
  { name: 'Inter Tight', data: face('inter-tight', 'inter-tight-latin-600-normal.woff'), weight: 600 as const, style: 'normal' as const },
  { name: 'Inter', data: face('inter', 'inter-latin-400-normal.woff'), weight: 400 as const, style: 'normal' as const },
  { name: 'Inter', data: face('inter', 'inter-latin-600-normal.woff'), weight: 600 as const, style: 'normal' as const },
];

/** The dog mark from public/favicon.svg, without its tile, in the brand's light colours. */
const MARK = `data:image/svg+xml;base64,${Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 34"><path d="M7 12 2 1 14 6Z" fill="${EARS}"/><path d="M33 12 38 1 26 6Z" fill="${EARS}"/><path d="M6 13Q6 5 14 5H26Q34 5 34 13V23Q34 33 20 33Q6 33 6 23Z" fill="none" stroke="${INK}" stroke-width="2.4"/><rect x="14" y="21" width="12" height="7" rx="3.5" fill="${INK}"/></svg>`,
).toString('base64')}`;

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

/** "TheGeek" in ink and "Dogs" in the orange gradient, at any size. */
function wordmark(fontSize: number): Node {
  return el('div', {
    style: { display: 'flex', fontFamily: 'Inter Tight', fontWeight: 600, fontSize, letterSpacing: '-0.025em', color: INK },
    children: [
      el('span', { children: 'TheGeek' }),
      el('span', {
        style: { backgroundImage: `linear-gradient(90deg, ${ORANGE}, ${AMBER})`, backgroundClip: 'text', color: 'transparent' },
        children: 'Dogs',
      }),
    ],
  });
}

function tree(spec: CardSpec): Node {
  const home = Boolean(spec.showFloor);
  const bandHeight = home ? 300 : 0;
  const floorWidth = Math.round((FLOOR_CROP.w / FLOOR_CROP.h) * (bandHeight || 1));

  const words = el('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      flexGrow: 1,
      padding: '0 80px',
      textAlign: 'center',
    },
    children: [
      el('img', { src: MARK, width: home ? 56 : 64, height: home ? 48 : 54 }),
      /* The home card's title IS the site name, so it is the wordmark itself. Every other
         card carries its own title and a small wordmark under the mark. */
      home
        ? el('div', { style: { display: 'flex', marginTop: 14 }, children: [wordmark(80)] })
        : el('div', { style: { display: 'flex', marginTop: 12 }, children: [wordmark(26)] }),
      ...(home
        ? []
        : [el('div', {
            style: {
              marginTop: 30,
              fontFamily: 'Inter Tight',
              fontWeight: 600,
              fontSize: spec.title.length > 34 ? 58 : 72,
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              color: INK,
              maxWidth: 1000,
            },
            children: spec.title,
          })]),
      el('div', {
        style: {
          marginTop: home ? 10 : 18,
          fontFamily: 'Inter',
          fontWeight: 400,
          fontSize: home ? 26 : 30,
          lineHeight: 1.35,
          letterSpacing: '-0.01em',
          color: GREY,
          maxWidth: 900,
        },
        children: spec.line,
      }),
    ],
  });

  const band = el('div', {
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      height: bandHeight,
      margin: '0 60px 60px',
      borderRadius: 24,
      backgroundColor: FLOOR_BAND,
      overflow: 'hidden',
    },
    children: [el('img', { src: floorDataUri(), width: floorWidth, height: bandHeight })],
  });

  return el('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      width: CARD.width,
      height: CARD.height,
      backgroundColor: PAPER,
      backgroundImage:
        'radial-gradient(ellipse at center, rgba(255,138,42,0.20), rgba(255,179,71,0.07) 60%, rgba(255,179,71,0) 100%)',
    },
    children: home ? [words, band] : [words],
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
