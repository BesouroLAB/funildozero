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

/**
 * Tipo de artigo — determina qual template híbrido renderiza a página.
 * - "editorial": artigo genérico renderizado pelo ArticleTemplate padrão
 * - "funil-profissao": satélite do Silo 1, renderizado pelo ArticleTemplateFunil
 * - "comparativo": satélite do Silo 2, renderizado pelo ArticleTemplateComparativo
 */
export type ArticleTipo = "editorial" | "funil-profissao" | "comparativo";

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

  /**
   * Discriminador de tipo de artigo. Determina qual template híbrido usa.
   * Default: "editorial" (comportamento legado).
   */
  tipo?: ArticleTipo;

  // ── Campos do Silo 1: Funil por Profissão ──
  /** Nome da profissão no singular (ex: "Dentista"). */
  profissao?: string;
  /** Plural em minúsculas (ex: "dentistas"). */
  profissaoPlural?: string;
  /** Cluster temático (ex: "Saúde", "Negócios B2B"). */
  cluster?: string;
  /** Principal dor de captação de clientes. */
  dor?: string;
  /** Isca digital (lead magnet) de alta conversão. */
  iscaDigital?: string;
  /** Oferta que converte no fundo do funil. */
  oferta?: string;
  /** Faixa de preço praticada nos serviços. */
  faixaPreco?: string;

  // ── Campos do Silo 2: Comparativo ──
  /** Nome da ferramenta rival (ex: "Hotmart"). */
  rival?: string;
  /** Categoria da rival (ex: "Marketplace / Hospedagem"). */
  categoria?: string;
  /** Preço/taxa mínima da rival. */
  precoMinimo?: string;
  /** Preço/taxa da Systeme.io para comparação. */
  precoComparativo?: string;
  /** Pontos fracos da rival. */
  pontosFracosRival?: string[];
  /** Pontos fortes da Systeme.io. */
  pontosForteSysteme?: string[];
  /** Pontos fracos da Systeme.io (honestidade). */
  pontosFracosSysteme?: string[];
  /** Veredito editorial. */
  veredito?: string;
  /** Linhas da tabela comparativa: { "critério": ["rival", "systeme"] }. */
  tabelaComparativa?: Record<string, string[]>;
}

export interface ArticleData {
  frontmatter: ArticleFrontmatter;
  /** Conteúdo MDX bruto (sem frontmatter). */
  content: string;
  /** Nome do arquivo original (ex: 501-o-que-e-copywriting.mdx). */
  filename: string;
}

/**
 * GUARDA DE PADRÃO SEO — roda em toda leitura de artigo (portanto no build).
 * Se um artigo violar o contrato de frontmatter, o build FALHA com mensagem
 * clara. Isso garante que todo artigo siga exatamente o mesmo padrão de dados
 * estruturados exigido pelo Google Rich Results Test.
 *
 * Inspirado no padrão do CAsemform (validação que impede schema quebrado em
 * produção).
 */
function validateFrontmatter(fm: ArticleFrontmatter, file: string): void {
  const errors: string[] = [];

  // Campos obrigatórios universais
  if (!fm.title) errors.push('campo obrigatório "title" ausente');
  if (!fm.description) errors.push('campo obrigatório "description" ausente');
  if (!fm.slug) errors.push('campo obrigatório "slug" ausente');
  if (!fm.silo) errors.push('campo obrigatório "silo" ausente');
  if (!fm.date) {
    errors.push('campo obrigatório "date" ausente (formato YYYY-MM-DD)');
  } else if (isNaN(new Date(fm.date).getTime())) {
    errors.push(`"date" inválida: "${fm.date}" (use YYYY-MM-DD)`);
  }
  if (fm.updatedAt && isNaN(new Date(fm.updatedAt).getTime())) {
    errors.push(`"updatedAt" inválida: "${fm.updatedAt}" (use YYYY-MM-DD)`);
  }

  // Título SEO: máximo 65 caracteres
  if (fm.title && fm.title.length > 65) {
    errors.push(
      `"title" com ${fm.title.length} caracteres (máx 65 para SEO)`
    );
  }

  // Meta description: máximo 160 caracteres
  if (fm.description && fm.description.length > 160) {
    errors.push(
      `"description" com ${fm.description.length} caracteres (máx 160)`
    );
  }

  // FAQ: entre 3 e 7 itens (exigência de qualidade para FAQPage schema)
  if (fm.faq !== undefined) {
    if (!Array.isArray(fm.faq) || fm.faq.some((item) => !item?.q || !item?.a)) {
      errors.push('"faq" deve ser lista de itens { q, a } preenchidos');
    } else if (fm.faq.length < 3 || fm.faq.length > 7) {
      errors.push(
        `"faq" deve ter entre 3 e 7 itens (recebido: ${fm.faq.length})`
      );
    }
  }

  // Validações por tipo de artigo
  const tipo = fm.tipo ?? "editorial";
  if (tipo === "funil-profissao") {
    if (!fm.profissao) errors.push('"tipo: funil-profissao" exige "profissao"');
    if (!fm.dor) errors.push('"tipo: funil-profissao" exige "dor"');
    if (!fm.iscaDigital)
      errors.push('"tipo: funil-profissao" exige "iscaDigital"');
    if (!fm.oferta) errors.push('"tipo: funil-profissao" exige "oferta"');
  }
  if (tipo === "comparativo") {
    if (!fm.rival) errors.push('"tipo: comparativo" exige "rival"');
  }

  if (errors.length > 0) {
    throw new Error(
      `\n[PADRÃO SEO VIOLADO] ${file}:\n  - ${errors.join("\n  - ")}\n\n` +
        `Corrija o frontmatter antes de fazer build.\n`
    );
  }
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
      const frontmatter = data as ArticleFrontmatter;

      validateFrontmatter(frontmatter, `content/${silo}/${filename}`);

      return {
        frontmatter,
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
