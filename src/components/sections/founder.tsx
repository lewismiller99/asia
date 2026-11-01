import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Seal } from "@/components/brand/logo";
import { PlayIcon } from "@/components/ui/icons";
import { anchors, siteConfig } from "@/lib/site-config";

const facts = [
  { label: "Who", value: "A British entrepreneur" },
  { label: "Where", value: "Based in Asia, regularly in China" },
  { label: "How", value: "Direct relationships with manufacturers" },
];

/**
 * Section 4: the founder. Real portrait only. The founder film slot renders
 * the configured video when one is supplied, otherwise an honest, editable
 * placeholder frame that explains what will appear there.
 */
export function Founder() {
  const video = siteConfig.founder.video;
  return (
    <section id={anchors.founder.slice(1)} className="surface-bone section-pad relative">
      <div className="container-wide">
        <SectionHeading
          tone="light"
          eyebrow="Meet the founder"
          title={
            <>
              Your man on the
              <br />
              ground in Asia.
            </>
          }
        />

        <div className="mt-16 grid gap-10 md:mt-24 lg:grid-cols-12 lg:gap-8">
          <Reveal variant="mask" className="relative aspect-[4/5] lg:col-span-5">
            <div className="relative h-full w-full bg-sand">
              <Image
                src={siteConfig.founder.portrait}
                alt={`${siteConfig.founder.name}, ${siteConfig.founder.role} of ${siteConfig.name}`}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-top"
                quality={78}
              />
            </div>
          </Reveal>

          <div className="flex flex-col justify-between lg:col-span-6 lg:col-start-7">
            <div>
              <Reveal>
                <p className="display-sm text-[clamp(1.5rem,2.6vw,2.25rem)] text-ink">
                  &ldquo;I&rsquo;m a British entrepreneur based in Asia, working directly with manufacturers in China. I help
                  businesses explore their manufacturing options, develop products and bring their brand ideas to
                  life.&rdquo;
                </p>
              </Reveal>
              <Reveal delayMs={120} className="mt-8 flex items-center gap-4">
                <Seal size={18} />
                <p className="text-sm">
                  <span className="font-semibold text-ink">{siteConfig.founder.name}</span>
                  <span className="text-ash">, {siteConfig.founder.role}</span>
                </p>
              </Reveal>
            </div>

            <Reveal variant="stagger" className="mt-12 grid gap-0 border-t border-line sm:grid-cols-3">
              {facts.map((fact) => (
                <div key={fact.label} className="border-b border-line py-5 sm:border-b-0 sm:border-r sm:pr-5 sm:last:border-r-0">
                  <p className="eyebrow eyebrow-plain text-ash">{fact.label}</p>
                  <p className="mt-3 text-[0.9375rem] font-medium text-ink">{fact.value}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>

        {/* Founder film */}
        <Reveal variant="mask" className="relative mt-6 aspect-[4/5] w-full sm:aspect-[16/9] lg:mt-8 lg:aspect-[21/9]">
          <div className="relative h-full w-full overflow-hidden bg-black">
            {video ? (
              <video className="h-full w-full object-cover" src={video} controls playsInline preload="metadata" poster="/images/harbour-night.jpg">
                Your browser does not support video playback.
              </video>
            ) : (
              <>
                <Image
                  src="/images/harbour-night.jpg"
                  alt="A harbour city at night, illustrative"
                  fill
                  sizes="100vw"
                  className="object-cover opacity-70"
                  quality={70}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-10">
                  <div className="flex items-center justify-between">
                    <span className="eyebrow eyebrow-plain text-white/70">Founder film</span>
                    <span className="eyebrow eyebrow-plain text-white/70">In production</span>
                  </div>
                  <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <p className="max-w-[30rem] text-white/85">
                      Footage from China, factory visits, supplier meetings and product development will be published here
                      and across our social channels.
                    </p>
                    <span className="inline-flex h-16 w-16 shrink-0 items-center justify-center border border-white/30 text-white">
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
