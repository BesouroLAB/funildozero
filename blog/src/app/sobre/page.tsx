import type { Metadata } from "next";
import Link from "next/link";
import { SITE, absoluteUrl, AFFILIATE_DISCLOSURE } from "@/lib/site";
import { breadcrumbSchema, organizationSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";

const URL_PATH = "/sobre";

export const metadata: Metadata = {
  title: "Sobre o Funil do Zero",
  description:
    "Quem somos e como analisamos ferramentas de marketing digital. Ajudamos você a montar funis de vendas sem pagar taxas abusivas.",
  alternates: { canonical: URL_PATH },
  openGraph: {
    title: "Sobre o Funil do Zero",
    description:
      "Como analisamos ferramentas de marketing digital para ajudar você a vender no digital sem taxas abusivas.",
    url: absoluteUrl(URL_PATH),
    siteName: SITE.name,
    locale: SITE.locale,
    type: "website",
  },
};

export default function SobrePage() {
  const schema = [
    organizationSchema(),
    breadcrumbSchema([
      { name: "Início", url: "/" },
      { name: "Sobre", url: URL_PATH },
    ]),
  ];

  return (
    <article className="container mx-auto max-w-3xl px-4 py-10">
      <JsonLd data={schema} />

      <nav className="mb-6 text-sm text-[#0B132B]/60">
        <Link href="/" className="hover:text-[#00B2B2]">
          Início
        </Link>{" "}
        / <span>Sobre</span>
      </nav>

      <h1 className="text-4xl font-bold text-[#0B132B]">
        Sobre o Funil do Zero
      </h1>

      <div className="mt-6 space-y-5 text-[#0B132B]/90">
        <p>
          O <strong>Funil do Zero</strong> existe para combater um problema
          específico do mercado digital brasileiro: o dreno financeiro das taxas
          abusivas. Enquanto marketplaces cobram até 10% de cada venda e
          ferramentas estrangeiras cobram em dólar, muita gente desiste de
          empreender no digital antes mesmo de lucrar.
        </p>
        <p>
          Nossa missão é mostrar, com números na ponta do lápis, como montar um
          funil de vendas completo — página de captura, e-mail marketing e área
          de membros — gastando o mínimo (ou nada). Somos pragmáticos: menos
          teoria, mais &ldquo;como fazer&rdquo; e &ldquo;quanto custa&rdquo;.
        </p>

        <h2 className="pt-4 text-2xl font-bold text-[#0B132B]">
          Quem está por trás do projeto?
        </h2>
        
        <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-[#F7F9FC] p-4">
          <img
            src="/foto-tiago.jpg"
            alt="Tiago Fernandes"
            className="h-16 w-16 shrink-0 rounded-full object-cover shadow-sm"
          />
          <div>
            <p className="font-semibold text-[#0B132B]">Tiago Fernandes</p>
            <p className="text-sm text-[#0B132B]/80">
              Roteirista de conteúdo no Magalu há 16 anos, UX Writer e especialista em conteúdo conversacional. Criador da BesouroLAB e Estúdio & Sabor.
            </p>
            <Link
              href="/autor"
              className="mt-1 inline-block text-sm font-semibold text-[#00B2B2] hover:underline"
            >
              Ler perfil completo →
            </Link>
          </div>
        </div>

        <h2 className="pt-4 text-2xl font-bold text-[#0B132B]">
          Como analisamos as ferramentas
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Comparamos preços, taxas e recursos com base em informações públicas
            das próprias plataformas.
          </li>
          <li>
            Traduzimos taxas percentuais em valores reais (quanto você perde por
            mês e por ano) com ferramentas como a{" "}
            <Link
              href="/calculadora-de-taxas"
              className="text-[#00B2B2] hover:underline"
            >
              Calculadora de Taxas de Plataformas
            </Link>
            .
          </li>
          <li>
            Apontamos os defeitos das ferramentas que recomendamos — honestidade
            é o que sustenta a confiança.
          </li>
        </ul>

        <h2 className="pt-4 text-2xl font-bold text-[#0B132B]">Transparência</h2>
        <p>{AFFILIATE_DISCLOSURE}</p>
      </div>
    </article>
  );
}
