import { HorizontalGallery } from "@/components/ui/scroll";
import { Reveal } from "@/components/ui/reveal";
import Image from "next/image";
import type { SceneKey } from "@/components/products/scenes";
import { anchors } from "@/lib/site-config";

type Slide = { n: string; scene: SceneKey; title: string; text: string };

const slides: Slide[] = [
  { n: "01", scene: "skincare", title: "Skincare and Cosmetics", text: "Serums, creams, cleansers and colour cosmetics, formulated and filled through our partners." },
  { n: "02", scene: "haircare", title: "Haircare and Serums", text: "Shampoo, conditioner, treatments and scalp serums in packaging that belongs on a salon shelf." },
  { n: "03", scene: "supplements", title: "Supplements", text: "Capsules, tablets and powders in retail ready jars, bottles and sachets." },
  { n: "04", scene: "weight", title: "Weight Management Products", text: "Meal replacement powders, teas and supplements developed to your specification." },
  { n: "05", scene: "accessories", title: "Beauty and Wellness Accessories", text: "Tools, applicators and accessories that complete a range." },
  { n: "06", scene: "custom", title: "Custom Product Manufacturing", text: "Not on this list? If it suits our partners' capabilities we will tell you honestly whether it can be made." },
];

/**
 * Chapter 01. A pinned, horizontal gallery of six studio scenes. The
 * category names run large across the frame edge; the scenes are
 * illustrative concepts and say so.
 */
export function Possibilities() {
  return (
    <section id={anchors.create.slice(1)} className="surface-paper relative">
      <div className="container-wide pt-[clamp(5rem,12vw,10rem)]">
        <Reveal>
          <p className="chapter text-ink/70">01 &nbsp; The possibilities</p>
        </Reveal>
        <div className="mt-8 grid gap-8 md:grid-cols-12 md:items-end">
          <Reveal delayMs={80} className="md:col-span-8">
            <h2 className="giant text-[clamp(3rem,10vw,10.5rem)] text-ink">
              What will
              <br />
              <span className="accent">you</span> create?
            </h2>
          </Reveal>
          <Reveal delayMs={160} className="md:col-span-4 md:pb-4">
            <p className="lede text-ash">
              Six categories we develop most often with our partners in China. Your product, your packaging, your name
              on it.
            </p>
            <p className="mt-4 text-[0.6875rem] uppercase tracking-[0.22em] text-ash">Scroll to browse. All concepts illustrative.</p>
          </Reveal>
        </div>
      </div>

      <HorizontalGallery count={slides.length} className="mt-12 md:mt-16">
        <div className="hidden w-[var(--gutter)] shrink-0 lg:block" />
        {slides.map((slide, i) => {
          return (
            <article
              key={slide.n}
              className="relative flex h-full w-[86vw] shrink-0 snap-start flex-col justify-end px-[var(--gutter)] sm:w-[62vw] lg:w-[46vw] lg:px-6 lg:pb-16 lg:pt-6"
            >
              <div className="group relative aspect-[4/5] w-full overflow-hidden bg-sand lg:h-[calc(100vh-14rem)] lg:w-auto">
                <Image
                  src={`/images/scenes/scene-${slide.scene}-light.jpg`}
                  alt={`Illustrative ${slide.title.toLowerCase()} concept, studio scene`}
                  fill
                  sizes="(min-width: 1024px) 46vw, 86vw"
                  className="object-cover transition-transform duration-[1600ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
                  quality={80}
                  loading={i < 2 ? "eager" : "lazy"}
                />
                <span className="numeral absolute left-5 top-5 text-[2.5rem] text-ink/70 md:text-[3.25rem]">{slide.n}</span>
                <span className="absolute right-5 top-6 text-[0.5625rem] uppercase tracking-[0.22em] text-ink/50">Illustrative concept</span>
              </div>
              <div className="relative -mt-10 pr-4 lg:-mt-16">
                <h3 className="display text-[clamp(1.9rem,4.2vw,4.25rem)] text-ink">{slide.title}</h3>
                <p className="mt-4 max-w-[26rem] text-[0.9375rem] leading-relaxed text-ash">{slide.text}</p>
              </div>
            </article>
          );
        })}
        <div className="flex h-full w-[70vw] shrink-0 snap-start items-end px-[var(--gutter)] pb-10 lg:w-[34vw] lg:pb-24">
          <div>
            <p className="display-sm text-[clamp(1.5rem,2.6vw,2.5rem)] text-ink">Something else in mind?</p>
            <p className="mt-4 max-w-[22rem] text-ash">
              Regulated pharmaceutical projects are considered only for appropriately licensed businesses, subject to the
              approvals each market requires.
            </p>
            <a href={anchors.enquire} className="btn btn-black mt-8">
              Start with your idea
            </a>
          </div>
        </div>
      </HorizontalGallery>
    </section>
  );
}
