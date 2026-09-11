// Central site configuration.
// Update contact details, social links and the base URL here — every page,
// the sitemap and the SEO metadata read from this single file.

export const siteConfig = {
  name: "Miller & Partners Asia",
  descriptor: "Investment | Advisory | Technology | Property",
  tagline: "Connecting opportunity across Asia",
  shortDescription:
    "Miller & Partners Asia is an independent business platform focused on investment, advisory, technology and property opportunities across Asia.",
  // `||` (not `??`) so an env var that's set but left blank still falls
  // back correctly — an empty string would otherwise crash `new URL()`.
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://lewisandpartners.asia",
  founder: "Lewis Miller",
  location: "Bangkok | Thailand | Asia",

  // Update these when live contact details are available.
  contactEmail: "lewis@millerandpartners.asia",
  linkedInUrl: "https://www.linkedin.com/in/lewis-m-27b80550/",
  linkedInHandle: "linkedin.com/in/lewis-m-27b80550",

  ogImageAlt: "Miller & Partners Asia — Connecting opportunity across Asia",
} as const;

export type NavItem = {
  label: string;
  href: string;
};

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Investment", href: "/investment" },
  { label: "Advisory", href: "/advisory" },
  { label: "Technology", href: "/technology" },
  { label: "Property", href: "/property" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export const footerLegalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "Legal Disclaimer", href: "/disclaimer" },
];

export const legalDisclaimer =
  "Miller & Partners Asia is an independent business and advisory brand operated by Lewis Miller. Projects, investments and commercial activities presented through this website may be undertaken personally, through independent partners or through separate legal entities. Miller & Partners Asia does not represent itself as a licensed legal, financial, securities or investment advisory firm. Where regulated professional services are required, clients are referred to appropriately qualified independent professionals.";
