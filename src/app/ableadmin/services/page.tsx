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
    fontFamily: 'var(--font-display)',
    fontSize: '1.2rem',
    fontWeight: 600,
    color: 'rgba(255,255,255,0.92)',
    marginBottom: '20px',
    marginTop: 0
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    textAlign: 'left' as const
  },
  th: {
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.05em',
    textTransform: 'uppercase' as const,
    color: 'rgba(255,255,255,0.35)',
    padding: '16px',
    borderBottom: '1px solid rgba(255,255,255,0.06)'
  },
  td: {
    padding: '16px',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    fontSize: '0.95rem'
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
  select: {
    padding: '14px 18px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    color: 'rgba(255,255,255,0.92)',
    fontSize: '0.95rem',
    outline: 'none',
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
    minHeight: '80px',
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
  actionButton: {
    padding: '8px 16px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    color: 'rgba(255,255,255,0.92)',
    fontSize: '0.85rem',
    cursor: 'pointer',
    marginRight: '8px'
  },
  deleteButton: {
    padding: '8px 16px',
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    borderRadius: '8px',
    color: '#ef4444',
    fontSize: '0.85rem',
    cursor: 'pointer'
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
  },
  grid2: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px'
  }
};

type Service = {
  id?: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  order: number;
  visibility: boolean;
};

const iconOptions = ['code', 'ecommerce', 'web', 'automation', 'strategy', 'marketing', 'social', 'drone'];

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Service>({
    name: '',
    slug: '',
    icon: 'web',
    description: '',
    order: 0,
    visibility: true
  });
  const [toast, setToast] = useState({ show: false, message: '' });

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/admin/services');
      if (res.ok) {
        const result = await res.json();
        setServices(result.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const showToast = (message: string) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/\\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    if (!editingId) {
      setFormData({ ...formData, name, slug: generateSlug(name) });
    } else {
      setFormData({ ...formData, name });
    }
  };

  const handleSave = async () => {
    const method = editingId ? 'PUT' : 'POST';
    const body = editingId ? { ...formData, id: editingId } : formData;

    try {
      const res = await fetch('/api/admin/services', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      
      if (res.ok) {
        showToast(editingId ? 'Hizmet güncellendi' : 'Hizmet eklendi');
        setShowForm(false);
        setEditingId(null);
        setFormData({ name: '', slug: '', icon: 'web', description: '', order: 0, visibility: true });
        fetchServices();
      } else {
        alert('Kaydetme hatası');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (service: Service) => {
    setFormData(service);
    setEditingId(service.id!);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Silmek istediğinize emin misiniz?')) return;
    try {
      const res = await fetch(`/api/admin/services?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Hizmet silindi');
        fetchServices();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div style={styles.container}>Yükleniyor...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Hizmetler</h1>
        <button 
          style={styles.button} 
          onClick={() => {
            setFormData({ name: '', slug: '', icon: 'web', description: '', order: services.length, visibility: true });
            setEditingId(null);
            setShowForm(!showForm);
          }}
        >
          {showForm ? 'İptal' : '+ Yeni Hizmet Ekle'}
        </button>
      </div>

      {showForm && (
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>{editingId ? 'Hizmeti Düzenle' : 'Yeni Hizmet Ekle'}</h2>
          <div className="admin-grid-2" style={styles.grid2 as any}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Hizmet Adı</label>
              <input style={styles.input} value={formData.name} onChange={handleNameChange} />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Slug (URL)</label>
              <input style={styles.input} value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>İkon</label>
              <select style={styles.select} value={formData.icon} onChange={(e) => setFormData({...formData, icon: e.target.value})}>
                {iconOptions.map(icon => <option key={icon} value={icon}>{icon}</option>)}
              </select>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Sıra</label>
              <input type="number" style={styles.input} value={formData.order} onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 0})} />
            </div>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Açıklama</label>
            <textarea style={styles.textarea} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
          </div>
          <div style={{ ...styles.formGroup, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input 
              type="checkbox" 
              checked={formData.visibility} 
              onChange={(e) => setFormData({...formData, visibility: e.target.checked})}
              id="visibility"
            />
            <label htmlFor="visibility" style={{ margin: 0, color: 'rgba(255,255,255,0.92)' }}>Sitede Göster</label>
          </div>
          <button style={styles.button} onClick={handleSave}>Kaydet</button>
        </div>
      )}

      <div style={styles.card}>
      <div className="admin-table-wrapper">
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Sıra</th>
              <th style={styles.th}>İkon</th>
              <th style={styles.th}>Adı</th>
              <th style={styles.th}>Görünürlük</th>
              <th style={styles.th}>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id || service.slug}>
                <td style={styles.td}>{service.order}</td>
                <td style={styles.td}>{service.icon}</td>
                <td style={styles.td}>{service.name}</td>
                <td style={styles.td}>{service.visibility ? 'Açık' : 'Kapalı'}</td>
                <td style={styles.td}>
                  <button style={styles.actionButton} onClick={() => handleEdit(service)}>Düzenle</button>
                  <button style={styles.deleteButton} onClick={() => handleDelete(service.id!)}>Sil</button>
                </td>
              </tr>
            ))}
            {services.length === 0 && (
              <tr>
                <td colSpan={5} style={{ ...styles.td, textAlign: 'center' }}>Henüz hizmet eklenmemiş.</td>
              </tr>
            )}
          </tbody>
        </table>
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
