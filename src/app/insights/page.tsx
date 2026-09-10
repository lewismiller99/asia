import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { InsightCard } from "@/components/insight-card";
import { Reveal } from "@/components/reveal";
import { getAllInsights } from "@/lib/insights";
import { pageMetadata } from "@/lib/page-metadata";
import clsx from "clsx";

export const metadata = pageMetadata({
  title: "Insights",
  description:
    "Commentary on Asia, Thailand, China, investment, property, technology and BOI from Miller & Partners Asia.",
  path: "/insights",
});

export default async function InsightsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const allInsights = getAllInsights();
  const categories = Array.from(
    new Set(allInsights.map((article) => article.category))
  );
  const filtered = category
    ? allInsights.filter((article) => article.category === category)
    : allInsights;

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Commentary on Asia, Thailand and investment"
        intro="Articles and commentary by Lewis Miller covering investment, Thailand, China, technology, property, BOI and the wider Asian market."
        image="/images/suvarnabhumi-airport.jpg"
        imageAlt="Airport terminal representing regional travel and business across Asia"
      />

      <section className="bg-offwhite py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <nav
            aria-label="Filter by category"
            className="flex flex-wrap gap-3 border-b border-line pb-10"
          >
            <Link
              href="/insights"
              className={clsx(
                "px-4 py-2 text-[12px] font-medium uppercase tracking-[0.14em] transition-colors",
                !category
                  ? "bg-ink text-ivory"
                  : "border border-line text-olive hover:border-ink hover:text-ink"
              )}
            >
              All
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/insights?category=${encodeURIComponent(cat)}`}
                className={clsx(
                  "px-4 py-2 text-[12px] font-medium uppercase tracking-[0.14em] transition-colors",
                  category === cat
                    ? "bg-ink text-ivory"
                    : "border border-line text-olive hover:border-ink hover:text-ink"
                )}
              >
                {cat}
              </Link>
            ))}
          </nav>

          {filtered.length === 0 ? (
            <p className="mt-14 text-base text-olive">
              No articles in this category yet.
            </p>
          ) : (
            <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((article, i) => (
                <Reveal key={article.slug} delayMs={(i % 3) * 80}>
                  <InsightCard article={article} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
