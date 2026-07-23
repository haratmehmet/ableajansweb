"use client";

// src/components/sections/home/ServicesSection.tsx
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { SERVICES } from "@/lib/constants";

const serviceIcons: Record<string, React.ReactNode> = {
  code: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  strategy: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M6.34 17.66l-1.41 1.41M20 12h-2M6 12H4M17.66 17.66l1.41 1.41M4.93 6.34l1.41 1.41M12 20v-2M12 4V2"/>
    </svg>
  ),
  social: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 20V10M12 20V4M6 20v-6"/>
    </svg>
  ),
  web: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
    </svg>
  ),
  marketing: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
    </svg>
  ),
  drone: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M6.343 6.343a8 8 0 000 11.314M17.657 17.657a8 8 0 000-11.314M6.343 17.657a8 8 0 010-11.314M17.657 6.343a8 8 0 010 11.314"/>
    </svg>
  ),
  ecommerce: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    </svg>
  ),
  automation: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
  ),
};

export default function ServicesSection({ services }: { services: any[] }) {
  return (
    <section className="services-section" id="hizmetler" aria-labelledby="hizmetler-heading">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      >
        <p className="section-eyebrow">Uzmanlık Alanlarımız</p>
        <h2 className="section-title" id="hizmetler-heading">
          Neler <span className="accent">Yapıyoruz?</span>
        </h2>
        <p className="section-subtitle">
          İşletmenizi dijital dünyada öne çıkaracak kapsamlı hizmetler sunuyoruz.
        </p>
      </motion.div>

      <div className="services-grid-full" role="list">
        {services.map((service, i) => (
          <motion.div
            key={service.id}
            role="listitem"
            className="service-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ delay: i * 0.08, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="service-card-icon">
              {serviceIcons[service.icon]}
            </div>
            <h3 className="service-card-title font-display font-semibold mb-2.5 text-[1.05rem] text-[var(--text-primary)]">
              {service.name}
            </h3>
            <p className="service-card-desc text-[0.87rem] leading-[1.65] text-[var(--text-secondary)]">
              {service.description || service.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
