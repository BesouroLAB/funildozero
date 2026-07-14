/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://funildozero.com.br',
  generateRobotsTxt: true,
  exclude: ['/server-sitemap.xml'], // se usar sitemap dinâmico
}
