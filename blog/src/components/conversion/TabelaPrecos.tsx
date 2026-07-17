interface TabelaPrecosProps {
  titulo: string;
  colunas: string[];
  linhas: string[][];
  /** Fonte nomeada dos dados (vai no figcaption — a SGE cita quem tem origem). */
  fonte?: string;
}

/**
 * Tabela de dados citável (SGE/GEO): preços, taxas e limites em formato
 * limpo que AI Overviews/Perplexity extraem com fidelidade. Números em
 * mono, fonte no caption, vira cards no mobile (CSS .fz-precos).
 */
export function TabelaPrecos({ titulo, colunas, linhas, fonte }: TabelaPrecosProps) {
  return (
    <figure className="fz-precos">
      <table className="fz-precos__table">
        <caption className="fz-precos__cap">{titulo}</caption>
        <thead>
          <tr>
            {colunas.map((c) => (
              <th key={c} scope="col">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {linhas.map((l, i) => (
            <tr key={i}>
              {l.map((cel, j) => (
                <td key={j} data-label={colunas[j]}>
                  {cel}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {fonte && <figcaption className="fz-precos__fonte">Fonte: {fonte}</figcaption>}
    </figure>
  );
}
