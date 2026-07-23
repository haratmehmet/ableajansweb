import { buildMetadata } from "@/lib/metadata";
import TerminalLoader from "@/components/ui/TerminalLoader";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import ProjectCard from "@/components/ui/ProjectCard";

import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const setting = await prisma.siteSetting.findUnique({
    where: { key: 'page_title_projects' }
  });
  return buildMetadata({
    title: setting?.value || "Projeler",
    description: "Portföyümüzü en güncel projelerimizle hazırlıyoruz. Tamamlanan yazılım projelerimizi inceleyebileceksiniz.",
    path: "/projects",
  });
}

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const [settingsData, projects] = await Promise.all([
    prisma.projectsContent.findUnique({ where: { section: "settings" } }),
    prisma.project.findMany({ where: { isVisible: true }, orderBy: { order: "asc" } })
  ]);

  // Default values if nothing in DB yet
  const settings = (settingsData?.content as any) || {
    showLoading: true,
    heroTitle: "Projelerimiz Çok Yakında / Geliştirme Sürecindeyiz",
    heroSubtitle: "Tamamladığımız yazılım projelerini ve başarı hikâyelerini özenle hazırlıyoruz. Çok yakında bu sayfada gerçek projelerimizi, kullandığımız teknolojileri ve elde edilen sonuçları inceleyebileceksiniz."
  };

  const splitTitle = (t: string) => {
    const parts = t.includes("\n") ? t.split("\n") : t.split(" / ");
    if (parts.length > 1) {
      return { title1: parts[0], title2: parts.slice(1).join("\n") };
    }
    return { title1: t, title2: "" };
  };

  const heroTitles = splitTitle(settings.heroTitle);
  return (
    <div style={{ paddingTop: 0, minHeight: "100vh", position: "relative" }}>
      {/* Hero Section */}
      <section style={{ position: "relative", paddingTop: "140px", paddingBottom: "60px", display: "flex", justifyContent: "center" }}>
        <div style={{ maxWidth: 1160, width: "100%", padding: "0 24px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
          
        <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 40px auto" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.4rem", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.01em", lineHeight: 1.2, marginBottom: 24, maxWidth: 900 }}>
            {heroTitles.title1} {heroTitles.title2 && <br />}
            {heroTitles.title2 && (
              <span className="accent" style={{ 
                background: "linear-gradient(135deg, var(--orange-vivid) 0%, var(--orange-soft) 100%)", 
                WebkitBackgroundClip: "text", 
                backgroundClip: "text", 
                WebkitTextFillColor: "transparent",
                whiteSpace: "pre-wrap"
              }}>
                {heroTitles.title2}
              </span>
            )}
          </h1>
          <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: 800, marginBottom: 0 }}>
            {settings.heroSubtitle}
          </p>
        </div>

          {settings.showLoading ? (
            <>
              <div style={{ width: "100%", marginBottom: 64 }}>
                <TerminalLoader />
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
                <p style={{ fontSize: "1.2rem", fontWeight: 500, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
                  Sizinde başarı hikâyeniz burada yer alabilir.
                </p>
                
                <Link href="/contact" className="btn-cta-primary" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 36px", background: "var(--orange-vivid)", color: "#fff", fontSize: "1rem", fontWeight: 600, borderRadius: "var(--radius-full)", transition: "all 0.3s ease" }}>
                  Projeni Başlat
                  <ArrowRight size={18} />
                </Link>
              </div>
            </>
          ) : (
            <div style={{ width: "100%", textAlign: "left", marginTop: 0 }}>
              {projects.length > 0 ? (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "40px" }}>
                  {projects.map((proj: any) => (
                    <ProjectCard key={proj.id} project={proj} />
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: "center", color: "var(--text-secondary)", padding: 40 }}>
                  Henüz proje eklenmemiş.
                </div>
              )}
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
