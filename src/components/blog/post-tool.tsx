"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Phone, RotateCcw, Send } from "lucide-react";
import { FORM_ACCESS_KEY, FORM_SUBMIT_URL } from "@/lib/form-config";
import { trackEvent } from "@/lib/analytics";
import { POST_TOOLS, type PostToolId, type ToolAnswers } from "@/lib/post-tools";

// Data-driven step tool embedded in a blog post (configs: src/lib/post-tools.ts).
// Every step is in the server HTML (inactive steps carry `hidden`), so crawlers
// and no-JS readers get the questions. Height only changes on a reader's tap,
// so readers who ignore it see no layout shift. CSS transitions only.

interface PostToolProps {
  toolId: PostToolId;
  postSlug: string;
}

export function PostTool({ toolId, postSlug }: PostToolProps) {
  const config = POST_TOOLS[toolId];
  if (!config) throw new Error(`PostTool: unknown tool "${toolId}"`);
  const { steps } = config;
  const total = steps.length;

  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<ToolAnswers>({});
  const started = useRef(false);
  const userMoved = useRef(false);
  const headingRefs = useRef<(HTMLElement | null)[]>([]);
  const resultHeadingRef = useRef<HTMLParagraphElement | null>(null);

  const done = stepIndex >= total;
  const result = useMemo(() => (done ? config.compute(answers) : null), [done, config, answers]);

  const eventParams = { tool: toolId, post_slug: postSlug };

  // Move focus to the new question (or the result) after a reader's tap, so
  // keyboard and screen-reader users land where the content changed.
  useEffect(() => {
    if (!userMoved.current) return;
    const target = done ? resultHeadingRef.current : headingRefs.current[stepIndex];
    target?.focus({ preventScroll: true });
  }, [stepIndex, done]);

  function choose(stepId: string, value: string) {
    if (!started.current) {
      started.current = true;
      trackEvent("tool_start", eventParams);
    }
    const next = { ...answers, [stepId]: value };
    setAnswers(next);
    userMoved.current = true;
    const nextIndex = stepIndex + 1;
    if (nextIndex >= total) trackEvent("tool_complete", eventParams);
    setStepIndex(nextIndex);
  }

  function back() {
    userMoved.current = true;
    setStepIndex((i) => Math.max(0, i - 1));
  }

  function restart() {
    userMoved.current = true;
    setAnswers({});
    setStepIndex(0);
  }

  const answerLines = steps.map((s) => {
    const opt = s.options.find((o) => o.value === answers[s.id]);
    return `${s.question} ${opt ? opt.label : "(no answer)"}`;
  });

  const progress = Math.min(stepIndex, total);

  return (
    <section
      aria-labelledby={`${toolId}-title`}
      className="my-12 rounded-2xl bg-soil-light/50 ring-1 ring-white/10 p-6 md:p-8"
    >
      <p className="text-xs font-medium uppercase tracking-[0.15em] text-forest-light">
        {config.eyebrow}
      </p>
      <h2
        id={`${toolId}-title`}
        className="mt-3 font-display text-2xl md:text-3xl leading-tight tracking-tight text-cream"
      >
        {config.title}
      </h2>
      <p className="mt-2 text-[15px] leading-relaxed text-stone-dark/60">{config.intro}</p>

      {/* Progress */}
      <div className="mt-6">
        <div className="flex items-center justify-between text-xs text-stone-dark/50">
          <span>{done ? "Your answer" : `Step ${stepIndex + 1} of ${total}`}</span>
          {stepIndex > 0 && !done && (
            <button
              type="button"
              onClick={back}
              className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-stone-dark/60 hover:text-cream transition-colors"
            >
              <ArrowLeft size={12} strokeWidth={2} /> Back
            </button>
          )}
        </div>
        <div className="mt-2 flex gap-1.5" aria-hidden="true">
          {steps.map((s, i) => (
            <span
              key={s.id}
              className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                i < progress ? "bg-forest-light" : i === progress && !done ? "bg-forest-light/40" : "bg-white/10"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Steps: all server-rendered, one visible at a time */}
      {steps.map((step, i) => {
        const cols = step.options.length === 4 ? "grid-cols-2 md:grid-cols-4" : step.options.length === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-3";
        return (
          <div
            key={step.id}
            role="group"
            aria-labelledby={`${toolId}-${step.id}-q`}
            hidden={i !== stepIndex}
            className="mt-6"
          >
            <h3
              id={`${toolId}-${step.id}-q`}
              ref={(el) => {
                headingRefs.current[i] = el;
              }}
              tabIndex={-1}
              className="text-lg font-medium text-cream tracking-tight focus:outline-none"
            >
              {step.question}
            </h3>
            <div className={`mt-4 grid gap-3 ${cols}`}>
              {step.options.map((opt) => {
                const selected = answers[step.id] === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => choose(step.id, opt.value)}
                    className={`flex min-h-[72px] flex-col items-start justify-center rounded-xl px-5 py-4 text-left ring-1 transition-[background-color,box-shadow,color] duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest-light ${
                      selected
                        ? "bg-forest/50 ring-forest-light/70"
                        : "bg-soil/60 ring-white/10 hover:bg-soil hover:ring-forest-light/50"
                    }`}
                  >
                    <span className="text-[16px] font-medium leading-snug text-cream">{opt.label}</span>
                    {opt.hint && (
                      <span className="mt-1 text-[13px] leading-snug text-stone-dark/55">{opt.hint}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Result */}
      <div aria-live="polite" aria-atomic="false">
        {result && (
          <div className="mt-6">
            <p
              ref={resultHeadingRef}
              tabIndex={-1}
              className="font-display text-3xl md:text-4xl leading-tight tracking-tight text-cream focus:outline-none"
            >
              {result.headline}
            </p>
            <div className="mt-4 space-y-3">
              {result.reasons.map((r) => (
                <div key={r} className="flex gap-3 text-[15px] leading-relaxed text-stone-dark/75">
                  <span aria-hidden="true" className="mt-[0.6em] h-[5px] w-[5px] shrink-0 rounded-full bg-forest-light" />
                  <span>{r}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs leading-relaxed text-stone-dark/45">{result.basedOn}</p>
            <button
              type="button"
              onClick={restart}
              className="mt-3 inline-flex items-center gap-1.5 rounded-full px-2 py-1 -ml-2 text-xs text-stone-dark/60 hover:text-cream transition-colors"
            >
              <RotateCcw size={12} strokeWidth={2} /> Start over
            </button>

            <ToolLeadForm
              key={result.summary}
              toolId={toolId}
              postSlug={postSlug}
              cta={config.cta}
              resultSummary={result.summary}
              answerLines={answerLines}
            />
          </div>
        )}
      </div>
    </section>
  );
}

interface ToolLeadFormProps {
  toolId: PostToolId;
  postSlug: string;
  cta: (typeof POST_TOOLS)[PostToolId]["cta"];
  resultSummary: string;
  answerLines: string[];
}

function ToolLeadForm({ toolId, postSlug, cta, resultSummary, answerLines }: ToolLeadFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const idBase = `${toolId}-lead`;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formEl = e.currentTarget;
    const data = new FormData(formEl);
    const contact = String(data.get("contact") ?? "").trim();
    const isEmail = contact.includes("@");
    if (!isEmail && contact.replace(/\D/g, "").length < 7) {
      setError("Add a phone number or an email so we can reach you.");
      return;
    }

    setSubmitting(true);
    data.append("access_key", FORM_ACCESS_KEY);
    data.append("subject", cta.subject);
    // Web3Forms uses `email` as the reply-to address.
    data.delete("contact");
    data.append(isEmail ? "email" : "phone", contact);
    data.append("service", cta.service);
    data.append("tool", toolId);
    data.append("post_slug", postSlug);
    data.append("tool_answers", answerLines.join("\n"));
    data.append("tool_result", resultSummary);
    data.append("source_url", typeof window !== "undefined" ? window.location.href : "");

    try {
      const res = await fetch(FORM_SUBMIT_URL, { method: "POST", body: data });
      const json = await res.json();
      if (json.success) {
        trackEvent("generate_lead", { tool: toolId, post_slug: postSlug });
        setSubmitted(true);
        formEl.reset();
      } else {
        setError("Something went wrong. Please call 802-342-8293.");
      }
    } catch {
      setError("Network issue submitting. Please call 802-342-8293.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="mt-8 rounded-2xl bg-forest-light/15 ring-1 ring-forest-light/30 p-6 md:p-8 text-center">
        <p className="text-xl font-medium text-cream tracking-tight">Got it. We&apos;ll be in touch.</p>
        <p className="mt-2 text-[15px] leading-relaxed text-stone-dark/70">
          We typically respond within one business day. Your answers came through with it, so we
          won&apos;t ask twice. Need us sooner? Call{" "}
          <a href="tel:+18023428293" className="text-forest-light underline-offset-2 hover:underline">
            802-342-8293
          </a>
          .
        </p>
      </div>
    );
  }

  const input =
    "w-full rounded-xl bg-soil/60 ring-1 ring-white/10 px-4 py-3 text-[16px] md:text-[14px] text-cream placeholder:text-stone-dark/40 focus:outline-none focus:ring-forest-light/50 transition";

  return (
    <div className="mt-8 border-t border-white/10 pt-6">
      <p className="font-display text-2xl leading-tight tracking-tight text-cream">{cta.heading}</p>
      <p className="mt-2 text-[15px] leading-relaxed text-stone-dark/60">{cta.body}</p>
      <form onSubmit={handleSubmit} className="mt-5 space-y-3" noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label htmlFor={`${idBase}-name`} className="sr-only">Name</label>
            <input id={`${idBase}-name`} type="text" name="name" required autoComplete="name" placeholder="Your name" className={input} />
          </div>
          <div>
            <label htmlFor={`${idBase}-contact`} className="sr-only">Phone or email</label>
            <input id={`${idBase}-contact`} type="text" name="contact" required autoComplete="on" placeholder="Phone or email" className={input} />
          </div>
          <div>
            <label htmlFor={`${idBase}-town`} className="sr-only">Town</label>
            <input id={`${idBase}-town`} type="text" name="town" autoComplete="address-level2" placeholder="Town" className={input} />
          </div>
        </div>
        <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        {error && (
          <p role="alert" className="text-sm text-copper-light flex items-center gap-2">
            <Phone size={14} strokeWidth={2} /> {error}
          </p>
        )}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-forest-light text-soil font-medium text-sm tracking-wide hover:bg-cream transition-colors disabled:opacity-60"
          >
            {submitting ? "Sending..." : cta.button}
            <Send size={14} strokeWidth={2} />
          </button>
          <a
            href="tel:+18023428293"
            className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl ring-1 ring-white/15 text-cream font-medium text-sm tracking-wide hover:ring-white/30 transition-colors"
          >
            <Phone size={14} strokeWidth={2} /> Call 802-342-8293
          </a>
        </div>
      </form>
    </div>
  );
}
