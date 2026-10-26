"use client";

import { Command } from "lucide-react";
import { LayoutGroup, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { openCommandMenu, scrollToId } from "@/lib/scroll";
import { cn } from "@/lib/utils";
import { profile } from "@/content/profile";
import type { SectionId } from "@/lib/site";
import { LocaleToggle } from "./LocaleToggle";
import { ThemeToggle } from "./ThemeToggle";

const NAV_ITEMS: SectionId[] = [
  "about",
  "experience",
  "projects",
  "stack",
  "contact",
];

function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        }
      },
      // A section is "active" while it crosses the band 40–45% down the viewport
      { rootMargin: "-40% 0px -55% 0px" },
    );
    const hero = document.getElementById("top");
    if (hero) observer.observe(hero);
    for (const id of NAV_ITEMS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [enabled]);

  return enabled ? active : null;
}

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const isHome = pathname === "/";
  const active = useActiveSection(isHome);
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    // Platform is only known on the client; default to "Ctrl" for SSR.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform));
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border bg-background/75 backdrop-blur-md">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-sm focus:text-accent-foreground"
      >
        {t("skip")}
      </a>
      <div className="mx-auto flex h-16 max-w-wide items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-medium tracking-tight"
          aria-label={`${profile.name} · ${t("home")}`}
        >
          <span className="grid size-7 place-items-center rounded-md bg-accent font-mono text-[11px] font-semibold text-accent-foreground">
            {profile.initials}
          </span>
          <span className="hidden sm:inline">{profile.shortName}</span>
        </Link>

        <nav aria-label={t("label")} className="hidden md:block">
          <LayoutGroup>
            <ul className="flex items-center gap-1">
              {NAV_ITEMS.map((id) => {
                const isActive = active === id;
                const className = cn(
                  "relative block rounded-full px-3 py-1.5 text-sm transition-colors",
                  isActive
                    ? "text-foreground"
                    : "text-muted hover:text-foreground",
                );
                const content = (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-0 -z-10 rounded-full border border-border bg-surface-strong"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.5,
                        }}
                      />
                    )}
                    {t(id)}
                  </>
                );
                return (
                  <li key={id}>
                    {isHome ? (
                      <a
                        href={`#${id}`}
                        className={className}
                        aria-current={isActive ? "true" : undefined}
                        onClick={(e) => {
                          if (scrollToId(id)) e.preventDefault();
                        }}
                      >
                        {content}
                      </a>
                    ) : (
                      <Link href={`/#${id}`} className={className}>
                        {content}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </LayoutGroup>
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={openCommandMenu}
            className="flex h-9 items-center gap-2 rounded-full border border-border bg-surface px-3 text-xs text-muted transition-colors hover:border-border-strong hover:text-foreground"
            aria-label={t("search")}
            aria-keyshortcuts={isMac ? "Meta+K" : "Control+K"}
          >
            <Command className="size-3.5" aria-hidden />
            <kbd className="font-mono">{isMac ? "⌘K" : "Ctrl K"}</kbd>
          </button>
          <LocaleToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
