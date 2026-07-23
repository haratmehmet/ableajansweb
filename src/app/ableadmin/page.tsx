"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export const dynamic = "force-dynamic";

const quickLinks = [
  { label: "Site Ayarları", href: "/ableadmin/site-settings", desc: "Logo, meta ve genel ayarlar", color: "#F55A00" },
  { label: "Hero Bölümü", href: "/ableadmin/hero", desc: "Ana sayfa başlık alanı", color: "#FF6B1A" },
  { label: "Hizmetler", href: "/ableadmin/services", desc: "Hizmet kartları yönetimi", color: "#F55A00" },
  { label: "İstatistikler", href: "/ableadmin/stats", desc: "Sayısal veriler", color: "#FF6B1A" },
  { label: "Referanslar", href: "/ableadmin/references", desc: "Müşteri logoları", color: "#F55A00" },
  { label: "Projeler", href: "/ableadmin/projects", desc: "Proje portföyü", color: "#FF6B1A" },
  { label: "Çözümler", href: "/ableadmin/solutions", desc: "Çözümler sayfası", color: "#F55A00" },
  { label: "Hakkımızda", href: "/ableadmin/about", desc: "Hakkımızda sayfası", color: "#FF6B1A" },
  { label: "İletişim", href: "/ableadmin/contact", desc: "İletişim bilgileri", color: "#F55A00" },
  { label: "Footer", href: "/ableadmin/footer", desc: "Alt bilgi alanı", color: "#FF6B1A" },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState({ services: 0, projects: 0, references: 0 });

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/services").then(r => r.json()).then(d => d.data?.length || 0).catch(() => 0),
      fetch("/api/admin/projects").then(r => r.json()).then(d => d.data?.length || 0).catch(() => 0),
      fetch("/api/admin/references").then(r => r.json()).then(d => d.data?.length || 0).catch(() => 0),
    ]).then(([services, projects, references]) => setStats({ services, projects, references }));
  }, []);

  return (
    <div>
      <div style={{ marginBottom: 40 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, color: "rgba(255,255,255,0.92)", letterSpacing: "-0.02em" }}>
          Hoş Geldiniz 👋
        </h1>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem", marginTop: 8 }}>
          Able Ajans yönetim paneline hoş geldiniz. Buradan sitenizin tüm içeriklerini yönetebilirsiniz.
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 40 }}>
        {[
          { label: "Hizmet", value: stats.services, color: "#F55A00" },
          { label: "Proje", value: stats.projects, color: "#FF6B1A" },
          { label: "Referans", value: stats.references, color: "#F59E0B" },
        ].map(s => (
          <div key={s.label} style={{ padding: "28px 24px", background: "rgba(14,16,20,0.6)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${s.color}, transparent)` }} />
            <p style={{ fontSize: "2.2rem", fontWeight: 700, color: s.color, fontFamily: "var(--font-display)" }}>{s.value}</p>
            <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", marginTop: 4 }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 600, color: "rgba(255,255,255,0.8)", marginBottom: 20 }}>Hızlı Erişim</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
        {quickLinks.map(link => (
          <Link key={link.href} href={link.href} style={{ padding: "20px 22px", background: "rgba(14,16,20,0.4)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, textDecoration: "none", transition: "all 0.2s ease", display: "block" }} onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(245,90,0,0.2)"; e.currentTarget.style.background = "rgba(245,90,0,0.04)"; e.currentTarget.style.transform = "translateY(-2px)"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.background = "rgba(14,16,20,0.4)"; e.currentTarget.style.transform = "translateY(0)"; }}>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 600, color: "rgba(255,255,255,0.85)", marginBottom: 6 }}>{link.label}</h3>
            <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}>{link.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
