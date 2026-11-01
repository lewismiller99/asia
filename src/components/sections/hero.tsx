import { Logo } from "@/components/brand/logo";
import { ArrowDownIcon, WhatsAppIcon } from "@/components/ui/icons";
import { anchors, siteConfig, whatsappUrl } from "@/lib/site-config";
import { HeroMedia } from "./hero-media";

const delay = (ms: number) => ({ "--delay": `${ms}ms` } as React.CSSProperties);

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

      <div className="container-wide relative z-10 flex flex-1 flex-col pb-6 pt-[calc(var(--header-h)+1.25rem)] md:pb-12 md:pt-[calc(var(--header-h)+2.5rem)]">
        {/* Approved mark, large, as the first thing the visitor reads. */}
        <div className="hero-rise" style={delay(150)}>
          <Logo tone="light" animate className="w-[min(58vw,12rem)] md:w-[min(32vw,19rem)]" />
        </div>

        <div className="mt-auto grid gap-8 pt-10 md:grid-cols-12 md:items-end md:gap-6">
          <div className="md:col-span-10">
            <h1 className="display text-[clamp(2.75rem,9vw,9rem)] text-white">
              <span className="hero-rise block" style={delay(350)}>
                Your brand.
              </span>
              <span className="hero-rise block" style={delay(500)}>
                Built at source.
              </span>
            </h1>

            <p className="hero-rise mt-6 max-w-[32rem] text-[1rem] leading-relaxed text-white/80 md:mt-8 md:text-[1.25rem] md:leading-snug" style={delay(700)}>
              From your first product idea to manufacturing and packaging, we help businesses create their own brands
              through our manufacturing partners in China.
            </p>

            <div className="hero-rise mt-7 flex flex-wrap items-center gap-3 sm:gap-4 md:mt-9" style={delay(850)}>
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

          <div className="hero-fade md:col-span-2 md:justify-self-end md:text-right" style={delay(1100)}>
            <p className="eyebrow eyebrow-plain text-white/75 md:text-white/70">
              {siteConfig.positioning
                .split(". ")
                .map((part) => part.replace(/\.$/, ""))
                .map((part) => (
                  <span key={part} className="block pb-2">
                    {part}.
                  </span>
                ))}
            </p>
            <div className="mt-6 hidden items-center justify-end gap-3 text-white/60 md:flex">
              <span className="text-[0.625rem] uppercase tracking-[0.25em]">Scroll</span>
              <ArrowDownIcon size={14} className="scroll-cue" />
            </div>
          </div>
        </div>

        <p className="hero-fade mt-8 text-[0.5625rem] uppercase tracking-[0.18em] text-white/60 md:mt-10 md:text-[0.625rem]" style={delay(1400)}>
          Film and photography are illustrative and do not show our manufacturing partners.
        </p>
      </div>
    </section>
  );
}
