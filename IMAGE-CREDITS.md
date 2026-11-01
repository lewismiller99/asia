# Media credits and provenance

Every image and film asset on the site is listed here with its source and
licence, so nothing is ever presented as something it is not.

## Photography (`media-source/photos` → `public/images`)

Masters live in `media-source/photos`. `npm run media:build` applies the
house colour grade and writes the web files to `public/images`. None of
these photographs depict Brand It China's manufacturing partners, and the
site says so wherever they appear.

| Master file | Web files | Shows | Source | Licence |
|---|---|---|---|---|
| `suvarnabhumi-airport.jpg` | `arrival.jpg`, `arrival-portrait.jpg` | Suvarnabhumi Airport terminal, Bangkok (the "arrival" scene) | Unsplash photo `1653582245010-04fc596f8ee2` | Unsplash License (free commercial use, no attribution required) |
| `shanghai-skyline.jpg` | `shanghai.jpg`, `shanghai-portrait.jpg` | Pudong skyline, Shanghai | Unsplash photo `1783419423805-c38e7402b0e7` | Unsplash License |
| `shanghai-tower.jpg` | `shanghai-tower.jpg` | Shanghai Tower facade | Unsplash photo `1776675706819-263e97181423` | Unsplash License |
| `hongkong-harbour.jpg` | `harbour-night.jpg`, `harbour-night-portrait.jpg` | Victoria Harbour and Stonecutters Bridge at night, Hong Kong | Wikimedia Commons, "Hong Kong Harbour view from International Commerce Center Building" | CC0 (public domain) |
| `hongkong-skyline.jpg` | `harbour-day.jpg` | Hong Kong across Victoria Harbour | Unsplash photo `1620015092538-e33c665fc181` | Unsplash License |
| `bangkok-hero.jpg` | `city-night.jpg` | Bangkok at night | Unsplash photo `1683317617081-74b271f8c8b3` | Unsplash License |
| `technology-factory.jpg` | `production-line.jpg`, `production-line-portrait.jpg`, `production-line-square.jpg` | Industrial robot on a production line (location not confirmed by the source) | Unsplash photo `1716191299980-a6e8827ba10b` | Unsplash License |
| `founder.jpg` | `founder.jpg` | Lewis Miller, Founder | Supplied by Lewis Miller | Subject's own photograph |

Unsplash pages: `https://unsplash.com/photos/<last-segment-of-id>`, for
example `unsplash.com/photos/04fc596f8ee2`.

## Product imagery

All product imagery is original vector artwork drawn for this project
(`src/components/products/renders.tsx`). It represents illustrative
packaging concepts, not client products, and is labelled as such on the
site. No client work is shown.

## Hero film (`public/video`)

`hero-desktop.mp4` and `hero-mobile.mp4` are assembled by
`scripts/build-film.mjs` from the graded photographs above and two
rendered product frames (`media-source/frames`). The film is illustrative.
It does not show, and is not presented as showing, any partner facility.

## Typography

- Archivo (variable), Omnibus-Type, SIL Open Font License 1.1
- Instrument Serif, Rodrigo Fuenzalida and Jordan Egstad, SIL Open Font License 1.1

The static instances in `brand/fonts` are used only by the brand tooling
(logo outlines, frame rendering). The website loads the fonts through
`next/font` and self-hosts them.
