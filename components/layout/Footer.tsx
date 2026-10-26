import { useTranslations } from "next-intl";
import { profile } from "@/content/profile";
import { REPO_URL } from "@/lib/site";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-wide flex-col gap-2 px-4 py-8 font-mono text-xs text-subtle sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>
          {t("builtWith")} ·{" "}
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-border-strong underline-offset-4 transition-colors hover:text-foreground"
          >
            {t("source")}
          </a>
        </p>
      </div>
    </footer>
  );
}
