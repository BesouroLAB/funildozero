/**
 * Gestão de links de afiliado (Regra de Ouro do projeto).
 *
 * PROIBIDO usar o link bruto da Systeme.io em qualquer lugar. Todo clique de
 * saída passa por /go/systeme, que dispara o evento `affiliate_click` no GA4 e
 * redireciona via next.config.ts. O parâmetro `ref` identifica a origem do
 * clique (artigo/CTA) para atribuição no relatório.
 */
export function goSysteme(ref: string): string {
  return `/go/systeme?ref=${encodeURIComponent(ref)}`;
}
