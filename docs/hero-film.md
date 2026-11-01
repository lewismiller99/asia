# Hero film: storyboard, production notes and generation prompts

The site opens on a 22 second film that moves from arrival in China to a
finished brand. The current cut is assembled from graded stills with slow
camera moves (`scripts/build-film.mjs`). It is designed to be replaced,
scene by scene, with real or generated footage as it becomes available,
without touching the website code.

## Replacing a scene

1. Produce a clip or still for the scene (specs below).
2. For stills: drop them into `media-source/photos` and reference them in
   `scripts/build-media.mjs` and `scripts/build-film.mjs`.
   For clips: edit the final sequence in any editor and export to
   `public/video/hero-desktop.mp4` (1920x1080) and
   `public/video/hero-mobile.mp4` (1080x1920), then export a poster frame
   from each to `hero-poster.jpg` and `hero-poster-mobile.jpg`.
3. Keep both files under about 4 MB. H.264 High profile, yuv420p, 30 fps,
   no audio, `+faststart`.

## Technical specification

| | Desktop | Mobile |
|---|---|---|
| Frame | 1920x1080 | 1080x1920 |
| Length | 20 to 25 s, seamless loop through black | same |
| Codec | H.264, CRF 26 to 28, 30 fps, no audio | same |
| Poster | JPEG from ~1.2 s in | same |

The player (`src/components/sections/hero-media.tsx`) renders the poster
first, fades the film in once it is playing, pauses it off screen, and
never loads it under `prefers-reduced-motion` or the browser's save-data
hint.

## Storyboard

Each scene is 4.6 s with a 1.1 s dissolve. Grade across all scenes: lifted
blacks, saturation around 90 percent, warm neutral shadows, a light
vignette. Camera moves are slow and physically plausible, never faster
than a tripod pan.

| # | Scene | Current source | Move | Intent |
|---|---|---|---|---|
| 1 | Arrival | Airport terminal interior, evening | Slow push in | International travel, the founder's regular journey |
| 2 | China | Pudong skyline, Shanghai | Lateral drift | Scale, modernity, ambition |
| 3 | International trade | Harbour, bridge and port lights at night | Slow pull back | Movement of goods, connected supply chain |
| 4 | Manufacturing | Robotic production line | Push in | Capability and precision |
| 5 | Product creation | Rendered studio frame: ampoules, serum, jar | Lateral drift | Materials, glass, packaging detail |
| 6 | Finished brand | Rendered reveal: box and serum with the mark | Push in, fade to black | The outcome: a premium product that carries the client's brand |

## Generation prompts (for video or image models)

Use these when producing original footage. Every prompt asks for realism
and physically correct motion, and avoids morphing, impossible machinery
and visible brand names.

1. Arrival. "Cinematic shot from a terminal window as a widebody passenger
   aircraft taxis slowly past at dusk, modern Chinese international airport,
   warm interior reflections, overcast golden light, slight handheld sway,
   anamorphic look, 24 fps, no text, no logos, photoreal."
2. China. "Slow aerial drift over Shanghai's Pudong skyline at blue hour,
   Huangpu River below, light traffic trails, high altitude, clean air,
   realistic lens flare, photoreal, steady gimbal motion."
3. International trade. "Automated container terminal at night, gantry
   cranes moving stacked containers, a container ship at berth, sodium and
   LED lighting, slow lateral tracking shot from a high vantage,
   photoreal, no visible company names."
4. Manufacturing. "Interior of a modern cosmetics manufacturing facility,
   stainless steel filling line, glass bottles moving along a conveyor,
   operators in white cleanroom suits, soft overhead light, slow dolly in,
   shallow depth of field, photoreal, no text."
5. Product creation. "Macro studio shot of frosted glass serum bottles and
   a matte black dropper, single soft key light from upper left, deep
   charcoal background, slow rotation on a turntable, product photography
   quality, no labels."
6. Finished brand. "Premium skincare product reveal: a frosted glass serum
   bottle beside a matte black retail box on dark stone, slow push in,
   dust motes in a soft beam of light, luxury campaign quality, no text."

Vertical edits: regenerate each scene at 9:16 rather than cropping, with
the subject held in the centre third.

## Honesty rule

Film and photography are illustrative. The site states this in the hero,
the footer and the showcase. Do not replace a scene with generated factory
footage and describe it as a partner facility unless it is.
