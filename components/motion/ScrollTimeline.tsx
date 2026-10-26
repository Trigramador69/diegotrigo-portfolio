"use client";

import { motion, useReducedMotion, useScroll } from "motion/react";
import { useRef, type ReactNode } from "react";

/**
 * Vertical timeline whose accent stroke draws itself as the list scrolls by.
 * Children are expected to be positioned with left padding for the rail.
 */
export function ScrollTimeline({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 60%"],
  });

  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute top-2 bottom-2 left-[7px] w-px bg-border"
      />
      <motion.div
        aria-hidden
        className="absolute top-2 bottom-2 left-[7px] w-px origin-top bg-accent-ink"
        style={{ scaleY: reduced ? 1 : scrollYProgress }}
      />
      <ol ref={ref} className="relative space-y-12">
        {children}
      </ol>
    </div>
  );
}
