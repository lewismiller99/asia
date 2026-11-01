import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import {
  AmpouleSet,
  CreamJar,
  GuaSha,
  PumpBottle,
  RetailBox,
  SerumDropper,
  StandUpPouch,
  SupplementJar,
} from "@/components/products/renders";
import { anchors } from "@/lib/site-config";

type Tile = {
  index: string;
  title: string;
  text: string;
  surface: "black" | "bone" | "sand" | "charcoal";
  span: string;
  aspect: string;
  art: React.ReactNode;
  artClass?: string;
};

const tiles: Tile[] = [
  {
    index: "01",
    title: "Skincare and Cosmetics",
    text: "Serums, creams, cleansers and colour cosmetics, formulated and filled through our manufacturing partners.",
    surface: "black",
    span: "md:col-span-7",
    aspect: "aspect-[4/5] md:aspect-[5/4]",
    art: (
      <div className="flex h-full items-end justify-center gap-[4%] px-[10%] md:justify-end md:pr-[8%]">
        <CreamJar className="h-[62%] md:h-[72%]" />
        <SerumDropper className="h-[88%] md:h-full" />
      </div>
    ),
  },
  {
    index: "02",
    title: "Haircare and Serums",
    text: "Shampoo, conditioner, treatments and hair and scalp serums in packaging that belongs on a salon shelf.",
    surface: "bone",
    span: "md:col-span-5",
    aspect: "aspect-[4/5]",
    art: <PumpBottle className="mx-auto h-full" />,
  },
  {
    index: "03",
    title: "Supplements",
    text: "Capsules, tablets and powders in retail ready jars, bottles and sachets.",
    surface: "charcoal",
    span: "md:col-span-4",
    aspect: "aspect-[4/5]",
    art: <SupplementJar className="mx-auto h-full" />,
  },
  {
    index: "04",
    title: "Weight Management Products",
    text: "Meal replacement powders, teas and supplements developed to your specification.",
    surface: "sand",
    span: "md:col-span-4",
    aspect: "aspect-[4/5]",
    art: <StandUpPouch className="mx-auto h-full" />,
  },
  {
    index: "05",
    title: "Beauty and Wellness Accessories",
    text: "Tools, applicators and accessories that complete a range.",
    surface: "black",
    span: "md:col-span-4",
    aspect: "aspect-[4/5]",
    art: <GuaSha className="mx-auto h-full" />,
  },
  {
    index: "06",
    title: "Custom Product Manufacturing",
    text: "Something that is not on this list? If it suits our partners' capabilities, we will tell you honestly whether it can be made.",
    surface: "bone",
    span: "md:col-span-12",
    aspect: "aspect-[4/5] sm:aspect-[16/9] md:aspect-[21/8]",
    art: (
      <div className="flex h-full items-end justify-center gap-[4%] px-[8%] md:justify-end md:pr-[6%]">
        <AmpouleSet className="h-[70%] md:h-[88%]" />
        <RetailBox className="h-[76%] md:h-full" />
      </div>
    ),
  },
];

const surfaces: Record<Tile["surface"], string> = {
  black: "bg-[radial-gradient(120%_90%_at_50%_0%,#2a2a2a_0%,#202020_70%)] text-white",
  charcoal: "bg-[linear-gradient(180deg,#242424_0%,#111111_100%)] text-white",
  bone: "bg-[linear-gradient(180deg,#fafafa_0%,#e3e3e3_100%)] text-ink",
  sand: "bg-[linear-gradient(180deg,#ebebeb_0%,#d2d2d2_100%)] text-ink",
};

/**
 * Section 2: what the visitor could create. An asymmetric editorial grid of
 * illustrative product concepts, numbered like a portfolio.
 */
export function Possibilities() {
  return (
    <section id={anchors.create.slice(1)} className="surface-bone section-pad relative">
      <div className="container-wide">
        <SectionHeading
          tone="light"
          eyebrow="The possibilities"
          title={
            <>
              What will <span className="accent">you</span> create?
            </>
          }
          lede="Six categories we develop most often with our partners in China. Every concept shown here is illustrative. Your product, your packaging, your name on it."
          align="split"
        />

        <ul className="mt-16 grid grid-cols-1 gap-4 md:mt-24 md:grid-cols-12 md:gap-5">
          {tiles.map((tile, i) => (
            <Reveal key={tile.index} as="li" className={`${tile.span} group relative`} delayMs={(i % 3) * 90}>
              <article className={`relative flex ${tile.aspect} w-full flex-col overflow-hidden ${surfaces[tile.surface]}`}>
                <div
                  className={`absolute inset-x-0 top-[13%] transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.03] ${
                    tile.index === "06" ? "bottom-[30%] sm:bottom-[8%] md:top-[10%]" : "bottom-[27%]"
                  }`}
                >
                  {tile.art}
                </div>
                <div className="relative flex items-start justify-between p-5 md:p-7">
                  <span className="numeral text-[2.75rem] opacity-80 md:text-[3.5rem]">{tile.index}</span>
                  <span className="eyebrow eyebrow-plain pt-2 opacity-50">Concept</span>
                </div>
                <div className="relative mt-auto p-5 md:p-7">
                  <h3 className="display-sm text-[1.4rem] md:text-[1.75rem]">{tile.title}</h3>
                  <p className="mt-3 max-w-[28rem] text-[0.9375rem] leading-relaxed opacity-70">{tile.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-10 flex flex-col gap-4 border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
          <p className="max-w-[40rem] text-sm text-ash">
            Regulated pharmaceutical manufacturing projects may be considered for appropriately licensed businesses,
            subject to product approvals and regulatory requirements in each market.
          </p>
          <a href={anchors.enquire} className="link-rule self-start text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-ink">
            Start with your idea
          </a>
        </Reveal>
      </div>
    </section>
  );
}
