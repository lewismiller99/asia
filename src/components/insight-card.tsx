import Image from "next/image";
import Link from "next/link";
import type { InsightArticle } from "@/types";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function InsightCard({ article }: { article: InsightArticle }) {
  return (
    <Link href={`/insights/${article.slug}`} className="group flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden bg-charcoal">
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <div className="mt-5 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-bronze">
        <span>{article.category}</span>
        <span className="text-stone">·</span>
        <span className="text-olive">{formatDate(article.date)}</span>
      </div>
      <h3 className="mt-3 font-serif-display text-xl leading-snug text-ink transition-colors duration-300 group-hover:text-olive">
        {article.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-olive">
        {article.excerpt}
      </p>
      <span className="mt-3 text-[12px] font-medium uppercase tracking-[0.14em] text-ink/70">
        {article.readingTime}
      </span>
    </Link>
  );
}
