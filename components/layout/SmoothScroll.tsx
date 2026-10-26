"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { registerLenis } from "@/lib/scroll";

/** Lenis smooth scrolling, desktop only and never under reduced motion. */
export function SmoothScroll() {
  useEffect(() => {
    const desktop = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (min-width: 1024px)",
    ).matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!desktop || reduced) return;

    const lenis = new Lenis({ autoRaf: true, anchors: { offset: -80 } });
    registerLenis(lenis);
    return () => {
      registerLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
