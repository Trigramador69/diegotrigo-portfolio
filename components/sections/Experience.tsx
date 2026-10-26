import { useLocale, useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollTimeline } from "@/components/motion/ScrollTimeline";
import { experience, t as tl } from "@/content/profile";
import { Section } from "./Section";

export function Experience() {
  const t = useTranslations("experience");
  const locale = useLocale();

  return (
    <Section id="experience" eyebrow={t("eyebrow")} title={t("title")}>
      <ScrollTimeline>
        {experience.map((item) => (
          <li key={`${item.role}-${item.company}`} className="relative pl-10">
            <span
              aria-hidden
              className="absolute top-1.5 left-0 grid size-[15px] place-items-center rounded-full border border-border-strong bg-background"
            >
              <span
                className={
                  item.current
                    ? "size-[7px] rounded-full bg-accent"
                    : "size-[5px] rounded-full bg-subtle"
                }
              />
            </span>
            <Reveal>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-subtle">
                <span>{tl(item.period, locale)}</span>
                {item.current && (
                  <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-medium text-accent-foreground uppercase">
                    {t("current")}
                  </span>
                )}
              </div>
              <h3 className="mt-2 text-lg font-medium tracking-tight">
                {item.role} <span className="text-muted">· {item.company}</span>
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-pretty text-muted">
                {item.highlights[locale].map((highlight) => (
                  <li key={highlight} className="flex gap-3">
                    <span
                      aria-hidden
                      className="mt-2 h-px w-3 shrink-0 bg-border-strong"
                    />
                    {highlight}
                  </li>
                ))}
              </ul>
            </Reveal>
          </li>
        ))}
      </ScrollTimeline>
    </Section>
  );
}
