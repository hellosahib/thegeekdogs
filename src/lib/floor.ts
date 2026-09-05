import { getCollection, type CollectionEntry } from 'astro:content';

/**
 * The studio floor's roster, assembled from the content collections.
 *
 * Every string below is COPY.md's. Nothing here is written by the Engineer: the
 * accessible-name patterns are COPY.md §10.2's, the empty chair is COPY.md §2.5, the
 * "Checked by" field label is the last line of COPY.md §2.4.
 */

/** COPY.md §2.5, the empty chair. No role line, no "checked by" field, no worker. */
export const EMPTY_CHAIR = {
  nameplate: 'Ship approval',
  body: 'This chair stays empty. No agent decides that something is ready for your users. A person does, every release.',
} as const;

/** COPY.md §2.4 — the field label above the gate name on each agent card. */
export const CHECKED_BY_LABEL = 'Checked by';

/**
 * COPY.md §2.3 — DESIGN.md §C.6 item 4 gives the two human cards the same sub-block
 * geometry the agent cards have. Its field label is one word, because on a human card
 * the person is the one doing the checking rather than the one being checked.
 *
 * The gate list itself is §C.6's own short form and lives on each person's entry.
 * COPY.md §2.3 is explicit that it must NOT be asserted against the gate collection
 * the way the agent cards' single label is: the short forms are written to a 318px
 * measure and `QA on real devices` / `Security and privacy review` at full length push
 * the block past its budget.
 */
export const OWNS_LABEL = 'Owns';

/** COPY.md §2.4 — the roster line's label. §B.8's own wireframe string. */
export const ROSTER = { label: 'The full pipeline' } as const;

/**
 * COPY.md §10.2's one-sentence alt for the whole scene. §10.2 is explicit that it is
 * for the static-image and OG cases only: on the page the SVG is decorative and takes
 * `aria-hidden`, because the roster is real text and a screen reader must not meet it
 * twice. It is used here on `og:image:alt` and nowhere else.
 */
export const FLOOR_ALT =
  'An isometric studio floor seen from above: two desks with people working at them, a group of more schematic desks around them where the agents work, and one empty chair with a nameplate reading Ship approval.';

/** COPY.md §2.2 — the lead-in and the instruction line, in that order. */
export const FLOOR_INTRO = {
  leadIn: 'Two desks have people at them. The rest are agents.',
  instruction: 'Open any desk to see the job and the human who checks it.',
} as const;

/**
 * DESIGN.md §C.2 / PLAN.md round 2 item 2 — the single source of truth for the valid
 * desk-slot ids. Seven agent desks, plus the two cabins and the chair, which are named
 * rather than numbered because they are not agent desks. A reference to a slot that is
 * not here, or a slot nothing occupies, fails the build with both ids printed.
 */
export const DESK_SLOTS = [
  'desk-1',
  'desk-2',
  'desk-3',
  'desk-4',
  'desk-5',
  'desk-6',
  'desk-7',
] as const;

export type StationKind = 'human' | 'agent' | 'chair';

export interface Station {
  kind: StationKind;
  /** Stable id shared by the button and its card. */
  id: string;
  /** The visible label on the station's button. */
  label: string;
  /** COPY.md §10.2's spoken button name. */
  accessibleName: string;
  /** The card's one line of what they do. Agents: the job. Humans: the role line. */
  lead?: string;
  /** The card's body. */
  body: string;
  /** Agents only: COPY.md §2.4's gate label, kept for the assertion below. */
  checkedBy?: string;
  /**
   * DESIGN.md §C.6 items 3 and 4 — one sub-block, two field labels. Agents carry
   * `Checked by` and their gate; the two humans carry `Owns` and the gates they own.
   * The chair carries neither, and its absence is the point (§C.6 item 5).
   */
  gateBlock?: { label: string; value: string };
}

/**
 * COPY.md §10.2 — the gate name is spoken inside a sentence, so its first letter is
 * lowercased there, exactly as §10.2's own example writes it ("Checked by security and
 * privacy review."). It is the same string, in a sentence position.
 */
function inSentence(label: string): string {
  // "QA on real devices" keeps its capitals: an initialism is not sentence case, and
  // lowering only the first letter of one produces "qA", which a screen reader spells.
  if (/^[A-Z]{2}/.test(label)) return label;
  return label.charAt(0).toLowerCase() + label.slice(1);
}

/** Items 20 and 21 gave the pronouns; COPY.md §10.2's pattern uses the possessive. */
function possessive(pronouns: string | undefined, name: string): string {
  if (pronouns?.startsWith('he')) return 'his';
  if (pronouns?.startsWith('she')) return 'her';
  throw new Error(
    `${name} has no pronouns in src/data/people, so COPY.md §10.2's button name cannot be built.`,
  );
}

function assertDeskSlots(agents: CollectionEntry<'agents'>[]): void {
  const used = new Map<string, string>();
  for (const agent of agents) {
    const slot = agent.data.deskSlot;
    if (!(DESK_SLOTS as readonly string[]).includes(slot)) {
      throw new Error(
        `Agent "${agent.data.slug}" references desk slot "${slot}", which is not in DESK_SLOTS (${DESK_SLOTS.join(', ')}).`,
      );
    }
    const taken = used.get(slot);
    if (taken) {
      throw new Error(`Desk slot "${slot}" is claimed by both "${taken}" and "${agent.data.slug}".`);
    }
    used.set(slot, agent.data.slug);
  }
  const empty = DESK_SLOTS.filter((slot) => !used.has(slot));
  if (empty.length > 0) {
    throw new Error(`Desk slot(s) defined but unoccupied: ${empty.join(', ')}.`);
  }
}

/**
 * COPY.md §2.4 and §2.6 are meant to be the same six strings wherever they appear. The
 * gate entries carry the sentence-ending period §2.6 prints them with; the agents carry
 * §2.4's bare label. This asserts the two cannot drift apart.
 */
async function assertGateLabels(agents: CollectionEntry<'agents'>[]): Promise<void> {
  const gates = await getCollection('gates');
  for (const agent of agents) {
    const ref = agent.data.checkedByGate;
    if (!ref) continue;
    const gate = gates.find((g) => g.id === ref.id);
    if (!gate) {
      throw new Error(`Agent "${agent.data.slug}" references gate "${ref.id}", which does not exist.`);
    }
    const gateLabel = gate.data.name.replace(/\.$/, '');
    if (gateLabel !== agent.data.checkedBy) {
      throw new Error(
        `Agent "${agent.data.slug}" says checked by "${agent.data.checkedBy}" but gate "${gate.id}" is named "${gateLabel}".`,
      );
    }
  }
}

/**
 * DESIGN.md §C.8 — the ten stops, in DOM order at every breakpoint, because the order
 * is the argument: Sahib, Tanya, the seven agents in COPY.md §2.4's pipeline order, and
 * the chair last.
 */
export async function roster(): Promise<Station[]> {
  const people = await getCollection('people');
  const agents = await getCollection('agents');

  assertDeskSlots(agents);
  await assertGateLabels(agents);

  const byOrder = (a: CollectionEntry<'agents'>, b: CollectionEntry<'agents'>) =>
    DESK_SLOTS.indexOf(a.data.deskSlot as (typeof DESK_SLOTS)[number]) -
    DESK_SLOTS.indexOf(b.data.deskSlot as (typeof DESK_SLOTS)[number]);

  const humanOrder = ['sahib-singh', 'tanya-jain'];
  const humans = humanOrder.map((slug) => {
    const person = people.find((p) => p.data.slug === slug);
    if (!person) throw new Error(`The floor needs src/data/people/${slug}.json and it is missing.`);
    return person;
  });

  const stations: Station[] = humans.map((person) => ({
    kind: 'human',
    id: person.data.slug,
    label: person.data.name,
    accessibleName: `${person.data.name}. Open ${possessive(person.data.pronouns, person.data.name)} card.`,
    lead: person.data.headlineRole,
    body: person.data.bio,
    // No `ownsLine` means no sub-block, rather than a labelled empty one.
    gateBlock: person.data.ownsLine
      ? { label: OWNS_LABEL, value: person.data.ownsLine }
      : undefined,
  }));

  for (const agent of [...agents].sort(byOrder)) {
    stations.push({
      kind: 'agent',
      id: agent.data.slug,
      label: agent.data.name,
      accessibleName: `${agent.data.name}, agent. Checked by ${inSentence(agent.data.checkedBy)}. Open its card.`,
      body: agent.data.job,
      checkedBy: agent.data.checkedBy,
      gateBlock: { label: CHECKED_BY_LABEL, value: agent.data.checkedBy },
    });
  }

  stations.push({
    kind: 'chair',
    id: 'ship-approval',
    label: EMPTY_CHAIR.nameplate,
    accessibleName: `${EMPTY_CHAIR.nameplate}. The empty chair. Open the card.`,
    body: EMPTY_CHAIR.body,
  });

  return stations;
}

/**
 * COPY.md §2.4's roster line, as a sentence: the same seven names in the same order as
 * the desks, joined the way §2.4 writes them — commas, `and` before the last, one full
 * stop. It is derived from the collection rather than transcribed so the sentence and
 * the floor cannot disagree, and no count is printed beside it (§2.2, §2.4, §10.2 all
 * give the same reason: a number in body copy goes stale the day the roster changes).
 */
export async function rosterSentence(): Promise<string> {
  const agents = await getCollection('agents');
  const names = [...agents]
    .sort(
      (a, b) =>
        DESK_SLOTS.indexOf(a.data.deskSlot as (typeof DESK_SLOTS)[number]) -
        DESK_SLOTS.indexOf(b.data.deskSlot as (typeof DESK_SLOTS)[number]),
    )
    .map((agent) => agent.data.name);
  const last = names.pop();
  if (!last) throw new Error('The agents collection is empty, so §2.4 has no roster line.');
  return names.length === 0 ? `${last}.` : `${names.join(', ')} and ${last}.`;
}
