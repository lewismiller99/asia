import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { InsightCard } from "@/components/insight-card";
import { Reveal } from "@/components/reveal";
import {
  getAllInsightSlugs,
  getInsightBySlug,
  getRelatedInsights,
} from "@/lib/insights";
import { pageMetadata } from "@/lib/page-metadata";
import { siteConfig } from "@/lib/site-config";

export function generateStaticParams() {
  return getAllInsightSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  try {
    const article = getInsightBySlug(slug);
    return pageMetadata({
      title: article.title,
      description: article.excerpt,
      path: `/insights/${slug}`,
      image: article.image,
    });
  } catch {
    return pageMetadata({
      title: "Insight",
      description: "Commentary from Miller & Partners Asia.",
      path: `/insights/${slug}`,
    });
  }
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function InsightArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let article;
  try {
    article = getInsightBySlug(slug);
  } catch {
    notFound();
  }

  const related = getRelatedInsights(article);
  const shareUrl = `${siteConfig.url}/insights/${article.slug}`;

  return (
    <article>
      <header className="relative flex min-h-[56vh] items-end overflow-hidden bg-ink">
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/10" />
        <div className="relative mx-auto w-full max-w-4xl px-6 pb-16 pt-36 lg:px-10">
          <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-bronze">
            <span>{article.category}</span>
            <span className="text-stone">·</span>
            <span className="text-stone">{formatDate(article.date)}</span>
            <span className="text-stone">·</span>
            <span className="text-stone">{article.readingTime}</span>
          </div>
          <h1 className="mt-5 font-serif-display text-3xl leading-tight text-ivory sm:text-4xl lg:text-5xl">
            {article.title}
          </h1>
          <p className="mt-4 text-sm text-stone">By {article.author}</p>
        </div>
      </header>

      <div className="bg-offwhite py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <Reveal>
            <div className="prose-insight">
              <MDXRemote source={article.content} />
            </div>
          </Reveal>

          <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-8">
            <Link
              href="/insights"
              className="text-[12px] font-medium uppercase tracking-[0.16em] text-ink underline decoration-bronze decoration-2 underline-offset-8"
            >
              &larr; All Insights
            </Link>
            <div className="flex items-center gap-4 text-[12px] font-medium uppercase tracking-[0.14em] text-olive">
              <span>Share</span>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noreferrer noopener"
                className="underline decoration-bronze decoration-2 underline-offset-4 hover:text-ink"
              >
                LinkedIn
              </a>
              <a
                href={`mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(shareUrl)}`}
                className="underline decoration-bronze decoration-2 underline-offset-4 hover:text-ink"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="border-t border-line bg-ivory py-24 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-bronze">
              Related Insights
            </p>
            <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <InsightCard key={item.slug} article={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
