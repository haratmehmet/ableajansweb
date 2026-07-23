"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Giriş başarısız");
      router.push("/ableadmin");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#07080A", position: "relative", overflow: "hidden" }}>
      {/* Background Effects */}
      <div style={{ position: "absolute", top: "-30%", left: "-20%", width: "60%", height: "60%", background: "radial-gradient(circle, rgba(245,90,0,0.08) 0%, transparent 60%)", filter: "blur(60px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-30%", right: "-20%", width: "60%", height: "60%", background: "radial-gradient(circle, rgba(245,140,0,0.06) 0%, transparent 60%)", filter: "blur(60px)", pointerEvents: "none" }} />

      <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 420, padding: 48, background: "rgba(14,16,20,0.8)", backdropFilter: "blur(40px)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 24, boxShadow: "0 32px 80px rgba(0,0,0,0.5)", position: "relative", zIndex: 1 }}>
        {/* Top Glow Line */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(245,90,0,0.4), transparent)" }} />

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 700, letterSpacing: "-0.02em" }}>
            <span style={{ color: "rgba(255,255,255,0.92)" }}>Able </span>
            <span style={{ background: "linear-gradient(135deg, #F55A00, #FF6B1A)", WebkitBackgroundClip: "text", color: "transparent" }}>Ajans</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", marginTop: 8 }}>Yönetim Paneli</p>
        </div>

        {/* Error */}
        {error && (
          <div style={{ padding: "12px 16px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 12, color: "#ef4444", fontSize: "0.85rem", marginBottom: 20, textAlign: "center" }}>
            {error}
          </div>
        )}

        {/* Email */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 8 }}>E-posta</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="admin@ableajans.com" style={{ width: "100%", padding: "14px 18px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "rgba(255,255,255,0.92)", fontSize: "0.95rem", outline: "none", transition: "all 0.2s ease", boxSizing: "border-box" }} onFocus={e => { e.target.style.borderColor = "#F55A00"; e.target.style.boxShadow = "0 0 0 3px rgba(245,90,0,0.15)"; }} onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }} />
        </div>

        {/* Password */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 8 }}>Şifre</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" style={{ width: "100%", padding: "14px 18px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "rgba(255,255,255,0.92)", fontSize: "0.95rem", outline: "none", transition: "all 0.2s ease", boxSizing: "border-box" }} onFocus={e => { e.target.style.borderColor = "#F55A00"; e.target.style.boxShadow = "0 0 0 3px rgba(245,90,0,0.15)"; }} onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }} />
        </div>

        {/* Submit */}
        <button type="submit" disabled={loading} style={{ width: "100%", padding: "16px", background: loading ? "rgba(245,90,0,0.5)" : "linear-gradient(135deg, #F55A00, #FF6B1A)", border: "none", borderRadius: 12, color: "#fff", fontSize: "1rem", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", transition: "all 0.3s ease", letterSpacing: "0.02em" }}>
          {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
        </button>
      </form>
    </div>
  );
}
