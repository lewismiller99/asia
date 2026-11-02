"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Visual treatment, matching the classes in globals.css. */
  variant?: "rise" | "mask" | "line" | "stagger";
  delayMs?: number;
  as?: ElementType;
  /** Fraction of the element that must be visible before it reveals. */
  threshold?: number;
};

/**
 * Scroll reveal built on IntersectionObserver. Content is visible by
 * default; the "js" class on <html> opts the element into starting hidden,
 * and this component adds "is-visible" when it enters the viewport. There
 * is a failsafe so nothing can stay hidden if the observer never fires.
 */
export function Reveal({
  children,
  className = "",
  variant = "rise",
  delayMs = 0,
  as: Tag = "div",
  threshold = 0.18,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => el.classList.add("is-visible");
    const failsafe = window.setTimeout(show, 1200);

    if (typeof IntersectionObserver === "undefined") {
      show();
      return () => window.clearTimeout(failsafe);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            window.clearTimeout(failsafe);
            show();
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [threshold]);

  const variantClass =
    variant === "mask" ? "reveal-mask" : variant === "line" ? "reveal-line" : variant === "stagger" ? "reveal-stagger" : "reveal";

  return (
    <Tag
      ref={ref}
      className={`${variantClass} ${className}`}
      style={delayMs ? ({ "--reveal-delay": `${delayMs}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
