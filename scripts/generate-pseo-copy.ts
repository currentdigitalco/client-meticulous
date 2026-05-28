/**
 * Unique per-(town × service) copy for Meticulous's service-areas/[city]/[service]
 * pSEO pages (Rutland County, Vermont). Baked into src/lib/service-city-copy.generated.ts.
 *   node scripts/generate-pseo-copy.ts [--city=killington] [--dry]
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { serviceAreas } from "../src/lib/service-areas.ts";
import { serviceDetails } from "../src/app/services/[slug]/service-data.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "../../..");
const OUT_PATH = resolve(__dirname, "../src/lib/service-city-copy.generated.ts");

const args = process.argv.slice(2);
const getArg = (k: string) => args.find((a) => a.startsWith(`--${k}=`))?.split("=")[1];
const ONLY = getArg("city");
const LIMIT = getArg("limit") ? parseInt(getArg("limit")!, 10) : Infinity;
const DRY = args.includes("--dry");
const MODEL = getArg("model") ?? "claude-sonnet-4-6";

const SERVICES = serviceDetails.map((s: { slug: string; title: string; subtitle?: string }) => ({
  slug: s.slug, title: s.title, subtitle: s.subtitle ?? "",
}));
const SERVICE_SLUGS = SERVICES.map((s) => s.slug);

function loadKey(): string {
  if (process.env.ANTHROPIC_API_KEY) return process.env.ANTHROPIC_API_KEY;
  const raw = readFileSync(resolve(REPO_ROOT, "apis/.env"), "utf8");
  for (const line of raw.split(/\r?\n/)) { const m = line.match(/^\s*ANTHROPIC_API_KEY\s*=\s*(.+?)\s*$/); if (m) return m[1].replace(/^["']|["']$/g, ""); }
  throw new Error("ANTHROPIC_API_KEY not found");
}
const API_KEY = loadKey();

const SYSTEM_PROMPT = `You write hyper-local SEO body copy for Meticulous LLC, a REAL Vermont-registered residential contractor and Property Management Firm serving Rutland County, Vermont. Services span grounds maintenance, landscaping, property maintenance, snow & ice management, hardscaping, carpentry, housekeeping/turnover, and rental support.

VOICE: Direct, grounded, owner-to-owner. Plain English. Short sentences. Strong verbs. NO em dashes (use periods). No fluff, no "nestled"/"boasts"/"peace of mind" filler, no emojis.

YOUR JOB: For ONE town, write a distinct local block for EACH service listed. Every block must be unique to THIS town AND THIS service. Weave in the supplied town facts (local context, named landmarks, whether it is a mountain/ski town, a lake town, or a historic village) and the REAL Vermont realities of that service: freeze-thaw cycles, mud season timing, 200-inch snow loads at elevation, second-home and short-term-rental owners who are off-site, frost line and footing depth, leaf-drop and spring thaw windows.

HARD RULES:
- Do NOT invent specific completed jobs, addresses, named customers, review counts, or stats. Write about capability and local conditions, not fabricated projects.
- Service blocks for a town must NOT overlap or reuse sentences. Different services emphasize different seasonal/technical realities.
- This is VERMONT inland mountain country. NEVER mention coastal, salt air, shore, ocean, or bay.
- Each block: 2 to 3 short paragraphs, roughly 110-160 words.

OUTPUT: Strict minified JSON only, no code fence. Keyed EXACTLY by the service slugs provided, each value a single string with paragraphs separated by "\\n\\n".`;

function buildPrompt(area: (typeof serviceAreas)[number]): string {
  return `TOWN: ${area.name}, ${area.region}
Local context: ${area.localContext}
Landmarks: ${(area.landmarks ?? []).join("; ")}
Priority services here: ${(area.priorityServices ?? []).join(", ")}

Write one block per service. Service slugs and scope:
${SERVICES.map((s) => `- "${s.slug}" (${s.title}): ${s.subtitle}`).join("\n")}

Return strict JSON keyed by exactly: ${JSON.stringify(SERVICE_SLUGS)}.`;
}

async function call(prompt: string): Promise<Record<string, string>> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": API_KEY, "content-type": "application/json", "anthropic-version": "2023-06-01" },
    body: JSON.stringify({ model: MODEL, max_tokens: 4000, system: SYSTEM_PROMPT, messages: [{ role: "user", content: prompt }] }),
  });
  if (!res.ok) throw new Error(`Anthropic ${res.status}: ${await res.text()}`);
  const data = await res.json();
  let text = data.content[0].text.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
  const parsed = JSON.parse(text);
  for (const s of SERVICE_SLUGS) if (typeof parsed[s] !== "string" || parsed[s].length < 80) throw new Error(`bad block ${s}`);
  return parsed;
}

async function main() {
  let areas = serviceAreas;
  if (ONLY) areas = areas.filter((a) => a.slug === ONLY);
  areas = areas.slice(0, LIMIT);
  console.log(`Generating ${areas.length} town(s) x ${SERVICE_SLUGS.length} services (${MODEL})...`);
  const result: Record<string, Record<string, string>> = {};
  for (let i = 0; i < areas.length; i++) {
    process.stdout.write(`  [${i + 1}/${areas.length}] ${areas[i].name}... `);
    try { result[areas[i].slug] = await call(buildPrompt(areas[i])); console.log("ok"); }
    catch (e) { console.log(`FAILED: ${(e as Error).message}`); }
  }
  if (DRY) { console.log(JSON.stringify(result, null, 2)); return; }
  let existing: Record<string, Record<string, string>> = {};
  try { const m = readFileSync(OUT_PATH, "utf8").match(/SERVICE_CITY_COPY[^=]*=\s*(\{[\s\S]*\})\s*;/); if (m) existing = JSON.parse(m[1]); } catch {}
  const merged: Record<string, Record<string, string>> = {};
  for (const k of Object.keys({ ...existing, ...result }).sort()) merged[k] = { ...existing, ...result }[k];
  writeFileSync(OUT_PATH, `// AUTO-GENERATED by scripts/generate-pseo-copy.ts — do not edit by hand.
// Regenerate: node scripts/generate-pseo-copy.ts [--city=slug]
// Last generated: ${new Date().toISOString()}

export type ServiceCityCopy = Record<string, Record<string, string>>;

export const SERVICE_CITY_COPY: ServiceCityCopy = ${JSON.stringify(merged, null, 2)};

export function getServiceCityCopy(citySlug: string, serviceSlug: string): string[] | null {
  const b = SERVICE_CITY_COPY[citySlug]?.[serviceSlug];
  return b ? b.split(/\\n\\n+/).map((p) => p.trim()).filter(Boolean) : null;
}
`, "utf8");
  console.log(`\nWrote ${Object.keys(merged).length} town(s) to ${OUT_PATH}`);
}
main().catch((e) => { console.error(e); process.exit(1); });
