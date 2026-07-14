import type { Metadata } from "next";
import Link from "next/link";
import { comparativos, comparativoSlug } from "@/data/comparativos";
import { SITE, absoluteUrl } from "@/lib/site";
import { articleSchema, breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { AffiliateCTA } from "@/components/conversion/AffiliateCTA";
import Conteudo from "./conteudo.mdx";

const URL_PATH = "/ferramentas";
const ATUALIZADO = "2026-07-14";

const FAQ = [
  {
    q: "Qual a melhor ferramenta de marketing digital para infoprodutos?",
    a: "Depende de onde vem seu tráfego. Se você tem tráfego próprio, uma plataforma SaaS de custo fixo como a Systeme.io preserva sua margem. Se depende do marketplace público de afiliados, a Hotmart faz mais sentido.",
  },
  {
    q: "Marketplace ou plataforma SaaS: qual escolher?",
    a: "Marketplaces (Hotmart, Kiwify) não cobram mensalidade, mas ficam com 5% a 10% de cada venda. Plataformas SaaS (Systeme.io) têm custo fixo e 0% de taxa por venda. Quanto mais você vende, mais o custo fixo compensa.",
  },
  {
    q: "Vale a pena pagar taxa por venda ou mensalidade fixa?",
    a: "A taxa percentual é um 'imposto sobre o sucesso': cresce com o seu faturamento. Quem fatura R$ 10.000/mês paga cerca de R$ 1.000/mês em taxas num marketplace. O custo fixo trava essa conta.",
  },
  {
    q: "Existe ferramenta all-in-one gratuita?",
    a: "Sim. A Systeme.io reúne funil, e-mail, curso, blog e afiliados num plano gratuito vitalício, sem cartão de crédito e com 0% de taxa por venda.",
  },
];

export const metadata: Metadata = {
  title: "Ferramentas de Marketing Digital: Qual Escolher em 2026?",
  description:
    "Marketplace ou SaaS? Entenda como escolher sua ferramenta de marketing digital, o 'imposto sobre o sucesso' das taxas e compare Systeme.io, Hotmart, Kiwify e mais.",
  alternates: { canonical: URL_PATH },
  openGraph: {
    title: "Ferramentas de Marketing Digital: Qual Escolher em 2026?",
    description:
      "Marketplace vs SaaS, o imposto sobre o sucesso e comparativos das principais plataformas.",
    url: absoluteUrl(URL_PATH),
    siteName: SITE.name,
    locale: SITE.locale,
    type: "article",
  },
};

export default function SiloFerramentasPage() {
  const schema = [
    breadcrumbSchema([
      { name: "Início", url: "/" },
      { name: "Ferramentas", url: URL_PATH },
    ]),
    articleSchema({
      headline: "Ferramentas de Marketing Digital: Qual Escolher em 2026?",
      description:
        "Como escolher sua ferramenta de marketing digital: marketplace vs SaaS, o imposto sobre o sucesso e comparativos.",
      url: URL_PATH,
      datePublished: ATUALIZADO,
      dateModified: ATUALIZADO,
    }),
    faqPageSchema(FAQ),
  ];

  return (
    <article className="container mx-auto max-w-3xl px-4 py-10">
      <JsonLd data={schema} />

      <nav className="mb-6 text-sm text-[#0B132B]/60">
        <Link href="/" className="hover:text-[#00B2B2]">
          Início
        </Link>{" "}
        / <span>Ferramentas</span>
      </nav>

      <header>
        <p className="text-sm font-medium uppercase tracking-wide text-[#00B2B2]">
          Guia Pilar · Silo 2
        </p>
        <h1 className="mt-2 text-4xl font-bold text-[#0B132B]">
          Ferramentas de Marketing Digital: Qual Escolher?
        </h1>
        <p className="mt-3 text-sm text-[#0B132B]/60">
          Por {SITE.author} · Atualizado em{" "}
          {new Date(ATUALIZADO).toLocaleDateString("pt-BR")}
        </p>
      </header>

      {/* TL;DR — resumo extraível para SEO e citação por IA (GEO) */}
      <section className="my-8 rounded-xl border border-[#00B2B2]/20 bg-[#F7F9FC] p-5">
        <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-[#0B132B]">
          Resumo rápido
        </h2>
        <p className="text-[#0B132B]/90">
          A escolha de uma ferramenta se resume a{" "}
          <strong>marketplace</strong> (taxa por venda, 5%–10%) vs{" "}
          <strong>SaaS</strong> (custo fixo, 0% de taxa). Quem tem tráfego
          próprio economiza com o custo fixo; quem depende de afiliados do
          marketplace justifica a taxa. Compare abaixo.
        </p>
      </section>

      {/* Corpo do artigo em MDX */}
      <div className="prose-fdz">
        <Conteudo />
      </div>

      {/* Hub: calculadora + comparativos (linkagem interna) */}
      <section className="mt-12 border-t border-gray-200 pt-8">
        <div className="mb-8 rounded-xl border border-[#00B2B2]/20 bg-[#F7F9FC] p-5">
          <h2 className="text-lg font-semibold text-[#0B132B]">
            🧮 Calculadora de Taxa de Guru
          </h2>
          <p className="mt-1 text-[#0B132B]/80">
            Descubra quanto você perde por ano em taxas de marketplace.{" "}
            <Link
              href="/calculadora-taxa-de-guru"
              className="font-medium text-[#00B2B2] hover:underline"
            >
              Calcular agora →
            </Link>
          </p>
        </div>

        <h2 className="mb-3 text-2xl font-semibold text-[#0B132B]">
          Comparativos lado a lado
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
        </ul>
      </section>

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

      <AffiliateCTA
        refId="s2-pilar-ferramentas-fundo"
        variante="fundo"
        descricao="Comece com a plataforma all-in-one de custo fixo: Systeme.io. Plano gratuito vitalício, sem cartão, com 0% de taxa por venda."
      />
    </article>
  );
}
