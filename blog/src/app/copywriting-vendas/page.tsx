import type { Metadata } from "next";
import Link from "next/link";
import { SITE, absoluteUrl } from "@/lib/site";
import { articleSchema, breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { AffiliateCTA } from "@/components/conversion/AffiliateCTA";
import Conteudo from "./conteudo.mdx";

const URL_PATH = "/copywriting-vendas";
const ATUALIZADO = "2026-07-14";

const FAQ = [
  {
    q: "O que é copywriting?",
    a: "É a escrita feita para gerar uma ação (clicar, se cadastrar, comprar). Diferente da redação institucional, a copy foca na dor e na transformação do cliente, não nas funcionalidades do produto.",
  },
  {
    q: "Qual a diferença entre copywriting e redação comum?",
    a: "A redação comum informa ou descreve; o copywriting persuade e converte. A copy fala do benefício para o cliente ('pare de perder dinheiro em taxas'), não da funcionalidade ('e-mail ilimitado').",
  },
  {
    q: "Preciso ser escritor para fazer copy?",
    a: "Não. Copywriting é método, não talento. Com frameworks como AIDA e PAS e escrita clara focada na dor do cliente, qualquer pessoa vende mais do que com prosa elegante centrada no produto.",
  },
  {
    q: "Onde eu aplico a copy na prática?",
    a: "Numa página de captura, página de vendas e sequência de e-mail. Tudo isso se monta numa plataforma all-in-one como a Systeme.io, que tem plano gratuito vitalício e não exige programador.",
  },
];

export const metadata: Metadata = {
  title: "Copywriting para Vendas: O Guia Prático do Zero (2026)",
  description:
    "Aprenda copywriting que vende: frameworks (AIDA, PAS), headlines que convertem, gatilhos mentais éticos e a estrutura de uma página de vendas. Sem fórmula mágica.",
  alternates: { canonical: URL_PATH },
  openGraph: {
    title: "Copywriting para Vendas: O Guia Prático do Zero (2026)",
    description:
      "Frameworks, headlines, gatilhos éticos e a estrutura de uma página que vende.",
    url: absoluteUrl(URL_PATH),
    siteName: SITE.name,
    locale: SITE.locale,
    type: "article",
  },
};

export default function SiloCopywritingPage() {
  const schema = [
    breadcrumbSchema([
      { name: "Início", url: "/" },
      { name: "Copywriting & Vendas", url: URL_PATH },
    ]),
    articleSchema({
      headline: "Copywriting para Vendas: O Guia Prático do Zero (2026)",
      description:
        "Frameworks (AIDA, PAS), headlines que convertem, gatilhos mentais éticos e a estrutura de uma página de vendas.",
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
        / <span>Copywriting &amp; Vendas</span>
      </nav>

      <header>
        <p className="text-sm font-medium uppercase tracking-wide text-[#00B2B2]">
          Guia Pilar · Silo 5
        </p>
        <h1 className="mt-2 text-4xl font-bold text-[#0B132B]">
          Copywriting para Vendas: O Guia Prático do Zero
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
          <strong>Copywriting</strong> é escrever para converter, focando na dor
          e no benefício do cliente — não no produto. Use frameworks como{" "}
          <strong>AIDA</strong> e <strong>PAS</strong>, headlines específicas e
          gatilhos mentais <strong>éticos</strong>. Copy não é talento, é método.
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

      <AffiliateCTA
        refId="s5-pilar-copy-fundo"
        variante="fundo"
        descricao="Publique sua copy numa página de vendas de verdade. Monte tudo na Systeme.io — plano gratuito vitalício, sem cartão e sem programador."
      />
    </article>
  );
}
