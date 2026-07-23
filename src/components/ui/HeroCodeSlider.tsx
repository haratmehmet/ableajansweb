"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const slides = [
  { title: "ÖZEL YAZILIM GELİŞTİRME", desc: "İşletmenize özel, yüksek performanslı ve ölçeklenebilir mimariler." },
  { title: "İŞ SÜRECİ OTOMASYONLARI", desc: "Operasyonlarınızı yapay zeka ve yazılımla otomatikleştirin." },
  { title: "SEO / AIO", desc: "Arama motorlarında ve AI araçlarında görünürlüğünüzü zirveye taşıyın." },
  { title: "KURUMSAL WEB SİTELERİ", desc: "Markanızı dijital dünyada en güçlü ve prestijli şekilde temsil edin." },
  { title: "DİJİTAL REKLAM YÖNETİMİ", desc: "Veri odaklı stratejilerle doğru kitleye, en yüksek dönüşümle ulaşın." }
];

const codeSnippets = [
  "const able = new Agency({ tech: 'Next.js', design: 'Premium' });",
  "async function optimize(business) { return await business.scale('10x'); }",
  "import { AI } from '@able/core'; AI.init({ autonomous: true });",
  "if (!success) { tryHarder(); } else { celebrate(); }",
  "const future = await buildFuture({ with: 'Able Ajans' });",
  "export const deploy = () => console.log('Liftoff! 🚀');",
  "while (true) { innovate(); improve(); }",
  "const UX = await generatePerfectExperience();",
  "DB.connect({ scale: 'infinite', speed: 'light' });"
];

export default function HeroCodeSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{
      position: "relative",
      width: "100%",
      maxWidth: "1000px",
      height: "280px",
      margin: "0 auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
      maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
    }}>

      {/* Code Background Flow */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.35
      }}>
        <motion.div
          animate={{ y: [0, -500] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          style={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: "10px", 
            fontFamily: "monospace", 
            fontSize: "0.65rem", 
            color: "var(--orange-soft)", 
            whiteSpace: "nowrap",
            textAlign: "center",
            opacity: 0.8
          }}
        >
          {[...codeSnippets, ...codeSnippets, ...codeSnippets, ...codeSnippets, ...codeSnippets].map((code, i) => (
            <div key={i}>
              {code} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {code} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {code}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Slider Content */}
      <div style={{
        position: "relative",
        zIndex: 1,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            style={{ textAlign: "center", width: "100%" }}
          >
            <h3 style={{
              fontFamily: "var(--font-display)",
              fontSize: "2rem",
              fontWeight: 600,
              margin: "0 0 10px 0",
              background: "linear-gradient(135deg, #fff, var(--orange-soft))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "0.05em"
            }}>
              {slides[currentIndex].title}
            </h3>
            <p style={{
              margin: 0,
              fontSize: "1.2rem",
              color: "var(--text-primary)",
              lineHeight: 1.5,
              fontWeight: 400,
              textShadow: "0 2px 10px rgba(0,0,0,0.8)"
            }}>
              {slides[currentIndex].desc}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
