import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { Parallax } from "@/components/ui/scroll";
import { Logo } from "@/components/brand/logo";
import { anchors } from "@/lib/site-config";

/**
 * Chapter 04. Editorial spreads rather than a grid: one full bleed
 * product reveal, then asymmetric pairings of studio scenes and
 * environments, each labelled for what it is.
 */
export function Showcase() {
  return (
    <section id={anchors.showcase.slice(1)} className="surface-black relative">
      {/* Spread 1: full bleed reveal with the headline over it */}
      <div className="relative min-h-[100svh] overflow-hidden">
        <Parallax amount={0.08} className="absolute inset-0">
          <Image src="/images/scenes/scene-reveal.jpg" alt="Illustrative finished product concept: serum and retail box in a studio scene" fill sizes="100vw" className="object-cover" quality={76} />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40" />
        <div className="container-wide relative flex min-h-[100svh] flex-col justify-between py-[clamp(5rem,12vw,10rem)]">
          <Reveal>
            <p className="chapter text-white/60">04 &nbsp; The showcase</p>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <Reveal delayMs={80} className="md:col-span-8">
              <h2 className="giant text-[clamp(3rem,10vw,10.5rem)] text-white">
                Made to be
                <br />
                <span className="accent">your</span> brand.
              </h2>
            </Reveal>
            <Reveal delayMs={160} className="md:col-span-4 md:pb-4">
              <p className="lede text-white/80">
                Illustrative concepts beside the environments they come from. Client work is shared privately and with
                permission. Nothing here is presented as a completed project.
              </p>
            </Reveal>
          </div>
        </div>
        <span className="absolute bottom-5 right-[var(--gutter)] text-[0.5625rem] uppercase tracking-[0.22em] text-white/60">Illustrative concept</span>
      </div>

      {/* Spread 2: asymmetric pair, environment and scene */}
      <div className="container-wide py-[clamp(4rem,10vw,9rem)]">
        <div className="grid gap-5 md:grid-cols-12 md:gap-6">
          <Reveal variant="mask" className="relative aspect-[4/5] md:col-span-5 md:mt-24">
            <div className="relative h-full w-full">
              <Image src="/images/shanghai-tower.jpg" alt="The Shanghai Tower rising into cloud" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" quality={72} />
              <span className="absolute bottom-4 left-4 text-[0.5625rem] uppercase tracking-[0.22em] text-white/70">Shanghai &middot; Environment</span>
            </div>
          </Reveal>
          <Reveal variant="mask" delayMs={120} className="relative aspect-[4/5] md:col-span-7">
            <div className="relative h-full w-full">
              <Image src="/images/scenes/scene-macro.jpg" alt="Illustrative serum concept, close up studio scene" fill sizes="(min-width: 768px) 58vw, 100vw" className="object-cover object-[82%_50%]" quality={78} />
              <span className="absolute bottom-4 left-4 text-[0.5625rem] uppercase tracking-[0.22em] text-white/60">Serum, detail &middot; Illustrative concept</span>
            </div>
          </Reveal>
        </div>

        {/* Spread 3: statement and two scenes */}
        <div className="mt-5 grid gap-5 md:mt-6 md:grid-cols-12 md:gap-6">
          <Reveal className="flex flex-col justify-between bg-seal p-7 md:col-span-4 md:p-9">
            <Logo tone="light" className="w-full max-w-[14rem]" />
            <p className="display-sm mt-16 text-[clamp(1.5rem,2.4vw,2.25rem)] text-white md:mt-24">
              Your packaging, your formula, your name on the box.
            </p>
          </Reveal>
          <Reveal variant="mask" delayMs={100} className="relative aspect-[4/5] md:col-span-4">
            <div className="relative h-full w-full">
              <Image src="/images/scenes/scene-supplements.jpg" alt="Illustrative supplement concept, studio scene" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" quality={76} />
              <span className="absolute bottom-4 left-4 text-[0.5625rem] uppercase tracking-[0.22em] text-white/60">Supplements &middot; Illustrative concept</span>
            </div>
          </Reveal>
          <Reveal variant="mask" delayMs={200} className="relative aspect-[4/5] md:col-span-4">
            <div className="relative h-full w-full">
              <Image src="/images/scenes/scene-balm.jpg" alt="Illustrative balm concept, studio scene" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" quality={76} />
              <span className="absolute bottom-4 left-4 text-[0.5625rem] uppercase tracking-[0.22em] text-white/60">Balm &middot; Illustrative concept</span>
            </div>
          </Reveal>
        </div>

        {/* Spread 4: wide environment with caption */}
        <Reveal variant="mask" className="relative mt-5 aspect-[4/5] sm:aspect-[16/9] md:mt-6 lg:aspect-[21/9]">
          <div className="relative h-full w-full">
            <Image src="/images/production-line.jpg" alt="An automated production line, illustrative stock photography" fill sizes="100vw" className="object-cover" quality={72} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-3 md:bottom-10 md:left-10 md:flex-row md:items-end md:justify-between">
              <p className="display-sm max-w-[30rem] text-[clamp(1.25rem,2.2vw,2rem)] text-white">
                The machinery is real. The products we help you make are made on lines like these.
              </p>
              <span className="text-[0.5625rem] uppercase tracking-[0.22em] text-white/60">Environment &middot; Illustrative stock</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
