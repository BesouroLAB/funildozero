import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE, absoluteUrl } from "@/lib/site";
import { getArticleBySlug, getArticleSlugs } from "@/lib/mdx";
import { ArticleTemplate } from "@/components/layout/ArticleTemplate";

const SILO = "negocio-digital";

export const dynamicParams = false;

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getArticleSlugs(SILO).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(SILO, slug);
  if (!article) return {};

  const { frontmatter } = article;
  const url = `/${SILO}/${frontmatter.slug}`;

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    alternates: { canonical: url },
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      url: absoluteUrl(url),
      siteName: SITE.name,
      locale: SITE.locale,
      type: "article",
    },
  };
}

export default async function NegocioDigitalArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(SILO, slug);
  if (!article) notFound();

  return <ArticleTemplate article={article} />;
}
