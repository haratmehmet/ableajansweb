"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CONTACT_PHONE, CONTACT_PHONE_LINK, CONTACT_WA_LINK, SERVICES } from "@/lib/constants";

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.01 2.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
);

const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const WaIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const GlobeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const MapPinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);


export default function ContactPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const [contactInfo, setContactInfo] = useState({
    contact_phone: CONTACT_PHONE,
    contact_email: "info@ableajans.com",
    contact_whatsapp: "905458550089",
    working_hours_weekday: "09:00 - 18:00",
    working_hours_saturday: "10:00 - 15:00",
    working_model: "Türkiye Geneli & Uzaktan Hizmet"
  });

  useEffect(() => {
    fetch("/api/admin/contact")
      .then(res => res.json())
      .then(result => {
        if (result.data) {
          setContactInfo({
            contact_phone: result.data.contact_phone || CONTACT_PHONE,
            contact_email: result.data.contact_email || "info@ableajans.com",
            contact_whatsapp: result.data.contact_whatsapp || "905458550089",
            working_hours_weekday: result.data.working_hours_weekday || "09:00 - 18:00",
            working_hours_saturday: result.data.working_hours_saturday || "10:00 - 15:00",
            working_model: result.data.working_model || "Türkiye Geneli & Uzaktan Hizmet"
          });
        }
      })
      .catch(console.error);
  }, []);

  const [formData, setFormData] = useState<{
    name: string;
    company: string;
    phone: string;
    email: string;
    service: string;
    details: string;
  }>({
    name: "",
    company: "",
    phone: "",
    email: "",
    service: SERVICES[0].name,
    details: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Merhaba, yeni bir proje talebim var:\n\n*Ad Soyad:* ${formData.name}\n*Firma Adı:* ${formData.company}\n*Telefon:* ${formData.phone}\n*E-posta:* ${formData.email}\n*Hizmet Seçimi:* ${formData.service}\n*Proje Detayı:* ${formData.details}`;
    const encodedText = encodeURIComponent(text);
    const waNumber = contactInfo.contact_whatsapp.replace(/\D/g, "");
    const waUrl = `https://wa.me/${waNumber}?text=${encodedText}`;
    window.open(waUrl, "_blank");
  };

  return (
    <>
      <style>{`
        .premium-input-wrap {
          position: relative;
          width: 100%;
        }
        .premium-input {
          width: 100%;
          padding: 16px 20px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-soft);
          border-radius: var(--radius-lg);
          color: var(--text-primary);
          font-family: var(--font-body);
          font-size: 0.95rem;
          transition: var(--t-fast);
          outline: none;
        }
        .premium-input::placeholder {
          color: var(--text-tertiary);
          font-weight: 400;
        }
        .premium-input:hover {
          border-color: var(--border-medium);
          background: rgba(255, 255, 255, 0.04);
        }
        .premium-input:focus {
          border-color: var(--orange-soft);
          background: var(--bg-surface);
          box-shadow: 0 0 0 3px rgba(245, 90, 0, 0.15);
        }
        .premium-input.textarea {
          resize: vertical;
          min-height: 140px;
        }
        
        .contact-form textarea:focus {
          border-color: var(--orange-vivid);
          box-shadow: 0 0 0 4px rgba(245,90,0,0.1);
        }

        .hover-orange:hover {
          color: var(--orange-vivid) !important;
        }

        .wa-hover-btn:hover {
          background: linear-gradient(135deg, rgba(37, 211, 102, 0.15), rgba(37, 211, 102, 0.05)) !important;
          transform: translateY(-2px);
          box-shadow: 0 16px 32px -10px rgba(37, 211, 102, 0.3) !important;
        }

        .insta-hover-btn:hover {
          background: linear-gradient(135deg, rgba(225, 48, 108, 0.15), rgba(225, 48, 108, 0.05)) !important;
          transform: translateY(-2px);
          box-shadow: 0 16px 32px -10px rgba(225, 48, 108, 0.3) !important;
        }

        .social-hover-btn:hover {
          background: rgba(255,255,255,0.1) !important;
          color: #fff !important;
          transform: translateY(-2px);
        }
        
        .contact-info-card {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 20px;
          border-radius: var(--radius-lg);
          background: rgba(255,255,255,0.01);
          border: 1px solid transparent;
          transition: var(--t-fast);
        }
        .contact-info-card:hover {
          background: var(--bg-elevated);
          border-color: var(--border-subtle);
          transform: translateY(-2px);
        }
        .info-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          background: var(--orange-mist);
          border: 1px solid rgba(245,90,0,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--orange-soft);
          flex-shrink: 0;
          transition: var(--t-fast);
        }
        .contact-info-card:hover .info-icon-wrap {
          background: rgba(245,90,0,0.12);
          transform: scale(1.05);
        }
        .info-content {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .info-label {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-tertiary);
        }
        .info-value {
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--text-primary);
        }
        .info-value a {
          transition: var(--t-fast);
        }
        .info-value a:hover {
          color: var(--orange-soft);
        }
        
        .form-panel {
          background: var(--bg-surface);
          padding: 48px;
          border-radius: 36px;
          border: 1px solid var(--border-subtle);
          position: relative;
          overflow: hidden;
          box-shadow: 0 24px 64px rgba(0,0,0,0.4);
        }
        .form-panel::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(245, 90, 0, 0.3), transparent);
        }
        
        @media (max-width: 768px) {
          .contact-layout {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .form-panel {
            padding: 32px 24px !important;
            border-radius: 28px !important;
          }
        }
        
        .custom-dropdown-list::-webkit-scrollbar {
          width: 4px;
        }
        .custom-dropdown-list::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 8px;
        }
        .custom-dropdown-list::-webkit-scrollbar-thumb {
          background: rgba(245, 90, 0, 0.2);
          border-radius: 8px;
        }
        .custom-dropdown-list::-webkit-scrollbar-thumb:hover {
          background: rgba(245, 90, 0, 0.5);
        }
      `}</style>

      <div style={{ paddingTop: 0, minHeight: "80vh", paddingBottom: 100 }}>
        <section className="contact-section" id="iletisim" aria-labelledby="iletisim-heading">
          <div className="section-header" style={{ paddingBottom: 32 }}>
            <h2 className="section-title" id="iletisim-heading">
              Projenizi <span className="accent">Konuşalım</span>
            </h2>
            <p className="section-subtitle">
              Hayalinizdeki dijital deneyimi birlikte inşa edelim. Projeleriniz ve sorularınız için buradayız. Size en hızlı şekilde dönüş yapacağız.
            </p>
          </div>

          <div className="contact-layout" style={{ maxWidth: 1160, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 64, padding: "0 24px" }}>
            
            {/* Left Side: Refined Extraordinary Contact Info Panel */}
            <div style={{ background: "rgba(10, 10, 10, 0.4)", backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)", padding: "48px 40px", borderRadius: 36, border: "1px solid rgba(255,255,255,0.05)", display: "flex", flexDirection: "column", justifyContent: "flex-start", gap: 40, boxShadow: "0 40px 100px -20px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.02)", position: "relative" }}>
              {/* Dynamic Glow Effects */}
              <div style={{ position: "absolute", top: "-20%", left: "-20%", width: "70%", height: "70%", background: "radial-gradient(circle, rgba(245, 90, 0, 0.15) 0%, transparent 60%)", pointerEvents: "none", filter: "blur(40px)" }} />
              <div style={{ position: "absolute", bottom: "-20%", right: "-20%", width: "70%", height: "70%", background: "radial-gradient(circle, rgba(245, 140, 0, 0.1) 0%, transparent 60%)", pointerEvents: "none", filter: "blur(40px)" }} />
              
              {/* Header Section */}
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 100, marginBottom: 20 }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.05em", color: "var(--text-secondary)", textTransform: "uppercase" }}>İletişim Bilgileri</span>
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 12, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                  Bize Her <span className="accent" style={{ background: "linear-gradient(135deg, #fff, var(--orange-soft))", WebkitBackgroundClip: "text", color: "transparent" }}>Kanaldan Ulaşın</span>
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                  Tüm sorularınız, projeleriniz ve randevu talepleriniz için bize ulaşabilirsiniz.
                </p>
              </div>

              {/* Core Contact Info */}
              <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 28 }}>
                
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 500 }}>Direkt Hat</span>
                  <a href={`tel:${contactInfo.contact_phone.replace(/\D/g, "")}`} style={{ fontSize: "1.25rem", fontFamily: "var(--font-display)", fontWeight: 500, color: "var(--text-primary)", textDecoration: "none", transition: "color 0.3s ease" }} className="hover-orange">{contactInfo.contact_phone}</a>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 500 }}>E-posta Adresi</span>
                  <a href={`mailto:${contactInfo.contact_email}`} style={{ fontSize: "1.15rem", fontWeight: 400, color: "var(--text-primary)", textDecoration: "none", transition: "color 0.3s ease" }} className="hover-orange">{contactInfo.contact_email}</a>
                </div>

              </div>

              {/* Action Buttons */}
              <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <a href={`https://wa.me/${contactInfo.contact_whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 20px", background: "rgba(37, 211, 102, 0.05)", border: "1px solid rgba(37, 211, 102, 0.2)", borderRadius: 100, textDecoration: "none", transition: "all 0.3s ease" }} className="wa-hover-btn">
                  <span style={{ color: "#25D366" }}><WaIcon /></span>
                  <span style={{ color: "#fff", fontWeight: 500, fontSize: "0.9rem" }}>WhatsApp'tan Yazın</span>
                </a>

                <a href="https://instagram.com/ableajans" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 20px", background: "rgba(225, 48, 108, 0.05)", border: "1px solid rgba(225, 48, 108, 0.2)", borderRadius: 100, textDecoration: "none", transition: "all 0.3s ease" }} className="insta-hover-btn">
                  <span style={{ color: "#E1306C" }}><InstagramIcon /></span>
                  <span style={{ color: "#fff", fontWeight: 500, fontSize: "0.9rem" }}>Instagram</span>
                </a>
              </div>

              {/* Working Hours / Info Bottom */}
              <div style={{ position: "relative", zIndex: 1, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ color: "var(--orange-soft)", marginTop: 2, transform: "scale(0.85)" }}><MapPinIcon /></div>
                  <div>
                    <span style={{ display: "block", fontSize: "0.8rem", color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 500, marginBottom: 2 }}>Çalışma Modeli</span>
                    <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>{contactInfo.working_model}</span>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ color: "var(--orange-soft)", marginTop: 2, transform: "scale(0.85)" }}><ClockIcon /></div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <span style={{ display: "block", fontSize: "0.8rem", color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 500, marginBottom: 2 }}>Çalışma Saatleri</span>
                    <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                      Hafta İçi: {contactInfo.working_hours_weekday}
                    </span>
                    <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                      Cumartesi: {contactInfo.working_hours_saturday}
                    </span>
                  </div>
                </div>
              </div>
              
            </div>

            {/* Right Side: Extraordinary Premium Contact Form */}
            <div style={{ background: "rgba(10, 10, 10, 0.4)", backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)", padding: "48px 40px", borderRadius: 36, border: "1px solid rgba(255,255,255,0.05)", display: "flex", flexDirection: "column", boxShadow: "0 40px 100px -20px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.02)", position: "relative" }}>
              {/* Dynamic Glow Effects */}
              <div style={{ position: "absolute", top: "-20%", right: "-20%", width: "70%", height: "70%", background: "radial-gradient(circle, rgba(245, 90, 0, 0.15) 0%, transparent 60%)", pointerEvents: "none", filter: "blur(40px)" }} />
              <div style={{ position: "absolute", bottom: "-20%", left: "-20%", width: "70%", height: "70%", background: "radial-gradient(circle, rgba(245, 140, 0, 0.1) 0%, transparent 60%)", pointerEvents: "none", filter: "blur(40px)" }} />
              
              <div style={{ position: "relative", zIndex: 1, marginBottom: 32 }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 8, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                  Bize Talebinizi <span className="accent" style={{ background: "linear-gradient(135deg, #fff, var(--orange-soft))", WebkitBackgroundClip: "text", color: "transparent" }}>Gönderin</span>
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                  Birkaç bilgi bırakın; Sizi arayıp ücretsiz keşif görüşmesi yapalım.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="contact-form" style={{ display: "flex", flexDirection: "column", gap: 20, position: "relative", zIndex: 1 }}>
                <div className="premium-input-wrap">
                  <input 
                    type="text" 
                    name="name"
                    required
                    placeholder="Ad Soyad" 
                    value={formData.name}
                    onChange={handleChange}
                    className="premium-input"
                  />
                </div>
                
                <div className="premium-input-wrap">
                  <input 
                    type="text" 
                    name="company"
                    placeholder="Firma Adı (Opsiyonel)" 
                    value={formData.company}
                    onChange={handleChange}
                    className="premium-input"
                  />
                </div>
                
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
                  <div className="premium-input-wrap">
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      placeholder="Telefon Numarası" 
                      value={formData.phone}
                      onChange={handleChange}
                      className="premium-input"
                    />
                  </div>
                  <div className="premium-input-wrap">
                    <input 
                      type="email" 
                      name="email"
                      required
                      placeholder="E-posta Adresi" 
                      value={formData.email}
                      onChange={handleChange}
                      className="premium-input"
                    />
                  </div>
                </div>
                
                <div className="premium-input-wrap custom-dropdown" style={{ position: "relative" }}>
                  <div 
                    className="premium-input"
                    style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", userSelect: "none" }}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <span style={{ color: formData.service ? "var(--text-primary)" : "var(--text-tertiary)" }}>
                      {formData.service || "Hizmet Seçin"}
                    </span>
                    <div style={{ transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease", color: "var(--text-tertiary)" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                  </div>
                  
                  {isDropdownOpen && (
                    <div 
                      className="custom-dropdown-list"
                      style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      right: 0,
                      marginTop: 8,
                      background: "rgba(18, 21, 26, 0.95)", // var(--bg-surface) slightly transparent
                      border: "1px solid var(--border-soft)",
                      borderRadius: "var(--radius-md)",
                      padding: "8px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                      zIndex: 10,
                      boxShadow: "0 12px 32px rgba(0,0,0,0.5)",
                      backdropFilter: "blur(20px)",
                      maxHeight: "220px",
                      overflowY: "auto"
                    }}>
                      {[...SERVICES.map(s => s.name), "Diğer"].map(service => (
                        <div
                          key={service}
                          onClick={() => {
                            setFormData({ ...formData, service });
                            setIsDropdownOpen(false);
                          }}
                          style={{
                            padding: "12px 16px",
                            borderRadius: "var(--radius-sm)",
                            cursor: "pointer",
                            color: formData.service === service ? "var(--orange-soft)" : "var(--text-primary)",
                            background: formData.service === service ? "rgba(245,90,0,0.08)" : "transparent",
                            fontSize: "0.95rem",
                            transition: "all 0.2s ease"
                          }}
                          onMouseEnter={(e) => {
                            if (formData.service !== service) {
                              e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (formData.service !== service) {
                              e.currentTarget.style.background = "transparent";
                            }
                          }}
                        >
                          {service}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="premium-input-wrap">
                  <textarea 
                    name="details"
                    required
                    placeholder="Proje Detayından Bahsedin..." 
                    value={formData.details}
                    onChange={handleChange}
                    className="premium-input textarea"
                  />
                </div>
                
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginTop: 4 }}>
                  <input 
                    type="checkbox" 
                    id="kvkk" 
                    required 
                    defaultChecked
                    style={{ marginTop: 4, cursor: "pointer", accentColor: "var(--orange-vivid)" }} 
                  />
                  <label htmlFor="kvkk" style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.5, cursor: "pointer" }}>
                    Paylaştığım verilerin <Link href="/kvkk" style={{ color: "var(--orange-soft)", textDecoration: "underline", textUnderlineOffset: 3 }}>KVKK Aydınlatma Metni</Link> kapsamında işlenmesini ve benimle iletişime geçilmesini kabul ediyorum.
                  </label>
                </div>
                
                <button type="submit" className="btn-cta-primary" style={{ marginTop: 8, padding: "18px", fontSize: "1rem", display: "flex", justifyContent: "center", width: "100%" }}>
                  Gönder
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 8 }}>
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </form>
            </div>

          </div>
        </section>
      </div>
    </>
  );
}
