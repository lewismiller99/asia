"use client";

import { useSyncExternalStore } from "react";
import { Logo } from "@/components/brand/logo";

/*
 * First load intro: the mark on charcoal, the seal landing, then the page.
 * Plays once per session, never under reduced motion, and is pure CSS once
 * mounted so nothing can leave it stuck on screen. Total 1.4 seconds.
 */
const KEY = "bic-intro-played";

function subscribe() {
  return () => undefined;
}

function getSnapshot() {
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    if (window.sessionStorage.getItem(KEY)) return false;
    window.sessionStorage.setItem(KEY, "1");
    return true;
  } catch {
    return false;
  }
}

export function Intro() {
  const play = useSyncExternalStore(subscribe, getSnapshot, () => false);
  if (!play) return null;
  return (
    <div className="intro" aria-hidden="true">
      <Logo tone="light" animate className="intro-logo" />
    </div>
  );
}
