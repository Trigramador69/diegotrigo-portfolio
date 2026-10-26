"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

type WordStaggerProps = {
  text: string;
  className?: string;
};

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

/**
 * Reveals a heading word by word, from blurred to sharp. Words start
 * partially visible so the heading paints immediately (good for LCP).
 */
export function WordStagger({ text, className }: WordStaggerProps) {
  const reduced = useReducedMotion();

  const word: Variants = {
    hidden: reduced
      ? { opacity: 0.4 }
      : { opacity: 0.2, filter: "blur(10px)", y: 8 },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const words = text.split(" ");

  return (
    <motion.h1
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
      aria-label={text}
    >
      {words.map((w, i) => (
        <motion.span
          key={`${w}-${i}`}
          variants={word}
          aria-hidden
          className="inline-block will-change-[filter,transform]"
        >
          {w}
          {i < words.length - 1 ? "\u00a0" : null}
        </motion.span>
      ))}
    </motion.h1>
  );
}
