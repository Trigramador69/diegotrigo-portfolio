"use client";

import { useRef, type ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Card whose 1px border glows where the cursor is (pointer devices only). */
export function SpotlightCard({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el || e.pointerType !== "mouse") return;
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--sx", `${e.clientX - rect.left}px`);
        el.style.setProperty("--sy", `${e.clientY - rect.top}px`);
      }}
      className={cn(
        "spotlight rounded-2xl border border-border bg-surface transition-colors duration-300 hover:border-border-strong",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
