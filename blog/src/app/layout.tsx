import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// Tipografia da marca (DNA): Poppins nos títulos (display), Inter no corpo.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL("https://funildozero.com.br"),
  title: {
    default: "Funil do Zero — O Seu Primeiro Funil de Vendas",
    template: "%s | Funil do Zero"
  },
  description: "Aprenda a criar funis de vendas, páginas de captura e e-mail marketing do zero, sem precisar saber programar.",
  // Favicon vem da convenção de arquivo src/app/icon.png (servido local, sem CDN externo)
  openGraph: {
    title: "Funil do Zero",
    description: "Aprenda a criar funis de vendas e e-mail marketing do zero.",
    url: "https://funildozero.com.br",
    siteName: "Funil do Zero",
    locale: "pt_BR",
    type: "website",
    // og:image vem da convenção de arquivo src/app/opengraph-image.png
  },
  twitter: {
    card: "summary_large_image",
    title: "Funil do Zero",
    description: "Aprenda a criar funis de vendas e e-mail marketing do zero.",
    // twitter:image cai no fallback do og:image (convenção de arquivo)
  },
  verification: {
    google: GSC_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${poppins.variable}`}>
      <body>
        <Header />
        {children}
        <Footer />

        {/* Google Analytics 4 — carrega após a página ficar interativa */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
