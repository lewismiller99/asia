import Image from "next/image";
import Link from "next/link";

type FocusCardProps = {
  index: string;
  title: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
};

export function FocusCard({ index, title, description, href, image, imageAlt }: FocusCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex min-h-[26rem] flex-col justify-end overflow-hidden border border-line-dark bg-ink"
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover opacity-45 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-55"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
      <div className="relative flex flex-col gap-4 p-8">
        <span className="font-serif-display text-sm text-bronze">{index}</span>
        <h3 className="font-serif-display text-2xl text-ivory">{title}</h3>
        <p className="text-sm leading-relaxed text-stone">{description}</p>
        <span className="mt-2 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.16em] text-ivory">
          Explore
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            &rarr;
          </span>
        </span>
      </div>
    </Link>
  );
}
