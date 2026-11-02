import { Logo } from "@/components/brand/logo";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Clocks } from "@/components/ui/scroll";
import { anchors, siteConfig, whatsappUrl } from "@/lib/site-config";
import { HeroMedia } from "./hero-media";

const delay = (ms: number) => ({ "--delay": `${ms}ms` } as React.CSSProperties);

const chapters = [
  { n: "01", label: "Create", href: anchors.create },
  { n: "02", label: "Process", href: anchors.process },
  { n: "03", label: "Founder", href: anchors.founder },
  { n: "04", label: "Showcase", href: anchors.showcase },
  { n: "05", label: "Enquire", href: anchors.enquire },
];

export function Hero() {
  const wa = whatsappUrl();
  return (
    <section id="top" className="surface-black relative flex min-h-[100svh] flex-col overflow-hidden">
      <HeroMedia
        desktopSrc="/video/hero-desktop.mp4"
        mobileSrc="/video/hero-mobile.mp4"
        posterDesktop="/video/hero-poster.jpg"
        posterMobile="/video/hero-poster-mobile.jpg"
      />

      <div className="container-wide relative z-10 flex flex-1 flex-col pb-7 pt-[calc(var(--header-h)+1rem)] md:pb-10 md:pt-[calc(var(--header-h)+2rem)]">
        <div className="flex items-start justify-between">
          <div className="hero-rise" style={delay(150)}>
            <Logo tone="light" animate className="w-[min(56vw,11rem)] md:w-[min(26vw,17rem)]" />
          </div>
          {/* Chapter index: the page as a film with five scenes. */}
          <ol className="hero-fade hidden gap-2 md:grid" style={delay(1200)}>
            {chapters.map((c) => (
              <li key={c.n}>
                <a href={c.href} className="group flex items-baseline gap-4 text-[0.6875rem] uppercase tracking-[0.24em] text-white/55 transition-colors hover:text-white">
                  <span className="numeral text-[0.8rem] text-white/40 transition-colors group-hover:text-seal">{c.n}</span>
                  {c.label}
                </a>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-auto grid gap-8 pt-12 md:grid-cols-12 md:items-end md:gap-6">
          <div className="md:col-span-9">
            <h1 className="hero-title text-[clamp(3.4rem,12.5vw,13rem)] text-white">
              <span className="hero-rise block" style={delay(120)}>
                Your brand.
              </span>
              <span className="hero-rise block" style={delay(240)}>
                Built at source<span className="text-seal">.</span>
              </span>
            </h1>

            <div className="mt-7 grid gap-6 md:mt-10 md:grid-cols-12 md:items-end">
              <p className="hero-rise max-w-[30rem] text-[1rem] leading-relaxed text-white/80 md:col-span-6 md:text-[1.1875rem] md:leading-snug" style={delay(400)}>
                From your first product idea to manufacturing and packaging, we help businesses create their own brands
                through our manufacturing partners in China.
              </p>
              <div className="hero-rise flex flex-wrap items-center gap-3 md:col-span-6 md:justify-end" style={delay(520)}>
                <a href={anchors.enquire} className="btn btn-seal w-full sm:w-auto">
                  Build your brand today
                </a>
                {wa ? (
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light w-full sm:w-auto">
                    <WhatsAppIcon size={16} />
                    WhatsApp
                  </a>
                ) : null}
              </div>
            </div>
          </div>

          <div className="hero-fade md:col-span-3 md:justify-self-end" style={delay(1100)}>
            <p className="eyebrow eyebrow-plain mb-4 text-white/75">
              {siteConfig.positioning.split(". ").map((part) => (
                <span key={part} className="block pb-1.5">
                  {part.replace(/\.$/, "")}.
                </span>
              ))}
            </p>
            <div className="hidden w-48 border-t border-white/15 pt-4 md:block">
              <Clocks
                zones={[
                  { label: "Shanghai", tz: "Asia/Shanghai" },
                  { label: "Bangkok", tz: "Asia/Bangkok" },
                  { label: "London", tz: "Europe/London" },
                ]}
              />
            </div>
          </div>
        </div>

        <div className="hero-fade mt-8 flex items-end justify-between gap-6" style={delay(1400)}>
          <p className="max-w-[34rem] text-[0.5625rem] uppercase tracking-[0.18em] text-white/55 md:text-[0.625rem]">
            Film and photography are illustrative and do not show our manufacturing partners.
          </p>
          <div className="hidden items-center gap-3 md:flex">
            <span className="text-[0.625rem] uppercase tracking-[0.25em] text-white/55">Scroll</span>
            <span className="block h-10 w-px overflow-hidden bg-white/20">
              <span className="scroll-line block h-full w-full bg-white" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
