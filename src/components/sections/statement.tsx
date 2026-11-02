import { WordReveal } from "@/components/ui/scroll";
import { Reveal } from "@/components/ui/reveal";
import { Seal } from "@/components/brand/logo";

/**
 * The thesis. One sentence, read slowly as it scrolls through the viewport,
 * then the three things the business is built on.
 */
export function Statement() {
  return (
    <section className="surface-black relative overflow-hidden">
      <div className="container-wide py-[clamp(6rem,16vw,14rem)]">
        <Reveal>
          <p className="chapter text-white/55">The difference</p>
        </Reveal>
        <WordReveal
          className="statement mt-10 max-w-[18ch] text-[clamp(2.1rem,6vw,6.25rem)] text-white"
          text="Most brands are sourced from a directory. Yours is built in the room, with the manufacturer, by someone who is actually there."
        />
        <div className="mt-16 grid gap-px bg-white/10 md:mt-24 md:grid-cols-3">
          {[
            ["British led", "A British entrepreneur, personally accountable for every project."],
            ["Based in Asia", "On the ground, in the same time zone as the factories, not a call centre."],
            ["Connected at source", "Direct relationships with manufacturers, including a GMP certified facility partner."],
          ].map(([title, text], i) => (
            <Reveal key={title} delayMs={i * 90} className="bg-black p-7 md:p-10">
              <div className="flex items-center gap-3">
                <Seal size={14} />
                <p className="display-sm text-[1.25rem] text-white">{title}</p>
              </div>
              <p className="mt-4 max-w-[22rem] text-[0.9375rem] leading-relaxed text-mist">{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
