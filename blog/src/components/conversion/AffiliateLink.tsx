"use client";

import type { ReactNode } from "react";
import { goSysteme } from "@/lib/afiliado";

interface AffiliateLinkProps {
  /** Identificador da origem do clique p/ atribuição no GA4 (ex: "home-hero"). */
  refId: string;
  className?: string;
  children: ReactNode;
}

/**
 * Link-base de afiliado. Dispara o evento `affiliate_click` no GA4 no clique
 * (antes de navegar) e abre a Systeme.io em nova aba, mantendo o blog aberto.
 *
 * O evento é disparado aqui — e não na página /go/systeme — porque o redirect
 * 307 do next.config.ts curto-circuita aquela página antes de ela renderizar.
 * Sempre aponta para /go/systeme (nunca o link bruto).
 */
export function AffiliateLink({ refId, className, children }: AffiliateLinkProps) {
  function handleClick() {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "affiliate_click", {
        event_category: "conversion",
        event_label: refId,
        link_url: "/go/systeme",
      });
    }
  }

  return (
    <a
      href={goSysteme(refId)}
      target="_blank"
      rel="sponsored nofollow noopener"
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
}
