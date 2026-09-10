import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getAllInsightSlugs } from "@/lib/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/investment",
    "/advisory",
    "/technology",
    "/property",
    "/insights",
    "/contact",
    "/privacy",
    "/terms",
    "/cookies",
    "/disclaimer",
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.7,
  }));

  const insightRoutes = getAllInsightSlugs().map((slug) => ({
    url: `${siteConfig.url}/insights/${slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...insightRoutes];
}
