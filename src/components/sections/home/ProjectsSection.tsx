"use client";

import { motion } from "framer-motion";
import ProjectCard from "@/components/ui/ProjectCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ProjectsSection({ projects }: { projects: any[] }) {
  if (!projects || projects.length === 0) return null;

  return (
    <section className="projects-section" style={{ padding: "80px 20px", background: "var(--bg-default)", position: "relative" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          style={{ textAlign: "center", marginBottom: 60 }}
        >
          <p className="section-eyebrow">Neler Yaptık?</p>
          <h2 className="section-title">
            Öne Çıkan <span className="accent">Projelerimiz</span>
          </h2>
          <p className="section-subtitle" style={{ margin: "16px auto 0", maxWidth: 600 }}>
            Farklı sektörlerden markalar için ürettiğimiz kreatif ve yenilikçi çözümler.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "40px" }}>
          {projects.map((proj: any, i: number) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            >
              <ProjectCard project={proj} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7 }}
          style={{ textAlign: "center", marginTop: 60 }}
        >
          <Link href="/projects" className="btn-cta-secondary" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 30, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontWeight: 500, transition: "all 0.3s ease" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              e.currentTarget.style.borderColor = "var(--orange-vivid)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.03)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
            }}
          >
            Tüm Projeleri İncele
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
