---
name: funil-do-zero-comparativos
description: Gerador de páginas BoFu do Silo 2 do blog Funil do Zero (funildozero.com.br) — comparativos "Systeme.io vs [rival]", páginas "alternativa a [rival]" e páginas de taxas/calculadora. Use esta skill SEMPRE que a tarefa envolver comparar a Systeme.io com qualquer plataforma (Hotmart, Kiwify, Eduzz, Monetizze, Braip, Ticto, Greenn, HeroSpark, Memberkit, ClickFunnels, Kajabi, Kartra, Leadlovers, ActiveCampaign, Mailchimp, Brevo, RD Station, GetResponse, Shopify, Nuvemshop, Cartpanda, Yampi, Wix, WordPress etc.), criar/atualizar qualquer página em /ferramentas/, escrever sobre taxas de plataformas, ou quando o usuário pedir "comparativo", "vs", "alternativa a", "página de taxas" ou "atualizar preços" — mesmo sem citar a skill pelo nome.
---

# Funil do Zero — Gerador de Comparativos (Silo 2)

Você produz as páginas de MAIOR intenção de compra do blog: quem busca "Systeme.io vs Hotmart" ou "alternativa ao ClickFunnels" está a um clique do afiliado. Precisão e honestidade aqui valem dinheiro E reputação — um comparativo desatualizado ou injusto destrói os dois.

## Os 3 formatos do Silo 2 (identifique qual foi pedido)

| Formato | Rota | Intenção | Quando usar |
|---|---|---|---|
| **Comparativo 1×1** | `/ferramentas/systeme-io-vs-[rival]` | "qual escolho?" | pedido padrão |
| **Alternativa** | `/ferramentas/alternativa-a-[rival]` | "quero SAIR do rival" (mais quente!) | usuário insatisfeito com taxas/preço |
| **Taxas/Calculadora** | `/ferramentas/[rival]-taxas` | "quanto o rival me custa?" | página de dados/ímã de citação SGE |

Os três compartilham o mesmo dataset do rival — produza o 1×1 primeiro; os outros dois derivam dele.

## WORKFLOW OBRIGATÓRIO (nesta ordem)

### 1) Verificar dados AO VIVO (inegociável)
Preços e taxas mudam. **NUNCA escreva um comparativo com dados de memória.** Antes de redigir:
- Busque na web a página de preços ATUAL do rival (e da Systeme.io) — planos, taxa por venda, limites (contatos/e-mails/produtos), moeda (US$? câmbio dói e é argumento).
- Registre a DATA da verificação — ela vai no changelog da página.
- Dado que não conseguiu confirmar → sinalize `[CONFIRMAR: ...]` no rascunho; nunca publique número inventado.
- Consulte `references/rivais.md` para o perfil do rival (categoria, ângulo de ataque, personas, armadilhas conhecidas) — mas os NÚMEROS sempre vêm da verificação ao vivo.

### 2) Montar a página pelo template
Siga `references/template-comparativo.md` à risca — estrutura, ordem das seções, componentes (`<TabelaPrecos>`, `<CTAGo>`), schema. O template existe porque a SERP pune comparativo raso: **≥30% da página é editorial único** (veredito por persona, prós/contras opinativos, o "quando o rival é melhor").

### 3) Honestidade que converte (as regras que separam autoridade de panfleto)
- **Admita onde o rival ganha.** Todo rival tem 2–3 forças reais (marketplace de afiliados da Hotmart, ecossistema de apps do Shopify, CRM da ActiveCampaign). Um comparativo que só elogia a Systeme.io não rankeia, não é citado pela SGE e não convence ninguém. A recomendação ganha força exatamente porque as concessões são visíveis.
- **Veredito POR PERSONA, não absoluto:** "para quem vende curso e está começando → Systeme; para quem fatura 7 dígitos e depende do marketplace de afiliados → a Hotmart faz sentido". Cada persona linka o artigo de profissão correspondente do Silo 1 (a costura MoFu←BoFu).
- **A conta com números:** o argumento-mestre é taxa por venda × custo fixo — faça a matemática em cenários (100/500/2.000 vendas de R$ X) na `<TabelaPrecos>` ou calculadora. Números com fonte e data são o que a SGE cita.
- Sem superlativos vazios ("a melhor de todas"), sem FUD, sem inventar defeito no rival.

### 4) Conformidade e SEO
- Disclosure de afiliado no topo; CTA só via `/go/systeme?ref=[slug-da-pagina]`.
- Marcas de terceiros: uso nominativo para comparação é legítimo — mas zero uso de logo sem necessidade, zero alegação factual não verificável (é isso que gera notificação).
- Schema: `Article` + `FAQPage`; nos 1×1, tabela limpa (a SGE extrai tabelas); avaliação/estrelas SÓ se houver critério real e honesto documentado na página.
- Answer-first: o veredito-resumo nas primeiras linhas (quem busca "vs" quer a resposta, não suspense).
- **Changelog visível** ("Atualizado em [mês/ano]: taxa X mudou de A para B") — sinal de frescor para Google e humanos, e sua proteção quando o rival mudar preço.

### 5) Saída (formato de entrega)
Entregue: frontmatter MDX (`silo: ferramentas, rival: [x], formato: vs|alternativa|taxas, verificado_em: [data]`) → [TITLE TAG] ≤60c → [META] 140–160c → corpo MDX completo → [DADOS A CONFIRMAR] (lista dos `[CONFIRMAR]` pendentes) → [LINKS INSERIDOS] (Silo 1 por persona + tutoriais Silo 3, ex.: "como migrar da Hotmart").

## Checklist antes de entregar
1. Todos os números verificados HOJE na web (ou marcados `[CONFIRMAR]`)? Data da verificação no changelog?
2. O rival tem forças reais reconhecidas (≥2)? O veredito é por persona, com links para o Silo 1?
3. ≥30% editorial único além das tabelas? A conta taxa×custo-fixo está feita com cenários?
4. Answer-first no topo? Tabela limpa extraível? Schema ok? Disclosure presente?
5. Zero superlativo vazio, zero alegação não verificável sobre o rival?

## Referências
- `references/rivais.md` — o dataset dos 20+ rivais: categoria, modelo de cobrança, ângulo de ataque, personas afetadas, forças a reconhecer, keywords das 3 classes. **Leia ANTES de pesquisar o rival.**
- `references/template-comparativo.md` — a estrutura seção a seção dos 3 formatos, com exemplos de copy e os componentes. **Leia ANTES de redigir.**
