/**
 * Template híbrido para artigos satélite do Silo 2 (Comparativos).
 *
 * Renderiza o corpo MDX (prosa editorial única) enquanto injeta
 * dados estruturados do frontmatter para schema, tabela comparativa,
 * prós/contras e fontes. Elimina o "template fill" — o corpo textual
 * vem do .mdx individual, não de variáveis swappadas.
 */
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { SITE, absoluteUrl, AFFILIATE_DISCLOSURE } from "@/lib/site";
import {
  articleSchema,
  breadcrumbSchema,
  faqPageSchema,
} from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { AffiliateCTA } from "@/components/conversion/AffiliateCTA";
import { TabelaComparativa } from "@/components/conversion/TabelaComparativa";
import { TableOfContents } from "@/components/layout/TableOfContents";
import { comparativos, comparativoSlug, FONTE_SYSTEME } from "@/data/comparativos";
import rehypeSlug from "rehype-slug";
import type { ArticleData } from "@/lib/mdx";
import { mdxComponents } from "@/components/mdx/mdxComponents";

interface ArticleTemplateComparativoProps {
  article: ArticleData;
}

export function ArticleTemplateComparativo({
  article,
}: ArticleTemplateComparativoProps) {
  const { frontmatter, content } = article;
  const rival = frontmatter.rival ?? "";
  const url = `/${frontmatter.silo}/${frontmatter.slug}`;
  const atualizado = frontmatter.updatedAt ?? frontmatter.date;
  const faq = frontmatter.faq ?? [];
  const fontes = [...(frontmatter.fontes ?? []), FONTE_SYSTEME];
  const refBase = `${frontmatter.silo}-${frontmatter.slug}`;

  // Comparativos relacionados (exclui o atual)
  const relacionados = comparativos
    .filter((c) => c.nome !== rival)
    .slice(0, 5);

  const schema = [
    breadcrumbSchema([
      { name: "Início", url: "/" },
      { name: "Ferramentas", url: "/ferramentas" },
      { name: frontmatter.title, url },
    ]),
    articleSchema({
      headline: frontmatter.title,
      description: frontmatter.description,
      url,
      datePublished: frontmatter.date,
      dateModified: atualizado,
    }),
    ...(faq.length > 0 ? [faqPageSchema(faq)] : []),
  ];

  return (
    <article className="container mx-auto px-4 py-10 lg:grid lg:max-w-6xl lg:grid-cols-[1fr_250px] lg:gap-10">
      <JsonLd data={schema} />

      <div className="min-w-0">
        {/* Breadcrumb visível */}
        <nav className="mb-6 text-sm text-[#0B132B]/60">
          <Link href="/" className="hover:text-[#00B2B2]">
            Início
          </Link>{" "}
          /{" "}
          <Link href="/ferramentas" className="hover:text-[#00B2B2]">
            Ferramentas
          </Link>{" "}
          / <span>{frontmatter.title}</span>
        </nav>

        <header>
          {frontmatter.categoria && (
            <p className="text-sm font-medium uppercase tracking-wide text-[#00B2B2]">
              {frontmatter.categoria}
            </p>
          )}
          <h1 className="mt-2 text-4xl font-bold text-[#0B132B]">
            {frontmatter.title}
          </h1>
          <p className="mt-3 text-sm text-[#0B132B]/60">
            Por {SITE.author} · Atualizado em{" "}
            {new Date(atualizado).toLocaleDateString("pt-BR")}
          </p>
        </header>

        {/* TL;DR — resumo extraível para SEO e citação por IA (GEO) */}
        <section className="my-8 rounded-xl border border-[#00B2B2]/20 bg-[#F7F9FC] p-5">
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-[#0B132B]">
            Resumo rápido
          </h2>
          <p className="text-[#0B132B]/90">{frontmatter.description}</p>
        </section>

        <AffiliateCTA
          refId={`${refBase}-topo`}
          variante="topo"
          descricao="Quer pular a teoria?"
        />

        {/* Prós e contras lado a lado (dados do frontmatter) */}
        {frontmatter.pontosFracosRival &&
          frontmatter.pontosForteSysteme && (
            <section className="my-10 grid gap-6 sm:grid-cols-2">
              <div>
                <h2 className="mb-3 text-xl font-semibold text-[#0B132B]">
                  {rival}: pontos fracos
                </h2>
                <ul className="space-y-2 text-[#0B132B]/90">
                  {frontmatter.pontosFracosRival.map((p) => (
                    <li key={p}>• {p}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="mb-3 text-xl font-semibold text-[#00B2B2]">
                  Systeme.io: vantagens
                </h2>
                <ul className="space-y-2 text-[#0B132B]/90">
                  {frontmatter.pontosForteSysteme.map((p) => (
                    <li key={p}>• {p}</li>
                  ))}
                </ul>
              </div>
            </section>
          )}

        {/* Tabela comparativa (dados do frontmatter) */}
        {frontmatter.tabelaComparativa && rival && (
          <>
            <h2 className="mb-2 text-2xl font-bold text-[#0B132B]">
              Systeme.io vs {rival}: tabela lado a lado
            </h2>
            <TabelaComparativa
              rival={rival}
              linhas={frontmatter.tabelaComparativa}
            />
          </>
        )}

        {/* Corpo do artigo em MDX — o conteúdo editorial ÚNICO */}
        <div className="prose-fdz mt-8">
          <MDXRemote
            source={content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                rehypePlugins: [rehypeSlug],
              },
            }}
          />
        </div>

        <AffiliateCTA
          refId={`${refBase}-meio`}
          variante="meio"
          descricao={
            frontmatter.precoMinimo
              ? `Cansado de pagar ${frontmatter.precoMinimo} por venda?`
              : "Compare e decida sem viés."
          }
        />

        {/* Veredito editorial (do frontmatter) */}
        {frontmatter.veredito && (
          <>
            <h2 className="mb-3 mt-10 text-2xl font-bold text-[#0B132B]">
              Veredito
            </h2>
            <p className="text-[#0B132B]/90">{frontmatter.veredito}</p>
          </>
        )}

        {/* FAQ visível */}
        {faq.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-4 text-2xl font-bold text-[#0B132B]">
              Perguntas frequentes
            </h2>
            <div className="space-y-5">
              {faq.map((item) => (
                <div key={item.q}>
                  <h3 className="font-semibold text-[#0B132B]">{item.q}</h3>
                  <p className="mt-1 text-[#0B132B]/90">{item.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <AffiliateCTA
          refId={`${refBase}-fundo`}
          variante="fundo"
          descricao="Pare de perder dinheiro em taxas. A Systeme.io entrega funil, e-mail e área de membros em uma só plataforma — de graça, para sempre."
        />

        {/* Fontes oficiais (E-E-A-T) */}
        {fontes.length > 0 && (
          <section className="mt-12 border-t border-gray-200 pt-6">
            <h2 className="mb-3 text-lg font-semibold text-[#0B132B]">
              Fontes
            </h2>
            <ul className="space-y-1 text-sm">
              {fontes.map((f) => (
                <li key={f.url}>
                  <a
                    href={f.url}
                    target="_blank"
                    rel="noopener"
                    className="text-[#0B132B]/70 underline decoration-[#00B2B2]/40 underline-offset-2 hover:text-[#00B2B2]"
                  >
                    {f.nome}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-xs text-[#0B132B]/50">
              Taxas e preços conferidos nas páginas oficiais em{" "}
              {new Date(atualizado).toLocaleDateString("pt-BR")}. Valores podem
              mudar — consulte sempre a fonte.
            </p>
          </section>
        )}

        {/* Linkagem interna: "Veja também" */}
        {relacionados.length > 0 && (
          <section className="mt-12 border-t border-gray-200 pt-6">
            <h2 className="mb-3 text-lg font-semibold text-[#0B132B]">
              Veja também
            </h2>
            <ul className="space-y-1">
              {relacionados.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/ferramentas/${comparativoSlug(o)}`}
                    className="text-[#00B2B2] hover:underline"
                  >
                    Systeme.io vs {o.nome}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <p className="mt-10 border-t border-gray-200 pt-6 text-xs text-[#0B132B]/50">
          {AFFILIATE_DISCLOSURE}
        </p>
      </div>

      {/* Coluna Lateral: Sumário */}
      <TableOfContents />
    </article>
  );
}
