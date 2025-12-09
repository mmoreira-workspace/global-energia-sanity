/* eslint-disable @next/next/no-img-element */
import React from "react";

interface FooterProps {
  logoUrl?: string;
  footerText?: string;
}

export default function Footer({ logoUrl, footerText }: FooterProps) {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-section">
          {logoUrl ? (
            <img src={logoUrl} alt="Footer Logo" className="footer-logo" />
          ) : null}
        </div>
        <div className="footer-section-3">
          <p>{footerText || "Todos os direitos reservados Global Energia LTDA 2025"}</p>
        </div>
      </div>
    </footer>
  );
}
