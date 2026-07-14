import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  comparativos,
  comparativoSlug,
  getComparativoBySlug,
  getComparativoFaq,
} from "@/data/comparativos";
import { SITE, absoluteUrl } from "@/lib/site";
import {
  articleSchema,
  breadcrumbSchema,
  faqPageSchema,
} from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { AffiliateCTA } from "@/components/conversion/AffiliateCTA";
import { TabelaComparativa } from "@/components/conversion/TabelaComparativa";

// Só as páginas geradas no build existem; slug desconhecido retorna 404 (sem thin pages).
export const dynamicParams = false;

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return comparativos.map((c) => ({ slug: comparativoSlug(c) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getComparativoBySlug(slug);
  if (!c) return {};

  const url = `/ferramentas/${slug}`;
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url: absoluteUrl(url),
      siteName: SITE.name,
      locale: SITE.locale,
      type: "article",
    },
  };
}

export default async function ComparativoPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const c = getComparativoBySlug(slug);
  if (!c) notFound();

  const url = `/ferramentas/${slug}`;
  const faq = getComparativoFaq(c);
  const atualizado = c.atualizadoEm ?? SITE.defaultUpdated;
  const refBase = `s2-vs-${c.slug}`;

  // Outros comparativos p/ linkagem interna (evita página órfã).
  const relacionados = comparativos.filter((o) => o.slug !== c.slug);

  const schema = [
    breadcrumbSchema([
      { name: "Início", url: "/" },
      { name: "Ferramentas", url: "/ferramentas" },
      { name: `Systeme.io vs ${c.nome}`, url },
    ]),
    articleSchema({
      headline: c.metaTitle,
      description: c.metaDescription,
      url,
      datePublished: atualizado,
      dateModified: atualizado,
    }),
    faqPageSchema(faq),
  ];

  return (
    <article className="container mx-auto max-w-3xl px-4 py-10">
      <JsonLd data={schema} />

      {/* Breadcrumb visível */}
      <nav className="mb-6 text-sm text-[#0B132B]/60">
        <Link href="/" className="hover:text-[#00B2B2]">
          Início
        </Link>{" "}
        /{" "}
        <Link href="/ferramentas" className="hover:text-[#00B2B2]">
          Ferramentas
        </Link>{" "}
        / <span>Systeme.io vs {c.nome}</span>
      </nav>

      <header>
        <p className="text-sm font-medium uppercase tracking-wide text-[#00B2B2]">
          {c.categoria}
        </p>
        <h1 className="mt-2 text-4xl font-bold text-[#0B132B]">
          Systeme.io vs {c.nome}: Comparativo Completo (2026)
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
          A <strong>{c.nome}</strong> cobra <strong>{c.precoMinimo}</strong>. A{" "}
          <strong>Systeme.io</strong> começa em{" "}
          <strong>{c.precoComparativo}</strong> e não cobra taxa por venda.{" "}
          {c.veredito}
        </p>
      </section>

      <AffiliateCTA
        refId={`${refBase}-topo`}
        variante="topo"
        descricao="Quer pular a teoria?"
      />

      {/* Prós e contras lado a lado */}
      <section className="my-10 grid gap-6 sm:grid-cols-2">
        <div>
          <h2 className="mb-3 text-xl font-semibold text-[#0B132B]">
            {c.nome}: pontos fracos
          </h2>
          <ul className="space-y-2 text-[#0B132B]/90">
            {c.pontosFracosRival.map((p) => (
              <li key={p}>• {p}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-3 text-xl font-semibold text-[#00B2B2]">
            Systeme.io: vantagens
          </h2>
          <ul className="space-y-2 text-[#0B132B]/90">
            {c.pontosForteSysteme.map((p) => (
              <li key={p}>• {p}</li>
            ))}
          </ul>
        </div>
      </section>

      <h2 className="mb-2 text-2xl font-bold text-[#0B132B]">
        Systeme.io vs {c.nome}: tabela lado a lado
      </h2>
      <TabelaComparativa rival={c.nome} linhas={c.tabelaComparativa} />

      <AffiliateCTA
        refId={`${refBase}-meio`}
        variante="meio"
        descricao={`Cansado de pagar ${c.precoMinimo} por venda?`}
      />

      <h2 className="mb-3 mt-10 text-2xl font-bold text-[#0B132B]">Veredito</h2>
      <p className="text-[#0B132B]/90">{c.veredito}</p>

      {/* FAQ visível — espelha o FAQPage schema acima */}
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
        descricao={`Pare de perder dinheiro em taxas. A Systeme.io entrega funil, e-mail e área de membros em uma só plataforma — de graça, para sempre.`}
      />

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
    </article>
  );
}
