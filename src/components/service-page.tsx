import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { VentureCard } from "@/components/venture-card";
import type { Venture } from "@/types";

type ServicePageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  heroImage: string;
  heroImageAlt: string;
  overviewLabel: string;
  overviewHeading: string;
  overviewParagraphs: string[];
  overviewImage: string;
  overviewImageAlt: string;
  areasLabel: string;
  areasHeading: string;
  areas: string[];
  disclaimer?: string;
  relatedVentures?: Venture[];
};

/**
 * Shared layout for the four focus-area pages (Investment, Advisory,
 * Technology, Property). Keeps their structure and rhythm identical while
 * each page supplies its own copy, imagery and disclaimer text.
 */
export function ServicePage({
  eyebrow,
  title,
  intro,
  heroImage,
  heroImageAlt,
  overviewLabel,
  overviewHeading,
  overviewParagraphs,
  overviewImage,
  overviewImageAlt,
  areasLabel,
  areasHeading,
  areas,
  disclaimer,
  relatedVentures,
}: ServicePageProps) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        intro={intro}
        image={heroImage}
        imageAlt={heroImageAlt}
      />

      <section className="bg-offwhite py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12 lg:gap-8 lg:px-10">
          <Reveal className="lg:col-span-5">
            <SectionLabel>{overviewLabel}</SectionLabel>
            <h2 className="mt-5 font-serif-display text-3xl leading-tight text-ink sm:text-4xl">
              {overviewHeading}
            </h2>
            {overviewParagraphs.map((p) => (
              <p key={p} className="mt-5 text-base leading-relaxed text-olive">
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal delayMs={100} className="lg:col-span-7">
            <div className="relative aspect-[16/11] w-full overflow-hidden bg-charcoal">
              <Image
                src={overviewImage}
                alt={overviewImageAlt}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-line bg-ivory py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal className="max-w-2xl">
            <SectionLabel>{areasLabel}</SectionLabel>
            <h2 className="mt-5 font-serif-display text-3xl leading-tight text-ink sm:text-4xl">
              {areasHeading}
            </h2>
          </Reveal>
          <Reveal delayMs={100}>
            <ul className="mt-14 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
              {areas.map((area) => (
                <li
                  key={area}
                  className="border-b border-line py-4 text-base text-ink"
                >
                  {area}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {relatedVentures && relatedVentures.length > 0 && (
        <section className="bg-offwhite py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <Reveal className="max-w-2xl">
              <SectionLabel>Selected Ventures</SectionLabel>
              <h2 className="mt-5 font-serif-display text-3xl leading-tight text-ink sm:text-4xl">
                Related work
              </h2>
            </Reveal>
            <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2">
              {relatedVentures.map((venture, i) => (
                <Reveal key={venture.slug} delayMs={i * 80}>
                  <VentureCard venture={venture} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {disclaimer && (
        <section className="bg-ivory py-16">
          <div className="mx-auto max-w-4xl px-6 lg:px-10">
            <Reveal>
              <p className="border-l-2 border-bronze/60 pl-6 text-sm leading-relaxed text-olive">
                {disclaimer}
              </p>
            </Reveal>
          </div>
        </section>
      )}

      <section className="bg-ink py-20">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-8 px-6 lg:px-10">
          <Reveal>
            <p className="font-serif-display text-2xl text-ivory sm:text-3xl">
              Have an opportunity worth discussing?
            </p>
          </Reveal>
          <Reveal delayMs={100}>
            <Link
              href="/contact"
              className="inline-flex items-center bg-ivory px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.16em] text-ink transition-colors duration-300 hover:bg-bronze hover:text-ivory"
            >
              Start a Conversation
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
