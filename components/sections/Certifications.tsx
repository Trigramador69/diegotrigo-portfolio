import { ArrowUpRight, Award } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";
import { certifications, t as tl } from "@/content/profile";
import { Section } from "./Section";

export function Certifications() {
  const t = useTranslations("certifications");
  const locale = useLocale();

  return (
    <Section id="certifications" eyebrow={t("eyebrow")} title={t("title")}>
      <ul className="grid gap-4 sm:grid-cols-2">
        {certifications.map((cert) => (
          <li key={cert.title.en}>
            <Reveal className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6">
              <Award className="size-5 text-accent-ink" aria-hidden />
              <h3 className="mt-4 font-medium tracking-tight">
                {tl(cert.title, locale)}
              </h3>
              <p className="mt-1 font-mono text-xs text-subtle">
                {cert.issuer} · {tl(cert.date, locale)}
              </p>
              <p className="mt-3 text-sm text-pretty text-muted">
                {tl(cert.description, locale)}
              </p>
              {cert.link && (
                <a
                  href={cert.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-accent-ink hover:underline"
                >
                  {t(cert.link.kind === "onchain" ? "verify" : "view")}
                  <ArrowUpRight className="size-4" aria-hidden />
                </a>
              )}
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
