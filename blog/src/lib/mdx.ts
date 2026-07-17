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
 * - "pilar": artigo-pilar de silo (ex: "o que é funil de vendas") — ArticleTemplate
 * - "tutorial": passo a passo do Silo 3 (candidato a schema HowTo) — ArticleTemplate
 * - "tatico": guia tático dos Silos 4/5 — ArticleTemplate
 */
export type ArticleTipo =
  | "editorial"
  | "funil-profissao"
  | "comparativo"
  | "pilar"
  | "tutorial"
  | "tatico";

/** Tier editorial (estratégia SEO §2): calibra profundidade e atualização. */
export type ArticleTier = "A" | "B" | "C";

/** Intenção de busca do artigo (estágio do funil editorial). */
export type ArticleIntent = "tofu" | "mofu" | "bofu";

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

  // ── Campos da estratégia SEO (tiers, intenção, GEO) ──
  /** Tier editorial A/B/C — profundidade e cadência de atualização. */
  tier?: ArticleTier;
  /** Estágio do funil: tofu | mofu | bofu. */
  intent?: ArticleIntent;
  /** Data de atualização no formato da estratégia (alias de updatedAt). */
  updated?: string;
  /** Schema extra a emitir ("HowTo" nos tutoriais do Silo 3). */
  schema?: "HowTo";
  /** (Silo 2) Formato da página: vs | alternativa | taxas. */
  formato?: "vs" | "alternativa" | "taxas";
  /** (Silo 2) Data da verificação ao vivo dos preços/taxas do rival. */
  verificado_em?: string;

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

  // Campos da estratégia (quando presentes, precisam ser válidos)
  if (fm.tier && !["A", "B", "C"].includes(fm.tier)) {
    errors.push(`"tier" inválido: "${fm.tier}" (use A, B ou C)`);
  }
  if (fm.intent && !["tofu", "mofu", "bofu"].includes(fm.intent)) {
    errors.push(`"intent" inválido: "${fm.intent}" (use tofu, mofu ou bofu)`);
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

      // Normalização: `updated` (estratégia) e `updatedAt` (site) são aliases.
      if (frontmatter.updated && !frontmatter.updatedAt) {
        frontmatter.updatedAt = frontmatter.updated;
      }
      if (frontmatter.updatedAt && !frontmatter.updated) {
        frontmatter.updated = frontmatter.updatedAt;
      }

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

/**
 * Extrai os passos de um tutorial (frontmatter `schema: HowTo`) a partir
 * dos H3 numerados do MDX ("### 1. Título do passo"). O texto do passo é
 * o primeiro parágrafo após o heading (limpo de markdown/JSX básico).
 * Usado para gerar o JSON-LD HowTo sem duplicar conteúdo no frontmatter.
 */
export function extractHowToSteps(
  content: string
): { name: string; text: string }[] {
  const steps: { name: string; text: string }[] = [];
  const regex = /^###\s+\d+\.\s+(.+)$/gm;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(content)) !== null) {
    const name = match[1].trim();
    // Primeiro parágrafo após o heading (para na próxima linha em branco
    // seguida de heading/componente, ou no fim do bloco).
    const rest = content.slice(match.index + match[0].length);
    const para = rest
      .split(/\n{2,}/)
      .map((p) => p.trim())
      .find((p) => p && !p.startsWith("#") && !p.startsWith("<"));
    const text = (para ?? "")
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1") // links → texto da âncora
      .replace(/[*_`]/g, "") // ênfases
      .replace(/\s+/g, " ")
      .trim();
    steps.push({ name, text });
  }

  return steps;
}
