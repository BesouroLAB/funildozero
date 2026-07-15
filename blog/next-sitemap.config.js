/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://funildozero.com.br',
  generateRobotsTxt: true,
  // Sem autoLastmod: lastmod igual à hora do build em todas as URLs é ruído
  // e faz o Google passar a ignorar o campo.
  autoLastmod: false,
  // icon.png e opengraph-image.png são rotas de asset (file convention do
  // App Router), não páginas indexáveis.
  exclude: ['/go/*', '/server-sitemap.xml', '/icon.png', '/opengraph-image.png'],
  robotsTxtOptions: {
    additionalSitemaps: [],
    policies: [
      { userAgent: '*', allow: '/', disallow: ['/go/'] },
    ],
  },
  transform: async (config, path) => {
    // Prioridades e changefreq por tipo de página
    const pilares = ['/', '/funil-de-vendas', '/ferramentas', '/systeme-io', '/negocio-digital', '/copywriting-vendas'];
    const ferramentas = ['/calculadora-de-taxas'];
    const institucional = ['/sobre', '/autor'];

    let priority = 0.6;
    let changefreq = 'monthly';

    if (path === '/') {
      priority = 1.0;
      changefreq = 'weekly';
    } else if (pilares.includes(path)) {
      priority = 0.8;
      changefreq = 'weekly';
    } else if (ferramentas.includes(path)) {
      priority = 0.7;
      changefreq = 'monthly';
    } else if (institucional.includes(path)) {
      priority = 0.4;
      changefreq = 'monthly';
    } else if (path.startsWith('/ferramentas/')) {
      priority = 0.6;
      changefreq = 'monthly';
    } else if (path.startsWith('/funil-de-vendas/')) {
      priority = 0.5;
      changefreq = 'monthly';
    }

    return {
      loc: path,
      changefreq,
      priority,
    };
  },
};
