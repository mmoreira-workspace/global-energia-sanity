import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import "@/styles/global.scss";
import "@/styles/home.scss";

export const metadata: Metadata = {
  title: "Global Energia",
  description: "Soluções em energia solar e projetos sustentáveis. Transforme sua casa ou empresa com energia limpa e econômica.",

  // SEO
  keywords: ["energia solar", "painel solar", "fotovoltaico", "energia sustentável", "Global Energia"],
  authors: [{ name: "Global Energia" }],

  // Open Graph (Facebook, WhatsApp, LinkedIn)
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://globalenergiasolar.net.br",
    siteName: "Global Energia",
    title: "Global Energia - Soluções em Energia Solar",
    description: "Transforme sua casa ou empresa com energia solar. Projetos personalizados, economia na conta de luz e sustentabilidade.",
    images: [
      {
        url: "https://globalenergiasolar.net.br/logo.webp",
        width: 500,
        height: 500,
        alt: "Global Energia Logo",
      },
    ],
  },

  // Twitter Cards
  twitter: {
    card: "summary",
    title: "Global Energia - Soluções em Energia Solar",
    description: "Transforme sua casa ou empresa com energia solar. Economia e sustentabilidade.",
    images: ["https://globalenergiasolar.net.br/logo.webp"],
  },

  // Outros
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="pt-BR">
      <head>
        {/* Favicons */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        {/* Preconnect para Google Fonts - melhora LCP */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0b599b" />
      </head>
      <body>
        {children}

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
