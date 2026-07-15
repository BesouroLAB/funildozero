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
      sameAs: AUTHOR.projetos.map((p) => p.url),
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

      <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center">
        {/* Foto de Perfil */}
        <div className="h-32 w-32 shrink-0 overflow-hidden rounded-full border-4 border-[#F7F9FC] shadow-lg">
          <img
            src="/foto-tiago.jpg"
            alt="Tiago Fernandes"
            className="h-full w-full object-cover"
          />
        </div>
        
        <div>
          <h1 className="text-4xl font-bold text-[#0B132B]">{AUTHOR.name}</h1>
          <p className="mt-2 font-medium text-[#00B2B2]">{AUTHOR.role}</p>
        </div>
      </div>

      <div className="mt-10 space-y-5 text-[#0B132B]/90">
        <p>
          Roteirista de conteúdo há 16 anos, atuei como Redator Publicitário no Magalu. Especialista no desenvolvimento de roteiros para web vídeos de produtos, roteirização de unboxings/reviews focados em tecnologia e conteúdos para treinamentos organizacionais.
        </p>
        <p>
          Desde 2010, participo do processo de crescimento do Magazine Luiza, onde tive o privilégio de acompanhar e contribuir com a evolução da voz e tom da marca, personificados pela Lu. Essa jornada me deu experiência para navegar por diversos temas — afinal, o que você procura, #TemNoMagalu. Também lidero equipes de redação, faço revisão de textos e formo novos roteiristas, atuando até como assistente de direção no set de filmagem.
        </p>
        <p>
          Sempre fui apaixonado por tecnologia e acredito no poder que ela tem de informar e transformar a vida das pessoas. Atualmente, aplico essa paixão no Design de Experiência do Usuário, com foco em UX Writing e Design Conversacional (VUIs), criando jornadas mais fluidas e humanas.
        </p>
        <p>
          No universo empreendedor, sou o criador da{" "}
          <a
            href="https://besourolab.com.br/"
            target="_blank"
            rel="noopener"
            className="font-semibold text-[#00B2B2] hover:underline"
          >
            BesouroLAB
          </a>{" "}
          (engenharia web, SEO técnico e IA generativa) e do{" "}
          <a
            href="https://estudiosabor.com.br/"
            target="_blank"
            rel="noopener"
            className="font-semibold text-[#00B2B2] hover:underline"
          >
            Estúdio & Sabor
          </a>{" "}
          (IA que transforma fotos de pratos em imagens profissionais).
        </p>
        <p>
          Aqui no <strong>Funil do Zero</strong>, trago essa bagagem de escrita persuasiva e simplificação da tecnologia para ajudar criadores e prestadores de serviço a estruturarem seus funis de vendas — de forma pragmática e sem pagar taxas abusivas.
        </p>

        <p className="pt-4">
          Saiba mais sobre a nossa metodologia e modelo de afiliação na página{" "}
          <Link href="/sobre" className="text-[#00B2B2] hover:underline">
            Sobre o Funil do Zero
          </Link>
          .
        </p>
      </div>
    </article>
  );
}
