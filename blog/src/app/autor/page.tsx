import type { Metadata } from "next";
import Link from "next/link";
import { SITE, AUTHOR, absoluteUrl } from "@/lib/site";
import { breadcrumbSchema, personSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";

const URL_PATH = "/autor";

export const metadata: Metadata = {
  title: `${AUTHOR.name} — Autoria`,
  description: AUTHOR.bio,
  alternates: { canonical: URL_PATH },
  openGraph: {
    title: `${AUTHOR.name} — Autoria | ${SITE.name}`,
    description: AUTHOR.bio,
    url: absoluteUrl(URL_PATH),
    siteName: SITE.name,
    locale: SITE.locale,
    type: "profile",
  },
};

export default function AutorPage() {
  const schema = [
    personSchema({
      name: AUTHOR.name,
      url: AUTHOR.url,
      jobTitle: AUTHOR.role,
      description: AUTHOR.bio,
    }),
    breadcrumbSchema([
      { name: "Início", url: "/" },
      { name: "Autor", url: URL_PATH },
    ]),
  ];

  return (
    <article className="container mx-auto max-w-3xl px-4 py-10">
      <JsonLd data={schema} />

      <nav className="mb-6 text-sm text-[#0B132B]/60">
        <Link href="/" className="hover:text-[#00B2B2]">
          Início
        </Link>{" "}
        / <span>Autor</span>
      </nav>

      <h1 className="text-4xl font-bold text-[#0B132B]">{AUTHOR.name}</h1>
      <p className="mt-2 text-[#00B2B2]">{AUTHOR.role}</p>

      <div className="mt-6 space-y-5 text-[#0B132B]/90">
        <p>{AUTHOR.bio}</p>
        <p>
          Todo conteúdo do Funil do Zero passa por um mesmo princípio editorial:
          partir de dados públicos das plataformas, traduzir taxas e planos em
          impacto financeiro real e recomendar o caminho mais enxuto para quem
          está começando a vender no digital.
        </p>
        <p>
          Saiba mais sobre nossa metodologia e o modelo de afiliação na página{" "}
          <Link href="/sobre" className="text-[#00B2B2] hover:underline">
            Sobre o Funil do Zero
          </Link>
          .
        </p>
      </div>
    </article>
  );
}
