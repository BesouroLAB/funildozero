/**
 * Template compartilhado para renderizar artigos satélite MDX.
 * Usado por todas as rotas [slug]/page.tsx dos silos.
 *
 * Inclui: breadcrumb, TL;DR, corpo MDX, FAQ visível + schema, AffiliateCTA.
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
import rehypeSlug from "rehype-slug";
import type { ArticleData } from "@/lib/mdx";

interface ArticleTemplateProps {
  article: ArticleData;
}

export function ArticleTemplate({ article }: ArticleTemplateProps) {
  const { frontmatter, content } = article;
  const url = `/${frontmatter.silo}/${frontmatter.slug}`;
  const atualizado = frontmatter.updatedAt ?? frontmatter.date;
  const faq = frontmatter.faq ?? [];
  const fontes = frontmatter.fontes ?? [];
  const refBase = `${frontmatter.silo}-${frontmatter.slug}`;

  const schema = [
    breadcrumbSchema([
      { name: "Início", url: "/" },
      { name: frontmatter.siloLabel, url: `/${frontmatter.silo}` },
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

      {/* Coluna Principal */}
      <div className="min-w-0">
        {/* Breadcrumb visível */}
        <nav className="mb-6 text-sm text-[#0B132B]/60">
          <Link href="/" className="hover:text-[#00B2B2]">
            Início
          </Link>{" "}
          /{" "}
          <Link href={`/${frontmatter.silo}`} className="hover:text-[#00B2B2]">
            {frontmatter.siloLabel}
          </Link>{" "}
          / <span>{frontmatter.title}</span>
        </nav>

        <header>
          <p className="text-sm font-medium uppercase tracking-wide text-[#00B2B2]">
            {frontmatter.siloLabel}
          </p>
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
          descricao="Quer montar sua estrutura sem pagar mensalidade?"
        />

        {/* Corpo do artigo em MDX */}
        <div className="prose-fdz mt-8">
          <MDXRemote
            source={content}
            components={{ AffiliateCTA }}
            options={{
              mdxOptions: {
                rehypePlugins: [rehypeSlug],
              },
            }}
          />
        </div>

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
          descricao="Monte tudo numa só plataforma — página, e-mail e checkout — de graça, para sempre."
        />

        {/* Fontes externas — embasam os dados citados no artigo (E-E-A-T) */}
        {fontes.length > 0 && (
          <section className="mt-12 border-t border-gray-200 pt-6">
            <h2 className="mb-3 text-lg font-semibold text-[#0B132B]">Fontes</h2>
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

        <p className="mt-10 border-t border-gray-200 pt-6 text-xs text-[#0B132B]/50">
          {AFFILIATE_DISCLOSURE}
        </p>
      </div>

      {/* Coluna Lateral: Sumário */}
      <TableOfContents />
    </article>
  );
}
