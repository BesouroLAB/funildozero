import React from "react";

interface RegulacaoBoxProps {
  conselho: string; // Ex: "CFM", "OAB"
  children: React.ReactNode;
}

export function RegulacaoBox({ conselho, children }: RegulacaoBoxProps) {
  return (
    <div className="my-8 rounded-xl border-l-4 border-[#00B2B2] bg-[#f0f9f9] p-6 text-[#0B132B] shadow-sm">
      <div className="mb-2 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#00B2B2"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
          <path d="m9 12 2 2 4-4" />
        </svg>
        <span className="font-bold text-[#00B2B2] uppercase tracking-wide text-sm">
          Atenção às regras do {conselho}
        </span>
      </div>
      <div className="text-sm leading-relaxed opacity-90 prose prose-sm prose-a:text-[#00B2B2]">
        {children}
      </div>
    </div>
  );
}
