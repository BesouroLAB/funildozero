import type { JsonLdObject } from "@/lib/schema";

/**
 * Injeta structured data (JSON-LD) como <script>. Renderiza um ou vários
 * blocos de schema. A substituição de "<" por "<" evita XSS na
 * serialização (recomendação oficial do Next.js).
 */
export function JsonLd({ data }: { data: JsonLdObject | JsonLdObject[] }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
