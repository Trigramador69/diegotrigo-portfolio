"use client";

import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { WhatsappIcon } from "@/components/ui/BrandIcons";
import { whatsappUrl } from "@/content/profile";

/**
 * Mobile-only shortcut to WhatsApp. Appears once the hero is scrolled past
 * and hides while the Contact section (which has the same link) is visible.
 */
export function WhatsappFab() {
  const t = useTranslations("contact");
  const [scrolled, setScrolled] = useState(false);
  const [contactInView, setContactInView] = useState(false);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() =>
        setScrolled(window.scrollY > window.innerHeight * 0.6),
      );
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const contact = document.getElementById("contact");
    const observer = new IntersectionObserver(([entry]) =>
      setContactInView(entry.isIntersecting),
    );
    if (contact) observer.observe(contact);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const visible = scrolled && !contactInView;

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={whatsappUrl(t("whatsappMessage"))}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("whatsappFab")}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-30 grid size-13 place-items-center rounded-full bg-accent text-accent-foreground shadow-lg shadow-black/30 md:hidden"
        >
          <WhatsappIcon className="size-6" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
