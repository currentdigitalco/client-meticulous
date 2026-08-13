/**
 * Meta descriptions composed to Google's display budget.
 *
 * Google truncates a description at roughly 160 characters on desktop and
 * nearer 120 on mobile. Anything past the budget isn't a penalty — it's just
 * written for nobody, and the part that gets cut is the TAIL, which is exactly
 * where the phone number lives. A 203-character description on a service page
 * is a phone number Google never shows.
 *
 * The rule here mirrors `lib/seo-title.ts` on Black Stallion and Triumph:
 * compose to a budget and drop what doesn't fit, rather than write long and
 * let the SERP decide what to amputate.
 *
 * Clauses are either present IN FULL or absent. Nothing is truncated
 * mid-sentence — a trailing "Vermont-registe…" reads as a bug to a human and
 * is worse than the clause simply not being there.
 */

export const META_DESCRIPTION_MAX = 160;

/**
 * Assemble `lead … optional … cta` within `max` characters.
 *
 * `lead` (what the page IS) and `cta` (what to do about it) are always kept —
 * together they are far shorter than the budget on every route we generate.
 * `optional` clauses are supplied most-valuable-first and dropped from the END
 * backwards until the whole string fits, so a town's specific hook survives
 * while generic boilerplate is what gives way.
 */
export function fitDescription({
  lead,
  optional = [],
  cta,
  max = META_DESCRIPTION_MAX,
}: {
  lead: string;
  optional?: (string | null | undefined)[];
  cta: string;
  max?: number;
}): string {
  const tidy = (s: string) => s.trim().replace(/\s+/g, " ");
  const head = tidy(lead);
  const tail = tidy(cta);
  const middles = optional
    .filter((p): p is string => Boolean(p && p.trim()))
    .map(tidy);

  for (let keep = middles.length; keep >= 0; keep -= 1) {
    const out = [head, ...middles.slice(0, keep), tail].join(" ");
    if (out.length <= max) return out;
  }

  // lead + cta is the irreducible floor. If that alone exceeds the budget the
  // lead itself is too long, which is a content problem, not a fitting one —
  // return it rather than silently mangling a page identity.
  return [head, tail].join(" ");
}
