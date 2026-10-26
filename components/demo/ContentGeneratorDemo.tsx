"use client";

import {
  CalendarClock,
  CircleCheck,
  LoaderCircle,
  Sparkles,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  FORMATS,
  ICPS,
  TONES,
  generateDemo,
  type DemoOutput,
  type Format,
  type Icp,
  type Tone,
} from "@/content/demo";
import { cn } from "@/lib/utils";

const STEPS = ["context", "rules", "llm", "review"] as const;

type Phase = "idle" | "running" | "done";

function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
  optionLabel,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
  optionLabel: (value: T) => string;
}) {
  const name = useId();
  return (
    <fieldset>
      <legend className="font-mono text-[11px] tracking-wide text-subtle uppercase">
        {label}
      </legend>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {options.map((option) => (
          <label
            key={option}
            className={cn(
              "cursor-pointer rounded-full border px-3 py-1.5 text-xs transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent-ink",
              value === option
                ? "border-accent-ink/50 bg-accent/15 text-foreground"
                : "border-border text-muted hover:border-border-strong hover:text-foreground",
            )}
          >
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
              className="sr-only"
            />
            {optionLabel(option)}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function PostPreview({
  output,
}: {
  output: Extract<DemoOutput, { format: "post" }>;
}) {
  return (
    <div className="rounded-xl border border-border bg-background p-4 sm:p-5">
      <div className="flex items-center gap-3">
        <span className="grid size-9 place-items-center rounded-full bg-accent font-mono text-sm font-semibold text-accent-foreground">
          K
        </span>
        <div className="text-sm leading-tight">
          <p className="font-medium">Kora</p>
          <p className="text-xs text-subtle">LinkedIn</p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed whitespace-pre-line text-foreground/90">
        {output.text}
      </p>
      <p className="mt-3 text-sm text-accent-ink">
        {output.hashtags.join(" ")}
      </p>
    </div>
  );
}

function CarouselPreview({
  output,
}: {
  output: Extract<DemoOutput, { format: "carousel" }>;
}) {
  const t = useTranslations("demo");
  const total = output.slides.length;

  return (
    <ol className="-mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-2">
      {output.slides.map((slide, i) => (
        <motion.li
          key={`${slide.title}-${i}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, duration: 0.4 }}
          aria-label={t("slide", { n: i + 1, total })}
          className={cn(
            "flex aspect-[4/5] w-52 shrink-0 snap-start flex-col justify-between rounded-xl border p-4",
            i === 0
              ? "border-transparent bg-accent text-accent-foreground"
              : "border-border bg-background",
          )}
        >
          <span
            className={cn(
              "font-mono text-[10px]",
              i === 0 ? "text-accent-foreground/70" : "text-subtle",
            )}
          >
            {i + 1}/{total}
          </span>
          <div>
            <p
              className={cn(
                "font-semibold tracking-tight text-balance",
                i === 0 || i === total - 1 ? "text-base" : "text-lg",
              )}
            >
              {slide.title}
            </p>
            <p
              className={cn(
                "mt-2 text-xs",
                i === 0 ? "text-accent-foreground/80" : "text-muted",
              )}
            >
              {slide.text}
            </p>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}

/**
 * Simulated version of the AI content module: pick an ICP, tone and format,
 * watch the pipeline run, get a sample post or carousel. No network calls.
 */
export function ContentGeneratorDemo() {
  const t = useTranslations("demo");
  const locale = useLocale();
  const reduced = useReducedMotion();
  const [icp, setIcp] = useState<Icp>("retail");
  const [tone, setTone] = useState<Tone>("professional");
  const [format, setFormat] = useState<Format>("carousel");
  const [phase, setPhase] = useState<Phase>("idle");
  const [step, setStep] = useState(0);
  const [output, setOutput] = useState<DemoOutput | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const generate = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    const stepMs = reduced ? 150 : 650;
    setPhase("running");
    setStep(0);
    setOutput(null);
    STEPS.forEach((_, i) => {
      timers.current.push(setTimeout(() => setStep(i + 1), stepMs * (i + 1)));
    });
    timers.current.push(
      setTimeout(
        () => {
          setOutput(generateDemo(locale, icp, tone, format));
          setPhase("done");
        },
        stepMs * (STEPS.length + 1),
      ),
    );
  };

  return (
    <div
      id="demo"
      className="not-prose my-10 scroll-mt-24 overflow-hidden rounded-2xl border border-border-strong bg-surface"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-3 sm:px-6">
        <p className="flex items-center gap-2 font-mono text-[11px] text-subtle">
          <Sparkles className="size-3.5 text-accent-ink" aria-hidden />
          {t("label")}
        </p>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)] gap-6 p-4 sm:p-6">
        <p className="text-sm text-muted">{t("business")}</p>
        <div className="grid gap-5 sm:grid-cols-3">
          <Segmented
            label={t("icp")}
            options={ICPS}
            value={icp}
            onChange={setIcp}
            optionLabel={(v) => t(`icps.${v}`)}
          />
          <Segmented
            label={t("tone")}
            options={TONES}
            value={tone}
            onChange={setTone}
            optionLabel={(v) => t(`tones.${v}`)}
          />
          <Segmented
            label={t("format")}
            options={FORMATS}
            value={format}
            onChange={setFormat}
            optionLabel={(v) => t(`formats.${v}`)}
          />
        </div>

        <div>
          <Button onClick={generate} disabled={phase === "running"}>
            {phase === "running" ? (
              <LoaderCircle className="animate-spin motion-reduce:animate-none" />
            ) : (
              <Sparkles />
            )}
            {phase === "running"
              ? t("generating")
              : phase === "done"
                ? t("regenerate")
                : t("generate")}
          </Button>
        </div>

        <div
          className="min-h-[22rem] rounded-xl border border-dashed border-border p-3 sm:p-4"
          aria-live="polite"
          aria-busy={phase === "running"}
        >
          <AnimatePresence mode="wait">
            {phase === "idle" && (
              <motion.p
                key="idle"
                exit={{ opacity: 0 }}
                className="grid h-[20rem] place-items-center text-center font-mono text-xs text-subtle"
              >
                {t("emptyState")}
              </motion.p>
            )}

            {phase === "running" && (
              <motion.ol
                key="running"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-3 p-2"
              >
                {STEPS.map((s, i) => {
                  const state =
                    i < step ? "done" : i === step ? "active" : "pending";
                  return (
                    <li
                      key={s}
                      className={cn(
                        "flex items-center gap-3 font-mono text-xs transition-colors",
                        state === "pending"
                          ? "text-subtle/60"
                          : "text-foreground",
                      )}
                    >
                      {state === "done" ? (
                        <CircleCheck
                          className="size-4 text-accent-ink"
                          aria-hidden
                        />
                      ) : state === "active" ? (
                        <LoaderCircle
                          className="size-4 animate-spin text-accent-ink motion-reduce:animate-none"
                          aria-hidden
                        />
                      ) : (
                        <span
                          aria-hidden
                          className="grid size-4 place-items-center"
                        >
                          <span className="size-1.5 rounded-full bg-border-strong" />
                        </span>
                      )}
                      {t(`steps.${s}`)}
                    </li>
                  );
                })}
              </motion.ol>
            )}

            {phase === "done" && output && (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                {output.format === "post" ? (
                  <PostPreview output={output} />
                ) : (
                  <CarouselPreview output={output} />
                )}
                <div className="flex flex-wrap gap-2 font-mono text-[11px]">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-ink/40 bg-accent/10 px-2.5 py-1 text-accent-ink">
                    <CircleCheck className="size-3.5" aria-hidden />
                    {t("ready")}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-muted">
                    <CalendarClock className="size-3.5" aria-hidden />
                    {t("schedule")}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
