import { Download } from "lucide-react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";
import {
  GithubIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "@/components/ui/BrandIcons";
import { Button } from "@/components/ui/button";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";
import { profile, whatsappUrl } from "@/content/profile";
import { Section } from "./Section";

export function Contact() {
  const t = useTranslations("contact");

  return (
    <Section id="contact" eyebrow={t("eyebrow")} title={t("title")}>
      <Reveal>
        <p className="max-w-lg text-lg text-pretty text-muted">{t("text")}</p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <CopyEmailButton email={profile.email} />
          <Button asChild variant="secondary">
            <a
              href={whatsappUrl(t("whatsappMessage"))}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsappIcon />
              {t("whatsapp")}
            </a>
          </Button>
          <Button asChild variant="secondary">
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedinIcon />
              LinkedIn
            </a>
          </Button>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button asChild variant="ghost" size="sm">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon />
              GitHub
            </a>
          </Button>
          {Object.entries(profile.cv).map(([lang, href]) => (
            <Button key={lang} asChild variant="ghost" size="sm">
              <a href={href} download lang={lang}>
                <Download />
                {t("cv", { lang: lang.toUpperCase() })}
              </a>
            </Button>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
