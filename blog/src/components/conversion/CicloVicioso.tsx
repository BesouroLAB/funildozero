import { Fragment } from "react";

interface CicloViciosoProps {
  /** As etapas do ciclo, na ordem (viram a cadeia com setas). */
  etapas: string[];
  /** Linha opcional "como o funil quebra isso". */
  quebra?: string;
}

/**
 * Box do Ciclo Vicioso (estilo-assinatura do projeto): o fluxo em setas
 * que nomeia a armadilha da captação — o momento de maior identificação
 * do artigo — e prepara a virada para o funil.
 */
export function CicloVicioso({ etapas, quebra }: CicloViciosoProps) {
  return (
    <aside className="fz-ciclo" aria-label="O ciclo vicioso da captação">
      <span className="fz-ciclo__kicker">O ciclo vicioso</span>
      <p className="fz-ciclo__flow">
        {etapas.map((e, i) => (
          <Fragment key={i}>
            <span className="fz-ciclo__step">{e}</span>
            {i < etapas.length - 1 && (
              <span className="fz-ciclo__arrow" aria-hidden>
                {" "}
                →{" "}
              </span>
            )}
          </Fragment>
        ))}
      </p>
      {quebra && (
        <p className="fz-ciclo__break">
          <strong>Como o funil quebra isso:</strong> {quebra}
        </p>
      )}
    </aside>
  );
}
