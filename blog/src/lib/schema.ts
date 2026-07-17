/**
 * Geradores de Schema.org (JSON-LD) tipados com IDs canônicos (@id).
 * Retornam objetos puros que são serializados pelo componente <JsonLd>.
 * 
 * Implementação de Knowledge Graph: As entidades são conectadas por @id,
 * garantindo que o Google entenda que o Autor, a Organização, o Site e os Artigos
 * são parte do mesmo ecossistema, e não entidades isoladas em cada página.
 */
import { SITE, absoluteUrl } from "./site";

export type JsonLdObject = Record<string, unknown>;

// IDs Canônicos para conectar o Knowledge Graph
const ORG_ID = `${SITE.url}/#organization`;
const WEBSITE_ID = `${SITE.url}/#website`;
const AUTHOR_ID = `${SITE.url}/autor#tiago-fernandes`;

export function organizationSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.publisher,
    url: SITE.url,
    logo: {
      "@type": "ImageObject",
      url: SITE.logo,
    },
    founder: { "@id": AUTHOR_ID },
  };
}

export function websiteSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    inLanguage: "pt-BR",
    publisher: { "@id": ORG_ID },
  };
}

export interface BreadcrumbItem {
  name: string;
  /** Path relativo (ex: "/ferramentas") ou URL absoluta. */
  url: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}

export interface ArticleSchemaInput {
  headline: string;
  description: string;
  /** Path relativo do artigo (ex: "/ferramentas/systeme-io-vs-hotmart"). */
  url: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
  authorName?: string;
}

export function articleSchema(input: ArticleSchemaInput): JsonLdObject {
  const published = input.datePublished ?? SITE.defaultUpdated;
  const articleUrl = absoluteUrl(input.url);
  
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    url: articleUrl,
    mainEntityOfPage: articleUrl, // Google prefere a URL direta em vez de WebPage complexa em Article
    isPartOf: { "@id": WEBSITE_ID },
    ...(input.image ? { image: input.image } : {}),
    datePublished: published,
    dateModified: input.dateModified ?? published,
    // Referencia as entidades globais via @id para unificar a autoridade
    author: { "@id": AUTHOR_ID },
    publisher: { "@id": ORG_ID },
  };
}

export interface PersonSchemaInput {
  name: string;
  url: string;
  jobTitle?: string;
  description?: string;
  /** Perfis externos (LinkedIn, etc.) que reforçam a entidade. */
  sameAs?: string[];
}

export function personSchema(input: PersonSchemaInput): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": AUTHOR_ID,
    name: input.name,
    url: absoluteUrl(input.url),
    ...(input.jobTitle ? { jobTitle: input.jobTitle } : {}),
    ...(input.description ? { description: input.description } : {}),
    ...(input.sameAs && input.sameAs.length > 0 ? { sameAs: input.sameAs } : {}),
    worksFor: { "@id": ORG_ID },
  };
}

export interface ReviewSchemaInput {
  /** Nome do produto avaliado (ex: "Systeme.io"). */
  itemName: string;
  /** Categoria do app (ex: "BusinessApplication"). */
  applicationCategory?: string;
  ratingValue: number;
  bestRating?: number;
  description: string;
  url: string;
  authorName?: string;
}

/** Review de software com nota editorial (rich snippet de estrelas no Google). */
export function reviewSchema(input: ReviewSchemaInput): JsonLdObject {
  const reviewUrl = absoluteUrl(input.url);

  return {
    "@context": "https://schema.org",
    // Para renderizar estrelas para software, é necessário o escopo de SoftwareApplication
    "@type": "SoftwareApplication",
    name: input.itemName,
    applicationCategory: input.applicationCategory ?? "BusinessApplication",
    operatingSystem: "Web",
    url: reviewUrl,
    description: input.description,
    review: {
      "@type": "Review",
      name: `Review ${input.itemName}`,
      reviewRating: {
        "@type": "Rating",
        ratingValue: input.ratingValue,
        bestRating: input.bestRating ?? 5,
      },
      author: { "@id": AUTHOR_ID },
      publisher: { "@id": ORG_ID },
    },
  };
}

export interface HowToStep {
  name: string;
  text: string;
}

export interface HowToSchemaInput {
  name: string;
  description: string;
  /** Path relativo do tutorial (ex: "/systeme-io/como-criar-pagina-de-captura"). */
  url: string;
  steps: HowToStep[];
  /** Duração total no formato ISO 8601 (ex: "PT30M"). */
  totalTime?: string;
}

/**
 * HowTo para os tutoriais do Silo 3 — candidato forte a rich result.
 * Os passos vêm dos H3 numerados do MDX (ver extractHowToSteps em lib/mdx).
 */
export function howToSchema(input: HowToSchemaInput): JsonLdObject {
  const url = absoluteUrl(input.url);
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: input.name,
    description: input.description,
    url,
    ...(input.totalTime ? { totalTime: input.totalTime } : {}),
    step: input.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

export interface FaqItem {
  q: string;
  a: string;
}

export function faqPageSchema(items: FaqItem[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}
