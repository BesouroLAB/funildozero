export interface Alternativa {
  slug: string;
  nome: string;
  precoRival: string;
  dorPrincipal: string;
  publicoAlvo: string;
  funcionalidadesChave: string[];
  comoSystemeSubstitui: string;
  metaTitle: string;
  metaDescription: string;
}

export const alternativas: Alternativa[] = [
  {
    slug: "hotmart",
    nome: "Hotmart",
    precoRival: "9,9% + R$ 1,00 por transação",
    dorPrincipal: "Taxas transacionais muito altas que corroem a margem de lucro e ausência de ecossistema All-in-One autêntico.",
    publicoAlvo: "Infoprodutores em fase de validação avançada ou escala inicial (faturamento R$ 5.000 a R$ 20.000).",
    funcionalidadesChave: ["Hospedagem de cursos", "Checkout", "Programa de afiliados público"],
    comoSystemeSubstitui: "Devolve o controle financeiro com 0% de taxas transacionais num ecossistema onde funis e e-mails ilimitados já estão integrados, com mensalidade fixa a partir de R$ 114 (ou plano grátis).",
    metaTitle: "Systeme.io vs Hotmart: A Alternativa Mais Barata em 2026",
    metaDescription: "Cansado das taxas de 9,9% da Hotmart? Descubra como a Systeme.io substitui a plataforma com 0% de taxas e ferramentas de marketing all-in-one integradas."
  },
  {
    slug: "kiwify",
    nome: "Kiwify",
    precoRival: "8,99% + R$ 2,49 por transação",
    dorPrincipal: "Agressividade nas análises de compliance gerando bloqueios de saldo e ausência de infraestrutura avançada de marketing (sem e-mail nativo).",
    publicoAlvo: "Empreendedores jovens, especialistas em PLR e dropshipping informacional (faturamento R$ 10.000 a R$ 50.000).",
    funcionalidadesChave: ["Checkout minimalista", "Área de membros simples", "Aprovação rápida"],
    comoSystemeSubstitui: "Garante 0% de comissões, blindando a operação contra bloqueios surpresa de gateways e fornecendo ferramentas robustas de automação e e-mail integrados.",
    metaTitle: "Alternativa a Kiwify: Fuja das Taxas e Bloqueios (2026)",
    metaDescription: "Procurando uma alternativa à Kiwify? Conheça a Systeme.io: 0% de taxas, sem bloqueios inesperados e com funis e e-mails ilimitados nativos."
  },
  {
    slug: "eduzz",
    nome: "Eduzz",
    precoRival: "4,9% + R$ 2,49 por transação (mais custos de apps)",
    dorPrincipal: "Fragmentação tecnológica extrema em múltiplos painéis (Nutror, Blinket, Sun) que geram confusão e fadiga de integração.",
    publicoAlvo: "Produtores de médio porte e mentores que buscam focar no aluno, mas sofrem com a parte técnica (faturamento R$ 3.000 a R$ 15.000).",
    funcionalidadesChave: ["Recuperação de vendas", "Múltiplos módulos separados", "Programa de afiliados"],
    comoSystemeSubstitui: "Agrupa tudo numa interface única, intuitiva e fluida, sem cobrar comissão e extinguindo a necessidade de assinar múltiplas ferramentas periféricas.",
    metaTitle: "Systeme.io ou Eduzz? A Melhor Alternativa Tudo-em-Um",
    metaDescription: "Cansado de gerenciar Nutror, Blinket e Sun na Eduzz? A Systeme.io consolida seu negócio digital em uma única plataforma grátis e sem taxas transacionais."
  },
  {
    slug: "greenn",
    nome: "Greenn",
    precoRival: "Taxas variáveis negociadas, mas modelo percentual",
    dorPrincipal: "Instabilidade em picos de tráfego de grandes lançamentos e imaturidade em testes A/B avançados e automação comportamental.",
    publicoAlvo: "Produtores otimizadores de custo operando volumes altos (R$ 20.000 a R$ 100.000) buscando estabilidade em lançamentos.",
    funcionalidadesChave: ["Gateway de pagamento", "Integrações locais", "Checkout de alta conversão"],
    comoSystemeSubstitui: "Proporciona a estabilidade inquebrável de infraestrutura global para grandes lançamentos com 0% de taxas percentuais, por uma mensalidade previsível.",
    metaTitle: "Alternativa Greenn: Infraestrutura Global para Lançamentos",
    metaDescription: "Sua página caiu no lançamento? Mude para a Systeme.io, a alternativa global e robusta que substitui a Greenn com 0% de taxas e estabilidade comprovada."
  },
  {
    slug: "herospark",
    nome: "Herospark",
    precoRival: "R$ 197 a R$ 497/mês (+ 7,9% na versão free)",
    dorPrincipal: "Restrições severas de capacidade no armazenamento de vídeos (20GB) e limites opressivos de captação de leads (5.000) que forçam upsells caros.",
    publicoAlvo: "Iniciantes em ascensão que necessitam da promessa 'tudo-em-um' (faturamento R$ 2.000 a R$ 10.000).",
    funcionalidadesChave: ["Criação de páginas", "Hospedagem de vídeos", "Funis predefinidos"],
    comoSystemeSubstitui: "Aniquila o ciclo de atualizações abusivas oferecendo armazenamento ilimitado e as mesmas ferramentas por R$ 114 mensais (ou de graça inicialmente).",
    metaTitle: "HeroSpark Alternativa: Pare de Pagar por Espaço de Vídeo",
    metaDescription: "Atingiu o limite de leads e armazenamento da HeroSpark? Migre para a Systeme.io e tenha armazenamento de cursos ilimitado com 0% de taxas."
  },
  {
    slug: "clickfunnels",
    nome: "ClickFunnels",
    precoRival: "US$ 97 a US$ 297/mês (em Dólar)",
    dorPrincipal: "Preços dolarizados absurdamente altos para a realidade brasileira e falta de integrações fluidas com PIX e parcelamento local.",
    publicoAlvo: "Agências e especialistas em marketing direto escalando campanhas pesadas de vendas.",
    funcionalidadesChave: ["Construtor de funis avançado", "Automação complexa", "Order bumps e upsells"],
    comoSystemeSubstitui: "Entrega o mesmo poder de construção de funis maduros sem risco cambial (R$ 114 a R$ 414), com suporte fluente e integração via gateways parceiros.",
    metaTitle: "ClickFunnels Brasil: A Melhor Alternativa Mais Barata em Real",
    metaDescription: "Pagando em dólar pelo ClickFunnels? A Systeme.io é a alternativa nacional perfeita com funis avançados, e-mail marketing nativo e cobrança em Reais."
  }
];
