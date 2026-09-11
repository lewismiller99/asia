import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { siteConfig } from "@/lib/site-config";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.shortDescription,
  keywords: [
    "Asia investment advisory",
    "Thailand business advisory",
    "Thailand market entry",
    "BOI Thailand advisory",
    "Asia technology ventures",
    "Thailand property investment",
    "Asia business development",
    "Thailand investment opportunities",
    "China Thailand business",
    "Asia strategic partnerships",
  ],
  authors: [{ name: siteConfig.founder }],
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.shortDescription,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: siteConfig.ogImageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.shortDescription,
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: "/",
  },
};

// Organization structured data (JSON-LD). Kept generic and factual — no
// legal-entity or registration claims, consistent with the disclaimer in
// the footer and on /disclaimer.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.shortDescription,
  founder: {
    "@type": "Person",
    name: siteConfig.founder,
  },
  sameAs: [siteConfig.linkedInUrl],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col antialiased">
        {/* Plain script tag, not next/script — this needs to be present in
            the static HTML for crawlers/rich-result tools, not injected at
            runtime the way next/script's strategies do. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {/* Adds "js" before first paint so scroll-reveal CSS only ever
            hides content when JavaScript has actually run. See
            globals.css and components/reveal.tsx. */}
        <Script id="js-flag" strategy="beforeInteractive">
          {"document.documentElement.classList.add('js')"}
        </Script>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-ivory focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
