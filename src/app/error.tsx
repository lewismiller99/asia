"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="surface-black flex min-h-dvh flex-col items-start justify-center px-[var(--gutter)]">
      <p className="eyebrow text-mist">Error</p>
      <h1 className="display mt-6 text-[clamp(2.5rem,8vw,6rem)]">Something went wrong.</h1>
      <p className="lede mt-6 max-w-md text-mist">Please try again, or return to the homepage.</p>
      <button type="button" onClick={reset} className="btn btn-seal mt-10">
        Try again
      </button>
    </section>
  );
}
