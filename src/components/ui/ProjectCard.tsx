"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface ProjectCardProps {
  project: any;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    // Adjust multipliers for effect intensity
    setRotateX(yPct * -10); // tilt up/down
    setRotateY(xPct * 10);  // tilt left/right
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <div 
      style={{
        display: "flex",
        flexDirection: "column",
        background: "rgba(14,16,20,0.6)",
        backdropFilter: "blur(20px)",
        borderRadius: "24px",
        border: "1px solid rgba(255,255,255,0.06)",
        overflow: "hidden",
        transition: "all 0.3s ease",
        height: "100%"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      <div style={{ padding: "24px", display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
          <span style={{ color: "var(--orange-vivid)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
            {project.category}
          </span>
          {project.statusBadge && (
            <span style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: 6, 
              fontSize: "0.7rem", 
              fontWeight: 600, 
              padding: "4px 10px", 
              background: "rgba(34, 197, 94, 0.1)", 
              color: "#22c55e", 
              borderRadius: "20px", 
              border: "1px solid rgba(34, 197, 94, 0.3)" 
            }}>
              <span style={{ width: 6, height: 6, background: "#22c55e", borderRadius: "50%", boxShadow: "0 0 8px rgba(34,197,94,0.6)" }}></span>
              {project.statusBadge.replace(/🟢|🟡|🔵|🟣/g, "").trim()}
            </span>
          )}
        </div>

        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 700, marginBottom: "12px", color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
          {(() => {
            const words = project.title.split(" ");
              if (words.length <= 1) {
                return <span style={{ background: "linear-gradient(135deg, #fff, var(--orange-soft))", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>{project.title}</span>;
              }
              const lastWord = words.pop();
              return (
                <>
                  {words.join(" ")}{" "}
                  <span style={{ background: "linear-gradient(135deg, #fff, var(--orange-soft))", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    {lastWord}
                  </span>
                </>
              );
          })()}
        </h2>
        
        <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: "12px", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {project.description}
        </p>

        {project.features && Array.isArray(project.features) && project.features.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
            {project.features.slice(0, 3).map((feat: string, idx: number) => (
              <span key={idx} style={{ padding: "4px 10px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "6px", fontSize: "0.75rem", color: "rgba(255,255,255,0.7)" }}>
                {feat}
              </span>
            ))}
          </div>
        )}

        <div style={{ marginTop: "auto", paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <Link href={`/projects/${project.slug}`} style={{ 
            display: "inline-flex", 
            alignItems: "center", 
            justifyContent: "space-between",
            width: "100%",
            padding: "12px 20px",
            background: isHovered ? "linear-gradient(135deg, var(--orange-vivid), var(--orange-soft))" : "rgba(255,255,255,0.03)",
            color: isHovered ? "#fff" : "rgba(255,255,255,0.9)",
            border: isHovered ? "1px solid transparent" : "1px solid rgba(255,255,255,0.1)",
            fontSize: "0.95rem",
            fontWeight: 600,
            borderRadius: "12px",
            textDecoration: "none",
            transition: "all 0.3s ease"
          }}>
            Projeyi İncele
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
