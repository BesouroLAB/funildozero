import { goSysteme } from "@/lib/afiliado";

type Variante = "topo" | "meio" | "fundo";

interface AffiliateCTAProps {
  /** Identificador da origem do clique p/ atribuição no GA4 (ex: "201-vs-hotmart-topo"). */
  refId: string;
  variante?: Variante;
  /** Texto do botão. Se omitido, usa o padrão da variante. */
  label?: string;
  /** Linha de apoio opcional acima/abaixo do botão. */
  descricao?: string;
}

const LABEL_PADRAO: Record<Variante, string> = {
  topo: "Criar conta grátis na Systeme.io →",
  meio: "Testar a Systeme.io de graça →",
  fundo: "Começar agora — Plano Grátis Vitalício →",
};

/**
 * Botão de conversão para a Systeme.io em 3 níveis de intensidade.
 * SEMPRE aponta para /go/systeme (nunca o link bruto). Renderiza como
 * Server Component — o tracking acontece na página /go/systeme.
 *
 * - topo: sutil, contextual (acima da dobra)
 * - meio: o "gancho" (solução para uma dor citada no texto)
 * - fundo: hard-pitch com destaque visual
 */
export function AffiliateCTA({
  refId,
  variante = "meio",
  label,
  descricao,
}: AffiliateCTAProps) {
  const href = goSysteme(refId);
  const texto = label ?? LABEL_PADRAO[variante];

  if (variante === "fundo") {
    return (
      <aside className="my-10 rounded-2xl bg-[#0B132B] px-6 py-8 text-center text-white">
        {descricao && (
          <p className="mx-auto mb-5 max-w-xl text-base text-white/80">
            {descricao}
          </p>
        )}
        <a
          href={href}
          className="inline-block rounded-xl bg-[#00B2B2] px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-[#00D1D1]"
        >
          {texto}
        </a>
        <p className="mt-3 text-xs text-white/50">
          Plano grátis vitalício · Sem cartão de crédito · Zero taxas por venda
        </p>
      </aside>
    );
  }

  if (variante === "topo") {
    return (
      <p className="my-6 rounded-lg border border-[#00B2B2]/30 bg-[#F7F9FC] px-4 py-3 text-sm">
        {descricao && <span className="text-[#0B132B]/70">{descricao} </span>}
        <a
          href={href}
          className="font-semibold text-[#00B2B2] underline-offset-2 hover:underline"
        >
          {texto}
        </a>
      </p>
    );
  }

  // meio (padrão)
  return (
    <p className="my-6">
      {descricao && <span className="text-[#0B132B]/80">{descricao} </span>}
      <a
        href={href}
        className="inline-block rounded-lg bg-[#00B2B2] px-5 py-2.5 font-semibold text-white transition-colors hover:bg-[#00D1D1]"
      >
        {texto}
      </a>
    </p>
  );
}
