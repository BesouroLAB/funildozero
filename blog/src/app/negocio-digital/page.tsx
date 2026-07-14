import type { Metadata } from "next";
import Link from "next/link";
import { SITE, absoluteUrl } from "@/lib/site";
import { articleSchema, breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { AffiliateCTA } from "@/components/conversion/AffiliateCTA";
import Conteudo from "./conteudo.mdx";

const URL_PATH = "/negocio-digital";
const ATUALIZADO = "2026-07-14";

const FAQ = [
  {
    q: "O que é um negócio digital?",
    a: "É qualquer operação que vende produtos ou serviços pela internet — cursos, consultorias, comissões de afiliado. O atrativo é a barreira de entrada baixa: não precisa de ponto comercial, estoque ou funcionários.",
  },
  {
    q: "Como começar no marketing digital do zero?",
    a: "Escolha um modelo (afiliado, infoproduto ou serviço) e um nicho, defina uma oferta clara, monte uma estrutura gratuita (página + captura de e-mail) e comece a atrair tráfego com uma isca digital.",
  },
  {
    q: "Quanto preciso investir para começar um negócio digital?",
    a: "Perto de zero. Página, e-mail marketing e área de membros cabem no plano gratuito vitalício da Systeme.io. O erro comum é gastar com ferramentas caras antes de faturar o primeiro real.",
  },
  {
    q: "Como ser afiliado e ganhar as primeiras comissões?",
    a: "Afiliado é o começo mais leve: você promove o produto de outra pessoa e ganha por venda, sem criar produto nem dar suporte. O trabalho é atrair tráfego e escrever uma boa copy que convença.",
  },
];

export const metadata: Metadata = {
  title: "Negócio Digital do Zero: Por Onde Começar em 2026",
  description:
    "O guia honesto para começar um negócio digital do zero: os modelos mais acessíveis, o que você realmente precisa e como montar tudo sem gastar. Sem 'dinheiro fácil'.",
  alternates: { canonical: URL_PATH },
  openGraph: {
    title: "Negócio Digital do Zero: Por Onde Começar em 2026",
    description:
      "Os modelos mais acessíveis, o que você realmente precisa e como começar sem gastar.",
    url: absoluteUrl(URL_PATH),
    siteName: SITE.name,
    locale: SITE.locale,
    type: "article",
  },
};

export default function SiloNegocioDigitalPage() {
  const schema = [
    breadcrumbSchema([
      { name: "Início", url: "/" },
      { name: "Negócio Digital do Zero", url: URL_PATH },
    ]),
    articleSchema({
      headline: "Negócio Digital do Zero: Por Onde Começar em 2026",
      description:
        "Os modelos mais acessíveis, o que você realmente precisa e como montar um negócio digital sem gastar.",
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
        / <span>Negócio Digital do Zero</span>
      </nav>

      <header>
        <p className="text-sm font-medium uppercase tracking-wide text-[#00B2B2]">
          Guia Pilar · Silo 4
        </p>
        <h1 className="mt-2 text-4xl font-bold text-[#0B132B]">
          Negócio Digital do Zero: Por Onde Começar
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
          Para começar um <strong>negócio digital do zero</strong> você precisa
          de três coisas: uma <strong>oferta clara</strong>,{" "}
          <strong>tráfego</strong> e uma <strong>estrutura de conversão</strong>{" "}
          (funil). Os modelos mais acessíveis são afiliado, infoproduto e
          serviço — e dá para montar tudo com custo perto de zero.
        </p>
      </section>

      {/* Corpo do artigo em MDX */}
      <div className="prose-fdz">
        <Conteudo />
      </div>

      {/* Próximos passos — distribui para os outros silos (ToFu → MoFu/BoFu) */}
      <section className="mt-12 border-t border-gray-200 pt-8">
        <h2 className="mb-3 text-2xl font-bold text-[#0B132B]">
          Próximos passos
        </h2>
        <ul className="space-y-2">
          <li>
            <Link
              href="/funil-de-vendas"
              className="text-[#00B2B2] hover:underline"
            >
              Funil de Vendas: o guia completo do zero
            </Link>
          </li>
          <li>
            <Link
              href="/copywriting-vendas"
              className="text-[#00B2B2] hover:underline"
            >
              Copywriting para Vendas: o guia prático
            </Link>
          </li>
          <li>
            <Link href="/systeme-io" className="text-[#00B2B2] hover:underline">
              Review Systeme.io: a plataforma all-in-one gratuita
            </Link>
          </li>
          <li>
            <Link
              href="/ferramentas"
              className="text-[#00B2B2] hover:underline"
            >
              Ferramentas de marketing: qual escolher
            </Link>
          </li>
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
        refId="s4-pilar-negocio-fundo"
        variante="fundo"
        descricao="Dê o primeiro passo com custo zero: monte sua estrutura na Systeme.io. Plano gratuito vitalício, sem cartão e sem programador."
      />
    </article>
  );
}
