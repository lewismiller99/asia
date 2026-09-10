"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center bg-offwhite px-6 text-center">
      <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-bronze">
        Error
      </p>
      <h1 className="mt-5 font-serif-display text-4xl text-ink sm:text-5xl">
        Something went wrong
      </h1>
      <p className="mt-5 max-w-md text-base leading-relaxed text-olive">
        Please try again, or return to the homepage.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-10 inline-flex items-center bg-ink px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.16em] text-ivory transition-colors duration-300 hover:bg-olive"
      >
        Try Again
      </button>
    </section>
  );
}
