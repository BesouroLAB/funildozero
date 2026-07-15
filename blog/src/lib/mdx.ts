/**
 * Utilitário para ler e parsear artigos MDX do diretório content/.
 *
 * Os arquivos seguem a taxonomia: {siloId}{index}-{slug}.mdx
 * Ex: 501-o-que-e-copywriting.mdx
 *
 * O frontmatter contém: title, description, slug, silo, siloLabel, date,
 * updatedAt, faq, tags.
 */
import fs from "fs";
import path from "path";
import matter from "gray-matter";

/** Diretório raiz do conteúdo editorial. */
const CONTENT_DIR = path.join(process.cwd(), "content");

export interface ArticleFrontmatter {
  title: string;
  description: string;
  slug: string;
  silo: string;
  siloLabel: string;
  date: string;
  updatedAt: string;
  faq?: { q: string; a: string }[];
  tags?: string[];
  /**
   * Fontes externas que embasam o artigo (dados, estatísticas, citações).
   * Renderizadas na seção "Fontes" do ArticleTemplate — sinal de E-E-A-T e
   * citabilidade por IA. URLs validadas manualmente antes de entrar aqui.
   */
  fontes?: { nome: string; url: string }[];
}

export interface ArticleData {
  frontmatter: ArticleFrontmatter;
  /** Conteúdo MDX bruto (sem frontmatter). */
  content: string;
  /** Nome do arquivo original (ex: 501-o-que-e-copywriting.mdx). */
  filename: string;
}

/**
 * Retorna todos os artigos de um silo específico.
 * @param silo - Nome da pasta do silo em content/ (ex: "copywriting-vendas")
 */
export function getArticlesBySilo(silo: string): ArticleData[] {
  const siloDir = path.join(CONTENT_DIR, silo);
  if (!fs.existsSync(siloDir)) return [];

  return fs
    .readdirSync(siloDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((filename) => {
      const filePath = path.join(siloDir, filename);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      return {
        frontmatter: data as ArticleFrontmatter,
        content,
        filename,
      };
    })
    .sort((a, b) => a.filename.localeCompare(b.filename));
}

/**
 * Busca um artigo por slug dentro de um silo.
 * @returns O artigo encontrado, ou null se não existir.
 */
export function getArticleBySlug(
  silo: string,
  slug: string
): ArticleData | null {
  const articles = getArticlesBySilo(silo);
  return articles.find((a) => a.frontmatter.slug === slug) ?? null;
}

/**
 * Retorna todos os artigos de todos os silos.
 */
export function getAllArticles(): ArticleData[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const silos = fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  return silos.flatMap((silo) => getArticlesBySilo(silo));
}

/**
 * Retorna todos os slugs de artigos de um silo (para generateStaticParams).
 */
export function getArticleSlugs(silo: string): string[] {
  return getArticlesBySilo(silo).map((a) => a.frontmatter.slug);
}
