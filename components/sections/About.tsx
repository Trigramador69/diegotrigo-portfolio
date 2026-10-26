import { GraduationCap, Languages } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";
import { education, languages, profile, t as tl } from "@/content/profile";
import { Section } from "./Section";

export function About() {
  const t = useTranslations("about");
  const locale = useLocale();

  return (
    <Section id="about" eyebrow={t("eyebrow")} title={t("title")}>
      <Reveal className="grid items-start gap-8 sm:grid-cols-[1fr_160px]">
        <div className="space-y-4 text-pretty text-muted">
          {profile.about[locale].map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="order-first size-32 overflow-hidden rounded-2xl border border-border bg-surface sm:order-none sm:size-40">
          {profile.photo ? (
            <Image
              src={profile.photo}
              alt={t("photoAlt")}
              width={320}
              height={320}
              className="size-full origin-[52%_30%] scale-[1.7] object-cover object-[52%_30%]"
            />
          ) : (
            <div
              role="img"
              aria-label={t("photoAlt")}
              className="dot-grid grid size-full place-items-center [mask-image:none] font-mono text-3xl font-semibold text-accent-ink"
            >
              {profile.initials}
            </div>
          )}
        </div>
      </Reveal>

      <Reveal className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-surface p-5">
          <h3 className="flex items-center gap-2 font-mono text-xs tracking-wide text-subtle uppercase">
            <GraduationCap className="size-4 text-accent-ink" aria-hidden />
            {t("education")}
          </h3>
          <p className="mt-3 font-medium">{tl(education.degree, locale)}</p>
          <p className="mt-1 text-sm text-muted">
            {education.school} · {education.place}
          </p>
          <p className="mt-2 font-mono text-xs text-subtle">
            {tl(education.period, locale)}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-5">
          <h3 className="flex items-center gap-2 font-mono text-xs tracking-wide text-subtle uppercase">
            <Languages className="size-4 text-accent-ink" aria-hidden />
            {t("languages")}
          </h3>
          <dl className="mt-3 space-y-3">
            {languages.map((language) => (
              <div key={language.name.en}>
                <dt className="font-medium">{tl(language.name, locale)}</dt>
                <dd className="mt-0.5 text-sm text-muted">
                  {tl(language.level, locale)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </Section>
  );
}
