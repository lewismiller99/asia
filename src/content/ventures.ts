import type { Venture } from "@/types";

// Selected Ventures — add or replace entries here as projects become
// public. Each entry needs an image already present in /public/images,
// or drop a new file in that folder and reference it below.
export const ventures: Venture[] = [
  {
    slug: "asia-technology-venture",
    category: "Technology",
    title: "Digital Platform Venture, Thailand",
    description:
      "Commercial strategy, structuring and early investment for a digital platform built for the Thai market.",
    image: "/images/bangkok-daylight.jpg",
    imageAlt: "Bangkok skyline in daylight, representing a Thailand technology venture",
  },
  {
    slug: "bangkok-property-development",
    category: "Property",
    title: "Residential Development, Bangkok",
    description:
      "Project positioning and sales strategy advisory for a residential development in central Bangkok.",
    image: "/images/bangkok-skyline.jpg",
    imageAlt: "Bangkok at twilight with a rooftop pool, representing a property development project",
  },
  {
    slug: "market-entry-mandate",
    category: "Market Entry",
    title: "Thailand Market Entry, International Group",
    description:
      "Advisory mandate supporting an international group's entry into the Thai market, including BOI positioning.",
    image: "/images/suvarnabhumi-airport.jpg",
    imageAlt: "Bangkok airport terminal representing international market entry",
  },
  {
    slug: "regional-advisory-mandate",
    category: "Strategic Advisory Mandate",
    title: "Cross-Border Advisory, Thailand and China",
    description:
      "Ongoing strategic advisory supporting commercial relationships between Thai and Chinese partners.",
    image: "/images/shanghai-skyline.jpg",
    imageAlt: "Shanghai skyline representing cross-border business between Thailand and China",
  },
];
