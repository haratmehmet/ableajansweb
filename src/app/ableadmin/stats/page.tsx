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
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '24px'
  },
  card: {
    background: 'rgba(14,16,20,0.6)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '16px',
    padding: '24px',
    position: 'relative' as const
  },
  formGroup: {
    marginBottom: '16px'
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
  addButton: {
    padding: '14px 28px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px dashed rgba(255,255,255,0.2)',
    borderRadius: '12px',
    color: 'rgba(255,255,255,0.92)',
    fontSize: '0.95rem',
    fontWeight: 600,
    cursor: 'pointer',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '200px'
  },
  removeButton: {
    position: 'absolute' as const,
    top: '12px',
    right: '12px',
    background: 'rgba(239, 68, 68, 0.1)',
    border: 'none',
    color: '#ef4444',
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1rem',
    fontWeight: 'bold'
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

type Stat = {
  id: string;
  value: string;
  label: string;
};

export default function StatsPage() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '' });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/admin/stats');
        if (res.ok) {
          const result = await res.json();
        setStats(result.data || []);
        }
      } catch (err) {
        console.error('Failed to fetch stats', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const handleChange = (id: string, field: 'value' | 'label', newValue: string) => {
    setStats(stats.map(stat => stat.id === id ? { ...stat, [field]: newValue } : stat));
  };

  const handleAdd = () => {
    const newStat: Stat = {
      id: Math.random().toString(36).substring(7),
      value: '',
      label: ''
    };
    setStats([...stats, newStat]);
  };

  const handleRemove = (id: string) => {
    setStats(stats.filter(stat => stat.id !== id));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/stats', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stats)
      });
      if (res.ok) {
        showToast('İstatistikler kaydedildi');
      } else {
        alert('Kaydetme hatası');
      }
    } catch (err) {
      console.error(err);
      alert('Hata oluştu');
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
      <div style={styles.header}>
        <h1 style={styles.title}>İstatistikler</h1>
        <button 
          style={{ ...styles.button, opacity: saving ? 0.7 : 1 }} 
          onClick={handleSave} 
          disabled={saving}
        >
          {saving ? 'Kaydediliyor...' : 'Tümünü Kaydet'}
        </button>
      </div>

      <div style={styles.grid}>
        {stats.map((stat) => (
          <div key={stat.id} style={styles.card}>
            <button style={styles.removeButton} onClick={() => handleRemove(stat.id)} title="Sil">&times;</button>
            <div style={styles.formGroup}>
              <label style={styles.label}>Değer (Örn: 99%, 50+)</label>
              <input 
                style={styles.input} 
                value={stat.value} 
                onChange={(e) => handleChange(stat.id, 'value', e.target.value)} 
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Etiket (Örn: Memnun Müşteri)</label>
              <input 
                style={styles.input} 
                value={stat.label} 
                onChange={(e) => handleChange(stat.id, 'label', e.target.value)} 
              />
            </div>
          </div>
        ))}

        <button style={styles.addButton} onClick={handleAdd}>
          + Yeni İstatistik Ekle
        </button>
      </div>

      {toast.show && (
        <div style={styles.toast}>
          {toast.message}
        </div>
      )}
    </div>
  );
}
