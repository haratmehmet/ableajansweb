"use client";

import React, { useState, useEffect } from "react";

const inputStyle = {
  padding: "14px 18px",
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "12px",
  color: "rgba(255,255,255,0.92)",
  fontSize: "0.95rem",
  outline: "none",
  transition: "all 0.2s",
  boxSizing: "border-box" as const,
  width: "100%"
};

const labelStyle = {
  display: "block",
  fontSize: "0.75rem",
  fontWeight: 600,
  letterSpacing: "0.05em",
  textTransform: "uppercase" as const,
  color: "rgba(255,255,255,0.35)",
  marginBottom: "8px"
};

const btnStyle = {
  padding: "14px 28px",
  background: "linear-gradient(135deg, #F55A00, #FF6B1A)",
  border: "none",
  borderRadius: "12px",
  color: "#fff",
  fontSize: "0.95rem",
  fontWeight: 600,
  cursor: "pointer"
};

export default function FooterPage() {
  const [formData, setFormData] = useState({
    logoUrl: "",
    copyrightText: "",
    instagramUrl: "",
    whatsappUrl: "",
    xUrl: "",
    linkedinUrl: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch("/api/admin/footer")
      .then(res => res.json())
      .then(result => {
        if (result.data && result.data.main) {
          setFormData(result.data.main);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 3000);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploading(true);
    const file = e.target.files[0];
    const form = new FormData();
    form.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: form });
      if (res.ok) {
        const data = await res.json();
        setFormData({ ...formData, logoUrl: data.url });
        showNotification("Logo yüklendi!");
      }
    } catch (error) {
      console.error(error);
      alert("Logo yüklenemedi.");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/footer", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: "main", content: formData }),
      });
      if (res.ok) {
        showNotification("Footer başarıyla kaydedildi.");
      }
    } catch (error) {
      console.error("Save error", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={{ color: "var(--text-primary)", padding: 40 }}>Yükleniyor...</div>;

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "0 auto", color: "var(--text-primary)" }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "32px" }}>Footer İçeriği Yönetimi</h1>

      <div style={{ background: "rgba(14,16,20,0.6)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "32px" }}>
        <form onSubmit={handleSave} style={{ display: "grid", gap: "24px" }}>
          
          <div style={{ background: "rgba(0,0,0,0.2)", padding: 24, borderRadius: 12 }}>
            <label style={labelStyle}>Footer Logosu</label>
            <input type="file" accept="image/*" onChange={handleUpload} style={{ color: "rgba(255,255,255,0.92)", marginBottom: "12px", display: "block" }} />
            {uploading && <div style={{ color: "var(--orange-soft)", fontSize: "0.85rem", marginBottom: 12 }}>Yükleniyor...</div>}
            {formData.logoUrl && <img src={formData.logoUrl} alt="Logo" style={{ height: "60px", background: "rgba(255,255,255,0.05)", padding: 12, borderRadius: "8px", objectFit: "contain" }} />}
          </div>

          <div>
            <label style={labelStyle}>Telif Hakkı (Copyright) Yazısı</label>
            <input type="text" value={formData.copyrightText || ""} onChange={(e) => setFormData({...formData, copyrightText: e.target.value})} style={inputStyle} placeholder="Able Ajans · Tüm hakları saklıdır. © 2026" />
          </div>

          <div className="admin-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <div>
              <label style={labelStyle}>Instagram URL</label>
              <input type="url" value={formData.instagramUrl || ""} onChange={(e) => setFormData({...formData, instagramUrl: e.target.value})} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>WhatsApp URL</label>
              <input type="url" value={formData.whatsappUrl || ""} onChange={(e) => setFormData({...formData, whatsappUrl: e.target.value})} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>X (Twitter) URL</label>
              <input type="url" value={formData.xUrl || ""} onChange={(e) => setFormData({...formData, xUrl: e.target.value})} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>LinkedIn URL</label>
              <input type="url" value={formData.linkedinUrl || ""} onChange={(e) => setFormData({...formData, linkedinUrl: e.target.value})} style={inputStyle} />
            </div>
          </div>

          <div style={{ marginTop: "16px" }}>
            <button type="submit" disabled={saving} style={btnStyle}>{saving ? "Kaydediliyor..." : "Kaydet"}</button>
          </div>
        </form>
      </div>

      {notification && (
        <div style={{ position: "fixed", bottom: "24px", right: "24px", padding: "16px 24px", background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: "12px", color: "#22c55e", zIndex: 9999 }}>
          {notification}
        </div>
      )}
    </div>
  );
}
