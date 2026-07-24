"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const isLoginPage = pathname === "/ableadmin/login";

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isLoginPage) { setLoading(false); return; }
    fetch("/api/auth/me")
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(d => { setUser(d.user); setLoading(false); })
      .catch(() => { router.push("/ableadmin/login"); });
  }, [isLoginPage, router]);

  // Close menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  if (isLoginPage) return <>{children}</>;
  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-primary)" }}>
      <div style={{ width: 40, height: 40, border: "3px solid var(--border-soft)", borderTopColor: "var(--orange-soft)", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-primary)" }}>
      <AdminSidebar user={user} isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      {mobileMenuOpen && (
        <div className="admin-sidebar-overlay" onClick={() => setMobileMenuOpen(false)} />
      )}
      <main className="admin-main" style={{ flex: 1, marginLeft: 260, padding: "32px 40px", overflowY: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }} className="mobile-header-only">
          <button 
            onClick={() => setMobileMenuOpen(true)}
            style={{ display: "none", background: "transparent", border: "none", color: "white", cursor: "pointer", marginRight: "16px" }}
            className="admin-menu-btn"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
          </button>
          <style dangerouslySetInnerHTML={{__html: `
            @media (max-width: 768px) { .admin-menu-btn { display: block !important; } }
          `}} />
        </div>
        {children}
      </main>
    </div>
  );
}
