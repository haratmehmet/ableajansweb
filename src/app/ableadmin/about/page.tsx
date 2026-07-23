"use client";

import React, { useState, useEffect } from "react";

export default function AboutPage() {
  const [data, setData] = useState<any>({});
  const [currentSection, setCurrentSection] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState("");

  const fetchAbout = async () => {
    try {
      const res = await fetch("/api/admin/about");
      if (res.ok) {
        const result = await res.json();
        setData(result.data || {});
        if (result.data && Object.keys(result.data).length > 0) {
          setCurrentSection(Object.keys(result.data)[0]);
        } else {
          setCurrentSection("hero");
          setData({ hero: { title: "", subtitle: "" } });
        }
      }
    } catch (error) {
      console.error("Error fetching about:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 3000);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: currentSection, content: data[currentSection] }),
      });

      if (res.ok) {
        showNotification("Bölüm başarıyla kaydedildi.");
      }
    } catch (error) {
      console.error("Save error", error);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setData((prev: any) => ({
      ...prev,
      [currentSection]: {
        ...(prev[currentSection] || {}),
        [key]: value
      }
    }));
  };

  if (loading) return <div style={{ color: "var(--text-primary)", padding: 40 }}>Yükleniyor...</div>;

  const currentContent = data[currentSection] || {};

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "0 auto", color: "var(--text-primary)" }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "32px" }}>Hakkımızda Sayfası İçeriği</h1>

      <div style={{ marginBottom: "24px" }}>
        <label style={labelStyle}>Bölüm Seçin</label>
        <select 
          value={currentSection} 
          onChange={(e) => setCurrentSection(e.target.value)}
          style={{ ...inputStyle, width: "300px" }}
        >
          {Object.keys(data).length > 0 ? (
            Object.keys(data).map(key => <option key={key} value={key}>{key}</option>)
          ) : (
            <option value="hero">hero</option>
          )}
        </select>
      </div>

      <div style={{ background: "rgba(14,16,20,0.6)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "32px" }}>
        <form onSubmit={handleSave} style={{ display: "grid", gap: "24px" }}>
          {Object.entries(currentContent).map(([key, value]) => (
            <div key={key}>
              <label style={labelStyle}>{key}</label>
              {typeof value === "string" && value.length > 50 ? (
                <textarea 
                  value={value as string} 
                  onChange={(e) => handleChange(key, e.target.value)}
                  style={{ ...inputStyle, minHeight: "120px" }} 
                />
              ) : (
                <input 
                  type="text" 
                  value={value as string} 
                  onChange={(e) => handleChange(key, e.target.value)}
                  style={inputStyle} 
                />
              )}
            </div>
          ))}

          <div style={{ marginTop: "16px" }}>
            <button type="submit" disabled={saving} style={btnStyle}>{saving ? "Kaydediliyor..." : "Bölümü Kaydet"}</button>
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
