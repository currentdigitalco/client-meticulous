# HiggsField Video Prompts — Meticulous Mowing & Property Management

> These are looping background videos for the fullscreen scroll-hijacked homepage.
> Each video replaces the static background image in its section.
> **Model:** Kling 3.0 or Veo 3.1 | **Aspect:** 16:9 | **Duration:** 5-8s looping | **Style:** Cinematic

---

## 1. HERO LANDING — "The Flyover"

**Model:** Kling 3.0 (camera control)
**Duration:** 8s loop | **Aspect:** 16:9

```
Scene 1 (8s): Aerial drone shot descending slowly over a perfectly
manicured Vermont property at golden hour. The camera starts at 200ft
looking straight down — diamond-cut lawn stripes radiating outward, a
bluestone patio with outdoor furniture, a cedar privacy fence running
the property line, flower beds bordering the walkway. As the drone
descends, the perspective shifts from top-down to a 45-degree angle,
revealing the full depth of the property. Late afternoon sun casts
long shadows across the lawn stripes. No people. Wind barely moves
the tree canopy. Warm golden color grade, photorealistic, anamorphic
lens quality. Emmanuel Lubezki natural light.
```

---

## 2. OUR STORY — "Vermont Morning"

**Model:** Veo 3.1 (environmental mood)
**Duration:** 6s loop | **Aspect:** 16:9

```
Scene 1 (6s): Wide establishing shot of a Vermont farmhouse property
at dawn. Morning mist slowly rises from rolling green hills. A white
clapboard house anchors the composition on the right third. Mature
sugar maples in early fall color — amber, rust, gold — frame the
left side. A stone wall runs across the foreground. The camera is
static on a tripod, locked off. Only the mist moves, drifting slowly
left to right. Faint god rays pierce through the tree canopy. The
mood is pastoral, earned, timeless. Cool shadows warming to amber as
the sun crests the hill. 35mm lens, deep focus, Roger Deakins
lighting. No people, no vehicles. Just the property breathing.
```

---

## 3. LAWN & LANDSCAPE — "The Stripes"

**Model:** Kling 3.0 (macro + tracking)
**Duration:** 6s loop | **Aspect:** 16:9

```
Scene 1 (6s): Low ground-level tracking shot moving slowly forward
across freshly mowed lawn at 6 inches off the ground. Perfect
diagonal mowing stripes stretch into the distance, alternating light
and dark green. Morning dew drops cling to each blade, catching
golden light as miniature prisms. The camera glides forward at
walking pace, the stripes pulling the eye to a vanishing point. Depth
of field is razor-thin — foreground blades sharp, background soft
and dreamy. A single dew drop falls from a blade tip in the
foreground. Warm golden hour side-light from the right. The sound
would be silence and distant birds. Macro-influenced, photorealistic,
satisfying mechanical precision. 100mm macro lens feel.
```

---

## 4. HARDSCAPE & STONE — "Stone by Stone"

**Model:** Veo 3.1 (detail performance)
**Duration:** 7s loop | **Aspect:** 16:9

```
Scene 1 (4s): Close-up overhead shot of a bluestone flagstone patio
surface. The camera slowly cranes down toward the stone, revealing
the natural variation — blue-gray tones, fossil imprints, tight sand
joints between each piece. Warm afternoon light rakes across the
stone at a low angle, casting micro-shadows in every texture crevice.

Scene 2 (3s): The camera continues its descent and begins a slow
lateral track, moving across the patio edge where stone meets a
perfectly trimmed grass border. The transition line is surgically
clean. A few fallen leaves rest on the stone. The color shifts from
cool stone blue-gray to warm grass green. 50mm lens, shallow depth
of field at the transition edge. Architectural photography quality.
The mood is quiet permanence — something built to outlast you.
```

---

## 5. FENCE INSTALLATION — "Through the Gate"

**Model:** Kling 3.0 (camera movement)
**Duration:** 6s loop | **Aspect:** 16:9

```
Scene 1 (6s): Slow dolly-in through an open cedar gate toward a
Vermont backyard. The camera starts outside the fence line — cedar
boards fill the left and right edges of frame as foreground elements,
slightly out of focus. Through the gate opening we see: a green lawn,
a stone patio, fall-colored maple trees. As the camera pushes forward
through the gate, the fence boards slide out of frame and the yard
opens up in full. Golden hour backlight streams through the cedar
boards creating stripe-shadow patterns on the ground. The gate
hardware catches a glint of sun. The mood is invitation — stepping
into a protected, curated space. 24mm wide angle, deep focus pulling
to shallow as we pass through. Warm amber color grade.
```

---

## 6. INTERIOR FLOORING — "The Grain"

**Model:** Veo 3.1 (detail + light)
**Duration:** 6s loop | **Aspect:** 16:9

```
Scene 1 (6s): Low angle shot at floor level, looking across a
freshly installed wide-plank hardwood floor. The camera is inches off
the surface, shooting along the length of the planks toward large
windows at the far end of the room. Afternoon light streams in
through the windows, creating long highlights that run down the wood
grain like liquid gold. The camera slowly slides forward at floor
level — the wood grain texture fills the foreground in sharp detail,
becoming abstract pattern. Dust motes float lazily in the light
beams. The room is empty except for the floor and the light. The
baseboard trim is crisp white against honey-toned oak. 35mm lens,
very shallow depth of field at floor level. Interior architectural
photography. The mood is transformation — raw space made warm.
```

---

## 7. SNOW & CONSTRUCTION — "Before Dawn"

**Model:** Kling 3.0 (dramatic action)
**Duration:** 8s loop | **Aspect:** 16:9

```
Scene 1 (4s): Wide shot, pre-dawn blue hour, Vermont residential
street. Heavy snow falls steadily. Everything is still, buried under
12 inches of fresh powder. Streetlights cast amber cones into the
falling snow. Then — headlights appear at the far end of the street.
A work truck with a plow attachment rounds the corner.

Scene 2 (4s): The truck advances toward camera, plow blade down,
cutting a clean path through the virgin snow. Snow sprays to the
right in a controlled arc, catching the headlight beams. Exhaust
steam billows behind the truck in the cold air. The camera holds
static as the truck passes — the sound would be diesel rumble and
scraping steel. In its wake: a perfectly cleared driveway. The house
behind it still dark, residents still sleeping. The mood is
industrious loyalty — working while others rest. Cold blue dominant
tone with warm amber headlights. Denis Villeneuve scale and
atmosphere. 35mm anamorphic.
```

---

## REGENERATION COMMANDS

When the Gemini API recovers, run these to replace the placeholder images:

```bash
cd sites/client-meticulous/public/images

# Hero landing (placeholder = copy of bg-story)
nano-banana "Aerial overhead drone view of a manicured Vermont property with diamond-cut lawn stripes, bluestone patio, cedar fence, flower beds. Golden hour. Photorealistic." -a 16:9 -s 2K -o hero-landing

# Fencing background (placeholder = copy of bg-hardscape)
nano-banana "Cedar privacy fence running along a Vermont property line, autumn foliage background, golden hour backlight on cedar planks. Photorealistic, 35mm." -a 16:9 -s 2K -o bg-fencing

# Story detail (placeholder = copy of detail-hardscape)
nano-banana "Weathered hands adjusting string line over gravel patio base. Work boots, warm light, shallow depth of field. Documentary editorial, 85mm. Photorealistic." -a 3:4 -s 2K -o detail-story

# Fencing detail (placeholder = copy of detail-lawn)
nano-banana "Cedar fence post being set in concrete. Carpenter's level resting against post. Vermont autumn trees blurred background. Golden hour, 75mm. Photorealistic." -a 3:4 -s 2K -o detail-fencing
```
