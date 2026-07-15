/**
 * Geradores de Schema.org (JSON-LD) tipados. Retornam objetos puros que são
 * serializados pelo componente <JsonLd>. Sem dependências externas (schema-dts
 * é opcional e foi evitado para manter o bundle enxuto).
 *
 * Cobertura de rich snippets: Organization, WebSite, BreadcrumbList, Article,
 * FAQPage. Base para ganhar snippets no Google e citações em motores de IA.
 */
import { SITE, absoluteUrl } from "./site";

export type JsonLdObject = Record<string, unknown>;

export function organizationSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.publisher,
    url: SITE.url,
    logo: SITE.logo,
  };
}

export function websiteSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    inLanguage: "pt-BR",
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
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(input.url),
    },
    ...(input.image ? { image: input.image } : {}),
    datePublished: published,
    dateModified: input.dateModified ?? published,
    author: {
      "@type": "Person",
      name: input.authorName ?? SITE.author,
      url: absoluteUrl("/autor"),
    },
    publisher: {
      "@type": "Organization",
      name: SITE.publisher,
      logo: {
        "@type": "ImageObject",
        url: SITE.logo,
      },
    },
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
    name: input.name,
    url: input.url,
    ...(input.jobTitle ? { jobTitle: input.jobTitle } : {}),
    ...(input.description ? { description: input.description } : {}),
    ...(input.sameAs && input.sameAs.length > 0 ? { sameAs: input.sameAs } : {}),
    worksFor: {
      "@type": "Organization",
      name: SITE.publisher,
      url: SITE.url,
    },
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
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "SoftwareApplication",
      name: input.itemName,
      applicationCategory: input.applicationCategory ?? "BusinessApplication",
      operatingSystem: "Web",
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: input.ratingValue,
      bestRating: input.bestRating ?? 5,
    },
    name: `Review ${input.itemName}`,
    description: input.description,
    url: absoluteUrl(input.url),
    author: {
      "@type": "Person",
      name: input.authorName ?? SITE.author,
      url: absoluteUrl("/autor"),
    },
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
