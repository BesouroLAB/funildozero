import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  profissoes,
  clusterContexto,
  getProfissaoBySlug,
  getProfissoesRelacionadas,
  getProfissaoFaq,
  semPonto,
} from "@/data/profissoes";
import { SITE, absoluteUrl } from "@/lib/site";
import { articleSchema, breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { AffiliateCTA } from "@/components/conversion/AffiliateCTA";

export const dynamicParams = false;

type Params = { profissao: string };

export function generateStaticParams(): Params[] {
  return profissoes.map((p) => ({ profissao: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { profissao } = await params;
  const p = getProfissaoBySlug(profissao);
  if (!p) return {};

  const url = `/funil-de-vendas/${p.slug}`;
  return {
    title: p.metaTitle,
    description: p.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: p.metaTitle,
      description: p.metaDescription,
      url: absoluteUrl(url),
      siteName: SITE.name,
      locale: SITE.locale,
      type: "article",
    },
  };
}

export default async function FunilProfissaoPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { profissao } = await params;
  const p = getProfissaoBySlug(profissao);
  if (!p) notFound();

  const url = `/funil-de-vendas/${p.slug}`;
  const faq = getProfissaoFaq(p);
  const atualizado = p.atualizadoEm ?? SITE.defaultUpdated;
  const relacionadas = getProfissoesRelacionadas(p);
  const refBase = `s1-funil-${p.slug}`;
  const nomeLower = p.profissao.toLowerCase();

  const schema = [
    breadcrumbSchema([
      { name: "Início", url: "/" },
      { name: "Funil de Vendas", url: "/funil-de-vendas" },
      { name: `Funil para ${p.profissao}`, url },
    ]),
    articleSchema({
      headline: p.metaTitle,
      description: p.metaDescription,
      url,
      datePublished: atualizado,
      dateModified: atualizado,
    }),
    faqPageSchema(faq),
  ];

  return (
    <article className="container mx-auto max-w-3xl px-4 py-10">
      <JsonLd data={schema} />

      <nav className="mb-6 text-sm text-[#0B132B]/60">
        <Link href="/" className="hover:text-[#00B2B2]">
          Início
        </Link>{" "}
        /{" "}
        <Link href="/funil-de-vendas" className="hover:text-[#00B2B2]">
          Funil de Vendas
        </Link>{" "}
        / <span>Funil para {p.profissao}</span>
      </nav>

      <header>
        <p className="text-sm font-medium uppercase tracking-wide text-[#00B2B2]">
          {p.cluster}
        </p>
        <h1 className="mt-2 text-4xl font-bold text-[#0B132B]">
          Funil de Vendas para {p.profissao}: Como Captar Clientes (2026)
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
        <p className="text-[#0B132B]/90">
          A maior dor de captação de {p.profissaoPlural} é: {p.dor} A saída é um
          funil que usa <strong>{semPonto(p.iscaDigital)}</strong> como isca e
          converte em <strong>{p.oferta.toLowerCase()}</strong>
        </p>
      </section>

      <AffiliateCTA
        refId={`${refBase}-topo`}
        variante="topo"
        descricao="Quer montar seu funil sem pagar mensalidade?"
      />

      {/* Contexto do cluster — variação de template (anti-thin-content) */}
      <h2 className="mb-3 mt-10 text-2xl font-bold text-[#0B132B]">
        Por que o funil de {nomeLower} é diferente
      </h2>
      <p className="text-[#0B132B]/90">{clusterContexto[p.cluster]}</p>

      {/* Estrutura do funil: dor → isca → oferta */}
      <h2 className="mb-4 mt-10 text-2xl font-bold text-[#0B132B]">
        O funil de vendas para {nomeLower}, etapa por etapa
      </h2>
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold text-[#0B132B]">
            1. Topo — a dor que trava a captação
          </h3>
          <p className="mt-1 text-[#0B132B]/90">{p.dor}</p>
        </div>
        <div>
          <h3 className="font-semibold text-[#0B132B]">
            2. Meio — a isca digital que qualifica
          </h3>
          <p className="mt-1 text-[#0B132B]/90">
            {p.iscaDigital} Esse material entrega valor imediato, ativa a
            reciprocidade e captura o contato do interessado certo.
          </p>
          {/* iscaDigital já termina com ponto — nova frase começa em seguida */}
        </div>
        <div>
          <h3 className="font-semibold text-[#0B132B]">
            3. Fundo — a oferta que converte
          </h3>
          <p className="mt-1 text-[#0B132B]/90">
            {p.oferta} Faixa de preço praticada: <strong>{p.faixaPreco}</strong>
          </p>
        </div>
      </div>

      <AffiliateCTA
        refId={`${refBase}-meio`}
        variante="meio"
        descricao="A teoria é linda, mas você precisa de uma ferramenta para montar isso na prática."
      />

      {/* FAQ visível — espelha o FAQPage schema */}
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

      <AffiliateCTA
        refId={`${refBase}-fundo`}
        variante="fundo"
        descricao={`Monte o funil de ${nomeLower} completo — página de captura, e-mail e área de membros — numa só plataforma, de graça e para sempre.`}
      />

      {/* Linkagem interna: profissões do mesmo cluster */}
      {relacionadas.length > 0 && (
        <section className="mt-12 border-t border-gray-200 pt-6">
          <h2 className="mb-3 text-lg font-semibold text-[#0B132B]">
            Funis para profissões parecidas ({p.cluster})
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
    </article>
  );
}
