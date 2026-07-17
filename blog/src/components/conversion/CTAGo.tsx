import { AffiliateLink } from "@/components/conversion/AffiliateLink";

interface CTAGoProps {
  /** Slug do artigo de origem — vira o ?ref= da rota /go/systeme. */
  slug: string;
  /** "full" = banner de fechamento; "inline" = botão único intermediário. */
  variant?: "full" | "inline";
  titulo?: string;
  reforco?: string;
  rotulo?: string;
}

/**
 * O CTA de afiliado do design system — o ÚNICO componente que leva a
 * /go/systeme?ref={slug}. Elemento mais forte da escada de proeminência:
 * nada na página compete com ele.
 *
 * Tracking (GA4 `affiliate_click`) e rel="sponsored nofollow noopener"
 * herdados do <AffiliateLink>.
 */
export function CTAGo({
  slug,
  variant = "full",
  titulo = "Monte seu funil na prática — de graça",
  reforco = "Plano gratuito da Systeme.io. Sem cartão, em português.",
  rotulo = "Criar minha conta grátis",
}: CTAGoProps) {
  if (variant === "inline") {
    return (
      <p className="fz-cta-inline">
        <AffiliateLink refId={slug} className="fz-btn">
          {rotulo} →
        </AffiliateLink>
      </p>
    );
  }

  return (
    <aside className="fz-cta" role="complementary" aria-label="Comece na Systeme.io">
      <h3 className="fz-cta__title">{titulo}</h3>
      <p className="fz-cta__lead">{reforco}</p>
      <AffiliateLink refId={slug} className="fz-btn fz-btn--lg">
        {rotulo} →
      </AffiliateLink>
      <p className="fz-cta__fine">
        Link de afiliado — indicamos porque usamos. Você não paga nada a mais.
      </p>
    </aside>
  );
}
