/**
 * Dados do Silo 1 (Funil de Vendas por Profissão). Alimenta a rota
 * programática /funil-de-vendas/[profissao].
 *
 * Fonte: pesquisa "Funis de Vendas por Profissão" (30 profissões, 5 clusters).
 * Os campos espelham as colunas da pesquisa (dor, isca, oferta, preço) para
 * manter o conteúdo factual e evitar thin content.
 */

export type Cluster =
  | "Saúde"
  | "Negócios B2B"
  | "Criativo"
  | "Estética"
  | "Educação";

export interface Profissao {
  slug: string;
  /** Nome no singular, capitalizado (ex: "Advogado"). */
  profissao: string;
  /** Plural em minúsculas para uso em frases (ex: "advogados"). */
  profissaoPlural: string;
  cluster: Cluster;
  /** Principal dor de captação de clientes. */
  dor: string;
  /** Isca digital (lead magnet) de alta conversão. */
  iscaDigital: string;
  /** Tipo de oferta que converte no fundo do funil. */
  oferta: string;
  /** Faixa de preço praticada nos serviços/consultas online. */
  faixaPreco: string;
  metaTitle: string;
  metaDescription: string;
  /** Perguntas frequentes (FAQPage schema). Opcional: se ausente, geradas dos dados. */
  faqItems?: { q: string; a: string }[];
  /** Data ISO da última atualização (freshness p/ SEO/GEO). Opcional. */
  atualizadoEm?: string;
}

/** Parágrafo de contexto por cluster (variação de template — regra anti-thin-content). */
export const clusterContexto: Record<Cluster, string> = {
  Saúde:
    "No setor de saúde, o funil não persuade: educa. As restrições éticas dos conselhos de classe (CFM, CFO, CRP) proíbem promessas de cura, então a confiança vem de conteúdo educativo e de pequenas vitórias iniciais que ativam a reciprocidade antes de qualquer agendamento.",
  "Negócios B2B":
    "Em serviços B2B, o ciclo de decisão é longo e racional. O erro clássico é vender antes da hora: o profissional gasta horas em propostas para quem ainda está apenas se informando. A isca digital funciona como peneira, deixando avançar só quem já demonstrou intenção real.",
  Criativo:
    "Na economia criativa, o desafio é tangibilizar o valor de um ativo intangível. A isca digital (auditoria, swipe file, template) demonstra competência na prática e reconfigura a percepção do cliente, justificando orçamentos de alto valor em vez de guerra de preço.",
  Estética:
    "Na estética, a vitrine visual (Instagram, Pinterest) atrai, mas quem fecha é a mecânica: formulários de diagnóstico capturam o lead, qualificam a dor e preenchem os horários ociosos com combos de alto ticket — trocando likes por agenda cheia.",
  Educação:
    "No mercado de conhecimento, o funil está no estado mais puro e agressivo. Desafios gratuitos e masterclasses ativam o desejo; a filtragem por formulário de aplicação e a escassez no fundo de funil sustentam ofertas high-ticket e recorrência.",
};

export const profissoes: Profissao[] = [
  // ───────────────────────── Cluster 1: Saúde ─────────────────────────
  {
    slug: "medico",
    profissao: "Médico",
    profissaoPlural: "médicos",
    cluster: "Saúde",
    dor: "Limitações éticas do CFM e a dificuldade de mostrar valor sem mercantilizar a profissão.",
    iscaDigital: "Webinars educativos sobre prevenção e infográficos sobre qualidade de vida.",
    oferta: "Agendamento de consulta diagnóstica de alto valor ou avaliação para procedimentos eletivos.",
    faixaPreco: "R$ 300 a R$ 1.500+ por consulta particular de especialidade.",
    metaTitle: "Funil de Vendas para Médicos: Como Captar Pacientes em 2026",
    metaDescription: "Como atrair pacientes particulares respeitando o CFM. Monte um funil de conteúdo educativo e agenda de consultas — sem depender de convênios.",
    atualizadoEm: "2026-07-13",
  },
  {
    slug: "dentista",
    profissao: "Dentista",
    profissaoPlural: "dentistas",
    cluster: "Saúde",
    dor: "Agenda lotada de procedimentos de baixo ticket e horários nobres vazios para tratamentos de alto valor.",
    iscaDigital: "Teste de autoavaliação estética do sorriso e e-books sobre reabilitação oral e implantes.",
    oferta: "Agendamento de avaliação clínica focada na dor identificada na isca.",
    faixaPreco: "R$ 3.000 a R$ 15.000+ para reabilitação completa e alinhadores.",
    metaTitle: "Funil de Vendas para Dentistas: Encha a Agenda de Alto Ticket",
    metaDescription: "Pare de lotar a agenda com profilaxia barata. Um funil que filtra curiosos e atrai pacientes de implante e reabilitação — passo a passo.",
    atualizadoEm: "2026-07-13",
    faqItems: [
      {
        q: "Como um dentista pode captar pacientes de alto valor pela internet?",
        a: "Com um funil que usa uma isca educativa (ex: teste do sorriso) para filtrar curiosos e atrair só quem busca reabilitação ou implante. O conteúdo constrói confiança antes da avaliação, reduzindo a objeção de preço.",
      },
      {
        q: "O marketing odontológico é permitido pelo CFO?",
        a: "Sim. A Resolução CFO 196/2019 permite selfies e imagens de antes e depois pelo próprio dentista executor, desde que com Termo de Consentimento assinado e caráter informativo, sem promessa de resultado.",
      },
      {
        q: "Preciso de ferramentas caras para montar esse funil?",
        a: "Não. Dá para montar página de captura, e-mail e agendamento na Systeme.io, que tem plano grátis vitalício — sem pagar mensalidade em dólar nem juntar várias ferramentas.",
      },
    ],
  },
  {
    slug: "psicologo",
    profissao: "Psicólogo",
    profissaoPlural: "psicólogos",
    cluster: "Saúde",
    dor: "Jornada de decisão fragmentada e proibições éticas do CRP contra promessas de cura.",
    iscaDigital: "Ferramentas de autodiagnóstico de estresse/ansiedade e artigos aprofundados sobre saúde mental.",
    oferta: "Primeira sessão de acolhimento online, criando um compromisso de baixo atrito.",
    faixaPreco: "R$ 100 a R$ 350 por sessão individual de psicoterapia.",
    metaTitle: "Funil de Vendas para Psicólogos: Marketing Ético que Converte",
    metaDescription: "Atraia pacientes sem ferir o CRP. O 'marketing silencioso' com autodiagnóstico transforma quem pesquisa sua dor em sessões agendadas.",
    atualizadoEm: "2026-07-13",
  },
  {
    slug: "nutricionista",
    profissao: "Nutricionista",
    profissaoPlural: "nutricionistas",
    cluster: "Saúde",
    dor: "Baixa retenção de pacientes a longo prazo e concorrência com influenciadores sem qualificação.",
    iscaDigital: "Planejadores de refeições, receitas anti-inflamatórias e e-books de reeducação alimentar.",
    oferta: "Programa de acompanhamento com consultas recorrentes e grupos de suporte.",
    faixaPreco: "R$ 150 a R$ 500 por consulta ou planos de assinatura mensal.",
    metaTitle: "Funil de Vendas para Nutricionistas: Fidelize e Escale (2026)",
    metaDescription: "Aumente a retenção de pacientes com um funil de recorrência. Iscas de valor + acompanhamento contínuo que estabiliza seu faturamento.",
    atualizadoEm: "2026-07-13",
  },
  {
    slug: "fisioterapeuta",
    profissao: "Fisioterapeuta",
    profissaoPlural: "fisioterapeutas",
    cluster: "Saúde",
    dor: "O paciente só procura na dor aguda e ignora a fisioterapia preventiva ou de manutenção.",
    iscaDigital: "Vídeos curtos de alívio de dor e guias ergonômicos de postura para home office.",
    oferta: "Avaliação biomecânica seguida de pacote de reabilitação funcional.",
    faixaPreco: "R$ 150 a R$ 350 por sessão avulsa ou pacotes fechados.",
    metaTitle: "Funil de Vendas para Fisioterapeutas: Pacotes de Reabilitação",
    metaDescription: "Saia da lógica de sessão avulsa. Um funil com 'vitória rápida' que converte a dor aguda em pacotes de reabilitação recorrentes.",
    atualizadoEm: "2026-07-13",
  },
  {
    slug: "veterinario",
    profissao: "Veterinário",
    profissaoPlural: "veterinários",
    cluster: "Saúde",
    dor: "Competição por preço em serviços básicos e dificuldade de vender medicina preventiva.",
    iscaDigital: "Manuais de primeiros socorros para pets e calendários de vacinação e vermifugação.",
    oferta: "Planos de saúde preventiva, check-ups anuais ou consultas para filhotes.",
    faixaPreco: "R$ 150 a R$ 400 por consulta presencial ou orientação online.",
    metaTitle: "Funil de Vendas para Veterinários: Planos Preventivos que Vendem",
    metaDescription: "Fuja da guerra de preço. Um funil que educa tutores sobre prevenção e converte em planos de check-up recorrentes para a clínica.",
    atualizadoEm: "2026-07-13",
  },
  {
    slug: "terapeuta",
    profissao: "Terapeuta",
    profissaoPlural: "terapeutas",
    cluster: "Saúde",
    dor: "Ceticismo do público com abordagens holísticas e dificuldade de mostrar resultado rápido.",
    iscaDigital: "Áudios de meditação guiada, checklists de inteligência emocional e guias de relaxamento.",
    oferta: "Pacotes de sessões integrativas, muitas vezes com bônus na avaliação inicial.",
    faixaPreco: "R$ 100 a R$ 300 por encontro online ou presencial.",
    metaTitle: "Funil de Vendas para Terapeutas: Agenda Cheia em 3 Etapas",
    metaDescription: "Vença o ceticismo com um funil de agendamento simples. Iscas de valor imediato que levam o cliente da curiosidade à sessão marcada.",
    atualizadoEm: "2026-07-13",
  },
  {
    slug: "esteticista",
    profissao: "Esteticista",
    profissaoPlural: "esteticistas",
    cluster: "Saúde",
    dor: "Dependência de sazonalidade e promoções agressivas que corroem a margem de lucro.",
    iscaDigital: "Quizzes de diagnóstico de pele e cronogramas de skincare personalizados.",
    oferta: "Protocolo de entrada (ex: limpeza de pele) atrelado a pacote de tratamento prolongado.",
    faixaPreco: "R$ 80 a R$ 400 por procedimento estético.",
    metaTitle: "Funil de Vendas para Esteticistas: Fim da Guerra de Preço",
    metaDescription: "Pare de depender de promoção. Um funil com diagnóstico de pele que converte protocolos de entrada em pacotes de tratamento contínuo.",
    atualizadoEm: "2026-07-13",
  },

  // ────────────────────── Cluster 2: Negócios B2B ─────────────────────
  {
    slug: "advogado",
    profissao: "Advogado",
    profissaoPlural: "advogados",
    cluster: "Negócios B2B",
    dor: "Restrições éticas da OAB contra captação mercantilista e dificuldade de escalar mantendo pessoalidade.",
    iscaDigital: "Guias jurídicos em linguagem acessível e artigos otimizados para SEO local.",
    oferta: "Atendimento consultivo especializado e fechamento de contrato de honorários.",
    faixaPreco: "Honorários fixos (R$ 1.500+) ou êxito de 20% a 30% do valor da causa.",
    metaTitle: "Funil de Vendas para Advogados: Capte Clientes sem Ferir a OAB",
    metaDescription: "Inbound marketing jurídico que respeita o Provimento 205/2021 da OAB. Transforme conteúdo em contratos de honorários — sem mercantilizar.",
    atualizadoEm: "2026-07-13",
    faqItems: [
      {
        q: "Advogado pode fazer marketing digital pela OAB?",
        a: "Pode, desde que informativo. O Código de Ética e o Provimento 205/2021 vedam a mercantilização (descontos, captação agressiva), mas permitem conteúdo educativo — a base do Inbound Marketing jurídico.",
      },
      {
        q: "Como captar clientes na advocacia sem anunciar preço?",
        a: "Produzindo teses e guias que respondem dúvidas reais (ex: direito previdenciário). Ao esclarecer gratuitamente, o escritório estabelece autoridade e o lead procura o contrato por confiança, não por preço.",
      },
      {
        q: "Que ferramenta usar para montar o funil jurídico?",
        a: "A Systeme.io reúne blog, captura de e-mail e automação num plano grátis vitalício — evitando pagar várias ferramentas em dólar só para começar.",
      },
    ],
  },
  {
    slug: "contador",
    profissao: "Contador",
    profissaoPlural: "contadores",
    cluster: "Negócios B2B",
    dor: "Comoditização dos serviços e a percepção do cliente de que contabilidade é só um 'mal necessário'.",
    iscaDigital: "Simuladores de redução de carga tributária e planilhas de fluxo de caixa.",
    oferta: "Diagnóstico fiscal gratuito com plano de migração para contabilidade digital.",
    faixaPreco: "R$ 150 a R$ 2.500+ mensais, conforme regime e faturamento.",
    metaTitle: "Funil de Vendas para Contadores: Saia da Comoditização (2026)",
    metaDescription: "Prove seu valor antes do contrato. Um funil com diagnóstico fiscal gratuito que posiciona o contador como parceiro estratégico, não custo.",
    atualizadoEm: "2026-07-13",
  },
  {
    slug: "arquiteto",
    profissao: "Arquiteto",
    profissaoPlural: "arquitetos",
    cluster: "Negócios B2B",
    dor: "Elaborar propostas técnicas exaustivas para clientes que ainda estão só na fase de inspiração.",
    iscaDigital: "E-books de tendências de design, moodboards e checklists de viabilidade de reforma.",
    oferta: "Reunião de briefing estratégico remunerada ou desenvolvimento de projeto.",
    faixaPreco: "R$ 2.000 a R$ 25.000+ conforme metragem e complexidade.",
    metaTitle: "Funil de Vendas para Arquitetos: Filtre Curiosos e Feche Projetos",
    metaDescription: "Pare de fazer proposta para quem só sonha. Uma isca de viabilidade que qualifica o lead e leva só clientes prontos ao briefing pago.",
    atualizadoEm: "2026-07-13",
  },
  {
    slug: "corretor-de-imoveis",
    profissao: "Corretor de Imóveis",
    profissaoPlural: "corretores de imóveis",
    cluster: "Negócios B2B",
    dor: "Volume de contatos sem intenção de compra e o 'efeito sanfona' no fechamento do mês.",
    iscaDigital: "Catálogos de pré-lançamento e calculadoras de rentabilidade e financiamento.",
    oferta: "Agendamento de visita qualificada ou assessoria em financiamento.",
    faixaPreco: "Comissão sobre o VGV (R$ 10.000 a R$ 100.000+ por negócio).",
    metaTitle: "Funil de Vendas para Corretores de Imóveis: Leads que Fecham",
    metaDescription: "Troque volume por qualificação. Uma calculadora de financiamento como isca que separa curiosos de compradores reais e acaba com a sanfona.",
    atualizadoEm: "2026-07-13",
  },
  {
    slug: "consultor",
    profissao: "Consultor",
    profissaoPlural: "consultores",
    cluster: "Negócios B2B",
    dor: "Dificuldade de provar ROI antes da contratação e lentidão na aprovação por vários decisores.",
    iscaDigital: "Estudos de caso detalhados do setor e whitepapers de otimização de processos.",
    oferta: "Sessão estratégica de diagnóstico ou Prova de Conceito (PoC) inicial.",
    faixaPreco: "R$ 5.000 a R$ 50.000+ por projeto ou contrato de retainer.",
    metaTitle: "Funil de Vendas para Consultores: Prove o ROI Antes de Vender",
    metaDescription: "Encurte o ciclo B2B com um funil de nutrição. Cases e diagnósticos que provam retorno e destravam a aprovação de projetos high-ticket.",
    atualizadoEm: "2026-07-13",
  },
  {
    slug: "programador",
    profissao: "Programador",
    profissaoPlural: "programadores",
    cluster: "Negócios B2B",
    dor: "Competição por preço com freelance global e dificuldade de gerar confiança com clientes não-técnicos.",
    iscaDigital: "Auditoria gratuita de performance de site/software e tutoriais técnicos.",
    oferta: "Contrato de desenvolvimento sob demanda ou alocação mensal dedicada.",
    faixaPreco: "R$ 100 a R$ 250 por hora técnica ou pacotes acima de R$ 5.000.",
    metaTitle: "Funil de Vendas para Programadores: Saia da Guerra de Preço",
    metaDescription: "Pare de competir por hora barata. Uma auditoria gratuita como isca que demonstra competência e converte em contratos de desenvolvimento.",
    atualizadoEm: "2026-07-13",
  },

  // ─────────────────────── Cluster 3: Criativo ────────────────────────
  {
    slug: "fotografo",
    profissao: "Fotógrafo",
    profissaoPlural: "fotógrafos",
    cluster: "Criativo",
    dor: "Sazonalidade da procura e pressão para entregar arquivos brutos, desvalorizando a arte final.",
    iscaDigital: "Guias de poses para ensaios e presets de edição (Lightroom) gratuitos.",
    oferta: "Pacote de ensaio estruturado com limite definido de imagens tratadas.",
    faixaPreco: "R$ 500 a R$ 3.500 por sessão, conforme reputação.",
    metaTitle: "Funil de Vendas para Fotógrafos: Venda Valor, não Arquivos",
    metaDescription: "Fuja da sazonalidade e da pressão por foto bruta. Um funil que usa presets e guias como isca e converte em pacotes de ensaio fechados.",
    atualizadoEm: "2026-07-13",
  },
  {
    slug: "videomaker",
    profissao: "Videomaker",
    profissaoPlural: "videomakers",
    cluster: "Criativo",
    dor: "Alto custo de equipamento contra orçamentos restritos de clientes locais.",
    iscaDigital: "Análise gratuita do posicionamento audiovisual do concorrente do cliente.",
    oferta: "Contrato de retainer mensal para produção contínua de vídeos curtos ou institucionais.",
    faixaPreco: "R$ 1.500 a R$ 10.000+ conforme equipe, roteiro e diárias.",
    metaTitle: "Funil de Vendas para Videomakers: Contratos Recorrentes (2026)",
    metaDescription: "Troque o job avulso pela recorrência. Uma análise de concorrência como isca que converte clientes locais em retainers mensais de vídeo.",
    atualizadoEm: "2026-07-13",
  },
  {
    slug: "designer",
    profissao: "Designer",
    profissaoPlural: "designers",
    cluster: "Criativo",
    dor: "Refações ilimitadas de clientes que não entendem branding, esgotando o projeto.",
    iscaDigital: "Auditoria de identidade visual, templates no Canva e paletas de cores.",
    oferta: "Identidade visual completa com manual de marca (brandbook) e escopo definido.",
    faixaPreco: "R$ 1.000 a R$ 6.000+ por projeto de branding.",
    metaTitle: "Funil de Vendas para Designers: Fim das Refações Infinitas",
    metaDescription: "Escopo fechado e cliente qualificado. Uma auditoria visual como isca que eleva a percepção de valor e vende branding com brandbook.",
    atualizadoEm: "2026-07-13",
  },
  {
    slug: "social-media",
    profissao: "Social Media",
    profissaoPlural: "social medias",
    cluster: "Criativo",
    dor: "Expectativa irreal de que likes e seguidores viram vendas instantâneas.",
    iscaDigital: "Templates de calendário editorial e checklists de otimização de perfil comercial.",
    oferta: "Contrato mensal de gestão estratégica de contas, conteúdo e engajamento.",
    faixaPreco: "R$ 800 a R$ 3.500 por mês por cliente.",
    metaTitle: "Funil de Vendas para Social Media: Feche Contratos Mensais",
    metaDescription: "Alinhe expectativa e feche recorrência. Templates de calendário como isca que convertem em contratos mensais de gestão de redes.",
    atualizadoEm: "2026-07-13",
  },
  {
    slug: "copywriter",
    profissao: "Copywriter",
    profissaoPlural: "copywriters",
    cluster: "Criativo",
    dor: "Educar o cliente sobre como a copy impacta o caixa mais do que o design.",
    iscaDigital: "Swipe files comprovados, e-books sobre gatilhos mentais e templates de e-mail.",
    oferta: "Páginas de vendas de alta conversão e fluxos automatizados de e-mail.",
    faixaPreco: "R$ 1.000 a R$ 10.000+ por projeto, às vezes com participação nos lucros.",
    metaTitle: "Funil de Vendas para Copywriters: Venda Copy High-Ticket",
    metaDescription: "Prove o valor da palavra. Um swipe file como isca que demonstra resultado e converte em projetos de página de vendas e e-mail.",
    atualizadoEm: "2026-07-13",
  },
  {
    slug: "podcaster",
    profissao: "Podcaster",
    profissaoPlural: "podcasters",
    cluster: "Criativo",
    dor: "Dependência de poucas plataformas e monetização instável ligada só à audiência.",
    iscaDigital: "Episódios exclusivos, transcrições e acesso a grupos fechados (Telegram/Discord).",
    oferta: "Cotas de patrocínio via mídia kit ou infoprodutos para a audiência fiel.",
    faixaPreco: "R$ 1.000 a R$ 15.000+ por cota de patrocínio.",
    metaTitle: "Funil de Vendas para Podcasters: Monetize Além dos Plays",
    metaDescription: "Pare de depender de audiência bruta. Capture o e-mail do ouvinte e monte um mídia kit que vende cotas de patrocínio e infoprodutos.",
    atualizadoEm: "2026-07-13",
  },
  {
    slug: "youtuber",
    profissao: "Youtuber",
    profissaoPlural: "youtubers",
    cluster: "Criativo",
    dor: "Vulnerabilidade ao algoritmo e ameaça constante de desmonetização.",
    iscaDigital: "Materiais de apoio, planilhas e PDFs complementares aos vídeos.",
    oferta: "Clube de membros mensal, links de afiliado ou consultorias exclusivas.",
    faixaPreco: "R$ 20/mês (membros) até R$ 50.000+ em campanhas de marca.",
    metaTitle: "Funil de Vendas para Youtubers: Renda que não Depende do Algoritmo",
    metaDescription: "Blinde sua renda da desmonetização. Um funil que leva a audiência do YouTube para uma lista própria e vende clube de membros e infoprodutos.",
    atualizadoEm: "2026-07-13",
  },
  {
    slug: "piloto-de-drone",
    profissao: "Piloto de Drone",
    profissaoPlural: "pilotos de drone",
    cluster: "Criativo",
    dor: "Mercado desconhece o potencial do drone além de imagens estéticas bonitas.",
    iscaDigital: "Imagens aéreas gratuitas da região ou demonstrações de modelagem 3D.",
    oferta: "Pulverização agrícola de precisão, inspeção estrutural ou mapeamento georreferenciado.",
    faixaPreco: "R$ 800 a R$ 5.000 por diária de operação técnica.",
    metaTitle: "Funil de Vendas para Piloto de Drone: Contratos B2B de Alto Valor",
    metaDescription: "Saia da 'foto aérea bonita' para soluções B2B. Um funil que vende inspeção, mapeamento e pulverização com previsibilidade de caixa.",
    atualizadoEm: "2026-07-13",
  },

  // ─────────────────────── Cluster 4: Estética ────────────────────────
  {
    slug: "cabeleireiro",
    profissao: "Cabeleireiro",
    profissaoPlural: "cabeleireiros",
    cluster: "Estética",
    dor: "Clientela concentrada em serviços básicos e ociosidade financeira no meio da semana.",
    iscaDigital: "Testes de diagnóstico capilar, dicas de visagismo e vouchers de boas-vindas com prazo.",
    oferta: "Combo de transformação química (colorimetria) com tratamento de nutrição, elevando o ticket.",
    faixaPreco: "R$ 100 a R$ 1.500+ conforme a técnica de colorimetria.",
    metaTitle: "Funil de Vendas para Cabeleireiros: Encha os Dias Ociosos",
    metaDescription: "Transforme o Instagram em agenda cheia. Um diagnóstico capilar como isca que vende combos de alto ticket nos horários mortos da semana.",
    atualizadoEm: "2026-07-13",
  },
  {
    slug: "maquiadora",
    profissao: "Maquiadora",
    profissaoPlural: "maquiadoras",
    cluster: "Estética",
    dor: "Procura concentrada nos fins de semana e volatilidade atrelada ao calendário de eventos.",
    iscaDigital: "Tutoriais de preparação de pele e minicursos de contorno e colorimetria.",
    oferta: "Pacotes de Dia da Noiva ou produtização em curso online de automaquiagem.",
    faixaPreco: "R$ 150 a R$ 500 por maquiagem social; cursos a partir de R$ 197.",
    metaTitle: "Funil de Vendas para Maquiadoras: Renda Além do Fim de Semana",
    metaDescription: "Estabilize o caixa produtizando seu conhecimento. Um funil que vende pacotes de noiva e cursos online de automaquiagem o ano todo.",
    atualizadoEm: "2026-07-13",
  },
  {
    slug: "tatuador",
    profissao: "Tatuador",
    profissaoPlural: "tatuadores",
    cluster: "Estética",
    dor: "Enxurrada de 'quanto custa?' no WhatsApp e dependência de walk-ins e no-shows.",
    iscaDigital: "Conteúdos sobre cicatrização e lista VIP com prioridade na abertura de agenda.",
    oferta: "Arte exclusiva iniciada só após depósito de sinal não reembolsável.",
    faixaPreco: "R$ 300 a R$ 3.000+ conforme tamanho, local e autoridade do artista.",
    metaTitle: "Funil de Vendas para Tatuadores: Acabe com o 'Quanto Custa?'",
    metaDescription: "Filtre curiosos e blinde a agenda. Um formulário de aplicação como isca que qualifica o cliente e o sinal que elimina o no-show.",
    atualizadoEm: "2026-07-13",
  },

  // ─────────────────────── Cluster 5: Educação ────────────────────────
  {
    slug: "personal-trainer",
    profissao: "Personal Trainer",
    profissaoPlural: "personal trainers",
    cluster: "Educação",
    dor: "Teto financeiro do modelo presencial um-a-um, preso à agenda da academia.",
    iscaDigital: "Desafios gratuitos de emagrecimento (7, 10 ou 14 dias) em comunidade online.",
    oferta: "Assinaturas mensais ou semestrais de consultoria fitness monitorada por app.",
    faixaPreco: "R$ 97 a R$ 497 por planos de recorrência.",
    metaTitle: "Funil de Vendas para Personal Trainer: Escale Além da Academia",
    metaDescription: "Quebre o teto do atendimento presencial. Um desafio gratuito como isca que converte em consultoria online por assinatura recorrente.",
    atualizadoEm: "2026-07-13",
  },
  {
    slug: "professor",
    profissao: "Professor",
    profissaoPlural: "professores",
    cluster: "Educação",
    dor: "Concorrência com conteúdo gratuito do YouTube e alta desistência em cursos acadêmicos.",
    iscaDigital: "Masterclasses de acesso limitado e webinários ao vivo de captação.",
    oferta: "Cursos gravados com certificado e bônus de comunidade fechada.",
    faixaPreco: "R$ 97 a R$ 1.500+ conforme profundidade e certificação.",
    metaTitle: "Funil de Vendas para Professores: Venda Cursos que não Ficam na Prateleira",
    metaDescription: "Vença o conteúdo grátis do YouTube. Um funil de masterclass e webinário que converte audiência em vendas de curso com certificado.",
    atualizadoEm: "2026-07-13",
  },
  {
    slug: "coach",
    profissao: "Coach",
    profissaoPlural: "coaches",
    cluster: "Educação",
    dor: "Ceticismo do público e dificuldade de mensurar resultado após a imersão.",
    iscaDigital: "Sessões de autodiagnóstico emocional e comportamental sem cobrança.",
    oferta: "Pacotes anuais de life-coaching intensivo ou programas de transformação.",
    faixaPreco: "R$ 1.500 a R$ 6.000+ por ciclo de projeto.",
    metaTitle: "Funil de Vendas para Coach: Venda High-Ticket com Autoridade",
    metaDescription: "Vença o ceticismo com prova e método. Uma sessão de diagnóstico como isca que qualifica e converte em programas de coaching de alto valor.",
    atualizadoEm: "2026-07-13",
  },
  {
    slug: "mentor",
    profissao: "Mentor",
    profissaoPlural: "mentores",
    cluster: "Educação",
    dor: "Tempo desperdiçado atendendo curiosos sem perfil para ofertas high-ticket.",
    iscaDigital: "Vídeo-aula de 30-40 min seguida de formulário de aplicação restrito.",
    oferta: "Mentoria individual imersiva ou vagas em masterminds anuais exclusivos.",
    faixaPreco: "R$ 3.000 a R$ 25.000+ conforme o nível de acesso.",
    metaTitle: "Funil de Vendas para Mentores: Filtre e Feche High-Ticket",
    metaDescription: "Pare de atender quem não pode pagar. Um formulário de aplicação como filtro que leva à call só o candidato qualificado para a mentoria.",
    atualizadoEm: "2026-07-13",
  },
  {
    slug: "palestrante",
    profissao: "Palestrante",
    profissaoPlural: "palestrantes",
    cluster: "Educação",
    dor: "Dependência de agências intermediárias e imprevisibilidade na agenda de eventos.",
    iscaDigital: "Cortes de alta energia da oratória no TikTok/LinkedIn e e-books de liderança.",
    oferta: "Contratação direta de palestras, workshops e seminários in-company (B2B).",
    faixaPreco: "R$ 5.000 a R$ 25.000+ por palestra ao vivo.",
    metaTitle: "Funil de Vendas para Palestrantes: Contratação Direta In-Company",
    metaDescription: "Livre-se das agências que ficam com sua margem. Um funil que atrai o RH corporativo e fecha palestras in-company sem intermediário.",
    atualizadoEm: "2026-07-13",
  },
];

/** Remove o ponto final de um fragmento para encaixá-lo no meio de uma frase. */
export function semPonto(s: string): string {
  return s.trim().replace(/\.$/, "");
}

/** Busca uma profissão pelo slug. Retorna undefined se não existir. */
export function getProfissaoBySlug(slug: string): Profissao | undefined {
  return profissoes.find((p) => p.slug === slug);
}

/** Profissões do mesmo cluster (para linkagem interna), excluindo a atual. */
export function getProfissoesRelacionadas(p: Profissao): Profissao[] {
  return profissoes.filter((o) => o.cluster === p.cluster && o.slug !== p.slug);
}

/**
 * FAQ da página. Usa `faqItems` se definido; caso contrário gera 3 perguntas
 * reais a partir dos dados (captação, precificação, ferramenta) — evita thin
 * content e garante FAQPage schema válido em toda página do silo.
 */
export function getProfissaoFaq(p: Profissao): { q: string; a: string }[] {
  if (p.faqItems && p.faqItems.length > 0) return p.faqItems;
  return [
    {
      q: `Como captar clientes sendo ${p.profissao.toLowerCase()}?`,
      a: `Com um funil de vendas: uma isca digital (${semPonto(p.iscaDigital.toLowerCase())}) atrai e qualifica o interessado, e a oferta de conversão é ${p.oferta.toLowerCase()}`,
    },
    {
      q: `Quanto um ${p.profissao.toLowerCase()} cobra pelos serviços online?`,
      a: `A faixa de preço praticada é de ${p.faixaPreco} Um funil bem estruturado atrai justamente o cliente disposto a pagar pelo valor entregue, reduzindo a objeção de preço.`,
    },
    {
      q: `Preciso de ferramentas caras para montar um funil de ${p.profissao.toLowerCase()}?`,
      a: `Não. Você monta página de captura, e-mail marketing e área de membros na Systeme.io, que tem plano grátis vitalício — sem juntar várias ferramentas nem pagar mensalidade em dólar.`,
    },
  ];
}
