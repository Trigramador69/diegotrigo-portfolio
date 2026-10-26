import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <section className="mx-auto flex min-h-[70svh] max-w-prose flex-col justify-center px-4 sm:px-6">
      <p className="font-mono text-xs text-accent-ink">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">
        {t("title")}
      </h1>
      <p className="mt-3 text-muted">{t("text")}</p>
      <div className="mt-8">
        <Button asChild variant="secondary">
          <Link href="/">{t("back")}</Link>
        </Button>
      </div>
    </section>
  );
}
