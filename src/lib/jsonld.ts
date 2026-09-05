import { getCollection, type CollectionEntry } from 'astro:content';
import type { Organization, Person, SoftwareApplication, Thing } from 'schema-dts';
import { STUDIO_EMAIL, SITE_NAME } from './copy';

/**
 * Structured data, per brief §12: `Organization` for the studio, `SoftwareApplication`
 * per app (Pocket Manager gets the `aggregateRating`), and `Person` for each founder
 * with `sameAs` to their real profiles.
 *
 * Every value is read from the content collections or from COPY.md's own strings, so
 * nothing here is a second, hand-maintained copy of a fact. The discipline FACTS.md
 * applies to the rendered page applies here too: a field whose value this site has not
 * verified is omitted rather than guessed, because structured data is a claim made to a
 * machine and a wrong one is still a wrong one.
 *
 * The nodes are typed against `schema-dts`, which is schema.org's own vocabulary as
 * TypeScript types, so `astro check` is the validator: a misspelled property or a value
 * of the wrong type fails the build rather than shipping as a silently ignored key. That
 * is a structural check, not a Rich Results check — no network validator was run.
 */

const SITE = 'https://thegeekdogs.com';
const ORG_ID = `${SITE}/#organization`;

const abs = (path: string): string => new URL(path, `${SITE}/`).href;

function personId(slug: string): string {
  return `${SITE}/#${slug}`;
}

/** PLAN.md §2 — `sameAs` is computed from `socials`, never duplicated into the entry. */
function sameAs(person: CollectionEntry<'people'>): string[] {
  return Object.values(person.data.socials).filter(
    (value): value is string => typeof value === 'string' && value.startsWith('http'),
  );
}

export function organization(founders: CollectionEntry<'people'>[]): Organization {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE_NAME,
    url: `${SITE}/`,
    email: STUDIO_EMAIL,
    // COPY.md §1's footer location line, and QUESTIONS.md item 71: Bengaluru only.
    address: { '@type': 'PostalAddress', addressLocality: 'Bengaluru' },
    founder: founders.map((person) => ({ '@id': personId(person.data.slug) })),
  };
}

export function person(entry: CollectionEntry<'people'>): Person {
  return {
    '@type': 'Person',
    '@id': personId(entry.data.slug),
    name: entry.data.name,
    // Their own pages land in build run B; `url` goes on with them.
    sameAs: sameAs(entry),
    worksFor: { '@id': ORG_ID },
  };
}

export function softwareApplication(product: CollectionEntry<'products'>): SoftwareApplication {
  const d = product.data;
  const app: SoftwareApplication = {
    '@type': 'SoftwareApplication',
    '@id': `${abs(`work/${d.slug}/`)}#app`,
    // A product with no chosen name is described, never given a stand-in (COPY.md §5.6).
    name: d.name ?? d.indexName,
    url: abs(`work/${d.slug}/`),
    description: d.oneLine,
    author: { '@id': ORG_ID },
  };

  if (d.storeListingName) app.alternateName = d.storeListingName;

  /*
    Only stated where the store states it. Pocket Manager is a Play Store listing whose
    own title names the category and whose platform is Android; the second app has not
    been submitted anywhere, so it gets neither field rather than a guess at both.
  */
  if (d.storeUrl) {
    app.sameAs = [d.storeUrl];
    app.installUrl = d.storeUrl;
    app.operatingSystem = 'Android';
    app.applicationCategory = 'FinanceApplication';
  }

  /* Brief §12 — the rating is Pocket Manager's alone, and it is the live listing's own
     figures (COPY.md §2.7, item 36), asserted against the entry rather than retyped. */
  if (d.storeStats) {
    app.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: d.storeStats.rating,
      reviewCount: d.storeStats.ratingCount,
      bestRating: 5,
      worstRating: 1,
    };
  }

  return app;
}

/**
 * The whole graph for a route, as one `@context`. `schema-dts`'s own `WithContext`
 * models a single node rather than a `@graph`, so the wrapper is declared here; every
 * node inside it is still one of its vocabulary types.
 */
interface Graph {
  '@context': 'https://schema.org';
  '@graph': Thing[];
}

export function graph(nodes: Thing[]): string {
  const doc: Graph = { '@context': 'https://schema.org', '@graph': nodes };
  return JSON.stringify(doc);
}

/** `/` and `/contact/`: who the studio is, and who the two people are. */
export async function studioGraph(): Promise<string> {
  const people = await getCollection('people');
  const order = ['sahib-singh', 'tanya-jain'];
  const founders = order
    .map((slug) => people.find((p) => p.data.slug === slug))
    .filter((p): p is CollectionEntry<'people'> => Boolean(p));
  return graph([organization(founders), ...founders.map(person)]);
}

/** `/work/`: both applications, in the order the page lists them. */
export async function workIndexGraph(): Promise<string> {
  const products = (await getCollection('products')).sort((a, b) => a.data.order - b.data.order);
  return graph(products.map(softwareApplication));
}

/** A case study: the one application the page is about. */
export function productGraph(product: CollectionEntry<'products'>): string {
  return graph([softwareApplication(product)]);
}
