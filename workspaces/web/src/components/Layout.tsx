import React from "react";
import Footer from "./Footer";
import Header from "./Header";

interface LayoutProps {
  headerButtons?: {
    buttonText?: string;
    anchorLink?: string;
    buttonUrl?: string;
  }[];
  footerText?: string;
  children: React.ReactNode;
}

export default function Layout({
  headerButtons = [],
  footerText,
  children,
}: LayoutProps) {
  return (
    <>
      <Header buttons={headerButtons} />
      <main>{children}</main>
      <Footer logoUrl="/logo-footer.webp" footerText={footerText} />
    </>
  );
}
