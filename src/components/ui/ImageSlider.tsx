"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ImageSlider({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div style={{ width: "100%", maxWidth: "800px", margin: "0 auto 60px", position: "relative" }}>
      <div style={{
        background: "rgba(14,16,20,0.8)", 
        borderRadius: 20, 
        overflow: "hidden", 
        border: "1px solid rgba(255,255,255,0.08)", 
        boxShadow: "0 20px 40px -10px rgba(0,0,0,0.8)" 
      }}>
        {/* Fake Mac Window Header */}
        <div style={{ height: 32, background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", padding: "0 16px", gap: 8 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f56" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#27c93f" }} />
          <div style={{ flex: 1, textAlign: "center", fontSize: "0.75rem", color: "rgba(255,255,255,0.3)" }}>
            {currentIndex + 1} / {images.length}
          </div>
        </div>
        
        {/* Slider Content */}
        <div style={{ position: "relative", width: "100%", aspectRatio: "16/10", background: "rgba(0,0,0,0.5)" }}>
          <img 
            src={images[currentIndex]} 
            alt={`Slide ${currentIndex + 1}`} 
            style={{ width: "100%", height: "100%", objectFit: "contain" }} 
          />
          
          {images.length > 1 && (
            <>
              <button 
                onClick={prevSlide}
                style={{
                  position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)",
                  width: 40, height: 40, borderRadius: "50%", background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", cursor: "pointer", backdropFilter: "blur(4px)"
                }}
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={nextSlide}
                style={{
                  position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)",
                  width: 40, height: 40, borderRadius: "50%", background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", cursor: "pointer", backdropFilter: "blur(4px)"
                }}
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>
      </div>
      
      {/* Thumbnails */}
      {images.length > 1 && (
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 16, overflowX: "auto", paddingBottom: 8 }}>
          {images.map((img, idx) => (
            <div 
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              style={{
                width: 60, height: 40, borderRadius: 6, overflow: "hidden", cursor: "pointer",
                border: currentIndex === idx ? "2px solid var(--orange-vivid)" : "2px solid transparent",
                opacity: currentIndex === idx ? 1 : 0.5,
                transition: "all 0.2s"
              }}
            >
              <img src={img} alt={`Thumb ${idx}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
