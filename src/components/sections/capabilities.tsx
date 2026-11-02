"use client";

import Image from "next/image";
import { StepScene } from "@/components/ui/scroll";
import { Reveal } from "@/components/ui/reveal";
import { anchors } from "@/lib/site-config";

const stages = [
  {
    n: "01",
    title: "Your idea",
    text: "Tell us what you want to make, who it is for and where it will sell. We shape it into a brief a manufacturer can price.",
    image: "/images/shanghai.jpg",
    alt: "Shanghai's Pudong skyline across the river",
  },
  {
    n: "02",
    title: "Product development",
    text: "Formulation options, sampling and revisions with our partners until the product is right in your hands.",
    image: "/images/production-line.jpg",
    alt: "A production line in a manufacturing facility, illustrative",
  },
  {
    n: "03",
    title: "Manufacturing and packaging",
    text: "Production coordinated with the factory while packaging, branding and artwork are developed alongside.",
    image: "/images/harbour-night.jpg",
    alt: "A harbour and port lit at night, illustrative",
  },
  {
    n: "04",
    title: "Production and delivery",
    text: "Quality control coordinated at source, then international shipping arranged to your market.",
    image: "/images/scenes/scene-reveal.jpg",
    alt: "Illustrative finished product concept: serum and retail box in a studio scene",
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
 * Chapter 02. A pinned scene: the stage number, title and copy change as
 * the visitor scrolls, while the backdrop crossfades from China to the
 * finished product.
 */
export function Capabilities() {
  return (
    <section id={anchors.process.slice(1)} className="surface-black relative">
      <div className="container-wide pt-[clamp(5rem,12vw,10rem)]">
        <Reveal>
          <p className="chapter text-white/55">02 &nbsp; The process</p>
        </Reveal>
        <Reveal delayMs={80}>
          <h2 className="giant mt-8 text-[clamp(3rem,10vw,10.5rem)] text-white">
            From concept
            <br />
            to production<span className="accent">.</span>
          </h2>
        </Reveal>
      </div>

      <StepScene
        steps={stages.length}
        className="mt-10 md:mt-16"
        renderVisual={(active) => (
          <div className="relative h-full w-full bg-black">
            {stages.map((stage, i) => (
              <div
                key={stage.n}
                className="absolute inset-0 transition-opacity duration-[1200ms] ease-[var(--ease-out-expo)]"
                style={{ opacity: active === i ? 1 : 0 }}
                aria-hidden={active !== i}
              >
                <Image src={stage.image} alt={stage.alt} fill sizes="100vw" className="object-cover" quality={72} loading={i === 0 ? "eager" : "lazy"} />
              </div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-black/10" />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-transparent" />
          </div>
        )}
        renderCopy={(active) => (
          <div className="container-wide flex h-full flex-col justify-end pb-12 md:pb-20">
            <div className="grid gap-8 md:grid-cols-12 md:items-end">
              <div className="md:col-span-7">
                <div className="relative h-[clamp(5rem,14vw,12rem)]">
                  {stages.map((stage, i) => (
                    <span
                      key={stage.n}
                      className="numeral absolute left-0 top-0 text-[clamp(5rem,14vw,12rem)] text-white transition-all duration-700 ease-[var(--ease-out-expo)]"
                      style={{ opacity: active === i ? 1 : 0, transform: active === i ? "none" : "translateY(0.2em)" }}
                      aria-hidden={active !== i}
                    >
                      {stage.n}
                    </span>
                  ))}
                </div>
                <div className="relative mt-4 min-h-[9rem]">
                  {stages.map((stage, i) => (
                    <div
                      key={stage.n}
                      className="absolute left-0 top-0 transition-all duration-700 ease-[var(--ease-out-expo)]"
                      style={{ opacity: active === i ? 1 : 0, transform: active === i ? "none" : "translateY(16px)" }}
                      aria-hidden={active !== i}
                    >
                      <h3 className="display text-[clamp(1.9rem,4.5vw,4rem)] text-white">{stage.title}</h3>
                      <p className="mt-4 max-w-[30rem] text-[1rem] leading-relaxed text-white/80 md:text-[1.125rem]">{stage.text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <ol className="hidden gap-3 md:col-span-4 md:col-start-9 md:grid">
                {stages.map((stage, i) => (
                  <li key={stage.n} className="flex items-center gap-4 text-[0.6875rem] uppercase tracking-[0.22em]">
                    <span className={`h-px transition-all duration-500 ${active === i ? "w-10 bg-seal" : "w-5 bg-white/30"}`} />
                    <span className={active === i ? "text-white" : "text-white/55"}>{stage.title}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
      />

      <div className="container-wide pb-[clamp(5rem,12vw,10rem)] pt-16 md:pt-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="chapter text-white/55">What we coordinate</p>
            <p className="mt-6 max-w-[22rem] text-mist">
              One point of contact between your idea and the factory floor, so you are never dealing with an anonymous
              directory.
            </p>
          </Reveal>
          <Reveal variant="stagger" className="grid gap-x-10 lg:col-span-8 sm:grid-cols-2">
            {services.map((service, i) => (
              <div key={service} className="flex items-baseline gap-5 border-b border-white/10 py-4 text-[1rem] text-white/90">
                <span className="numeral w-7 shrink-0 text-[0.9rem] text-white/60">{String(i + 1).padStart(2, "0")}</span>
                {service}
              </div>
            ))}
          </Reveal>
        </div>
        <Reveal className="mt-12 max-w-[40rem] text-sm leading-relaxed text-smoke">
          Our focus is cosmetic, personal care and wellness products. We make no certification or approval claims on
          behalf of partner facilities, and a factory&apos;s ability to manufacture a product does not by itself make that
          product legal to sell in any market.
        </Reveal>
      </div>
    </section>
  );
}
