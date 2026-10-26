import { useLocale, useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";
import { Chip } from "@/components/ui/Chip";
import { stack, t as tl } from "@/content/profile";
import { Section } from "./Section";

export function Stack() {
  const t = useTranslations("stack");
  const locale = useLocale();

  return (
    <Section id="stack" eyebrow={t("eyebrow")} title={t("title")} wide>
      <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {stack.map((group, i) => (
          <Reveal key={group.title.en} delay={(i % 4) * 0.05}>
            <h3 className="font-mono text-xs tracking-wide text-subtle uppercase">
              {tl(group.title, locale)}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item}>
                  <Chip className="text-foreground/85">{item}</Chip>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
