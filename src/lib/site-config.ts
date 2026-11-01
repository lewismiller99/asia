// Central site configuration for Brand It China.
//
// Contact details and social links are read from environment variables so
// nothing here has to change between environments. Anything left blank is
// simply not rendered: the footer hides missing social links, and the
// enquiry form explains that the WhatsApp number is not yet configured.
//
// See .env.example and README.md for the full list.

// Each variable is referenced literally (never through a dynamic key) so
// Next.js can inline it for the browser at build time. `||` rather than
// `??` so a variable that is set but blank still falls through.
const env = {
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || "").trim(),
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "").trim(),
  email: (process.env.NEXT_PUBLIC_CONTACT_EMAIL || "").trim(),
  founderVideo: (process.env.NEXT_PUBLIC_FOUNDER_VIDEO || "").trim(),
  tiktok: (process.env.NEXT_PUBLIC_SOCIAL_TIKTOK || "").trim(),
  instagram: (process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM || "").trim(),
  linkedin: (process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN || "").trim(),
  youtube: (process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE || "").trim(),
};

export const siteConfig = {
  name: "Brand It China",
  legalName: "Brand It China",
  domain: "branditchina.com",
  url: env.siteUrl || "https://branditchina.com",
  tagline: "Your Brand. Built at Source.",
  description:
    "From your first product idea to manufacturing and packaging, Brand It China helps businesses create their own brands through manufacturing partners in China. British led. Based in Asia. Connected at source.",
  positioning: "British led. Based in Asia. Connected at source.",
  founder: {
    name: "Lewis Miller",
    role: "Founder",
    portrait: "/images/founder.jpg",
    video: env.founderVideo,
  },
  contact: {
    // Digits only, international format, no "+". Configured via env.
    whatsappNumber: env.whatsapp.replace(/[^\d]/g, ""),
    email: env.email,
  },
  social: {
    tiktok: env.tiktok,
    instagram: env.instagram,
    linkedin: env.linkedin,
    youtube: env.youtube,
  },
  ogImageAlt: "Brand It China. Your Brand. Built at Source.",
} as const;

export type SocialKey = keyof typeof siteConfig.social;

export const socialLabels: Record<SocialKey, string> = {
  tiktok: "TikTok",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  youtube: "YouTube",
};

/** Social links that are actually configured, in display order. */
export function configuredSocials(): { key: SocialKey; label: string; href: string }[] {
  return (Object.keys(socialLabels) as SocialKey[])
    .map((key) => ({ key, label: socialLabels[key], href: siteConfig.social[key] }))
    .filter((item) => item.href.length > 0);
}

export const whatsappUrl = (message?: string) => {
  const number = siteConfig.contact.whatsappNumber;
  if (!number) return "";
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};

/** Anchor targets used by the header, hero button and footer. */
export const anchors = {
  create: "#create",
  process: "#process",
  founder: "#founder",
  showcase: "#showcase",
  enquire: "#enquire",
} as const;
