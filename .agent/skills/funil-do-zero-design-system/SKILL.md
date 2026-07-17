---
name: funil-do-zero-design-system
description: Design system visual do blog Funil do Zero (funildozero.com.br) — a linguagem de UI (cores, tipografia, espaçamento, tokens) e as especificações dos componentes de conversão em MDX/React (CTAGo, TutorialBox, ComparativoBox, EscolhaSeuCaminho, TabelaPrecos, LeiaTambem) mais os elementos editoriais (tipografia de artigo, citações "falas reais", box do ciclo vicioso, FAQ, caixa de autor/E-E-A-T, breadcrumbs, disclosure de afiliado). Use esta skill SEMPRE que a tarefa envolver aparência, layout, CSS, tokens, componentes de UI, páginas (artigo, hub, comparativo, home) ou implementação visual de qualquer parte do blog Funil do Zero — mesmo que o usuário não cite a skill pelo nome, e mesmo que peça só "estiliza isso", "cria o componente X", "escolhe as cores/fontes" ou "monta a página Y". Companheira visual da skill orquestradora `funil-do-zero`.
---

# Funil do Zero — Design System

A linguagem visual do blog **funildozero.com.br**. Esta skill define os tokens, os componentes e as regras para construir qualquer UI do projeto de forma consistente, acessível e — o ponto central — **coerente com a voz editorial**.

> **Relação com a skill `funil-do-zero`:** aquela é o orquestrador (roteia tarefas, guarda os padrões de CONTEÚDO). Esta é a camada VISUAL. Quando a tarefa é "escrever/estruturar conteúdo", use a orquestradora; quando é "construir/estilizar UI", use esta. As duas compartilham a mesma identidade de marca.

---

## 1. O princípio que rege tudo: a voz vira visual

O conteúdo do Funil do Zero é **anti-hype, honesto, empático e credível** — ensina profissionais a captar clientes sem prometer milagre. **O visual precisa dizer a mesma coisa antes de o leitor ler uma palavra.**

Traduzindo em direção de arte:
- **Credível e editorial, não "guru de vendas".** O inimigo estético é a landing page de infoproduto picareta: fundo preto, dourado, contadores piscando, vermelho gritando "ÚLTIMAS VAGAS". Fazemos o oposto — parece uma publicação séria sobre negócios, não um lançamento agressivo.
- **Calmo e confiante.** Muito espaço em branco, hierarquia clara, uma cor de ação quente usada com PARCIMÔNIA. A confiança vem da disciplina, não do volume.
- **Conversão honesta.** Os CTAs são claros e visíveis, mas nunca simulam urgência falsa. A escassez, quando existe, é real (e some do design padrão).
- **Legibilidade acima de tudo.** Os artigos são longos e 79% do tráfego é mobile — a experiência de leitura é o produto. Tipografia confortável, medida de linha controlada, mobile-first sempre.

**O elemento-assinatura do projeto** (a coisa memorável e "dele") não é um enfeite: é o **sistema de componentes de conversão que parece confiável de propósito** — com destaque para o *box do Ciclo Vicioso* (o fluxo em setas que nomeia a dor) e o *CTAGo* que se recusa a mentir. Gaste a ousadia aí; mantenha o resto quieto.

---

## 2. Fundações (resumo — detalhes em `references/tokens.md`)

**Cor.** Três famílias + semânticas, todas em `assets/tokens.css` (variáveis CSS prontas para colar):
- **Marca (teal `--brand`)** — confiança + crescimento; distinta do mar de "azul SaaS". Botões de marca, links (tom escuro), destaques.
- **Ação (coral-laranja `--accent`)** — a cor da CONVERSÃO; usada quase só no CTAGo e em 1–2 destaques por página. Escassa por design (se estiver em tudo, perde o poder).
- **Neutros quentes (stone)** — texto e superfícies em cinza-quente (não cinza-frio): mais humano.
- **Semânticas** — success/warning/danger/info, discretas, para tabelas comparativas, avisos regulatórios e disclosure.

> ⚠️ Direção deliberada: **evitamos os 3 clichês de design gerado por IA** — creme+serifa+terracota (#D97757), preto+verde-ácido, e broadsheet de réguas finas. Nossa paleta (branco/stone + teal + coral) não é nenhum deles. O accent coral **não é** o terracota-tell.

**Tipografia.** Pareamento com papel definido (não fontes neutras):
- **Títulos: "Fraunces"** (serifa variável, quente, editorial) — a serifa comunica CREDIBILIDADE jornalística num tema de dinheiro/negócio, separando-nos da estética de sales page. Usada com restrição.
- **Corpo: "Inter"** — referência de legibilidade em tela para leitura longa.
- **Dados/código: "JetBrains Mono"** — tabelas de preço, trechos técnicos dos tutoriais.
- Escala fluida (clamp), base 17→18px, `line-height` de corpo 1.7, medida ~68ch. Valores em `tokens.css`.

**Espaçamento / raio / sombra.** Base 4px; raios sutis (6/10/16px — credível, não "fofo"); sombras suaves e de baixa opacidade. Breakpoints mobile-first: 640 / 768 / 1024 / 1280.

---

## 3. Catálogo de componentes (specs completas em `references/components.md`)

### A escada de proeminência visual (REGRA CRÍTICA)
A página tem uma hierarquia HONESTA de peso visual — o que mais importa para o negócio é o mais forte, e nada compete com o CTA principal:

```
CTAGo  ▓▓▓▓▓▓  (o mais forte — accent, bloco, 1 por seção-chave)
ComparativoBox  ▓▓▓▓    (BoFu — próximo da decisão; teal, médio)
TutorialBox  ▓▓▓       (ajuda de execução; quieto, borda teal)
LeiaTambem / EscolhaSeuCaminho  ▓▓   (navegação; cards neutros)
Callouts (aviso/regra)  ▓▓      (funcional; semântico, sem gritar)
```
Se dois elementos disputam a atenção, o de baixo na escada cede. Nunca deixe um TutorialBox mais chamativo que o CTAGo.

### Os componentes de conversão (MDX/React)
| Componente | Função | Silo destino | Proeminência |
|---|---|---|---|
| **`<CTAGo>`** | CTA de afiliado (o único que leva a `/go/systeme?ref=`) | conversão | ▓▓▓▓▓▓ |
| **`<ComparativoBox>`** | Link contextual para comparativo | Silo 2 | ▓▓▓▓ |
| **`<TutorialBox>`** | Link contextual para tutorial passo a passo | Silo 3 | ▓▓▓ |
| **`<EscolhaSeuCaminho>`** | Roteador de persona (ToFu → MoFu/BoFu) | 1/2 | ▓▓ |
| **`<TabelaPrecos>`** | Tabela de dados citável (SGE) + schema | — | ▓▓ |
| **`<LeiaTambem>`** | Artigos relacionados por cluster | Silo 1 | ▓▓ |

### Os elementos editoriais (o "corpo" do artigo)
Tipografia de artigo (H1–H4 serifa / corpo Inter), **citação "falas reais"** (as dores parafraseadas em itálico — estilo-assinatura), **box do Ciclo Vicioso** (o fluxo em setas — o outro estilo-assinatura), **Callout regulatório** (avisos de conselho/lei — semântico info/warning), **FAQ acordeão** (seção AEO, com schema FAQPage), **Caixa de Autor/E-E-A-T** (foto, credencial, data de atualização — sinal de confiança para SGE), **Breadcrumbs**, **Disclosure de afiliado** (discreto). Todos especificados em `references/components.md`.

---

## 4. Padrões de layout (resumo)

- **Página de artigo (Silo 1/4/5):** coluna de conteúdo ~720px centralizada, respiro generoso, TOC fixo opcional no desktop (some no mobile). A leitura é sagrada — nada de sidebar poluída ao lado do texto.
- **Hub de silo:** grid de cards por cluster (Saúde, B2B, Criativo, Estética, Educação, Digital), com intro curada no topo.
- **Página de comparativo (Silo 2):** hero com veredito rápido (answer-first) → `<TabelaPrecos>` grande → cards de veredito por persona (linkando os artigos de profissão) → FAQ.
- **Home:** o pilar-mãe + as 5 portas de silo; sóbria, sem carrossel de "resultados".

---

## 5. Piso de qualidade (INEGOCIÁVEL — vale para todo componente/página)

1. **Acessibilidade AA:** contraste de texto ≥ 4.5:1 (usar os tons "text-safe" da paleta — ver nota de contraste em `tokens.css`); foco de teclado visível em tudo que é interativo; HTML semântico; alvos de toque ≥ 44px; `prefers-reduced-motion` respeitado.
2. **Performance / Core Web Vitals:** fontes via `next/font` (self-host, `display: swap`, subset latin), poucos pesos; sem CLS (reservar espaço de imagens/embeds); imagens em `next/image`.
3. **Mobile-first de verdade:** projete a coluna estreita primeiro; o CTAGo e as tabelas têm variação mobile (tabela vira cards).
4. **Movimento com parcimônia:** micro-interações sutis (hover/lift 150–250ms); zero animação decorativa que grite "gerado por IA".
5. **Copy é design:** microcopy na voz do projeto (verbos ativos, sentence case, sem filler); o rótulo do CTA diz o que acontece ("Criar minha conta grátis", não "Enviar").

---

## 6. Do / Don't (guarda-corpos anti-guru)

**Faça:** branco/stone com respiro; uma ação coral por vista; serifa editorial nos títulos com restrição; números com fonte citada; trust signals visíveis (CNPJ, avaliações, data de atualização); escassez só quando real.
**Não faça:** fundo preto+dourado; vermelho de urgência em tudo; contadores regressivos falsos; caps-lock gritando; sombras pesadas/gradientes berrantes; emojis em excesso; "de/por" falso; múltiplos CTAs concorrentes competindo na mesma vista.

---

## 7. Como usar esta skill (workflow)

1. **Sempre** comece colando/importando `assets/tokens.css` (ou mapeando os tokens no preset do Tailwind) — nenhum valor de cor/tipo é inventado fora dos tokens.
2. Para um **componente**, abra `references/components.md`, ache a spec (anatomia + estados + a11y + código de referência) e implemente com os tokens.
3. Para uma **página**, monte com o padrão de layout da Seção 4, respeitando a escada de proeminência da Seção 3.
4. Rode o **checklist** abaixo antes de entregar.
5. Se o usuário já tiver ativos de marca (logo, cores existentes), **pergunte e priorize os dele** — os valores aqui são a direção projetada, ajustável.

### Checklist visual
- [ ] Todos os valores vêm dos tokens (zero hex/px solto)?
- [ ] A escada de proeminência foi respeitada (CTAGo domina; nada compete)?
- [ ] Contraste AA + foco visível + alvos ≥44px + reduced-motion?
- [ ] Mobile-first (coluna estreita ok; tabela vira cards; CTA legível)?
- [ ] Voz visual anti-hype (nenhum item da lista "Não faça")?
- [ ] Fontes via next/font, sem CLS, imagens otimizadas?
- [ ] Microcopy na voz do projeto (rótulo de ação diz o que faz)?
- [ ] Disclosure de afiliado presente em página com `<CTAGo>`?

---

## 8. Índice de referências
- **`references/tokens.md`** — paleta completa (hex + escalas + notas de contraste), escala tipográfica (clamps), espaçamento, raio, sombra, breakpoints, motion. Leia ao definir/ajustar qualquer fundação.
- **`references/components.md`** — spec detalhada de cada componente (conversão + editorial): anatomia, variantes, estados, a11y e código React + CSS de referência. Leia ao construir qualquer componente.
- **`assets/tokens.css`** — variáveis CSS prontas (`:root`) + reset tipográfico base. Ponto de partida de qualquer implementação.
