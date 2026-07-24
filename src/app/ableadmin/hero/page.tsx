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
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px'
  },
  card: {
    background: 'rgba(14,16,20,0.6)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '16px',
    padding: '24px'
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
  previewContainer: {
    background: '#07080A',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '16px',
    padding: '48px',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center' as const,
    minHeight: '400px'
  },
  previewEyebrow: {
    color: '#F55A00',
    fontSize: '0.9rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
    marginBottom: '16px'
  },
  previewTitle: {
    fontSize: '3rem',
    fontWeight: 800,
    color: 'rgba(255,255,255,0.92)',
    lineHeight: 1.1,
    marginBottom: '24px'
  },
  previewTitleAccent: {
    color: '#F55A00'
  },
  previewSubtitle: {
    fontSize: '1.2rem',
    color: 'rgba(255,255,255,0.6)',
    maxWidth: '600px',
    marginBottom: '32px'
  },
  previewCta: {
    padding: '16px 32px',
    background: 'linear-gradient(135deg, #F55A00, #FF6B1A)',
    color: '#fff',
    borderRadius: '30px',
    fontSize: '1.1rem',
    fontWeight: 600,
    textDecoration: 'none'
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

export default function HeroSettingsPage() {
  const [hero, setHero] = useState({
    eyebrow: '',
    title: '',
    titleAccent: '',
    titleLine2: '',
    subtitle: '',
    ctaText: '',
    ctaLink: '',
    ctaText2: '',
    ctaLink2: '',
    socialStrip1: '',
    socialStrip2: '',
    socialStrip3: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{show: boolean, message: string}>({ show: false, message: '' });

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await fetch('/api/admin/hero');
        if (res.ok) {
          const result = await res.json();
          if (result.data) setHero(prev => ({ ...prev, ...result.data }));
        }
      } catch (err) {
        console.error('Failed to fetch hero', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHero();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setHero(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/hero', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hero)
      });
      if (res.ok) {
        showToast('Hero alanı başarıyla kaydedildi.');
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

  const showToast = (message: string) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  if (loading) return <div style={styles.container}>Yükleniyor...</div>;

  return (
    <div style={styles.container}>
      <div className="admin-main-header" style={styles.header}>
        <h1 style={styles.title}>Hero Alanı Yönetimi</h1>
        <button 
          style={{ ...styles.button, opacity: saving ? 0.7 : 1 }} 
          onClick={handleSave} 
          disabled={saving}
        >
          {saving ? 'Kaydediliyor...' : 'Kaydet'}
        </button>
      </div>

      <div style={styles.grid}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>İçerik Düzenle</h2>
          <div style={styles.formGroup}>
            <label style={styles.label}>Üst Başlık (Eyebrow)</label>
            <input style={styles.input} name="eyebrow" value={hero.eyebrow} onChange={handleChange} placeholder="Örn: Yeni Nesil Ajans" />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Ana Başlık</label>
            <input style={styles.input} name="title" value={hero.title} onChange={handleChange} placeholder="Örn: Dijital Dünyada" />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Vurgulu Başlık</label>
            <input style={styles.input} name="titleAccent" value={hero.titleAccent} onChange={handleChange} placeholder="Örn: Fark Yaratın" />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Ana Başlık Alt Satır</label>
            <input style={styles.input} name="titleLine2" value={hero.titleLine2} onChange={handleChange} placeholder="Örn: Varoluş Başladı" />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Alt Metin (Subtitle)</label>
            <textarea style={styles.textarea} name="subtitle" value={hero.subtitle} onChange={handleChange} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>1. Buton Metni (Örn: Bizi Arayın)</label>
            <input style={styles.input} name="ctaText" value={hero.ctaText} onChange={handleChange} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>1. Buton Linki</label>
            <input style={styles.input} name="ctaLink" value={hero.ctaLink} onChange={handleChange} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>2. Buton Metni (Örn: WhatsApp İletişim)</label>
            <input style={styles.input} name="ctaText2" value={hero.ctaText2} onChange={handleChange} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>2. Buton Linki</label>
            <input style={styles.input} name="ctaLink2" value={hero.ctaLink2} onChange={handleChange} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Alt Şerit (Social Strip) 1</label>
            <input style={styles.input} name="socialStrip1" value={hero.socialStrip1} onChange={handleChange} placeholder="Örn: Güvenilir Ajans" />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Alt Şerit (Social Strip) 2</label>
            <input style={styles.input} name="socialStrip2" value={hero.socialStrip2} onChange={handleChange} placeholder="Örn: Premium Çözümler" />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Alt Şerit (Social Strip) 3</label>
            <input style={styles.input} name="socialStrip3" value={hero.socialStrip3} onChange={handleChange} placeholder="Örn: Yenilikçi Yaklaşım" />
          </div>
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Canlı Önizleme</h2>
          <div className="admin-preview-container" style={styles.previewContainer as any}>
            <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
              {hero.eyebrow && <div className="admin-preview-eyebrow" style={styles.previewEyebrow}>{hero.eyebrow}</div>}
              <div className="admin-preview-title" style={styles.previewTitle}>
                {hero.title} {hero.titleAccent && <span style={{ color: 'var(--orange-vivid)' }}>{hero.titleAccent}</span>}
              </div>
              {hero.subtitle && <div className="admin-preview-subtitle" style={styles.previewSubtitle}>{hero.subtitle}</div>}
              {hero.ctaText && (
                <div className="admin-preview-cta" style={styles.previewCta}>
                  {hero.ctaText}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {toast.show && (
        <div style={styles.toast}>
          {toast.message}
        </div>
      )}
    </div>
  );
}
