import type { Locale } from "@/i18n/routing";

/** A string available in every supported locale. */
export type Localized = Record<Locale, string>;

export function t(value: Localized, locale: Locale) {
  return value[locale];
}

export const profile = {
  name: "Diego Trigo Gutierrez",
  shortName: "Diego Trigo",
  initials: "DT",
  title: "AI Engineer · Full Stack Developer",
  location: "Cochabamba, Bolivia",
  email: "trigobol23@gmail.com",
  /** Path under /public. null shows the initials instead. */
  photo: "/images/diego-trigo.jpg" as string | null,
  links: {
    github: "https://github.com/Trigramador69",
    linkedin: "https://www.linkedin.com/in/diego-trigo-gutierrez-a25641340",
  },
  /** International format, digits only (used for wa.me links). */
  whatsapp: "59179328447",
  /** CV files under /public. A missing locale falls back to the other one. */
  cv: {
    es: "/cv/CV_Diego_Trigo_Gutierrez_ES.pdf",
    en: "/cv/CV_Diego_Trigo_Gutierrez_EN.pdf",
  } as Partial<Record<Locale, string>>,
  tagline: {
    es: "Construyo productos de IA que llegan a producción: LLMs, automatización y SaaS multitenant.",
    en: "I build AI products that make it to production: LLMs, automation and multitenant SaaS.",
  } satisfies Localized,
  about: {
    es: [
      "Soy Full Stack AI Engineer en zékiri, donde diseño y construyo productos de IA de punta a punta: pipelines con LLMs, automatizaciones e interfaces web para SaaS. Ahí construí desde cero el módulo de contenido con IA de una plataforma multitenant con más de 15 módulos.",
      "Escribo y reviso código en TypeScript, Python, Solidity, Kotlin y C#, con foco en prompt engineering, evaluación de salidas de modelos y calidad de código.",
      "Estudio el último año de Ingeniería de Sistemas en la Universidad Católica Boliviana y fui embajador universitario de Ethereum Bolivia. Con mi equipo ganamos el track AI & Web3 de la ETH Bolivia Buildathon 2025.",
    ],
    en: [
      "I'm a Full Stack AI Engineer at zékiri, where I design and build end-to-end AI products: LLM pipelines, automations and web interfaces for SaaS. There I built the AI content module of a multitenant platform with 15+ modules from scratch.",
      "I write and review code in TypeScript, Python, Solidity, Kotlin and C#, with a focus on prompt engineering, evaluating model outputs and code quality.",
      "I'm a final-year Systems Engineering student at Universidad Católica Boliviana and a former University Ambassador for Ethereum Bolivia. My team won the AI & Web3 track at ETH Bolivia Buildathon 2025.",
    ],
  } satisfies Record<Locale, string[]>,
};

/** wa.me link that opens a chat with a prefilled first message. */
export function whatsappUrl(message: string) {
  return `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** The CV for `locale`, or the one that exists when it is missing. */
export function getCv(locale: Locale) {
  const href = profile.cv[locale];
  if (href) return { href, lang: locale };
  const fallback = (Object.keys(profile.cv) as Locale[])[0];
  return fallback ? { href: profile.cv[fallback]!, lang: fallback } : null;
}

export const education = {
  degree: { es: "Ingeniería de Sistemas", en: "B.S. Systems Engineering" },
  school: 'Universidad Católica Boliviana "San Pablo"',
  place: "Cochabamba",
  period: {
    es: "Feb 2022 – Dic 2026 (egreso previsto)",
    en: "Feb 2022 – Dec 2026 (expected)",
  },
} satisfies {
  degree: Localized;
  school: string;
  place: string;
  period: Localized;
};

export const languages: { name: Localized; level: Localized }[] = [
  {
    name: { es: "Español", en: "Spanish" },
    level: { es: "Nativo", en: "Native" },
  },
  {
    name: { es: "Inglés", en: "English" },
    level: {
      es: "Intermedio-avanzado · lectura y escritura técnica diaria",
      en: "Upper-intermediate · daily technical reading and writing",
    },
  },
];

export type Experience = {
  role: string;
  company: string;
  period: Localized;
  current?: boolean;
  highlights: Record<Locale, string[]>;
};

export const experience: Experience[] = [
  {
    role: "Full Stack AI Engineer",
    company: "zékiri",
    period: { es: "Jun 2026 – actualidad", en: "Jun 2026 – present" },
    current: true,
    highlights: {
      es: [
        "Diseño y construyo productos de IA de punta a punta, desde pipelines con LLMs hasta la interfaz.",
        "Desarrollo soluciones full stack para productos SaaS escalables.",
        "Automatizo procesos de negocio con n8n e integraciones de APIs.",
        "Traduzco requisitos de negocio en sistemas técnicos escalables y de alto rendimiento.",
        "Aplico prompt engineering e investigación técnica para elegir y ajustar modelos y herramientas.",
      ],
      en: [
        "Design and build end-to-end AI products, from LLM pipelines to user interfaces.",
        "Develop full-stack solutions for scalable SaaS products.",
        "Automate business processes with n8n and API integrations.",
        "Translate business requirements into scalable, high-performance technical systems.",
        "Apply prompt engineering and technical research to select and tune models and tools.",
      ],
    },
  },
  {
    role: "Automation Developer",
    company: "zékiri",
    period: { es: "Feb – May 2026", en: "Feb – May 2026" },
    highlights: {
      es: [
        "Diseñé y construí flujos de automatización con n8n.",
        "Evalué e integré nuevas herramientas y APIs para ampliar las capacidades del sistema.",
        "Analicé tendencias de mercado y comportamiento de usuarios para mejorar la usabilidad del producto.",
      ],
      en: [
        "Designed and built automation workflows with n8n.",
        "Evaluated and integrated new tools and APIs to extend system capabilities.",
        "Analyzed market trends and user behavior to improve product usability.",
      ],
    },
  },
  {
    role: "University Ambassador",
    company: "Ethereum Bolivia",
    period: { es: "2025 – Jun 2026", en: "2025 – Jun 2026" },
    highlights: {
      es: [
        "Conecté a la comunidad de Ethereum con universidades bolivianas.",
        "Organicé y di charlas sobre Web3 y desarrollo descentralizado para audiencias técnicas y generales.",
      ],
      en: [
        "Connected the Ethereum community with Bolivian universities.",
        "Organized and delivered talks on Web3 and decentralized development for technical and general audiences.",
      ],
    },
  },
];

export type ProjectSlug = "multitenant-saas" | "hiretree";

export type Project = {
  slug: ProjectSlug;
  title: Localized;
  summary: Localized;
  badge?: Localized;
  confidential?: boolean;
  period: Localized;
  role: Localized;
  stack: string[];
  links: { label: Localized; href: string }[];
  /** Shown as a module map on the project card; `highlight` marks my module. */
  modules?: { name: Localized; highlight?: boolean }[];
};

export const projects: Project[] = [
  {
    slug: "multitenant-saas",
    title: {
      es: "Plataforma SaaS multitenant",
      en: "Multitenant SaaS platform",
    },
    summary: {
      es: "Más de 15 módulos sobre Postgres con RLS. Construí desde cero el módulo de contenido con IA: posts, carruseles e imágenes a partir del contexto de cada negocio.",
      en: "15+ modules on Postgres with RLS. I built the AI content module from scratch: posts, carousels and images from each business's context.",
    },
    badge: { es: "zékiri · confidencial", en: "zékiri · confidential" },
    confidential: true,
    period: { es: "2026 – actualidad", en: "2026 – present" },
    role: {
      es: "Full Stack AI Engineer",
      en: "Full Stack AI Engineer",
    },
    stack: [
      "TypeScript",
      "Next.js 16",
      "React 19",
      "Supabase",
      "Drizzle ORM",
      "Turborepo",
      "Tailwind CSS v4",
      "shadcn/ui",
      "Zod",
      "LLMs",
    ],
    links: [],
    modules: [
      { name: { es: "POS", en: "POS" } },
      { name: { es: "Órdenes", en: "Orders" } },
      { name: { es: "Suscripciones", en: "Subscriptions" } },
      { name: { es: "Gift cards", en: "Gift cards" } },
      { name: { es: "Contenido IA", en: "AI content" }, highlight: true },
      { name: { es: "CRM", en: "CRM" } },
      { name: { es: "Entregas", en: "Deliveries" } },
      { name: { es: "+8 módulos", en: "+8 modules" } },
    ],
  },
  {
    slug: "hiretree",
    title: { es: "HireTree", en: "HireTree" },
    summary: {
      es: "Evaluación de soft skills con LLMs y credenciales verificables on-chain (CV-NFT) en Arbitrum y Avalanche. Construido en 72 h, en equipo de tres.",
      en: "Soft-skill assessment with LLMs and verifiable on-chain credentials (CV-NFT) on Arbitrum and Avalanche. Built in 72 h by a team of three.",
    },
    badge: {
      es: "1er lugar · ETH Bolivia Buildathon 2025",
      en: "1st place · ETH Bolivia Buildathon 2025",
    },
    period: { es: "2025 · 72 h", en: "2025 · 72 h" },
    role: {
      es: "Desarrollador full stack e IA (equipo de 3)",
      en: "Full stack & AI developer (team of 3)",
    },
    stack: [
      "Next.js",
      "TypeScript",
      "LLMs",
      "Solidity",
      "Smart contracts",
      "Arbitrum",
      "Avalanche",
    ],
    // TODO(Diego): add the repository and demo URLs.
    links: [
      {
        label: { es: "Certificado del premio", en: "Award certificate" },
        href: "/certificates/eth-bolivia-2025-ai-web3-winner.pdf",
      },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export type StackGroup = { title: Localized; items: string[] };

export const stack: StackGroup[] = [
  {
    title: { es: "IA y automatización", en: "AI & automation" },
    items: [
      "LLMs",
      "Prompt engineering",
      "Model output evaluation",
      "AI agents",
      "n8n",
      "API integration",
    ],
  },
  {
    title: { es: "Lenguajes", en: "Languages" },
    items: [
      "TypeScript",
      "JavaScript",
      "Python",
      "Solidity",
      "Kotlin",
      "C#",
      "Java",
      "C++",
    ],
  },
  {
    title: { es: "Frontend", en: "Frontend" },
    items: [
      "React",
      "Next.js (App Router)",
      "Tailwind CSS",
      "shadcn/ui",
      "HTML5",
    ],
  },
  {
    title: { es: "Backend", en: "Backend" },
    items: [
      "Node.js",
      "NestJS",
      "Supabase",
      "Drizzle ORM",
      "Microservices",
      "WebSockets",
      "ASP.NET",
    ],
  },
  {
    title: { es: "Web3", en: "Web3" },
    items: ["Smart contracts", "Ethers.js", "Web3.js", "Arbitrum", "Avalanche"],
  },
  {
    title: { es: "Bases de datos", en: "Databases" },
    items: ["PostgreSQL", "MySQL", "MongoDB", "Firebase"],
  },
  {
    title: { es: "Herramientas y métodos", en: "Tools & methods" },
    items: [
      "Git",
      "Turborepo",
      "pnpm",
      "Figma",
      "Scrum",
      "Jira",
      "Linear",
      "Notion",
    ],
  },
];

export type Certification = {
  title: Localized;
  issuer: string;
  date: Localized;
  description: Localized;
  /** Verification or document URL. null hides the link. */
  link: { kind: "onchain" | "document"; href: string } | null;
};

export const certifications: Certification[] = [
  {
    title: {
      es: "Ganador del track AI & Web3",
      en: "AI & Web3 Track Winner",
    },
    issuer: "ETH Bolivia Buildathon · Ethereum Bolivia & Unlock Protocol DAO",
    date: { es: "2025", en: "2025" },
    description: {
      es: "Certificado NFT emitido on-chain por ganar el track AI & Web3 con HireTree.",
      en: "NFT certificate issued on-chain for winning the AI & Web3 track with HireTree.",
    },
    // TODO(Diego): replace with the on-chain contract/token URL ("onchain").
    link: {
      kind: "document",
      href: "/certificates/eth-bolivia-2025-ai-web3-winner.pdf",
    },
  },
  {
    title: {
      es: "n8n: No Code AI Agent Builder",
      en: "n8n: No Code AI Agent Builder",
    },
    issuer: "Simplilearn SkillUp",
    date: { es: "Feb 2026", en: "Feb 2026" },
    description: {
      es: "Curso de diseño de agentes de IA y flujos de automatización en n8n (código 9811649).",
      en: "Course on designing AI agents and automation workflows in n8n (code 9811649).",
    },
    link: null,
  },
];
