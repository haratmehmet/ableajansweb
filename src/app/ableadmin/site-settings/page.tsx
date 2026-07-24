"use client";

import React, { useState, useEffect } from 'react';

const styles = {
  container: {
    padding: '32px',
    maxWidth: '1200px',
    margin: '0 auto',
    color: 'rgba(255,255,255,0.92)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px'
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.6rem',
    fontWeight: 700,
    color: 'rgba(255,255,255,0.92)',
    letterSpacing: '-0.02em',
    margin: 0
  },
  card: {
    background: 'rgba(14,16,20,0.6)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '16px',
    padding: '24px',
    marginBottom: '24px'
  },
  cardTitle: {
    fontSize: '1.2rem',
    fontWeight: 600,
    marginBottom: '24px',
    color: 'rgba(255,255,255,0.92)'
  },
  formGroup: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.05em',
    textTransform: 'uppercase' as const,
    color: 'rgba(255,255,255,0.35)',
    marginBottom: '8px'
  },
  input: {
    padding: '14px 18px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    color: 'rgba(255,255,255,0.92)',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'all 0.2s',
    boxSizing: 'border-box' as const,
    width: '100%'
  },
  textarea: {
    padding: '14px 18px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    color: 'rgba(255,255,255,0.92)',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'all 0.2s',
    boxSizing: 'border-box' as const,
    width: '100%',
    minHeight: '100px',
    resize: 'vertical' as const
  },
  button: {
    padding: '14px 28px',
    background: 'linear-gradient(135deg, #F55A00, #FF6B1A)',
    border: 'none',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '0.95rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'opacity 0.2s'
  },
  grid2: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px'
  },
  toast: {
    position: 'fixed' as const,
    bottom: '24px',
    right: '24px',
    padding: '16px 24px',
    background: 'rgba(34,197,94,0.15)',
    border: '1px solid rgba(34,197,94,0.3)',
    borderRadius: '12px',
    color: '#22c55e',
    zIndex: 1000
  }
};

export default function SiteSettingsPage() {
  const [settings, setSettings] = useState({
    site_name: '',
    site_url: '',
    site_description: '',
    site_logo: '',
    site_favicon: '',
    portal_text: '',
    portal_url: '',
    page_title_home: '',
    page_title_about: '',
    page_title_solutions: '',
    page_title_projects: '',
    page_title_contact: '',
    contact_phone: '',
    contact_email: '',
    contact_whatsapp: '',
    instagram_url: '',
    linkedin_url: '',
    x_url: '',
    working_hours_weekday: '',
    working_hours_saturday: ''
  });

  const [accountForm, setAccountForm] = useState({
    currentPassword: '',
    newEmail: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{show: boolean, message: string}>({ show: false, message: '' });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/admin/settings');
        if (res.ok) {
          const result = await res.json();
          if (result.data) setSettings(prev => ({ ...prev, ...result.data }));
        }
      } catch (err) {
        console.error('Failed to fetch settings', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const showToast = (message: string) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccountForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAccountSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (accountForm.newPassword !== accountForm.confirmPassword) {
      alert("Yeni şifreler eşleşmiyor.");
      return;
    }
    if (!accountForm.currentPassword) {
      alert("Değişiklik yapabilmek için mevcut şifrenizi girmelisiniz.");
      return;
    }
    try {
      const res = await fetch('/api/admin/password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: accountForm.currentPassword,
          newEmail: accountForm.newEmail,
          newPassword: accountForm.newPassword
        })
      });
      const data = await res.json();
      if (data.success) {
        showToast("Hesap bilgileriniz başarıyla güncellendi.");
        setAccountForm(prev => ({ currentPassword: '', newEmail: prev.newEmail || '', newPassword: '', confirmPassword: '' }));
      } else {
        alert(data.error || "Güncelleme başarısız.");
      }
    } catch (error) {
      alert("Bir hata oluştu.");
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.url) {
        setSettings(prev => ({ ...prev, [fieldName]: data.url }));
        showToast('Görsel yüklendi. Uygulamak için "Kaydet" butonuna basmayı unutmayın!');
      } else {
        alert('Yükleme hatası: ' + (data.message || data.details || 'Bilinmeyen hata'));
      }
    } catch (err) {
      console.error(err);
      alert('Beklenmeyen yükleme hatası: ' + String(err));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings })
      });
      if (res.ok) {
        showToast('Ayarlar başarıyla kaydedildi.');
      } else {
        alert('Kaydetme hatası oluştu.');
      }
    } catch (err) {
      console.error(err);
      alert('Beklenmeyen bir hata oluştu.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={styles.container}>Yükleniyor...</div>;

  return (
    <div style={styles.container}>
      <div className="admin-main-header" style={styles.header}>
        <h1 style={styles.title}>Site Ayarları</h1>
        <button 
          style={{ ...styles.button, opacity: saving ? 0.7 : 1 }} 
          onClick={handleSave} 
          disabled={saving}
        >
          {saving ? 'Kaydediliyor...' : 'Kaydet'}
        </button>
      </div>

      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Genel Bilgiler</h2>
        <div className="admin-grid-2" style={styles.grid2}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Site Adı</label>
            <input style={styles.input} name="site_name" value={settings.site_name} onChange={handleChange} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Site URL</label>
            <input style={styles.input} name="site_url" value={settings.site_url} onChange={handleChange} />
          </div>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Site Açıklaması (Meta Description)</label>
          <textarea style={styles.textarea} name="site_description" value={settings.site_description} onChange={handleChange} />
        </div>
      </div>

      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Marka & Görseller</h2>
        <div className="admin-grid-2" style={styles.grid2}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Ana Logo (SVG / PNG)</label>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <input style={styles.input} name="site_logo" value={settings.site_logo} onChange={handleChange} placeholder="Logo URL" />
              <label style={{ ...styles.button, padding: '14px', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                Yükle
                <input type="file" style={{ display: 'none' }} accept="image/*" onChange={(e) => handleFileUpload(e, 'site_logo')} />
              </label>
            </div>
            {settings.site_logo && <img src={settings.site_logo} alt="Logo" style={{ height: '40px', marginTop: '10px', background: 'rgba(0,0,0,0.2)', padding: '5px', borderRadius: '8px' }} />}
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Favicon (Tarayıcı İkonu)</label>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <input style={styles.input} name="site_favicon" value={settings.site_favicon} onChange={handleChange} placeholder="Favicon URL" />
              <label style={{ ...styles.button, padding: '14px', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                Yükle
                <input type="file" style={{ display: 'none' }} accept="image/*" onChange={(e) => handleFileUpload(e, 'site_favicon')} />
              </label>
            </div>
            {settings.site_favicon && <img src={settings.site_favicon} alt="Favicon" style={{ height: '32px', marginTop: '10px', borderRadius: '4px' }} />}
          </div>
        </div>
      </div>

      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Navigasyon (Menü) & Aksiyonlar</h2>
        <div className="admin-grid-2" style={styles.grid2}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Sağ Üst Buton Metni</label>
            <input style={styles.input} name="portal_text" value={settings.portal_text} onChange={handleChange} placeholder="Örn: Portal" />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Sağ Üst Buton Linki</label>
            <input style={styles.input} name="portal_url" value={settings.portal_url} onChange={handleChange} placeholder="Örn: https://portal.ableajans.com" />
          </div>
        </div>
      </div>

      <div style={styles.card}>
        <h2 style={styles.cardTitle}>SEO: Sayfa Başlıkları (Tarayıcı Sekmesi)</h2>
        <div className="admin-grid-2" style={styles.grid2}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Ana Sayfa Başlığı</label>
            <input style={styles.input} name="page_title_home" value={settings.page_title_home} onChange={handleChange} placeholder="Örn: Yeni Nesil Dijital Çözümler" />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Hakkımızda Sayfası Başlığı</label>
            <input style={styles.input} name="page_title_about" value={settings.page_title_about} onChange={handleChange} placeholder="Örn: Hakkımızda" />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Çözümler Sayfası Başlığı</label>
            <input style={styles.input} name="page_title_solutions" value={settings.page_title_solutions} onChange={handleChange} placeholder="Örn: Çözümlerimiz" />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Projeler Sayfası Başlığı</label>
            <input style={styles.input} name="page_title_projects" value={settings.page_title_projects} onChange={handleChange} placeholder="Örn: Projelerimiz" />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>İletişim Sayfası Başlığı</label>
            <input style={styles.input} name="page_title_contact" value={settings.page_title_contact} onChange={handleChange} placeholder="Örn: İletişime Geçin" />
          </div>
        </div>
      </div>

      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Hesap Bilgileri & Şifre (Yönetici)</h2>
        <form onSubmit={handleAccountSubmit}>
          <div className="admin-grid-2" style={styles.grid2}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={styles.formGroup}>
                <label style={styles.label}>E-posta (Kullanıcı Adı)</label>
                <input style={styles.input} type="email" name="newEmail" value={accountForm.newEmail} onChange={handleAccountChange} placeholder="Yeni e-posta adresiniz (İsteğe bağlı)" />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Onay İçin Mevcut Şifreniz</label>
                <input style={styles.input} type="password" name="currentPassword" value={accountForm.currentPassword} onChange={handleAccountChange} placeholder="Mevcut Şifreniz (Zorunlu)" required />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Yeni Şifre (İsteğe bağlı)</label>
                <input style={styles.input} type="password" name="newPassword" value={accountForm.newPassword} onChange={handleAccountChange} placeholder="Yeni Şifre" />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Yeni Şifre Tekrar (İsteğe bağlı)</label>
                <input style={styles.input} type="password" name="confirmPassword" value={accountForm.confirmPassword} onChange={handleAccountChange} placeholder="Yeni Şifre (Tekrar)" />
              </div>
              <button type="submit" style={{ ...styles.button, alignSelf: 'flex-start', marginTop: '10px' }}>Bilgileri Güncelle</button>
            </div>
          </div>
        </form>
      </div>

      {toast.show && (
        <div style={styles.toast}>
          {toast.message}
        </div>
      )}
    </div>
  );
}
