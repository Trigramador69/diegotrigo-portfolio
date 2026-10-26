export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://diegotrigoportfolio.vercel.app";

export const REPO_URL = "https://github.com/Trigramador69/diegotrigo-portfolio";

/** Section ids, in page order. Labels live in messages/*.json under `nav`. */
export const SECTIONS = [
  "about",
  "experience",
  "projects",
  "stack",
  "certifications",
  "contact",
] as const;

export type SectionId = (typeof SECTIONS)[number];
