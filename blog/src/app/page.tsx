import type { Metadata } from "next";
import Link from "next/link";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { AffiliateCTA } from "@/components/conversion/AffiliateCTA";
import { AffiliateLink } from "@/components/conversion/AffiliateLink";

export const metadata: Metadata = {
  description:
    "Aprenda a montar funis de vendas, páginas de captura e e-mail marketing do zero — sem pagar taxas abusivas nem depender de programador.",
  alternates: { canonical: "/" },
};

const SILOS = [
  {
    href: "/funil-de-vendas",
    titulo: "Funil de Vendas por Profissão",
    desc: "Como captar clientes e montar um funil para a sua área — do dentista ao personal trainer.",
  },
  {
    href: "/ferramentas",
    titulo: "Ferramentas & Comparativos",
    desc: "Systeme.io vs Hotmart, Kiwify, ClickFunnels. Compare taxas e pare de perder dinheiro.",
  },
  {
    href: "/systeme-io",
    titulo: "Systeme.io na Prática",
    desc: "Review honesto e tutoriais da plataforma all-in-one gratuita.",
  },
  {
    href: "/negocio-digital",
    titulo: "Negócio Digital do Zero",
    desc: "Como começar no marketing digital e dar os primeiros passos sem enrolação.",
  },
  {
    href: "/copywriting-vendas",
    titulo: "Copywriting & Vendas",
    desc: "Escreva ofertas e páginas que convertem, sem fórmula mágica.",
  },
];

export default function Home() {
  return (
    <main>
      <JsonLd data={[organizationSchema(), websiteSchema()]} />

      {/* Hero */}
      <section className="bg-[#0B132B] text-white">
        <div className="container mx-auto max-w-3xl px-4 py-20">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#00D1D1]">
            Operação enxuta, custo oculto zero
          </p>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight sm:text-5xl">
            Monte seu primeiro funil de vendas sem pagar a{" "}
            <span className="text-[#00D1D1]">Taxa de Guru</span>.
          </h1>
          <p className="mt-5 text-lg text-white/80">
            Marketplaces engolem até 10% de cada venda e ferramentas gringas
            cobram em dólar. Aqui você aprende a vender no digital com uma
            operação all-in-one gratuita — na ponta do lápis, sem achismo.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <AffiliateLink
              refId="home-hero"
              className="rounded-xl bg-[#00B2B2] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#00D1D1]"
            >
              Criar conta grátis na Systeme.io →
            </AffiliateLink>
            <Link
              href="/calculadora-taxa-de-guru"
              className="rounded-xl border border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:border-[#00D1D1] hover:text-[#00D1D1]"
            >
              Calcular quanto perco em taxas
            </Link>
          </div>
        </div>
      </section>

      {/* Silos */}
      <section className="container mx-auto max-w-3xl px-4 py-16">
        <h2 className="text-3xl font-bold text-[#0B132B]">
          Por onde você quer começar?
        </h2>
        <p className="mt-2 text-[#0B132B]/70">
          Cada trilha te leva do problema à solução prática.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {SILOS.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group rounded-2xl border border-gray-200 p-6 transition-colors hover:border-[#00B2B2]"
            >
              <h3 className="text-xl font-semibold text-[#0B132B] group-hover:text-[#00B2B2]">
                {s.titulo}
              </h3>
              <p className="mt-2 text-[#0B132B]/75">{s.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Calculadora — dado citável / lead magnet */}
      <section className="bg-[#F7F9FC]">
        <div className="container mx-auto max-w-3xl px-4 py-16 text-center">
          <h2 className="text-3xl font-bold text-[#0B132B]">
            Quanto você perde por ano em taxas?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[#0B132B]/75">
            Quem fatura R$ 10 mil/mês na Hotmart paga cerca de{" "}
            <strong className="text-[#C0392B]">R$ 13.080 por ano</strong> só em
            taxas. Na Systeme.io, essa conta é <strong>R$ 0</strong>. Faça a sua.
          </p>
          <Link
            href="/calculadora-taxa-de-guru"
            className="mt-6 inline-block rounded-xl bg-[#00B2B2] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#00D1D1]"
          >
            Abrir a Calculadora de Taxa de Guru →
          </Link>
        </div>
      </section>

      {/* Fechamento */}
      <section className="container mx-auto max-w-3xl px-4 py-16">
        <h2 className="text-3xl font-bold text-[#0B132B]">
          Pare de sustentar o dreno financeiro
        </h2>
        <p className="mt-3 text-[#0B132B]/80">
          Você não precisa de cinco ferramentas nem de mensalidade em dólar para
          subir um funil. A Systeme.io reúne página, e-mail, área de membros e
          checkout — com plano gratuito vitalício e zero taxa por venda.
        </p>
        <AffiliateCTA
          refId="home-fundo"
          variante="fundo"
          descricao="Comece de graça, sem cartão de crédito, e fique com o dinheiro que hoje some em taxas."
        />
      </section>
    </main>
  );
}
