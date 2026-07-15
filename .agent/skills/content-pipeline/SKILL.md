---
name: content-pipeline
description: Pipeline de produção de conteúdo do Funil do Zero. Define o fluxo completo do keyword research (Deep Dives) até a publicação, distinção entre artigos pilares e satélites programáticos, e a mecânica de atualização. Use SEMPRE que estiver executando o passo a passo de geração de novos artigos.
---

# Workflow e Pipeline de Produção (Funil do Zero)

Esta skill estabelece a linha de montagem de conteúdo do projeto. Toda vez que formos gerar um novo bloco de páginas ou artigos, siga a exata ordem descrita abaixo. NUNCA pule etapas.

## 🏭 O Pipeline de 4 Etapas

### Fase 1: Research e Ingestão (Deep Dives)
O conteúdo nunca é "inventado" ou "alucinado" pela IA de forma genérica.
1. O usuário roda os **Deep Dives** usando prompts validados (como os de `prompt_deep_dive_4.md`).
2. Os dados brutos gerados são copiados pelo usuário para o chat.
3. O Agente ingere e estrutura esses dados, atualizando os arquivos em `src/data/` (ex: `profissoes.ts`, `comparativos.ts`).

### Fase 2: Estruturação dos Dados
Os dados brutos devem ser convertidos em arrays tipados no TypeScript.
- Identifique os "gaps" de conteúdo.
- Extraia a "dor principal".
- Estruture o "Gancho Systeme.io".
- Insira as perguntas do PAA (People Also Ask) no array para gerar os Rich Snippets posteriormente.

### Fase 3: Geração do Conteúdo
Existem duas "fábricas" de conteúdo neste blog. Saiba qual usar:

**Fábrica A: Artigos Pilares (Manuais/Hero)**
- São as raízes dos 5 Silos (ex: "O Guia Definitivo de Funil de Vendas").
- Feitos em arquivos `.mdx`.
- Textos super profundos, +3000 palavras, imagens, vídeos embedados.
- Esritos passo-a-passo, seção por seção, com revisão humana.

**Fábrica B: Artigos Satélites (Programáticos)**
- São as folhas das árvores (ex: "Funil para Dentista", "Alternativa ao Clickfunnels").
- NÃO criamos um arquivo `.mdx` para cada um.
- Eles são gerados dinamicamente pelos templates em `src/app/` (ex: `[profissao]/page.tsx`) lendo os dados de `src/data/`.
- O Agente deve apenas alimentar os dados (`.ts`) e o Next.js constrói as páginas via `generateStaticParams`.

### Fase 4: Post-Build e Deploy
- Após popular os dados ou gerar o MDX, rodar o `next build` localmente para garantir que o SSG gerou todas as rotas programáticas sem erro.
- Atualizar metadados globais se necessário.
- Fazer commit e enviar para a Vercel.

## 📅 Atualização Editorial
O conteúdo gerado programaticamente deve parecer humano. Se após o deploy percebermos que as páginas estão muito repetitivas ("Thin Content"), volte à Fase 2 (Estruturação) e adicione mais variáveis e blocos condicionais de texto nos data files (`.ts`).

## 📚 Referências de Inteligência

Antes de gerar qualquer novo conteúdo, consulte SEMPRE:
- `references/inteligencia-mercado.md` — Dados de mercado, volumes de busca, KD, gaps da concorrência e priorização de silos.
- `pesquisas/seo/` — Arquivos brutos das pesquisas de Deep Dive (ChatGPT, Perplexity, Gemini).

### Dados-Chave de Mercado (Resumo)
- **Mercado BR de infoprodutos:** R$10,6 bi (2025), CAGR 6,5%, +20M compradores.
- **Google orgânico:** 64% dos brasileiros usam como 1ª opção de compra; 63% confiam mais no orgânico que em anúncios.
- **Comissões Systeme.io:** R$570 a R$2.484 por indicação, recorrência vitalícia.
- **GEO 2026:** Artigos comparativos com tabelas de TCO são o formato mais citado por ChatGPT, Gemini e AI Overviews.

### Prompt de Deep Dive Validado
Quando precisar rodar uma nova pesquisa de keywords, use o prompt abaixo (rodar preferencialmente no Perplexity com GPT-4o):

```
Aja como um estrategista de SEO Sênior especializado no mercado brasileiro de marketing digital, infoprodutos e captação de clientes.

O meu objetivo é estruturar o SEO de um blog afiliado que vende as soluções da Systeme.io (plataforma all-in-one). Quero dominar a cauda longa de intenção de compra (Fundo e Meio de Funil).

Faça um "Deep Dive" focado nestes grupos de busca:
[INSERIR TEMAS AQUI]

INSTRUÇÃO DE SAÍDA EXIGIDA:
Retorne o resultado EXCLUSIVAMENTE em um único bloco de código JSON válido:
[
  {
    "silo": "Nome do Grupo",
    "longTailKeywords": ["keyword 1", "keyword 2", "keyword 3", "keyword 4", "keyword 5"],
    "peopleAlsoAsk": [
      { "q": "Pergunta?", "a": "Resposta curta e direta focando em conversão" }
    ],
    "doresPrincipais": ["dor 1", "dor 2"],
    "gapDaConcorrencia": "O que falta na concorrência"
  }
]
```
