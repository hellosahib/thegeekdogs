/**
 * Helpers shared by every rendering of a person's work history.
 *
 * COPY.md §7.2: "Every `Years` field on this page and on `/sahib/` prints years only,
 * because DESIGN.md §D.5 puts the years in the price position and a month makes that
 * line longer without making it more useful to a reader scanning duration." The month
 * boundaries are real and they settle which card a boundary belongs to, so they stay in
 * `src/data/people/*.json` where they are the source; they are stripped at the point of
 * printing rather than deleted from the data, which is the only arrangement where the
 * document and the page can both be right.
 *
 * This is the same rule the compressed home strip applies (step-2 review item 8), and it
 * lives here rather than in two components so the two cannot drift.
 */
export function yearsOnly(range: string): string {
  return range.replace(/\b[A-Z][a-z]{2,8}\s+(\d{4})\b/g, '$1');
}

/**
 * Fails the build if a month survives into a printed date. `now` is the one word COPY.md
 * allows in the field, so it is the one word excluded from the check.
 */
export function assertYearsOnly(printed: string, where: string): string {
  if (/[A-Za-z]/.test(printed.replace(/\bnow\b/g, ''))) {
    throw new Error(
      `The date "${printed}" (${where}) still carries a month; COPY.md §7.2 prints years only.`,
    );
  }
  return printed;
}
