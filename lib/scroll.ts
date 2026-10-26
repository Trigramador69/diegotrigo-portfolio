import type Lenis from "lenis";

let lenis: Lenis | null = null;

export function registerLenis(instance: Lenis | null) {
  lenis = instance;
}

/** Scrolls to a section id, through Lenis when it is active. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;
  if (lenis) {
    lenis.scrollTo(el, { offset: -80 });
  } else {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    el.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  }
  history.replaceState(null, "", `#${id}`);
  return true;
}

export const COMMAND_MENU_EVENT = "command-menu:open";

export function openCommandMenu() {
  window.dispatchEvent(new Event(COMMAND_MENU_EVENT));
}
