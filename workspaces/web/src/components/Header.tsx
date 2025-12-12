/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect } from "react";

interface HeaderButton {
  buttonText?: string;
  anchorLink?: string;
  buttonUrl?: string;
}

interface HeaderProps {
  buttons?: HeaderButton[];
}

export default function Header({ buttons = [] }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // DEBUG: verificar se os dados estão chegando
  console.log('Header buttons:', buttons);

  return (
    <header className={isScrolled ? 'scrolled' : ''}>
      <div className="header-container">
        <img
          src={isScrolled ? '/logo-hover.png' : '/logo.png'}
          alt="Logo"
          className="header-logo"
        />
        <nav className="header-nav">
          <button
            className="hamburger-button"
            aria-label="Toggle Menu"
            onClick={toggleMenu}
          />
          <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
            {buttons.map((button, index) => (
              <li key={index} className="nav-item">
                <a href={button.anchorLink || button.buttonUrl || "#"} className="nav-link">
                  {button.buttonText}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
