# Portafolio — Diego Trigo Gutierrez

Portafolio personal de **Diego Trigo Gutierrez, AI Engineer · Full Stack Developer**.
Objetivo: mostrar en menos de 30 segundos que construyo productos de IA reales (LLMs, automatización, SaaS multitenant), con un diseño limpio y detalles animados que se noten sin cansar.

Reemplaza a `diegotrigoportfolio.vercel.app`. Bilingüe (ES / EN), igual que el CV.

---

## 1. Principios de diseño

1. **Clean primero.** Mucho espacio, una sola tipografía, un color de acento. El contenido manda.
2. **Animación con propósito.** Cada efecto guía la lectura o da feedback. Si no hace ninguna de las dos cosas, se quita.
3. **Máximo un "momento wow" por sección.** El resto, transiciones sutiles (opacidad y desplazamiento de 8–16 px).
4. **Rápido.** Solo se animan `transform` y `opacity`. Nada de librerías 3D pesadas.
5. **Accesible.** Todo respeta `prefers-reduced-motion`; con esa opción activa, las animaciones se reducen a fundidos.

---

## 2. Dirección visual: "AI Lab" minimal

Fondo oscuro por defecto (con modo claro), una grilla de puntos muy tenue y un acento único.

| Elemento | Decisión |
| --- | --- |
| Tema | Oscuro por defecto `#0A0A0B`, modo claro `#FAFAF9` |
| Acento | Un solo color, p. ej. verde lima `#B4F461` o azul eléctrico `#5B8CFF` (definir uno) |
| Tipografía | **Geist Sans** para texto, **Geist Mono** para etiquetas, fechas y stack |
| Layout | Columna centrada de ~720 px para texto; grilla *bento* para proyectos |
| Bordes | 1 px, `white/8%`, radio 12–16 px |
| Íconos | lucide-react |

### Detalles que resaltan (la lista cerrada; no agregar más sin quitar otro)

| Dónde | Efecto | Cómo |
| --- | --- | --- |
| Hero | El título aparece palabra por palabra con desenfoque → nítido | Motion, `staggerChildren` |
| Hero | Línea "prompt" que se escribe sola: `> generate post --icp "retail" --format carousel` | Efecto máquina de escribir, una sola vez |
| Fondo | Grilla de puntos que se ilumina levemente alrededor del cursor | CSS `radial-gradient` + variable con la posición del mouse |
| Tarjetas de proyecto | *Spotlight*: brillo del borde que sigue al cursor | CSS variables, sin JS pesado |
| Secciones | Revelado al hacer scroll (fade + 12 px hacia arriba) | Motion `whileInView`, `once: true` |
| Experiencia | Línea de tiempo cuyo trazo se "dibuja" con el scroll | Motion `useScroll` + `scaleY` |
| Navegación | Indicador de la sección activa que se desliza entre ítems | Motion `layoutId` |
| Global | Paleta de comandos `⌘K` / `Ctrl+K`: ir a secciones, cambiar idioma/tema, descargar CV, copiar email | cmdk |
| Caso de estudio | Demo simulada del módulo de contenido (ver §5) | Componente propio, datos ficticios |

Scroll suave con Lenis, solo en escritorio.

---

## 3. Stack tecnológico

Lo mismo que uso en el trabajo, para que el propio código del portafolio también funcione como muestra.

| Capa | Herramienta | Por qué |
| --- | --- | --- |
| Framework | **Next.js 16** (App Router, Server Components) | SSG, SEO, imágenes optimizadas |
| Lenguaje | **TypeScript** en modo estricto | |
| UI | **React 19** | |
| Estilos | **Tailwind CSS v4** | Tokens de diseño en `@theme` |
| Componentes | **shadcn/ui** (solo lo necesario) | Botones, dialog, tooltip |
| Animación | **Motion** (`motion/react`, ex Framer Motion) | Revelados, layout animations, scroll |
| Scroll suave | **Lenis** | Suave pero liviano |
| Paleta de comandos | **cmdk** | `⌘K` |
| i18n | **next-intl** | Rutas `/es` y `/en` |
| Contenido | Archivos **MDX** para los casos de estudio + datos tipados en `content/*.ts` | Editar sin tocar componentes |
| Tema | **next-themes** | Oscuro / claro sin parpadeo |
| Íconos | **lucide-react** | |
| OG images | `next/og` | Vista previa al compartir en LinkedIn |
| Analítica | Vercel Analytics + Speed Insights | |
| Calidad | ESLint, Prettier, `tsc --noEmit` en CI | |
| Gestor | **pnpm** | |
| Deploy | **Vercel** | |

Sin backend: el contacto es `mailto:` + enlaces. Se puede agregar un formulario con Resend más adelante.

---

## 4. Secciones

1. **Hero:** nombre, título "AI Engineer · Full Stack Developer", una línea de valor, la línea "prompt" animada, botones *Ver proyectos* y *Descargar CV (ES/EN)*. Indicador "Disponible para remoto".
2. **Sobre mí:** 3–4 líneas (base: el perfil profesional del CV) + foto.
3. **Experiencia:** línea de tiempo animada.
   - Full Stack AI Engineer — zékiri · Jun 2026 – actualidad
   - Automation Developer — zékiri · Feb – May 2026
   - University Ambassador — Ethereum Bolivia · 2025 – Jun 2026
4. **Proyectos destacados:** grilla bento.
   - **Plataforma SaaS multitenant — zékiri** (tarjeta grande, con caso de estudio)
   - **HireTree:** 1er lugar, track AI & Web3, ETH Bolivia Buildathon 2025 (caso de estudio)
   - Proyectos secundarios en tarjetas chicas (MusiciUs, Scholar-Fi), opcionales
5. **Stack:** grupos (IA y automatización, Frontend, Backend, Web3, Datos, Herramientas) como chips en Geist Mono. Sin barras de porcentaje.
6. **Certificaciones y logros:** certificado NFT de la ETH Bolivia Buildathon (con enlace on-chain) y n8n AI Agent Builder.
7. **Contacto:** email (copiar al portapapeles), LinkedIn, GitHub, descarga del CV.

Footer: "Built with Next.js · Motion · Tailwind" + enlace al repositorio.

---

## 5. Casos de estudio (`/projects/[slug]`)

Estructura fija para cada uno: **Problema → Mi rol → Solución → Arquitectura → Stack → Resultado**.

### Plataforma SaaS multitenant (zékiri): confidencial

- **No** usar el nombre interno del producto, nombres de clientes, capturas reales, URLs internas ni métricas no aprobadas.
- Contar: plataforma multitenant con más de 15 módulos (POS, órdenes, suscripciones, CRM, entregas, finanzas, contenido…), aislamiento por `tenant_id` con RLS en Postgres, monorepo Turborepo con tres apps Next.js.
- **Foco:** el módulo de contenido con IA que construí desde cero. Genera posts de LinkedIn a partir del contexto del negocio, su ICP y las reglas de la plataforma, además de carruseles e imágenes con IA, uno por uno o por lotes programados.
- **Demo simulada:** un mini-panel donde se elige ICP, tono y formato → animación de "generando" → aparece un post/carrusel de ejemplo. Todo con datos ficticios y sin llamadas a APIs.
- **Diagrama de arquitectura:** un SVG propio y genérico (contexto → reglas → LLM → revisión → programación).

### HireTree

- Evaluación de soft skills con LLMs + credenciales verificables (CV-NFT) en Arbitrum y Avalanche. Construido en 72 h, en equipo de tres.
- Enlaces: repositorio, demo (si sigue activa) y certificado on-chain.

---

## 6. Estructura del proyecto

```
portfolio/
├─ app/
│  ├─ [locale]/
│  │  ├─ layout.tsx          # fuentes, tema, Lenis, ⌘K
│  │  ├─ page.tsx            # home con todas las secciones
│  │  └─ projects/[slug]/page.tsx
│  ├─ opengraph-image.tsx
│  └─ sitemap.ts / robots.ts
├─ components/
│  ├─ sections/              # Hero, About, Experience, Projects, Stack, Contact
│  ├─ motion/                # Reveal, WordStagger, Typewriter, ScrollTimeline
│  ├─ ui/                    # shadcn + SpotlightCard, DotGrid, CommandMenu
│  └─ demo/ContentGeneratorDemo.tsx
├─ content/
│  ├─ profile.ts             # datos tipados (experiencia, skills, certs)
│  └─ projects/*.mdx         # casos de estudio ES/EN
├─ messages/es.json, en.json # textos de UI
├─ public/cv/                # CV_Diego_Trigo_Gutierrez_ES.pdf / _EN.pdf
└─ lib/                      # utils, constantes, tokens
```

El contenido se edita en `content/` y `messages/`; los componentes no tienen texto hardcodeado.

---

## 7. Requisitos de calidad

- Lighthouse ≥ 95 en Performance, Accessibility, Best Practices y SEO (móvil).
- LCP < 2 s, CLS ≈ 0. El hero no espera a ninguna animación para mostrar el texto.
- Responsive desde 360 px. En móvil se desactivan el spotlight y el brillo del cursor.
- `prefers-reduced-motion` respetado en todos los componentes de `components/motion/`.
- Navegable con teclado; foco visible; contraste AA en ambos temas.
- Metadatos y OG por idioma; `hreflang` ES/EN.

---

## 8. Plan de construcción

1. Scaffold: Next.js + TS + Tailwind v4 + shadcn + next-intl + next-themes. Tokens de diseño.
2. Layout base: navegación con indicador, footer, fondo de puntos, tema.
3. Primitivas de animación (`Reveal`, `WordStagger`, `Typewriter`, `ScrollTimeline`) con reduced-motion.
4. Secciones de la home con contenido real desde `content/`.
5. Tarjetas bento con spotlight + páginas de casos de estudio (MDX).
6. Demo del módulo de contenido.
7. Paleta `⌘K`.
8. SEO, OG images, sitemap, analítica.
9. Pasada de rendimiento y accesibilidad → deploy en Vercel.

---

## 9. Pendientes de Diego

- [ ] Elegir el color de acento
- [ ] Foto (fondo neutro, buena luz)
- [ ] URL de GitHub y repositorios públicos a enlazar
- [ ] Link on-chain del certificado de ETH Bolivia
- [ ] Confirmar con zékiri qué se puede mostrar del caso de estudio
- [ ] PDFs finales del CV en ES y EN
- [ ] ¿Dominio propio? (p. ej. `diegotrigo.dev`)
# diegotrigo-portfolio
