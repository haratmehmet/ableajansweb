"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/constants";

interface NavbarProps {
  logoUrl?: string;
  portalText?: string;
  portalUrl?: string;
}

export default function Navbar({ logoUrl, portalText, portalUrl }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 60);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header className="nav-wrapper" id="navWrapper" style={{ top: scrolled ? 16 : 24 }}>
        <nav className={`nav-bar ${scrolled ? "scrolled" : ""}`} id="navBar" role="navigation" aria-label="Ana Navigasyon">
          
          {/* Logo */}
          <Link href="/" className="nav-logo-link" aria-label="Able Ajans Ana Sayfa">
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt="Able Ajans Logo"
                width={160}
                height={40}
                style={{ objectFit: "contain", width: "auto", height: "40px", display: "block" }}
                className="nav-logo"
              />
            ) : (
              <Image
                src="/assets/Logo.svg"
                alt="Able Ajans Logo"
                width={140}
                height={40}
                priority
                className="nav-logo"
              />
            )}
          </Link>

          {/* Desktop Nav Links */}
          <ul className="nav-links" id="navLinks" role="list">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`nav-link ${isActive ? "active" : ""}`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right Side */}
          <div className="nav-right">
            
            <Link href={portalUrl || "#"} className="nav-cta" id="navCta" data-tooltip="Yakında Projelerimizin Demo Portalları Girişi">
              {portalText || "Portal"}
            </Link>

            {/* Hamburger */}
            <button
              className={`nav-hamburger ${menuOpen ? "open" : ""}`}
              id="navHamburger"
              aria-label="Menüyü Aç"
              aria-expanded={menuOpen}
              aria-controls="mobileMenu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`} id="mobileMenu" aria-hidden={!menuOpen}>
        <div className="mobile-menu-inner">
          <ul className="mobile-nav-links" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href} className="mob-link-item">
                <Link
                  href={link.href}
                  className={`mobile-nav-link ${pathname === link.href ? "active" : ""}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mobile-menu-footer">
            <a href="tel:+905458550089" className="btn-cta-primary" id="mobCtaCall">
              +90 545 855 00 89
            </a>
            <a href="https://wa.me/905458550089" className="btn-cta-secondary" id="mobCtaWa" target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
