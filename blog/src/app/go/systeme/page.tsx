"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";

/**
 * Página intermediária de redirecionamento de afiliado.
 * Dispara o evento `affiliate_click` no GA4 com metadata (source, artigo)
 * e redireciona via next.config.ts (307).
 *
 * Uso nos artigos: <a href="/go/systeme?ref=301-review-systeme">
 */
function GoSystemeTracker() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref") || "direct";

  useEffect(() => {
    // Dispara o evento de clique de afiliado no GA4
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "affiliate_click", {
        event_category: "conversion",
        event_label: ref,
        link_url: "/go/systeme",
      });
    }
  }, [ref]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        fontFamily: "system-ui, sans-serif",
        color: "#666",
      }}
    >
      <p>Redirecionando para a Systeme.io...</p>
    </div>
  );
}

export default function GoSystemePage() {
  return (
    <Suspense fallback={null}>
      <GoSystemeTracker />
    </Suspense>
  );
}
