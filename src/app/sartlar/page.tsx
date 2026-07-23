import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Kullanım Şartları",
  description: "Able Ajans Kullanım Şartları.",
  path: "/sartlar",
});

export default function SartlarPage() {
  return (
    <div style={{ paddingTop: 0, minHeight: "80vh", paddingBottom: 100 }}>
      <section className="contact-section" aria-labelledby="sartlar-heading">
        <div className="section-header" style={{ paddingBottom: 32 }}>
          <p className="section-eyebrow">Yasal Bilgilendirme</p>
          <h2 className="section-title" id="sartlar-heading" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>
            Kullanım <span className="accent">Şartları</span>
          </h2>
        </div>

        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ background: "var(--bg-surface)", padding: "48px", borderRadius: "var(--radius-xl)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "0.95rem" }}>
            <h3 style={{ color: "var(--text-primary)", fontSize: "1.2rem", marginBottom: 16 }}>1. Genel Hükümler</h3>
            <p style={{ marginBottom: 24 }}>
              Bu web sitesine erişim sağlayarak veya bu web sitesindeki hizmetleri kullanarak, burada belirtilen Kullanım Şartları'nı okuduğunuzu, anladığınızı ve kabul ettiğinizi beyan etmiş olursunuz.
            </p>

            <h3 style={{ color: "var(--text-primary)", fontSize: "1.2rem", marginBottom: 16 }}>2. Hizmetlerin Kullanımı</h3>
            <p style={{ marginBottom: 24 }}>
              Able Ajans, web sitesi üzerinde yer alan her türlü bilgiyi, materyali ve hizmeti önceden haber vermeksizin değiştirme, güncelleme veya kaldırma hakkını saklı tutar. Web sitemizi sadece yasal amaçlarla ve başkalarının haklarını ihlal etmeyecek şekilde kullanmayı kabul ediyorsunuz.
            </p>

            <h3 style={{ color: "var(--text-primary)", fontSize: "1.2rem", marginBottom: 16 }}>3. Fikri Mülkiyet Hakları</h3>
            <p style={{ marginBottom: 24 }}>
              Bu web sitesindeki tüm içerik, tasarım, grafikler, metinler, logolar ve yazılımlar Able Ajans'a aittir veya Able Ajans tarafından lisanslı olarak kullanılmaktadır. Önceden yazılı izin alınmaksızın kopyalanamaz, çoğaltılamaz veya dağıtılamaz.
            </p>

            <h3 style={{ color: "var(--text-primary)", fontSize: "1.2rem", marginBottom: 16 }}>4. Sorumluluğun Sınırlandırılması</h3>
            <p>
              Able Ajans, web sitesinin kullanımı veya kullanılamaması nedeniyle oluşabilecek doğrudan, dolaylı, özel veya sonuç niteliğindeki zararlardan sorumlu tutulamaz. Web sitesindeki bilgiler "olduğu gibi" sunulmakta olup, garanti verilmemektedir.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
