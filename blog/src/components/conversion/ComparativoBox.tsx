import Link from "next/link";

interface ComparativoBoxProps {
  /** Slug do rival (ex: "hotmart") — monta /ferramentas/systeme-io-vs-{rival}. */
  rival: string;
  /** Título do link (ex: "Systeme.io vs Hotmart"). */
  titulo: string;
  /** Linha de gancho opcional ("veja as taxas lado a lado"). */
  gancho?: string;
}

/**
 * Link contextual para um comparativo do Silo 2 — ancora a objeção
 * "por que Systeme e não a ferramenta X?". Proeminência ▓▓▓▓ (abaixo
 * apenas do CTAGo).
 */
export function ComparativoBox({ rival, titulo, gancho }: ComparativoBoxProps) {
  return (
    <aside className="fz-box fz-box--comp">
      <span className="fz-box__ico" aria-hidden>
        ⚖️
      </span>
      <div>
        <span className="fz-box__kicker">Comparativo</span>
        <Link className="fz-box__link" href={`/ferramentas/systeme-io-vs-${rival}`}>
          {titulo}
        </Link>
        {gancho && <p className="fz-box__hook">{gancho}</p>}
      </div>
    </aside>
  );
}
