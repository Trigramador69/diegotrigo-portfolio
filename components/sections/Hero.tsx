import { ArrowDown, Download, Mail } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Typewriter } from "@/components/motion/Typewriter";
import { WordStagger } from "@/components/motion/WordStagger";
import { Button } from "@/components/ui/button";
import { getCv, profile, t as tl } from "@/content/profile";

export const HERO_PROMPT = 'generate post --icp "retail" --format carousel';

export function Hero() {
  const t = useTranslations("hero");
  const tLang = useTranslations("language");
  const locale = useLocale();
  const other = locale === "es" ? "en" : "es";
  const cv = getCv(locale);
  // Secondary link only when the other language's CV exists separately
  const otherCv = cv?.lang !== other ? profile.cv[other] : undefined;

  return (
    <section
      id="top"
      className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-prose flex-col justify-center px-4 py-20 sm:px-6"
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-muted">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1">
          <span className="relative flex size-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
            <span className="relative size-2 rounded-full bg-accent" />
          </span>
          {t("available")}
        </span>
        <span>
          {profile.name} · {profile.location}
        </span>
      </div>

      <WordStagger
        text={profile.title}
        className="mt-6 text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl"
      />

      <p className="mt-6 max-w-xl text-lg text-pretty text-muted">
        {tl(profile.tagline, locale)}
      </p>

      <div className="mt-8 flex gap-2 rounded-xl border border-border bg-surface px-4 py-3 font-mono text-[13px] sm:text-sm">
        <span className="text-accent-ink select-none" aria-hidden>
          {">"}{" "}
        </span>
        <Typewriter
          text={HERO_PROMPT}
          className="min-w-0 sm:whitespace-nowrap"
        />
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Button asChild>
          <a href="#projects">
            {t("viewProjects")}
            <ArrowDown />
          </a>
        </Button>
        <Button asChild variant="secondary">
          <a href="#contact">
            <Mail />
            {t("contact")}
          </a>
        </Button>
        {cv && (
          <Button asChild variant="secondary">
            <a href={cv.href} download lang={cv.lang}>
              <Download />
              {t("downloadCv")}
              <span className="font-mono text-xs text-subtle uppercase">
                {cv.lang}
              </span>
            </a>
          </Button>
        )}
        {otherCv && (
          <a
            href={otherCv}
            download
            lang={other}
            className="px-2 font-mono text-xs text-muted uppercase underline decoration-border-strong underline-offset-4 transition-colors hover:text-foreground"
            aria-label={t("cvLanguage", { lang: tLang(other) })}
          >
            CV {other}
          </a>
        )}
      </div>
    </section>
  );
}
