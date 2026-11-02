import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { Parallax } from "@/components/ui/scroll";
import { Seal } from "@/components/brand/logo";
import { PlayIcon } from "@/components/ui/icons";
import { anchors, siteConfig } from "@/lib/site-config";

/**
 * Chapter 03. The founder, full height, on the light set. The route line
 * borrows the long t of the mark: a line from where the business is based
 * to where the products are made, finished by the seal.
 */
export function Founder() {
  const video = siteConfig.founder.video;
  return (
    <section id={anchors.founder.slice(1)} className="surface-bone relative overflow-hidden">
      <div className="grid lg:grid-cols-12">
        {/* Portrait */}
        <Reveal variant="mask" className="relative aspect-[4/5] lg:col-span-5 lg:aspect-auto lg:min-h-[100vh]">
          <Parallax amount={0.06} className="h-full w-full">
            <div className="relative h-full w-full bg-sand">
              <Image
                src={siteConfig.founder.portrait}
                alt={`${siteConfig.founder.name}, ${siteConfig.founder.role} of ${siteConfig.name}`}
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover object-top"
                quality={80}
              />
            </div>
          </Parallax>
          <div className="absolute bottom-6 left-6 flex items-center gap-3 bg-black/80 px-3 py-2 text-[0.625rem] uppercase tracking-[0.25em] text-white">
            <Seal size={14} />
            {siteConfig.founder.name}, {siteConfig.founder.role}
          </div>
        </Reveal>

        {/* Copy */}
        <div className="flex flex-col justify-center px-[var(--gutter)] py-[clamp(4rem,10vw,9rem)] lg:col-span-7 lg:pl-[clamp(2rem,6vw,6rem)]">
          <Reveal>
            <p className="chapter text-ink/70">03 &nbsp; Meet the founder</p>
          </Reveal>
          <Reveal delayMs={80}>
            <h2 className="giant mt-8 text-[clamp(2.75rem,6vw,6.5rem)] text-ink">
              Your man on the
              <br />
              ground in Asia<span className="accent">.</span>
            </h2>
          </Reveal>
          <Reveal delayMs={160}>
            <p className="statement mt-10 max-w-[30ch] text-[clamp(1.25rem,2vw,1.75rem)] text-ink/85">
              &ldquo;I&rsquo;m a British entrepreneur based in Asia, working directly with manufacturers in China. I help
              businesses explore their manufacturing options, develop products and bring their brand ideas to life.&rdquo;
            </p>
          </Reveal>

          {/* Route line: based in Asia, made in China. */}
          <Reveal delayMs={240} className="mt-12">
            <svg viewBox="0 0 640 90" className="w-full max-w-[40rem]" role="img" aria-label="Based in Asia, manufacturing partners in China">
              <circle cx="8" cy="46" r="5" fill="#202020" />
              <line x1="8" y1="46" x2="560" y2="46" stroke="#202020" strokeWidth="6" className="reveal-line" style={{ transformBox: "fill-box", transformOrigin: "left center" }} />
              <circle cx="300" cy="46" r="5" fill="#202020" />
              <text x="0" y="22" fontFamily="var(--font-sans)" fontSize="11" letterSpacing="2.2" fill="#737373">BASED IN ASIA</text>
              <text x="300" y="22" fontFamily="var(--font-sans)" fontSize="11" letterSpacing="2.2" fill="#737373" textAnchor="middle">
                REGULARLY IN CHINA
              </text>
              <text x="600" y="22" fontFamily="var(--font-sans)" fontSize="11" letterSpacing="2.2" fill="#737373" textAnchor="end">
                AT SOURCE
              </text>
            </svg>
            <div className="-mt-[3.1rem] flex justify-end pr-1">
              <Seal size={38} />
            </div>
          </Reveal>
        </div>
      </div>

      {/* Founder film slot */}
      <div className="container-wide pb-[clamp(4rem,10vw,9rem)]">
        <Reveal variant="mask" className="relative aspect-[4/5] w-full sm:aspect-[16/9] lg:aspect-[21/9]">
          <div className="relative h-full w-full overflow-hidden bg-black">
            {video ? (
              <video className="h-full w-full object-cover" src={video} controls playsInline preload="metadata" poster="/images/harbour-night.jpg">
                Your browser does not support video playback.
              </video>
            ) : (
              <>
                <Image src="/images/harbour-night.jpg" alt="A harbour city at night, illustrative" fill sizes="100vw" className="object-cover opacity-75" quality={70} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-10">
                  <div className="flex items-center justify-between">
                    <span className="chapter text-white/80">Founder film</span>
                    <span className="text-[0.625rem] uppercase tracking-[0.22em] text-white/70">In production</span>
                  </div>
                  <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <p className="display-sm max-w-[34rem] text-[clamp(1.25rem,2.2vw,2rem)] text-white">
                      Factory visits, supplier meetings and product development, filmed in China and published here and
                      on our channels.
                    </p>
                    <span className="inline-flex h-16 w-16 shrink-0 items-center justify-center border border-white/40 text-white">
                      <PlayIcon size={20} />
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
