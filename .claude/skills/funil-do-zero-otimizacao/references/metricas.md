# Referência — Métricas, Limiares e Regras de Decisão

Por que cada limiar do `analise.py` é o que é — e como interpretar sem se enganar.

## Os pisos de significância (por que 100/10)
- **100 impressões / 10 cliques** no período: abaixo disso, CTR e posição são ruído (1 clique a mais muda tudo). URLs abaixo do piso vão para "observar" — nunca para decisão. Flags: `--min-impr`, `--min-clicks`.
- Artigos com **<6 semanas de índice** não entram em NENHUMA análise (o Google ainda está testando posições) — filtrar manualmente pela data de publicação.

## A) "Quase lá" (posição 4–15 + impressões ≥ mediana do site)
- **Por quê:** é a zona onde pequenos empurrões (refresh de conteúdo + 2–3 links internos entrantes) movem posições — de 18→12 ninguém percebe; de 8→4 o tráfego multiplica.
- **Ação padrão:** (1) refresh via prompt-mestre (dados/ano atualizados, answer-first reforçado, seção nova se a aba Consultas mostrar subtema); (2) consultar a MATRIZ e apontar 2–3 links novos de artigos-irmãos/hubs para a URL; (3) reavaliar no próximo ciclo.

## B) CTR-gap (<60% do esperado para a posição)
- **A curva de referência** (aproximação de mercado, embutida no script): pos 1 ≈ 28% · 3 ≈ 10% · 5 ≈ 5,5% · 10 ≈ 2,5% · 15 ≈ 1,5%. É régua relativa, não verdade absoluta — serve para COMPARAR suas URLs entre si.
- **Leitura:** posição boa + CTR ruim = problema de VITRINE (title/meta), não de conteúdo. O conserto mais barato do SEO.
- **Ação:** reescrever title (≤60c, keyword + gancho da dor) e meta (140–160c) — e só. Não mexer no corpo.
- **Exceção SGE:** query informacional com posição estável e CTR caindo no TEMPO pode ser AI Overview roubando o clique — verificar a SERP manualmente antes de "consertar"; se for SGE, a resposta é reforçar o bloco citável (dados+fonte), não o title.

## C) Decay (queda ≥25% de cliques vs. período anterior)
- **Comparar períodos comparáveis** (mesmo nº de dias; atenção a sazonalidade — usar o calendário dos dossiês: dezembro derruba B2B e sobe fitness/beleza; julho derruba escolar).
- **Diagnóstico em ordem:** (1) sazonalidade do nicho? → esperar; (2) posição caiu? → concorrente novo/conteúdo envelhecido → refresh prioritário + checar os itens "confirmar ao publicar" do dossiê (norma que mudou é decay na certa); (3) posição estável e CTR caiu? → ver exceção SGE acima.

## D) Conversão (GA4: evento-chave por página)
- **O evento que importa:** clique em `/go/systeme?ref=` (configurar como evento-chave no GA4 — ver exports.md). `tx_conv` = eventos-chave ÷ sessões.
- **Benchmarks internos esperados:** Silo 2 (BoFu) converte 5–15%; Silo 1 (MoFu) 0,5–3%; Silo 4 (ToFu) <0,5%. Comparar página com o PRÓPRIO silo, nunca entre silos.
- **Ações:** vencedor de conversão → +links entrantes (matriz) + prioridade de atualização + replicar o padrão de CTA nas irmãs; tráfego alto + conversão ~0 no MoFu → auditar componentes (CTAGo presente? ComparativoBox certo pra persona?) antes de tocar no texto.

## E) Tier (promover/rebaixar A·B·C)
- **Promover C→B ou B→A:** cliques no top 20% do site **e** conversão ≥ mediana do silo, sustentados por **2 ciclos consecutivos** → expandir o artigo para a profundidade do novo tier (via prompt-mestre) e atualizar `tier:` no frontmatter + tabela da estratégia.
- **Rebaixar investimento** (não deletar!): impressões ~0 após 6+ meses indexado → sem refresh programado; manter no ar (cauda longa custa zero) e revisar a keyword-alvo.
- **Nunca decidir tier com 1 leitura** — tier é decisão estrutural; dado de 1 período é foto, não filme.

## F) Consultas → pautas (impressões ≥ piso + posição >15)
- Demanda real que o site não atende bem. Decidir: (a) **seção nova** num artigo existente (se a query é subtema de URL que já rankeia) ou (b) **pauta nova** no silo certo (registrar no content gap da estratégia). Ex. clássico do teste: "alternativa hotmart sem taxa" posição 22 → a página `alternativa-a-hotmart` do Silo 2 é a resposta.

## Cadência do loop
- **Mensal (15 min):** rodar o script, olhar decay e conversão — só apaga incêndio.
- **Trimestral (a sessão real):** análise completa + fila de 10 ações + revisão de tiers + pautas novas.
- Guardar os relatórios (`relatorio-AAAA-MM.md`) — a série histórica é o que valida as decisões de tier.
