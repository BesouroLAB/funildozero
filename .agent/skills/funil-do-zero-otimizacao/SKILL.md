---
name: funil-do-zero-otimizacao
description: "O loop de otimização por dados do blog Funil do Zero — ingere exports do Google Search Console (GSC) e do GA4, roda análise via script Python e devolve o relatório de decisões (fila de refresh, oportunidades 'quase lá' de posição 4–15, reescrita de title/meta quando o CTR está abaixo do esperado, promoção/rebaixamento de tier A/B/C, decay entre períodos e conversão por artigo via /go/systeme?ref=). Use esta skill SEMPRE que o usuário enviar CSVs do Search Console ou do GA4, mencionar métricas do blog (cliques, impressões, CTR, posição, sessões, conversões), pedir 'análise de desempenho', 'o que atualizar', 'revisão de tiers', 'relatório trimestral' ou qualquer decisão editorial baseada em dados — mesmo sem citar a skill pelo nome."
---

# Funil do Zero — Loop de Otimização (GSC + GA4)

Você fecha o ciclo do projeto: a máquina de PRODUZIR conteúdo já existe (dossiês → prompt-mestre → matriz); esta skill é a máquina de APRENDER — transforma exports de GSC/GA4 em decisões editoriais concretas. **Regra nº 1: decisão sem dado é opinião — só recomende o que as tabelas sustentam, e diga quando o dado é insuficiente.**

## O que o usuário te entrega (pedir se faltar)
| Arquivo | De onde | Obrigatório? |
|---|---|---|
| `Páginas.csv` / `Pages.csv` | GSC → Desempenho → aba Páginas → Exportar | ✅ SIM (o mínimo) |
| `Consultas.csv` / `Queries.csv` | GSC → aba Consultas → Exportar | recomendado |
| Export do período ANTERIOR (Páginas) | mesma tela, período comparável anterior | para análise de decay |
| GA4 páginas (`page_path` + sessões/usuários + evento-chave) | GA4 → Relatórios → Páginas e telas → Exportar | para conversão |
| GA4 evento de clique no afiliado | GA4 → evento `click` filtrado por `/go/systeme` (ou evento-chave configurado) | ideal p/ conversão real |

Instruções de export passo a passo (UI em português) em `references/exports.md` — envie ao usuário se ele não souber gerar.

## WORKFLOW (nesta ordem)

### 1) Rodar o script — nunca analisar CSV "no olho"
```bash
python scripts/analise.py --gsc-pages CAMINHO.csv \
  [--gsc-queries CAMINHO.csv] [--gsc-pages-prev CAMINHO.csv] \
  [--ga4-pages CAMINHO.csv] [--out relatorio.md]
```
O script normaliza colunas PT/EN, pula os cabeçalhos de comentário do GA4 (linhas `#`), cruza GSC×GA4 por URL/slug e emite `relatorio.md` com as tabelas de decisão. Se um CSV vier em formato inesperado, o script lista as colunas que encontrou — ajuste o mapeamento com `--map` (ver `--help`) em vez de editar o CSV.

### 2) Interpretar com os limiares do projeto
Os limiares padrão (ajustáveis por flag) estão definidos e justificados em `references/metricas.md`. Resumo:
- **Quase lá:** posição média 4–15 **e** impressões ≥ p50 do site → refresh on-page + 2–3 links internos entrantes (consultar a matriz).
- **CTR-gap:** CTR < 60% do esperado para a posição (curva de referência no script) **e** impressões relevantes → reescrever title/meta (o conserto mais barato do SEO).
- **Decay:** queda ≥25% de cliques vs. período anterior com posição estável ou pior → fila de refresh prioritária (conteúdo envelheceu — checar os itens "confirmar ao publicar" do dossiê!).
- **Tier:** promover C→B/B→A quando cliques + conversão sustentam por 2 períodos; rebaixar investimento quando impressões ~0 após 6+ meses indexado. Tier NUNCA muda com 1 leitura.
- **Conversão:** cliques em `/go/systeme?ref=` (ou evento-chave GA4) por artigo → os vencedores ganham +links entrantes e prioridade de atualização; MoFu com tráfego alto e conversão zero → revisar CTAs/componentes, não o texto inteiro.

### 3) Entregar o relatório de decisões (formato fixo)
O script gera as tabelas; você escreve o veredito executivo em cima delas:
1. **Resumo executivo** (5–8 linhas: o estado do site em 1 parágrafo + as 3 ações de maior alavanca);
2. **Fila de ação priorizada** (tabela: ação · URL · motivo/dado · esforço estimado) — máx. 10 itens, ordenados por impacto÷esforço;
3. As tabelas do script (quase-lá, CTR-gap, decay, conversão, tiers) com 1–2 linhas de leitura cada;
4. **O que NÃO fazer ainda** (dados insuficientes — ex.: artigo com 3 semanas de índice não entra em decisão);
5. Pendências para o próximo ciclo (o que instrumentar/exportar melhor).

### 4) Fechar o loop com os outros ativos
- Refresh de artigo → volta pelo **prompt-mestre** (modo atualização: manter URL, atualizar dados/ano, reforçar answer-first) — nunca reescrever do zero o que rankeia.
- Links entrantes novos → registrar na planilha de retrofit da **matriz**.
- Mudança de tier → atualizar o frontmatter `tier:` e a tabela da **estratégia**.
- Query nova com impressão relevante sem página → é PAUTA: propor no content gap do silo certo.

## Regras de honestidade estatística (inegociável)
- Volumes pequenos mentem: **não conclua nada com <100 impressões ou <10 cliques** no período — marque como "observar".
- Posição média do GSC é média ponderada por impressão — picos de query irrelevante distorcem; quando estranho, cruzar com a aba Consultas.
- Correlação ≠ causa: "caiu depois do refresh" precisa de contexto (sazonalidade do nicho! — dezembro derruba B2B e sobe fitness; consultar a sazonalidade do dossiê antes de culpar o conteúdo).
- SGE reduz CTR sem reduzir valor (citação sem clique) — quedas de CTR com posição estável em queries informacionais podem ser AI Overview, não fracasso; sinalizar em vez de "consertar".

## Referências e script
- `scripts/analise.py` — o analisador (GSC PT/EN + GA4; saída em Markdown). Rode `--help` para flags.
- `references/metricas.md` — definição e justificativa de cada limiar; a curva CTR×posição; regras de tier.
- `references/exports.md` — passo a passo de exportação no GSC e GA4 (UI PT-BR) para enviar ao usuário.
