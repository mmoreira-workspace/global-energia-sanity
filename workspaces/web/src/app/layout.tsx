import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import "@/styles/global.scss";
import "@/styles/home.scss";

export const metadata: Metadata = {
  title: "Global Energia",
  description: "Soluções em energia solar e projetos da Global Energia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="pt-BR">
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
