import Link from "next/link";

interface TutorialBoxProps {
  /** Slug do tutorial no Silo 3 — monta /systeme-io/{slug}. */
  slug: string;
  /** Título do link (ex: "Como criar sua página de captura na Systeme.io"). */
  titulo: string;
}

/**
 * Oferta de execução discreta em cada sub-etapa do funil descrito no
 * artigo ("como fazer isso na prática") — aponta para o tutorial
 * correspondente do Silo 3. Quieto e útil: NÃO é CTA (proeminência ▓▓▓).
 */
export function TutorialBox({ slug, titulo }: TutorialBoxProps) {
  return (
    <aside className="fz-box fz-box--tut">
      <span className="fz-box__ico" aria-hidden>
        📘
      </span>
      <div>
        <span className="fz-box__kicker fz-box__kicker--muted">Passo a passo</span>
        <Link className="fz-box__link" href={`/systeme-io/${slug}`}>
          {titulo}
        </Link>
      </div>
    </aside>
  );
}
