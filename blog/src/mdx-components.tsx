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
 * segue a marca (corpo Inter, títulos Poppins via globals.css). Componentes de
 * conversão ficam expostos para uso direto dentro do MDX.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h2: (props: ComponentProps<"h2">) => {
      const id = props.id || generateId(props.children);
      return <h2 id={id} className="mt-10 mb-3 text-2xl font-bold text-[#0B132B]" {...props} />;
    },
    h3: (props: ComponentProps<"h3">) => {
      const id = props.id || generateId(props.children);
      return <h3 id={id} className="mt-6 mb-2 text-xl font-semibold text-[#0B132B]" {...props} />;
    },
    p: (props: ComponentProps<"p">) => (
      <p className="my-4 leading-relaxed text-[#0B132B]/90" {...props} />
    ),
    ul: (props: ComponentProps<"ul">) => (
      <ul
        className="my-4 list-disc space-y-2 pl-5 text-[#0B132B]/90"
        {...props}
      />
    ),
    ol: (props: ComponentProps<"ol">) => (
      <ol
        className="my-4 list-decimal space-y-2 pl-5 text-[#0B132B]/90"
        {...props}
      />
    ),
    a: (props: ComponentProps<"a">) => (
      <a className="font-medium text-[#00B2B2] hover:underline" {...props} />
    ),
    strong: (props: ComponentProps<"strong">) => (
      <strong className="font-semibold text-[#0B132B]" {...props} />
    ),
    blockquote: (props: ComponentProps<"blockquote">) => (
      <blockquote
        className="my-6 border-l-4 border-[#00B2B2] pl-4 italic text-[#0B132B]/80"
        {...props}
      />
    ),
    table: (props: ComponentProps<"table">) => (
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm" {...props} />
      </div>
    ),
    th: (props: ComponentProps<"th">) => (
      <th
        className="border-b-2 border-[#0B132B] px-4 py-2 font-semibold text-[#0B132B]"
        {...props}
      />
    ),
    td: (props: ComponentProps<"td">) => (
      <td
        className="border-b border-gray-200 px-4 py-2 text-[#0B132B]/90"
        {...props}
      />
    ),
    hr: () => <hr className="my-8 border-gray-200" />,
    AffiliateCTA,
    TabelaComparativa,
    RegulacaoBox,
    FunnelDiagram,
    PricingComparison,
  };
}
