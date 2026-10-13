// Interactive "it depends" tools embedded inside blog posts.
//
// A post opts in with `tool: { id, insertAfter }` on its entry in
// src/lib/blog-posts.ts. `insertAfter` is an exact substring of the post body;
// the tool renders right after it. If the anchor is missing the page throws at
// build time instead of quietly dropping the tool (see splitPostContent).
//
// FACT RULE: every number and claim a tool shows must already be published in
// this repo (the post itself or a sibling post/service page) or come from a
// verified primary source cited in a comment next to it. Never invent
// per-town figures. Add a new tool by adding a config here and an `id` to
// PostToolId.

export type PostToolId = "post_depth" | "bluestone_quiz";

export interface PostToolPlacement {
  id: PostToolId;
  /** Exact substring of the post content; the tool renders right after it. */
  insertAfter: string;
}

export interface ToolOption {
  value: string;
  label: string;
  hint?: string;
}

export interface ToolStep {
  id: string;
  question: string;
  options: ToolOption[];
}

export type ToolAnswers = Record<string, string>;

export interface ToolResult {
  /** Large answer line, e.g. "Dig to 52 to 54 inches". */
  headline: string;
  /** Plain-words reasoning, one short paragraph each. */
  reasons: string[];
  /** Short provenance line shown under the result. */
  basedOn: string;
  /** One-line plain-text summary sent with the lead. */
  summary: string;
}

export interface PostToolConfig {
  id: PostToolId;
  eyebrow: string;
  title: string;
  intro: string;
  steps: ToolStep[];
  compute: (answers: ToolAnswers) => ToolResult;
  cta: {
    heading: string;
    body: string;
    button: string;
    subject: string;
    /** Service value the lead is filed under (matches quote-form options). */
    service: string;
  };
}

function pick(answers: ToolAnswers, step: string): string {
  const v = answers[step];
  if (!v) throw new Error(`post tool: missing answer for step "${step}"`);
  return v;
}

function unknownAnswer(step: string, value: string): never {
  throw new Error(`post tool: unrecognized answer "${value}" for step "${step}"`);
}

// ---------------------------------------------------------------------------
// BUILD 1: "How deep should your fence posts go?"
// (post: /blog/frost-line-depth-vermont-fencing)
//
// SOURCES for every depth figure below. All are figures this site already
// publishes; none is new:
//   - Frost line 48 in across most of Rutland County; 54 to 60 in at higher
//     elevations (Killington, Mendon, Shrewsbury): frost-line-depth-vermont-
//     fencing, opening paragraph and "What Is the Frost Line in Vermont?".
//   - Dig depth 52 to 54 in on the Rutland valley floor; 56 to 60 in above
//     about 1,500 ft, "a solid 4 to 6 inches below the frost line":
//     frost-line-depth-vermont-fencing, "How Deep Does Meticulous Actually
//     Dig?"; same figures in fence-posts-vermont-depth-frost-line.
//   - The bottom of the hole/footing (not the top of the concrete) must clear
//     the frost line: both posts.
//   - The one-third burial rule, and that the frost-line floor beats it
//     everywhere in the county: fence-posts-vermont-depth-frost-line, "How
//     Deep Should a Fence Post Go Below the Vermont Frost Line?". It is stated
//     there (and here) as a third of the FENCE'S HEIGHT in the ground: a 6 ft
//     fence gets 24 in on an 8 ft post (corrected 2026-10-13; the post had
//     called that "one-third of the post height", which is a quarter).
//   - Ledge at 30 in; rock auger on a mini excavator; drill through ledge or
//     pin to it with rebar epoxied into the rock: frost-line-depth-vermont-
//     fencing, "How Deep Does Meticulous Actually Dig?".
//   - Wet/clay soil heaves harder; 6 in of crushed stone at the base, gravel to
//     about a foot from grade, concrete the top foot: both posts.
// No per-town frost depth is published or was found in a primary source
// (Vermont building code / municipal code / extension) during the 2026-10-13
// build, so step 1 asks for elevation band, not town.
// ---------------------------------------------------------------------------

const DEPTH_BY_REGION = {
  valley: { frost: "48 inches", digLow: 52, digHigh: 54 },
  elevation: { frost: "54 to 60 inches", digLow: 56, digHigh: 60 },
} as const;

const FENCE_HEIGHT_FT: Record<string, number> = { "4": 4, "5": 5, "6": 6, "8": 8 };

function computePostDepth(answers: ToolAnswers): ToolResult {
  const region = pick(answers, "region");
  const heightKey = pick(answers, "height");
  const ground = pick(answers, "ground");

  const heightFt = FENCE_HEIGHT_FT[heightKey];
  if (heightFt === undefined) unknownAnswer("height", heightKey);
  // The old one-third rule: bury a third of the fence's height.
  const thirdRuleIn = (heightFt * 12) / 3;

  let digLow: number;
  let digHigh: number;
  const reasons: string[] = [];

  if (region === "valley" || region === "elevation") {
    const r = DEPTH_BY_REGION[region];
    digLow = r.digLow;
    digHigh = r.digHigh;
    reasons.push(
      region === "valley"
        ? `Below the frost line. Across most of Rutland County the frost line sits at ${r.frost}. We dig to ${r.digLow} to ${r.digHigh} inches so the bottom of the post sits 4 to 6 inches under it.`
        : `Below the frost line. Above about 1,500 feet the frost drives to ${r.frost} on exposed lots. We dig to ${r.digLow} to ${r.digHigh} inches so the bottom of the post sits under it.`,
    );
  } else if (region === "unsure") {
    digLow = DEPTH_BY_REGION.valley.digLow;
    digHigh = DEPTH_BY_REGION.elevation.digHigh;
    reasons.push(
      `Below the frost line, which turns on elevation. It sits at 48 inches across most of Rutland County, where we dig 52 to 54 inches. Above about 1,500 feet it reaches 54 to 60 inches, and we dig 56 to 60. We confirm which one applies when we walk the line.`,
    );
  } else {
    unknownAnswer("region", region);
  }

  // Use whichever rule is deeper. With the published figures the frost line
  // wins for every height offered (max third-rule depth is 32 in), but the
  // comparison stays live so a new height option can't silently undercut it.
  if (thirdRuleIn > digLow) {
    digLow = thirdRuleIn;
    if (digHigh < digLow) digHigh = digLow;
    reasons.push(
      `The old one-third rule buries a third of the fence's height: ${thirdRuleIn} inches for ${heightFt === 8 ? "an" : "a"} ${heightFt} ft fence. That is deeper than the frost line here, so it decides the hole.`,
    );
  } else {
    reasons.push(
      `The old one-third rule buries a third of the fence's height: ${thirdRuleIn} inches for ${heightFt === 8 ? "an" : "a"} ${heightFt} ft fence. The frost line is deeper, so it decides the hole.`,
    );
  }
  reasons.push(
    "It is the bottom of the hole that has to clear the frost line, not the top of the concrete. Stopping short is how posts heave.",
  );

  if (ground === "normal") {
    reasons.push("Normal soil: the depth above is the whole answer.");
  } else if (ground === "wet") {
    reasons.push(
      "Clay or wet ground heaves harder than dry, so the depth does not come down. We put 6 inches of crushed stone in the bottom of the hole for drainage, pack gravel up to about a foot from grade, and pour concrete only in the top foot.",
    );
  } else if (ground === "rocky") {
    reasons.push(
      "Rocky ground or ledge: hitting ledge at 30 inches is a real possibility in parts of Rutland County. We switch to a mini excavator with a rock auger, and where we hit ledge we drill through it or pin the post to it with rebar epoxied into the rock. We don't stop short and hope.",
    );
  } else {
    unknownAnswer("ground", ground);
  }

  const headline = `Dig to ${digLow} to ${digHigh} inches`;
  const regionLabel =
    region === "valley" ? "valley floor" : region === "elevation" ? "above 1,500 ft" : "elevation not sure";
  return {
    headline,
    reasons,
    basedOn:
      "Based on the frost depths in this post: 48 inches across most of Rutland County and 54 to 60 inches above about 1,500 feet, plus 4 to 6 inches of margin. Your town's building office has the final word on any permit.",
    summary: `${headline} (${regionLabel}, ${heightFt} ft fence, ${ground} ground)`,
  };
}

const POST_DEPTH: PostToolConfig = {
  id: "post_depth",
  eyebrow: "Post depth tool",
  title: "How deep should your fence posts go?",
  intro: "Three taps. We'll give you the hole depth we'd dig and why.",
  steps: [
    {
      id: "region",
      question: "Where is the fence going?",
      options: [
        {
          value: "valley",
          label: "Valley floor or most of the county",
          hint: "Rutland valley and lower towns, under about 1,500 ft",
        },
        {
          value: "elevation",
          label: "Above about 1,500 feet",
          hint: "Exposed lots around Killington, Mendon, Shrewsbury, Chittenden",
        },
        { value: "unsure", label: "Not sure of my elevation", hint: "We'll show both" },
      ],
    },
    {
      id: "height",
      question: "How tall is the fence?",
      options: [
        { value: "4", label: "4 ft", hint: "Picket or yard fence" },
        { value: "5", label: "5 ft" },
        { value: "6", label: "6 ft", hint: "Standard privacy" },
        { value: "8", label: "8 ft" },
      ],
    },
    {
      id: "ground",
      question: "What's the ground like?",
      options: [
        { value: "normal", label: "Normal soil", hint: "Digs without much trouble" },
        { value: "wet", label: "Clay or wet", hint: "Holds water, slow to drain" },
        { value: "rocky", label: "Rocky or ledge", hint: "Stones or bedrock close to the surface" },
      ],
    },
  ],
  compute: computePostDepth,
  cta: {
    heading: "Want it set once? Get a fence quote",
    body: "Tell us where the fence is going. We'll walk the line, check the ground and quote it.",
    button: "Get my fence quote",
    subject: "Fence quote (post-depth tool)",
    service: "carpentry",
  },
};

// ---------------------------------------------------------------------------
// BUILD 2: "Bluestone or pavers?" (post: /blog/bluestone-vs-concrete-pavers)
//
// Every reason and number below is quoted or paraphrased from that post:
// "Which Does Meticulous Recommend?" (the choose-bluestone / choose-pavers
// lists, bluestone for patios and walkways, Unilock/Belgard pavers for
// driveways), "How Do Maintenance Needs Compare?", "What Does Each Material
// Cost Installed?" ($19 to $34 vs $13 to $23 per sq ft installed, Rutland
// County pricing as of early 2026), and the shared base spec.
// ---------------------------------------------------------------------------

const BASE_NOTE =
  "Either way we build the same base: 6 to 8 inches of compacted processed gravel, an inch of sand to level, pitch away from the house and edge restraint on every job. Most failures we tear out trace back to the base, not the material.";

function computeBluestone(answers: ToolAnswers): ToolResult {
  const look = pick(answers, "look");
  const budget = pick(answers, "budget");
  const upkeep = pick(answers, "upkeep");
  const use = pick(answers, "use");
  const stay = pick(answers, "stay");

  const stone: string[] = [];
  const pavers: string[] = [];

  if (look === "natural") stone.push("You want a natural, high-end look. That's bluestone.");
  else if (look === "pattern") pavers.push("You want a specific pattern or color that stone can't give you.");
  else if (look !== "either") unknownAnswer("look", look);

  if (budget === "upfront")
    pavers.push("Budget is the main driver. Pavers run $13 to $23 per sq ft installed against $19 to $34 for bluestone.");
  else if (budget === "longrun")
    stone.push("You're weighing the long run. Bluestone costs more upfront, but over 15 to 20 years maintenance and replacement close a lot of that gap.");
  else unknownAnswer("budget", budget);

  if (upkeep === "minimal")
    stone.push("You don't want to think about maintenance. Bluestone needs a sweep and a hose. Pavers need the joints re-sanded every two to three years.");
  else if (upkeep === "swap") pavers.push("You want the option to easily replace individual pieces.");
  else if (upkeep !== "fine") unknownAnswer("upkeep", upkeep);

  if (stay === "long") stone.push("You're staying long-term, and bluestone is the patio that looks better in 10 years than it does today.");
  else if (stay !== "short") unknownAnswer("stay", stay);

  let headline: string;
  let reasons: string[];
  let pickLabel: string;

  if (use === "driveway") {
    headline = "Concrete pavers";
    pickLabel = "pavers";
    reasons = [
      "It carries cars. Pavers handle vehicle loads better than flagstone, and for driveways we use Unilock or Belgard pavers rated for vehicular use.",
      ...pavers,
    ];
  } else if (use === "patio" || use === "walkway") {
    // The post: "For patios and walkways, we install more bluestone than anything else."
    stone.push(`For ${use === "patio" ? "patios" : "walkways"} we install more bluestone than anything else.`);
    if (stone.length > pavers.length) {
      headline = "Bluestone";
      pickLabel = "bluestone";
      reasons = stone;
    } else if (pavers.length > stone.length) {
      headline = "Concrete pavers";
      pickLabel = "pavers";
      reasons = pavers;
    } else {
      headline = "Either one works";
      pickLabel = "close call";
      reasons = [...stone, ...pavers, "It's a close call on your answers, so the walkthrough settles it."];
    }
  } else {
    unknownAnswer("use", use);
  }

  return {
    headline,
    reasons: [...reasons, BASE_NOTE],
    basedOn: "Based on our comparison in this post, with Rutland County installed pricing as of early 2026.",
    summary: `Quiz pick: ${pickLabel} (look ${look}, budget ${budget}, upkeep ${upkeep}, use ${use}, stay ${stay})`,
  };
}

const BLUESTONE_QUIZ: PostToolConfig = {
  id: "bluestone_quiz",
  eyebrow: "Quick quiz",
  title: "Bluestone or pavers?",
  intro: "Five taps. We'll tell you which one fits your project and why.",
  steps: [
    {
      id: "look",
      question: "What look are you after?",
      options: [
        { value: "natural", label: "Natural stone", hint: "Blue-gray that weathers to a deeper tone" },
        { value: "pattern", label: "A set pattern or color", hint: "Something stone can't give you" },
        { value: "either", label: "No strong preference" },
      ],
    },
    {
      id: "budget",
      question: "How are you thinking about cost?",
      options: [
        { value: "upfront", label: "Lowest upfront cost", hint: "Budget is the main driver" },
        { value: "longrun", label: "Best over the long run", hint: "Fine paying more now" },
      ],
    },
    {
      id: "upkeep",
      question: "How much upkeep will you put up with?",
      options: [
        { value: "minimal", label: "As little as possible", hint: "Sweep it, hose it, done" },
        { value: "fine", label: "Some is fine", hint: "Re-sanding joints every few years" },
        { value: "swap", label: "I want to swap single pieces", hint: "Easy to replace one at a time" },
      ],
    },
    {
      id: "use",
      question: "What is it for?",
      options: [
        { value: "patio", label: "Patio" },
        { value: "walkway", label: "Walkway" },
        { value: "driveway", label: "Driveway or parking", hint: "Anything cars drive on" },
      ],
    },
    {
      id: "stay",
      question: "How long are you staying in the home?",
      options: [
        { value: "long", label: "Long-term" },
        { value: "short", label: "A few years, or not sure" },
      ],
    },
  ],
  compute: computeBluestone,
  cta: {
    heading: "Want it built once? Get a patio quote",
    body: "Tell us where it's going. We'll walk the spot and give you a straight answer on material and price.",
    button: "Get my patio quote",
    subject: "Patio quote (bluestone vs pavers quiz)",
    service: "hardscaping",
  },
};

export const POST_TOOLS: Record<PostToolId, PostToolConfig> = {
  post_depth: POST_DEPTH,
  bluestone_quiz: BLUESTONE_QUIZ,
};

/**
 * Split a post body around its tool anchor. Throws (failing the build during
 * prerender) when the anchor is not found exactly once: a silently missing
 * tool is worse than a red build.
 */
export function splitPostContent(content: string, placement: PostToolPlacement): [string, string] {
  const first = content.indexOf(placement.insertAfter);
  if (first === -1) {
    throw new Error(`post tool "${placement.id}": insertAfter anchor not found in post content`);
  }
  if (content.indexOf(placement.insertAfter, first + 1) !== -1) {
    throw new Error(`post tool "${placement.id}": insertAfter anchor matches more than once`);
  }
  const cut = first + placement.insertAfter.length;
  return [content.slice(0, cut), content.slice(cut)];
}
