# Template — Páginas do Silo 2 (os 3 formatos)

Estrutura seção a seção. O tom segue o projeto (anti-hype, honesto) — aqui isso É a estratégia: quem busca "vs" está cansado de review comprada; a honestidade visível é o diferencial de conversão.

---

## FORMATO 1 — Comparativo 1×1 (`/ferramentas/systeme-io-vs-[rival]`)

### Frontmatter
```yaml
title: "Systeme.io vs [Rival] (2026): taxas, recursos e qual escolher"
description: "..."           # 140–160c, com a dor (taxa/custo) + promessa (a conta feita)
silo: ferramentas
rival: [slug-rival]
formato: vs
verificado_em: [AAAA-MM-DD]  # a data da checagem de preços
updated: [AAAA-MM-DD]
```

### Estrutura (nesta ordem)

**1. Veredito-resumo (answer-first — as primeiras 5 linhas).** Responda a busca já: *"Resposta curta: para [persona A], a Systeme.io costuma sair mais barata porque [conta em 1 frase]; para [persona B], o/a [Rival] faz sentido por [força real]. Abaixo, a conta completa com preços verificados em [mês/ano]."* + disclosure de afiliado discreto.

**2. A diferença estrutural (o modelo de cobrança).** 2–3 parágrafos explicando ONDE o dinheiro sai em cada uma (taxa por venda vs. custo fixo; US$ vs. R$; por contato vs. ilimitado). É o parágrafo que a SGE cita — dados com fonte e data.

**3. `<TabelaPrecos>` — a tabela-mestra.** Linhas: preço de entrada · taxa por venda · limite de contatos/e-mails · páginas/funis · área de membros · automação · moeda · custo estimado em 3 cenários (ex.: 100/500/2.000 vendas de R$ 197). Caption com "verificado em [data]". Fonte: páginas oficiais de preço.

**4. Recurso a recurso (5–7 blocos H3 curtos).** Funil/páginas · e-mail/automação · checkout/pagamentos · área de membros · afiliados · suporte/idioma. Em cada bloco: 2–4 frases + o veredito parcial honesto (inclusive "empate" e "vitória do rival" onde for verdade).

**5. Onde o/a [Rival] é melhor (seção OBRIGATÓRIA).** As 2–3 forças reais, sem ironia. É a seção que compra a credibilidade de todo o resto.

**6. Veredito por persona (o coração — e a costura com o Silo 1).** 3–5 cards/blocos: *"Você é [coach/lançador/e-commerce…]? → [recomendação + 1 frase de porquê]"* — cada persona linka o artigo `/funil-de-vendas/[slug]` correspondente. Aqui entra 1 `<CTAGo variant="inline">` na persona em que a Systeme vence com folga.

**7. Como migrar (ponte para o Silo 3).** 3–5 passos resumidos + `<TutorialBox slug="como-migrar-da-[rival]">` (se o tutorial não existir, linkar o genérico e registrar retrofit).

**8. FAQ (4–5 perguntas, formato snippet).** As clássicas: "a Systeme.io é grátis mesmo?", "o/a [Rival] cobra taxa por venda?", "dá pra usar as duas juntas?", "como levo minha lista/alunos?". Schema FAQPage.

**9. `<CTAGo>` full + changelog.** CTA de fechamento e, abaixo, o changelog visível: *"Atualizado em [mês/ano]: [o que mudou]. Preços verificados nas páginas oficiais em [data]."*

### Regras de qualidade do 1×1
- ≥30% editorial único (seções 2, 5 e 6 não saem de dataset).
- Nenhum número sem verificação datada; pendências → `[CONFIRMAR: ...]`.
- Zero FUD; concessões visíveis; sem estrelas/nota sem critério documentado.

---

## FORMATO 2 — Alternativa (`/ferramentas/alternativa-a-[rival]`)

A intenção é DIFERENTE do 1×1: o leitor **já decidiu sair** — não convença de que o rival é ruim (ele sabe); mostre a saída segura.

**Estrutura:** (1) answer-first: "a alternativa mais completa para [caso de uso] é X — e aqui está o plano de migração"; (2) por que as pessoas saem do/a [Rival] (as 3 dores nomeadas com empatia, sem exagero — taxa, preço em dólar, limite); (3) o que uma alternativa PRECISA ter (o checklist que educa o critério — a jogada-assinatura do projeto); (4) a alternativa em detalhe (Systeme.io contra o checklist, com a tabela); (5) **outras alternativas honestas** (2–3 rivais que também resolvem, 1 parágrafo cada — a seção que faz a página rankear e ser justa); (6) o plano de migração em passos + TutorialBox; (7) FAQ ("perco meus alunos/minha lista?", "e as vendas em andamento?"); (8) CTAGo + changelog.

---

## FORMATO 3 — Taxas/Calculadora (`/ferramentas/[rival]-taxas`)

A página de DADOS — o ímã de citação SGE e de backlinks.

**Estrutura:** (1) answer-first: a taxa vigente em 1 frase datada; (2) a estrutura completa de cobrança (tabela: taxa %, fixo por transação, saque, câmbio, parcelamento — tudo com fonte oficial); (3) **a calculadora/cenários**: quanto o rival custa em 100/500/1.000/5.000 vendas de R$ 97/197/497 (tabela estática obrigatória; componente interativo opcional); (4) o custo invisível (parcelamento, reserva, prazo de saque); (5) "isso é caro?" — comparação neutra com 2–3 concorrentes incluindo Systeme (link para o 1×1); (6) FAQ de taxas; (7) CTA suave (aqui o leitor é topo-de-BoFu: 1 CTAGo inline basta) + changelog **rigoroso** (esta página é a que mais precisa de data).

---

## Copy — moldes de title/meta (adaptar)
- 1×1: `Systeme.io vs [Rival] (2026): a conta real` · meta: *"Taxas, limites e preços verificados em [mês/ano]. Fizemos a conta em 3 cenários — e dizemos quando o/a [Rival] vale mais a pena."*
- Alternativa: `Alternativa ao/à [Rival]: guia de migração honesto` · meta: *"Cansou de [dor nº1]? Compare as opções, veja o checklist do que exigir e migre sem perder lista nem alunos."*
- Taxas: `Taxas da [Rival] em 2026: quanto custa de verdade` · meta: *"A estrutura completa de cobrança da [Rival], com a conta feita em cenários reais. Atualizado em [mês/ano]."*
