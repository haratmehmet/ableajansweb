"use client";

// src/components/sections/home/HeroSection.tsx
// Mevcut landing page hero — birebir korunuyor, Framer Motion ile yeniden yazıldı

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import HeroCodeSlider from "@/components/ui/HeroCodeSlider";

const fadeUp = (delay: number) => ({
  initial:   { opacity: 0, y: 24 },
  animate:   { opacity: 1, y: 0  },
  transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] as const, delay },
});

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.01 2.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
);

const WaIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export interface HeroProps {
  eyebrow: string;
  title: string;
  titleAccent: string;
  titleLine2: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  ctaText2: string;
  ctaLink2: string;
  socialStrip1: string;
  socialStrip2: string;
  socialStrip3: string;
}

export default function HeroSection({ hero }: { hero: HeroProps }) {
  const logoWrapRef = useRef<HTMLDivElement>(null);
  const targetX = useRef(0);
  const targetY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);
  const rafId = useRef<number>(0);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      targetX.current = ((e.clientX - cx) / cx) * -6;
      targetY.current = ((e.clientY - cy) / cy) * -4;
    };

    const animate = () => {
      currentX.current += (targetX.current - currentX.current) * 0.06;
      currentY.current += (targetY.current - currentY.current) * 0.06;
      if (logoWrapRef.current) {
        logoWrapRef.current.style.transform = `translate(${currentX.current}px, ${currentY.current}px)`;
      }
      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    animate();
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <section className="hero-section" id="hero" aria-labelledby="hero-heading">
      {/* Logo Block */}
      <motion.div
        ref={logoWrapRef}
        {...fadeUp(0.1)}
        className="hero-logo-wrap"
        style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}
      >
        <div className="logo-halo-outer" aria-hidden="true" />
        <div className="logo-halo" aria-hidden="true" />
        
        <HeroCodeSlider />
      </motion.div>

      {/* Eyebrow */}
      <motion.p
        {...fadeUp(0.2)}
        className="hero-eyebrow"
        aria-label={`Durum: ${hero.eyebrow}`}
      >
        <span aria-hidden="true">✦</span>
        <span>{hero.eyebrow}</span>
      </motion.p>

      {/* Headline */}
      <motion.h1
        {...fadeUp(0.35)}
        id="hero-heading"
        className="hero-headline"
      >
        <span>{hero.title} </span><span className="accent">{hero.titleAccent}</span><br />
        <span>{hero.titleLine2}</span>
      </motion.h1>

      {/* Subline */}
      <motion.p
        {...fadeUp(0.5)}
        className="hero-subline"
        style={{ marginBottom: "24px" }}
      >
        {hero.subtitle || "İşletmeleri dijital dünyada büyüten yenilikçi çözümler geliştiriyoruz."}
      </motion.p>

      {/* CTA Group */}
      <motion.div
        {...fadeUp(0.65)}
        className="cta-group"
      >
        <Link href={hero.ctaLink || "#"} className="btn-cta-primary">
          <PhoneIcon /> {hero.ctaText || "Bizi Arayın"}
        </Link>
        <Link href={hero.ctaLink2 || "#"} target="_blank" rel="noopener noreferrer" className="btn-cta-secondary">
          <WaIcon /> {hero.ctaText2 || "WhatsApp İletişim"}
        </Link>
      </motion.div>

      {/* Social Proof Strip */}
      <motion.div
        {...fadeUp(0.8)}
        className="social-strip"
      >
        <span>{hero.socialStrip1}</span>
        <span className="social-strip-divider" aria-hidden="true" />
        <span>{hero.socialStrip2}</span>
        <span className="social-strip-divider" aria-hidden="true" />
        <span>{hero.socialStrip3}</span>
      </motion.div>
    </section>
  );
}
