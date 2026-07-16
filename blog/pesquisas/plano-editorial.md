# Plano Editorial Programático — Funil do Zero

> **Documento operacional.** Gerado a partir de: `profissoes.ts` (30 profissões),
> `comparativos.ts` (5 rivais) e conteúdo editorial existente em `content/`.
>
> **Como usar:** produzir na ordem dos lotes. Todo artigo segue o contrato de frontmatter
> validado no build (`src/lib/mdx.ts` — validateFrontmatter). Lote publicado = atualizar Status aqui.

---

## Estado atual (16/07/2026)

### Artigos Editoriais Publicados (MDX)

| Status | Silo | URL | Tipo |
|---|---|---|---|
| ✅ | copywriting-vendas | `/copywriting-vendas/o-que-e-copywriting` | Pilar editorial |
| ✅ | copywriting-vendas | `/copywriting-vendas/gatilhos-mentais-para-vendas` | Editorial |
| ✅ | copywriting-vendas | `/copywriting-vendas/como-escrever-pagina-de-vendas` | Editorial |
| ✅ | negocio-digital | `/negocio-digital/o-que-e-marketing-digital` | Pilar editorial |
| ✅ | negocio-digital | `/negocio-digital/como-ser-afiliado-iniciante` | Editorial |
| ✅ | negocio-digital | `/negocio-digital/infoproduto-ou-servico-qual-escolher` | Editorial |
| ✅ | systeme-io | `/systeme-io/como-funciona-a-systeme-io` | Pilar editorial |
| ✅ | systeme-io | `/systeme-io/como-criar-um-blog-na-systeme` | Editorial |
| ✅ | systeme-io | `/systeme-io/como-hospedar-curso-gratis` | Editorial |

### Páginas Programáticas (template fill — MIGRAR para MDX)

| Silo | Quantidade | Status |
|---|---|---|
| funil-de-vendas (profissões) | 30 páginas | ⚠️ Template fill — migração para MDX híbrido |
| ferramentas (comparativos) | 5 páginas | ⚠️ Template fill — migração para MDX híbrido |

**Infra pronta:** templates híbridos (ArticleTemplateFunil + ArticleTemplateComparativo),
rotas com prioridade MDX > programático, validação de frontmatter no build.

---

## Regras Transversais (valem para TODO artigo)

1. **Deep Dive obrigatório:** NENHUM artigo de profissão ou comparativo é escrito sem dossiê em `pesquisas/`. Prompt de pesquisa em `pesquisas/prompt_deep_dive_*.md`.
2. **Publicar em lotes de 3-5/semana** (guardrail anti-Scaled Content Abuse).
3. **FAQ obrigatório:** 3 a 7 perguntas com respostas factuais (build valida).
4. **Links internos:** mínimo 2 links entrando e saindo (pilar + relacionados).
5. **Fontes E-E-A-T:** citar conselho de classe, resoluções e dados verificáveis.
6. **CTA Systeme.io:** contextual e honesto, nunca agressivo. Disclosure de afiliado.
7. **Build verde:** `npm run build` sem erros antes de qualquer deploy.

---

## FASE 1 — Migração Silo 1: Profissões (Prioridade ⭐)

### Bloco 1 — Top 3 (já com tração no GSC) — 3 artigos

| # | URL | Dossiê | Deep Dive | Status MDX |
|---|---|---|---|---|
| P01 | `/funil-de-vendas/medico` | `pesquisas/profissoes/dossie-medico.md` | ⏳ Aguardando | ❌ |
| P02 | `/funil-de-vendas/advogado` | `pesquisas/profissoes/dossie-advogado.md` | ⏳ Aguardando | ❌ |
| P03 | `/funil-de-vendas/dentista` | `pesquisas/profissoes/dossie-dentista.md` | ⏳ Aguardando | ❌ |

### Bloco 2 — Saúde (restante do cluster) — 5 artigos

| # | URL | Dossiê | Deep Dive | Status MDX |
|---|---|---|---|---|
| P04 | `/funil-de-vendas/psicologo` | `pesquisas/profissoes/dossie-psicologo.md` | ❌ | ❌ |
| P05 | `/funil-de-vendas/nutricionista` | `pesquisas/profissoes/dossie-nutricionista.md` | ❌ | ❌ |
| P06 | `/funil-de-vendas/fisioterapeuta` | `pesquisas/profissoes/dossie-fisioterapeuta.md` | ❌ | ❌ |
| P07 | `/funil-de-vendas/veterinario` | `pesquisas/profissoes/dossie-veterinario.md` | ❌ | ❌ |
| P08 | `/funil-de-vendas/terapeuta` | `pesquisas/profissoes/dossie-terapeuta.md` | ❌ | ❌ |
| P09 | `/funil-de-vendas/esteticista` | `pesquisas/profissoes/dossie-esteticista.md` | ❌ | ❌ |

### Bloco 3 — Negócios B2B — 5 artigos

| # | URL | Dossiê | Deep Dive | Status MDX |
|---|---|---|---|---|
| P10 | `/funil-de-vendas/contador` | `pesquisas/profissoes/dossie-contador.md` | ❌ | ❌ |
| P11 | `/funil-de-vendas/arquiteto` | `pesquisas/profissoes/dossie-arquiteto.md` | ❌ | ❌ |
| P12 | `/funil-de-vendas/corretor-de-imoveis` | `pesquisas/profissoes/dossie-corretor.md` | ❌ | ❌ |
| P13 | `/funil-de-vendas/consultor` | `pesquisas/profissoes/dossie-consultor.md` | ❌ | ❌ |
| P14 | `/funil-de-vendas/programador` | `pesquisas/profissoes/dossie-programador.md` | ❌ | ❌ |

### Bloco 4 — Criativo — 8 artigos

| # | URL | Dossiê | Deep Dive | Status MDX |
|---|---|---|---|---|
| P15 | `/funil-de-vendas/fotografo` | `pesquisas/profissoes/dossie-fotografo.md` | ❌ | ❌ |
| P16 | `/funil-de-vendas/videomaker` | `pesquisas/profissoes/dossie-videomaker.md` | ❌ | ❌ |
| P17 | `/funil-de-vendas/designer` | `pesquisas/profissoes/dossie-designer.md` | ❌ | ❌ |
| P18 | `/funil-de-vendas/social-media` | `pesquisas/profissoes/dossie-social-media.md` | ❌ | ❌ |
| P19 | `/funil-de-vendas/copywriter` | `pesquisas/profissoes/dossie-copywriter.md` | ❌ | ❌ |
| P20 | `/funil-de-vendas/podcaster` | `pesquisas/profissoes/dossie-podcaster.md` | ❌ | ❌ |
| P21 | `/funil-de-vendas/youtuber` | `pesquisas/profissoes/dossie-youtuber.md` | ❌ | ❌ |
| P22 | `/funil-de-vendas/piloto-de-drone` | `pesquisas/profissoes/dossie-piloto-drone.md` | ❌ | ❌ |

### Bloco 5 — Estética — 3 artigos

| # | URL | Dossiê | Deep Dive | Status MDX |
|---|---|---|---|---|
| P23 | `/funil-de-vendas/cabeleireiro` | `pesquisas/profissoes/dossie-cabeleireiro.md` | ❌ | ❌ |
| P24 | `/funil-de-vendas/maquiadora` | `pesquisas/profissoes/dossie-maquiadora.md` | ❌ | ❌ |
| P25 | `/funil-de-vendas/tatuador` | `pesquisas/profissoes/dossie-tatuador.md` | ❌ | ❌ |

### Bloco 6 — Educação — 5 artigos

| # | URL | Dossiê | Deep Dive | Status MDX |
|---|---|---|---|---|
| P26 | `/funil-de-vendas/personal-trainer` | `pesquisas/profissoes/dossie-personal.md` | ❌ | ❌ |
| P27 | `/funil-de-vendas/professor` | `pesquisas/profissoes/dossie-professor.md` | ❌ | ❌ |
| P28 | `/funil-de-vendas/coach` | `pesquisas/profissoes/dossie-coach.md` | ❌ | ❌ |
| P29 | `/funil-de-vendas/mentor` | `pesquisas/profissoes/dossie-mentor.md` | ❌ | ❌ |
| P30 | `/funil-de-vendas/palestrante` | `pesquisas/profissoes/dossie-palestrante.md` | ❌ | ❌ |

---

## FASE 2 — Migração Silo 2: Comparativos

| # | URL | Dossiê | Deep Dive | Status MDX |
|---|---|---|---|---|
| C01 | `/ferramentas/systeme-io-vs-hotmart` | `pesquisas/comparativos/dossie-hotmart.md` | ⏳ Aguardando | ❌ |
| C02 | `/ferramentas/systeme-io-vs-kiwify` | `pesquisas/comparativos/dossie-kiwify.md` | ⏳ Aguardando | ❌ |
| C03 | `/ferramentas/systeme-io-vs-greenn` | `pesquisas/comparativos/dossie-greenn.md` | ⏳ Aguardando | ❌ |
| C04 | `/ferramentas/systeme-io-vs-herospark` | `pesquisas/comparativos/dossie-herospark.md` | ⏳ Aguardando | ❌ |
| C05 | `/ferramentas/systeme-io-vs-clickfunnels` | `pesquisas/comparativos/dossie-clickfunnels.md` | ⏳ Aguardando | ❌ |

---

## FASE 3 — Melhorias Técnicas (pós-migração)

- [ ] Schema com `@id` canônicos (Knowledge Graph)
- [ ] Sitemap dinâmico TypeScript (substituir next-sitemap)
- [ ] Componentes MDX ricos: `<RegulacaoBox>`, `<FunnelDiagram>`, `<PricingComparison>`
- [ ] Reescrever pilar `/funil-de-vendas` (hub linkando todos os 30 satélites)
- [ ] Reescrever pilar `/ferramentas` (hub linkando todos os 5 comparativos)

---

## Checklist por Artigo (colar no início de cada produção)

- [ ] Keyword e URL conferidas neste plano (não duplicar/canibalizar)
- [ ] Dossiê de Deep Dive lido (`pesquisas/profissoes/` ou `pesquisas/comparativos/`)
- [ ] Regulamentação do conselho conferida (CFM, OAB, CFO, etc.)
- [ ] Frontmatter completo (`tipo`, `profissao`/`rival`, `faq` 3–7) — o build valida
- [ ] Resposta direta no 1º parágrafo / TL;DR no topo
- [ ] Mínimo 2 links internos entrando e saindo (pilar + relacionados)
- [ ] Fontes E-E-A-T citadas (conselho de classe, resoluções, dados oficiais)
- [ ] CTA Systeme.io contextual + Disclosure de afiliado
- [ ] `npm run build` verde + conferir JSON-LD no HTML
- [ ] Pós-deploy: Rich Results Test na URL + Inspecionar URL no GSC
