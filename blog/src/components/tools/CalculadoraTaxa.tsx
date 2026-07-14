"use client";

import { useMemo, useState } from "react";
import { plataformasTaxa } from "@/data/taxas";
import { AffiliateCTA } from "@/components/conversion/AffiliateCTA";

const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

/**
 * Calculadora de Taxa de Guru. O usuário informa faturamento e ticket médio,
 * escolhe a plataforma, e vê quanto perde por mês/ano em taxas vs. os 0% da
 * Systeme.io. Serve como lead magnet e gera um dado citável (GEO).
 */
export function CalculadoraTaxa() {
  const [faturamento, setFaturamento] = useState(10000);
  const [ticket, setTicket] = useState(100);
  const [slug, setSlug] = useState(plataformasTaxa[0].slug);
  const [percentCustom, setPercentCustom] = useState(10);

  const plataforma = plataformasTaxa.find((p) => p.slug === slug);

  const { mensal, anual, vendas } = useMemo(() => {
    const numVendas =
      ticket > 0 ? Math.max(1, Math.round(faturamento / ticket)) : 0;
    const pct = plataforma ? plataforma.percentual : percentCustom / 100;
    const fixo = plataforma ? plataforma.fixo : 0;
    const taxaMensal = faturamento * pct + numVendas * fixo;
    return { mensal: taxaMensal, anual: taxaMensal * 12, vendas: numVendas };
  }, [faturamento, ticket, plataforma, percentCustom]);

  const nomePlataforma = plataforma ? plataforma.nome : "sua plataforma atual";

  return (
    <div className="my-8 rounded-2xl border border-[#00B2B2]/20 bg-[#F7F9FC] p-6">
      <div className="grid gap-5 sm:grid-cols-3">
        <label className="flex flex-col text-sm font-medium text-[#0B132B]">
          Faturamento mensal (R$)
          <input
            type="number"
            min={0}
            value={faturamento}
            onChange={(e) => setFaturamento(Number(e.target.value) || 0)}
            className="mt-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-[#0B132B]"
          />
        </label>
        <label className="flex flex-col text-sm font-medium text-[#0B132B]">
          Ticket médio (R$)
          <input
            type="number"
            min={1}
            value={ticket}
            onChange={(e) => setTicket(Number(e.target.value) || 0)}
            className="mt-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-[#0B132B]"
          />
        </label>
        <label className="flex flex-col text-sm font-medium text-[#0B132B]">
          Plataforma atual
          <select
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="mt-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-[#0B132B]"
          >
            {plataformasTaxa.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.nome} ({(p.percentual * 100).toLocaleString("pt-BR")}% + R${" "}
                {p.fixo.toLocaleString("pt-BR")})
              </option>
            ))}
            <option value="custom">Outra (informar taxa %)</option>
          </select>
        </label>
      </div>

      {slug === "custom" && (
        <label className="mt-4 flex max-w-xs flex-col text-sm font-medium text-[#0B132B]">
          Taxa da plataforma (%)
          <input
            type="number"
            min={0}
            max={100}
            step={0.1}
            value={percentCustom}
            onChange={(e) => setPercentCustom(Number(e.target.value) || 0)}
            className="mt-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-[#0B132B]"
          />
        </label>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl bg-white p-5">
          <p className="text-sm text-[#0B132B]/70">
            Você perde na {nomePlataforma} (em ~{vendas} vendas/mês)
          </p>
          <p className="mt-1 text-3xl font-bold text-[#C0392B]">
            {brl.format(mensal)}
            <span className="text-base font-medium">/mês</span>
          </p>
          <p className="mt-1 text-lg font-semibold text-[#C0392B]">
            {brl.format(anual)} por ano
          </p>
        </div>
        <div className="rounded-xl bg-[#0B132B] p-5 text-white">
          <p className="text-sm text-white/70">
            O que você pagaria de taxa na Systeme.io
          </p>
          <p className="mt-1 text-3xl font-bold text-[#00D1D1]">
            R$ 0,00<span className="text-base font-medium">/mês</span>
          </p>
          <p className="mt-1 text-lg font-semibold text-[#00D1D1]">
            0% de taxa por venda
          </p>
        </div>
      </div>

      <AffiliateCTA
        refId="calc-taxa-de-guru"
        variante="fundo"
        descricao={`Você deixaria de pagar ${brl.format(
          anual
        )} por ano em taxas. Crie sua conta grátis na Systeme.io e fique com esse dinheiro.`}
      />

      <p className="mt-3 text-xs text-[#0B132B]/50">
        Estimativa da taxa de plataforma sobre o faturamento informado. Taxas de
        gateway de pagamento (cartão/Pix) são cobradas à parte por qualquer
        plataforma e não entram neste cálculo.
      </p>
    </div>
  );
}
