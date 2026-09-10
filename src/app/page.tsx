import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { FocusCard } from "@/components/focus-card";
import { VentureCard } from "@/components/venture-card";
import { InsightCard } from "@/components/insight-card";
import { ContactForm } from "@/components/contact-form";
import { ventures } from "@/content/ventures";
import { getAllInsights } from "@/lib/insights";
import { siteConfig } from "@/lib/site-config";

const focusAreas = [
  {
    index: "01",
    title: "Investment",
    href: "/investment",
    image: "/images/hongkong-harbour.jpg",
    imageAlt: "Harbour and skyline representing private investment across Asia",
    description:
      "Selected private investment across technology, property and emerging commercial opportunities.",
  },
  {
    index: "02",
    title: "Advisory",
    href: "/advisory",
    image: "/images/singapore-port-terminal.jpg",
    imageAlt: "Container terminal representing commercial advisory and market entry",
    description:
      "Commercial advisory for businesses and investors operating in, or entering, Asian markets.",
  },
  {
    index: "03",
    title: "Technology",
    href: "/technology",
    image: "/images/shanghai-skyline.jpg",
    imageAlt: "Modern skyline representing technology ventures in Asia",
    description:
      "Development, investment and commercial strategy for technology led businesses built for Asia.",
  },
  {
    index: "04",
    title: "Property",
    href: "/property",
    image: "/images/bangkok-skyline.jpg",
    imageAlt: "Bangkok skyline representing property investment and development",
    description:
      "Property investment, development strategy and project advisory across Thailand and Asia.",
  },
];

const approachPrinciples = [
  {
    title: "Commercial Judgement",
    description:
      "We evaluate every opportunity on its commercial merit before anything else.",
  },
  {
    title: "Strong Relationships",
    description:
      "Our work is built on trust developed over time, not one-off transactions.",
  },
  {
    title: "Local Understanding",
    description:
      "Regional experience shapes how projects are structured and positioned.",
  },
  {
    title: "Clear Execution",
    description:
      "Ideas are only valuable once they are carried through properly.",
  },
];

const selectedInterests = [
  "Private Investment",
  "Business Advisory",
  "Thailand Market Entry",
  "BOI and Investment Promotion",
  "Technology Ventures",
  "Software Development",
  "Property Investment",
  "Property Development",
  "Strategic Partnerships",
  "Business Development",
  "China and Thailand Business",
  "Regional Expansion",
];

export default function HomePage() {
  const latestInsights = getAllInsights().slice(0, 3);

  return (
    <>
      {/* 1 — Hero */}
      <section className="relative flex min-h-[92vh] items-end overflow-hidden bg-ink">
        <Image
          src="/images/bangkok-dusk-ratchadamri.jpg"
          alt="Bangkok's skyline at dusk, viewed across the Ratchadamri district"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-20 pt-40 lg:px-10 lg:pb-28">
          <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-bronze">
            {siteConfig.descriptor}
          </p>
          <h1 className="mt-6 max-w-4xl font-serif-display text-5xl leading-[1.05] text-ivory sm:text-6xl lg:text-7xl">
            Connecting opportunity across Asia
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-stone lg:text-lg">
            {siteConfig.shortDescription}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/about"
              className="inline-flex items-center bg-ivory px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.16em] text-ink transition-colors duration-300 hover:bg-bronze hover:text-ivory"
            >
              Explore Our Focus
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center border border-ivory/50 px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.16em] text-ivory transition-colors duration-300 hover:border-ivory"
            >
              Start a Conversation
            </Link>
          </div>
        </div>
      </section>

      {/* 2 — Who We Are */}
      <section className="bg-offwhite py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12 lg:gap-8 lg:px-10">
          <Reveal className="lg:col-span-5">
            <SectionLabel>Who We Are</SectionLabel>
            <h2 className="mt-5 font-serif-display text-3xl leading-tight text-ink sm:text-4xl">
              An independent platform for opportunity across the region
            </h2>
            <p className="mt-6 text-base leading-relaxed text-olive">
              Miller &amp; Partners Asia works with entrepreneurs, investors,
              developers and businesses across the region to identify
              opportunities, build partnerships and develop commercially
              viable projects.
            </p>
            <p className="mt-4 text-base leading-relaxed text-olive">
              Based in Thailand and operating across the wider Asian market,
              our work is supported by a network of independent specialists,
              professional advisers, investors and commercial partners.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.16em] text-ink underline decoration-bronze decoration-2 underline-offset-8 transition-opacity hover:opacity-70"
            >
              More About Us &rarr;
            </Link>
          </Reveal>
          <Reveal delayMs={100} className="lg:col-span-7">
            <div className="relative aspect-[16/11] w-full overflow-hidden bg-charcoal">
              <Image
                src="/images/bangkok-benjakiti.jpg"
                alt="Skyscrapers along Benjakiti Park, Bangkok"
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3 — Our Focus */}
      <section className="bg-ivory py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal className="max-w-2xl">
            <SectionLabel>What We Do</SectionLabel>
            <h2 className="mt-5 font-serif-display text-3xl leading-tight text-ink sm:text-4xl">
              Four areas. One commercial platform.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {focusAreas.map((area, i) => (
              <Reveal key={area.title} delayMs={i * 80}>
                <FocusCard {...area} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — Asia */}
      <section className="relative overflow-hidden bg-ink py-28 sm:py-36">
        <Image
          src="/images/suvarnabhumi-airport.jpg"
          alt="Terminal interior at Suvarnabhumi Airport, Bangkok, representing regional connectivity"
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-10">
          <Reveal>
            <SectionLabel>Asia</SectionLabel>
            <p className="mt-6 font-serif-display text-3xl leading-snug text-ivory sm:text-4xl lg:text-5xl">
              Asia is not simply where we operate. It is the focus of the
              business.
            </p>
            <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-stone">
              Our activities are currently centred primarily around Thailand
              and China, with relationships, projects and opportunities
              extending across the wider region.
            </p>
            <div className="mx-auto mt-12 grid max-w-xl gap-6 border-t border-line-dark pt-10 text-sm uppercase tracking-[0.14em] text-stone sm:grid-cols-3">
              <span>Capital with opportunity</span>
              <span>Ideas with execution</span>
              <span>People with the right partners</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5 — Our Approach */}
      <section className="bg-offwhite py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal className="max-w-2xl">
            <SectionLabel>Our Approach</SectionLabel>
            <h2 className="mt-5 font-serif-display text-3xl leading-tight text-ink sm:text-4xl">
              We are selective about the projects we become involved with.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-olive">
              Every engagement begins by understanding the commercial
              objective and identifying where we can genuinely add value.
              Where appropriate, we bring together the people, expertise and
              resources required to move an opportunity forward.
            </p>
          </Reveal>
          <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {approachPrinciples.map((principle, i) => (
              <Reveal key={principle.title} delayMs={i * 80}>
                <p className="font-serif-display text-sm text-bronze">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-serif-display text-xl text-ink">
                  {principle.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-olive">
                  {principle.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — Selected Interests */}
      <section className="border-y border-line bg-ivory py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal className="max-w-2xl">
            <SectionLabel>Selected Interests</SectionLabel>
            <h2 className="mt-5 font-serif-display text-3xl leading-tight text-ink sm:text-4xl">
              Where our attention is focused
            </h2>
          </Reveal>
          <Reveal delayMs={100}>
            <ul className="mt-14 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
              {selectedInterests.map((interest) => (
                <li
                  key={interest}
                  className="border-b border-line py-4 text-base text-ink"
                >
                  {interest}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* 7 — Selected Ventures */}
      <section className="bg-offwhite py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal className="max-w-2xl">
            <SectionLabel>Selected Ventures</SectionLabel>
            <h2 className="mt-5 font-serif-display text-3xl leading-tight text-ink sm:text-4xl">
              A growing portfolio of projects and partnerships
            </h2>
            <p className="mt-6 text-base leading-relaxed text-olive">
              This section will continue to evolve as new ventures,
              developments and mandates are added.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2">
            {ventures.map((venture, i) => (
              <Reveal key={venture.slug} delayMs={i * 80}>
                <VentureCard venture={venture} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8 — Insights */}
      <section className="bg-ivory py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <SectionLabel>Insights</SectionLabel>
              <h2 className="mt-5 font-serif-display text-3xl leading-tight text-ink sm:text-4xl">
                Commentary on Asia, Thailand and investment
              </h2>
            </div>
            <Link
              href="/insights"
              className="text-[12px] font-medium uppercase tracking-[0.16em] text-ink underline decoration-bronze decoration-2 underline-offset-8"
            >
              All Insights &rarr;
            </Link>
          </Reveal>
          <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {latestInsights.map((article, i) => (
              <Reveal key={article.slug} delayMs={i * 80}>
                <InsightCard article={article} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 9 — Founder */}
      <section className="bg-ink py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12 lg:gap-8 lg:px-10">
          <Reveal className="lg:col-span-4">
            {/* Placeholder for the founder portrait. Replace by adding an
                image to /public/images/founder.jpg and swapping this block
                for an <Image src="/images/founder.jpg" .../> — see README. */}
            <div className="flex aspect-[4/5] w-full flex-col items-center justify-center border border-line-dark bg-charcoal text-center">
              <span className="font-serif-display text-5xl text-ivory">LM</span>
              <span className="mt-4 text-[11px] uppercase tracking-[0.2em] text-stone">
                Founder portrait placeholder
              </span>
            </div>
          </Reveal>
          <Reveal delayMs={100} className="lg:col-span-8">
            <SectionLabel>Founder</SectionLabel>
            <h2 className="mt-5 font-serif-display text-3xl leading-tight text-ivory sm:text-4xl">
              Lewis Miller
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-stone">
              Lewis Miller is a British entrepreneur and business executive
              based in Thailand. After building his career in the United
              Kingdom, Lewis relocated to Asia and has since developed
              commercial interests across property, technology, investment
              and business development.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-stone">
              Miller &amp; Partners Asia brings these activities together
              through one independent platform, working alongside business
              owners, developers, investors, technology specialists,
              professional advisers and regional partners.
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

      {/* 10 — Contact */}
      <section className="bg-offwhite py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-12 lg:px-10">
          <Reveal className="lg:col-span-5">
            <SectionLabel>Start a Conversation</SectionLabel>
            <h2 className="mt-5 font-serif-display text-3xl leading-tight text-ink sm:text-4xl">
              Open to conversations where there is genuine opportunity
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-olive">
              Whether you are exploring an investment, entering an Asian
              market, developing a new business, seeking a strategic partner
              or considering a project in Thailand, we would like to hear
              from you.
            </p>
            <div className="mt-8 space-y-2 text-sm text-olive">
              <p>{siteConfig.location}</p>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="block text-ink underline decoration-bronze decoration-2 underline-offset-4"
              >
                {siteConfig.contactEmail}
              </a>
            </div>
          </Reveal>
          <Reveal delayMs={100} className="lg:col-span-7">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
