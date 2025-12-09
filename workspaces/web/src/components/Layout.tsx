import React from "react";
import Footer from "./Footer";
import Header from "./Header";

interface LayoutProps {
  logoUrl?: string;
  headerButtons?: {
    buttonText?: string;
    buttonUrl?: string;
  }[];
  footerText?: string;
  children: React.ReactNode;
}

export default function Layout({
  logoUrl,
  headerButtons = [],
  footerText,
  children,
}: LayoutProps) {
  return (
    <>
      <Header logoUrl={logoUrl} buttons={headerButtons} />
      <main>{children}</main>
      <Footer logoUrl={logoUrl} footerText={footerText} />
    </>
  );
}
