import type { Metadata } from "next";
import Link from "next/link";
import { SITE, absoluteUrl, AFFILIATE_DISCLOSURE } from "@/lib/site";
import { articleSchema, breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { CalculadoraTaxa } from "@/components/tools/CalculadoraTaxa";

const URL_PATH = "/calculadora-taxa-de-guru";
const ATUALIZADO = SITE.defaultUpdated;

const FAQ = [
  {
    q: "O que é a 'Taxa de Guru'?",
    a: "É o apelido para a soma das taxas transacionais que marketplaces de infoproduto (como Hotmart e Kiwify) cobram por venda — normalmente entre 8,99% e 9,9% mais um valor fixo por transação. Em faturamentos altos, isso vira milhares de reais por mês.",
  },
  {
    q: "Quanto um produtor que fatura R$ 10.000 por mês perde em taxas?",
    a: "Na Hotmart (9,9% + R$ 1,00), com ticket médio de R$ 100 (100 vendas), a taxa fica em torno de R$ 1.090 por mês, ou cerca de R$ 13.080 por ano. Na Systeme.io, a taxa de plataforma é 0%.",
  },
  {
    q: "A Systeme.io realmente não cobra taxa por venda?",
    a: "A Systeme.io cobra 0% de taxa de plataforma em todos os planos, inclusive no gratuito. Você paga apenas as taxas do seu gateway de pagamento (cartão/Pix), que são cobradas por qualquer plataforma.",
  },
];

export const metadata: Metadata = {
  title: "Calculadora de Taxa de Guru: Quanto Você Perde por Ano? (2026)",
  description:
    "Descubra em segundos quanto você paga de taxa na Hotmart ou Kiwify e quanto economizaria com os 0% da Systeme.io. Calculadora grátis.",
  alternates: { canonical: URL_PATH },
  openGraph: {
    title: "Calculadora de Taxa de Guru",
    description:
      "Quanto você perde por ano em taxas de marketplace? Calcule e compare com os 0% da Systeme.io.",
    url: absoluteUrl(URL_PATH),
    siteName: SITE.name,
    locale: SITE.locale,
    type: "website",
  },
};

export default function CalculadoraPage() {
  const schema = [
    breadcrumbSchema([
      { name: "Início", url: "/" },
      { name: "Calculadora de Taxa de Guru", url: URL_PATH },
    ]),
    articleSchema({
      headline: "Calculadora de Taxa de Guru",
      description:
        "Ferramenta gratuita que calcula quanto você paga de taxa por venda em marketplaces e compara com os 0% da Systeme.io.",
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
        / <span>Calculadora de Taxa de Guru</span>
      </nav>

      <header>
        <h1 className="text-4xl font-bold text-[#0B132B]">
          Calculadora de Taxa de Guru
        </h1>
        <p className="mt-3 text-lg text-[#0B132B]/80">
          Quanto do seu faturamento os marketplaces engolem em taxas por venda?
          Calcule abaixo e veja quanto sobraria com os 0% da Systeme.io.
        </p>
      </header>

      <CalculadoraTaxa />

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

      <p className="mt-10 border-t border-gray-200 pt-6 text-xs text-[#0B132B]/50">
        {AFFILIATE_DISCLOSURE}
      </p>
    </article>
  );
}
