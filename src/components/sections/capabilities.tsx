import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Seal } from "@/components/brand/logo";
import { anchors } from "@/lib/site-config";

const stages = [
  {
    index: "01",
    title: "Your Idea",
    text: "Tell us what you want to make, who it is for and where it will sell. We shape it into a brief a manufacturer can price.",
  },
  {
    index: "02",
    title: "Product Development",
    text: "Formulation options, sampling and revisions with our partners until the product is right in your hands.",
  },
  {
    index: "03",
    title: "Manufacturing and Packaging",
    text: "Production coordinated with the factory while packaging, branding and artwork are developed alongside.",
  },
  {
    index: "04",
    title: "Production and Delivery",
    text: "Quality control coordinated at source, then international shipping arranged to your market.",
  },
];

const services = [
  "OEM manufacturing",
  "Private label products",
  "White label manufacturing",
  "Custom product formulation",
  "Manufacturer sourcing and coordination",
  "Packaging development",
  "Product branding",
  "Sample development",
  "Manufacturing management",
  "Quality control coordination",
  "International logistics and shipping",
];

/**
 * Section 3: China returns to the narrative. A full bleed production
 * image, the four stage process with oversized numerals, and the plain
 * list of what we coordinate.
 */
export function Capabilities() {
  return (
    <section id={anchors.process.slice(1)} className="surface-black relative">
      {/* Full bleed production image, unmasked on scroll. */}
      <Reveal variant="mask" className="relative aspect-[4/5] w-full sm:aspect-[16/9] lg:aspect-[21/9]">
        <div className="relative h-full w-full">
          <Image
            src="/images/production-line.jpg"
            alt="An automated production line inside a manufacturing facility, shown as illustrative stock photography"
            fill
            sizes="100vw"
            className="object-cover sm:hidden"
            quality={72}
          />
          <Image
            src="/images/production-line.jpg"
            alt=""
            fill
            sizes="100vw"
            className="hidden object-cover sm:block"
            quality={72}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/30" />
          <div className="container-wide absolute inset-x-0 bottom-0 pb-8 md:pb-12">
            <p className="eyebrow text-white/70">Manufacturing capabilities</p>
          </div>
        </div>
      </Reveal>

      <div className="container-wide section-pad !pt-12 md:!pt-20">
        <SectionHeading
          eyebrow="The process"
          title={
            <>
              From concept
              <br />
              to production.
            </>
          }
          lede="One point of contact between your idea and the factory floor. We coordinate the stages below so you are never dealing with an anonymous directory."
          align="split"
        />

        <div className="mt-16 grid gap-12 md:mt-24 lg:grid-cols-12 lg:gap-8">
          {/* Portrait image, sticky on wide screens. */}
          <Reveal variant="mask" className="relative aspect-[4/5] lg:col-span-5 lg:self-start lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
            <div className="relative h-full w-full">
              <Image
                src="/images/shanghai-tower.jpg"
                alt="The Shanghai Tower rising into cloud, photographed from below"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
                quality={72}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-6 left-6 flex items-center gap-3 text-white/70">
                <Seal size={14} />
                <span className="text-[0.625rem] uppercase tracking-[0.25em]">Shanghai</span>
              </div>
            </div>
          </Reveal>

          <ol className="lg:col-span-7">
            {stages.map((stage, i) => (
              <Reveal as="li" key={stage.index} delayMs={i * 60} className="grid grid-cols-[4.5rem_1fr] gap-6 border-t border-white/15 py-8 md:grid-cols-[8rem_1fr] md:py-12">
                <span className="numeral text-[3.25rem] text-white/90 md:text-[5.5rem]">{stage.index}</span>
                <div className="pt-1 md:pt-3">
                  <h3 className="display-sm text-[1.5rem] md:text-[2.1rem]">{stage.title}</h3>
                  <p className="mt-4 max-w-[30rem] text-[1rem] leading-relaxed text-mist md:text-[1.0625rem]">{stage.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal className="border-t border-white/15 pt-10 md:pt-14">
              <p className="eyebrow text-mist">What we coordinate</p>
              <ul className="mt-7 grid gap-x-10 gap-y-3 sm:grid-cols-2">
                {services.map((service, i) => (
                  <li key={service} className="flex items-baseline gap-4 border-b border-white/10 pb-3 text-[0.9375rem] text-white/85">
                    <span className="numeral w-6 shrink-0 text-[0.9rem] text-white/40">{String(i + 1).padStart(2, "0")}</span>
                    {service}
                  </li>
                ))}
              </ul>
              <p className="mt-8 max-w-[34rem] text-sm leading-relaxed text-smoke">
                Our focus is cosmetic, personal care and wellness products. We do not make certification or approval
                claims on behalf of partner facilities, and a factory&apos;s ability to manufacture a product does not
                by itself make that product legal to sell in any market.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
