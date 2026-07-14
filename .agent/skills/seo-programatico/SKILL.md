---
name: seo-programatico
description: Motor de SEO programático do projeto Funil do Zero. Define templates de página, data models, regras de geração em massa com Next.js generateStaticParams, schema markup por tipo, internal linking automation e controle de qualidade. Use SEMPRE que o trabalho envolver geração de páginas em escala, templates programáticos, ou arquitetura de rotas dinâmicas do blog.
---

# Motor de SEO Programático (Funil do Zero)

Esta skill define as regras de arquitetura para a geração em massa de páginas otimizadas para SEO, usando Next.js. O objetivo é dominar milhares de palavras-chave de cauda longa com esforço mínimo de escrita manual, mantendo alta qualidade.

## ⚙️ 1. Arquitetura Base (Next.js 16 `generateStaticParams`)
Todas as páginas programáticas devem ser estáticas no momento da build (SSG via `generateStaticParams`).
- **NÃO USE** `getServerSideProps` ou rotas dinâmicas não cacheadas.
- Use **`export const dynamicParams = false`** para retornar 404 em slugs desconhecidos (evita thin pages).
- ⚠️ **Next.js 16:** `params` é uma **Promise**. Assinatura correta:
  ```tsx
  export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params; // sempre await
  }
  export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
  }
  ```
- O tempo de carregamento deve ser sub-segundo para passar nos Core Web Vitals.

## 💾 2. Ingestão de Dados (`src/data/`)
Os dados que alimentam os templates programáticos não vêm de um banco de dados externo (CMS), mas sim de arquivos estáticos em TypeScript (`.ts`) para máxima performance e controle de versão.
- **`profissoes.ts`**: Alimenta o Silo 1 (`/funil-de-vendas-para-[profissao]`). Contém clusters de dores, iscas digitais ideais e exemplos de funil por nicho.
- **`comparativos.ts`**: Alimenta o Silo 2 (`/systeme-io-vs-[ferramenta]`). Contém os dados dos concorrentes, preços em dólar/real, taxas e desvantagens.
- **`alternativas.ts`**: Alimenta o Silo 2 (`/alternativa-ao-[ferramenta]`). Foca na intenção de quem quer migrar por estar insatisfeito.

## 🧠 3. Rich Snippets e Schema.org (OBRIGATÓRIO)
Toda página gerada programaticamente DEVE ter marcação de Schema.org. ⚠️ `next/head` **não existe** no App Router — use o componente **`<JsonLd data={...} />`** (`src/components/seo/JsonLd.tsx`) com os geradores de `src/lib/schema.ts`. Ver skill **`schema-e-geo`**.
- **FAQPage Schema:** Baseado nas perguntas do Deep Dive 5 (PAA). Isso é inegociável. Cada página deve carregar pelo menos 3 a 5 perguntas frequentes com respostas otimizadas. O FAQ **visível** na página deve espelhar exatamente o schema.
- **Article Schema:** Para o conteúdo principal do template (com `datePublished`/`dateModified`).
- **BreadcrumbList:** Para linkagem interna e navegação.

## 🔗 4. Linkagem Interna Automatizada (Internal Linking)
- Os templates programáticos devem ser "túneis". Nenhuma página pode ser "órfã".
- No final de um artigo comparativo (ex: "Systeme vs Hotmart"), adicione um bloco dinâmico: "Veja também: Alternativa à Eduzz, Alternativa à Kiwify".
- No final de um funil por profissão (ex: "Funil para Advogado"), adicione: "Veja também: Funil para Dentista, Funil para Nutricionista".

## 🚧 5. Controle de Qualidade (Evitando Thin Content)
O Google pune conteúdo programático que parece gerado por robôs (Thin Content). 
- **Regra de Variação de Template:** Não use exatamente o mesmo parágrafo trocando apenas a variável `[Profissão]`. O corpo do texto (MDX ou Componente) deve variar a estrutura com base nos arrays de dados (ex: se a profissão tiver o `cluster` "Saúde", puxe um bloco de texto específico sobre ética médica no marketing).
- Use tabelas comparativas dinâmicas. O Google ama tabelas.
