# Referência — Tokens (Fundações)

Documentação completa das fundações do design system. Os valores prontos para colar estão em `assets/tokens.css`; aqui vai o **porquê** de cada decisão e as tabelas de consulta.

## Índice
1. Cor (paleta, escalas, papéis, contraste)
2. Tipografia (fontes, escala, uso)
3. Espaçamento, raio, sombra
4. Breakpoints e motion
5. Mapeamento para Tailwind (opcional)

---

## 1. COR

### Por que esta paleta
- **Marca teal:** um tema de *dinheiro/negócio* pede confiança; o verde-azulado transmite crescimento e credibilidade sem cair no "azul SaaS" genérico. Diferencia o blog num nicho saturado.
- **Ação coral-laranja:** cor complementar-quente que "salta" para conversão — calorosa e honesta (o vermelho puro grita golpe; o laranja convida). **Usada com parcimônia**: praticamente só no `CTAGo` e em 1–2 destaques por página. Se estiver em tudo, deixa de sinalizar ação.
- **Neutros stone (quentes):** cinza levemente amarelado — mais humano e editorial que o cinza-frio (slate/zinc). Sustenta a leitura longa sem frieza.
- **Direção anti-clichê:** evitamos deliberadamente os três "looks de IA" (creme+serifa+terracota #D97757 / preto+verde-ácido / broadsheet). Nosso accent coral **não é** o terracota-tell.

### Escala de marca (teal)
| Token | Hex | Uso |
|---|---|---|
| `--brand-50/100` | #F0FDFA / #CCFBF1 | fundos suaves, hover de card |
| `--brand-600` | #0D9488 | primária: ícones, fundos de marca, bordas de destaque |
| `--brand-700` | #0F766E | **text-safe** para texto grande/bold em fundo claro |
| `--brand-800` | #115E59 | **text-safe AA** para links inline no corpo (~5.3:1) |
| `--brand-900` | #134E4A | texto de marca sobre fundos muito claros |

### Escala de ação (coral-laranja)
| Token | Hex | Uso |
|---|---|---|
| `--accent-100` | #FFEDD5 | fundo de realce muito leve |
| `--accent-600` | #EA580C | **fundo do CTA** (texto branco ≥17px semibold = AA large) |
| `--accent-700` | #C2410C | hover do CTA / **text-safe AA** para rótulo pequeno (~4.9:1) |

### Neutros (stone) e papéis
`--ink` (#1C1917) texto · `--muted` (#57534E) secundário · `--surface` (#FFF) fundo · `--surface-alt` (#FAFAF9) alternância/zebra · `--border` (#E7E5E4) divisórias.

### Semânticas (discretas, funcionais)
`--success` #16A34A · `--warning` #D97706 · `--danger` #DC2626 · `--info` #2563EB — cada uma com par `-bg` claro. Uso: tabelas comparativas (✓/✗), avisos regulatórios (info/warning), disclosure. **Nunca** como cor de marca.

### Regras de contraste (WCAG AA — não-negociável)
- Corpo `--ink` sobre `--surface`: ~15:1 ✓.
- **Link inline:** `--brand-800` (~5.3:1) ✓. Evite `--brand-600` para texto pequeno (só ~3.3:1).
- **Botão CTA:** `--accent-600` + branco só com rótulo ≥17px semibold (AA large = 3:1). Rótulo menor → `--accent-700`.
- **Sobre teal escuro** (banner do CTAGo full): branco sobre `--brand-700/800` ✓.
- Sempre teste os pares reais; na dúvida, escureça um tom.

---

## 2. TIPOGRAFIA

### Pareamento (papéis distintos, não fontes neutras)
| Papel | Fonte | Por quê |
|---|---|---|
| **Display / títulos** | **Fraunces** (serifa variável) | Serifa = credibilidade editorial/jornalística num tema de dinheiro; separa do visual "sales page". Usada com restrição (peso 600–700, `text-wrap: balance`). |
| **Corpo / UI** | **Inter** | Referência de legibilidade em tela; ideal para artigos longos e mobile. |
| **Dados / código** | **JetBrains Mono** | Tabelas de preço (`TabelaPrecos`), trechos técnicos dos tutoriais. |

> Alternativas defensáveis, se preferir: display "Bricolage Grotesque" (mais contemporâneo, menos serifa) ou corpo "IBM Plex Sans". Se trocar, mantenha o contraste display×corpo e a legibilidade.

### Carregamento (Next.js)
Use `next/font/google` (ou self-host) com `display: 'swap'`, `subsets: ['latin']`, pesos mínimos: Fraunces 600/700; Inter 400/500/600/700; JetBrains Mono 400/500. Isso evita CLS e mantém o LCP baixo.

### Escala (fluida, clamp — ver `tokens.css`)
| Token | Tamanho | Uso |
|---|---|---|
| `--text-4xl` | 2.6→3.8rem | H1 (peso 700) |
| `--text-3xl` | 2.1→2.9rem | H2 |
| `--text-2xl` | 1.75→2.15rem | H3 |
| `--text-xl` | 1.45→1.75rem | H4 |
| `--text-lg` | 1.2→1.35rem | lead/destaque |
| `--text-base` | 17→18px | corpo |
| `--text-sm/xs` | 14.4 / 12.8px | meta, rótulos, disclosure |

`line-height`: corpo 1.7, títulos 1.15. Medida de linha: `--measure: 68ch`. Ativar `text-wrap: balance` em títulos e `pretty` em parágrafos.

---

## 3. ESPAÇAMENTO, RAIO, SOMBRA

- **Espaçamento:** base 4px; escala 4/8/12/16/24/32/48/64/96px (`--space-1`…`--space-16`). Ritmo vertical do artigo: `> * + *` = `--space-5`.
- **Larguras:** `--content-max` 46rem (coluna de artigo), `--page-max` 75rem (container).
- **Raio:** `--radius-sm` 6px (inputs, tags), `-md` 10px (cards, botões), `-lg` 16px (banners), `-pill` (badges/CTAs pílula). Sutil = credível; evite super-arredondado.
- **Sombra:** três níveis suaves de baixa opacidade e leve tom quente (`--shadow-sm/md/lg`). Evite drop shadows pesadas ou glow.

---

## 4. BREAKPOINTS E MOTION

- **Breakpoints (mobile-first):** sm 640 · md 768 · lg 1024 · xl 1280. Projete a coluna estreita primeiro.
- **Motion:** `--ease-out` (cubic-bezier(.16,1,.3,1)); durações `--dur-fast` 150ms / `--dur` 250ms. Só micro-interações (hover/lift, revelação sutil no scroll). `prefers-reduced-motion` já neutralizado no reset. Nada de animação decorativa.

---

## 5. MAPEAMENTO PARA TAILWIND (opcional)

Se o projeto usa Tailwind, exponha os tokens no tema para usar utilitários (`text-brand-800`, `bg-accent-600`…):

```js
// tailwind.config.js (trecho)
import colors from './tokens' // ou defina inline
export default {
  theme: {
    extend: {
      colors: {
        brand: { 50:'#F0FDFA',100:'#CCFBF1',200:'#99F6E4',300:'#5EEAD4',400:'#2DD4BF',500:'#14B8A6',600:'#0D9488',700:'#0F766E',800:'#115E59',900:'#134E4A' },
        accent:{ 50:'#FFF7ED',100:'#FFEDD5',300:'#FDBA74',400:'#FB923C',500:'#F97316',600:'#EA580C',700:'#C2410C' },
        stone: { 50:'#FAFAF9',100:'#F5F5F4',200:'#E7E5E4',300:'#D6D3D1',400:'#A8A29E',500:'#78716C',600:'#57534E',700:'#44403C',800:'#292524',900:'#1C1917' },
        success:'#16A34A', warning:'#D97706', danger:'#DC2626', info:'#2563EB',
      },
      fontFamily: {
        display: ['Fraunces','Georgia','serif'],
        body: ['Inter','system-ui','sans-serif'],
        mono: ['JetBrains Mono','ui-monospace','monospace'],
      },
      maxWidth: { content: '46rem', page: '75rem' },
      borderRadius: { sm:'6px', md:'10px', lg:'16px' },
    },
  },
}
```

> Mesmo com Tailwind, mantenha `tokens.css` como fonte da verdade das variáveis (clamps de tipografia, sombras, medida de linha) — o Tailwind consome; não duplique valores divergentes.
