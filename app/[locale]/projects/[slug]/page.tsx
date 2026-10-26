import { ArrowLeft, ArrowRight, ArrowUpRight, Lock } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/motion/Reveal";
import { Chip } from "@/components/ui/Chip";
import { getProject, projects, t as tl } from "@/content/profile";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug })),
  );
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/projects/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const lang = locale as Locale;

  return {
    title: tl(project.title, lang),
    description: tl(project.summary, lang),
    alternates: {
      canonical: `/${lang}/projects/${slug}`,
      languages: {
        es: `/es/projects/${slug}`,
        en: `/en/projects/${slug}`,
        "x-default": `/es/projects/${slug}`,
      },
    },
    openGraph: {
      type: "article",
      title: tl(project.title, lang),
      description: tl(project.summary, lang),
    },
  };
}

export default async function ProjectPage({
  params,
}: PageProps<"/[locale]/projects/[slug]">) {
  const { locale, slug } = await params;
  const lang = locale as Locale;
  setRequestLocale(lang);

  const project = getProject(slug);
  if (!project) notFound();

  const t = await getTranslations("caseStudy");
  const { default: Content } = await import(
    `@/content/projects/${project.slug}.${lang}.mdx`
  );
  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];

  const meta = [
    { label: t("role"), value: tl(project.role, lang) },
    { label: t("period"), value: tl(project.period, lang) },
  ];

  return (
    <article className="mx-auto max-w-prose px-4 pt-12 pb-24 sm:px-6 sm:pt-20">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" aria-hidden />
        {t("back")}
      </Link>

      <header className="mt-10">
        {project.badge && (
          <p className="font-mono text-xs text-accent-ink">
            {tl(project.badge, lang)}
          </p>
        )}
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
          {tl(project.title, lang)}
        </h1>
        <p className="mt-5 text-lg text-pretty text-muted">
          {tl(project.summary, lang)}
        </p>

        <dl className="mt-8 grid gap-6 border-y border-border py-6 sm:grid-cols-[1fr_1fr_2fr]">
          {meta.map((item) => (
            <div key={item.label}>
              <dt className="font-mono text-[11px] tracking-wide text-subtle uppercase">
                {item.label}
              </dt>
              <dd className="mt-1.5 text-sm">{item.value}</dd>
            </div>
          ))}
          <div>
            <dt className="font-mono text-[11px] tracking-wide text-subtle uppercase">
              {t("stack")}
            </dt>
            <dd className="mt-2 flex flex-wrap gap-1.5">
              {project.stack.map((item) => (
                <Chip key={item}>{item}</Chip>
              ))}
            </dd>
          </div>
        </dl>

        {project.links.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-4" aria-label={t("links")}>
            {project.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium text-accent-ink hover:underline"
                >
                  {tl(link.label, lang)}
                  <ArrowUpRight className="size-4" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        )}

        {project.confidential && (
          <p className="mt-6 flex gap-3 rounded-xl border border-border bg-surface p-4 text-sm text-muted">
            <Lock
              className="mt-0.5 size-4 shrink-0 text-accent-ink"
              aria-hidden
            />
            {t("confidential")}
          </p>
        )}
      </header>

      <Reveal className="mt-14">
        <Content />
      </Reveal>

      <footer className="mt-20 border-t border-border pt-8">
        <Link
          href={`/projects/${next.slug}`}
          className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-border-strong"
        >
          <span>
            <span className="block font-mono text-[11px] tracking-wide text-subtle uppercase">
              {t("next")}
            </span>
            <span className="mt-1 block font-medium">
              {tl(next.title, lang)}
            </span>
          </span>
          <ArrowRight
            className="size-5 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden
          />
        </Link>
      </footer>
    </article>
  );
}
