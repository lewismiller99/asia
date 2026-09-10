import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { InsightArticle, InsightFrontmatter } from "@/types";

// Server-only module: reads MDX files from src/content/insights at build /
// request time. To add an article, drop a new .mdx file in that folder with
// the same frontmatter shape used by the existing articles — no code
// changes required.

const INSIGHTS_DIR = path.join(process.cwd(), "src/content/insights");

function readSlugs(): string[] {
  return fs
    .readdirSync(INSIGHTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getAllInsights(): InsightArticle[] {
  const slugs = readSlugs();

  const articles = slugs.map((slug) => getInsightBySlug(slug));

  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getInsightBySlug(slug: string): InsightArticle {
  const fullPath = path.join(INSIGHTS_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as InsightFrontmatter;
  const stats = readingTime(content);

  return {
    ...frontmatter,
    slug,
    content,
    readingTime: `${Math.max(1, Math.round(stats.minutes))} min read`,
  };
}

export function getAllInsightSlugs(): string[] {
  return readSlugs();
}

export function getRelatedInsights(
  current: InsightArticle,
  limit = 3
): InsightArticle[] {
  const all = getAllInsights().filter((a) => a.slug !== current.slug);
  const sameCategory = all.filter((a) => a.category === current.category);
  const rest = all.filter((a) => a.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
}
