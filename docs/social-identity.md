# Social media identity

One visual system across TikTok, Instagram, LinkedIn and YouTube Shorts,
derived directly from the website. All templates are rendered from the
same React components as the site by `npm run brand:build`, so they stay
in step with any change to the mark.

## Files (`brand/`)

| File | Use |
|---|---|
| `official/SVG`, `official/PNG` | The approved logo files: Primary, Reverse, Mono, Wordmark and Seal versions |
| `social/profile-seal.png` | Profile image (1080x1080), seal on black. Use on every platform. |
| `social/profile-wordmark.png` | Alternative profile image, wordmark on black |
| `social/opening-9x16.png`, `opening-16x9.png` | Video opening graphic, hold 0.4 s |
| `social/closing-9x16.png`, `closing-16x9.png` | Video closing graphic, hold 2 s |
| `social/lower-third-16x9.png` | Founder lower third, transparent PNG |
| `social/caption-card-9x16.png` | Caption treatment, transparent PNG, replace the text in the editor |
| `social/video-cover-factory-9x16.png`, `video-cover-city-9x16.png` | Branded video covers; swap the photo and headline |
| `social/product-showcase-4x5.png` | Instagram and LinkedIn product post template |
| `social/founder-post-4x5.png` | Founder post template |

## Rules

- Charcoal, white, light grey, one vermilion. No gradients, no other accents.
- The lockup is never stretched, recoloured or cropped. Keep one seal width clear around it. Minimum width 220 px.
- The seal is the watermark: bottom right, 4 percent of frame width, 70 percent opacity.
- Headlines: Plus Jakarta Sans ExtraBold, sentence case, tight leading. Labels: Inter SemiBold, uppercase, tracked.
- Captions sit on a black bar, never directly on footage.
- Label every product render as a concept. Only show client work with permission.

## Platform sizes

| Platform | Asset | Size |
|---|---|---|
| TikTok, Reels, Shorts | Video and cover | 1080x1920 |
| Instagram feed | Post | 1080x1350 |
| LinkedIn feed | Post and video | 1080x1350 or 1920x1080 |
| YouTube | Thumbnail | 1920x1080 |
| All | Profile image | 1080x1080 |

Editing the templates: change the copy and images in
`scripts/render-frames.tsx` and run `npm run brand:build`.
