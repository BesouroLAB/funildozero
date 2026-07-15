import type { Metadata } from "next";
import Link from "next/link";
import { SITE, absoluteUrl } from "@/lib/site";
import { articleSchema, breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { AffiliateCTA } from "@/components/conversion/AffiliateCTA";
import { getArticlesBySilo } from "@/lib/mdx";
import { TableOfContents } from "@/components/layout/TableOfContents";
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
    <article className="container mx-auto px-4 py-10 lg:grid lg:max-w-6xl lg:grid-cols-[1fr_250px] lg:gap-10">
      <JsonLd data={schema} />

      {/* Coluna Principal */}
      <div className="min-w-0">
        <nav className="mb-6 text-sm text-[#0B132B]/60">
          <Link href="/" className="hover:text-[#00B2B2]">
            Início
          </Link>{" "}
          / <span>Copywriting</span>
        </nav>

        <header>
          <p className="text-sm font-medium uppercase tracking-wide text-[#00B2B2]">
            Guia Completo
          </p>
          <h1 className="mt-2 text-4xl font-bold text-[#0B132B]">
            Copywriting para Vendas: O Guia Prático do Zero
          </h1>
          <p className="mt-3 text-sm text-[#0B132B]/60">
            Por {SITE.author} · Atualizado em{" "}
            {new Date(ATUALIZADO).toLocaleDateString("pt-BR")}
          </p>
        </header>

        {/* TL;DR — Resumo extraível */}
        <section className="my-8 rounded-xl border border-[#00B2B2]/20 bg-[#F7F9FC] p-5">
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-[#0B132B]">
            Resumo rápido
          </h2>
          <p className="text-[#0B132B]/90">
            Copywriting não é "escrever bonito". É usar psicologia, gatilhos
            mentais e pesquisa de público para conduzir o leitor até uma ação (a
            venda). Neste guia prático, você aprende as estruturas essenciais
            (como AIDA e PAS) para escrever páginas de captura e e-mails que
            convertem.
          </p>
        </section>

        {/* Corpo do artigo em MDX */}
        <div className="prose-fdz mt-8">
          <Conteudo />
        </div>

        {/* Linkagem Cruzada — Artigos MDX Satélites do Silo 5 (se existirem) */}
        {(() => {
          const artigos = getArticlesBySilo("copywriting-vendas");
          if (artigos.length === 0) return null;
          return (
            <section className="mt-12 rounded-xl bg-gray-50 p-6">
              <h2 className="mb-4 text-xl font-bold text-[#0B132B]">
                Mais sobre Copywriting & Vendas
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {artigos.map((art) => (
                  <Link
                    key={art.frontmatter.slug}
                    href={`/copywriting-vendas/${art.frontmatter.slug}`}
                    className="group block rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-[#00B2B2] hover:shadow-md"
                  >
                    <h3 className="font-bold text-[#0B132B] group-hover:text-[#00B2B2]">
                      {art.frontmatter.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-[#0B132B]/70">
                      {art.frontmatter.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })()}

        {/* Linkagem Cruzada com outros Pilares */}
        <section className="mt-12 border-t border-gray-200 pt-8">
          <h2 className="mb-4 text-xl font-bold text-[#0B132B]">
            Continue sua jornada
          </h2>
          <ul className="list-disc space-y-2 pl-5 text-[#0B132B]/80">
            <li>
              <Link
                href="/funil-de-vendas"
                className="text-[#00B2B2] hover:underline"
              >
                Funil de Vendas: entenda o que é e como funciona
              </Link>
            </li>
            <li>
              <Link
                href="/systeme-io"
                className="text-[#00B2B2] hover:underline"
              >
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
          refId="s5-pilar-copy-fundo"
          variante="fundo"
          descricao="Publique sua copy numa página de vendas de verdade. Monte tudo na Systeme.io — plano gratuito vitalício, sem cartão e sem programador."
        />
      </div>

      <TableOfContents />
    </article>
  );
}
