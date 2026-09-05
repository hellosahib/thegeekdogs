import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { renderCard, type CardSpec } from '../../lib/og/card';
import { CONTACT, WORK_INDEX } from '../../lib/copy';

/**
 * PLAN.md §1.7 — one OG card per route, generated at build time from the same content
 * collections and the same copy module the pages render, so the card cannot drift.
 *
 * `/404` has no card. COPY.md §9 gives it no OG fields and the page is `noindex`, so
 * there is no string to set on one and nowhere it would be shown; inventing a line for
 * it is the one thing this build does not do.
 */
export const prerender = true;

/* Astro's `Props` for a static path is an index-signature type, so the card spec is
   spread into one rather than nested under a key it would have to be cast out of. */
type Card = { params: { slug: string }; props: CardSpec & Record<string, unknown> };

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await getCollection('products');

  const cards: Card[] = [
    {
      params: { slug: 'home' },
      props: {
        // COPY.md §2.11's "OG image text", and brief §12: the home card shows the floor.
        title: 'TheGeekDogs',
        line: 'Two people. A floor of agents. One chair kept empty.',
        showFloor: true,
      },
    },
    {
      params: { slug: 'work' },
      props: {
        // COPY.md §3.4 writes an OG title and description and no separate image text,
        // so the card takes those two strings rather than a third pair being written.
        title: WORK_INDEX.meta.ogTitle,
        line: WORK_INDEX.meta.ogDescription,
      },
    },
    {
      params: { slug: 'contact' },
      props: { title: CONTACT.meta.ogTitle, line: CONTACT.meta.ogDescription },
    },
  ];

  for (const product of products) {
    cards.push({
      params: { slug: product.data.slug },
      // COPY.md §4.8 and §5.6 each give this page its own two-line image text.
      props: { title: product.data.meta.ogImageTitle, line: product.data.meta.ogImageLine },
    });
  }

  return cards;
};

export const GET: APIRoute = async ({ props }) => {
  const png = await renderCard(props as CardSpec);
  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=31536000, immutable' },
  });
};
