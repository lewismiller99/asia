export type FocusArea = "Investment" | "Advisory" | "Technology" | "Property";

export type Venture = {
  slug: string;
  category: FocusArea | "Strategic Advisory Mandate" | "Market Entry";
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  href?: string;
};

export type InsightCategory =
  | "Investment"
  | "Asia"
  | "Thailand"
  | "China"
  | "Technology"
  | "Property"
  | "BOI"
  | "Business"
  | "Market Commentary";

export type InsightFrontmatter = {
  title: string;
  date: string;
  category: InsightCategory;
  image: string;
  imageAlt: string;
  excerpt: string;
  author: string;
};

export type InsightArticle = InsightFrontmatter & {
  slug: string;
  content: string;
  readingTime: string;
};
