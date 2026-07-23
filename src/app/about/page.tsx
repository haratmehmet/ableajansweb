import { buildMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Zap, Cpu, Rocket, HeartHandshake, CheckCircle2 } from "lucide-react";
import { prisma } from "@/lib/prisma";

import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const setting = await prisma.siteSetting.findUnique({
    where: { key: 'page_title_about' }
  });
  return buildMetadata({
    title: setting?.value || "Hakkımızda",
    description: "Able Ajans olarak işletmelerin ihtiyaçlarına özel yazılım, web teknolojileri ve dijital çözümler geliştiriyoruz.",
    path: "/about",
  });
}

export default async function AboutPage() {
  const dbContent = await prisma.aboutContent.findMany();
  const contentMap = dbContent.reduce((acc, item) => {
    acc[item.section] = item.content as any;
    return acc;
  }, {} as Record<string, any>);

  const hero = contentMap.hero || {
    title: "Yazılım Geliştiriyor, İşletmeleri Dijital Geleceğe Taşıyoruz.",
    subtitle: "Able Ajans olarak işletmelerin ihtiyaçlarına özel yazılım, web teknolojileri ve dijital çözümler geliştiriyoruz. Hedefimiz yalnızca projeler teslim etmek değil, uzun vadeli teknoloji iş ortaklığı kurmaktır."
  };

  const renderGradientTitle = (title: string) => {
    if (!title) return null;
    const words = title.split(" ");
    if (words.length <= 1) {
      return <span style={{ background: "linear-gradient(135deg, #fff, var(--orange-soft))", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>{title}</span>;
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
  };

  const whoWeAre = contentMap.who_we_are || {
    eyebrow: "Biz Kimiz?",
    title: "Uçtan Uca Dijital Dönüşüm",
    description: "Able Ajans, modern teknolojileri kullanarak işletmeler için ölçeklenebilir yazılım sistemleri geliştiren bir teknoloji şirketidir. Web platformlarından özel otomasyonlara, yapay zekâ destekli çözümlerden SEO ve dijital pazarlamaya kadar tüm süreçleri yönetiyoruz.",
    node1_title: "Kusursuz Mimari",
    node1_desc: "İşletmenizin yapısına en uygun, büyümeye hazır modern teknoloji altyapısı.",
    node2_title: "Sistem Entegrasyonu",
    node2_desc: "Farklı platformların kusursuz ve senkronize çalışmasını sağlayan akıllı otomasyonlar.",
    node3_title: "Veri Güvenliği & Hız",
    node3_desc: "Kesintisiz hizmet veren, yüksek performanslı ve güvenli dijital ürünler."
  };

  const whyUs = contentMap.why_us || {
    title: "Neden Able?",
    item1_title: "Özel Yazılım",
    item1_desc: "Her işletmeye özel, kuruma tam uyum sağlayan çözümler geliştiriyoruz.",
    item2_title: "Modern Teknolojiler",
    item2_desc: "Next.js, TypeScript, PostgreSQL gibi endüstri standartlarını kullanıyoruz.",
    item3_title: "Ölçeklenebilir Sistemler",
    item3_desc: "İşletmeniz büyüdükçe sisteminiz de aynı hızda ve sorunsuz büyür.",
    item4_title: "Uzun Vadeli İş Ortaklığı",
    item4_desc: "Projeyi teslim edip kaybolmuyoruz; sürekli teknik destek sağlıyoruz."
  };

  const timeline = contentMap.timeline || {
    title: "Çalışma Sürecimiz",
    step1_title: "İhtiyacı Dinliyoruz",
    step1_desc: "İşletmenizin hedeflerini ve dijital gereksinimlerini derinlemesine analiz ederiz.",
    step2_title: "Planlıyoruz",
    step2_desc: "En doğru teknoloji yığınını seçer, ölçeklenebilir sistem mimarisini çizeriz.",
    step3_title: "Tasarlıyoruz",
    step3_desc: "Modern, estetik ve kullanıcı deneyimi (UX) odaklı premium arayüzler tasarlarız.",
    step4_title: "Geliştiriyoruz",
    step4_desc: "Güncel teknolojilerle kodlamayı tamamlar ve modüler bir altyapı kurarız.",
    step5_title: "Yayınlıyoruz",
    step5_desc: "Tüm performans ve güvenlik testlerini tamamlayıp projeyi canlıya alırız.",
    step6_title: "Destek Veriyoruz",
    step6_desc: "Teslimat sonrası bakım, güncelleme ve iyileştirme desteklerimizi sürdürürüz."
  };

  const values = contentMap.values || {
    title: "Değerlerimiz",
    value1_title: "Kalite ve Mühendislik",
    value1_desc: "Her satır kod, yüksek standartlarda, sürdürülebilir ve işletmeniz büyüdükçe ölçeklenebilir olacak şekilde tasarlanır ve titizlikle yazılır.",
    value2_title: "Şeffaflık",
    value2_desc: "Sürecin her aşamasında açık iletişim kurar, düzenli raporlama yapar ve sürprizlerden uzak, net bir proje yönetimi sağlarız.",
    value3_title: "Süreklilik",
    value3_desc: "Projelerimizi sadece teslim edip bırakmaz; uzun soluklu bir vizyonla bakım, onarım ve teknik desteğimizi kesintisiz sürdürürüz."
  };

  const cta = contentMap.cta || {
    title: "Fikrinizi Gerçeğe Dönüştürmeye Hazır mısınız?",
    buttonText: "Projeni Başlat"
  };

  return (
    <div style={{ paddingTop: 0, minHeight: "100vh", position: "relative" }}>
      <style>{`
        .corporate-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          padding: 32px;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
        }
        
        .corporate-card:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }

        .step-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 24px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .step-item:hover {
          border-color: rgba(245, 90, 0, 0.3);
          background: rgba(245, 90, 0, 0.02);
        }

        .step-number {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--orange-vivid);
          background: rgba(245, 90, 0, 0.1);
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: var(--orange-vivid);
          color: #fff;
          font-weight: 500;
          font-size: 1rem;
          padding: 12px 32px;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .cta-button:hover {
          background: #e65c00;
          transform: translateY(-1px);
        }

        .grid-4 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .grid-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .grid-2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
        }
        
        @keyframes pulse-code {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @keyframes travel-down {
          0% { top: -20%; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }

        @keyframes pulse-dot {
          0%, 100% { transform: scale(1); opacity: 0.5; box-shadow: 0 0 0px var(--orange-vivid); }
          50% { transform: scale(1.2); opacity: 1; box-shadow: 0 0 12px var(--orange-vivid); }
        }

        .flow-visual {
          position: relative;
          padding-left: 40px;
        }

        .flow-line-main {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 1px;
          background: linear-gradient(to bottom, transparent, rgba(245, 90, 0, 0.2), transparent);
        }

        .flow-light-traveler {
          position: absolute;
          width: 3px;
          height: 60px;
          background: linear-gradient(to bottom, transparent, var(--orange-vivid), transparent);
          left: -1px;
          border-radius: 10px;
          animation: travel-down 3s infinite ease-in-out;
        }

        .flow-node {
          position: relative;
          margin-bottom: 48px;
          opacity: 0.9;
          transition: all 0.3s ease;
        }
        
        .flow-node:hover {
          opacity: 1;
          transform: translateX(5px);
        }

        .flow-node:last-child {
          margin-bottom: 0;
        }

        .flow-dot {
          position: absolute;
          left: -44px;
          top: 10px;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: var(--bg-default);
          border: 2px solid var(--orange-vivid);
          animation: pulse-dot 3s infinite;
        }

        .flow-node:nth-child(2) .flow-dot { animation-delay: 1s; }
        .flow-node:nth-child(3) .flow-dot { animation-delay: 2s; }
        
        .glass-panel {
          background: rgba(10, 10, 10, 0.4);
          backdrop-filter: blur(40px);
          -webkit-backdrop-filter: blur(40px);
          padding: 24px;
          border-radius: 24px;
          border: 1px solid rgba(255,255,255,0.05);
          box-shadow: 0 40px 100px -20px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.02);
          position: relative;
          overflow: hidden;
          transition: all 0.4s ease;
          display: flex;
          flex-direction: column;
        }

        .glass-panel:hover {
          transform: translateY(-5px);
          border-color: rgba(245, 90, 0, 0.2);
        }

        .timeline-container {
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
        }

        .timeline-line {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, transparent, rgba(245, 90, 0, 0.3), transparent);
          transform: translateX(-50%);
        }

        .timeline-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
          width: 100%;
        }

        .timeline-item:nth-child(even) {
          flex-direction: row-reverse;
        }

        .timeline-content {
          width: 45%;
          background: rgba(10, 10, 10, 0.4);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 24px;
          padding: 32px;
          position: relative;
          transition: all 0.3s ease;
        }

        .timeline-content:hover {
          border-color: rgba(245, 90, 0, 0.3);
          transform: translateY(-3px);
          box-shadow: 0 20px 40px -10px rgba(245, 90, 0, 0.1);
        }

        .timeline-dot {
          width: 24px;
          height: 24px;
          background: var(--bg-default);
          border: 4px solid var(--orange-vivid);
          border-radius: 50%;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          box-shadow: 0 0 20px rgba(245, 90, 0, 0.4);
        }

        .about-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }

        .about-grid-4 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        @media (max-width: 1024px) {
          .about-grid-4 { grid-template-columns: repeat(2, 1fr); gap: 24px; }
          .about-grid-2 { gap: 40px; }
        }

        @media (max-width: 768px) {
          .about-grid-2 { grid-template-columns: 1fr; gap: 40px; }
          .timeline-line { left: 30px; }
          .timeline-dot { left: 30px; }
          .timeline-item { flex-direction: column !important; align-items: flex-end; }
          .timeline-content { width: calc(100% - 70px); }
          .bento-grid { grid-template-columns: 1fr !important; }
          .values-stack .glass-panel { flex-direction: column !important; align-items: flex-start !important; gap: 16px !important; }
          .flow-visual { margin-top: 20px; }
          .flow-node { margin-bottom: 32px; }
          .about-header-text { font-size: 2rem !important; }
        }

        @media (max-width: 640px) {
          .about-grid-4 { grid-template-columns: 1fr; }
          .about-grid-2 { gap: 32px; }
        }
      `}</style>

      {/* 1. Hero Section */}
      <section style={{ position: "relative", paddingTop: "140px", paddingBottom: "40px", display: "flex", justifyContent: "center" }}>
        <div style={{ maxWidth: 1160, width: "100%", padding: "0 24px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.4rem", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 20, maxWidth: 800 }}>
            {hero.title.includes('\n') ? (
              hero.title.split('\n').map((line: string, i: number) => (
                <span key={i}>
                  {i === 0 ? line : <span style={{ color: "var(--orange-vivid)" }}>{line}</span>}
                  {i < hero.title.split('\n').length - 1 && <br />}
                </span>
              ))
            ) : (
              hero.title.split(' Dijital Geleceğe').map((part: string, i: number, arr: any[]) => 
                i === 0 && arr.length > 1 ? (
                  <span key={i}>{part} <span style={{ color: "var(--orange-vivid)" }}>Dijital Geleceğe</span></span>
                ) : (
                  <span key={i}>{part}</span>
                )
              )
            )}
          </h1>
          <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.6, maxWidth: 700 }}>
            {hero.subtitle}
          </p>
        </div>
      </section>

      {/* 2. Biz Kimiz? */}
      <section style={{ padding: "40px 24px", display: "flex", justifyContent: "center" }}>
        <div className="about-grid-2" style={{ maxWidth: 1160, width: "100%" }}>
          <div>
            <div style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 600, color: "var(--orange-vivid)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>
              {whoWeAre.eyebrow}
            </div>
            <h2 className="about-header-text" style={{ fontFamily: "var(--font-display)", fontSize: "2.4rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 16, letterSpacing: "-0.01em", lineHeight: 1.2 }}>
              {renderGradientTitle(whoWeAre.title)}
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.7 }}>
              {whoWeAre.description}
            </p>
          </div>
          
          <div style={{ position: "relative", padding: "20px 0" }}>
            <div style={{ position: "absolute", top: "10%", right: "10%", width: "80%", height: "80%", background: "radial-gradient(circle, rgba(245, 90, 0, 0.15) 0%, transparent 60%)", filter: "blur(40px)", zIndex: 0 }} />
            
            <div className="flow-visual">
              <div className="flow-line-main">
                 <div className="flow-light-traveler"></div>
              </div>
              
              <div className="flow-node">
                <div className="flow-dot"></div>
                <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 600, color: "var(--text-primary)", letterSpacing: "0.01em", marginBottom: 6 }}>{renderGradientTitle(whoWeAre.node1_title)}</h4>
                <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{whoWeAre.node1_desc}</p>
              </div>

              <div className="flow-node">
                <div className="flow-dot"></div>
                <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 600, color: "var(--text-primary)", letterSpacing: "0.01em", marginBottom: 6 }}>{renderGradientTitle(whoWeAre.node2_title)}</h4>
                <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{whoWeAre.node2_desc}</p>
              </div>

              <div className="flow-node">
                <div className="flow-dot"></div>
                <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 600, color: "var(--text-primary)", letterSpacing: "0.01em", marginBottom: 6 }}>{renderGradientTitle(whoWeAre.node3_title)}</h4>
                <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{whoWeAre.node3_desc}</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Neden Able? (Premium Contact Page Style) */}
      <section style={{ padding: "32px 24px", display: "flex", justifyContent: "center" }}>
        <div style={{ maxWidth: 1160, width: "100%", display: "flex", flexDirection: "column", gap: 32 }}>
          
          <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.4rem", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
              {renderGradientTitle(whyUs.title)}
            </h2>
          </div>

          <div className="about-grid-4">
            <div className="glass-panel" style={{ padding: "28px 20px" }}>
              <div style={{ position: "absolute", top: "-20%", left: "-20%", width: "70%", height: "70%", background: "radial-gradient(circle, rgba(245, 90, 0, 0.15) 0%, transparent 60%)", pointerEvents: "none", filter: "blur(40px)" }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(245, 90, 0, 0.1)", border: "1px solid rgba(245, 90, 0, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <Zap size={20} color="var(--orange-vivid)" />
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 8 }}>{whyUs.item1_title}</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.5 }}>{whyUs.item1_desc}</p>
              </div>
            </div>
            
            <div className="glass-panel" style={{ padding: "28px 20px" }}>
              <div style={{ position: "absolute", top: "-20%", left: "-20%", width: "70%", height: "70%", background: "radial-gradient(circle, rgba(245, 90, 0, 0.15) 0%, transparent 60%)", pointerEvents: "none", filter: "blur(40px)" }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(245, 90, 0, 0.1)", border: "1px solid rgba(245, 90, 0, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <Cpu size={20} color="var(--orange-vivid)" />
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 8 }}>{whyUs.item2_title}</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.5 }}>{whyUs.item2_desc}</p>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: "28px 20px" }}>
              <div style={{ position: "absolute", top: "-20%", left: "-20%", width: "70%", height: "70%", background: "radial-gradient(circle, rgba(245, 90, 0, 0.15) 0%, transparent 60%)", pointerEvents: "none", filter: "blur(40px)" }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(245, 90, 0, 0.1)", border: "1px solid rgba(245, 90, 0, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <Rocket size={20} color="var(--orange-vivid)" />
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 8 }}>{whyUs.item3_title}</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.5 }}>{whyUs.item3_desc}</p>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: "28px 20px" }}>
              <div style={{ position: "absolute", top: "-20%", left: "-20%", width: "70%", height: "70%", background: "radial-gradient(circle, rgba(245, 90, 0, 0.15) 0%, transparent 60%)", pointerEvents: "none", filter: "blur(40px)" }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(245, 90, 0, 0.1)", border: "1px solid rgba(245, 90, 0, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <HeartHandshake size={20} color="var(--orange-vivid)" />
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 8 }}>{whyUs.item4_title}</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.5 }}>{whyUs.item4_desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Çalışma Sürecimiz (Orijinal Timeline Tasarımı) */}
      <section style={{ padding: "32px 24px", display: "flex", justifyContent: "center" }}>
        <div style={{ maxWidth: 1160, width: "100%", display: "flex", flexDirection: "column", gap: 40 }}>
          <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.4rem", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
              {renderGradientTitle(timeline.title)}
            </h2>
          </div>

          <div className="timeline-container">
            <div className="timeline-line"></div>
            
            {[
              { num: "01", title: timeline.step1_title, desc: timeline.step1_desc },
              { num: "02", title: timeline.step2_title, desc: timeline.step2_desc },
              { num: "03", title: timeline.step3_title, desc: timeline.step3_desc },
              { num: "04", title: timeline.step4_title, desc: timeline.step4_desc },
              { num: "05", title: timeline.step5_title, desc: timeline.step5_desc },
              { num: "06", title: timeline.step6_title, desc: timeline.step6_desc }
            ].map((step, idx) => (
              <div key={idx} className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "4px 14px", background: "transparent", border: "1px solid rgba(245, 90, 0, 0.3)", borderRadius: 100, color: "var(--orange-vivid)", fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "0.75rem", letterSpacing: "0.15em", marginBottom: 16 }}>
                    ADIM {step.num}
                  </div>
                  <h3 style={{ fontSize: "1.3rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 8, fontFamily: "var(--font-display)" }}>{step.title}</h3>
                  <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Değerlerimiz (Premium Bento Grid) */}
      <section style={{ padding: "32px 24px", display: "flex", justifyContent: "center" }}>
        <div style={{ maxWidth: 1160, width: "100%", display: "flex", flexDirection: "column", gap: 32 }}>
          
          <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.4rem", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
              {renderGradientTitle(values.title)}
            </h2>
          </div>

          <div className="values-stack" style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 900, margin: "0 auto", width: "100%" }}>
            
            <div className="glass-panel" style={{ padding: "24px 32px", flexDirection: "row", alignItems: "flex-start", gap: 32, borderRadius: 20 }}>
               <div style={{ position: "absolute", bottom: "-40%", right: "-20%", width: "60%", height: "100%", background: "radial-gradient(circle, rgba(245, 90, 0, 0.1) 0%, transparent 60%)", pointerEvents: "none", filter: "blur(40px)" }} />
               <div style={{ fontSize: "2.5rem", fontWeight: 700, color: "rgba(245, 90, 0, 0.15)", fontFamily: "var(--font-display)", lineHeight: 1 }}>01</div>
               <div style={{ flex: 1, position: "relative", zIndex: 1, marginTop: 4 }}>
                 <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 8 }}>{values.value1_title}</h3>
                 <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6 }}>{values.value1_desc}</p>
               </div>
            </div>

            <div className="glass-panel" style={{ padding: "24px 32px", flexDirection: "row", alignItems: "flex-start", gap: 32, borderRadius: 20 }}>
               <div style={{ fontSize: "2.5rem", fontWeight: 700, color: "rgba(245, 90, 0, 0.15)", fontFamily: "var(--font-display)", lineHeight: 1 }}>02</div>
               <div style={{ flex: 1, position: "relative", zIndex: 1, marginTop: 4 }}>
                 <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 8 }}>{values.value2_title}</h3>
                 <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6 }}>{values.value2_desc}</p>
               </div>
            </div>

            <div className="glass-panel" style={{ padding: "24px 32px", flexDirection: "row", alignItems: "flex-start", gap: 32, borderRadius: 20 }}>
               <div style={{ fontSize: "2.5rem", fontWeight: 700, color: "rgba(245, 90, 0, 0.15)", fontFamily: "var(--font-display)", lineHeight: 1 }}>03</div>
               <div style={{ flex: 1, position: "relative", zIndex: 1, marginTop: 4 }}>
                 <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 8 }}>{values.value3_title}</h3>
                 <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6 }}>{values.value3_desc}</p>
               </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. Büyük CTA */}
      <section style={{ background: "rgba(10, 10, 10, 0.8)", padding: "80px 24px", display: "flex", justifyContent: "center", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 800, width: "100%", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 24, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
            {cta.title}
          </h2>
          <Link href="/contact" className="cta-button">
            {cta.buttonText}
          </Link>
        </div>
      </section>

    </div>
  );
}
