"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type TypewriterProps = {
  text: string;
  className?: string;
  /** ms before typing starts */
  delay?: number;
  /** ms per character */
  speed?: number;
};

/**
 * Types `text` once. The full string is rendered invisibly underneath so the
 * line reserves its final size and never causes layout shift.
 */
export function Typewriter({
  text,
  className,
  delay = 700,
  speed = 32,
}: TypewriterProps) {
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduced) return;
    let interval: ReturnType<typeof setInterval> | undefined;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setCount((c) => {
          if (c >= text.length) {
            clearInterval(interval);
            return c;
          }
          return c + 1;
        });
      }, speed);
    }, delay);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, delay, speed, reduced]);

  const shown = reduced ? text : text.slice(0, count);

  return (
    <span className={cn("relative inline-block", className)}>
      <span className="invisible" aria-hidden>
        {text}
      </span>
      <span className="caret absolute inset-0" aria-hidden>
        {shown}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
