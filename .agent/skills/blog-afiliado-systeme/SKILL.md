---
name: blog-afiliado-systeme
description: Fonte de verdade do projeto "Funil do Zero" (ou "Primeiro Funil") — blog de review e conteúdo SEO para venda de afiliado da Systeme.io no mercado brasileiro. Contém definição estratégica, arquitetura de silos, mapa de conteúdo, keywords e regras de execução. Use SEMPRE que o trabalho envolver o blog de afiliado, artigos, SEO, domínio ou conteúdo do projeto Systeme.io.
---

> ⚠️ **DEPRECADA (16/07/2026):** substituída pelo novo conjunto de skills `funil-do-zero` (orquestrador) + `funil-do-zero-design-system` + `funil-do-zero-comparativos` + `funil-do-zero-otimizacao` (em `.claude/skills/` e `.agent/skills/`) e pela estratégia consolidada em `materiais/estrategia/`. Consulte-os como fonte da verdade; este arquivo permanece apenas como histórico.

# Projeto Funil do Zero — Mente Coletiva (Fonte da Verdade)

Este documento é a regra máxima (Master Skill) para qualquer IA operando no projeto **Funil do Zero**. Leia-o atentamente antes de fazer qualquer sugestão de arquitetura, copy ou código.

## 🎯 1. Identidade e Objetivo
- **Nome do Projeto:** Funil do Zero (Domínio: funildozero.com.br)
- **Objetivo Único:** Ranqueamento orgânico de longo prazo via SEO (focado em SEO programático) para captação e conversão de leads no **programa de afiliados da Systeme.io** no Brasil.
- **Público-Alvo:** Iniciantes no digital, prestadores de serviço (profissionais liberais/autônomos que precisam vender), infoprodutores insatisfeitos com taxas/preços de concorrentes (Hotmart, Eduzz, Clickfunnels).

## 🏛️ 2. Arquitetura de Conteúdo (Os 5 Silos)
O site não tem silos de "E-mail Marketing" ou "Cursos Online" como raízes (esses assuntos são abordados como sub-funcionalidades dentro dos tutoriais da Systeme.io). Nossos 5 grandes pilares são:

1. **Silo 1: Funil de Vendas (MoFu)** - *Carro-chefe.* Como criar funis para profissões específicas (Ex: `funil-de-vendas-para-advogado`, `para-dentista`, etc). Volume enorme de SEO com zero concorrência focada.
2. **Silo 2: Ferramentas & Comparativos (BoFu)** - *Alta conversão.* Páginas programáticas comparando a Systeme com os grandes players e mostrando as desvantagens de preço/dólar deles (Ex: `systeme-io-vs-hotmart`, `alternativa-ao-clickfunnels`).
3. **Silo 3: Systeme.io (BoFu/Conversão)** - Review honesto, tutoriais específicos da plataforma (Ex: "Como criar email marketing na Systeme", "Como hospedar curso grátis"). Tudo focado em conversão direta.
4. **Silo 4: Negócio Digital do Zero (ToFu)** - *Volume de tráfego.* Topos de funil amplos ("como ser afiliado", "como começar no marketing digital") para puxar a pessoa e empurrá-la para o Silo 1 ou 3.
5. **Silo 5: Copywriting & Vendas (MoFu)** - *Complementar.* Ensinar a escrever copy e criar ofertas, direcionando a pessoa a montar toda a estrutura prática dentro da Systeme.io.

## 🔗 3. Gestão de Links (Regra de Ouro)
- **Link de Afiliado Bruto:** `https://systeme.io/pt?sa=sa0276371570a27983761ac96ef26d1df1514a46c5`
- **PROIBIÇÃO ABSOLUTA:** NENHUM artigo, componente ou CTA do projeto deve exibir ou usar o link bruto. Também é proibido usar bit.ly ou similares.
- **MANDATÓRIO:** Todo link de saída para a plataforma deve ser **`/go/systeme`**. O Next.js (`next.config.ts`) cuidará do redirecionamento 302/307 do servidor.

## 📁 4. Taxonomia e Sistema de Arquivos
Cada artigo deve ter um arquivo isolado e ser salvo seguindo o padrão numérico de indexação: `SiloID` + `Index`.
Exemplos:
- `101-artigo-pilar-funil.mdx` (Artigo 1 do Silo 1)
- `102-funil-para-dentista.mdx` (Artigo 2 do Silo 1)
- `301-review-systeme-io.mdx` (Artigo 1 do Silo 3)

## 💻 5. Stack Tecnológico (O que usar e o que não usar)
- **Framework:** Next.js 16 (App Router). ⚠️ Breaking change: `params` e `searchParams` são **Promise** — sempre `await params`. `useSearchParams()` exige `<Suspense>`. `next/head` NÃO existe no App Router (use metadata API + componente `<JsonLd>`).
- **Conteúdo:** MDX (Markdown estendido com componentes React) para artigos pilares. JSON/TypeScript (`src/data/`) para SEO programático e satélites.
- **Estilo:** Tailwind CSS v4. Sem bibliotecas de componentes inchadas.
- **Deploy e Hospedagem:** Vercel. Imagens otimizadas (CDN) nativamente.

## 🧱 5.1. Fundação já implementada (REUTILIZE, não reinvente)
A base técnica dos templates programáticos já existe. Antes de criar qualquer página nova, reutilize:
- **`src/lib/site.ts`** — constantes do site (`SITE`, `AUTHOR`, `AFFILIATE_DISCLOSURE`, `absoluteUrl`).
- **`src/lib/afiliado.ts`** — `goSysteme(ref)`: única forma de gerar link de afiliado.
- **`src/lib/schema.ts`** — geradores de JSON-LD: `articleSchema`, `faqPageSchema`, `breadcrumbSchema`, `organizationSchema`, `personSchema`.
- **`src/components/seo/JsonLd.tsx`** — injeta structured data com sanitização anti-XSS.
- **`src/components/conversion/AffiliateCTA.tsx`** — CTA em 3 variantes (`topo`/`meio`/`fundo`), sempre com `refId`.
- **`src/components/conversion/TabelaComparativa.tsx`** e **`src/components/tools/CalculadoraTaxa.tsx`**.
- **Templates de referência (padrão-ouro):** `src/app/ferramentas/[slug]/page.tsx` (Silo 2) e `src/app/funil-de-vendas/[profissao]/page.tsx` (Silo 1). Copie a estrutura deles.

> Detalhes de schema e GEO estão na skill **`schema-e-geo`**.

## 🤖 6. Interação do Agente
- Se o usuário pedir para gerar artigos, **sempre consulte** os arrays em `src/data/` (como `profissoes.ts`, `comparativos.ts` etc.) antes para saber o que já está mapeado.
- Adote uma postura de marqueteiro e desenvolvedor Sênior: questione se algo fugir da conversão.

## 📊 7. Analytics e Rastreamento (Fase 1 — Gratuito)
O projeto usa EXCLUSIVAMENTE ferramentas gratuitas do Google + Vercel para analytics. **NÃO construa backend customizado, API de tracking, nem banco de dados para métricas.**
- **Google Analytics 4 (GA4):** Tag global no `layout.tsx` via `next/script`. O ID de medição (`G-XXXXXXX`) será configurado via variável de ambiente `NEXT_PUBLIC_GA_ID`.
- **Google Search Console (GSC):** Verificação via meta tag no `layout.tsx`. O código será via `NEXT_PUBLIC_GSC_VERIFICATION`.
- **Evento de Clique de Afiliado:** Toda vez que o usuário acessar `/go/systeme`, o middleware dispara um evento `affiliate_click` no GA4 antes de redirecionar. Isso substitui qualquer necessidade de banco de dados para contar cliques.
- **Vercel Analytics:** Web Vitals nativos (LCP, FID, CLS).
- **Dashboard:** Looker Studio (gratuito) conectado a GA4 + GSC.

## 🚫 8. Backend (Decisão: ADIADO)
**Decidido em 13/07/2026:** O backend (Supabase, Google Cloud BigQuery, etc.) fica para a **Fase 2**, quando o blog ultrapassar ~5.000 visitas/mês. Até lá, GA4 + GSC cobrem 95% das necessidades de dados. Qualquer agente que sugira adicionar um banco de dados deve ser questionado sobre a real necessidade.
