"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { primaryNav } from "@/lib/site-config";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  // The overlay is portaled to document.body (see render below) rather than
  // staying inside <header>. A `position: fixed` element nested inside a
  // `position: sticky` ancestor is contained by that ancestor's box rather
  // than the viewport, which otherwise confines this full-screen overlay to
  // the header's own height.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Portals need a real document.body, which only exists client-side;
    // this effect just flips the flag once mounted after hydration. This
    // is the standard SSR-safe "mounted" flag for a portal target and is
    // intentionally a synchronous setState, not a subscription.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeydown);
    return () => window.removeEventListener("keydown", onKeydown);
  }, []);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 text-ivory"
      >
        <span className="h-px w-6 bg-current" />
        <span className="h-px w-6 bg-current" />
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-[60] bg-ink"
              >
                <div className="flex h-full flex-col px-6 py-4">
                  <div className="flex items-center justify-between">
                    <span className="font-serif-display text-lg text-ivory">
                      Menu
                    </span>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      aria-label="Close menu"
                      className="relative flex h-10 w-10 items-center justify-center text-ivory"
                    >
                      <span className="absolute h-px w-6 rotate-45 bg-current" />
                      <span className="absolute h-px w-6 -rotate-45 bg-current" />
                    </button>
                  </div>

                  <motion.nav
                    aria-label="Mobile"
                    className="mt-16 flex flex-1 flex-col gap-2"
                    initial="hidden"
                    animate="show"
                    variants={{
                      hidden: {},
                      show: { transition: { staggerChildren: 0.05 } },
                    }}
                  >
                    {primaryNav.map((item) => (
                      <motion.div
                        key={item.href}
                        variants={{
                          hidden: { opacity: 0, y: 12 },
                          show: { opacity: 1, y: 0 },
                        }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="block border-b border-line-dark py-4 font-serif-display text-3xl text-ivory transition-colors duration-300 hover:text-bronze"
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    ))}
                  </motion.nav>

                  <p className="pb-4 text-[11px] uppercase tracking-[0.25em] text-stone">
                    Bangkok · Thailand · Asia
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}
