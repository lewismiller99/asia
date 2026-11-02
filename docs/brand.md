# Brand It China: digital design system

How the website applies the official brand pack (`brand/official`, v1.0).
Read `brand/official/Brand_It_China_Brand_Guidelines.pdf` first; this
document only records how those rules are implemented in code.

## The mark

- The logo is artwork, never typed. The approved outlines from
  `brand/official/SVG` are extracted into `src/components/brand/logo-paths.ts`
  by `node brand/tools/build-logo-paths.mjs` and placed by the components
  in `src/components/brand/logo.tsx`.
- Versions: `Logo` renders Primary (charcoal wordmark, vermilion seal) on
  light backgrounds and Reverse (white wordmark) with `tone="light"`;
  `version="mono"` gives the single ink versions with the seal character
  knocked out. `Wordmark` is the no seal artwork for limited uses. `Seal`
  is the standalone seal (red, black or white).
- The seal character 创 ("create", chuàng) is supplied as outlines and
  needs no font.
- Clear space: at least one seal width around the whole logo. Minimum
  digital width 220 px. Never stretch, crop, rotate, add shadows or
  gradients, or change the spacing.
- Motion: only the seal may land at the end of the long t on the hero's
  first paint. Nothing else about the mark animates.

## Colour

| Token | Hex | Use |
|---|---|---|
| charcoal (black, ink) | `#202020` | Primary dark surface and text |
| vermilion (seal) | `#E63329` | The seal, key buttons, short highlights, error states |
| white | `#FFFFFF` | Text on dark, light surfaces |
| light grey (sand, bone) | `#E6E6E6`, `#F2F2F2` | Panels and light backgrounds |
| mid grey (ash) | `#737373` | Secondary text |

Lead with charcoal and white. Vermilion is reserved for the seal, the
primary button, the eyebrow rule and one highlighted word in a heading.
No gradients between hues and no other accent colours.

## Typography

- Headings: Plus Jakarta Sans ExtraBold 800, sentence case, tight leading
  (`.display`, `.display-sm`). Loaded from the supplied variable font in
  `src/fonts` through `next/font/local`.
- Body: Inter 400 (`body`), labels and buttons: Inter 600 (`.eyebrow`,
  `.btn`). Labels are the only uppercase text on the site.
- Numerals in the process and enquiry steps: Plus Jakarta Sans 300.

## Layout rhythm

The page is cut like a film in chapters, each with one idea:

- Hero: the film, the mark, the headline at up to 13rem, the chapter
  index and live clocks for Shanghai, Bangkok and London.
- The difference: one sentence lit word by word as it scrolls.
- 01 Create: a pinned horizontal gallery of six studio scenes (a swipe
  carousel on phones), category names running over the frame edge.
- 02 Process: a pinned scene whose stage number, copy and backdrop change
  as the visitor scrolls.
- 03 Founder: the light chapter. Full height portrait, the quote, the
  route line finished by the seal.
- 04 Showcase: editorial spreads, a full bleed reveal, then asymmetric
  pairings of scenes and environments.
- 05 Enquire: the form on the dark set.

Headings are oversized and left aligned; ledes sit to the right on wide
screens. Gutters are fluid (`--gutter`).

## Motion

One language, defined in `globals.css`: `reveal` (content settles upward),
`reveal-mask` (imagery unmasks from the bottom), `reveal-line`,
`reveal-stagger`, and the hero choreography. All of it is disabled under
`prefers-reduced-motion`, and everything is visible without JavaScript.

## Imagery

Two worlds, always both present: cinematic international commerce and
premium product concepts. Photography is graded with restrained
saturation, lifted blacks and neutral shadows (`scripts/build-media.mjs`).
Product concepts are studio scenes (`src/components/products/scenes.tsx`):
a charcoal cyclorama, a polished floor with a reflection, a key light
from the upper left, a cool rim light, and a long cast shadow. They carry
the official seal on their labels and are always labelled as concepts.
Replace any scene with photography by swapping the component for a
`next/image` element and changing its caption.

## Voice

Confident, direct, international. Short sentences in sentence case. No
inflated claims, no certifications or approvals asserted, no fictional
results.
