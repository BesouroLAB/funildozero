export interface Comparativo {
  slug: string;
  nome: string;
  categoria: string;
  precoMinimo: string;
  precoComparativo: string;
  pontosFortesRival: string[];
  pontosFracosRival: string[];
  pontosForteSysteme: string[];
  pontosFracosSysteme: string[];
  veredito: string;
  tabelaComparativa: Record<string, string[]>;
  metaTitle: string;
  metaDescription: string;
  /** Perguntas frequentes (FAQPage schema). Opcional: se ausente, geradas a partir dos dados. */
  faqItems?: { q: string; a: string }[];
  /** Data ISO da última atualização (freshness p/ SEO/GEO). Opcional. */
  atualizadoEm?: string;
}

/** Prefixo de URL do comparativo dentro do Silo 2 (ex: systeme-io-vs-hotmart). */
export const COMPARATIVO_PREFIXO = "systeme-io-vs-";

/** Slug completo de rota para um comparativo (ex: "systeme-io-vs-hotmart"). */
export function comparativoSlug(c: Comparativo): string {
  return `${COMPARATIVO_PREFIXO}${c.slug}`;
}

/** Busca um comparativo pelo slug completo de rota. Retorna undefined se não existir. */
export function getComparativoBySlug(rotaSlug: string): Comparativo | undefined {
  if (!rotaSlug.startsWith(COMPARATIVO_PREFIXO)) return undefined;
  const rival = rotaSlug.slice(COMPARATIVO_PREFIXO.length);
  return comparativos.find((c) => c.slug === rival);
}

/**
 * FAQ da página. Usa `faqItems` se definido; caso contrário gera 3 perguntas
 * reais a partir dos dados (taxa, plano grátis, veredito) — evita thin content
 * e garante FAQPage schema válido em toda página do silo.
 */
export function getComparativoFaq(c: Comparativo): { q: string; a: string }[] {
  if (c.faqItems && c.faqItems.length > 0) return c.faqItems;
  return [
    {
      q: `Qual é mais barato: ${c.nome} ou Systeme.io?`,
      a: `A ${c.nome} cobra ${c.precoMinimo}, enquanto a Systeme.io começa em ${c.precoComparativo}. Para quem já tem tráfego próprio, a Systeme.io elimina as taxas por venda.`,
    },
    {
      q: `A Systeme.io é uma boa alternativa à ${c.nome}?`,
      a: c.veredito,
    },
    {
      q: `Dá para migrar da ${c.nome} para a Systeme.io de graça?`,
      a: `Sim. A Systeme.io tem um plano grátis vitalício (sem cartão de crédito) com funil, e-mail marketing e área de membros nativos, o que permite testar a migração sem custo.`,
    },
  ];
}

export const comparativos: Comparativo[] = [
  {
    slug: "hotmart",
    nome: "Hotmart",
    categoria: "Marketplace / Hospedagem",
    precoMinimo: "9,9% + R$ 1,00",
    precoComparativo: "R$ 0,00 (Plano Grátis) / R$ 114 (Startup)",
    pontosFortesRival: ["Rede de afiliados gigantesca", "Checkout global nativo", "Confiabilidade da marca"],
    pontosFracosRival: ["Taxas de quase 10% por venda", "Precisa pagar e-mail marketing à parte", "Interface engessada para funis complexos"],
    pontosForteSysteme: ["0% de taxa por venda", "E-mail marketing e funil nativos", "Mais barata para quem está escalando"],
    pontosFracosSysteme: ["Programa de afiliados privado (você precisa atraí-los)", "Marketplace ainda sem expressão no Brasil"],
    veredito: "A Systeme.io vence para quem já possui tráfego próprio e não quer dividir 10% do seu lucro com a plataforma. A Hotmart só faz sentido se você depender 100% de afiliados que encontram seu produto sozinhos no mercado deles.",
    tabelaComparativa: {
      "Taxa sobre venda": ["9,9% + R$ 1,00", "0% (isento)"],
      "E-mail Marketing": ["Pago à parte", "Ilimitado nativo"],
      "Construtor de Funis": ["Básico / Externo", "Avançado e Integrado"],
      "Mensalidade Inicial": ["Grátis (mas taxa alta)", "Grátis (sem taxa)"]
    },
    metaTitle: "Systeme.io ou Hotmart? Comparativo Completo e Veredito (2026)",
    metaDescription: "Qual é melhor: Hotmart ou Systeme.io? Comparamos taxas, ferramentas e suporte para você não perder dinheiro em 2026.",
    atualizadoEm: "2026-07-13",
    faqItems: [
      {
        q: "Quanto a Hotmart cobra por venda?",
        a: "A Hotmart cobra 9,9% + R$ 1,00 por transação. Em R$ 10.000 de faturamento mensal, isso representa cerca de R$ 1.090 retidos pela plataforma — valor que a Systeme.io não cobra (0% de taxa em todos os planos)."
      },
      {
        q: "A Systeme.io substitui a Hotmart por completo?",
        a: "Para quem tem tráfego próprio, sim: a Systeme.io entrega checkout, área de membros, e-mail marketing e funil no mesmo lugar. A Hotmart só é insubstituível se você depende do marketplace dela para que afiliados encontrem seu produto."
      },
      {
        q: "Vale a pena migrar da Hotmart para a Systeme.io?",
        a: "Vale para quem já não depende do marketplace e quer parar de perder ~10% em cada venda. O plano grátis vitalício da Systeme.io permite testar a estrutura completa antes de migrar, sem cartão de crédito."
      }
    ]
  },
  {
    slug: "kiwify",
    nome: "Kiwify",
    categoria: "Checkout de Alta Conversão",
    precoMinimo: "8,99% + R$ 2,49",
    precoComparativo: "R$ 0,00 (Plano Grátis) / R$ 114 (Startup)",
    pontosFortesRival: ["Checkout extremamente veloz", "Liberação rápida de saldo", "Área de membros intuitiva e gamificada"],
    pontosFracosRival: ["Sem automação de marketing", "Risco alto de bloqueios e compliance severo", "Taxas transacionais altas (8,99%)"],
    pontosForteSysteme: ["Independência de bloqueios em gateways (use o seu)", "Zero taxas transacionais", "Motor de automação integrado"],
    pontosFracosSysteme: ["Área de membros menos social/comunitária", "Checkout não tem o mesmo hype visual da Kiwify"],
    veredito: "Se você vende produtos de PLR de alto volume e sofre bloqueios ou paga taxas altas, a Systeme.io te liberta. A Kiwify é melhor apenas para o produtor que quer tudo pronto sem pensar na margem de lucro a longo prazo.",
    tabelaComparativa: {
      "Taxa sobre venda": ["8,99% + R$ 2,49", "0% (isento)"],
      "Automação de E-mail": ["Inexistente", "Nativa e Ilimitada"],
      "Risco de Bloqueio": ["Alto (Compliance forte)", "Baixo (Você usa seu Stripe/MercadoPago)"],
      "Criação de Páginas": ["Básica", "Construtor Drag-and-Drop Completo"]
    },
    metaTitle: "Kiwify vs Systeme.io: Qual Vale Mais a Pena para Infoprodutores?",
    metaDescription: "Analisamos Kiwify e Systeme.io. Veja como fugir dos bloqueios de saldo e da taxa de 8,99% usando uma plataforma all-in-one gratuita."
  },
  {
    slug: "clickfunnels",
    nome: "ClickFunnels",
    categoria: "Construtor de Funis Americano",
    precoMinimo: "US$ 97 / mês",
    precoComparativo: "R$ 0,00 (Plano Grátis) / R$ 114 (Startup)",
    pontosFortesRival: ["Construtor visual altamente sofisticado", "Forte ecossistema e comunidade (Russell Brunson)", "Marketplace de funis milionários"],
    pontosFracosRival: ["Mensalidades altíssimas em Dólar", "Falta de integração nativa e simples com PIX", "Suporte e comunidade totalmente em Inglês"],
    pontosForteSysteme: ["Mensalidade fixa em Reais Brasileiros (1/5 do preço)", "Traduzida para Português BR e focada na Europa/Brasil", "Mesmos recursos centrais de funil e automação"],
    pontosFracosSysteme: ["Falta efeitos cinematográficos nas páginas", "Sem a grife de um 'Two Comma Club' oficial"],
    veredito: "A Systeme.io é a 'ClickFunnels do Brasil'. Oferece 95% do poder de construção e automação pagando 5 vezes menos, sem se preocupar com a cotação do Dólar no final do mês.",
    tabelaComparativa: {
      "Preço Mensal Base": ["~ R$ 500 (US$ 97)", "R$ 0 (Grátis) ou R$ 114"],
      "Moeda de Cobrança": ["Dólar", "Real (BRL)"],
      "Suporte Local": ["Apenas Inglês", "Português do Brasil"],
      "Integração PIX": ["Complexa (via Zapier/Apps)", "Mais acessível via Gateways parceiros"]
    },
    metaTitle: "ClickFunnels vs Systeme.io: Pare de Pagar em Dólar (2026)",
    metaDescription: "O Dólar está pesando? Compare Systeme.io e ClickFunnels e descubra como ter funis profissionais pagando uma fração do preço em Reais."
  }
];
