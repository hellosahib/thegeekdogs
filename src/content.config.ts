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

const products = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/data/products' }),
  schema: ({ image }) =>
    z.object({
      slug,
      // null until a final name is chosen. Never a placeholder string.
      name: z.string().min(1).nullable(),
      // Always present; what renders in headings, nav, OG and JSON-LD while name is null.
      descriptiveName: z.string().min(1),
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
      screenshots: z.array(image()).default([]),
    }),
});

export const collections = { gates, people, agents: agentsCollection, products };
