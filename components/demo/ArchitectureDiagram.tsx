import { useTranslations } from "next-intl";

const NODES = ["context", "rules", "llm", "review", "schedule"] as const;
type Node = (typeof NODES)[number];

function NodeBox({
  x,
  y,
  w,
  h,
  label,
  sub,
  accent,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub: string;
  accent?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={12}
        fill={accent ? "var(--surface-strong)" : "var(--surface)"}
        stroke={accent ? "var(--accent-ink)" : "var(--border-strong)"}
      />
      <text
        x={x + w / 2}
        y={y + h / 2 - 4}
        textAnchor="middle"
        fill="var(--foreground)"
        fontSize={14}
        fontWeight={500}
      >
        {label}
      </text>
      <text
        x={x + w / 2}
        y={y + h / 2 + 15}
        textAnchor="middle"
        fill="var(--subtle)"
        fontSize={11}
        fontFamily="var(--font-geist-mono)"
      >
        {sub}
      </text>
    </g>
  );
}

/** Generic, product-agnostic flow of the AI content module. */
export function ArchitectureDiagram() {
  const t = useTranslations("diagram");
  const label = (n: Node) => t(n);
  const sub = (n: Node) => t(`${n}Sub`);

  // Horizontal layout (sm and up)
  const w = 124;
  const h = 76;
  const gap = 25;
  // Vertical layout (mobile)
  const vw = 220;
  const vh = 64;
  const vgap = 28;

  return (
    <figure className="not-prose my-10">
      <div className="rounded-2xl border border-border bg-surface p-4 sm:p-6">
        <svg
          viewBox={`0 0 ${NODES.length * w + (NODES.length - 1) * gap} 140`}
          className="hidden w-full sm:block"
          role="img"
          aria-label={t("title")}
        >
          <defs>
            <marker
              id="arrow-h"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--subtle)" />
            </marker>
          </defs>
          {NODES.map((n, i) => {
            const x = i * (w + gap);
            return (
              <g key={n}>
                <NodeBox
                  x={x}
                  y={10}
                  w={w}
                  h={h}
                  label={label(n)}
                  sub={sub(n)}
                  accent={n === "llm"}
                />
                {i < NODES.length - 1 && (
                  <line
                    x1={x + w + 3}
                    y1={10 + h / 2}
                    x2={x + w + gap - 3}
                    y2={10 + h / 2}
                    stroke="var(--subtle)"
                    markerEnd="url(#arrow-h)"
                  />
                )}
              </g>
            );
          })}
          {/* Review sends feedback back to the LLM */}
          <path
            d={`M ${3 * (w + gap) + w / 2} ${10 + h + 4} C ${3 * (w + gap) + w / 2} 130, ${2 * (w + gap) + w / 2} 130, ${2 * (w + gap) + w / 2} ${10 + h + 6}`}
            fill="none"
            stroke="var(--accent-ink)"
            strokeDasharray="4 4"
            markerEnd="url(#arrow-h)"
          />
        </svg>

        <svg
          viewBox={`0 0 ${vw + 60} ${NODES.length * vh + (NODES.length - 1) * vgap}`}
          className="mx-auto block w-full max-w-xs sm:hidden"
          role="img"
          aria-label={t("title")}
        >
          <defs>
            <marker
              id="arrow-v"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--subtle)" />
            </marker>
          </defs>
          {NODES.map((n, i) => {
            const y = i * (vh + vgap);
            return (
              <g key={n}>
                <NodeBox
                  x={10}
                  y={y}
                  w={vw}
                  h={vh}
                  label={label(n)}
                  sub={sub(n)}
                  accent={n === "llm"}
                />
                {i < NODES.length - 1 && (
                  <line
                    x1={10 + vw / 2}
                    y1={y + vh + 3}
                    x2={10 + vw / 2}
                    y2={y + vh + vgap - 3}
                    stroke="var(--subtle)"
                    markerEnd="url(#arrow-v)"
                  />
                )}
              </g>
            );
          })}
          <path
            d={`M ${10 + vw + 2} ${3 * (vh + vgap) + vh / 2} C ${vw + 50} ${3 * (vh + vgap) + vh / 2}, ${vw + 50} ${2 * (vh + vgap) + vh / 2}, ${10 + vw + 4} ${2 * (vh + vgap) + vh / 2}`}
            fill="none"
            stroke="var(--accent-ink)"
            strokeDasharray="4 4"
            markerEnd="url(#arrow-v)"
          />
        </svg>
      </div>
      <figcaption className="mt-3 text-center font-mono text-xs text-subtle">
        {t("title")}
      </figcaption>
    </figure>
  );
}
