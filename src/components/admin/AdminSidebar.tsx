"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/ableadmin", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" },
  { label: "Site Ayarları", href: "/ableadmin/site-settings", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
  { type: "divider" as const },
  { label: "Hero Bölümü", href: "/ableadmin/hero", icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5z M4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z" },
  { label: "Referanslar", href: "/ableadmin/references", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
  { label: "İstatistikler", href: "/ableadmin/stats", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
  { type: "divider" as const },
  { label: "Hakkımızda", href: "/ableadmin/about", icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { label: "Çözümler", href: "/ableadmin/solutions", icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" },
  { label: "Projeler", href: "/ableadmin/projects", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" },
  { label: "İletişim", href: "/ableadmin/contact", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  { type: "divider" as const },
  { label: "Footer", href: "/ableadmin/footer", icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5z M4 15a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2z" },
];

interface AdminSidebarProps {
  user: { name: string; email: string; role: string } | null;
}

export default function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/ableadmin/login");
  };

  return (
    <aside style={{ position: "fixed", left: 0, top: 0, bottom: 0, width: 260, background: "rgba(14,16,20,0.95)", backdropFilter: "blur(20px)", borderRight: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", zIndex: 100 }}>
      {/* Logo */}
      <div style={{ padding: "28px 24px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <Link href="/ableadmin" style={{ textDecoration: "none" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 700, letterSpacing: "-0.02em" }}>
            <span style={{ color: "rgba(255,255,255,0.92)" }}>Able </span>
            <span style={{ background: "linear-gradient(135deg, #F55A00, #FF6B1A)", WebkitBackgroundClip: "text", color: "transparent" }}>Panel</span>
          </h2>
        </Link>
      </div>

      {/* Navigation */}
      <nav id="admin-sidebar-nav" style={{ flex: 1, padding: "16px 12px", overflowY: "auto" }}>
        {navItems.map((item, i) => {
          if ("type" in item && item.type === "divider") {
            return <div key={`d-${i}`} style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "8px 12px" }} />;
          }
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href!} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", marginBottom: 2, borderRadius: 10, textDecoration: "none", color: isActive ? "#F55A00" : "rgba(255,255,255,0.6)", background: isActive ? "rgba(245,90,0,0.08)" : "transparent", transition: "all 0.2s ease", fontSize: "0.88rem", fontWeight: isActive ? 600 : 400 }} onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "rgba(255,255,255,0.85)"; } }} onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; } }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={item.icon} /></svg>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User & Logout */}
      <div style={{ padding: "16px 16px 20px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        {user && (
          <div style={{ marginBottom: 12 }}>
            <p style={{ fontSize: "0.82rem", fontWeight: 500, color: "rgba(255,255,255,0.8)" }}>{user.name || user.email}</p>
            <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)" }}>{user.role}</p>
          </div>
        )}
        <button onClick={handleLogout} style={{ width: "100%", padding: "10px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)", borderRadius: 10, color: "#ef4444", fontSize: "0.82rem", fontWeight: 500, cursor: "pointer", transition: "all 0.2s ease" }} onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.15)"; }} onMouseLeave={e => { e.currentTarget.style.background = "rgba(239,68,68,0.08)"; }}>
          Çıkış Yap
        </button>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        #admin-sidebar-nav::-webkit-scrollbar { width: 5px; }
        #admin-sidebar-nav::-webkit-scrollbar-track { background: transparent; }
        #admin-sidebar-nav::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        #admin-sidebar-nav::-webkit-scrollbar-thumb:hover { background: rgba(245,90,0,0.5); }
      `}} />
    </aside>
  );
}
