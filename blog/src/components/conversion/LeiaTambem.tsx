import Link from "next/link";

interface ArtigoRelacionado {
  titulo: string;
  /** Slug no Silo 1 — monta /funil-de-vendas/{slug} quando não há href. */
  slug?: string;
  /** Destino explícito para links cross-silo (tem precedência sobre slug). */
  href?: string;
}

interface LeiaTambemProps {
  artigos?: ArtigoRelacionado[];
}

/**
 * Bloco de fim de artigo com 2–4 relacionados do mesmo cluster (ou
 * cross-silo via href). Reforça o ecossistema e os nós isolados da matriz.
 */
export function LeiaTambem({ artigos = [] }: LeiaTambemProps) {
  return (
    <nav className="fz-leia" aria-label="Leia também">
      <h3 className="fz-leia__title">Leia também</h3>
      <ul className="fz-leia__list">
        {artigos.map((a) => {
          const href = a.href ?? `/funil-de-vendas/${a.slug}`;
          return (
            <li key={href}>
              <Link href={href}>{a.titulo}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
