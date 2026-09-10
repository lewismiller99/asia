import Image from "next/image";
import type { Venture } from "@/types";

export function VentureCard({ venture }: { venture: Venture }) {
  return (
    <article className="group flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden bg-charcoal">
        <Image
          src={venture.image}
          alt={venture.imageAlt}
          fill
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.2em] text-bronze">
        {venture.category}
      </p>
      <h3 className="mt-2 font-serif-display text-xl text-ink">
        {venture.title}
      </h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-olive">
        {venture.description}
      </p>
    </article>
  );
}
