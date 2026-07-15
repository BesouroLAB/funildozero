/**
 * Taxas transacionais das plataformas (dados numéricos p/ a Calculadora de Taxa
 * de Guru). Fonte: preços públicos das plataformas (2026). Mantido separado dos
 * comparativos (que guardam strings de exibição) para permitir cálculo.
 *
 * `percentual` é fração (0.099 = 9,9%). `fixo` é o valor em R$ cobrado por
 * transação. A Systeme.io cobra 0% de taxa de plataforma (referência do cálculo).
 */
export interface PlataformaTaxa {
  slug: string;
  nome: string;
  percentual: number;
  fixo: number;
}

export const plataformasTaxa: PlataformaTaxa[] = [
  { slug: "hotmart", nome: "Hotmart", percentual: 0.099, fixo: 1.0 },
  { slug: "kiwify", nome: "Kiwify", percentual: 0.0899, fixo: 2.49 },
  { slug: "eduzz", nome: "Eduzz", percentual: 0.049, fixo: 2.49 },
  { slug: "greenn", nome: "Greenn", percentual: 0.0499, fixo: 1.0 },
  { slug: "herospark", nome: "HeroSpark", percentual: 0.079, fixo: 0.0 },
];

/** Taxa da Systeme.io usada como referência de comparação (0%). */
export const TAXA_SYSTEME = { percentual: 0, fixo: 0 } as const;
