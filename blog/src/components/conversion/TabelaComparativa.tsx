interface TabelaComparativaProps {
  /** Nome do rival (cabeçalho da 2ª coluna). */
  rival: string;
  /** Mapa: linha -> [valorRival, valorSysteme]. */
  linhas: Record<string, string[]>;
}

/**
 * Tabela comparativa Rival vs Systeme.io. Coluna do rival em vermelho (custo/dor)
 * e da Systeme em verde (vantagem) — alinhado à semântica de cores do .brand.json.
 * O Google favorece dados tabulares; também é altamente citável por IA (GEO).
 */
export function TabelaComparativa({ rival, linhas }: TabelaComparativaProps) {
  return (
    <div className="my-8 overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b-2 border-[#0B132B]">
            <th className="py-3 pr-4 font-semibold text-[#0B132B]">Critério</th>
            <th className="px-4 py-3 font-semibold text-[#0B132B]">{rival}</th>
            <th className="px-4 py-3 font-semibold text-[#00B2B2]">
              Systeme.io
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(linhas).map(([criterio, valores]) => (
            <tr key={criterio} className="border-b border-gray-200">
              <td className="py-3 pr-4 font-medium text-[#0B132B]">
                {criterio}
              </td>
              <td className="px-4 py-3 text-[#C0392B]">{valores[0]}</td>
              <td className="px-4 py-3 text-[#0B8457]">{valores[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
