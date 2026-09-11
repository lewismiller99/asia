import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { pageMetadata } from "@/lib/page-metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Miller & Partners Asia brings together Lewis Miller's investment, advisory, technology and property work across Asia.",
  path: "/about",
});

const principles = [
  "Understand the opportunity.",
  "Bring together the right expertise.",
  "Create a clear commercial strategy.",
  "Execute properly.",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Bringing together our work across Asia"
        intro="Miller & Partners Asia was founded by Lewis Miller to bring together his business interests, investments, advisory work and new ventures across Asia."
        image="/images/bangkok-skyline.jpg"
        imageAlt="Bangkok at twilight, including the King Power Mahanakhon tower and a rooftop pool"
      />

      <section className="bg-offwhite py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <Reveal>
            <SectionLabel>Who We Are</SectionLabel>
            <p className="mt-6 text-lg leading-relaxed text-ink">
              Based in Thailand and operating across the wider Asian market,
              we work alongside business owners, developers, investors,
              technology specialists, professional advisers and regional
              partners.
            </p>
            <p className="mt-6 text-base leading-relaxed text-olive">
              Our role varies from project to project. Sometimes we advise.
              Sometimes we invest. Sometimes we build. Sometimes we connect
              the right people.
            </p>
            <p className="mt-6 text-base leading-relaxed text-olive">
              What remains consistent is a commercial approach focused on
              identifying opportunities, bringing together the right
              expertise and moving projects forward.
            </p>
          </Reveal>
          <Reveal delayMs={100}>
            <ol className="mt-12 grid gap-x-8 gap-y-8 border-t border-line pt-10 sm:grid-cols-2">
              {principles.map((item, i) => (
                <li key={item} className="flex items-start gap-4">
                  <span className="font-serif-display text-sm text-bronze">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-serif-display text-xl text-ink">
                    {item}
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* Founder */}
      <section className="bg-ink py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12 lg:gap-8 lg:px-10">
          <Reveal className="lg:col-span-4">
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-line-dark bg-charcoal">
              <Image
                src="/images/founder.jpg"
                alt="Lewis Miller, Founder of Miller & Partners Asia"
                fill
                sizes="(min-width: 1024px) 30vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delayMs={100} className="lg:col-span-8">
            <SectionLabel>Founder</SectionLabel>
            <h2 className="mt-5 font-serif-display text-3xl leading-tight text-ivory sm:text-4xl">
              Lewis Miller
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-stone">
              Lewis Miller is a British entrepreneur based in Thailand. He
              built his career in the UK before relocating to Asia, where
              he has since worked across property, technology and
              investment.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-stone">
              Miller &amp; Partners Asia brings those interests together
              under one business, creating a central home for the projects,
              ventures, investments and advisory work Lewis is involved in
              across the region.
            </p>
            <a
              href={siteConfig.linkedInUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-8 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.16em] text-ivory underline decoration-bronze decoration-2 underline-offset-8"
            >
              Connect on LinkedIn &rarr;
            </a>
          </Reveal>
        </div>
      </section>

      {/* How We Work */}
      <section className="bg-offwhite py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12 lg:gap-8 lg:px-10">
          <Reveal className="lg:col-span-5">
            <SectionLabel>How We Work</SectionLabel>
            <h2 className="mt-5 font-serif-display text-3xl leading-tight text-ink sm:text-4xl">
              A trusted network for every project
            </h2>
            <p className="mt-6 text-base leading-relaxed text-olive">
              We work with a trusted network of specialists, advisers,
              investors, developers and commercial partners, bringing
              together the right expertise for each project rather than
              forcing everything through one fixed structure.
            </p>
          </Reveal>
          <Reveal delayMs={100} className="lg:col-span-7">
            <div className="relative aspect-[16/11] w-full overflow-hidden bg-charcoal">
              <Image
                src="/images/hongkong-skyline.jpg"
                alt="Harbour view representing our regional network across Asia"
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Asia Focus */}
      <section className="bg-offwhite py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal className="max-w-2xl">
            <SectionLabel>Asia Focus</SectionLabel>
            <h2 className="mt-5 font-serif-display text-3xl leading-tight text-ink sm:text-4xl">
              Thailand and China first, the wider region over time
            </h2>
            <p className="mt-6 text-base leading-relaxed text-olive">
              Our current network and activities are centred primarily
              around Thailand and China, with relationships, investments
              and commercial interests continuing to develop across the
              wider Asian region.
            </p>
          </Reveal>
          <Reveal delayMs={100} className="mt-12 grid gap-x-8 gap-y-6 border-t border-line pt-10 sm:grid-cols-3">
            <p className="text-base text-ink">Thailand</p>
            <p className="text-base text-ink">China</p>
            <p className="text-base text-ink">Wider Asia</p>
          </Reveal>
        </div>
      </section>

      {/* Our Principles CTA */}
      <section className="bg-ink py-20">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-8 px-6 lg:px-10">
          <Reveal>
            <p className="font-serif-display text-2xl text-ivory sm:text-3xl">
              Interested in working together?
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
