#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Funil do Zero — Analisador GSC + GA4
Ingere exports do Search Console (Páginas/Consultas, PT ou EN) e do GA4
(Relatório de páginas; opcionalmente evento-chave/cliques em /go/systeme)
e emite um relatório de decisões em Markdown.

Uso mínimo:
  python analise.py --gsc-pages Paginas.csv

Completo:
  python analise.py --gsc-pages Paginas.csv --gsc-queries Consultas.csv \
      --gsc-pages-prev Paginas_anterior.csv --ga4-pages ga4.csv \
      --out relatorio.md

Sem dependências além de pandas (pip install pandas).
"""
import argparse, csv, io, re, sys, unicodedata
from pathlib import Path

try:
    import pandas as pd
except ImportError:
    sys.exit("Instale pandas: pip install pandas --break-system-packages")

# ---------------------------------------------------------------- helpers
def norm(s: str) -> str:
    s = unicodedata.normalize("NFKD", str(s)).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "", s.lower())

# Mapeamento de colunas GSC (PT/EN) -> canônico
GSC_MAP = {
    "page": ["principaispaginas", "paginas", "pagina", "toppages", "pages", "page", "url"],
    "query": ["principaisconsultas", "consultas", "consulta", "topqueries", "queries", "query"],
    "clicks": ["cliques", "clicks"],
    "impressions": ["impressoes", "impressions"],
    "ctr": ["ctr"],
    "position": ["posicao", "posicaomedia", "position", "avgposition", "averageposition"],
}
# GA4 -> canônico
GA4_MAP = {
    "page": ["caminhodapaginaeclassedatela", "caminhodapagina", "pagepathandscreenclass",
             "pagepath", "paginadedestino", "landingpage", "landingpagequerystring"],
    "sessions": ["sessoes", "sessions"],
    "users": ["usuarios", "totaldeusuarios", "users", "totalusers", "activeusers", "usuariosativos"],
    "views": ["visualizacoes", "views", "pageviews", "visualizacoesdepagina"],
    "key_events": ["eventosprincipais", "keyevents", "conversoes", "conversions",
                   "contagemdeeventos", "eventcount", "cliquesgosysteme"],
}

def read_csv_flex(path: str) -> pd.DataFrame:
    """Lê CSV pulando comentários '#' do GA4, detectando separador e encoding.
    dtype=str: o parse numérico é nosso (evita o pandas ler '4.500' PT como 4.5)."""
    raw = Path(path).read_bytes()
    for enc in ("utf-8-sig", "utf-8", "latin-1"):
        try:
            text = raw.decode(enc); break
        except UnicodeDecodeError:
            continue
    lines = [l for l in text.splitlines() if not l.lstrip().startswith("#") and l.strip()]
    if not lines:
        sys.exit(f"[erro] {path}: arquivo vazio após remover comentários.")
    try:
        sep = csv.Sniffer().sniff(lines[0], delimiters=",;\t").delimiter
    except csv.Error:
        sep = ","
    return pd.read_csv(io.StringIO("\n".join(lines)), sep=sep, dtype=str)

def to_count(series: pd.Series) -> pd.Series:
    """Contagens (cliques/impressões/sessões): remove separadores de milhar."""
    return (series.astype(str).str.replace(r"[^\d]", "", regex=True)
            .replace("", "0").astype(float))

def to_decimal(series: pd.Series) -> pd.Series:
    """Decimais (CTR/posição): '7,11%'→7.11 · '5.2'→5.2 · '1.234,5'→1234.5."""
    s = series.astype(str).str.replace("%", "", regex=False).str.strip()
    both = s.str.contains(",") & s.str.contains(r"\.")
    s = s.where(~both, s.str.replace(".", "", regex=False))
    s = s.str.replace(",", ".", regex=False)
    return pd.to_numeric(s.str.extract(r"(-?[\d.]+)")[0], errors="coerce")

def canonize(df: pd.DataFrame, mapping: dict, label: str) -> pd.DataFrame:
    cols = {norm(c): c for c in df.columns}
    out, found = {}, []
    for canon, aliases in mapping.items():
        for a in aliases:
            if a in cols:
                out[canon] = df[cols[a]]; found.append(canon); break
    if "page" not in out and "query" not in out:
        print(f"[aviso] {label}: não reconheci colunas. Encontrei: {list(df.columns)}", file=sys.stderr)
    res = pd.DataFrame(out)
    for c in ("clicks", "impressions", "sessions", "users", "views", "key_events"):
        if c in res:
            res[c] = to_count(res[c])
    for c in ("ctr", "position"):
        if c in res:
            res[c] = to_decimal(res[c])
    if "ctr" in res and res["ctr"].max() and res["ctr"].max() > 1:
        res["ctr"] = res["ctr"] / 100.0
    if "page" in res:
        res["slug"] = (res["page"].astype(str).str.replace(r"^https?://[^/]+", "", regex=True)
                       .str.split("?").str[0].str.rstrip("/").replace("", "/"))
    return res

# Curva CTR esperado × posição (referência de mercado, aproximada)
CTR_CURVE = {1: .28, 2: .15, 3: .10, 4: .07, 5: .055, 6: .045, 7: .038,
             8: .032, 9: .028, 10: .025, 15: .015, 20: .01}
def expected_ctr(pos: float) -> float:
    if pd.isna(pos): return float("nan")
    keys = sorted(CTR_CURVE)
    if pos <= keys[0]: return CTR_CURVE[keys[0]]
    if pos >= keys[-1]: return CTR_CURVE[keys[-1]]
    for a, b in zip(keys, keys[1:]):
        if a <= pos <= b:
            f = (pos - a) / (b - a)
            return CTR_CURVE[a] + f * (CTR_CURVE[b] - CTR_CURVE[a])
    return float("nan")

def md_table(df: pd.DataFrame, cols: list, n: int = 15) -> str:
    if df.empty: return "_sem itens com dados suficientes_\n"
    d = df.head(n)[cols].copy()
    for c in d.columns:
        if d[c].dtype == float:
            pct = any(k in c for k in ("ctr", "gap", "delta", "tx_"))
            d[c] = d[c].map(lambda v, p=pct: ("—" if pd.isna(v) else
                            f"{v:.1%}" if p else
                            (f"{v:.1f}" if c in ("position", "position_prev", "pos") else
                             f"{v:,.0f}".replace(",", "."))))
    header = "| " + " | ".join(d.columns) + " |"
    sep = "|" + "---|" * len(d.columns)
    rows = ["| " + " | ".join(str(x) for x in r) + " |" for r in d.values]
    return "\n".join([header, sep, *rows]) + "\n"

# ---------------------------------------------------------------- análise
def main():
    ap = argparse.ArgumentParser(description="Analisador GSC+GA4 do Funil do Zero")
    ap.add_argument("--gsc-pages", required=True)
    ap.add_argument("--gsc-queries")
    ap.add_argument("--gsc-pages-prev", help="mesmo export, período anterior (decay)")
    ap.add_argument("--ga4-pages", help="GA4: páginas com sessões/usuários/evento-chave")
    ap.add_argument("--min-impr", type=int, default=100, help="piso de impressões p/ decisão (padrão 100)")
    ap.add_argument("--min-clicks", type=int, default=10, help="piso de cliques p/ decisão (padrão 10)")
    ap.add_argument("--decay-drop", type=float, default=0.25, help="queda mínima p/ decay (padrão 0.25)")
    ap.add_argument("--out", default="relatorio.md")
    args = ap.parse_args()

    pages = canonize(read_csv_flex(args.gsc_pages), GSC_MAP, "GSC Páginas")
    if "page" not in pages:
        sys.exit("[erro] O CSV de páginas do GSC precisa da coluna de URL (Principais páginas / Top pages).")
    pages = pages.groupby("slug", as_index=False).agg(
        clicks=("clicks", "sum"), impressions=("impressions", "sum"),
        position=("position", "mean"))
    pages["ctr"] = pages["clicks"] / pages["impressions"].replace(0, float("nan"))
    p50_impr = pages["impressions"].median()

    suficiente = (pages["impressions"] >= args.min_impr)

    # A) Quase lá
    quase = pages[suficiente & pages["position"].between(4, 15) &
                  (pages["impressions"] >= p50_impr)].copy()
    quase = quase.sort_values("impressions", ascending=False)

    # B) CTR-gap
    pages["ctr_esperado"] = pages["position"].map(expected_ctr)
    pages["ctr_gap"] = pages["ctr"] / pages["ctr_esperado"]
    ctrgap = pages[suficiente & (pages["clicks"] >= args.min_clicks) &
                   (pages["ctr_gap"] < 0.6)].sort_values("impressions", ascending=False).copy()

    # C) Decay (se houver período anterior)
    decay = pd.DataFrame()
    if args.gsc_pages_prev:
        prev = canonize(read_csv_flex(args.gsc_pages_prev), GSC_MAP, "GSC Páginas (anterior)")
        prev = prev.groupby("slug", as_index=False).agg(
            clicks_prev=("clicks", "sum"), position_prev=("position", "mean"))
        m = pages.merge(prev, on="slug", how="inner")
        m["delta_clicks"] = (m["clicks"] - m["clicks_prev"]) / m["clicks_prev"].replace(0, float("nan"))
        decay = m[(m["clicks_prev"] >= args.min_clicks) &
                  (m["delta_clicks"] <= -args.decay_drop)].sort_values("delta_clicks").copy()

    # D) Conversão (GA4)
    conv = pd.DataFrame()
    if args.ga4_pages:
        ga = canonize(read_csv_flex(args.ga4_pages), GA4_MAP, "GA4 Páginas")
        if "slug" in ga:
            agg = {c: (c, "sum") for c in ("sessions", "users", "views", "key_events") if c in ga}
            ga = ga.groupby("slug", as_index=False).agg(**agg)
            conv = pages.merge(ga, on="slug", how="left")
            if "key_events" in conv and "sessions" in conv:
                conv["tx_conv"] = conv["key_events"] / conv["sessions"].replace(0, float("nan"))
            conv = conv.sort_values(conv.columns.intersection(
                ["key_events", "sessions"]).tolist(), ascending=False)

    # E) Sinais de tier
    tier_up = pages[suficiente & (pages["clicks"] >= pages["clicks"].quantile(0.8))].copy()
    tier_watch = pages[(pages["impressions"] < args.min_impr)].copy()

    # F) Consultas → pautas novas (impressão alta, posição fraca = demanda sem página forte)
    pautas = pd.DataFrame()
    if args.gsc_queries:
        q = canonize(read_csv_flex(args.gsc_queries), GSC_MAP, "GSC Consultas")
        if "query" in q:
            pautas = q[(q["impressions"] >= args.min_impr) &
                       (q["position"] > 15)].sort_values("impressions", ascending=False).copy()

    # ------------------------------------------------------------ relatório
    L = []
    L.append("# Relatório de Otimização — Funil do Zero\n")
    L.append(f"Base: `{args.gsc_pages}`"
             + (f" · anterior: `{args.gsc_pages_prev}`" if args.gsc_pages_prev else "")
             + (f" · GA4: `{args.ga4_pages}`" if args.ga4_pages else "") + "\n")
    L.append(f"**Visão geral:** {len(pages)} URLs · {pages['clicks'].sum():,.0f} cliques · "
             f"{pages['impressions'].sum():,.0f} impressões · CTR médio "
             f"{(pages['clicks'].sum()/max(pages['impressions'].sum(),1)):.1%} · "
             f"posição média {pages['position'].mean():.1f}\n".replace(",", "."))
    L.append(f"_Pisos de decisão: {args.min_impr} impressões / {args.min_clicks} cliques. "
             f"URLs abaixo disso vão para 'observar', não para ação._\n")

    L.append("\n## A) Quase lá (posição 4–15, impressões ≥ mediana) → refresh + links entrantes\n")
    L.append(md_table(quase, ["slug", "clicks", "impressions", "position", "ctr"]))

    L.append("\n## B) CTR abaixo do esperado (<60% da curva) → reescrever title/meta\n")
    L.append(md_table(ctrgap, ["slug", "impressions", "position", "ctr", "ctr_esperado", "ctr_gap"]))

    L.append("\n## C) Decay vs. período anterior → fila prioritária de refresh\n")
    if args.gsc_pages_prev:
        L.append(md_table(decay, ["slug", "clicks_prev", "clicks", "delta_clicks", "position"]))
    else:
        L.append("_forneça `--gsc-pages-prev` para habilitar._\n")

    L.append("\n## D) Conversão por página (GA4) → onde dobrar a aposta\n")
    if not conv.empty:
        cols = [c for c in ["slug", "clicks", "sessions", "key_events", "tx_conv"] if c in conv.columns]
        L.append(md_table(conv, cols))
        L.append("_`key_events` = evento-chave configurado (idealmente clique em /go/systeme)._\n")
    else:
        L.append("_forneça `--ga4-pages` para habilitar._\n")

    L.append("\n## E) Sinais de tier (exigem 2 períodos p/ decisão)\n")
    L.append("**Candidatas a promoção (top 20% de cliques):**\n\n")
    L.append(md_table(tier_up.sort_values("clicks", ascending=False),
                      ["slug", "clicks", "impressions", "position"]))
    L.append(f"\n**Observar (impressões < {args.min_impr} — sem decisão):** "
             f"{len(tier_watch)} URLs.\n")

    L.append("\n## F) Consultas com demanda sem página forte (posição >15) → pautas/refresh\n")
    if args.gsc_queries:
        if not pautas.empty:
            L.append(md_table(pautas, ["query", "clicks", "impressions", "position"]))
            L.append("_Leitura: impressão alta + posição fraca = demanda real que o site "
                     "não atende bem — candidata a pauta nova ou a seção nova em artigo existente._\n")
        else:
            L.append("_nenhuma consulta acima dos pisos com posição >15._\n")
    else:
        L.append("_forneça `--gsc-queries` para habilitar._\n")

    Path(args.out).write_text("\n".join(L), encoding="utf-8")
    print(f"✅ Relatório gerado: {args.out}")
    print(f"   Quase-lá: {len(quase)} · CTR-gap: {len(ctrgap)} · "
          f"Decay: {len(decay)} · Pautas: {len(pautas)} · Observar: {len(tier_watch)}")

if __name__ == "__main__":
    main()
