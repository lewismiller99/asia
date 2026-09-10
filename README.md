# Miller & Partners Asia — Website

Production website for Miller & Partners Asia, an independent business
platform focused on investment, advisory, technology and property
opportunities across Asia. Built with Next.js (App Router), TypeScript and
Tailwind CSS.

A standalone, no-build visual preview is also included: **[preview.html](preview.html)**
— double-click it to open in any browser.

---

## 1. Project structure

```
miller-partners-asia/
├── preview.html              # Standalone static preview (no build needed)
├── preview-assets/           # Images used only by preview.html
├── IMAGE-CREDITS.md          # Attribution for sourced photography
├── src/
│   ├── app/                  # Routes (Next.js App Router)
│   │   ├── page.tsx          # Home
│   │   ├── about/            ├── advisory/          ├── investment/
│   │   ├── technology/       ├── property/          ├── contact/
│   │   ├── insights/         #   index + [slug] article pages
│   │   ├── privacy/  terms/  cookies/  disclaimer/   # legal pages
│   │   ├── not-found.tsx  loading.tsx  error.tsx
│   │   ├── sitemap.ts  robots.ts
│   │   ├── icon.tsx  apple-icon.tsx  opengraph-image.tsx  # generated, no image files needed
│   │   ├── layout.tsx        # Root layout: fonts, header, footer, metadata
│   │   └── globals.css       # Design tokens (colour/type) + base styles
│   ├── components/           # Header, Footer, cards, contact form, etc.
│   ├── content/
│   │   ├── insights/*.mdx    # Article content (frontmatter + Markdown)
│   │   └── ventures.ts       # "Selected Ventures" data
│   ├── lib/
│   │   ├── site-config.ts    # Name, nav, contact details, disclaimer text
│   │   ├── page-metadata.ts  # Per-page SEO metadata helper
│   │   └── insights.ts       # Reads/parses the MDX articles
│   └── types/                # Shared TypeScript types
└── public/images/            # Optimised local photography used by the site
```

## 2. Install

Requires Node.js 20+.

```bash
npm install
```

## 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 4. Build

```bash
npm run build
npm start   # serve the production build locally on :3000
```

The build is verified to produce zero TypeScript errors and zero ESLint
errors/warnings.

## 5. Deploy

**Vercel (recommended):**

1. Push this repository to GitHub/GitLab/Bitbucket.
2. Import it at [vercel.com/new](https://vercel.com/new) — Next.js is
   detected automatically, no configuration needed.
3. Set environment variables (see §11) in the Vercel project settings if you
   want to change them from their defaults.

**Any Node.js host (Docker, a VM, etc.):** this is a standard Next.js app —
`npm run build` then `npm start`, or wrap it in a Dockerfile using the
[official Next.js Docker example](https://github.com/vercel/next.js/tree/canary/examples/with-docker)
as a starting point. No database or special runtime is required.

## 6. How to change copy

Most page copy lives directly in each page's `.tsx` file under `src/app/`
as plain JSX text — edit it in place. Shared/reused strings (site name,
descriptor, legal disclaimer, contact details) live in
[`src/lib/site-config.ts`](src/lib/site-config.ts).

## 7. How to change images

Hero and section images are referenced by path, e.g.
`/images/bangkok-skyline.jpg`, pointing at files in
[`public/images/`](public/images/). To replace one:

1. Add your new image to `public/images/` (JPEG/WebP, ideally ≤ 2400px wide
   and optimised — see the pipeline note below).
2. Update the `src="/images/..."` (and matching `alt` text) reference in the
   relevant component or page.

All current photography is sourced from Wikimedia Commons under
attribution-friendly Creative Commons licences — see
[`IMAGE-CREDITS.md`](IMAGE-CREDITS.md). Replace freely with your own
licensed or commissioned photography; update or remove that file to match.

Images are served through `next/image`, which automatically generates
responsive sizes and lazy-loads offscreen images — no extra work needed
beyond dropping in a reasonably sized source file.

## 8. How to add an Insight article

Add a new `.mdx` file to [`src/content/insights/`](src/content/insights/)
with this frontmatter shape (copy an existing article as a template):

```mdx
---
title: "Your Article Title"
date: "2026-09-01"
category: "Thailand"   # one of: Investment, Asia, Thailand, China, Technology, Property, BOI, Business, Market Commentary
image: "/images/your-image.jpg"
imageAlt: "Descriptive alt text"
excerpt: "One or two sentences shown on the article card."
author: "Lewis Miller"
---

Article body in Markdown. `##` headings, paragraphs, links, etc.
```

The article is picked up automatically — it appears on `/insights`, gets
its own `/insights/<filename-slug>` page, is included in the sitemap, and
shows in the category filter. No code changes required.

## 9. How to add a Selected Venture

Add an entry to the array in
[`src/content/ventures.ts`](src/content/ventures.ts):

```ts
{
  slug: "unique-slug",
  category: "Property", // or Investment / Technology / Market Entry / Strategic Advisory Mandate
  title: "Project Title",
  description: "One or two sentences.",
  image: "/images/your-image.jpg",
  imageAlt: "Descriptive alt text",
}
```

It appears automatically on the homepage's "Selected Ventures" section and
on the matching focus-area page (Investment/Advisory/Technology/Property)
where its `category` matches.

## 10. How to change contact details

Edit [`src/lib/site-config.ts`](src/lib/site-config.ts):

```ts
contactEmail: "enquiries@millerpartnersasia.com",
linkedInUrl: "https://www.linkedin.com/in/lewismiller",
location: "Bangkok | Thailand | Asia",
```

These feed the header CTA, footer, `/contact` page and the founder section
automatically.

### Contact form backend

The form validates client-side and works out of the box with **no backend
configured** — a valid submission opens the visitor's email client with the
message pre-filled (via a `mailto:` link), so no enquiries are lost even
before you wire up a service.

To capture submissions server-side instead, set `NEXT_PUBLIC_FORM_ENDPOINT`
(see `.env.example`) to a POST endpoint that accepts `multipart/form-data`.
Good options:

- **[Formspree](https://formspree.io)** — create a form, use its endpoint
  URL directly. Zero backend code.
- **[Resend](https://resend.com)** with a small serverless function (e.g. a
  Next.js Route Handler at `src/app/api/contact/route.ts`) if you want
  emails sent from your own domain.
- Any other form-backend-as-a-service (Basin, GetForm, etc.) — all accept
  the same `FormData` POST the form already sends.

## 11. How to update SEO metadata

- **Global defaults** (title template, description, Open Graph, keywords):
  [`src/app/layout.tsx`](src/app/layout.tsx) and
  [`src/lib/site-config.ts`](src/lib/site-config.ts).
- **Per-page metadata**: each page exports a `metadata` object built with
  the [`pageMetadata()`](src/lib/page-metadata.ts) helper — edit the
  `title`/`description` arguments passed to it in that page's file.
- **Site URL**: set `NEXT_PUBLIC_SITE_URL` (see `.env.example`) — it drives
  canonical URLs, the sitemap and Open Graph URLs.
- **Sitemap / robots.txt**: generated automatically from
  [`src/app/sitemap.ts`](src/app/sitemap.ts) /
  [`src/app/robots.ts`](src/app/robots.ts) — new pages and Insight
  articles are included with no manual edits needed.
- **Favicon / social share image**: both are generated at build time from
  code ([`src/app/icon.tsx`](src/app/icon.tsx),
  [`src/app/apple-icon.tsx`](src/app/apple-icon.tsx),
  [`src/app/opengraph-image.tsx`](src/app/opengraph-image.tsx)) rather than
  static image files — edit the JSX/styles in those files to change them
  (e.g. swap the "M" monogram for a logo mark).

## 12. How to replace the founder portrait

The founder sections (homepage and `/about`) show `public/images/founder.jpg`
via `next/image`. To swap in a different photo, just replace that file with
a new one of the same name (ideally a 4:5 portrait crop, ≥1200×1500px) — no
code changes needed.

If the source photo has a busy background (e.g. taken at an event, in front
of signage or other branding), it's worth applying the same treatment used
for the current photo before dropping it in: crop tighter to a
head-and-shoulders frame, then blur and darken the background (a simulated
shallow depth-of-field) so the founder stays the clear subject and any
unrelated signage becomes illegible. Any photo editor's background-blur or
portrait mode can achieve this — it doesn't need to be code-based.

## 13. How to replace the logo

The logo is typographic (no image file) — "MILLER & PARTNERS" / "ASIA" set
in the site's serif and letter-spacing, defined in
[`src/components/header.tsx`](src/components/header.tsx) and
[`src/components/footer.tsx`](src/components/footer.tsx). To use an image
logo instead, replace the `<span>` elements there with an `<Image>` pointing
at your logo file.

## 14. Design system reference

- **Colours** — CSS custom properties in
  [`src/app/globals.css`](src/app/globals.css) (`--color-ink`,
  `--color-ivory`, `--color-bronze`, etc.), exposed as Tailwind utilities
  (`bg-ink`, `text-bronze`, ...).
- **Typography** — Fraunces (serif, headings) + Inter (sans, body/UI),
  loaded via `next/font/google` in `layout.tsx` — self-hosted, no runtime
  request to Google Fonts.
- **Scroll-reveal animation** — [`src/components/reveal.tsx`](src/components/reveal.tsx),
  a small IntersectionObserver wrapper. Content is always visible with
  JavaScript disabled or if the observer never fires (progressive
  enhancement, with a timeout failsafe) — see the comments in that file and
  in `globals.css` for how the "js"-class technique avoids a flash.

## 15. Notes on this build

- Zero `TODO`s, zero placeholder Lorem Ipsum copy, zero broken links or
  images — the one intentional placeholder is the founder portrait (§12),
  clearly labelled as such on the page itself.
- The site never states or implies Miller & Partners Asia is a registered
  company, a formal legal partnership, or a regulated financial/legal
  adviser — see the Legal Disclaimer page and footer text, sourced from
  `legalDisclaimer` in `site-config.ts`.
- All photography is licensed for this use — see `IMAGE-CREDITS.md`.
