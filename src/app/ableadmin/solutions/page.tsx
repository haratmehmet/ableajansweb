"use client";

import React, { useState, useEffect } from "react";

const ICONS = ["code", "ecommerce", "web", "automation", "strategy", "marketing", "social", "drone"];

export default function SolutionsPage() {
  const [solutions, setSolutions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState("");

  const fetchSolutions = async () => {
    try {
      const res = await fetch("/api/admin/solutions");
      if (res.ok) {
        const result = await res.json();
        setSolutions(result.data || []);
      }
    } catch (error) {
      console.error("Error fetching solutions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSolutions();
  }, []);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 3000);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/solutions", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(solutions),
      });

      if (res.ok) {
        showNotification("Çözümler başarıyla kaydedildi.");
      }
    } catch (error) {
      console.error("Save error", error);
    } finally {
      setSaving(false);
    }
  };

  const updateSolution = (index: number, field: string, value: string) => {
    const newSolutions = [...solutions];
    newSolutions[index] = { ...newSolutions[index], [field]: value };
    setSolutions(newSolutions);
  };

  const addSolution = () => {
    setSolutions([...solutions, { number: `0${solutions.length + 1}`, title: "", description: "", icon: "web" }]);
  };

  const removeSolution = (index: number) => {
    const newSolutions = [...solutions];
    newSolutions.splice(index, 1);
    setSolutions(newSolutions);
  };

  if (loading) return <div style={{ color: "var(--text-primary)", padding: 40 }}>Yükleniyor...</div>;

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto", color: "var(--text-primary)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 700, letterSpacing: "-0.02em", margin: 0 }}>Çözümler</h1>
        <button onClick={handleSave} disabled={saving} style={btnStyle}>{saving ? "Kaydediliyor..." : "Tümünü Kaydet"}</button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {solutions.map((sol, idx) => (
          <div key={idx} style={{ background: "rgba(14,16,20,0.6)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "32px", position: "relative" }}>
            <button onClick={() => removeSolution(idx)} style={{ position: "absolute", top: "16px", right: "16px", background: "rgba(239,68,68,0.1)", border: "none", color: "#ef4444", borderRadius: "8px", padding: "8px 12px", cursor: "pointer" }}>Sil</button>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div>
                <label style={labelStyle}>Numara</label>
                <input type="text" value={sol.number || ""} onChange={(e) => updateSolution(idx, "number", e.target.value)} style={inputStyle} placeholder="01" />
              </div>
              <div>
                <label style={labelStyle}>İkon</label>
                <select value={sol.icon || "web"} onChange={(e) => updateSolution(idx, "icon", e.target.value)} style={inputStyle}>
                  {ICONS.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
            </div>
            <div style={{ marginTop: "20px" }}>
              <label style={labelStyle}>Başlık</label>
              <input type="text" value={sol.title || ""} onChange={(e) => updateSolution(idx, "title", e.target.value)} style={inputStyle} />
            </div>
            <div style={{ marginTop: "20px" }}>
              <label style={labelStyle}>Açıklama</label>
              <textarea value={sol.description || ""} onChange={(e) => updateSolution(idx, "description", e.target.value)} style={{ ...inputStyle, minHeight: "80px" }} />
            </div>
          </div>
        ))}
        
        <button onClick={addSolution} style={{ ...btnStyle, background: "rgba(255,255,255,0.05)", color: "#fff", border: "1px dashed rgba(255,255,255,0.2)" }}>+ Yeni Çözüm Ekle</button>
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
