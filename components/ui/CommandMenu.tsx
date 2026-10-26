"use client";

import { Command } from "cmdk";
import {
  ArrowRight,
  Copy,
  Download,
  FileText,
  Languages,
  Moon,
  Code,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useEffect, useState, type ReactNode } from "react";
import {
  GithubIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "@/components/ui/BrandIcons";
import { useSwitchLocale } from "@/components/layout/LocaleToggle";
import { profile, projects, t as tl, whatsappUrl } from "@/content/profile";
import { usePathname, useRouter } from "@/i18n/navigation";
import { copyText } from "@/lib/clipboard";
import { COMMAND_MENU_EVENT, scrollToId } from "@/lib/scroll";
import { REPO_URL, SECTIONS } from "@/lib/site";

function Item({
  icon,
  children,
  onSelect,
  keywords,
}: {
  icon: ReactNode;
  children: ReactNode;
  onSelect: () => void;
  keywords?: string[];
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      keywords={keywords}
      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted [&_svg]:size-4 [&_svg]:shrink-0"
    >
      {icon}
      {children}
    </Command.Item>
  );
}

export function CommandMenu() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const { other, switchLocale } = useSwitchLocale();
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(COMMAND_MENU_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(COMMAND_MENU_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 1800);
    return () => clearTimeout(id);
  }, [toast]);

  const run = (fn: () => void) => () => {
    setOpen(false);
    fn();
  };

  const goToSection = (id: string) => {
    if (pathname === "/") {
      // Wait a frame so the dialog releases scroll lock first
      requestAnimationFrame(() => scrollToId(id));
    } else {
      router.push(`/#${id}`);
    }
  };

  const download = (href: string) => {
    const a = document.createElement("a");
    a.href = href;
    a.download = "";
    a.click();
  };

  const openExternal = (href: string) =>
    window.open(href, "_blank", "noopener,noreferrer");

  return (
    <>
      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label={t("command.title")}
        overlayClassName="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        contentClassName="fixed top-[15vh] left-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 overflow-hidden rounded-2xl border border-border-strong bg-background shadow-2xl"
      >
        <Command.Input
          placeholder={t("command.placeholder")}
          className="h-12 w-full border-b border-border bg-transparent px-4 text-sm text-foreground outline-none placeholder:text-subtle"
        />
        <Command.List className="max-h-[min(60vh,420px)] overflow-y-auto overscroll-contain p-2">
          <Command.Empty className="px-3 py-6 text-center text-sm text-muted">
            {t("command.empty")}
          </Command.Empty>

          <Command.Group heading={t("command.navigate")}>
            <Item
              icon={<ArrowRight />}
              onSelect={run(() => goToSection("top"))}
            >
              {t("nav.home")}
            </Item>
            {SECTIONS.map((id) => (
              <Item
                key={id}
                icon={<ArrowRight />}
                onSelect={run(() => goToSection(id))}
              >
                {t(`nav.${id}`)}
              </Item>
            ))}
            {projects.map((project) => (
              <Item
                key={project.slug}
                icon={<FileText />}
                onSelect={run(() => router.push(`/projects/${project.slug}`))}
              >
                {t("command.caseStudy", { title: tl(project.title, locale) })}
              </Item>
            ))}
          </Command.Group>

          <Command.Group heading={t("command.actions")}>
            <Item
              icon={<Moon />}
              keywords={["theme", "tema", "dark", "light"]}
              onSelect={run(() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark"),
              )}
            >
              {t("theme.toggle")}
            </Item>
            <Item
              icon={<Languages />}
              keywords={["language", "idioma", other]}
              onSelect={run(switchLocale)}
            >
              {t("language.switchTo")}
            </Item>
            {Object.entries(profile.cv).map(([lang, href]) => (
              <Item
                key={lang}
                icon={<Download />}
                keywords={["cv", "resume", "pdf"]}
                onSelect={run(() => download(href))}
              >
                {t("command.downloadCv", { lang: lang.toUpperCase() })}
              </Item>
            ))}
            <Item
              icon={<Copy />}
              keywords={["email", "mail", "correo", profile.email]}
              onSelect={run(async () => {
                if (await copyText(profile.email))
                  setToast(t("command.emailCopied"));
              })}
            >
              {t("command.copyEmail")}
            </Item>
          </Command.Group>

          <Command.Group heading={t("command.links")}>
            <Item
              icon={<GithubIcon />}
              onSelect={run(() => openExternal(profile.links.github))}
            >
              GitHub
            </Item>
            <Item
              icon={<LinkedinIcon />}
              onSelect={run(() => openExternal(profile.links.linkedin))}
            >
              LinkedIn
            </Item>
            <Item
              icon={<WhatsappIcon />}
              keywords={["whatsapp", "chat", "mensaje", "message"]}
              onSelect={run(() =>
                openExternal(whatsappUrl(t("contact.whatsappMessage"))),
              )}
            >
              WhatsApp
            </Item>
            <Item icon={<Code />} onSelect={run(() => openExternal(REPO_URL))}>
              {t("footer.source")}
            </Item>
          </Command.Group>
        </Command.List>
      </Command.Dialog>

      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center"
      >
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="rounded-full border border-border-strong bg-background px-4 py-2 font-mono text-xs text-foreground shadow-lg"
            >
              {toast}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
