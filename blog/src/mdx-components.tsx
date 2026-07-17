import type { MDXComponents } from "mdx/types";
import type { ComponentProps } from "react";
import { AffiliateCTA } from "@/components/conversion/AffiliateCTA";
import { TabelaComparativa } from "@/components/conversion/TabelaComparativa";
import { RegulacaoBox } from "@/components/mdx/RegulacaoBox";
import { FunnelDiagram } from "@/components/mdx/FunnelDiagram";
import { PricingComparison } from "@/components/mdx/PricingComparison";

function getText(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(getText).join("");
  if (typeof children === "object" && children !== null && "props" in (children as any)) {
    return getText((children as any).props.children);
  }
  return "";
}

function generateId(children: React.ReactNode): string {
  const text = getText(children);
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/**
 * Estilos e componentes disponíveis em todo MDX (artigos-pilar). A tipografia
 * base vem de .prose-fdz (globals.css) — aqui ficam apenas os overrides
 * estruturais (id para ToC, wrapper de tabela) e os componentes registrados.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    // IDs gerados para o Table of Contents e rehype-slug fallback
    h2: (props: ComponentProps<"h2">) => {
      const id = props.id || generateId(props.children);
      return <h2 id={id} {...props} />;
    },
    h3: (props: ComponentProps<"h3">) => {
      const id = props.id || generateId(props.children);
      return <h3 id={id} {...props} />;
    },
    // Wrapper para tabelas e estilos explícitos para garantir o layout (fallback robusto)
    table: (props: ComponentProps<"table">) => (
      <div className="table-wrapper my-6 overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full border-collapse text-left text-sm" {...props} />
      </div>
    ),
    th: (props: ComponentProps<"th">) => (
      <th
        className="bg-[#115e59] px-4 py-3 text-left text-[0.85em] font-semibold tracking-wide text-white"
        {...props}
      />
    ),
    td: (props: ComponentProps<"td">) => (
      <td
        className="border-b border-gray-200 px-4 py-3 text-[#292524] align-top"
        {...props}
      />
    ),
    tr: (props: ComponentProps<"tr">) => (
      <tr className="even:bg-[#f5f5f4]" {...props} />
    ),
    // Componentes registrados para uso dentro do MDX
    AffiliateCTA,
    TabelaComparativa,
    RegulacaoBox,
    FunnelDiagram,
    PricingComparison,
  };
}
