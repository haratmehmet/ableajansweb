"use client";

import React, { useState, useEffect } from "react";

export default function ReferencesPage() {
  const [references, setReferences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    logoUrl: "",
    websiteUrl: "",
    order: 0,
    isVisible: true,
  });

  const fetchReferences = async () => {
    try {
      const res = await fetch("/api/admin/references");
      if (res.ok) {
        const result = await res.json();
        setReferences(result.data || []);
      }
    } catch (error) {
      console.error("Error fetching references:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReferences();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: data });
      if (res.ok) {
        const result = await res.json();
        setFormData({ ...formData, logoUrl: result.url });
      }
    } catch (error) {
      console.error("Upload error", error);
    }
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 3000);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `/api/admin/references?id=${editingId}`
        : "/api/admin/references";
      
      const bodyData = editingId ? { id: editingId, ...formData } : formData;
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      if (res.ok) {
        showNotification("Referans başarıyla kaydedildi.");
        setEditingId(null);
        setFormData({ name: "", description: "", logoUrl: "", websiteUrl: "", order: 0, isVisible: true });
        fetchReferences();
      }
    } catch (error) {
      console.error("Save error", error);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (ref: any) => {
    setEditingId(ref.id || ref._id);
    setFormData({
      name: ref.name || "",
      description: ref.description || "",
      logoUrl: ref.logoUrl || "",
      websiteUrl: ref.websiteUrl || "",
      order: ref.order || 0,
      isVisible: ref.isVisible !== false,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Silmek istediğinize emin misiniz?")) return;
    try {
      const res = await fetch(`/api/admin/references?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        showNotification("Referans silindi.");
        fetchReferences();
      }
    } catch (error) {
      console.error("Delete error", error);
    }
  };

  if (loading) return <div style={{ color: "var(--text-primary)", padding: 40 }}>Yükleniyor...</div>;

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto", color: "var(--text-primary)" }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "32px" }}>Referanslar</h1>

      <div style={{ background: "rgba(14,16,20,0.6)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "32px", marginBottom: "40px" }}>
        <h2 style={{ fontSize: "1.2rem", marginBottom: "24px" }}>{editingId ? "Referansı Düzenle" : "Yeni Referans Ekle"}</h2>
        <form onSubmit={handleSave} style={{ display: "grid", gap: "20px" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "8px" }}>Referans Adı</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required style={inputStyle} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "8px" }}>Logo Yükle</label>
            <input type="file" onChange={handleUpload} style={{ color: "rgba(255,255,255,0.92)", marginBottom: "12px" }} />
            {formData.logoUrl && <img src={formData.logoUrl} alt="Logo" style={{ height: "60px", objectFit: "contain", display: "block" }} />}
          </div>
          <div style={{ display: "flex", gap: "20px" }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "8px" }}>Sıra</label>
              <input type="number" value={formData.order} onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})} style={inputStyle} />
            </div>
            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "10px", marginTop: "24px" }}>
              <input type="checkbox" checked={formData.isVisible} onChange={(e) => setFormData({...formData, isVisible: e.target.checked})} id="isVisible" />
              <label htmlFor="isVisible" style={{ fontSize: "0.95rem" }}>Görünür</label>
            </div>
          </div>
          <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
            <button type="submit" disabled={saving} style={btnStyle}>{saving ? "Kaydediliyor..." : "Kaydet"}</button>
            {editingId && (
              <button type="button" onClick={() => { setEditingId(null); setFormData({ name: "", description: "", logoUrl: "", websiteUrl: "", order: 0, isVisible: true }); }} style={{ ...btnStyle, background: "rgba(255,255,255,0.1)" }}>İptal</button>
            )}
          </div>
        </form>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "24px" }}>
        {references.map((ref, idx) => (
          <div key={ref.id || ref._id || idx} style={{ background: "rgba(14,16,20,0.4)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "24px" }}>
            {ref.logoUrl && <img src={ref.logoUrl} alt={ref.name} style={{ height: "40px", objectFit: "contain", marginBottom: "16px" }} />}
            <h3 style={{ fontSize: "1.1rem", marginBottom: "8px" }}>{ref.name}</h3>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", marginBottom: "16px" }}>{ref.websiteUrl}</p>
            <div style={{ display: "flex", gap: "12px" }}>
              <button onClick={() => handleEdit(ref)} style={{ padding: "8px 16px", background: "rgba(255,255,255,0.05)", border: "none", borderRadius: "8px", color: "#fff", cursor: "pointer" }}>Düzenle</button>
              <button onClick={() => handleDelete(ref.id || ref._id)} style={{ padding: "8px 16px", background: "rgba(239,68,68,0.1)", border: "none", borderRadius: "8px", color: "#ef4444", cursor: "pointer" }}>Sil</button>
            </div>
          </div>
        ))}
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
