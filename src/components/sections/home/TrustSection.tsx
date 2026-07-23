"use client";

import { motion, useInView } from "framer-motion";
import { Cpu, Code2, Globe, Database, Sparkles, Zap, Cloud, Layers, Fingerprint, Hexagon, Rocket } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] as const, delay },
});

import Image from "next/image";

export interface TrustStat {
  label: string;
  value: string;
  icon?: string;
}

export interface TrustReference {
  name: string;
  logoUrl?: string | null;
}

export interface TrustSectionProps {
  stats: TrustStat[];
  references: TrustReference[];
  title?: string;
  subtitle?: string;
}

function CountUp({ to, prefix = "", suffix = "" }: { to: number, prefix?: string, suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(1);
  
  useEffect(() => {
    if (!isInView) return;
    let start = 1;
    const duration = 2000;
    const steps = 60;
    const stepTime = Math.abs(Math.floor(duration / steps));
    const increment = to / steps;
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= to) {
        setDisplayValue(to);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.ceil(start));
      }
    }, stepTime);
    
    return () => clearInterval(timer);
  }, [to, isInView]);

  return <span ref={ref}>{prefix}{displayValue}{suffix}</span>;
}

export default function TrustSection({ stats, references, title, subtitle }: TrustSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollPos = useRef(0);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeftRef = useRef(0);

  useEffect(() => {
    if (references.length === 0) return;
    
    let animationId: number;
    const autoScroll = () => {
      if (!isDown.current && containerRef.current) {
        scrollPos.current += 0.5; // Yavaş kayma hızı
        
        // Sonsuz döngü için ortaya geldiğinde başa sar
        if (scrollPos.current >= containerRef.current.scrollWidth / 2) {
          scrollPos.current = 0;
        }
        containerRef.current.scrollLeft = scrollPos.current;
      }
      animationId = requestAnimationFrame(autoScroll);
    };
    animationId = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animationId);
  }, [references.length]);

  const onMouseDown = (e: React.MouseEvent) => {
    isDown.current = true;
    startX.current = e.pageX - containerRef.current!.offsetLeft;
    scrollLeftRef.current = containerRef.current!.scrollLeft;
    if (containerRef.current) {
      containerRef.current.style.cursor = "grabbing";
    }
  };
  
  const onTouchStart = (e: React.TouchEvent) => {
    isDown.current = true;
    startX.current = e.touches[0].pageX - containerRef.current!.offsetLeft;
    scrollLeftRef.current = containerRef.current!.scrollLeft;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current!.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    scrollPos.current = scrollLeftRef.current - walk;
    containerRef.current!.scrollLeft = scrollPos.current;
  };
  
  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDown.current) return;
    const x = e.touches[0].pageX - containerRef.current!.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    scrollPos.current = scrollLeftRef.current - walk;
    containerRef.current!.scrollLeft = scrollPos.current;
  };

  const onDragEnd = () => {
    isDown.current = false;
    if (containerRef.current) {
      scrollPos.current = containerRef.current.scrollLeft;
      containerRef.current.style.cursor = "grab";
    }
  };

  return (
    <section style={{ 
      padding: "20px 20px 100px", 
      position: "relative", 
      zIndex: 10, 
      textAlign: "center", 
      maxWidth: "1200px", 
      margin: "0 auto" 
    }}>
      <motion.div {...fadeUp(0.1)}>
        {title ? (
          <h2 style={{ 
            fontFamily: "var(--font-display)", 
            fontSize: "2.4rem", 
            fontWeight: 600, 
            color: "var(--text-primary)", 
            marginBottom: "16px",
            letterSpacing: "-0.02em"
          }} dangerouslySetInnerHTML={{ __html: title }} />
        ) : (
          <h2 style={{ 
            fontFamily: "var(--font-display)", 
            fontSize: "2.4rem", 
            fontWeight: 600, 
            color: "var(--text-primary)", 
            marginBottom: "16px",
            letterSpacing: "-0.02em"
          }}>
            Bize Güvenen <span style={{ background: "linear-gradient(135deg, #fff, var(--orange-soft))", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>Markalar</span>
          </h2>
        )}
        <p style={{ 
          color: "var(--text-secondary)", 
          fontSize: "1.1rem", 
          maxWidth: "600px", 
          margin: "0 auto 48px", 
          lineHeight: 1.6 
        }}>
          {subtitle || "İşletmelerin dijital dönüşüm yolculuğunda birlikte çalıştığımız, farklı sektörlerden değerli iş ortaklarımız."}
        </p>
      </motion.div>

      {/* Marquee Area */}
      <motion.div {...fadeUp(0.2)} style={{ 
        width: "100%", 
        overflow: "hidden", 
        display: "flex",
        background: "rgba(255,255,255,0.01)",
        borderTop: "1px solid rgba(255,255,255,0.03)",
        borderBottom: "1px solid rgba(255,255,255,0.03)",
        padding: "40px 0",
        position: "relative",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
        maskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
      }}>
          <div 
            ref={containerRef}
            onMouseDown={onMouseDown}
            onMouseLeave={onDragEnd}
            onMouseUp={onDragEnd}
            onMouseMove={onMouseMove}
            onTouchStart={onTouchStart}
            onTouchEnd={onDragEnd}
            onTouchMove={onTouchMove}
            style={{ 
              display: "flex", 
              gap: "60px", 
              width: "100%", 
              justifyContent: "flex-start",
              flexWrap: "nowrap",
              padding: "0 20px",
              overflowX: "scroll",
              msOverflowStyle: "none",
              scrollbarWidth: "none",
              cursor: "grab",
              userSelect: "none",
              WebkitUserSelect: "none",
              touchAction: "pan-y"
            }}
            className="no-scrollbar"
          >
          {/* Loop logic: Duplicate array heavily to ensure infinite scrolling never runs out of content */}
          {references.length > 0 ? (
            [...references, ...references, ...references, ...references, ...references, ...references].map((ref, index) => {
               return (
                   <div 
                     key={index}
                     draggable={false}
                     className="no-drag"
                     style={{ 
                       display: "flex",
                       alignItems: "center",
                       justifyContent: "center",
                       gap: "12px",
                       fontSize: "1.5rem", 
                       fontWeight: 600, 
                       color: "rgba(255,255,255,0.3)", 
                       fontFamily: "var(--font-display)",
                       letterSpacing: "0.02em",
                       whiteSpace: "nowrap",
                       transition: "all 0.3s ease",
                       pointerEvents: "auto",
                       flexShrink: 0,
                       filter: "grayscale(100%) opacity(0.6)"
                     }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.color = "var(--orange-vivid)";
                       e.currentTarget.style.transform = "scale(1.05)";
                       e.currentTarget.style.filter = "grayscale(0) opacity(1)";
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.color = "rgba(255,255,255,0.3)";
                       e.currentTarget.style.transform = "scale(1)";
                       e.currentTarget.style.filter = "grayscale(100%) opacity(0.6)";
                     }}
                     onTouchStart={(e) => {
                       e.currentTarget.style.color = "var(--orange-vivid)";
                       e.currentTarget.style.filter = "grayscale(0) opacity(1)";
                     }}
                     onTouchEnd={(e) => {
                       e.currentTarget.style.color = "rgba(255,255,255,0.3)";
                       e.currentTarget.style.filter = "grayscale(100%) opacity(0.6)";
                     }}
                   >
                     {ref.logoUrl ? (
                       <Image src={ref.logoUrl} alt={ref.name} width={40} height={40} style={{ objectFit: "contain" }} />
                     ) : (
                       <Hexagon size={32} strokeWidth={1.5} />
                     )}
                     <span>{ref.name}</span>
                   </div>
               );
            })
          ) : (
            <div style={{ color: "rgba(255,255,255,0.3)" }}>Henüz referans eklenmemiş</div>
          )}
        </div>
      </motion.div>

      {/* Statistics */}
      <motion.div {...fadeUp(0.3)} style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", 
        gap: "24px", 
        marginTop: "40px" 
      }}>
        {stats.map((stat, i) => {
          // Parse values for CountUp, assuming value string might be "30+" or "%100"
          let numValue = parseInt(stat.value.replace(/[^0-9]/g, '')) || 0;
          let prefix = stat.value.startsWith('%') ? '%' : '';
          let suffix = stat.value.endsWith('+') ? '+' : (stat.value.endsWith('%') ? '%' : '');

          return (
            <div key={i} style={{
              background: "rgba(15, 17, 21, 0.4)",
              border: "1px solid rgba(255,255,255,0.03)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              padding: "24px 20px",
              borderRadius: "16px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease",
              cursor: "default"
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              <div style={{ 
                fontSize: "2.2rem", 
                fontWeight: 700, 
                fontFamily: "var(--font-display)", 
                background: "linear-gradient(135deg, #fff, var(--orange-soft))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "4px",
                filter: "drop-shadow(0 0 15px rgba(255, 138, 0, 0.3))"
              }}>
                <CountUp to={numValue} prefix={prefix} suffix={suffix} />
              </div>
              <div style={{ 
                fontSize: "0.95rem", 
                color: "var(--text-secondary)", 
                fontWeight: 400,
                letterSpacing: "0.01em"
              }}>
                {stat.label}
              </div>
            </div>
          );
        })}
      </motion.div>
    </section>
  );
}
