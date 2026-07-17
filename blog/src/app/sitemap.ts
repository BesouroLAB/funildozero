import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/mdx";
import { comparativos, comparativoSlug } from "@/data/comparativos";
import { SITE, absoluteUrl } from "@/lib/site";

/**
 * Sitemap 100% programático nativo do Next.js.
 * Elimina a dependência de pacotes de terceiros (next-sitemap)
 * e gera o XML automaticamente a partir dos arquivos MDX e rotas estáticas.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();

  // Rotas estáticas raízes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: absoluteUrl("/sobre"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: absoluteUrl("/autor"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: absoluteUrl("/calculadora-de-taxas"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Identifica todos os silos a partir dos artigos
  const silos = Array.from(new Set(articles.map((a) => a.frontmatter.silo)));

  const siloRoutes: MetadataRoute.Sitemap = silos.map((silo) => {
    // Busca o artigo mais recente do silo para usar como lastModified do silo
    const siloArticles = articles.filter((a) => a.frontmatter.silo === silo);
    
    // Sort articles by date to get the most recent one
    const sorted = [...siloArticles].sort(
      (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
    );

    let lastMod = new Date();
    if (sorted.length > 0) {
       lastMod = new Date(sorted[0].frontmatter.updatedAt || sorted[0].frontmatter.date);
    }

    return {
      url: absoluteUrl(`/${silo}`),
      lastModified: lastMod,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    };
  });

  // Rotas dinâmicas dos artigos
  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => {
    const lastModified = article.frontmatter.updatedAt 
      ? new Date(article.frontmatter.updatedAt) 
      : new Date(article.frontmatter.date);

    return {
      url: absoluteUrl(`/${article.frontmatter.silo}/${article.frontmatter.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    };
  });

  // Comparativos programáticos (dataset) que ainda não migraram para MDX.
  // Dedupe: quando existe MDX com o mesmo slug, o artigo (acima) prevalece.
  const mdxFerramentasSlugs = new Set(
    articles
      .filter((a) => a.frontmatter.silo === "ferramentas")
      .map((a) => a.frontmatter.slug)
  );
  const comparativoRoutes: MetadataRoute.Sitemap = comparativos
    .filter((c) => !mdxFerramentasSlugs.has(comparativoSlug(c)))
    .map((c) => ({
      url: absoluteUrl(`/ferramentas/${comparativoSlug(c)}`),
      lastModified: new Date(c.atualizadoEm ?? SITE.defaultUpdated),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  return [...staticRoutes, ...siloRoutes, ...articleRoutes, ...comparativoRoutes];
}
