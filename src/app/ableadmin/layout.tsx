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

  useEffect(() => {
    if (isLoginPage) { setLoading(false); return; }
    fetch("/api/auth/me")
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(d => { setUser(d.user); setLoading(false); })
      .catch(() => { router.push("/ableadmin/login"); });
  }, [isLoginPage, router]);

  if (isLoginPage) return <>{children}</>;
  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-primary)" }}>
      <div style={{ width: 40, height: 40, border: "3px solid var(--border-soft)", borderTopColor: "var(--orange-soft)", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-primary)" }}>
      <AdminSidebar user={user} />
      <main style={{ flex: 1, marginLeft: 260, padding: "32px 40px", overflowY: "auto" }}>
        {children}
      </main>
    </div>
  );
}
