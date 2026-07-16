import { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

/**
 * Gera o robots.txt nativo do Next.js
 * Ele aponta diretamente para o sitemap nativo recém-criado.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/go/'], // Bloqueia indexação de links de afiliado
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
