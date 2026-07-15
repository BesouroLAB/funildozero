# Funil do Zero — Fase 1 (Implementação da Fundação)

**Status:** ✅ Concluída · **Data:** 2026-07-13 · **Build:** verde, 45 páginas estáticas.

Objetivo da Fase 1: montar a fundação técnica do blog de afiliado (SEO programático, rich snippets, GEO, E-E-A-T e conversão) sobre Next.js 16, usando apenas ferramentas gratuitas (Google + Vercel). Backend fica para a Fase 2.

---

## O que foi entregue

### Arquitetura e silos
- [x] 5 silos alinhados à skill `blog-afiliado-systeme`: `/funil-de-vendas`, `/ferramentas`, `/systeme-io`, `/negocio-digital`, `/copywriting-vendas`.
- [x] Rotas antigas incorretas removidas (`/email-marketing`, `/curso-online`, `/afiliados`).
- [x] Fundação reutilizável: `lib/site.ts`, `lib/schema.ts`, `lib/afiliado.ts`, `components/seo/JsonLd`, `components/conversion/*`, `components/tools/*`, `components/layout/Footer`.

### SEO programático
- [x] Template padrão-ouro Silo 2: `ferramentas/[slug]` (3 comparativos) — SSG + `dynamicParams=false`.
- [x] Template Silo 1: `funil-de-vendas/[profissao]` — **30 profissões** em 5 clusters, populadas da pesquisa.
- [x] Linkagem interna automática ("Veja também" por cluster / comparativos) — sem páginas órfãs.
- [x] Variação de template por cluster (anti-thin-content).

### Rich snippets (Schema.org)
- [x] `Article` + `FAQPage` + `BreadcrumbList` em toda página programática e de ferramenta.
- [x] `Organization` (`/sobre`), `Person` (`/autor`).
- [x] Geradores tipados em `lib/schema.ts`; injeção via `<JsonLd>` com sanitização anti-XSS.
- [x] `metadataBase` + canonical + OpenGraph por página.

### GEO (vencer a resposta da IA)
- [x] TL;DR extraível no topo de cada página de conteúdo.
- [x] Dado original e citável: **Calculadora de Taxa de Guru** (ex: R$ 10k/mês → R$ 13.080/ano na Hotmart).
- [x] Datas de atualização (`dateModified`) + FAQ em linguagem natural.
- [x] `robots.txt` liberado para crawlers de IA.
- [x] Skill `schema-e-geo` criada como fonte de verdade.

### Monetização / conversão
- [x] `<AffiliateCTA>` em 3 níveis, sempre via `/go/systeme?ref=` (nunca link bruto).
- [x] Convenção de `refId` padronizada e rastreável no GA4.
- [x] Redirect 307 + evento `affiliate_click` (bug de `<Suspense>` corrigido).

### E-E-A-T
- [x] `/sobre` (missão + metodologia), `/autor` (Person schema), rodapé global.
- [x] Divulgação de afiliado em todas as páginas.

### Analytics (Fase 1 — gratuito)
- [x] GA4 + GSC via env vars no `layout.tsx`. (Preencher `NEXT_PUBLIC_GA_ID` e `NEXT_PUBLIC_GSC_VERIFICATION` no deploy.)

### Skills
- [x] Next.js 15 → 16 corrigido (`blog-afiliado-systeme`, `seo-programatico`).
- [x] Convenção de CTA/`refId` documentada (`copy-afiliado`).
- [x] Skill `schema-e-geo` criada.

### Higiene
- [x] `package-lock.json` da raiz (vestigial) removido; lockfile do `blog/` preservado.

---

## Pendências para a Fase 2
- [ ] **Backend** (Supabase/BigQuery) — só após ~5.000 visitas/mês (decisão da skill).
- [ ] **Autor real:** substituir `AUTHOR` em `lib/site.ts` por pessoa nomeada, com foto e credenciais.
- [ ] **Artigos-pilar em MDX** (Fábrica A) para as raízes dos 5 silos (+3000 palavras).
- [ ] **Popular mais dados:** expandir `comparativos.ts`/`alternativas.ts`; criar rota de alternativas.
- [ ] **Home** (`/`) ainda é "Hello world" — construir hub que distribui para os silos.
- [ ] **OG images** dinâmicas e favicon/logo em `/public`.
- [ ] Configurar GA4/GSC reais e validar structured data no Rich Results Test.

---

## Como verificar
```bash
cd blog && npx next build          # deve gerar 45+ páginas, sem erro
grep '"@type"' .next/server/app/ferramentas/systeme-io-vs-hotmart.html   # confere schema
```
