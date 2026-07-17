# 🏗️ ESTRATÉGIA DE ARQUITETURA SEO — Funil do Zero (funildozero.com.br)

> **Escopo deste documento:** (1) diagnóstico da arquitetura atual de 5 silos; (2) resposta à pergunta estratégica "todos os 32 funis de profissão devem ser pilar?" (spoiler: não — sistema de 3 tiers); (3) a estrutura de silos otimizada para a era SGE/GEO/SEO programático; (4) a estratégia completa de links internos cross-silo (metas A1, A2, A3 do briefing); (5) content gaps por silo (metas B1, B2, B3).
> **Reconciliação com o trabalho anterior:** slug `/terapeuta` → **`/terapeuta-holistico`** ✅ (matriz atualizada); **2 profissões novas sem dossiê** (`e-commerce`, `lancador-infoprodutor`) ✅ (dossiês #31/#32 produzidos).

> ## 📌 ESTADO ATUAL (atualização de 16/07/2026)
> Progresso contra as 4 lacunas da Seção 1:
> - **Lacuna 1 (pilar-mãe):** ✅ escrito (`artigo-pilar-o-que-e-funil-de-vendas.mdx`) — publicar.
> - **Lacuna 2 (hubs de silo):** ⏳ pendente — próxima prioridade editorial.
> - **Lacuna 3 (silos subpovoados):** Silo 3 saiu de 3→7 URLs (✅ os 4 tutoriais de ativação escritos: captura, obrigado, régua, vendas); Silos 4 e 5 saíram de 3→4 (pilar-mãe e prova social) — gaps restantes nas Seções 6–8.
> - **Lacuna 4 (elo MoFu→BoFu):** componentes especificados com código no design system e usados nos 9 gabaritos; ⏳ implementação React no site + retrofit dos 32.
> Também produzidos desde a versão original: 4 skills operacionais (orquestrador, design system, comparativos, otimização com script GSC/GA4), llms.txt + route, e 9 artigos-gabarito cobrindo os 5 silos (incl. comparativo vs-hotmart com dados verificados).

---

# 1. DIAGNÓSTICO DA ARQUITETURA ATUAL

## O que está certo (e é raro ver certo)
- **Silos por intenção, não por assunto:** a separação ToFu/MoFu/BoFu em rotas distintas é o desenho correto para um blog de afiliado — o Google entende a especialização de cada diretório e o funil editorial espelha o funil de conversão.
- **O Silo 1 como fosso competitivo:** 32 guias de cauda longa com pesquisa regulatória profunda (os dossiês) é um ativo que concorrente nenhum replica rápido — E-E-A-T real num nicho dominado por conteúdo raso.
- **SEO programático no lugar certo:** comparativos (Silo 2) são o caso de uso ideal de páginas geradas por dataset — estrutura idêntica, dados variáveis, intenção altíssima.
- **`/go/systeme` com middleware:** proteção de cookie + um único ponto de manutenção do link de afiliado + possibilidade de medir cliques por página de origem (se ainda não mede: instrumentar com parâmetro `?ref=[slug-do-artigo]` — essa é a métrica que vai governar TODAS as decisões deste documento).

## As 4 lacunas estruturais (em ordem de impacto)

**Lacuna 1 — Não existe a página-mãe do domínio.** O site chama *funildozero* e (pelo mapeamento) não tem o pilar "**O que é funil de vendas: o guia completo**". Essa é a keyword-mãe de todo o projeto — head term com volume enorme, e a página que daria coerência semântica ao domínio inteiro (todo silo linka para ela; ela distribui para os silos). É a lacuna nº 1.

**Lacuna 2 — Os silos não têm páginas-hub.** `/funil-de-vendas/` (o índice dos 32), `/ferramentas/`, `/systeme-io/`, `/negocio-digital/`, `/copywriting-vendas/` precisam ser páginas REAIS (curadas, com texto introdutório, agrupamento e links), não listagens automáticas. A hub page é: (a) o alvo natural de backlinks, (b) o distribuidor de autoridade interna, (c) a página que a SGE cita quando a pergunta é ampla ("melhores guias de funil por profissão").

**Lacuna 3 — Silos 3, 4 e 5 estão subpovoados (3 artigos cada).** Um silo de 3 artigos não é silo, é rascunho de silo — o Google precisa de massa crítica temática (8–15 URLs) para atribuir autoridade de tópico ao diretório. As Seções 6–8 trazem os temas.

**Lacuna 4 — O elo MoFu→BoFu está implícito, não sistematizado.** Os 32 artigos de profissão têm a seção "Estrutura do funil na Systeme.io", mas (pelo briefing) ainda não referenciam tutoriais (Silo 3) nem comparativos (Silo 2) de forma padronizada. Como o site é MDX com componentes, a solução é de ENGENHARIA, não editorial: componentes reutilizáveis de link contextual (Seção 5).

---

# 2. A PERGUNTA CENTRAL: todos os 32 funis devem ser artigo pilar?

**Não — e tratar todos como pilar seria um erro triplo:** desperdiça esforço em keywords sem volume, dilui o orçamento de produção que deveria concentrar nos artigos que convertem, e — na era SGE — comprimento não é mais proxy de qualidade (a IA extrai a resposta; um artigo enxuto e bem estruturado é citado tanto quanto um de 4.000 palavras).

## O critério de classificação (3 eixos)
1. **Volume de busca** do universo da profissão ("como conseguir clientes [X]", "marketing para [X]", "funil para [X]").
2. **Afinidade digital** — a probabilidade de o profissional COMPRAR uma ferramenta de funil (um lançador vive disso; um veterinário precisa ser convencido do conceito antes da ferramenta).
3. **Potencial de conversão de afiliado** — proximidade da persona com o produto Systeme.io (infoprodutores e criadores são o usuário nativo da plataforma).

## O sistema de 3 tiers

### ⭐ TIER A — Pilares de conversão (8 artigos · 2.800–3.500+ palavras · atualização semestral)
*Máxima afinidade com a Systeme.io + volume + intenção comercial. São os artigos que pagam o blog. Tratamento completo: schema, vídeo se possível, componentes de conversão ricos, links entrantes de todos os silos.*

| # | Profissão | Por quê |
|---|---|---|
| 31 | **Lançador/Infoprodutor** ⚠️ sem dossiê | A persona-núcleo da Systeme.io — quem busca isso está a um passo de assinar uma plataforma. **Prioridade nº 1 de produção.** |
| 32 | **E-commerce** ⚠️ sem dossiê | Segundo maior universo de busca; a Systeme.io compete aqui (funil + checkout). **Prioridade nº 2.** |
| 28 | Coach | Alto volume, compra ferramentas, ticket alto |
| 29 | Mentor | Idem — e o hub da escada de valor |
| 13 | Consultor | Idem |
| 18 | Social Media | Nativo digital; recomenda ferramentas aos clientes (multiplicador) |
| 26 | Personal Trainer | Volume enorme + consultoria online = uso direto da plataforma |
| 19 | Copywriter | Nativo digital + ponte natural com o Silo 5 |

### 🔷 TIER B — Pilares padrão (14 artigos · 2.000–2.600 palavras · atualização anual)
*Bom volume ou bom ticket, mas exigem "evangelização" do conceito de funil antes da ferramenta.*
Médico, Dentista, Psicólogo, Nutricionista, Advogado, Contador, Corretor de Imóveis, Fotógrafo, Designer, Professor, Esteticista, Cabeleireiro, YouTuber, Programador.

### 🔹 TIER C — Cauda longa enxuta (10 artigos · 1.200–1.800 palavras · formato semiestruturado)
*Baixo volume absoluto — mas cauda longa quase sem concorrência: um artigo enxuto, direto e bem marcado (schema + tabelas) domina a SERP e a citação por IA com metade do custo.*
Fisioterapeuta, Veterinário, Terapeuta Holístico, Arquiteto, Videomaker, Podcaster, Piloto de Drone, Maquiadora, Tatuador, Palestrante.

**Regras do sistema:**
- Os 3 tiers usam **o mesmo template MDX e o mesmo prompt-mestre** — muda a variável `{TAMANHO}` e a profundidade de cada bloco (o Tier C corta o cenário narrativo longo e comprime o retrato de mercado numa tabela).
- **Promoção/rebaixamento por dados:** a cada trimestre, GSC + cliques em `/go/systeme?ref=` decidem — Tier C que ranqueia e converte sobe para B (expandir o artigo); Tier B sem impressões desce o investimento de atualização.
- Os dossiês continuam sendo a fonte para os 3 tiers (nenhuma pesquisa se perde — só a profundidade de exposição varia).

---

# 3. A ARQUITETURA DE SILOS OTIMIZADA (o desenho-alvo)

```
funildozero.com.br
│
├── 🏠 HOME + PILAR-MÃE: "O que é funil de vendas [guia completo]"  ← A LACUNA Nº 1
│      (todo silo linka para ela; ela apresenta e distribui para os 5 silos)
│
├── 📂 /funil-de-vendas/          [HUB Silo 1 — MoFu, 32 artigos em 3 tiers]
│      hub curada por cluster (Saúde · B2B · Criativo · Estética · Educação · Digital*)
│      *novo mini-cluster: e-commerce + lançador (+ futuros: dropshipping, afiliado…)
│
├── 📂 /ferramentas/              [HUB Silo 2 — BoFu programático]
│      ├── systeme-io-vs-[rival]        (comparativos 1x1 — os 7 atuais + expansão §6)
│      ├── alternativa-a-[rival]        ← NOVA CLASSE programática (intenção de troca!)
│      └── [rival]-taxas / calculadora  ← NOVA CLASSE (dados = ímã de citação SGE)
│
├── 📂 /systeme-io/               [HUB Silo 3 — BoFu de ativação, 3 → 15+ tutoriais §7]
│
├── 📂 /negocio-digital/          [HUB Silo 4 — ToFu, 3 → 12+ artigos §8]
│
└── 📂 /copywriting-vendas/       [HUB Silo 5 — MoFu educacional, 3 → 10+ artigos §8]
```

## As decisões de arquitetura (e por quê)

**(a) Manter 5 silos — não criar o 6º.** A tentação de criar um silo "Automação/E-mail marketing" deve ser resistida por ora: esses temas cabem nos Silos 3 (tutorial) e 5 (estratégia). Silo novo só quando um tema tiver 10+ pautas próprias E intenção distinta.

**(b) Criar as 5 hub pages + o pilar-mãe ANTES de produzir mais artigos.** É a maior alavanca de SEO disponível hoje no site: barata (5 páginas), e reorganiza a distribuição de autoridade de tudo que já existe.

**(c) Breadcrumbs + schema em tudo:** `BreadcrumbList` (Home → Silo → Artigo), `Article` + `FAQPage` nos artigos, **`SoftwareApplication`/`Product` com `AggregateRating` honesto nos comparativos e reviews** (o rich snippet de estrelas no Silo 2 é o maior CTR-boost disponível em SERP de comparação).

**(d) O mini-cluster "Digital" dentro do Silo 1:** e-commerce e lançador não são "profissões" como as outras — são o público nativo da ferramenta. Agrupá-los num sub-cluster com futuros irmãos (dropshipping, afiliado profissional, produtor de curso, expert em comunidade) cria o corredor mais curto do site: Silo 4 (ToFu) → mini-cluster Digital (MoFu quente) → Silos 2/3 (BoFu) → `/go/systeme`.

## Adaptações à era SGE/GEO (o que muda na PRÁTICA)

A lógica antiga era "ranquear e receber o clique". A nova é dupla: **ranquear para humanos E ser a fonte citada pela resposta da IA** (Google AI Overviews, ChatGPT, Perplexity, Gemini). O que isso exige de cada página:

1. **Resposta-primeiro (answer-first):** todo H2 abre com 1–2 frases que respondem a pergunta do heading de forma autossuficiente e "extraível". A prosa vem depois. (O prompt-mestre já faz isso na FAQ — estender aos H2.)
2. **Blocos citáveis com dado + fonte nomeada:** a IA cita quem tem número com origem. Os dossiês são uma mina: transformar as tabelas de preço por profissão em **blocos de dados padronizados** ("Quanto cobra um [X] em 2026 — fontes: …"). Sugestão de ativo: um componente MDX `<TabelaPrecos>` renderizando dados estruturados + schema.
3. **Tabelas de comparação limpas no Silo 2:** LLMs extraem tabelas com muito mais fidelidade que prosa — a tabela de taxas Hotmart vs Systeme é o conteúdo mais "sequestrável" (e citável) do site. Colocar a marca NA tabela (coluna "fonte: funildozero.com.br" no caption).
4. **E-E-A-T de entidade:** página de autor com credencial real, página "sobre/metodologia" ("como testamos as ferramentas"), data de atualização visível, changelog nos comparativos ("atualizado em [mês] — taxa X mudou"). A SGE pondera entidade/confiança mais que o SEO clássico.
5. **`llms.txt` na raiz** (prática emergente): um índice em texto puro apontando os melhores conteúdos por tema para crawlers de IA. Custa 1 hora; se o padrão vingar, você chegou primeiro.
6. **A métrica muda:** com SGE, impressão sem clique cresce — acompanhar **citações/menções em respostas de IA** (buscas manuais mensais no Perplexity/ChatGPT pelas suas keywords) e priorizar o CTR nos BoFu (onde o clique ainda acontece, porque a intenção exige ação).
7. **GEO fora do site:** respostas de IA bebem de Reddit/comunidades/YouTube. Presença mínima recomendada: respostas úteis (não spam) em comunidades brasileiras de marketing digital citando os guias, e — quando houver fôlego — versões em vídeo dos comparativos (o YouTube é fonte primária da SGE).

---

# 4. META A — ESTRATÉGIA DE LINKS INTERNOS CROSS-SILO

> A matriz de links DENTRO do Silo 1 já existe (`matriz-links-internos.md` — atualizar o slug `/terapeuta-holistico` e incorporar #31/#32). Esta seção resolve os fluxos ENTRE silos — as metas A1, A2 e A3 do briefing.

## O princípio-mestre: "um passo abaixo no funil"
Todo artigo linka predominantemente para o estágio SEGUINTE de intenção (ToFu→MoFu, MoFu→BoFu, BoFu→`/go/systeme`). Links "para cima" existem só como apoio conceitual (1 por artigo, no máximo). O site inteiro vira um escorregador para `/go/systeme`.

## A1 — ToFu ➔ MoFu/BoFu (Silo 4 → Silos 1 e 2)

**O problema real:** o leitor ToFu ("como ser afiliado", "o que é marketing digital") é genérico — o link certo depende de QUEM ele é. A solução é segmentar dentro do artigo:

1. **O Roteador de Persona (componente MDX `<EscolhaSeuCaminho>`):** bloco padrão no meio/fim de todo artigo do Silo 4 com 2–3 portas: *"Você já atende clientes? → veja o guia de funil da sua profissão [hub Silo 1]"* · *"Vai vender curso/produto digital? → guia do infoprodutor [#31]"* · *"Comparando plataformas? → Systeme vs Hotmart [Silo 2]"*. É a materialização do ToFu→MoFu em um componente reusável.
2. **Links contextuais por exemplo:** quando o artigo ToFu citar um exemplo de aplicação ("um nutricionista, por exemplo, captaria leads com…"), o exemplo É o link para o artigo da profissão. Regra editorial: **todo artigo ToFu usa 3–4 profissões como exemplos** — cada uma linkada.
3. **A ponte de custo → comparativo:** todo tema ToFu esbarra em "quanto custa começar" — a resposta linka o comparativo de taxas (Silo 2): *"a diferença entre pagar 9,9% por venda e taxa zero está detalhada aqui"*.
4. **Cota:** artigo ToFu = 4–6 links internos, dos quais ≥3 descem o funil (Silo 1/2/3) e ≤1 sobe/lateral.

## A2 — MoFu ➔ BoFu (Silo 1 → Silos 2 e 3) — *a meta mais valiosa*

**A seção "Estrutura do funil na Systeme.io" dos 32 artigos é o imóvel mais valioso do site** — é onde o leitor está imaginando a execução. A sistematização por componentes MDX:

1. **`<TutorialBox slug="..."/>` — o link de execução (Silo 3):** em cada sub-etapa do funil descrito, uma caixa discreta *"📘 Passo a passo: [como criar sua página de captura na Systeme.io]"*. Mapeamento padrão (vale para os 32 artigos):
   - Landing page (6a) → tutorial "como criar página de captura"
   - Página de obrigado (6b) → tutorial "página de obrigado + entrega da isca"
   - Sequência de e-mails (6c) → tutoriais "régua de automação" e "autenticação de domínio"
   - Tags/segmentação → tutorial "tags e automações"
   - Se a profissão vende curso/mentoria (Tier A) → "como hospedar curso grátis" (já existe!)
2. **`<ComparativoBox rival="..."/>` — o link de objeção (Silo 2):** a objeção "por que Systeme e não a ferramenta X?" é respondida com o comparativo — **escolhido pela persona**: profissões que vendem infoproduto/curso (coach, mentor, lançador, personal online) → vs-Hotmart/vs-Kiwify; e-commerce → vs-Shopify/vs-Nuvemshop; quem já usa e-mail marketing → vs-ActiveCampaign/vs-Leadlovers/vs-Mailchimp. 1–2 comparativos por artigo, não mais.
3. **Posição fixa:** 1 TutorialBox por sub-etapa (2–4 por artigo) + 1 ComparativoBox no fim da seção de funil ou junto à objeção de preço + o CTA `/go/systeme`. Total MoFu→BoFu: **4–6 links por artigo de profissão** — além dos 3–6 links horizontais da matriz do Silo 1.
4. **Retrofit em lote:** como é componente MDX, a inserção nos 32 artigos existentes é um trabalho mecânico de edição (1–2 dias), não de reescrita — a maior vitória rápida de linking disponível.

## A3 — Silo 5 ➔ Silos 1 e 3 (copy como ponte de conversão)

O Silo 5 é o "MoFu de habilidade": quem aprende a escrever página de vendas precisa de um LUGAR para construí-la — a ponte é natural:

1. **Teoria → construtor:** todo artigo de copy fecha com *"agora aplique: [monte essa página no construtor gratuito da Systeme.io]"* → tutorial correspondente do Silo 3 (ou `/go/systeme` direto quando não houver tutorial). "Como escrever página de vendas" → tutorial "criar página de vendas na Systeme"; "gatilhos mentais" → tutorial de e-mail/automação ("programe os gatilhos na régua").
2. **Teoria → exemplo vivo por profissão:** os artigos do Silo 1 estão CHEIOS de headlines, e-mails e CTAs de exemplo — o Silo 5 os usa como estudo de caso linkado: *"veja como esse princípio vira headline no [funil do psicólogo]"*. Cada artigo de copy referencia 2–3 profissões (rotacionar para cobrir o Silo 1 inteiro ao longo do tempo).
3. **A volta:** artigos Tier A do Silo 1 linkam 1 artigo do Silo 5 na seção de e-mails/landing ("os 5 gatilhos que usamos nessa sequência — explicados aqui") — reciprocidade que fortalece o silo pequeno.

## Regras transversais (os 5 mandamentos do linking)
1. Todo artigo linka a **hub do próprio silo** (breadcrumb) e **1x o pilar-mãe** quando citar "funil de vendas" pela primeira vez.
2. **Nenhuma página órfã:** toda URL nova entra na hub + em ≥2 artigos na publicação (a matriz do Silo 1 + este documento dizem quais).
3. Âncoras descritivas variadas; nunca "clique aqui"; nunca a mesma âncora exata para a mesma URL em todo o site (padrão anti-otimização-excessiva).
4. `/go/systeme` **não é link interno de SEO** — é CTA (componente próprio, com `ref=` de origem). Máx. 2–4 por página; nofollow/noindex na rota de redirect.
5. Auditoria trimestral: relatório de links quebrados + páginas com <2 links entrantes + top páginas por clique em `/go/systeme?ref=` (as vencedoras ganham mais links entrantes — dobrar a aposta no que converte).

---

# 5. IMPLEMENTAÇÃO TÉCNICA (Next.js + MDX — resumo executivo)

- **Componentes a criar:** `<EscolhaSeuCaminho>` (roteador ToFu), `<TutorialBox>`, `<ComparativoBox>`, `<TabelaPrecos>` (dados citáveis + schema), `<CTAGo ref="slug">` (o único que aponta para /go/systeme), `<LeiaTambem>` (related por cluster, alimentado por frontmatter `cluster:` e `tier:`).
- **Frontmatter padronizado** nos MDX: `silo`, `cluster`, `tier`, `intent (tofu/mofu/bofu)`, `updated` — permite gerar hubs, related e sitemaps segmentados automaticamente.
- **Schema:** `Article` + `FAQPage` (todos), `BreadcrumbList` (todos), `SoftwareApplication`/`Product` + `AggregateRating` (Silo 2/3), `HowTo` (tutoriais do Silo 3 — candidato forte a rich result).
- **`llms.txt`** na raiz; sitemap segmentado por silo; datas de atualização visíveis.

---

# 6. META B1 — NOVOS COMPARATIVOS (Silo 2, SEO programático)

## Onda 1 — os que faltam e têm busca AGORA (checkout/infoproduto BR — a dor de taxa)
| Rival | Ângulo do comparativo |
|---|---|
| **Eduzz** | Taxas por venda vs. custo fixo zero |
| **Monetizze** | Idem — o trio Hotmart/Eduzz/Monetizze cobre o léxico inteiro do infoprodutor BR |
| **Braip** | Forte em físico+digital; taxas |
| **Ticto** | Checkout em ascensão; taxas |
| **Greenn** | Idem (crescimento 2024–2026) |
| **Memberkit** | Área de membros paga vs. incluída na Systeme |
| **Astron Members** | Idem |
| **HeroSpark** | Concorrente direto (funil+curso BR) — comparativo óbvio que falta |

## Onda 2 — e-mail marketing e automação (custo em dólar/limite de contatos)
**Mailchimp** (busca gigante; preço em dólar), **Brevo (ex-Sendinblue)**, **RD Station** (o enterprise BR caro — ângulo "você não precisa disso para começar"), **GetResponse**, **E-goi**, **Klicksend/Klickpages**, **MailerLite**, **ConvertKit/Kit** (criadores).

## Onda 3 — e-commerce e páginas (sustenta o artigo #32)
**Shopify** (mensalidade em dólar + apps), **Nuvemshop**, **Cartpanda**, **Yampi**, **WordPress+Elementor** (o ângulo "custo real da stack WP: hospedagem+plugins+manutenção"), **Wix**.

## As 2 novas CLASSES programáticas (multiplicam o dataset existente)
1. **`/ferramentas/alternativa-a-[rival]`** — "alternativa ao Hotmart/ClickFunnels/Kajabi…" é OUTRA keyword, de intenção ainda mais quente (o usuário já decidiu SAIR). Mesmo dataset, template novo → ~20 páginas quase de graça. **É a expansão de maior ROI do site.**
2. **`/ferramentas/[rival]-taxas` + 1 calculadora interativa** ("quanto a Hotmart leva de você: calcule") — páginas de DADOS que a SGE adora citar, e ímã de backlinks. A calculadora (1 componente) diferencia o site de todo comparativo raso.
3. *(Fase 2, medir antes):* comparativos 3-way ("Hotmart vs Kiwify vs Systeme") — capturam a SERP de "vs" dupla dos rivais entre si.

**Regra de qualidade programática:** cada página gerada precisa de ≥30% de conteúdo único (prós/contras editoriais, veredito por persona, FAQ própria) — SGE e o Google pós-HCU punem template puro. O dataset alimenta tabelas; o editorial dá o veredito.

---

# 7. META B2 — TUTORIAIS FALTANTES (Silo 3: de 3 para ~16)

*Critério: intenção de busca real ("como fazer X na systeme io" / dores universais de quem ativa a conta) + servir de destino para os `<TutorialBox>` dos 32 artigos.*

**Camada 1 — Ativação (os 6 urgentes, na ordem):**
1. **Como criar uma página de captura na Systeme.io** (o tutorial mais linkado do site — 32 artigos apontam pra ele)
2. **Autenticação de domínio de e-mail (SPF/DKIM/DMARC)** — a dor técnica nº 1; quem busca isso JÁ é usuário (retenção do afiliado indicado)
3. **Como criar régua/automação de e-mails (com tags)** — destino do bloco 6c de todos os artigos
4. **Como conectar domínio próprio**
5. **Como criar página de vendas** (recebe o Silo 5 inteiro)
6. **Página de obrigado + entrega da isca digital**
**Camada 2 — Monetização:** 7. Como vender com Pix/cartão (gateways BR — Mercado Pago etc.); 8. Order bump e upsell; 9. Área de membros/curso completo (expandir o existente); 10. Webinário/evergreen; 11. Como criar seu programa de afiliados dentro da Systeme.
**Camada 3 — Migração e comparação prática (BoFu puro):** 12. **Como migrar da Hotmart para a Systeme.io** (casa com "alternativa-a"!); 13. Migrar lista do Mailchimp/outros; 14. Pixel do Meta + rastreamento; 15. LGPD na prática: double opt-in e consentimento (conecta com TODOS os artigos de profissão — os dossiês citam LGPD o tempo todo); 16. Systeme.io grátis até onde? (limites do plano free com honestidade — a página de confiança).

---

# 8. META B3 — EXPANSÃO ToFu (Silo 4: de 3 para ~12) + Silo 5

## Silo 4 — os 9 novos temas (por potencial de audiência com intenção de migração)
1. **"O que é funil de vendas"** → se não for o pilar-mãe na home, mora aqui (a keyword do domínio!)
2. **Como criar uma isca digital (com 32 exemplos por profissão)** — o artigo-ponte perfeito: cada exemplo linka o artigo da profissão (32 links internos naturais!)
3. **Como montar uma lista de e-mails do zero** (o ativo-lista é a tese de TODOS os dossiês — aqui ela vira artigo próprio)
4. **Renda extra na internet: caminhos realistas** (volume gigante; roteador de persona no meio)
5. **Transição CLT → PJ/autônomo: o plano** (a porta de entrada da audiência de profissão)
6. **Como ser freelancer: primeiros clientes** (ToFu direto do Silo 1 criativo/B2B)
7. **Trabalho remoto: como se posicionar** (volume + ponte para freelancer/consultor)
8. **Quanto custa começar um negócio digital (planilha)** — dado citável + ponte natural para o Silo 2 (taxas)
9. **Vender pelo WhatsApp: método sem spam** (busca enorme no BR; conecta com automação/Silo 3)

## Silo 5 — os 7 que faturam (copy → construtor)
1. Como escrever e-mails que vendem (sequência de 5) — espelho educacional do bloco 6c dos dossiês
2. Headlines: fórmulas + 30 exemplos por profissão (de novo: 30 links internos naturais)
3. Página de captura que converte: anatomia
4. CTA: o guia
5. Storytelling para vender serviços (usa os cenários "antes/depois" dos dossiês como exemplos)
6. Prova social sem depoimento falso (CDC — herda a pesquisa jurídica dos dossiês: ângulo ÚNICO no mercado)
7. Oferta irresistível (grátis, garantia, bônus) sem promessa enganosa (idem — o diferencial de conformidade vira pauta)

---

# 9. ROADMAP SUGERIDO (ordem de execução)

| Fase | Entregas | Por quê primeiro |
|---|---|---|
| **1 (semanas 1–2)** | Pilar-mãe "o que é funil de vendas" + 5 hub pages + componentes MDX (§5) + frontmatter | Reorganiza a autoridade de TUDO que já existe antes de criar o novo |
| **2 (semanas 2–4)** | Dossiês + artigos **#31 Lançador e #32 E-commerce** (Tier A) + retrofit dos `<TutorialBox>/<ComparativoBox>` nos 32 artigos | As 2 páginas de maior conversão potencial + o elo A2 em lote |
| **3 (mês 2)** | Silo 3: os 6 tutoriais da Camada 1 + Silo 2: Onda 1 (checkouts BR) + classe "alternativa-a" | Destinos dos links criados na Fase 2; BoFu = receita |
| **4 (mês 3)** | Silo 4: temas 1–4 + Silo 5: temas 1–2 + calculadora de taxas | Volume ToFu com roteadores já instalados |
| **5 (contínuo)** | Restante das ondas por dados de GSC/`ref=`; revisão trimestral de tiers; monitoramento de citações SGE | O ciclo de otimização |

---

## ⚠️ Pendências de reconciliação com os entregáveis anteriores
1. **Matriz de links internos:** atualizar `/terapeuta` → `/terapeuta-holistico`; adicionar #31 e #32 ao grafo (recebem de: coach, mentor, consultor, copywriter, social media, youtuber; linkam para: Silo 2 pesado + Silo 3).
2. **Dossiês #31 (Lançador/Infoprodutor) e #32 (E-commerce):** não existem — produção prioritária (posso criá-los no mesmo padrão dos 30).
3. **Prompt-mestre:** adicionar às variáveis `{TIER} = A/B/C` com as instruções de profundidade por tier (edição de 10 linhas — posso fazer).
