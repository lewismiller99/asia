import type { ReactNode } from "react";
import { Reveal } from "./reveal";

type Props = {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "split";
  className?: string;
  id?: string;
};

/**
 * Editorial section opener: a small red-ruled eyebrow, an oversized
 * display headline, and an optional lede. "split" aligns the lede to the
 * right on wide screens for an asymmetric editorial rhythm.
 */
export function SectionHeading({ eyebrow, title, lede, tone = "dark", align = "left", className = "", id }: Props) {
  const muted = tone === "dark" ? "text-mist" : "text-ash";
  return (
    <div className={`${align === "split" ? "grid gap-10 lg:grid-cols-12 lg:items-end" : ""} ${className}`}>
      <div className={align === "split" ? "lg:col-span-9" : ""}>
        <Reveal>
          <p className={`eyebrow ${muted}`}>{eyebrow}</p>
        </Reveal>
        <Reveal delayMs={80}>
          <h2 id={id} className="display mt-7 text-[clamp(2.75rem,7vw,7rem)]">
            {title}
          </h2>
        </Reveal>
      </div>
      {lede ? (
        <Reveal delayMs={160} className={align === "split" ? "lg:col-span-3 lg:pb-3" : "mt-8 max-w-[var(--measure)]"}>
          <p className={`lede ${muted}`}>{lede}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
