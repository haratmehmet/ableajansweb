import { buildMetadata } from "@/lib/metadata";
import { 
  Code2, 
  Globe, 
  ShoppingCart, 
  Bot, 
  TrendingUp, 
  Megaphone, 
  Settings, 
  Database, 
  Share2, 
  Camera 
} from "lucide-react";

import { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export async function generateMetadata(): Promise<Metadata> {
  const setting = await prisma.siteSetting.findUnique({
    where: { key: 'page_title_solutions' }
  });
  return buildMetadata({
    title: setting?.value || "Çözümler",
    description: "Her işletmenin ihtiyacı farklıdır. Hazır kalıplar yerine ölçeklenebilir ve sürdürülebilir çözümler geliştiriyoruz.",
    path: "/solutions",
  });
}

export default async function SolutionsPage() {
  const dbSolutions = await prisma.solutionItem.findMany({
    where: { isVisible: true },
    orderBy: { order: "asc" }
  });

  const iconMap: Record<string, React.ReactNode> = {
    code: <Code2 size={24} color="var(--orange-vivid)" />,
    ecommerce: <ShoppingCart size={24} color="var(--orange-vivid)" />,
    web: <Globe size={24} color="var(--orange-vivid)" />,
    automation: <Bot size={24} color="var(--orange-vivid)" />,
    strategy: <Settings size={24} color="var(--orange-vivid)" />,
    marketing: <TrendingUp size={24} color="var(--orange-vivid)" />,
    social: <Share2 size={24} color="var(--orange-vivid)" />,
    drone: <Camera size={24} color="var(--orange-vivid)" />
  };

  const splitTitle = (t: string) => {
    const parts = t.split(" / ");
    if (parts.length > 1) {
      return { title1: parts[0], title2: parts.slice(1).join(" ") };
    }
    return { title1: t, title2: "" };
  };

  const solutionRows = [];
  for (let i = 0; i < dbSolutions.length; i += 2) {
    const leftRaw = dbSolutions[i];
    const rightRaw = i + 1 < dbSolutions.length ? dbSolutions[i + 1] : null;

    const leftTitle = splitTitle(leftRaw.title);
    const row: any = {
      left: {
        num: leftRaw.number,
        icon: iconMap[leftRaw.icon] || iconMap["web"],
        title1: leftTitle.title1,
        title2: leftTitle.title2,
        desc: leftRaw.description
      }
    };
    
    if (rightRaw) {
      const rightTitle = splitTitle(rightRaw.title);
      row.right = {
        num: rightRaw.number,
        icon: iconMap[rightRaw.icon] || iconMap["web"],
        title1: rightTitle.title1,
        title2: rightTitle.title2,
        desc: rightRaw.description
      };
    }
    
    solutionRows.push(row);
  }

  return (
    <div style={{ paddingTop: 0, minHeight: "100vh", position: "relative" }}>
      <style>{`
        /* Timeline Container */
        .solutions-timeline {
          position: relative;
          max-width: 1160px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 60px;
        }

        /* Ortadaki Estetik Çizgi */
        .solutions-timeline::before {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          width: 2px;
          background: linear-gradient(180deg, transparent, rgba(245, 90, 0, 0.4), rgba(245, 90, 0, 0.1), transparent);
          transform: translateX(-50%);
          z-index: 0;
        }

        .timeline-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          position: relative;
          z-index: 1;
        }

        /* Ortadaki Işıltılı Nokta */
        .timeline-dot {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--bg-default);
          border: 2px solid var(--orange-vivid);
          box-shadow: 0 0 20px rgba(245, 90, 0, 0.6);
          z-index: 2;
          transition: all 0.4s ease;
        }

        .timeline-row:hover .timeline-dot {
          background: var(--orange-vivid);
          box-shadow: 0 0 30px rgba(245, 90, 0, 1);
          transform: translate(-50%, -50%) scale(1.3);
        }

        /* Kutu Taşıyıcı */
        .timeline-content {
          width: calc(50% - 40px);
        }

        /* Orijinal Glass Panel Tasarımı */
        .glass-panel {
          background: rgba(10, 10, 10, 0.4);
          backdrop-filter: blur(40px);
          -webkit-backdrop-filter: blur(40px);
          padding: 36px 32px;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.05);
          box-shadow: 0 40px 100px -20px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.02);
          position: relative;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          width: 100%;
          height: 100%;
        }

        .glass-panel:hover {
          transform: translateY(-6px);
          border-color: rgba(245, 90, 0, 0.25);
          box-shadow: 0 40px 100px -20px rgba(245, 90, 0, 0.15), inset 0 0 0 1px rgba(245, 90, 0, 0.1);
        }

        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          width: 100%;
          margin-bottom: 24px;
        }

        .icon-container {
          width: 54px;
          height: 54px;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.5s ease;
        }

        .glass-panel:hover .icon-container {
          background: rgba(245, 90, 0, 0.1);
          border-color: rgba(245, 90, 0, 0.3);
          transform: scale(1.08) rotate(-5deg);
        }

        .elegant-num {
          font-family: var(--font-display);
          font-size: 1.1rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.2);
          letter-spacing: 0.05em;
          transition: all 0.5s ease;
        }

        .glass-panel:hover .elegant-num {
          color: var(--orange-vivid);
        }

        .panel-title {
          font-family: var(--font-display);
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 12px;
          letter-spacing: -0.01em;
          color: var(--text-primary);
        }

        .panel-title .accent {
          background: linear-gradient(135deg, #fff, var(--orange-soft));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .panel-desc {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
          font-weight: 300;
        }

        @media (max-width: 1024px) {
          .solutions-timeline::before { left: 24px; }
          .timeline-dot { display: none; }
          .timeline-row { flex-direction: column; gap: 32px; }
          .timeline-content { width: calc(100% - 60px); margin-left: auto; }
        }
      `}</style>

      {/* Hero Section */}
      <section style={{ position: "relative", paddingTop: "140px", paddingBottom: "60px", display: "flex", justifyContent: "center" }}>
        <div style={{ maxWidth: 1160, width: "100%", padding: "0 24px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.4rem", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 20, maxWidth: 800 }}>
            İşletmenize Özel <span style={{ color: "var(--orange-vivid)" }}>Dijital Çözümler</span>
          </h1>
          <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", lineHeight: 1.6, maxWidth: 700 }}>
            Her işletmenin ihtiyacı farklıdır. Hazır kalıplar yerine ölçeklenebilir, sürdürülebilir ve ihtiyaçlarınıza uygun çözümler geliştiriyoruz.
          </p>
        </div>
      </section>

      {/* Parallel Timeline Grid Section */}
      <section style={{ padding: "0 24px 100px", display: "flex", justifyContent: "center" }}>
        <div style={{ maxWidth: 1160, width: "100%" }}>
          <div className="solutions-timeline">
            {solutionRows.map((row, idx) => (
              <div key={idx} className="timeline-row">
                
                {/* Sol Kutu */}
                <div className="timeline-content">
                  <div className="glass-panel">
                    <div style={{ position: "absolute", top: "-20%", left: "-20%", width: "70%", height: "70%", background: "radial-gradient(circle, rgba(245, 90, 0, 0.08) 0%, transparent 60%)", pointerEvents: "none", filter: "blur(40px)" }} />
                    <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
                      <div className="panel-header">
                        <div className="icon-container">
                          {row.left.icon}
                        </div>
                        <div className="elegant-num">{row.left.num}</div>
                      </div>
                      <h3 className="panel-title">{row.left.title1} <span className="accent">{row.left.title2}</span></h3>
                      <p className="panel-desc">{row.left.desc}</p>
                    </div>
                  </div>
                </div>

                {/* Ortadaki Işıltılı Nokta */}
                <div className="timeline-dot"></div>
                
                {/* Sağ Kutu */}
                {row.right ? (
                  <div className="timeline-content">
                    <div className="glass-panel">
                      <div style={{ position: "absolute", top: "-20%", left: "-20%", width: "70%", height: "70%", background: "radial-gradient(circle, rgba(245, 90, 0, 0.08) 0%, transparent 60%)", pointerEvents: "none", filter: "blur(40px)" }} />
                      <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
                        <div className="panel-header">
                          <div className="icon-container">
                            {row.right.icon}
                          </div>
                          <div className="elegant-num">{row.right.num}</div>
                        </div>
                        <h3 className="panel-title">{row.right.title1} {row.right.title2 && <span className="accent">{row.right.title2}</span>}</h3>
                        <p className="panel-desc">{row.right.desc}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="timeline-content"></div>
                )}

              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
