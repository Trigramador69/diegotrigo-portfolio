import { ArrowUpRight, Sparkles } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { Chip } from "@/components/ui/Chip";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { profile, projects, t as tl, type Project } from "@/content/profile";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Section } from "./Section";

/** Makes the whole card clickable while keeping a single focusable link. */
const stretched =
  "after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent-ink";

function ProjectCard({
  project,
  featured,
}: {
  project: Project;
  featured?: boolean;
}) {
  const t = useTranslations("projects");
  const locale = useLocale();

  return (
    <SpotlightCard
      className={cn(
        "group flex h-full flex-col p-6 sm:p-8",
        featured && "md:col-span-2 md:row-span-2",
      )}
    >
      {project.badge && (
        <p className="font-mono text-xs text-accent-ink">
          {tl(project.badge, locale)}
        </p>
      )}
      <h3
        className={cn(
          "mt-3 font-semibold tracking-tight",
          featured ? "text-2xl sm:text-3xl" : "text-xl",
        )}
      >
        <Link href={`/projects/${project.slug}`} className={stretched}>
          {tl(project.title, locale)}
        </Link>
      </h3>
      <p className="mt-3 max-w-lg text-sm text-pretty text-muted">
        {tl(project.summary, locale)}
      </p>

      {featured && project.modules && (
        <ul
          className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4"
          aria-label={tl(project.title, locale)}
        >
          {project.modules.map((module) => (
            <li
              key={module.name.en}
              className={cn(
                "rounded-lg border px-3 py-2.5 font-mono text-xs",
                module.highlight
                  ? "border-accent-ink/40 bg-accent/10 text-accent-ink"
                  : "border-border text-subtle",
              )}
            >
              {module.highlight && (
                <Sparkles className="mb-1.5 size-3.5" aria-hidden />
              )}
              {tl(module.name, locale)}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto pt-8">
        <div className="flex flex-wrap gap-1.5">
          {project.stack.slice(0, featured ? 7 : 4).map((item) => (
            <Chip key={item}>{item}</Chip>
          ))}
        </div>
        <p className="mt-6 inline-flex items-center gap-1 text-sm font-medium">
          {t("caseStudy")}
          <ArrowUpRight
            aria-hidden
            className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </p>
      </div>
    </SpotlightCard>
  );
}

export function Projects() {
  const t = useTranslations("projects");
  const [featured, ...rest] = projects;

  return (
    <Section id="projects" eyebrow={t("eyebrow")} title={t("title")} wide>
      <Reveal className="grid gap-4 md:grid-cols-3">
        <ProjectCard project={featured} featured />
        {rest.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}

        <SpotlightCard className="group flex flex-col p-6 sm:p-8">
          <Sparkles className="size-5 text-accent-ink" aria-hidden />
          <h3 className="mt-4 text-xl font-semibold tracking-tight">
            <Link
              href={`/projects/${featured.slug}#demo`}
              className={stretched}
            >
              {t("demoTitle")}
            </Link>
          </h3>
          <p className="mt-3 text-sm text-pretty text-muted">{t("demoText")}</p>
          <ArrowUpRight
            aria-hidden
            className="mt-auto size-4 self-end transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </SpotlightCard>

        <SpotlightCard className="group flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 md:col-span-3">
          <div className="flex items-start gap-4">
            <GithubIcon className="mt-0.5 size-5 shrink-0" />
            <div>
              <h3 className="font-semibold tracking-tight">
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={stretched}
                >
                  {t("moreTitle")}
                </a>
              </h3>
              <p className="mt-1 text-sm text-muted">{t("moreText")}</p>
            </div>
          </div>
          <span className="font-mono text-xs text-subtle">
            {profile.links.github.replace("https://", "")}
            <ArrowUpRight aria-hidden className="ml-1 inline size-3.5" />
          </span>
        </SpotlightCard>
      </Reveal>
    </Section>
  );
}
