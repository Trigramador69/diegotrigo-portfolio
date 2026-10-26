import type { MDXComponents } from "mdx/types";
import { ArchitectureDiagram } from "@/components/demo/ArchitectureDiagram";
import { ContentGeneratorDemo } from "@/components/demo/ContentGeneratorDemo";

const components = {
  h2: (props) => (
    <h2
      className="mt-14 mb-4 text-xl font-semibold tracking-tight text-foreground first:mt-0 sm:text-2xl"
      {...props}
    />
  ),
  h3: (props) => (
    <h3 className="mt-8 mb-3 font-medium text-foreground" {...props} />
  ),
  p: (props) => <p className="my-4 text-pretty text-muted" {...props} />,
  ul: (props) => <ul className="my-4 space-y-2 text-muted" {...props} />,
  ol: (props) => (
    <ol className="my-4 list-decimal space-y-2 pl-5 text-muted" {...props} />
  ),
  li: (props) => (
    <li
      className="relative pl-5 before:absolute before:top-[0.7em] before:left-0 before:h-px before:w-2.5 before:bg-border-strong in-[ol]:pl-1 in-[ol]:before:hidden"
      {...props}
    />
  ),
  strong: (props) => (
    <strong className="font-medium text-foreground" {...props} />
  ),
  a: (props) => (
    <a
      className="text-accent-ink underline underline-offset-4 hover:no-underline"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="rounded bg-surface-strong px-1.5 py-0.5 font-mono text-[0.85em] text-foreground"
      {...props}
    />
  ),
  ArchitectureDiagram,
  ContentGeneratorDemo,
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
