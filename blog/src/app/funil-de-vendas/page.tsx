import type { Metadata } from "next";
import Link from "next/link";
import { profissoes, type Cluster } from "@/data/profissoes";
import { SITE, absoluteUrl } from "@/lib/site";
import { articleSchema, breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { AffiliateCTA } from "@/components/conversion/AffiliateCTA";
import { TableOfContents } from "@/components/layout/TableOfContents";
import Conteudo from "./conteudo.mdx";

const URL_PATH = "/funil-de-vendas";
const ATUALIZADO = "2026-07-14";

const ORDEM_CLUSTERS: Cluster[] = [
  "Saúde",
  "Negócios B2B",
  "Criativo",
  "Estética",
  "Educação",
  "Digital",
];

const FAQ = [
  {
    q: "O que é um funil de vendas?",
    a: "É o mapa da jornada do cliente, do primeiro contato até a compra, organizado em etapas (topo, meio e fundo). A ideia vem do modelo AIDA, de 1898, e parte da premissa de que a venda é um processo, não um evento único.",
  },
  {
    q: "Quais são as etapas de um funil de vendas?",
    a: "São três: Topo (ToFu), onde a pessoa descobre o problema e você educa; Meio (MoFu), onde uma isca digital captura o contato e qualifica o lead; e Fundo (BoFu), onde a oferta e a prova social convertem a venda.",
  },
  {
    q: "O que é uma isca digital (lead magnet)?",
    a: "É um material gratuito e específico (e-book, planilha, quiz, aula) trocado pelo e-mail da pessoa. Ele entrega uma vitória rápida, ativa a reciprocidade e qualifica quem realmente tem interesse.",
  },
  {
    q: "Preciso pagar ferramentas caras para montar um funil?",
    a: "Não. Página de captura, e-mail marketing e área de membros cabem numa única plataforma all-in-one como a Systeme.io, que tem plano gratuito vitalício e 0% de taxa por venda.",
  },
];

export const metadata: Metadata = {
  title: "Funil de Vendas por Profissão: 32 Guias Práticos (2026)",
  description:
    "O funil de vendas do SEU ofício: 32 guias práticos por profissão — da isca digital à automação — com as regras do seu conselho e sem pagar mensalidades.",
  alternates: { canonical: URL_PATH },
  openGraph: {
    title: "Funil de Vendas por Profissão: 32 Guias Práticos (2026)",
    description:
      "O funil de vendas do seu ofício: 32 guias por profissão, da isca digital à automação, sem pagar mensalidades.",
    url: absoluteUrl(URL_PATH),
    siteName: SITE.name,
    locale: SITE.locale,
    type: "article",
  },
};

export default function SiloFunilPage() {
  const schema = [
    breadcrumbSchema([
      { name: "Início", url: "/" },
      { name: "Funil de Vendas", url: URL_PATH },
    ]),
    articleSchema({
      headline: "Funil de Vendas por Profissão: 32 Guias Práticos (2026)",
      description:
        "O funil de vendas do seu ofício: 32 guias práticos por profissão, da isca digital à automação.",
      url: URL_PATH,
      datePublished: ATUALIZADO,
      dateModified: ATUALIZADO,
    }),
    faqPageSchema(FAQ),
  ];

  return (
    <article className="container mx-auto px-4 py-10 lg:grid lg:max-w-6xl lg:grid-cols-[1fr_250px] lg:gap-10">
      <JsonLd data={schema} />

      <div className="min-w-0">
        <nav className="mb-6 text-sm text-[#0B132B]/60">
          <Link href="/" className="hover:text-[#00B2B2]">
            Início
          </Link>{" "}
          / <span>Funil de Vendas</span>
        </nav>

        <header>
          <p className="text-sm font-medium uppercase tracking-wide text-[#00B2B2]">
            Guias por Profissão
          </p>
        <h1 className="mt-2 text-4xl font-bold text-[#0B132B]">
          Funil de Vendas por Profissão: encontre o guia do seu ofício
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
          Um <strong>funil de vendas</strong> conduz o cliente da descoberta à
          compra em três etapas: <strong>topo</strong> (educar),{" "}
          <strong>meio</strong> (capturar o lead com uma isca digital) e{" "}
          <strong>fundo</strong> (converter). As etapas são universais, mas o
          conteúdo muda por profissão — veja o guia da sua área abaixo.
        </p>
      </section>

      {/* Corpo do artigo em MDX */}
      <div className="prose-fdz">
        <Conteudo />
      </div>

      {/* Hub de linkagem interna: as 30 profissões por cluster */}
      <section id="profissoes" className="mt-12 border-t border-gray-200 pt-8">
        <h2 className="mb-2 text-2xl font-bold text-[#0B132B]">
          Funil de vendas para a sua profissão
        </h2>
        <p className="mb-6 text-[#0B132B]/75">
          Escolha a sua área e veja o guia com a dor de captação, a isca ideal e
          a oferta que converte.
        </p>
        {ORDEM_CLUSTERS.map((cluster) => {
          const doCluster = profissoes.filter((p) => p.cluster === cluster);
          if (doCluster.length === 0) return null;
          return (
            <div key={cluster} className="mb-6">
              <h3 className="mb-3 text-xl font-semibold text-[#0B132B]">
                {cluster}
              </h3>
              <ul className="space-y-2">
                {doCluster.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/funil-de-vendas/${p.slug}`}
                      className="text-[#00B2B2] hover:underline"
                    >
                      Funil de Vendas para {p.profissao}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
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
        refId="s1-pilar-funil-fundo"
        variante="fundo"
        descricao="Monte seu funil completo — página, e-mail e área de membros — na Systeme.io. Plano gratuito vitalício, sem cartão, com 0% de taxa por venda."
      />
      </div>

      <TableOfContents />
    </article>
  );
}
