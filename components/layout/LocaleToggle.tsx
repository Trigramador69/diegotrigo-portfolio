"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "@/i18n/navigation";

export function useSwitchLocale() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();
  const other = locale === "es" ? "en" : "es";

  return {
    other,
    switchLocale: () =>
      startTransition(() => {
        const hash = window.location.hash;
        router.replace(`${pathname}${hash}`, { locale: other, scroll: false });
      }),
  };
}

export function LocaleToggle() {
  const t = useTranslations("language");
  const { other, switchLocale } = useSwitchLocale();

  return (
    <Button
      variant="ghost"
      size="icon"
      lang={other}
      aria-label={t("switchTo")}
      title={t("switchTo")}
      onClick={switchLocale}
      className="font-mono text-xs uppercase"
    >
      {other}
    </Button>
  );
}
