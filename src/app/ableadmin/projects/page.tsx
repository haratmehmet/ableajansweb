"use client";

import React, { useState, useEffect } from "react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [settings, setSettings] = useState({
    showLoading: true,
    heroTitle: "Projelerimiz Çok Yakında / Geliştirme Sürecindeyiz",
    heroSubtitle: "Tamamladığımız yazılım projelerini ve başarı hikâyelerini özenle hazırlıyoruz. Çok yakında bu sayfada gerçek projelerimizi, kullandığımız teknolojileri ve elde edilen sonuçları inceleyebileceksiniz."
  });
  
  const [loading, setLoading] = useState(true);
  const [savingSettings, setSavingSettings] = useState(false);
  const [savingProj, setSavingProj] = useState(false);
  const [notification, setNotification] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const defaultForm = {
    title: "", slug: "", description: "", category: "", tags: "", imageUrl: "", projectUrl: "",
    isFeatured: false, isVisible: true, order: 0,
    statusBadge: "Canlıda", problem: "", solution: "", features: "", gallery: "", results: ""
  };
  const [formData, setFormData] = useState(defaultForm);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [projRes, setRes] = await Promise.all([
        fetch("/api/admin/projects"),
        fetch("/api/admin/projects-settings")
      ]);
      
      if (projRes.ok) {
        const result = await projRes.json();
        setProjects(result.data || []);
      }
      if (setRes.ok) {
        const result = await setRes.json();
        if (result.data && Object.keys(result.data).length > 0) {
          setSettings(result.data);
        }
      }
    } catch (error) {
      console.error("Error fetching projects data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 3000);
  };

  const handleSaveSettings = async () => {
    setSavingSettings(true);
    try {
      const res = await fetch("/api/admin/projects-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) showNotification("Sayfa ayarları kaydedildi.");
    } catch (e) {
      console.error(e);
    } finally {
      setSavingSettings(false);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    setFormData({ ...formData, title, slug });
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: data });
      if (res.ok) {
        const result = await res.json();
        if (field === "imageUrl") setFormData({ ...formData, imageUrl: result.url });
        if (field === "gallery") {
          const currentUrls = formData.gallery ? formData.gallery.split(",").map(u => u.trim()).filter(Boolean) : [];
          currentUrls.push(result.url);
          setFormData({ ...formData, gallery: currentUrls.join(",\n") });
        }
      }
    } catch (error) {
      console.error("Upload error", error);
    }
  };

  const handleSaveProj = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProj(true);
    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `/api/admin/projects?id=${editingId}` : "/api/admin/projects";
      
      const payload: any = {
        ...formData,
        tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
        features: formData.features ? formData.features.split('\n').map(t => t.trim()).filter(Boolean) : [],
        gallery: formData.gallery ? formData.gallery.split(',').map(t => t.trim()).filter(Boolean) : [],
        results: formData.results ? formData.results.split('\n').map(r => {
          const parts = r.split('|');
          return { metric: parts[0]?.trim() || "", label: parts[1]?.trim() || "" };
        }).filter(r => r.metric) : []
      };

      if (editingId) {
        payload.id = editingId;
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        showNotification("Proje başarıyla kaydedildi.");
        setEditingId(null);
        setFormData(defaultForm);
        fetchData();
      }
    } catch (error) {
      console.error("Save error", error);
    } finally {
      setSavingProj(false);
    }
  };

  const handleEdit = (proj: any) => {
    setEditingId(proj.id);
    setFormData({
      title: proj.title || "",
      slug: proj.slug || "",
      description: proj.description || "",
      category: proj.category || "",
      tags: Array.isArray(proj.tags) ? proj.tags.join(", ") : (proj.tags || ""),
      imageUrl: proj.imageUrl || "",
      projectUrl: proj.projectUrl || "",
      isFeatured: proj.isFeatured || false,
      isVisible: proj.isVisible !== false,
      order: proj.order || 0,
      statusBadge: proj.statusBadge || "Canlıda",
      problem: proj.problem || "",
      solution: proj.solution || "",
      features: Array.isArray(proj.features) ? proj.features.join("\n") : "",
      gallery: Array.isArray(proj.gallery) ? proj.gallery.join(",\n") : "",
      results: Array.isArray(proj.results) ? proj.results.map((r:any) => `${r.metric} | ${r.label}`).join("\n") : ""
    });
    setTimeout(() => {
      document.getElementById('project-form-container')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Silmek istediğinize emin misiniz?")) return;
    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        showNotification("Proje silindi.");
        fetchData();
      }
    } catch (error) {
      console.error("Delete error", error);
    }
  };

  if (loading) return <div style={{ color: "var(--text-primary)", padding: 40 }}>Yükleniyor...</div>;

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto", color: "var(--text-primary)" }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "32px" }}>Projeler</h1>

      {/* SAYFA AYARLARI */}
      <div style={{ background: "rgba(14,16,20,0.6)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "32px", marginBottom: "40px" }}>
        <h2 style={{ fontSize: "1.2rem", marginBottom: "24px" }}>Sayfa Ayarları & Animasyon</h2>
        <div style={{ display: "grid", gap: "20px" }}>
          <div>
            <label style={labelStyle}>Projeler Sayfası Ana Başlık (Hero)</label>
            <textarea value={settings.heroTitle} onChange={e => setSettings({...settings, heroTitle: e.target.value})} style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }} />
            <small style={{ color: "rgba(255,255,255,0.4)" }}>Gradient efekt için kelimelerin arasına "/" koyabilirsiniz.</small>
          </div>
          <div>
            <label style={labelStyle}>Projeler Sayfası Alt Metin</label>
            <textarea value={settings.heroSubtitle} onChange={e => setSettings({...settings, heroSubtitle: e.target.value})} style={{ ...inputStyle, minHeight: "80px" }} />
          </div>
          
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "12px", background: "rgba(255,255,255,0.02)", padding: "16px", borderRadius: "12px" }}>
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: "0 0 4px", fontSize: "1rem" }}>"Loading Portfolio..." Animasyonunu Göster</h4>
              <p style={{ margin: 0, fontSize: "0.85rem", color: "rgba(255,255,255,0.5)" }}>Bu ayar açıkken gerçek projeler gizlenir ve ekranda geliştirme sürecinde olduğunu belirten animasyon görünür.</p>
            </div>
            <label style={{ position: "relative", display: "inline-block", width: "50px", height: "28px" }}>
              <input type="checkbox" checked={settings.showLoading} onChange={e => setSettings({...settings, showLoading: e.target.checked})} style={{ opacity: 0, width: 0, height: 0 }} />
              <span style={{ position: "absolute", cursor: "pointer", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: settings.showLoading ? "#22c55e" : "rgba(255,255,255,0.2)", transition: ".4s", borderRadius: "34px" }}>
                <span style={{ position: "absolute", content: "''", height: "20px", width: "20px", left: "4px", bottom: "4px", backgroundColor: "white", transition: ".4s", borderRadius: "50%", transform: settings.showLoading ? "translateX(22px)" : "translateX(0)" }}></span>
              </span>
            </label>
          </div>

          <div>
            <button onClick={handleSaveSettings} disabled={savingSettings} style={btnStyle}>{savingSettings ? "Kaydediliyor..." : "Ayarları Kaydet"}</button>
          </div>
        </div>
      </div>

      {/* PROJE EKLE/DÜZENLE */}
      <div id="project-form-container" style={{ background: "rgba(14,16,20,0.6)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "32px", marginBottom: "40px", scrollMarginTop: "120px" }}>
        <h2 style={{ fontSize: "1.2rem", marginBottom: "24px" }}>{editingId ? "Projeyi Düzenle" : "Yeni Proje Ekle"}</h2>
        <form onSubmit={handleSaveProj} style={{ display: "grid", gap: "32px" }}>
          
          <div style={{ background: "rgba(0,0,0,0.2)", padding: 24, borderRadius: 12 }}>
            <h3 style={{ fontSize: "1rem", marginBottom: 16, color: "var(--orange-vivid)" }}>1. Temel Bilgiler</h3>
            <div className="admin-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: 20 }}>
              <div><label style={labelStyle}>Başlık</label><input type="text" value={formData.title} onChange={handleTitleChange} required style={inputStyle} /></div>
              <div><label style={labelStyle}>URL (Slug)</label><input type="text" value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} required style={inputStyle} /></div>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Kısa Açıklama (Kart Üzerinde Görünür)</label>
              <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} style={{ ...inputStyle, minHeight: "80px" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px" }}>
              <div><label style={labelStyle}>Kategori</label><input type="text" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} style={inputStyle} /></div>
              <div><label style={labelStyle}>Durum Rozeti</label>
                <select value={formData.statusBadge} onChange={(e) => setFormData({...formData, statusBadge: e.target.value})} style={inputStyle}>
                  <option value="🟢 Canlıda">🟢 Canlıda</option>
                  <option value="🟡 Geliştiriliyor">🟡 Geliştiriliyor</option>
                  <option value="🔵 Kurumsal">🔵 Kurumsal</option>
                  <option value="🟣 MVP">🟣 MVP</option>
                </select>
              </div>
              <div><label style={labelStyle}>Etiketler (Virgülle Ayırın)</label><input type="text" value={formData.tags} onChange={(e) => setFormData({...formData, tags: e.target.value})} style={inputStyle} /></div>
            </div>
          </div>

          <div style={{ background: "rgba(0,0,0,0.2)", padding: 24, borderRadius: 12 }}>
            <h3 style={{ fontSize: "1rem", marginBottom: 16, color: "var(--orange-vivid)" }}>2. Detay Sayfası Bilgileri</h3>
            <div className="admin-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: 20 }}>
              <div><label style={labelStyle}>Müşterinin Problemi (Neye ihtiyaç duyuyordu?)</label><textarea value={formData.problem} onChange={(e) => setFormData({...formData, problem: e.target.value})} style={{ ...inputStyle, minHeight: "120px" }} /></div>
              <div><label style={labelStyle}>Üretilen Çözüm (Nasıl çözüldü?)</label><textarea value={formData.solution} onChange={(e) => setFormData({...formData, solution: e.target.value})} style={{ ...inputStyle, minHeight: "120px" }} /></div>
            </div>
            <div className="admin-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div>
                <label style={labelStyle}>Özellikler (Her satıra bir özellik)</label>
                <textarea value={formData.features} onChange={(e) => setFormData({...formData, features: e.target.value})} style={{ ...inputStyle, minHeight: "100px" }} placeholder="Admin Panel&#10;Responsive&#10;SEO Optimizasyonu" />
              </div>
              <div>
                <label style={labelStyle}>Sonuçlar (Her satıra: Değer | Açıklama)</label>
                <textarea value={formData.results} onChange={(e) => setFormData({...formData, results: e.target.value})} style={{ ...inputStyle, minHeight: "100px" }} placeholder="+80% | İş Süreci Hızlandı&#10;99.9% | Uptime Garantisi" />
              </div>
            </div>
            <div style={{ marginTop: 24 }}>
              <label style={labelStyle}>Canlı Proje URL (Opsiyonel)</label>
              <input type="url" value={formData.projectUrl} onChange={(e) => setFormData({...formData, projectUrl: e.target.value})} style={inputStyle} />
            </div>
          </div>

          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", alignItems: "center" }}>
            <div>
              <label style={labelStyle}>Sıra</label>
              <input type="number" value={formData.order} onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})} style={{ ...inputStyle, width: "100px" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: 10 }}>
              <input type="checkbox" checked={formData.isFeatured} onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})} id="isFeatured" />
              <label htmlFor="isFeatured" style={{ fontSize: "0.95rem" }}>Öne Çıkan</label>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: 10 }}>
              <input type="checkbox" checked={formData.isVisible} onChange={(e) => setFormData({...formData, isVisible: e.target.checked})} id="isVisible2" />
              <label htmlFor="isVisible2" style={{ fontSize: "0.95rem" }}>Yayında</label>
            </div>
          </div>
          
          <div className="admin-flex-row-mobile-col" style={{ display: "flex", gap: "12px" }}>
            <button type="submit" disabled={savingProj} style={btnStyle}>{savingProj ? "Kaydediliyor..." : "Projeyi Kaydet"}</button>
            {editingId && (
              <button type="button" onClick={() => { setEditingId(null); setFormData(defaultForm); }} style={{ ...btnStyle, background: "rgba(255,255,255,0.1)" }}>İptal</button>
            )}
          </div>
        </form>
      </div>

      <div className="admin-grid-auto" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px" }}>
        {projects.map((proj, idx) => (
          <div key={proj.id} style={{ background: "rgba(14,16,20,0.4)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "20px", display: "flex", flexDirection: "column", opacity: proj.isVisible ? 1 : 0.5 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <h3 style={{ fontSize: "1.2rem", margin: 0, fontWeight: 600 }}>{proj.title}</h3>
              <span style={{ fontSize: "0.75rem", padding: "4px 8px", background: "rgba(255,255,255,0.1)", borderRadius: "20px" }}>{proj.statusBadge}</span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", marginBottom: "16px", flex: 1 }}>{proj.category}</p>
            <div style={{ display: "flex", gap: "12px" }}>
              <button onClick={() => handleEdit(proj)} style={{ padding: "8px 16px", background: "rgba(255,255,255,0.05)", border: "none", borderRadius: "8px", color: "#fff", cursor: "pointer", flex: 1 }}>Düzenle</button>
              <button onClick={() => handleDelete(proj.id)} style={{ padding: "8px 16px", background: "rgba(239,68,68,0.1)", border: "none", borderRadius: "8px", color: "#ef4444", cursor: "pointer" }}>Sil</button>
            </div>
          </div>
        ))}
        {projects.length === 0 && <div style={{ color: "rgba(255,255,255,0.4)" }}>Henüz hiç proje eklenmemiş.</div>}
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
