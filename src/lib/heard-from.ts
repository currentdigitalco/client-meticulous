// Optional "How did you first hear about us?" lead-form field.
// Canonical spec: current-digital execution/lead_attribution.json. Values,
// labels and events are copied from it as literals, in spec order. Change one
// only on purpose: the GA4 events are the trend, and renaming one breaks it.

export const HEARD_FROM_LABEL = "How did you first hear about us?";
export const HEARD_FROM_PLACEHOLDER = "Select one (optional)";

export type HeardFromOption = {
  readonly value: string;
  readonly label: string;
  readonly event: string;
};

export const HEARD_FROM_OPTIONS: readonly HeardFromOption[] = [
  { value: "google_search", label: "Google search", event: "heard_google" },
  { value: "google_ai", label: "Google's AI answer (top of search)", event: "heard_google_ai" },
  { value: "google_maps", label: "Google Maps", event: "heard_maps" },
  { value: "chatgpt", label: "ChatGPT", event: "heard_chatgpt" },
  { value: "gemini", label: "Gemini", event: "heard_gemini" },
  { value: "claude", label: "Claude", event: "heard_claude" },
  { value: "perplexity", label: "Perplexity", event: "heard_perplexity" },
  { value: "copilot", label: "Microsoft Copilot", event: "heard_copilot" },
  { value: "other_ai", label: "Another AI assistant", event: "heard_other_ai" },
  { value: "social", label: "Social media", event: "heard_social" },
  { value: "referral", label: "Friend, family or referral", event: "heard_referral" },
  { value: "other", label: "Other", event: "heard_other" },
];

function findHeardFrom(value: unknown): HeardFromOption | undefined {
  if (typeof value !== "string" || value === "") return undefined;
  return HEARD_FROM_OPTIONS.find((o) => o.value === value);
}

/** GA4 event name for a chosen answer; undefined when unanswered or unknown. */
export function heardFromEvent(value: unknown): string | undefined {
  return findHeardFrom(value)?.event;
}

/** Human-readable answer for the lead email; undefined when unanswered or unknown. */
export function heardFromLabel(value: unknown): string | undefined {
  return findHeardFrom(value)?.label;
}
