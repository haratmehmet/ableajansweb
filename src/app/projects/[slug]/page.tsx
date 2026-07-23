import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ExternalLink } from "lucide-react";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = await prisma.project.findUnique({
    where: { slug: resolvedParams.slug }
  });

  if (!project) return { title: "Proje Bulunamadı" };
  return {
    title: `${project.title} - Kasa İnceleme`,
    description: project.description
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = await prisma.project.findUnique({
    where: { slug: resolvedParams.slug }
  });

  if (!project || !project.isVisible) {
    notFound();
  }

  // Parse JSON arrays
  const features = Array.isArray(project.features) ? project.features : [];
  const results = Array.isArray(project.results) ? project.results : [];

  // Auto dual-color title (last word is gradient)
  const renderTitle = () => {
    if (!project.title) return null;
    const words = project.title.split(" ");
    if (words.length <= 1) {
      return <span style={{ background: "linear-gradient(135deg, #fff, var(--orange-soft))", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", display: "inline-block" }}>{project.title}</span>;
    }
    const lastWord = words.pop();
    return (
      <>
        {words.join(" ")}{" "}
        <span style={{ 
          background: "linear-gradient(135deg, #fff, var(--orange-soft))", 
          WebkitBackgroundClip: "text", 
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          display: "inline-block"
        }}>
          {lastWord}
        </span>
      </>
    );
  };

  return (
    <div style={{ paddingTop: "120px", minHeight: "100vh", position: "relative" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 24px 100px" }}>
        
        {/* Header (Back button, Title, Badge) */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginBottom: 40 }}>
          <Link href="/projects" style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--text-secondary)", textDecoration: "none", marginBottom: 32, fontSize: "0.95rem", transition: "color 0.2s" }} className="hover-orange">
            <ArrowLeft size={16} />
            Projeler'e Dön
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.4rem", fontWeight: 700, margin: 0, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
              {renderTitle()}
            </h1>
            {project.statusBadge && (
              <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.85rem", fontWeight: 600, padding: "8px 16px", background: "rgba(34, 197, 94, 0.1)", color: "#22c55e", borderRadius: "30px", border: "1px solid rgba(34, 197, 94, 0.3)" }}>
                <span style={{ width: 8, height: 8, background: "#22c55e", borderRadius: "50%", boxShadow: "0 0 8px rgba(34,197,94,0.6)" }}></span>
                {project.statusBadge.replace(/🟢|🟡|🔵|🟣/g, "").trim()}
              </span>
            )}
          </div>
          
          <p style={{ fontSize: "1.2rem", color: "var(--text-secondary)", maxWidth: 800, lineHeight: 1.6, margin: 0 }}>
            {project.description}
          </p>
          
          {project.projectUrl && (
            <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 24, padding: "12px 24px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", textDecoration: "none", borderRadius: "12px", fontSize: "0.95rem", transition: "all 0.2s" }} className="hover-bg-light">
              Canlı Projeyi Ziyaret Et <ExternalLink size={16} />
            </a>
          )}
        </div>

        {/* Problem & Solution (Proje Özeti) */}
        {(project.problem || project.solution) && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32, marginBottom: 60 }}>
            {project.problem && (
              <div>
                <h3 style={{ fontSize: "1.1rem", color: "var(--orange-vivid)", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 6, height: 6, background: "var(--orange-vivid)", borderRadius: "50%" }}></span>
                  Problem
                </h3>
                <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  {project.problem}
                </p>
              </div>
            )}
            {project.solution && (
              <div>
                <h3 style={{ fontSize: "1.1rem", color: "#22c55e", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 6, height: 6, background: "#22c55e", borderRadius: "50%" }}></span>
                  Çözüm
                </h3>
                <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  {project.solution}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Features */}
        {features.length > 0 && (
          <div style={{ marginBottom: 60, background: "rgba(14,16,20,0.4)", backdropFilter: "blur(20px)", padding: "24px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.05)" }}>
            <h3 style={{ fontSize: "1.2rem", color: "var(--text-primary)", marginBottom: 20 }}>Özellikler & Teknolojiler</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 10 }}>
              {features.map((feat: any, idx: number) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.85)", fontSize: "0.8rem", background: "rgba(255,255,255,0.02)", padding: "8px 12px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.03)" }}>
                  <CheckCircle2 size={14} color="var(--orange-vivid)" />
                  {feat}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {results.length > 0 && (
          <div style={{ marginBottom: 60 }}>
            <h3 style={{ fontSize: "1.2rem", color: "var(--text-primary)", marginBottom: 20, textAlign: "center" }}>Performans & Sonuçlar</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12 }}>
              {results.map((res: any, idx: number) => (
                <div key={idx} style={{ background: "linear-gradient(135deg, rgba(245, 90, 0, 0.08) 0%, rgba(255, 107, 26, 0.03) 100%)", border: "1px solid rgba(245, 90, 0, 0.15)", borderRadius: 12, padding: "16px 12px", textAlign: "center" }}>
                  <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 4, letterSpacing: "-0.01em" }}>
                    {res.metric}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--orange-soft)", fontWeight: 500 }}>
                    {res.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}


        
      </div>
    </div>
  );
}
