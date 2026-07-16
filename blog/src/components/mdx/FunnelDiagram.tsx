import React from "react";

interface FunnelDiagramProps {
  topo: string;
  meio: string;
  fundo: string;
}

export function FunnelDiagram({ topo, meio, fundo }: FunnelDiagramProps) {
  return (
    <div className="my-8 max-w-md mx-auto font-sans">
      <div className="flex flex-col items-center gap-1 relative">
        {/* Topo do Funil */}
        <div className="w-full flex items-center justify-center p-4 bg-[#00B2B2] text-white font-semibold rounded-t-lg shadow-md min-h-[80px]">
          <span className="text-center">{topo}</span>
        </div>
        
        {/* Seta */}
        <div className="text-[#00B2B2] text-xl my-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
        </div>

        {/* Meio do Funil */}
        <div className="w-[85%] flex items-center justify-center p-4 bg-[#0B132B] text-white font-semibold shadow-md min-h-[80px] rounded-md">
          <span className="text-center">{meio}</span>
        </div>

        {/* Seta */}
        <div className="text-[#0B132B] text-xl my-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
        </div>

        {/* Fundo do Funil */}
        <div className="w-[70%] flex items-center justify-center p-4 bg-[#FF7A00] text-white font-bold rounded-b-lg shadow-md min-h-[80px]">
          <span className="text-center">{fundo}</span>
        </div>
      </div>
    </div>
  );
}
