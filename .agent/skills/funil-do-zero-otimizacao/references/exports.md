# Referência — Como exportar os dados (GSC e GA4, UI em português)

Envie estas instruções ao usuário quando faltarem arquivos. Os nomes de menu podem variar levemente com atualizações das ferramentas.

## Google Search Console (os 2–3 CSVs principais)

**Páginas (obrigatório):**
1. search.google.com/search-console → propriedade do funildozero.com.br
2. Menu **Desempenho** (resultados da pesquisa)
3. Período: **últimos 3 meses** (padrão do loop trimestral) — anotar o intervalo
4. Ative as 4 métricas (cliques, impressões, CTR, posição) clicando nos cartões
5. Aba **Páginas** → botão **Exportar** (canto superior) → CSV
6. O zip traz vários arquivos — o que importa é `Páginas.csv`

**Consultas (recomendado):** mesma tela, aba **Consultas** → Exportar → `Consultas.csv`

**Período anterior (para decay):** repita o export de Páginas mudando o período para o trimestre ANTERIOR (mesma duração em dias). Renomeie para `Paginas_anterior.csv`.

> Dica: para análise por artigo específico, o filtro "Página" na mesma tela mostra as consultas daquela URL — útil no diagnóstico manual pós-relatório.

## GA4 (páginas + o evento-chave)

**Relatório de páginas:**
1. analytics.google.com → propriedade do site
2. **Relatórios → Engajamento → Páginas e telas**
3. Dimensão: **Caminho da página e classe da tela**
4. Mesmo período do GSC
5. Se possível, adicione a coluna do evento-chave (ver abaixo) ao relatório
6. **Compartilhar/Exportar → Fazer download do arquivo → CSV**
7. O CSV do GA4 vem com linhas de comentário iniciadas em `#` — **não apague, o script ignora sozinho**

**O evento-chave (a métrica que governa tudo — configurar UMA vez):**
O que queremos medir é o clique no link de afiliado. Como o site usa a rota interna `/go/systeme?ref=[slug]`, há dois caminhos:
- **Caminho A (recomendado, sem código):** no GA4, **Administrador → Eventos → Criar evento** → nome `clique_go_systeme` → condição: `page_location` (ou `link_url` do evento `click`) **contém** `/go/systeme`. Depois, **Administrador → Eventos-chave** → marcar `clique_go_systeme` como evento-chave. O parâmetro `ref=` identifica o artigo de origem.
- **Caminho B (mais preciso, com código):** disparar um `gtag('event', 'clique_go_systeme', { ref: slug })` no clique do componente `<CTAGo>` — captura o slug como parâmetro dedicado (relatório por `ref` direto na Exploração).
- Sem nada disso configurado ainda? O relatório roda mesmo assim (sem a coluna de conversão) — mas configurar é a ação nº 1 do próximo ciclo: **sem o evento-chave, o blog não sabe qual artigo paga as contas.**

**Export de conversão detalhado (opcional, para análise fina):**
**Explorar → em branco** → dimensão `Caminho da página` (ou o parâmetro `ref`) × métrica `Eventos-chave` → exportar CSV.

## Convenção de nomes (facilita o comando)
```
Paginas.csv · Consultas.csv · Paginas_anterior.csv · ga4_paginas.csv
```
Comando completo:
```bash
python scripts/analise.py --gsc-pages Paginas.csv --gsc-queries Consultas.csv \
  --gsc-pages-prev Paginas_anterior.csv --ga4-pages ga4_paginas.csv \
  --out relatorio-2026-Q3.md
```
