import { defineCollection, reference, z } from 'astro:content';
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
        github: z.string().url(),
        linkedin: z.string().url(),
        x: z.string().url().optional(),
        blog: z.string().url().optional(),
        email: z.string().email().optional(),
      }),
      headshot: image(),
      headshotAlt: z.string().min(1),
      workHistory: z.array(
        z.object({
          company: z.string().min(1),
          whatTheyDo: z.string().min(1),
          years: z.string().min(1),
          role: z.string().min(1),
          productsStack: z.array(z.string().min(1)),
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
    checkedBy: reference('gates'),
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
      storeUrl: z.string().url().nullable(),
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
