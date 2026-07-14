/**
 * Constantes globais do site. Fonte única de verdade para URL, marca e autoria.
 * Usado por metadata, schema (JSON-LD) e componentes de conversão.
 */
export const SITE = {
  name: "Funil do Zero",
  url: "https://funildozero.com.br",
  description:
    "Aprenda a criar funis de vendas, páginas de captura e e-mail marketing do zero, sem pagar taxas abusivas.",
  locale: "pt_BR",
  /** Publicador (Organization) usado em Article/Organization schema. */
  publisher: "Funil do Zero",
  /** Autoria editorial padrão. Trocar por autor nomeado quando houver E-E-A-T individual. */
  author: "Equipe Funil do Zero",
  /** Logo para Organization schema. O arquivo deve existir em /public. */
  logo: "https://funildozero.com.br/logo_funil.png",
  /** Data de atualização padrão (fallback de freshness p/ SEO/GEO). */
  defaultUpdated: "2026-07-13",
} as const;

/**
 * Autoria editorial (E-E-A-T). Alimenta a página /autor e o Person schema.
 * SUBSTITUIR por um autor nomeado real (com foto e credenciais) para maximizar
 * o sinal de autoridade no Google e a citação por IA.
 */
export const AUTHOR = {
  name: "Equipe Funil do Zero",
  role: "Análise de ferramentas de marketing digital e funis de vendas",
  url: "https://funildozero.com.br/autor",
  bio: "Time editorial dedicado a testar plataformas de marketing digital e traduzir taxas, planos e recursos em decisões práticas para quem vende no digital no Brasil.",
} as const;

/** Divulgação de afiliado (transparência — sinal de confiança e E-E-A-T). */
export const AFFILIATE_DISCLOSURE =
  "O Funil do Zero participa do programa de afiliados da Systeme.io e pode receber comissão por indicações, sem custo extra para você. Nossas análises se baseiam em preços e recursos públicos.";

/** Monta uma URL absoluta a partir de um path relativo. */
export function absoluteUrl(path: string): string {
  return new URL(path, SITE.url).toString();
}
