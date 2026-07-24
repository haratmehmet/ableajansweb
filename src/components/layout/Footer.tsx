// src/components/layout/Footer.tsx
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { prisma } from "@/lib/prisma";

const WaIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.975-9.851a1.44 1.44 0 100-2.88 1.44 1.44 0 000 2.88z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export default async function Footer() {
  let footerData = {
    logoUrl: "/assets/Logo.svg",
    copyrightText: `Able Ajans · Tüm hakları saklıdır. © ${new Date().getFullYear()}`,
    instagramUrl: "https://instagram.com",
    whatsappUrl: "https://wa.me/905458550089",
    xUrl: "https://twitter.com",
    linkedinUrl: "https://linkedin.com"
  };

  try {
    const footerRecord = await prisma.footerContent.findUnique({ where: { section: "main" } });
    if (footerRecord && footerRecord.content) {
      footerData = { ...footerData, ...(footerRecord.content as any) };
    }
  } catch (error) {
    console.error("Error fetching footer data", error);
  }

  return (
    <>
      <style>{`
        .footer-wrapper { padding: 0 24px 40px 24px; max-width: 1248px; margin: 0 auto; }
        .footer-card { padding: 50px 40px 24px; }
        .footer-grid { grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
        .footer-bottom { flex-direction: row; justify-content: space-between; }
        .footer-bottom-left, .footer-bottom-right { justify-content: flex-start; }
        .footer-social-wrapper { display: flex; gap: 12px; margin-top: 4px; justify-content: flex-start; }
        .social-link { 
          color: var(--text-tertiary); 
          transition: all 0.3s ease; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          width: 34px; 
          height: 34px; 
          border-radius: 50%; 
          background: rgba(255,255,255,0.03);
        }
        .social-link svg { 
          width: 15px !important; 
          height: 15px !important; 
          min-width: 15px !important;
          min-height: 15px !important;
        }
        .social-link:hover { 
          color: var(--orange-vivid); 
          background: rgba(255,255,255,0.08);
          transform: translateY(-2px);
        }
        .footer-link { color: var(--text-tertiary); font-size: 0.95rem; text-decoration: none; transition: color 0.3s; display: flex; align-items: center; gap: 8px; }
        .footer-link svg { width: 14px !important; height: 14px !important; min-width: 14px; }
        .footer-link:hover { color: var(--text-secondary); }
        
        @media (max-width: 768px) {
          .footer-wrapper { padding: 0 16px 24px 16px; }
          .footer-card { padding: 40px 24px 24px; border-radius: 28px !important; }
          .footer-grid { grid-template-columns: 1fr; gap: 32px !important; }
          .footer-bottom { flex-direction: column; gap: 20px; align-items: center; justify-content: center; text-align: center; }
          .footer-bottom-left, .footer-bottom-right { justify-content: center; }
          .footer-logo-container { align-items: center; text-align: center; }
          .footer-social-wrapper { justify-content: center; }
        }
      `}</style>
      <div className="footer-wrapper">
        <footer className="footer-card" style={{
          background: "rgba(10, 10, 10, 0.4)",
          border: "1px solid rgba(255,255,255,0.05)",
          borderRadius: "36px",
          boxShadow: "0 40px 100px -20px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.02)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          color: "var(--text-secondary)",
        fontFamily: "var(--font-sans)",
        position: "relative",
        zIndex: 10,
        overflow: "hidden"
      }}>
        {/* Dynamic Glow Effects */}
        <div style={{ position: "absolute", top: "-30%", right: "-20%", width: "60%", height: "60%", background: "radial-gradient(circle, rgba(245, 90, 0, 0.12) 0%, transparent 60%)", pointerEvents: "none", filter: "blur(60px)", zIndex: 0 }} />
        <div style={{ position: "absolute", bottom: "-30%", left: "-20%", width: "60%", height: "60%", background: "radial-gradient(circle, rgba(245, 140, 0, 0.08) 0%, transparent 60%)", pointerEvents: "none", filter: "blur(60px)", zIndex: 0 }} />

          <div className="footer-grid" style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gap: "40px",
            marginBottom: "40px"
          }}>
          
          {/* Brand & Social Column */}
          <div className="footer-logo-container" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <Link href="/" aria-label="Able Ajans Ana Sayfa" className="footer-logo-link">
            {footerData.logoUrl ? (
              <Image
                src={footerData.logoUrl}
                alt="Able Ajans Logo"
                width={180}
                height={60}
                style={{ objectFit: "contain", width: "180px", height: "auto", display: "block" }}
                className="footer-logo"
              />
            ) : (
              <Image
                src="/assets/Logo.svg"
                alt="Able Ajans Logo"
                width={180}
                height={60}
                style={{ objectFit: "contain", width: "180px", height: "auto", display: "block" }}
                className="footer-logo"
              />
            )}
          </Link>
          <div className="footer-social-wrapper">
            {footerData.instagramUrl && (
              <Link href={footerData.instagramUrl} target="_blank" className="social-link">
                <InstagramIcon />
              </Link>
            )}
            {footerData.whatsappUrl && (
              <Link href={footerData.whatsappUrl} target="_blank" className="social-link">
                <WaIcon />
              </Link>
            )}
            {footerData.xUrl && (
              <Link href={footerData.xUrl} target="_blank" className="social-link">
                <XIcon />
              </Link>
            )}
            {footerData.linkedinUrl && (
              <Link href={footerData.linkedinUrl} target="_blank" className="social-link">
                <LinkedinIcon />
              </Link>
            )}
          </div>
        </div>

        {/* Hızlı Bağlantılar Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <h4 style={{ color: "var(--text-primary)", fontWeight: 600, fontSize: "1.05rem", marginBottom: "4px", fontFamily: "var(--font-display)" }}>Hızlı Bağlantılar</h4>
          <Link href="/" className="footer-link">Anasayfa</Link>
          <Link href="/about" className="footer-link">Hakkımızda</Link>
          <Link href="/solutions" className="footer-link">Çözümlerimiz</Link>
        </div>

        {/* Contact Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <h4 style={{ color: "var(--text-primary)", fontWeight: 600, fontSize: "1.05rem", marginBottom: "4px", fontFamily: "var(--font-display)" }}>İletişim</h4>
          <div>
            <Link href="tel:+905458550089" className="footer-link">
              <Phone size={14} strokeWidth={1.5} /> +90 545 855 00 89
            </Link>
          </div>
          <div>
            <Link href="mailto:info@ableajans.com" className="footer-link">
              <Mail size={14} strokeWidth={1.5} /> info@ableajans.com
            </Link>
          </div>
          <div>
            <Link href={footerData.whatsappUrl || "https://wa.me/905458550089"} target="_blank" className="footer-link">
              <div style={{ width: "16px", height: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <WaIcon />
              </div>
              WhatsApp ile İletişim
            </Link>
          </div>
        </div>

      </div>

        {/* Footer Bottom Strip */}
        <div className="footer-bottom" style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1200px",
          margin: "0 auto",
          paddingTop: "24px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "16px",
          fontSize: "0.85rem",
          color: "var(--text-tertiary)"
        }}>
          <div className="footer-bottom-left" style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          <strong style={{ 
            fontWeight: 700, 
            fontFamily: "var(--font-display)",
            background: "linear-gradient(135deg, #fff, var(--orange-soft))",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: "0.9rem"
          }}>Able Ajans</strong>
          <span style={{ opacity: 0.6 }}>{footerData.copyrightText || `· Tüm hakları saklıdır. © ${new Date().getFullYear()}`}</span>
        </div>
          <div className="footer-bottom-right" style={{ display: "flex", gap: "20px" }}>
            <Link href="/kvkk" className="footer-link">Gizlilik & KVKK</Link>
            <Link href="/sartlar" className="footer-link">Kullanım Şartları</Link>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
