// app/llms.txt/route.ts
// Gera /llms.txt automaticamente a partir do frontmatter dos seus MDX.
// Como você já padroniza silo/cluster/tier/updated/title/description,
// o arquivo se atualiza sozinho a cada artigo publicado.
//
// Requisitos: gray-matter (npm i gray-matter). Ajuste CONTENT_DIR e SILO_LABELS
// para a sua estrutura de pastas real.

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";
import matter from "gray-matter";

export const dynamic = "force-static"; // gera no build; troque para revalidate se preferir ISR

const BASE = "https://funildozero.com.br";
const CONTENT_DIR = join(process.cwd(), "content"); // <-- ajuste à sua pasta de conteúdo

// Rótulos e ordem das seções (silo -> título legível). Os guias por profissão
// são subdivididos por cluster para um mapa mais limpo.
const SILO_LABELS: Record<string, string> = {
  "funil-de-vendas": "Guias de funil por profissão",
  ferramentas: "Comparativos de ferramentas",
  "systeme-io": "Tutoriais da Systeme.io",
  "negocio-digital": "Negócio digital (fundamentos)",
  "copywriting-vendas": "Copywriting e vendas",
};
const CLUSTER_LABELS: Record<string, string> = {
  saude: "Saúde",
  b2b: "Negócios B2B",
  criativo: "Criativo",
  estetica: "Estética",
  educacao: "Educação",
  digital: "Digital",
};

type Doc = {
  url: string;
  title: string;
  description: string;
  silo: string;
  cluster?: string;
  updated?: string;
};

// Varre recursivamente a pasta de conteúdo lendo o frontmatter de cada .mdx/.md.
function collect(dir: string): Doc[] {
  const docs: Doc[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      docs.push(...collect(full));
      continue;
    }
    if (![".mdx", ".md"].includes(extname(entry))) continue;
    const { data } = matter(readFileSync(full, "utf8"));
    if (data.draft || !data.silo || !data.slug) continue; // pula rascunhos e sem rota
    docs.push({
      url: `${BASE}/${data.silo}/${data.slug}`.replace(/\/+$/, ""),
      title: data.title ?? data.slug,
      description: data.description ?? "",
      silo: data.silo,
      cluster: data.cluster,
      updated: data.updated,
    });
  }
  return docs;
}

function buildLlmsTxt(docs: Doc[]): string {
  const lines: string[] = [];
  lines.push("# Funil do Zero", "");
  lines.push(
    "> Blog brasileiro que ensina profissionais autônomos, prestadores de serviço e infoprodutores a captar clientes construindo funis de vendas. Guias por profissão, comparativos de ferramentas e tutoriais — com foco na plataforma Systeme.io.",
    ""
  );

  const line = (d: Doc) =>
    `- [${d.title}](${d.url})${d.description ? `: ${d.description}` : ""}`;

  for (const [silo, label] of Object.entries(SILO_LABELS)) {
    const inSilo = docs.filter((d) => d.silo === silo);
    if (inSilo.length === 0) continue;

    // Silo 1 é subdividido por cluster; os demais viram uma seção única.
    if (silo === "funil-de-vendas") {
      for (const [cl, clLabel] of Object.entries(CLUSTER_LABELS)) {
        const items = inSilo.filter((d) => d.cluster === cl);
        if (!items.length) continue;
        lines.push(`## ${label} — ${clLabel}`);
        items.forEach((d) => lines.push(line(d)));
        lines.push("");
      }
    } else {
      lines.push(`## ${label}`);
      inSilo.forEach((d) => lines.push(line(d)));
      lines.push("");
    }
  }

  lines.push("## Optional");
  lines.push(`- [Página inicial](${BASE}/): apresentação do blog e portas para os silos.`);
  lines.push("");
  return lines.join("\n");
}

export function GET() {
  const body = buildLlmsTxt(collect(CONTENT_DIR));
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
