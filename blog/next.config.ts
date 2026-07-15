import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  async redirects() {
    return [
      {
        source: '/go/systeme',
        destination: 'https://systeme.io/pt?sa=sa0276371570a27983761ac96ef26d1df1514a46c5',
        permanent: false, // 307 — não cacheia, permite rastreamento
      },
      {
        // Rota antiga da calculadora (renomeada) — 301 preserva qualquer link/índice existente
        source: '/calculadora-taxa-de-guru',
        destination: '/calculadora-de-taxas',
        permanent: true,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https' as const,
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

const withMDX = createMDX({
  // Adicione opções do remark/rehype aqui se necessário
})

export default withMDX(nextConfig);
