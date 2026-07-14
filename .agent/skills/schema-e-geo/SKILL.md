---
name: schema-e-geo
description: Fonte de verdade de structured data (Schema.org / JSON-LD) e GEO (otimização para respostas de IA) do projeto Funil do Zero. Define quais schemas usar por tipo de página, como injetá-los no Next.js 16 e o checklist para ser citado por ChatGPT, Claude, Perplexity e Gemini. Use SEMPRE que criar/editar páginas, schema markup, metadata ou conteúdo que precise ranquear e ser citado por IA.
---

# Schema.org + GEO (Funil do Zero)

Esta skill garante dois objetivos: (1) ganhar **rich snippets** no Google e (2) ser **citado pelas IAs** (GEO — Generative Engine Optimization). As duas coisas se reforçam: conteúdo estruturado, datado e extraível vence nos dois canais.

## 🧩 1. Como injetar JSON-LD (Next.js 16)
- `next/head` **não existe** no App Router. Use o componente **`<JsonLd data={...} />`** (`src/components/seo/JsonLd.tsx`), que serializa e sanitiza (`<` → `<`).
- Os objetos vêm dos geradores tipados em **`src/lib/schema.ts`**. Nunca escreva JSON-LD à mão.
- Passe um **array** de schemas para renderizar vários blocos de uma vez.

```tsx
import { JsonLd } from "@/components/seo/JsonLd";
import { articleSchema, faqPageSchema, breadcrumbSchema } from "@/lib/schema";

<JsonLd data={[
  breadcrumbSchema([{ name: "Início", url: "/" }, { name: "Título", url }]),
  articleSchema({ headline, description, url, datePublished, dateModified }),
  faqPageSchema(faq),
]} />
```

## 📐 2. Qual schema por tipo de página
| Tipo de página | Schemas obrigatórios |
|---|---|
| Programática (Silo 1 e 2) | `Article` + `FAQPage` + `BreadcrumbList` |
| Ferramenta / lead magnet | `Article` + `FAQPage` + `BreadcrumbList` |
| Institucional (`/sobre`) | `Organization` + `BreadcrumbList` |
| Autoria (`/autor`) | `Person` + `BreadcrumbList` |
| Layout raiz | `metadataBase` + `Organization`/`WebSite` (opcional) |

- **FAQPage é inegociável** em toda página de conteúdo (3–5 perguntas). O FAQ **visível** deve espelhar exatamente o schema — o Google penaliza divergência.
- `Article` sempre com `datePublished` e `dateModified` (freshness).

## 🤖 3. Checklist GEO (ser citado por IA)
A IA cita conteúdo claro, autoritativo e fácil de extrair. Em toda página:
- [ ] **TL;DR / "Resumo rápido"** no topo, com a resposta direta (bloco extraível).
- [ ] **Dado original e específico** (ex: "R$ 1.090/mês em taxas") — números citáveis vencem texto vago. Use a Calculadora de Taxa de Guru como fonte.
- [ ] **Tabelas comparativas** (`<TabelaComparativa>`) — estrutura que a IA extrai fácil.
- [ ] **FAQ** com perguntas em linguagem natural (como o usuário pergunta à IA).
- [ ] **Data de atualização visível** + `dateModified` no schema.
- [ ] **E-E-A-T:** autor (`Person` em `/autor`), página `/sobre`, divulgação de afiliado. Sinaliza confiança para IA e Google.
- [ ] **Definições claras** de termos ("O que é X?") — fáceis de extrair como resposta.

## 🕷️ 4. Acesso de crawlers de IA
- `robots.txt` deve **permitir** GPTBot, ClaudeBot, PerplexityBot, Google-Extended (queremos ser citados). Hoje está `Allow: /` para todos — mantenha.
- Não bloqueie crawler de IA sem uma razão de negócio explícita.

## 🚫 5. Anti-padrões
| ❌ Não faça | ✅ Faça |
|---|---|
| Publicar sem data | `datePublished`/`dateModified` |
| FAQ no schema mas não na página (ou vice-versa) | FAQ visível espelhando o schema |
| Atribuição vaga ("especialistas dizem") | Fonte nomeada / dado próprio |
| JSON-LD escrito à mão | Geradores de `src/lib/schema.ts` |
| `next/head` | `<JsonLd>` + metadata API |

## ✅ 6. Validação
Após o build, valide o structured data:
- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema Markup Validator: https://validator.schema.org/
- Cheque no HTML gerado: `grep '"@type"' .next/server/app/<rota>.html`
