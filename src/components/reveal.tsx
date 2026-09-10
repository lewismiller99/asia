"use client";

import { useEffect, useRef, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
};

/**
 * Lightweight scroll reveal. Uses an IntersectionObserver rather than a
 * scroll-linked animation library so the effect stays cheap and never
 * jitters — matches the brief's "subtle animation only" rule.
 */
export function Reveal({ children, className, delayMs = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Failsafe: if IntersectionObserver is unsupported or never fires for
    // this element (e.g. it never enters the viewport before the user
    // reaches it some other way), force it visible after a short delay
    // rather than leaving content permanently hidden.
    const failsafe = window.setTimeout(() => {
      el.classList.add("is-visible");
    }, 2500);

    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return () => window.clearTimeout(failsafe);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.clearTimeout(failsafe);
            window.setTimeout(() => {
              entry.target.classList.add("is-visible");
            }, delayMs);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [delayMs]);

  return (
    <div ref={ref} className={`reveal ${className ?? ""}`}>
      {children}
    </div>
  );
}
