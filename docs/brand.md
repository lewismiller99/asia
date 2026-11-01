# Brand It China: digital design system

A summary of the rules the website is built on, so future changes stay
coherent. The approved identity (lowercase "brand it" wordmark, elongated
rule, red seal, "china" beneath) is the foundation for everything else.

## The mark

- Lockup: `Logo` in `src/components/brand/logo.tsx`. Geometry lives in
  `LOGO_GEOMETRY` and must not be changed without approval.
- Variants: black on light, white on dark (`tone`), wordmark only
  (`Wordmark`) for compact placements, seal only (`Seal`) for favicon,
  avatars and watermarks.
- Measured from the approved artwork: "brand it" over "china" at the same
  size, the second line right aligned to the "t" and set one ascender
  height below the first; the "t" crossbar continues as the rule for 1.2
  ascender heights; the seal (0.38 by 0.58 ascender heights, vermilion
  `#E02619`) sits 0.17 ascender heights beyond the rule, centred on it.
- The seal carries 创 ("create") in ZCOOL XiaoWei, white on vermilion.
- The wordmark is set in League Spartan Black with -0.02em tracking,
  the closest open typeface to the approved letterforms. Both faces are
  stored as outlines (`logo-paths.ts`) so the mark never depends on font
  loading. Regenerate with `node brand/tools/build-logo-paths.js`.
- Clear space: half the height of the "b" on every side. Minimum width 120 px.
- Motion: the rule may draw in and the seal may land (hero only). The mark
  is never otherwise animated, recoloured, rotated or cropped.

## Colour

| Token | Hex | Use |
|---|---|---|
| black | `#0a0a0a` | Primary dark surface |
| ink | `#141414` | Text on light surfaces |
| charcoal / graphite | `#1c1c1c` / `#2a2a2a` | Dark tiles and gradients |
| ash / smoke / mist | `#5a5955` / `#8c8a86` / `#b8b4ae` | Secondary text |
| sand / bone / paper | `#dcd6cc` / `#f3f0ea` / `#faf8f4` | Warm light surfaces |
| white | `#ffffff` | Text on dark |
| seal | `#e02619` | The one accent: eyebrow rules, buttons, the seal |

No gradients between hues, no blue, purple or neon. Red is used for the
eyebrow rule, the primary button, the seal, the italic accent word in a
headline, and error states. Nothing else.

## Typography

- Archivo (variable, weight and width axes) for everything. Display
  headlines: weight 800, width 112, uppercase, leading 0.92, tracking
  -0.025em (`.display`). Section titles within tiles: `.display-sm`.
  Numerals: weight 300, width 75 (`.numeral`).
- Instrument Serif italic as the only counterpoint (`.serif-accent`), used
  for one word in a headline or a short line, never for paragraphs.
- Eyebrows: 11px, 0.22em tracking, uppercase, preceded by a short red rule.
- Body: 17px, leading 1.6. Lede: fluid 18 to 23px.

## Layout rhythm

Dark hero, light possibilities, dark capabilities, light founder, dark
showcase, light enquiry, dark footer. Full bleed imagery opens the dark
sections. Headlines are oversized and left aligned; ledes sit to the
right on wide screens. Grids are 12 column with intentional asymmetry
(7/5, 4/4/4, 5/3/4). Gutters are fluid (`--gutter`).

## Motion

One language, defined in `globals.css`:

- `reveal`: content settles upward 28px while fading in.
- `reveal-mask`: imagery unmasks from the bottom while scaling from 1.08.
- `reveal-line`: rules draw from the left.
- `reveal-stagger`: lists arrive 90ms apart.
- Hero choreography: logo, headline lines, copy, buttons, then positioning.

All of it is disabled under `prefers-reduced-motion`, and everything is
visible without JavaScript.

## Imagery

Two worlds, always both present: cinematic international commerce and
premium product concepts. Photography is graded with restrained
saturation, lifted blacks and warm neutral shadows (`scripts/build-media.mjs`).
Product renders are lit from the upper left on charcoal or bone stages
and are always labelled as concepts.

## Voice

Confident, direct, international. Short sentences. No inflated claims,
no certifications or approvals asserted, no fictional results. The founder
speaks in the first person only in the quoted copy of the founder section.
