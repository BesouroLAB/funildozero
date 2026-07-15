import type { Metadata } from "next";
import Link from "next/link";
import { SITE, absoluteUrl, AFFILIATE_DISCLOSURE } from "@/lib/site";
import {
  articleSchema,
  breadcrumbSchema,
  faqPageSchema,
  reviewSchema,
} from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { AffiliateCTA } from "@/components/conversion/AffiliateCTA";
import { comparativos, comparativoSlug } from "@/data/comparativos";
import { getArticlesBySilo } from "@/lib/mdx";
import { TableOfContents } from "@/components/layout/TableOfContents";
import Conteudo from "./conteudo.mdx";

const URL_PATH = "/systeme-io";
const ATUALIZADO = "2026-07-14";
const NOTA = 4.5;

const FAQ = [
  {
    q: "A Systeme.io é realmente gratuita?",
    a: "Sim. O plano gratuito é vitalício, não pede cartão de crédito e já inclui 3 funis completos, 1 curso, 1 blog e envio ilimitado de e-mails para até 2.000 contatos.",
  },
  {
    q: "A Systeme.io cobra taxa por venda?",
    a: "Não. A Systeme.io cobra 0% de taxa de plataforma em todos os planos. Você paga apenas as taxas do seu gateway de pagamento (Stripe, PayPal ou Mercado Pago), que são cobradas por qualquer plataforma.",
  },
  {
    q: "A Systeme.io vale a pena em 2026?",
    a: "Vale muito para quem tem tráfego próprio e quer parar de perder cerca de 10% por venda em marketplaces. Para quem depende do marketplace público de afiliados da Hotmart, pode não ser a melhor escolha.",
  },
  {
    q: "Qual é a maior desvantagem da Systeme.io?",
    a: "O construtor de páginas é menos refinado esteticamente que editores premium, e os relatórios de e-mail marketing são básicos. Não são impeditivos para a maioria dos criadores, mas você deve saber disso.",
  },
];

export const metadata: Metadata = {
  title: "Review Systeme.io (2026): Vale a Pena? Análise Honesta e Preços",
  description:
    "Review completo e honesto da Systeme.io: planos, 0% de taxa por venda, prós, contras e para quem vale a pena. A plataforma all-in-one gratuita, na ponta do lápis.",
  alternates: { canonical: URL_PATH },
  openGraph: {
    title: "Review Systeme.io (2026): Vale a Pena?",
    description:
      "Análise honesta da Systeme.io: preços, 0% de taxa, prós e contras. A plataforma all-in-one gratuita.",
    url: absoluteUrl(URL_PATH),
    siteName: SITE.name,
    locale: SITE.locale,
    type: "article",
  },
};

export default function SystemeReviewPage() {
  const schema = [
    breadcrumbSchema([
      { name: "Início", url: "/" },
      { name: "Systeme.io", url: URL_PATH },
    ]),
    articleSchema({
      headline: "Review Systeme.io (2026): Vale a Pena?",
      description:
        "Análise honesta da Systeme.io — planos, 0% de taxa por venda, prós, contras e veredito.",
      url: URL_PATH,
      datePublished: ATUALIZADO,
      dateModified: ATUALIZADO,
    }),
    reviewSchema({
      itemName: "Systeme.io",
      ratingValue: NOTA,
      description:
        "Plataforma all-in-one com plano gratuito vitalício e 0% de taxa por venda. Construtor de páginas e analytics de e-mail são os pontos fracos.",
      url: URL_PATH,
    }),
    faqPageSchema(FAQ),
  ];

  return (
    <article className="container mx-auto px-4 py-10 lg:grid lg:max-w-6xl lg:grid-cols-[1fr_250px] lg:gap-10">
      <JsonLd data={schema} />

      {/* Coluna Principal */}
      <div className="min-w-0">
        <nav className="mb-6 text-sm text-[#0B132B]/60">
          <Link href="/" className="hover:text-[#00B2B2]">
            Início
          </Link>{" "}
          / <span>Systeme.io</span>
        </nav>

        <header>
          <p className="text-sm font-medium uppercase tracking-wide text-[#00B2B2]">
            Review Completo
          </p>
          <h1 className="mt-2 text-4xl font-bold text-[#0B132B]">
            Review Systeme.io (2026): Vale a Pena?
          </h1>
          <p className="mt-3 text-sm text-[#0B132B]/60">
            Por {SITE.author} · Atualizado em{" "}
            {new Date(ATUALIZADO).toLocaleDateString("pt-BR")} · Nota {NOTA}/5
          </p>
        </header>

        {/* TL;DR — resumo extraível para SEO e citação por IA (GEO) */}
        <section className="my-8 rounded-xl border border-[#00B2B2]/20 bg-[#F7F9FC] p-5">
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-[#0B132B]">
            Resumo rápido
          </h2>
          <p className="text-[#0B132B]/90">
            A Systeme.io é uma plataforma <strong>all-in-one</strong> (funil,
            e-mail, curso, blog e afiliados) com <strong>plano gratuito
            vitalício</strong> e <strong>0% de taxa por venda</strong> em todos os
            planos. Pontos fracos: construtor de páginas menos refinado e
            relatórios de e-mail básicos. Vale muito a pena para quem tem tráfego
            próprio.
          </p>
        </section>

        {/* Corpo do artigo em MDX */}
        <div className="prose-fdz">
          <Conteudo />
        </div>

        {/* FAQ visível — espelha o FAQPage schema */}
        <section className="mt-12">
          <h2 className="mb-4 text-2xl font-bold text-[#0B132B]">
            Perguntas frequentes
          </h2>
          <div className="space-y-5">
            {FAQ.map((item) => (
              <div key={item.q}>
                <h3 className="font-semibold text-[#0B132B]">{item.q}</h3>
                <p className="mt-1 text-[#0B132B]/90">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Artigos satélite deste silo */}
        {(() => {
          const artigos = getArticlesBySilo("systeme-io");
          if (artigos.length === 0) return null;
          return (
            <section className="mt-12 border-t border-gray-200 pt-8">
              <h2 className="mb-3 text-2xl font-bold text-[#0B132B]">
                Mais sobre Systeme.io
              </h2>
              <ul className="space-y-2">
                {artigos.map((a) => (
                  <li key={a.frontmatter.slug}>
                    <Link
                      href={`/systeme-io/${a.frontmatter.slug}`}
                      className="text-[#00B2B2] hover:underline"
                    >
                      {a.frontmatter.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })()}

        {/* Linkagem cruzada — comparativos e calculadora */}
        <section className="mt-12 border-t border-gray-200 pt-8">
          <h2 className="mb-3 text-2xl font-bold text-[#0B132B]">
            Compare com outras plataformas
          </h2>
          <ul className="space-y-2">
            {comparativos.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/ferramentas/${comparativoSlug(c)}`}
                  className="text-[#00B2B2] hover:underline"
                >
                  Systeme.io vs {c.nome}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/calculadora-de-taxas"
                className="text-[#00B2B2] hover:underline"
              >
                Calculadora de Taxas de Plataformas
              </Link>
            </li>
          </ul>
        </section>

        <AffiliateCTA
          refId="s3-review-systeme-fundo"
          variante="fundo"
          descricao="Crie sua conta grátis na Systeme.io — plano vitalício, sem cartão de crédito, com 0% de taxa por venda."
        />

        {/* Fontes oficiais — embasam o review (E-E-A-T) */}
        <section className="mt-12 border-t border-gray-200 pt-6">
          <h2 className="mb-3 text-lg font-semibold text-[#0B132B]">Fontes</h2>
          <ul className="space-y-1 text-sm">
            <li>
              <a
                href="https://systeme.io/pt/pricing"
                target="_blank"
                rel="noopener"
                className="text-[#0B132B]/70 underline decoration-[#00B2B2]/40 underline-offset-2 hover:text-[#00B2B2]"
              >
                Systeme.io — planos e preços oficiais
              </a>
            </li>
            <li>
              <a
                href="https://www.trustpilot.com/review/systeme.io"
                target="_blank"
                rel="noopener"
                className="text-[#0B132B]/70 underline decoration-[#00B2B2]/40 underline-offset-2 hover:text-[#00B2B2]"
              >
                Trustpilot — avaliações de usuários da Systeme.io
              </a>
            </li>
          </ul>
          <p className="mt-2 text-xs text-[#0B132B]/50">
            Preços e avaliações conferidos em{" "}
            {new Date(ATUALIZADO).toLocaleDateString("pt-BR")}. Valores podem
            mudar — consulte sempre a fonte.
          </p>
        </section>

        <p className="mt-10 border-t border-gray-200 pt-6 text-xs text-[#0B132B]/50">
          {AFFILIATE_DISCLOSURE}
        </p>
      </div>

      {/* Coluna Lateral: Sumário */}
      <TableOfContents />
    </article>
  );
}
