"use client";

import React, { useState, useEffect } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    contact_phone: "",
    contact_email: "",
    contact_whatsapp: "",
    working_hours_weekday: "",
    working_hours_saturday: "",
    working_model: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState("");

  const fetchContactSettings = async () => {
    try {
      const res = await fetch("/api/admin/contact");
      if (res.ok) {
        const result = await res.json();
        const data = result.data || {};
        setFormData({
          contact_phone: data.contact_phone || "",
          contact_email: data.contact_email || "",
          contact_whatsapp: data.contact_whatsapp || "",
          working_hours_weekday: data.working_hours_weekday || "",
          working_hours_saturday: data.working_hours_saturday || "",
          working_model: data.working_model || ""
        });
      }
    } catch (error) {
      console.error("Error fetching contact settings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContactSettings();
  }, []);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 3000);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings: formData }),
      });

      if (res.ok) {
        showNotification("İletişim bilgileri başarıyla kaydedildi.");
      }
    } catch (error) {
      console.error("Save error", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={{ color: "var(--text-primary)", padding: 40 }}>Yükleniyor...</div>;

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto", color: "var(--text-primary)" }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "32px" }}>İletişim Bilgileri</h1>

      <div style={{ background: "rgba(14,16,20,0.6)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "32px" }}>
        <form onSubmit={handleSave} style={{ display: "grid", gap: "24px" }}>
          <div>
            <label style={labelStyle}>Telefon Numarası</label>
            <input type="text" value={formData.contact_phone} onChange={(e) => setFormData({...formData, contact_phone: e.target.value})} style={inputStyle} placeholder="+90 555 123 4567" />
          </div>
          <div>
            <label style={labelStyle}>E-posta Adresi</label>
            <input type="email" value={formData.contact_email} onChange={(e) => setFormData({...formData, contact_email: e.target.value})} style={inputStyle} placeholder="info@ableajans.com" />
          </div>
          <div>
            <label style={labelStyle}>WhatsApp Numarası</label>
            <input type="text" value={formData.contact_whatsapp} onChange={(e) => setFormData({...formData, contact_whatsapp: e.target.value})} style={inputStyle} placeholder="+90 555 123 4567" />
          </div>
          <div>
            <label style={labelStyle}>Çalışma Saatleri (Hafta İçi)</label>
            <input type="text" value={formData.working_hours_weekday} onChange={(e) => setFormData({...formData, working_hours_weekday: e.target.value})} style={inputStyle} placeholder="09:00 - 18:00" />
          </div>
          <div>
            <label style={labelStyle}>Çalışma Saatleri (Cumartesi)</label>
            <input type="text" value={formData.working_hours_saturday} onChange={(e) => setFormData({...formData, working_hours_saturday: e.target.value})} style={inputStyle} placeholder="10:00 - 14:00" />
          </div>
          <div>
            <label style={labelStyle}>Çalışma Modeli</label>
            <input type="text" value={formData.working_model} onChange={(e) => setFormData({...formData, working_model: e.target.value})} style={inputStyle} placeholder="Remote / Hibrit" />
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
