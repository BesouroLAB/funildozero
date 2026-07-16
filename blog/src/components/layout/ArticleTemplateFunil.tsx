/**
 * Template híbrido para artigos satélite do Silo 1 (Funil por Profissão).
 *
 * Renderiza o corpo MDX (prosa editorial única) enquanto injeta
 * dados estruturados do frontmatter para schema, resumo, tabela de funil
 * e links relacionados. Isso elimina o "template fill" — cada página
 * tem conteúdo textual individual, não apenas variáveis swappadas.
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
import { TableOfContents } from "@/components/layout/TableOfContents";
import { profissoes } from "@/data/profissoes";
import rehypeSlug from "rehype-slug";
import type { ArticleData } from "@/lib/mdx";
import { RegulacaoBox } from "@/components/mdx/RegulacaoBox";
import { FunnelDiagram } from "@/components/mdx/FunnelDiagram";
import { PricingComparison } from "@/components/mdx/PricingComparison";
import { TabelaComparativa } from "@/components/conversion/TabelaComparativa";
interface ArticleTemplateFunilProps {
  article: ArticleData;
}

export function ArticleTemplateFunil({ article }: ArticleTemplateFunilProps) {
  const { frontmatter, content } = article;
  const url = `/${frontmatter.silo}/${frontmatter.slug}`;
  const atualizado = frontmatter.updatedAt ?? frontmatter.date;
  const faq = frontmatter.faq ?? [];
  const fontes = frontmatter.fontes ?? [];
  const refBase = `${frontmatter.silo}-${frontmatter.slug}`;
  const cluster = frontmatter.cluster;

  // Profissões relacionadas (mesmo cluster, exclui a atual)
  const relacionadas = cluster
    ? profissoes
        .filter((p) => p.cluster === cluster && p.slug !== frontmatter.slug)
        .slice(0, 5)
    : [];

  const schema = [
    breadcrumbSchema([
      { name: "Início", url: "/" },
      { name: "Funil de Vendas", url: "/funil-de-vendas" },
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
          <Link href="/funil-de-vendas" className="hover:text-[#00B2B2]">
            Funil de Vendas
          </Link>{" "}
          / <span>{frontmatter.title}</span>
        </nav>

        <header>
          {cluster && (
            <p className="text-sm font-medium uppercase tracking-wide text-[#00B2B2]">
              {cluster}
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
          descricao="Quer montar seu funil sem pagar mensalidade?"
        />

        {/* Cartão estruturado do funil (dados do frontmatter) */}
        {frontmatter.dor && frontmatter.iscaDigital && frontmatter.oferta && (
          <section className="my-10 rounded-xl border border-[#0B132B]/10 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-bold text-[#0B132B]">
              Resumo do funil
            </h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#00B2B2]/10 text-sm font-bold text-[#00B2B2]">
                  1
                </span>
                <div>
                  <p className="text-sm font-semibold text-[#0B132B]/70">
                    Dor principal
                  </p>
                  <p className="text-[#0B132B]/90">{frontmatter.dor}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#00B2B2]/10 text-sm font-bold text-[#00B2B2]">
                  2
                </span>
                <div>
                  <p className="text-sm font-semibold text-[#0B132B]/70">
                    Isca digital
                  </p>
                  <p className="text-[#0B132B]/90">
                    {frontmatter.iscaDigital}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#00B2B2]/10 text-sm font-bold text-[#00B2B2]">
                  3
                </span>
                <div>
                  <p className="text-sm font-semibold text-[#0B132B]/70">
                    Oferta de conversão
                  </p>
                  <p className="text-[#0B132B]/90">{frontmatter.oferta}</p>
                  {frontmatter.faixaPreco && (
                    <p className="mt-1 text-sm text-[#0B132B]/60">
                      Faixa de preço: {frontmatter.faixaPreco}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Corpo do artigo em MDX — o conteúdo editorial ÚNICO */}
        <div className="prose-fdz mt-8">
          <MDXRemote
            source={content}
            components={{ AffiliateCTA, RegulacaoBox, FunnelDiagram, PricingComparison, TabelaComparativa }}
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
          descricao="A teoria é linda, mas você precisa de uma ferramenta para montar isso na prática."
        />

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
          descricao={`Monte o funil completo — página de captura, e-mail e área de membros — numa só plataforma, de graça e para sempre.`}
        />

        {/* Fontes externas — embasam os dados citados no artigo (E-E-A-T) */}
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
          </section>
        )}

        {/* Linkagem interna: profissões do mesmo cluster */}
        {relacionadas.length > 0 && (
          <section className="mt-12 border-t border-gray-200 pt-6">
            <h2 className="mb-3 text-lg font-semibold text-[#0B132B]">
              Funis para profissões parecidas
              {cluster ? ` (${cluster})` : ""}
            </h2>
            <ul className="space-y-1">
              {relacionadas.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/funil-de-vendas/${o.slug}`}
                    className="text-[#00B2B2] hover:underline"
                  >
                    Funil de Vendas para {o.profissao}
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
