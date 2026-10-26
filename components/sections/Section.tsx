import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  wide?: boolean;
};

export function Section({ id, eyebrow, title, children, wide }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn(
        "mx-auto px-4 py-20 sm:px-6 sm:py-28",
        wide ? "max-w-wide" : "max-w-prose",
      )}
    >
      <Reveal>
        <p className="font-mono text-xs tracking-wide text-accent-ink uppercase">
          {eyebrow}
        </p>
        <h2
          id={`${id}-title`}
          className="mt-3 text-2xl font-semibold tracking-tight text-balance sm:text-3xl"
        >
          {title}
        </h2>
      </Reveal>
      <div className="mt-10 sm:mt-12">{children}</div>
    </section>
  );
}
