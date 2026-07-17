# 🤝 Handoff — Backlog Silo 2 (Onda 1) + Silo 3 (Camadas 2–3)

> **Para o próximo agente:** este documento é o ponto de entrada. Leia-o inteiro antes de tocar em qualquer arquivo. Ele existe porque a produção deste backlog é longa (10+ peças de conteúdo, cada uma exigindo verificação de preço ao vivo) e não cabe numa sessão só.
> **Data do handoff:** 17/07/2026. **Sessão anterior:** integrou os NOVOS MATERIAIS inteiros (dossiês, matriz de links, skills, 32 artigos retrofitados) + validou o padrão de 3 páginas do Silo 2 com o trio Hotmart. Todo esse trabalho já está em produção (`origin/main`, commits `4ec7c80`…`8797855`).

---

## 1. Onde estamos (não refaça isto)

✅ **Feito e no ar:**
- As 4 skills operacionais instaladas em `.claude/skills/` e `.agent/skills/` (`funil-do-zero`, `funil-do-zero-design-system`, `funil-do-zero-comparativos`, `funil-do-zero-otimizacao`) — **leia a skill `funil-do-zero-comparativos` inteira antes de produzir qualquer página do Silo 2**.
- Os 6 componentes MDX do design system (`CTAGo`, `TutorialBox`, `ComparativoBox`, `EscolhaSeuCaminho`, `TabelaPrecos`, `LeiaTambem`, `CicloVicioso`) implementados em `blog/src/components/conversion/` e registrados no map compartilhado `blog/src/components/mdx/mdxComponents.ts`.
- Os 32 artigos do Silo 1 (`/funil-de-vendas/*`) já têm os links da matriz, tier/intent no frontmatter e os TutorialBox/ComparativoBox retrofitados.
- Silo 3 **Camada 1** (ativação) completa: `301`–`307` em `blog/content/systeme-io/` (como funciona, blog, hospedar curso, criar captura, obrigado, régua, página de vendas).
- Silo 2: **o trio Hotmart** (`201`–`203` em `blog/content/ferramentas/`) — `vs-hotmart`, `alternativa-a-hotmart`, `hotmart-taxas`. **Use esses 3 arquivos como referência de formato/tom/estrutura para tudo que vier a seguir.**
- Dataset programático `blog/src/data/comparativos.ts` já tem `vs` (formato legado, renderizado por `ArticleTemplateComparativo`) para **Kiwify, ClickFunnels, Greenn, HeroSpark** (além de Hotmart, que migrou para MDX).

❌ **Não existe ainda** (é isto que você vai produzir):

### Silo 2 — Onda 1 (checkout/infoproduto BR), 5 rivais sem NENHUMA página
Eduzz, Monetizze, Braip, Ticto, Memberkit — zero páginas `vs`, `alternativa` ou `taxas`.

### Silo 2 — completar o trio dos 4 rivais que só têm `vs`
Kiwify, ClickFunnels, Greenn, HeroSpark têm o comparativo 1×1 (formato dataset, não MDX) mas **não têm** `alternativa-a-[rival]` nem `[rival]-taxas`.

### Silo 3 — Camada 2 (monetização)
Pix/gateways BR (Mercado Pago etc.), order bump e upsell, área de membros/curso completo (expandir o existente), webinário/evergreen, programa de afiliados dentro da Systeme.

### Silo 3 — Camada 3 (migração e comparação prática)
**Como migrar da Hotmart para a Systeme.io** (prioridade alta — já é citado e sem link em `alternativa-a-hotmart.mdx`), migrar lista do Mailchimp/outros, pixel do Meta + rastreamento, LGPD na prática (double opt-in), "Systeme.io grátis até onde?" (limites do plano free).

A lista completa e atualizada de pendências vive em **`materiais/estrategia/retrofit-pendencias.md`** — confira-a a cada rodada e atualize-a ao terminar.

---

## 2. Como produzir (o processo, passo a passo)

1. **Carregue a skill `funil-do-zero-comparativos`** (para páginas do Silo 2) ou **`funil-do-zero`** (para tutoriais do Silo 3). Elas apontam para os dois arquivos-fonte abaixo — leia-os antes de escrever:
   - `.claude/skills/funil-do-zero-comparativos/references/rivais.md` — perfil de cada rival (categoria, ângulo, forças a reconhecer, personas do Silo 1 a linkar). **Os valores de preço no arquivo são só o mapa da estrutura — sempre verifique ao vivo.**
   - `.claude/skills/funil-do-zero-comparativos/references/template-comparativo.md` — a estrutura seção-a-seção dos 3 formatos (`vs`, `alternativa`, `taxas`).
2. **Verifique preços AO VIVO** antes de escrever qualquer número. Nunca reuse dado de memória de sessões passadas sem reconferir — plataformas mudam preço. Use WebFetch/WebSearch na página oficial de preços/taxas do rival. Registre a data da verificação no `verificado_em` do frontmatter e no changelog final do artigo.
3. **Use os 3 arquivos do Hotmart como molde estrutural** (`blog/content/ferramentas/201-203-*.mdx`):
   - Frontmatter: `title, description, slug, silo: "ferramentas", siloLabel: "Ferramentas", date, updatedAt, rival, formato: "vs"|"alternativa"|"taxas", verificado_em, faq` (3–7 itens).
   - Corpo: **sem H1** (o template renderiza o título do frontmatter) e **sem o parágrafo de disclosure de afiliado** no topo do corpo se o artigo abre com CTA próprio — o `ArticleTemplate` já lida com isso via a checagem `content.includes("<CTAGo")` (ver §4 abaixo, "Gotcha 2").
   - FAQ: escreva as perguntas em `<details className="fz-faq__item"><summary className="fz-faq__q">...</summary><div className="fz-faq__a">...</div></details>`, IDÊNTICAS às do frontmatter (o schema FAQPage lê do frontmatter; o corpo é só a versão visível).
   - Feche o trio: toda página nova linka as outras 2 do mesmo rival via `<LeiaTambem>` com `href` explícito (não `slug`, porque são do mesmo silo mas rota `/ferramentas/[slug]` — usar `href: "/ferramentas/alternativa-a-[rival]"` etc.).
4. **Salve o arquivo** em `blog/content/ferramentas/{NNN}-{slug}.mdx` (próximo número livre: **204** em diante) ou `blog/content/systeme-io/{NNN}-{slug}.mdx` (próximo: **308** em diante).
5. **Build:** `cd blog; npm run build` — precisa terminar com `✓ Compiled successfully` e `✓ Generating static pages using 7 workers (N/N)`. Se travar em `YAMLException`, veja Gotcha 1 abaixo.
6. **Varredura de links quebrados** (rode isto sempre, é rápido e pegou 2 erros reais nesta sessão):
   ```bash
   cd blog
   P=.next/server/app
   for f in $P/ferramentas/*.html $P/systeme-io/*.html; do
     grep -o 'href="/[a-z0-9/-]*"' "$f" | sed 's/href="//;s/"$//'
   done | sort -u | while read u; do
     [ "$u" = "/" ] && continue
     case "$u" in /go/systeme*) continue;; esac
     if [ ! -f "$P${u}.html" ] && [ ! -f "$P${u}/index.html" ]; then echo "QUEBRADO: $u"; fi
   done
   ```
7. **Commit por rival/tutorial concluído** (não acumule tudo num commit gigante — facilita revisão e rollback). Mensagem no padrão dos commits anteriores (`git log` para ver o estilo).
8. **Atualize `retrofit-pendencias.md`** riscando o que foi feito e anotando qualquer link pendente que você tenha criado para uma página que ainda não existe (ex.: `<TutorialBox slug="como-migrar-da-hotmart">` antes de esse tutorial existir).
9. **Push só quando o usuário pedir explicitamente**, a menos que ele já tenha dado autorização permanente para isso nesta sessão (confira o histórico da conversa).

---

## 3. Ordem sugerida (mas negocie com o usuário antes de assumir)

Na sessão anterior, o usuário escolheu explicitamente "um rival completo (vs + alternativa + taxas)" para validar o padrão antes de escalar, e pediu ritmo de "2–3 peças por rodada, com revisão entre elas". **Não assuma que ele quer o lote inteiro de uma vez** — pergunte o ritmo desejado se não houver instrução clara na conversa atual.

Ordem de impacto (da própria estratégia, §9 do roadmap):
1. `/systeme-io/como-migrar-da-hotmart` (Silo 3) — **maior prioridade isolada**: já é mencionado sem link em `alternativa-a-hotmart.mdx`, fecha uma referência pendente real.
2. Completar `alternativa-a-` e `-taxas` dos 4 rivais que já têm `vs` (Kiwify, ClickFunnels, Greenn, HeroSpark) — menor esforço, dataset de preço já existe em `comparativos.ts` (mas **reconfira antes de publicar**, os dados têm meses).
3. Os 5 rivais novos da Onda 1 (Eduzz, Monetizze, Braip, Ticto, Memberkit) — trio completo cada.
4. Silo 3 Camada 2 (monetização) — 5 tutoriais.
5. Silo 3 Camada 3 (migração/comparação) — 4 tutoriais restantes.

---

## 4. Gotchas descobertos nesta sessão (não repita)

**Gotcha 1 — aspas duplas não escapadas no YAML quebram o build com erro críptico.**
Se uma resposta de FAQ no frontmatter contém `"` sem fechar corretamente (ex.: terminar a string sem a aspa final antes de `---`), o build falha com `YAMLException: unexpected end of the stream` e a mensagem do Next.js (`Failed to collect page data for /ferramentas/[slug]`) não indica qual arquivo é o culpado. Para achar: rode `npm run build 2>&1 | tail -60` (o erro completo do YAML aparece ali, com o trecho do buffer). Prevenção: ao escrever FAQ com aspas internas, prefira aspas simples externas no YAML ou revise cuidadosamente cada string antes de salvar.

**Gotcha 2 — `next-mdx-remote` v6 remove expressões JS/JSX de atributos por padrão (`blockJS: true`).**
Isso já foi corrigido nos 3 templates (`ArticleTemplate.tsx`, `ArticleTemplateFunil.tsx`, `ArticleTemplateComparativo.tsx`) com `options={{ blockJS: false, ... }}` no `<MDXRemote>`. Não precisa mexer nisso de novo — só saiba que é por isso que arrays/objetos em props de componentes (`<TabelaPrecos linhas={[...]} />`, `<LeiaTambem artigos={[...]} />`) funcionam.

**Gotcha 3 — `<ComparativoBox rival="X">` aponta para `/ferramentas/systeme-io-vs-X` sem checar se a página existe.**
Se você referenciar um rival sem página `vs` publicada (ex.: usei `activecampaign` por engano em 3 artigos do Silo 1 — não existe página, quebrou o link), o build passa mas a varredura de links (passo 6 acima) pega o erro. **Sempre rode a varredura antes de considerar terminado.**

**Gotcha 4 — `ArticleTemplate` evita duplicar CTA/FAQ quando o corpo já traz `<CTAGo>` ou `## Perguntas frequentes`.**
A lógica está em `blog/src/components/layout/ArticleTemplate.tsx` (`temCtaProprio`, `temFaqNoCorpo`). Isso significa: se você criar um artigo no formato novo (gabarito/design system), **não** adicione o `<AffiliateCTA>` legado nem duplique a seção de FAQ — o template já assume que você está usando os componentes novos.

**Gotcha 5 — preços verificados "hoje" na conversa anterior não são "verificados hoje" na sua sessão.**
Os preços da Systeme.io e da Hotmart usados nos 3 arquivos existentes foram verificados ao vivo em 17/07/2026 (mesma sessão). Se sua sessão for de outro dia, **reconfira antes de reusar**, mesmo que pareça "recente" — a skill de comparativos é explícita: nunca publique com dado de memória.

---

## 5. Arquivos-chave para orientação rápida

| Preciso de... | Vá para... |
|---|---|
| Perfil de cada rival (ângulo, forças, personas) | `.claude/skills/funil-do-zero-comparativos/references/rivais.md` |
| Estrutura seção-a-seção dos 3 formatos do Silo 2 | `.claude/skills/funil-do-zero-comparativos/references/template-comparativo.md` |
| Molde real e testado (copie a estrutura) | `blog/content/ferramentas/201-systeme-io-vs-hotmart.mdx`, `202-alternativa-a-hotmart.mdx`, `203-hotmart-taxas.mdx` |
| Componentes disponíveis e specs visuais | `.claude/skills/funil-do-zero-design-system/references/components.md` |
| Quem linka pra quem no Silo 1 (para tutoriais que citam profissões) | `materiais/estrategia/matriz-links-internos.md` |
| Roadmap completo e critério de priorização | `materiais/estrategia/estrategia-seo-arquitetura-funildozero.md` (§6 Silo 2, §7 Silo 3) |
| O que já foi feito / pendências vivas | `materiais/estrategia/retrofit-pendencias.md` |
| Padrão de frontmatter aceito pelo site | `blog/src/lib/mdx.ts` (`ArticleFrontmatter`, `validateFrontmatter`) |

---

*Este handoff pode ser apagado/arquivado quando o backlog do Silo 2 Onda 1 + Silo 3 Camadas 2–3 estiver completo — nesse ponto, `retrofit-pendencias.md` sozinho já basta como fonte da verdade.*
