import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { siteConfig, configuredSocials } from "@/lib/site-config";

// Archivo's width axis is what gives the headlines their stance, so it is
// loaded alongside weight. Instrument Serif italic is the single editorial
// counterpoint used for short accent phrases.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
  display: "swap",
});

const title = `${siteConfig.name} | ${siteConfig.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "private label manufacturing China",
    "OEM skincare manufacturer",
    "white label cosmetics",
    "custom product formulation",
    "supplement manufacturing China",
    "haircare private label",
    "packaging development",
    "China sourcing agent",
    "create your own skincare brand",
    "Brand It China",
  ],
  authors: [{ name: siteConfig.founder.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title,
    description: siteConfig.description,
    locale: "en_GB",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: siteConfig.ogImageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: siteConfig.description,
    images: ["/opengraph-image"],
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// Organisation structured data. Factual only: no certifications, awards or
// claims that are not verifiable from the site itself.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  slogan: siteConfig.tagline,
  description: siteConfig.description,
  founder: { "@type": "Person", name: siteConfig.founder.name },
  sameAs: configuredSocials().map((s) => s.href),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${archivo.variable} ${instrument.variable}`} suppressHydrationWarning>
      <body className="min-h-dvh antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {/* Adds "js" before first paint so scroll-reveal CSS only ever hides
            content when JavaScript has actually run. See globals.css. */}
        <Script id="js-flag" strategy="beforeInteractive">
          {"document.documentElement.classList.add('js')"}
        </Script>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:text-black"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
