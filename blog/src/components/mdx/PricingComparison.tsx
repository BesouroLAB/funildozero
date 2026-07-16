import React from "react";

interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  isWinner?: boolean;
}

interface PricingComparisonProps {
  rivalName: string;
  rivalPlan: PricingPlan;
  systemePlan: PricingPlan;
}

export function PricingComparison({ rivalName, rivalPlan, systemePlan }: PricingComparisonProps) {
  return (
    <div className="my-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      {/* Rival Card */}
      <div className={`rounded-xl p-6 border-2 ${rivalPlan.isWinner ? 'border-[#00B2B2] shadow-lg relative' : 'border-gray-200 bg-white'}`}>
        {rivalPlan.isWinner && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#00B2B2] text-white px-3 py-1 text-xs font-bold uppercase rounded-full tracking-wider">
            Melhor Escolha
          </div>
        )}
        <h4 className="text-xl font-semibold text-center text-[#0B132B] mb-2">{rivalName} - {rivalPlan.name}</h4>
        <div className="text-3xl font-bold text-center text-[#0B132B] mb-6">
          {rivalPlan.price}
          <span className="text-sm font-normal text-gray-500 block">/mês</span>
        </div>
        <ul className="space-y-3">
          {rivalPlan.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-[#0B132B]/80">
              <svg className="w-5 h-5 text-[#FF7A00] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Systeme Card */}
      <div className={`rounded-xl p-6 border-2 ${systemePlan.isWinner ? 'border-[#00B2B2] shadow-lg relative' : 'border-gray-200 bg-white'}`}>
        {systemePlan.isWinner && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#00B2B2] text-white px-3 py-1 text-xs font-bold uppercase rounded-full tracking-wider">
            Melhor Escolha
          </div>
        )}
        <h4 className="text-xl font-semibold text-center text-[#0B132B] mb-2">Systeme.io - {systemePlan.name}</h4>
        <div className="text-3xl font-bold text-center text-[#0B132B] mb-6">
          {systemePlan.price}
          <span className="text-sm font-normal text-gray-500 block">/mês</span>
        </div>
        <ul className="space-y-3">
          {systemePlan.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-[#0B132B]/80">
              <svg className="w-5 h-5 text-[#00B2B2] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
