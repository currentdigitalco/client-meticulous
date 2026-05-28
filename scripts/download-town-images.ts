/**
 * Download the Higgsfield-generated town header images and convert them to
 * optimized webp at public/images/towns/{slug}.webp.
 *
 * Input: one or more scripts/.gens-*.json files, each the `results` array from
 * an MCP show_generations call: [{ id, results: { rawUrl }, params: { prompt } }].
 * The town is recovered from the prompt text ("evoking the {City}, New Jersey").
 *
 *   node scripts/download-town-images.ts
 */
import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync, unlinkSync } from "node:fs";
import { execSync } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCRIPTS = __dirname;
const OUT_DIR = resolve(__dirname, "../public/images/towns");
mkdirSync(OUT_DIR, { recursive: true });

// city name -> slug, from the prompt manifest
const prompts: { slug: string; city: string }[] = JSON.parse(
  readFileSync(resolve(SCRIPTS, ".town-prompts.json"), "utf8"),
);
const cityToSlug = new Map(prompts.map((p) => [p.city, p.slug]));

// gather all generation pages
const genFiles = readdirSync(SCRIPTS).filter((f) => /^\.gens-.*\.json$/.test(f));
if (genFiles.length === 0) {
  console.error("No .gens-*.json files found in scripts/. Save show_generations output first.");
  process.exit(1);
}
type Gen = { id: string; status?: string; results?: { rawUrl?: string; minUrl?: string }; params?: { prompt?: string } };
const gens: Gen[] = [];
for (const f of genFiles) {
  const data = JSON.parse(readFileSync(resolve(SCRIPTS, f), "utf8"));
  const arr = Array.isArray(data) ? data : data.items ?? data.results ?? data.generations ?? [];
  gens.push(...arr);
}

const seen = new Set<string>();
let downloaded = 0;
const matchedSlugs = new Set<string>();

for (const g of gens) {
  const prompt = g.params?.prompt ?? "";
  const url = g.results?.rawUrl ?? g.results?.minUrl;
  if (!url) continue;
  const m = prompt.match(/evoking (?:the )?([^,]+?),\s/);
  if (!m) continue;
  const slug = cityToSlug.get(m[1]);
  if (!slug) {
    console.warn(`No slug for city "${m[1]}"`);
    continue;
  }
  matchedSlugs.add(slug);
  // newest-first: skip if we've already taken one for this slug
  if (seen.has(slug)) continue;
  seen.add(slug);

  const tmp = resolve(OUT_DIR, `.${slug}.src`);
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    writeFileSync(tmp, buf);
    execSync(`magick "${tmp}" -resize 1920x -quality 80 "${resolve(OUT_DIR, `${slug}.webp`)}"`, { stdio: "ignore" });
    unlinkSync(tmp);
    downloaded++;
    process.stdout.write(`  ${slug} ok\n`);
  } catch (err) {
    console.warn(`  ${slug} FAILED: ${(err as Error).message}`);
    try { if (existsSync(tmp)) unlinkSync(tmp); } catch {}
  }
}

// report missing
const missing = prompts.map((p) => p.slug).filter((s) => !matchedSlugs.has(s) && !existsSync(resolve(OUT_DIR, `${s}.webp`)));
console.log(`\nDownloaded ${downloaded} images. Towns with an image now: ${readdirSync(OUT_DIR).filter((f) => f.endsWith(".webp")).length}`);
if (missing.length) console.log(`Still missing (${missing.length}): ${missing.join(", ")}`);
