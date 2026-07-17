# Referência — Componentes

Spec de cada componente do Funil do Zero: anatomia, variantes, estados, acessibilidade e **código de referência** (React + CSS usando os tokens). O código é portátil — funciona com ou sem Tailwind; as classes `fz-*` referenciam `var(--token)`. Adapte para utilitários se preferir.

> **Antes de tudo:** respeite a **escada de proeminência** (ver SKILL.md §3). Da mais forte para a mais fraca: `CTAGo` → `ComparativoBox` → `TutorialBox` → `EscolhaSeuCaminho`/`LeiaTambem` → callouts. Nada compete com o `CTAGo`.

## Índice
**Conversão:** 1) CTAGo · 2) ComparativoBox · 3) TutorialBox · 4) EscolhaSeuCaminho · 5) TabelaPrecos · 6) LeiaTambem
**Editorial:** 7) Tipografia de artigo · 8) Citação "falas reais" · 9) Box do Ciclo Vicioso · 10) Callout regulatório · 11) FAQ acordeão · 12) Caixa de Autor (E-E-A-T) · 13) Breadcrumbs · 14) Disclosure de afiliado

---

## 1. `<CTAGo>` — o CTA de afiliado (proeminência ▓▓▓▓▓▓)

**Função:** o ÚNICO componente que leva a `/go/systeme?ref={slug}`. É o ponto de conversão — o elemento mais forte da página.
**Variantes:** `full` (banner com título + subtítulo + botão — para o fechamento do artigo) e `inline` (botão único com reforço curto — 1 uso intermediário opcional no bloco do funil).
**Anatomia (full):** fundo teal escuro → título curto (benefício, não hype) → 1 linha de reforço ("grátis para começar") → botão coral → microlinha de disclosure/segurança.
**Estados:** hover (botão escurece p/ `--accent-700` + lift 2px + sombra), focus-visible (anel `--brand-400`), active (sem lift).
**A11y:** `<a>` real com href; rótulo diz o que acontece ("Criar minha conta grátis"); contraste do botão AA-large (rótulo ≥17px semibold); área ≥44px.
**Nunca:** contador falso, "últimas vagas" inventado, múltiplos CTAGo competindo na mesma vista.

```jsx
export function CTAGo({ slug, variant = "full",
  titulo = "Monte seu funil na prática — de graça",
  reforco = "Plano gratuito da Systeme.io. Sem cartão, em português.",
  rotulo = "Criar minha conta grátis" }) {
  const href = `/go/systeme?ref=${slug}`;
  if (variant === "inline") {
    return (
      <p className="fz-cta-inline">
        <a className="fz-btn" href={href} rel="sponsored nofollow">{rotulo} →</a>
      </p>
    );
  }
  return (
    <aside className="fz-cta" role="complementary" aria-label="Comece na Systeme.io">
      <h3 className="fz-cta__title">{titulo}</h3>
      <p className="fz-cta__lead">{reforco}</p>
      <a className="fz-btn fz-btn--lg" href={href} rel="sponsored nofollow">{rotulo} →</a>
      <p className="fz-cta__fine">Link de afiliado — indicamos porque usamos. Você não paga nada a mais.</p>
    </aside>
  );
}
```
```css
.fz-cta{ background:var(--brand-800); color:#fff; border-radius:var(--radius-lg);
  padding:var(--space-6); text-align:center; box-shadow:var(--shadow-md);
  max-width:var(--content-max); margin:var(--space-8) auto; }
.fz-cta__title{ font-family:var(--font-display); font-size:var(--text-2xl);
  line-height:var(--leading-tight); color:#fff; margin:0 0 var(--space-2); text-wrap:balance; }
.fz-cta__lead{ color:var(--brand-100); font-size:var(--text-base); margin:0 0 var(--space-5); }
.fz-cta__fine{ color:var(--brand-200); font-size:var(--text-xs); margin:var(--space-3) 0 0; }
.fz-btn{ display:inline-block; background:var(--accent-600); color:#fff; font-weight:600;
  font-size:var(--text-base); padding:.85em 1.6em; border-radius:var(--radius-pill);
  text-decoration:none; transition:transform var(--dur-fast) var(--ease-out),
  background var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out); }
.fz-btn:hover{ background:var(--accent-700); transform:translateY(-2px); box-shadow:var(--shadow-md); }
.fz-btn--lg{ font-size:var(--text-lg); padding:.9em 1.9em; }
.fz-cta-inline{ text-align:center; margin:var(--space-6) auto; }
```

---

## 2. `<ComparativoBox>` — link para comparativo (Silo 2, ▓▓▓▓)

**Função:** ancorar a objeção "por que Systeme e não a ferramenta X?" com o comparativo certo. Mais forte que o TutorialBox (é BoFu, perto da decisão), mais fraco que o CTAGo.
**Anatomia:** card com borda teal, ícone de balança, "Comparativo:" + título linkado ("Systeme.io vs [Rival]") + 1 linha de gancho ("veja as taxas lado a lado").
**A11y:** link com texto descritivo; ícone `aria-hidden`.

```jsx
export function ComparativoBox({ rival, titulo, gancho }) {
  return (
    <aside className="fz-box fz-box--comp">
      <span className="fz-box__ico" aria-hidden>⚖️</span>
      <div>
        <span className="fz-box__kicker">Comparativo</span>
        <a className="fz-box__link" href={`/ferramentas/systeme-io-vs-${rival}`}>{titulo}</a>
        {gancho && <p className="fz-box__hook">{gancho}</p>}
      </div>
    </aside>
  );
}
```
```css
.fz-box{ display:flex; gap:var(--space-4); align-items:flex-start;
  background:var(--surface-alt); border:1px solid var(--border);
  border-radius:var(--radius-md); padding:var(--space-4) var(--space-5);
  margin:var(--space-6) auto; max-width:var(--content-max); }
.fz-box--comp{ border-left:4px solid var(--brand-600); }
.fz-box__ico{ font-size:1.6rem; line-height:1; }
.fz-box__kicker{ display:block; font-size:var(--text-xs); font-weight:600;
  letter-spacing:.06em; text-transform:uppercase; color:var(--brand-700); margin-bottom:2px; }
.fz-box__link{ font-family:var(--font-display); font-size:var(--text-lg);
  color:var(--brand-800); text-decoration:none; font-weight:600; }
.fz-box__link:hover{ color:var(--brand-600); text-decoration:underline; }
.fz-box__hook{ font-size:var(--text-sm); color:var(--muted); margin:var(--space-1) 0 0; }
```

---

## 3. `<TutorialBox>` — link para tutorial (Silo 3, ▓▓▓)

**Função:** oferta de execução discreta em cada sub-etapa do funil ("como fazer isso na prática"). Quieto e útil — NÃO é CTA.
**Anatomia:** igual ao box base, borda esquerda em stone/teal claro, ícone 📘, "Passo a passo:" + título linkado para `/systeme-io/[slug]`.

```jsx
export function TutorialBox({ slug, titulo }) {
  return (
    <aside className="fz-box fz-box--tut">
      <span className="fz-box__ico" aria-hidden>📘</span>
      <div>
        <span className="fz-box__kicker fz-box__kicker--muted">Passo a passo</span>
        <a className="fz-box__link" href={`/systeme-io/${slug}`}>{titulo}</a>
      </div>
    </aside>
  );
}
```
```css
.fz-box--tut{ border-left:4px solid var(--brand-300); background:var(--brand-50); }
.fz-box__kicker--muted{ color:var(--muted); }
```

---

## 4. `<EscolhaSeuCaminho>` — roteador de persona (ToFu → MoFu/BoFu, ▓▓)

**Função:** em artigos ToFu (Silo 4), oferecer 2–3 portas por persona para descer o funil.
**Anatomia:** título curto + grid de cards (desktop) / empilhados (mobile), cada card com rótulo e destino.
**A11y:** cards são `<a>`; grid vira coluna única < 640px.

```jsx
export function EscolhaSeuCaminho({ titulo = "Qual é o seu caso?", opcoes = [] }) {
  return (
    <section className="fz-router" aria-label={titulo}>
      <h3 className="fz-router__title">{titulo}</h3>
      <div className="fz-router__grid">
        {opcoes.map((o) => (
          <a key={o.href} className="fz-router__card" href={o.href}>
            <strong>{o.titulo}</strong><span>{o.desc}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
```
```css
.fz-router{ max-width:var(--content-max); margin:var(--space-8) auto; }
.fz-router__title{ font-family:var(--font-display); font-size:var(--text-xl); margin-bottom:var(--space-4); }
.fz-router__grid{ display:grid; gap:var(--space-4); grid-template-columns:1fr; }
@media (min-width:640px){ .fz-router__grid{ grid-template-columns:repeat(3,1fr); } }
.fz-router__card{ display:flex; flex-direction:column; gap:var(--space-1);
  background:var(--surface); border:1px solid var(--border); border-radius:var(--radius-md);
  padding:var(--space-4); text-decoration:none; color:var(--ink);
  transition:border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out); }
.fz-router__card:hover{ border-color:var(--brand-400); box-shadow:var(--shadow-sm); }
.fz-router__card strong{ font-weight:600; color:var(--brand-800); }
.fz-router__card span{ font-size:var(--text-sm); color:var(--muted); }
```

---

## 5. `<TabelaPrecos>` — tabela de dados citável (SGE, ▓▓)

**Função:** dados (preços/taxas/faixas) em formato limpo que a IA (AI Overviews/Perplexity) extrai e cita. Números em mono; fonte no caption; responsiva (vira cards no mobile).
**A11y/Semântica:** `<table>` com `<caption>`, `<th scope>`; considerar schema (Product/Table) no MDX.

```jsx
export function TabelaPrecos({ titulo, colunas, linhas, fonte }) {
  return (
    <figure className="fz-precos">
      <table className="fz-precos__table">
        <caption className="fz-precos__cap">{titulo}</caption>
        <thead><tr>{colunas.map((c) => <th key={c} scope="col">{c}</th>)}</tr></thead>
        <tbody>{linhas.map((l, i) => (
          <tr key={i}>{l.map((cel, j) => <td key={j} data-label={colunas[j]}>{cel}</td>)}</tr>
        ))}</tbody>
      </table>
      {fonte && <figcaption className="fz-precos__fonte">Fonte: {fonte}</figcaption>}
    </figure>
  );
}
```
```css
.fz-precos{ max-width:var(--content-max); margin:var(--space-6) auto; }
.fz-precos__table{ width:100%; border-collapse:collapse; font-size:var(--text-sm); }
.fz-precos__cap{ font-family:var(--font-display); font-size:var(--text-lg); text-align:left;
  margin-bottom:var(--space-3); color:var(--ink); }
.fz-precos__table th{ text-align:left; background:var(--brand-800); color:#fff;
  padding:var(--space-3); font-weight:600; }
.fz-precos__table td{ padding:var(--space-3); border-bottom:1px solid var(--border);
  font-variant-numeric:tabular-nums; }
.fz-precos__table td:not(:first-child){ font-family:var(--font-mono); }
.fz-precos__table tbody tr:nth-child(even){ background:var(--surface-alt); }
.fz-precos__fonte{ font-size:var(--text-xs); color:var(--muted); margin-top:var(--space-2); }
/* Mobile: tabela vira cards */
@media (max-width:640px){
  .fz-precos__table thead{ position:absolute; left:-9999px; }
  .fz-precos__table tr{ display:block; border:1px solid var(--border);
    border-radius:var(--radius-md); margin-bottom:var(--space-3); padding:var(--space-2); }
  .fz-precos__table td{ display:flex; justify-content:space-between; gap:var(--space-4);
    border-bottom:1px dashed var(--border); }
  .fz-precos__table td::before{ content:attr(data-label); font-family:var(--font-body);
    font-weight:600; color:var(--muted); }
}
```

---

## 6. `<LeiaTambem>` — relacionados por cluster (Silo 1, ▓▓)

**Função:** bloco de fim de artigo com 2–4 irmãos do mesmo cluster (alimentado pelo frontmatter `cluster`). Reforça o ecossistema e os nós isolados da matriz. Aceita `href` por item para destinos fora do Silo 1 (cross-silo) — sem `href`, assume `/funil-de-vendas/[slug]`.

```jsx
export function LeiaTambem({ artigos = [] }) {
  return (
    <nav className="fz-leia" aria-label="Leia também">
      <h3 className="fz-leia__title">Leia também</h3>
      <ul className="fz-leia__list">
        {artigos.map((a) => (
          <li key={a.href ?? a.slug}>
            <a href={a.href ?? `/funil-de-vendas/${a.slug}`}>{a.titulo}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```
```css
.fz-leia{ max-width:var(--content-max); margin:var(--space-8) auto;
  border-top:1px solid var(--border); padding-top:var(--space-5); }
.fz-leia__title{ font-family:var(--font-display); font-size:var(--text-lg); margin-bottom:var(--space-3); }
.fz-leia__list{ list-style:none; padding:0; display:grid; gap:var(--space-2); }
.fz-leia__list a{ color:var(--brand-800); text-decoration:none; }
.fz-leia__list a:hover{ text-decoration:underline; }
```

---

## 7. Tipografia de artigo

Já coberta no reset (`.fz-prose` em `tokens.css`): H1–H4 Fraunces com respiro, corpo Inter 17→18px/1.7, links `--brand-800`, medida 68ch. **Regra editorial:** prosa é o padrão; listas só quando o conteúdo é genuinamente uma lista (a voz do projeto evita bullets decorativos).

---

## 8. Citação "falas reais" (estilo-assinatura)

**Função:** as dores parafraseadas em itálico (Seção 2 dos dossiês) — o recurso emocional que gera identificação. Estilo distinto de blockquote.

```css
.fz-fala{ font-style:italic; color:var(--stone-700); font-size:var(--text-lg);
  line-height:var(--leading-snug); border-left:3px solid var(--accent-400);
  padding:var(--space-1) 0 var(--space-1) var(--space-4);
  margin:var(--space-5) auto; max-width:var(--content-max); }
```
```html
<blockquote class="fz-fala">"Tenho 8 mil seguidores e as terças vazias. Like não paga boleto."</blockquote>
```

---

## 9. Box do Ciclo Vicioso (estilo-assinatura)

**Função:** o fluxo em setas que nomeia o ciclo vicioso da captação (Seção 2 dos dossiês) — o elemento mais "ownable" do projeto. Uma caixa que desenha a armadilha e prepara a virada.
**Anatomia:** rótulo "O ciclo vicioso" + a cadeia de etapas com separadores em seta + (opcional) uma linha de "como o funil quebra isso".

```jsx
export function CicloVicioso({ etapas = [], quebra }) {
  return (
    <aside className="fz-ciclo" aria-label="O ciclo vicioso da captação">
      <span className="fz-ciclo__kicker">O ciclo vicioso</span>
      <p className="fz-ciclo__flow">
        {etapas.map((e, i) => (
          <span key={i}>
            <span className="fz-ciclo__step">{e}</span>
            {i < etapas.length - 1 && <span className="fz-ciclo__arrow" aria-hidden> → </span>}
          </span>
        ))}
      </p>
      {quebra && <p className="fz-ciclo__break"><strong>Como o funil quebra isso:</strong> {quebra}</p>}
    </aside>
  );
}
```
```css
.fz-ciclo{ background:var(--danger-bg); border:1px solid #FADcd5;
  border-radius:var(--radius-md); padding:var(--space-5);
  margin:var(--space-6) auto; max-width:var(--content-max); }
.fz-ciclo__kicker{ display:inline-block; font-size:var(--text-xs); font-weight:700;
  letter-spacing:.06em; text-transform:uppercase; color:var(--danger); margin-bottom:var(--space-2); }
.fz-ciclo__flow{ font-weight:600; color:var(--stone-800); line-height:1.9; margin:0; }
.fz-ciclo__step{ background:#fff; border:1px solid var(--border-strong);
  border-radius:var(--radius-sm); padding:.15em .5em; white-space:nowrap; }
.fz-ciclo__arrow{ color:var(--danger); font-weight:700; }
.fz-ciclo__break{ margin:var(--space-4) 0 0; color:var(--ink);
  border-top:1px dashed var(--border-strong); padding-top:var(--space-3); }
.fz-ciclo__break strong{ color:var(--brand-800); }
```

---

## 10. Callout regulatório (avisos de conselho/lei)

**Função:** destacar as fronteiras legais/éticas (Seção 3 dos dossiês) sem gritar. Variantes `info` (regra/permitido) e `warning` (atenção/proibido).

```css
.fz-callout{ display:flex; gap:var(--space-3); border-radius:var(--radius-md);
  padding:var(--space-4) var(--space-5); margin:var(--space-5) auto;
  max-width:var(--content-max); font-size:var(--text-sm); line-height:var(--leading-snug); }
.fz-callout--info{ background:var(--info-bg); border:1px solid #BFDBFE; }
.fz-callout--warn{ background:var(--warning-bg); border:1px solid #FDE68A; }
.fz-callout__ico{ font-size:1.3rem; line-height:1; }
.fz-callout strong{ color:var(--ink); }
```
```html
<div class="fz-callout fz-callout--warn"><span class="fz-callout__ico" aria-hidden>⚠️</span>
<div><strong>Atenção (CFM):</strong> médico não divulga preço nem antes/depois. O selo de confiança aqui é o registro, não a promessa.</div></div>
```

---

## 11. FAQ acordeão (seção AEO)

**Função:** a seção de Perguntas Frequentes (Seção 9 dos dossiês), otimizada para snippet/PAA. Use `<details>/<summary>` nativo (acessível e sem JS) + schema FAQPage no MDX.
**Regra:** a resposta abre com a frase direta (formato snippet).

```css
.fz-faq{ max-width:var(--content-max); margin:var(--space-8) auto; }
.fz-faq__item{ border-bottom:1px solid var(--border); }
.fz-faq__q{ font-family:var(--font-display); font-size:var(--text-lg); font-weight:600;
  color:var(--ink); cursor:pointer; padding:var(--space-4) 0; list-style:none;
  display:flex; justify-content:space-between; gap:var(--space-4); }
.fz-faq__q::-webkit-details-marker{ display:none; }
.fz-faq__q::after{ content:"+"; color:var(--brand-600); font-size:1.4em; line-height:1; }
details[open] .fz-faq__q::after{ content:"–"; }
.fz-faq__a{ padding:0 0 var(--space-4); color:var(--stone-700); }
```
```html
<details class="fz-faq__item"><summary class="fz-faq__q">Preciso de CNPJ para começar?</summary>
<div class="fz-faq__a">Não para captar leads e montar o funil...</div></details>
```

---

## 12. Caixa de Autor (E-E-A-T — sinal de confiança para SGE)

**Função:** creditar o autor com foto, credencial e data de atualização — a SGE pondera entidade/autoria. Fim do artigo (ou topo).

```css
.fz-autor{ display:flex; gap:var(--space-4); align-items:center;
  background:var(--surface-alt); border:1px solid var(--border);
  border-radius:var(--radius-md); padding:var(--space-4) var(--space-5);
  max-width:var(--content-max); margin:var(--space-8) auto; }
.fz-autor__foto{ width:56px; height:56px; border-radius:var(--radius-pill);
  object-fit:cover; flex:0 0 auto; }
.fz-autor__nome{ font-weight:600; color:var(--ink); }
.fz-autor__cred{ font-size:var(--text-sm); color:var(--muted); }
.fz-autor__data{ font-size:var(--text-xs); color:var(--muted); margin-top:2px; }
```

---

## 13. Breadcrumbs (com schema BreadcrumbList)

```css
.fz-crumbs{ max-width:var(--page-max); margin:var(--space-4) auto; font-size:var(--text-sm); }
.fz-crumbs ol{ list-style:none; display:flex; flex-wrap:wrap; gap:var(--space-2); padding:0; }
.fz-crumbs a{ color:var(--muted); text-decoration:none; }
.fz-crumbs a:hover{ color:var(--brand-700); }
.fz-crumbs li+li::before{ content:"/"; color:var(--stone-300); margin-right:var(--space-2); }
.fz-crumbs [aria-current="page"]{ color:var(--ink); }
```
Estrutura: Home → Silo → Artigo. Emita também JSON-LD `BreadcrumbList`.

---

## 14. Disclosure de afiliado (discreto, mas presente)

**Função:** transparência exigida em toda página com `<CTAGo>`. Discreta (não atrapalha conversão), mas visível.

```css
.fz-disclosure{ max-width:var(--content-max); margin:var(--space-4) auto;
  font-size:var(--text-xs); color:var(--muted); background:var(--surface-alt);
  border:1px solid var(--border); border-radius:var(--radius-sm);
  padding:var(--space-2) var(--space-4); }
```
```html
<p class="fz-disclosure">Este artigo contém links de afiliado. Se você criar sua conta pela nossa indicação, podemos receber uma comissão — sem custo nenhum para você.</p>
```

---

### Notas de implementação
- **Especificidade CSS:** evite seletores por tipo (`.section`) que cancelam por elemento (`.cta`) em margens — prefira as classes `fz-*` com margens próprias, como acima.
- **MDX:** exporte os componentes de conversão para uso direto no `.mdx` (o prompt-mestre já insere `<CTAGo>`, `<TutorialBox>`, `<ComparativoBox>`). Os elementos editoriais (falas, ciclo, callout, FAQ) podem ser componentes OU classes aplicadas pelo mapeamento de elementos do MDX.
- **Schema:** FAQPage (§11), BreadcrumbList (§13), Article + Author (§12), e Product/AggregateRating nas páginas de comparativo (Silo 2).
