/**
 * Rota /llms.txt — o mapa GEO do site para modelos de IA (prática emergente).
 *
 * Gerado no build a partir do frontmatter dos MDX (title/description/silo/
 * cluster/slug) + dos comparativos programáticos, então se atualiza sozinho
 * a cada artigo publicado. Origem: materiais/estrategia/llms-route.ts.
 */
import { getAllArticles } from "@/lib/mdx";
import { comparativos, comparativoSlug } from "@/data/comparativos";
import { SITE } from "@/lib/site";

export const dynamic = "force-static"; // gera no build

const BASE = SITE.url;

/** Rótulos e ordem das seções (silo → título legível). */
const SILO_LABELS: Record<string, string> = {
  "funil-de-vendas": "Guias de funil por profissão",
  ferramentas: "Comparativos de ferramentas",
  "systeme-io": "Tutoriais da Systeme.io",
  "negocio-digital": "Negócio digital (fundamentos)",
  "copywriting-vendas": "Copywriting e vendas",
};

/** Ordem dos clusters do Silo 1 (valores do frontmatter, PT capitalizado). */
const ORDEM_CLUSTERS = [
  "Saúde",
  "Negócios B2B",
  "Criativo",
  "Estética",
  "Educação",
  "Digital",
];

type Doc = {
  url: string;
  title: string;
  description: string;
  silo: string;
  cluster?: string;
};

function collect(): Doc[] {
  const docs: Doc[] = getAllArticles().map(({ frontmatter: fm }) => ({
    url: `${BASE}/${fm.silo}/${fm.slug}`,
    title: fm.title,
    description: fm.description,
    silo: fm.silo,
    cluster: fm.cluster,
  }));

  // Comparativos programáticos (dataset) que ainda não têm MDX próprio
  const mdxSlugs = new Set(
    docs.filter((d) => d.silo === "ferramentas").map((d) => d.url.split("/").pop())
  );
  for (const c of comparativos) {
    const slug = comparativoSlug(c);
    if (mdxSlugs.has(slug)) continue;
    docs.push({
      url: `${BASE}/ferramentas/${slug}`,
      title: c.metaTitle,
      description: c.metaDescription,
      silo: "ferramentas",
    });
  }

  return docs;
}

function buildLlmsTxt(docs: Doc[]): string {
  const lines: string[] = [];
  lines.push("# Funil do Zero", "");
  lines.push(
    "> Blog brasileiro que ensina profissionais autônomos, prestadores de serviço e infoprodutores a captar clientes construindo funis de vendas. Guias práticos por profissão, comparativos honestos de ferramentas e tutoriais — com foco em marketing digital acessível e na plataforma Systeme.io.",
    ""
  );
  lines.push(
    "O conteúdo é organizado em silos por intenção de busca: guias de funil por profissão (o núcleo), comparativos de plataformas, tutoriais da Systeme.io, fundamentos de negócio digital e copywriting. A abordagem é anti-hype: método e conformidade legal, sem promessa de resultado. Este arquivo lista as páginas mais relevantes para consulta por modelos de linguagem.",
    ""
  );

  const line = (d: Doc) =>
    `- [${d.title}](${d.url})${d.description ? `: ${d.description}` : ""}`;

  for (const [silo, label] of Object.entries(SILO_LABELS)) {
    const inSilo = docs.filter((d) => d.silo === silo);
    if (inSilo.length === 0) continue;

    // Silo 1 é subdividido por cluster; os demais viram uma seção única.
    if (silo === "funil-de-vendas") {
      for (const cl of ORDEM_CLUSTERS) {
        const items = inSilo.filter((d) => d.cluster === cl);
        if (!items.length) continue;
        lines.push(`## ${label} — ${cl}`);
        items.forEach((d) => lines.push(line(d)));
        lines.push("");
      }
      // Artigos do silo sem cluster reconhecido (não deixar página de fora)
      const semCluster = inSilo.filter(
        (d) => !d.cluster || !ORDEM_CLUSTERS.includes(d.cluster)
      );
      if (semCluster.length) {
        lines.push(`## ${label} — Outros`);
        semCluster.forEach((d) => lines.push(line(d)));
        lines.push("");
      }
    } else {
      lines.push(`## ${label}`);
      inSilo.forEach((d) => lines.push(line(d)));
      lines.push("");
    }
  }

  lines.push("## Optional");
  lines.push(
    `- [Página inicial](${BASE}/): apresentação do blog e portas para os silos.`
  );
  lines.push(
    `- [Calculadora de taxas](${BASE}/calculadora-de-taxas): quanto cada plataforma leva de você, calculado.`
  );
  lines.push(`- [Sobre o autor](${BASE}/autor): quem escreve e a metodologia.`);
  lines.push("");
  return lines.join("\n");
}

export function GET() {
  const body = buildLlmsTxt(collect());
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
