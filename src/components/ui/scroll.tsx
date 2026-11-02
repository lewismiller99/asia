"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

/**
 * Scroll driven primitives shared by the chapter layouts. All of them are
 * progressive enhancements: without JavaScript, or under reduced motion,
 * the content is laid out normally and fully visible.
 */

function reducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Progress (0 to 1) of an element travelling through the viewport. */
function useScrollProgress(ref: React.RefObject<HTMLElement | null>, onProgress: (p: number) => void) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = total <= 0 ? 0 : Math.min(1, Math.max(0, -rect.top / total));
      onProgress(p);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, onProgress]);
}

/**
 * Words that light up one by one as the statement scrolls through the
 * middle of the viewport. Reads as a slow, deliberate voice.
 */
export function WordReveal({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;
    const spans = Array.from(el.querySelectorAll<HTMLSpanElement>("span[data-word]"));
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Progress runs from the paragraph entering the lower third to leaving the upper third.
      const start = vh * 0.85;
      const end = vh * 0.25;
      const p = Math.min(1, Math.max(0, (start - rect.top) / (start - end + rect.height * 0.6)));
      const lit = p * spans.length;
      spans.forEach((s, i) => {
        const v = Math.min(1, Math.max(0, lit - i));
        s.style.opacity = String(0.5 + 0.5 * v);
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i} data-word className="inline-block transition-opacity duration-150 ease-out">
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}

/**
 * Pinned horizontal gallery. On wide screens the section is tall and the
 * track slides sideways as the visitor scrolls down; on phones it is a
 * native horizontal scroller with snap points.
 */
export function HorizontalGallery({ children, count, className = "" }: { children: ReactNode; count: number; className?: string }) {
  const outer = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setPinned(mq.matches && !reducedMotion());
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useScrollProgress(outer, (p) => {
    const t = track.current;
    if (!t || !pinned) return;
    const max = t.scrollWidth - window.innerWidth;
    t.style.transform = `translate3d(${(-p * max).toFixed(1)}px, 0, 0)`;
  });

  return (
    <div
      ref={outer}
      className={className}
      style={pinned ? { height: `${Math.max(2, count) * 70 + 100}vh` } : undefined}
      data-pinned={pinned ? "true" : "false"}
    >
      <div className={pinned ? "sticky top-0 h-screen overflow-hidden" : "overflow-x-auto overflow-y-hidden snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"}>
        <div ref={track} className={`flex h-full ${pinned ? "will-change-transform" : ""}`}>
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * Pinned step scene: the visual and copy stay in view while invisible
 * trigger blocks scroll underneath and switch the active step.
 */
export function StepScene({
  steps,
  renderVisual,
  renderCopy,
  className = "",
}: {
  steps: number;
  renderVisual: (active: number) => ReactNode;
  renderCopy: (active: number) => ReactNode;
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const triggers = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.step));
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    triggers.current.forEach((t) => t && observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0">{renderVisual(active)}</div>
        <div className="relative z-10 h-full">{renderCopy(active)}</div>
      </div>
      {Array.from({ length: steps }).map((_, i) => (
        <div
          key={i}
          data-step={i}
          ref={(el) => {
            triggers.current[i] = el;
          }}
          className="h-[80vh]"
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

// A minute ticker as an external store, so the clocks render the server
// placeholder first and then subscribe without setting state in an effect.
const tickListeners = new Set<() => void>();
let tickTimer: number | undefined;
function subscribeTick(cb: () => void) {
  tickListeners.add(cb);
  if (tickTimer === undefined) tickTimer = window.setInterval(() => tickListeners.forEach((l) => l()), 30_000);
  return () => {
    tickListeners.delete(cb);
    if (tickListeners.size === 0 && tickTimer !== undefined) {
      window.clearInterval(tickTimer);
      tickTimer = undefined;
    }
  };
}
const getMinute = () => Math.floor(Date.now() / 60_000);
const getServerMinute = () => -1;

/** Live local times in the places the business works from. */
export function Clocks({ zones }: { zones: { label: string; tz: string }[] }) {
  const minute = useSyncExternalStore(subscribeTick, getMinute, getServerMinute);
  const now = minute < 0 ? null : new Date(minute * 60_000);
  return (
    <dl className="grid gap-1.5">
      {zones.map((z) => (
        <div key={z.tz} className="flex items-baseline justify-between gap-6 text-[0.6875rem] uppercase tracking-[0.22em]">
          <dt className="text-white/55">{z.label}</dt>
          <dd className="font-semibold tabular-nums text-white/90">
            {now ? new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: z.tz }).format(now) : "--:--"}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Parallax: shifts children vertically by a fraction of scroll through the viewport. */
export function Parallax({ children, amount = 0.12, className = "" }: { children: ReactNode; amount?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    const target = inner.current;
    if (!el || !target || reducedMotion()) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const centre = rect.top + rect.height / 2 - vh / 2;
      target.style.transform = `translate3d(0, ${(-centre * amount).toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [amount]);
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div ref={inner} className="h-full w-full will-change-transform" style={{ scale: `${1 + amount * 2}` }}>
        {children}
      </div>
    </div>
  );
}
