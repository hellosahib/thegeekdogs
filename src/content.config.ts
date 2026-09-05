import { defineCollection, reference } from 'astro:content';
// Astro 7: `z` re-exported from `astro:content` is deprecated and goes in Astro 8.
// `astro/zod` is the same instance, which is what keeps `image()` and `reference()`
// schemas assignable. Zod 4 also moved the string formats to the top level, so
// `z.url()` and `z.email()` below are not a style choice: the chained form on a
// string schema is the deprecated spelling in Zod 4.
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { optionalGlob } from './loaders/optional-glob';

/** PLAN.md §1.10 — lowercase, hyphenated slugs fail the content build, not review. */
const slug = z.string().regex(/^[a-z0-9-]+$/, 'lowercase, hyphenated slug only');

const gates = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/data/gates' }),
  schema: z.object({
    slug,
    order: z.number().int().nonnegative(),
    name: z.string().min(1),
    description: z.string().min(1),
  }),
});

const people = defineCollection({
  loader: optionalGlob({ pattern: '**/*.json', base: './src/data/people' }),
  schema: ({ image }) =>
    z.object({
      slug,
      name: z.string().min(1),
      // Pronouns are supplied for one founder only; required would force inventing the other's.
      pronouns: z.string().min(1).optional(),
      city: z.string().min(1),
      headlineRole: z.string().min(1),
      currentEmployer: z.string().min(1),
      bio: z.string().min(1),
      gatesOwned: z.array(reference('gates')),
      /*
        COPY.md §2.3's "Gate list" for the human interaction cards, verbatim. It is a
        written string and not a projection of `gatesOwned`, on COPY.md's own
        instruction: the short forms are set to §C.6's 318px measure, two of the four
        gate names do not fit at full length, and two of the responsibilities on it
        (design review, the release cut) are not `gates` entries at all. Optional
        because a person with no line renders no sub-block rather than an empty one.
      */
      ownsLine: z.string().min(1).optional(),
      socials: z.object({
        github: z.url(),
        linkedin: z.url(),
        x: z.url().optional(),
        blog: z.url().optional(),
        email: z.email().optional(),
      }),
      // Item 23 chose headshots from a tool trained on each person's own selfies and
      // the images have not been supplied. COPY.md §10.1's two alt lines are still
      // [CONFIRM]-marked pending those images, so both fields are optional: a card
      // with no portrait renders no <img> at all rather than a broken one.
      headshot: image().optional(),
      headshotAlt: z.string().min(1).optional(),
      workHistory: z.array(
        z.object({
          company: z.string().min(1),
          whatTheyDo: z.string().min(1),
          years: z.string().min(1),
          // COPY.md §6.2 card 5 (TheGeekDogs) has no role line, and §7's source table
          // leaves it blank. Inventing one would be inventing a fact, so it is absent
          // on that card and the component renders nothing in its place.
          role: z.string().min(1).optional(),
          productsStack: z.array(z.string().min(1)),
          // COPY.md §7.2 gives Tanya's Motive card two lines no other card has, and her
          // Naskay card a project line (item 63). They are optional because they belong
          // to those cards and to no others; the compressed home strip renders none of
          // them, and the person pages are a later step.
          ownershipLine: z.string().min(1).optional(),
          attributedAccount: z.string().min(1).optional(),
          projectLine: z.string().min(1).optional(),
          confirmed: z.boolean(),
        }),
      ),
    }),
});

const agentsCollection = defineCollection({
  loader: optionalGlob({ pattern: '**/*.json', base: './src/data/agents' }),
  schema: z.object({
    slug,
    name: z.string().min(1),
    job: z.string().min(1),
    /*
      COPY.md §2.4's "Checked by" label, verbatim. It is a string rather than a
      collection reference because two of the seven labels are not one of §2.6's four
      gates: the Spec Writer's is `Product spec review` and the Release Watcher's is
      `Ship approval`, both of which item 19 and item 42 place outside the four. The
      other five do name a gate, and `checkedByGate` carries that link where it exists
      so the two strings cannot drift — the floor asserts it at build time.
    */
    checkedBy: z.string().min(1),
    checkedByGate: reference('gates').optional(),
    // A named slot the floor component owns, not raw coordinates. The valid *set*
    // of ids is cross-checked at build time against the floor's own export.
    deskSlot: z.string().regex(/^desk-\d+$/, 'desk slot id, e.g. "desk-7"'),
  }),
});

/** PLAN.md §6 — the fixed five-stage order. Index comparison drives every stage view. */
export const STAGES = ['specced', 'building', 'final-touches', 'submitted', 'live'] as const;
export type Stage = (typeof STAGES)[number];

/**
 * A link whose label and accessible name are both COPY.md's. COPY.md §10.5 requires any
 * outbound link that opens a new tab to say so in its own name, so the two differ and
 * both are written down rather than one being derived from the other.
 */
const labelledLink = z.object({
  label: z.string().min(1),
  accessibleName: z.string().min(1),
});

/**
 * One heading and what sits under it, per COPY.md §4.2 to §4.5 and §5.2 to §5.4. A
 * section may carry a body, a closing line, both or neither; `showFeatures` prints the
 * product's own feature list under it, which is the only place that list renders, so
 * there is still exactly one field on this schema that a feature string can come from.
 */
const productSection = z.object({
  heading: z.string().min(1),
  body: z.string().min(1).optional(),
  closingLine: z.string().min(1).optional(),
  showFeatures: z.boolean().default(false),
});

const products = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/data/products' }),
  schema: ({ image }) =>
    z.object({
      slug,
      // null until a final name is chosen. Never a placeholder string.
      name: z.string().min(1).nullable(),
      // Always present; what renders in headings, nav, OG and JSON-LD while name is null.
      // DESIGN.md §E.3 caps this at 18 characters: it is the row label on a shared axis.
      descriptiveName: z.string().min(1).max(18),
      // COPY.md §3.2 / §3.3's "Product name" as the /work/ index card prints it, which
      // is the longer descriptive form where the two differ (§2.8 says so explicitly).
      indexName: z.string().min(1),
      // The order the two products appear in on /work/ and in the compact stage view.
      order: z.number().int().nonnegative(),
      stage: z.enum(STAGES),
      storeUrl: z.url().nullable(),
      storeStats: z
        .object({
          rating: z.number().min(0).max(5),
          ratingCount: z.number().int().nonnegative(),
          // Display string, matching the store listing's own rounding. Never invented.
          downloads: z.string().min(1),
          lastUpdated: z.string().min(1),
        })
        .nullable(),
      privacyClaimEnabled: z.boolean().default(false),
      // Only reachable, shippable features belong here. There is no field for
      // unreachable functionality, so it structurally cannot leak.
      features: z.array(z.string().min(1)),

      // --- COPY.md §3.2 / §3.3, the /work/ index card ---
      oneLine: z.string().min(1),
      indexLink: labelledLink,
      /*
        COPY.md §3.2's "Secondary link label". It is a shorter string than the product
        page's own store link because the card above it has already named the product,
        and COPY.md gives no accessible name for it — so §10.5's rule applies instead
        and `Opens a new tab.` is appended to the link's own name in the markup.
      */
      indexStoreLabel: z.string().min(1).nullable().default(null),

      // --- COPY.md §4 / §5, the product page ---
      headline: z.string().min(1),
      subhead: z.string().min(1),
      // Null where the app has not been submitted: no store link renders and no label
      // is shown, because a link to nothing is worse than no link (COPY.md §5.1).
      storeLink: labelledLink.nullable(),
      // The full listing title, quoted only where the page quotes it (COPY.md §4.1).
      storeListingName: z.string().min(1).nullable().default(null),
      sections: z.array(productSection).default([]),
      /*
        PLAN.md §1.6 — every shipped screenshot goes through Astro's image pipeline, so
        the source lives in src/assets and carries explicit dimensions. Alt is required
        by the schema: COPY.md writes one line per screen and an image whose alt is not
        written yet does not get an entry here at all, which is how the wedding
        planner's two money screens stay out until QUESTIONS.md item 73 answers.
      */
      screenshots: z
        .array(z.object({ src: image(), alt: z.string().min(1) }))
        .default([]),

      // --- COPY.md §3.4 / §4.8 / §5.6, the page's own metadata ---
      meta: z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        ogTitle: z.string().min(1),
        ogDescription: z.string().min(1),
        // COPY.md's "OG image text": the card's own two lines, generated at build time.
        ogImageTitle: z.string().min(1),
        ogImageLine: z.string().min(1),
      }),
    }),
});

export const collections = { gates, people, agents: agentsCollection, products };
