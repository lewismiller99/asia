"use client";

import { getImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = {
  desktopSrc: string;
  mobileSrc: string;
  posterDesktop: string;
  posterMobile: string;
};

/**
 * The hero film. The poster is rendered first (and is the LCP element), the
 * film fades in over it once it can play. Mobile gets the vertical edit.
 * Reduced motion, the save-data hint or a playback failure leave the poster
 * in place, so the page is never dependent on the video.
 *
 * The poster is art directed: a landscape frame on wide screens and a
 * portrait frame on phones, delivered through one <picture> so only the
 * matching file is ever downloaded.
 */
export function HeroMedia({ desktopSrc, mobileSrc, posterDesktop, posterMobile }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const posterRef = useRef<HTMLImageElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Reduced motion: leave the poster in place and never load the film.
    if (motion.matches) return;

    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (connection?.saveData) return;

    const video = videoRef.current;
    if (!video) return;

    const portrait = window.matchMedia("(max-width: 767px) and (orientation: portrait)");
    let cancelled = false;
    let observer: IntersectionObserver | undefined;

    const onPlaying = () => setReady(true);
    const onError = () => setReady(false);

    // Start the film only once the poster has painted, so the poster wins
    // the bandwidth race on slow connections and paints as early as possible.
    const start = () => {
      if (cancelled) return;
      video.src = portrait.matches ? mobileSrc : desktopSrc;
      video.load();
      video.addEventListener("playing", onPlaying);
      video.addEventListener("error", onError);

      // Pause when the hero leaves the viewport so the film never costs
      // battery while the visitor reads the rest of the page.
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            video.play().catch(() => undefined);
          } else {
            video.pause();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(video);
    };

    const poster = posterRef.current;
    const fallback = window.setTimeout(start, 2500);
    if (poster?.complete) {
      window.clearTimeout(fallback);
      window.setTimeout(start, 300);
    } else {
      poster?.addEventListener(
        "load",
        () => {
          window.clearTimeout(fallback);
          window.setTimeout(start, 300);
        },
        { once: true }
      );
    }

    return () => {
      cancelled = true;
      window.clearTimeout(fallback);
      observer?.disconnect();
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("error", onError);
    };
  }, [desktopSrc, mobileSrc]);

  const common = { alt: "", sizes: "100vw", priority: true } as const;
  const {
    props: { srcSet: desktopSet },
  } = getImageProps({ ...common, src: posterDesktop, width: 1920, height: 1080, quality: 62 });
  const {
    props: { srcSet: mobileSet, ...img },
  } = getImageProps({ ...common, src: posterMobile, width: 1080, height: 1920, quality: 58 });

  return (
    <div className="absolute inset-0 overflow-hidden bg-black" aria-hidden="true">
      <picture className="poster-drift absolute inset-0 block">
        <source media="(min-width: 768px)" srcSet={desktopSet} />
        <source media="(max-width: 767px)" srcSet={mobileSet} />
        {/* eslint-disable-next-line jsx-a11y/alt-text -- decorative, alt is set through getImageProps */}
        <img
          {...img}
          ref={posterRef}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ color: "transparent" }}
        />
      </picture>
      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-out ${ready ? "opacity-100" : "opacity-0"}`}
        muted
        loop
        playsInline
        autoPlay
        preload="none"
        disablePictureInPicture
        tabIndex={-1}
      />
      {/* Legibility: a cinematic lift at the base and a soft top for the header. */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/35" />
      <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-black/55 via-transparent to-transparent md:w-3/4" />
    </div>
  );
}
