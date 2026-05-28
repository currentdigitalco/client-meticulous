/**
 * Per-town Higgsfield prompts for Meticulous atmospheric header images
 * (Vermont property care / landscaping / snow). Prints JSON [{slug, city, prompt}].
 *   node scripts/town-image-prompts.ts > scripts/.town-prompts.json
 */
import { serviceAreas } from "../src/lib/service-areas.ts";

const SUBJECTS = [
  "crisp freshly-mowed lawn stripe meeting a clean-edged mulched garden bed",
  "dry-stacked Vermont fieldstone retaining wall, moss in the joints, raking light",
  "a cleanly plowed mountain driveway with tidy snowbanks and a treated stone walkway",
  "autumn sugar-maple leaves raked into neat rows along a manicured lawn edge",
  "tight-jointed bluestone patio with a hint of frost in the morning shade",
  "neatly split and stacked hardwood firewood against a weathered barn board wall",
  "a flagstone path winding through a deep-green lawn toward a garden bed",
  "frost-edged perennial bed with crisp steel edging holding back rich mulch",
];

const MOUNTAIN = new Set(["killington", "ludlow", "pittsfield", "mount-holly", "shrewsbury"]);
const LAKE = new Set(["castleton", "chittenden"]);
const HISTORIC = new Set(["woodstock", "brandon", "proctor"]);

const out = serviceAreas.map((a, i) => {
  const subject = SUBJECTS[i % SUBJECTS.length];
  let mood: string;
  if (MOUNTAIN.has(a.slug)) mood = "crisp mountain light, a softly blurred backdrop of evergreen slopes and Green Mountain ridgeline, cool alpine palette";
  else if (LAKE.has(a.slug)) mood = "soft lakeside morning light, a faint blurred hint of still water and white birches in the deep background, calm green palette";
  else if (HISTORIC.has(a.slug)) mood = "warm late-afternoon light, a softly blurred backdrop of mature maples and a historic Vermont village, classic green-and-amber palette";
  else mood = "soft overcast Vermont light, a softly blurred backdrop of rolling green hills and sugar maples, muted natural palette";
  const prompt = `Moody editorial photograph: ${subject}. ${mood}. Honest, meticulous property craftsmanship, real and well-kept. Shallow depth of field, fine-art real-estate quality, evoking ${a.name}, ${a.region} without any literal landmark. No people, no text, no logos, no watermarks, no signage.`;
  return { slug: a.slug, city: a.name, prompt };
});
process.stdout.write(JSON.stringify(out, null, 0));
