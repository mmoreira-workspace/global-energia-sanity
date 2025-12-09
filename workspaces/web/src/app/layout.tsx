import type { Metadata } from "next";
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
      <body>{children}</body>
    </html>
  );
}
