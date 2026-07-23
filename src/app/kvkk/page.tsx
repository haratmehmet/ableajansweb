import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "KVKK Aydınlatma Metni",
  description: "Able Ajans Kişisel Verilerin Korunması Kanunu (KVKK) Aydınlatma Metni.",
  path: "/kvkk",
});

export default function KvkkPage() {
  return (
    <div style={{ paddingTop: 0, minHeight: "80vh", paddingBottom: 100 }}>
      <section className="contact-section" aria-labelledby="kvkk-heading">
        <div className="section-header" style={{ paddingBottom: 32 }}>
          <p className="section-eyebrow">Yasal Bilgilendirme</p>
          <h2 className="section-title" id="kvkk-heading" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>
            KVKK Aydınlatma <span className="accent">Metni</span>
          </h2>
        </div>

        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ background: "var(--bg-surface)", padding: "48px", borderRadius: "var(--radius-xl)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "0.95rem" }}>
            <h3 style={{ color: "var(--text-primary)", fontSize: "1.2rem", marginBottom: 16 }}>1. Veri Sorumlusu</h3>
            <p style={{ marginBottom: 24 }}>
              Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, kişisel verileriniz veri sorumlusu sıfatıyla Able Ajans tarafından aşağıda açıklanan kapsamda işlenebilecektir.
            </p>

            <h3 style={{ color: "var(--text-primary)", fontSize: "1.2rem", marginBottom: 16 }}>2. Kişisel Verilerin Hangi Amaçla İşleneceği</h3>
            <p style={{ marginBottom: 24 }}>
              Toplanan kişisel verileriniz, ajansımız tarafından sunulan ürün ve hizmetlerden sizleri faydalandırmak için gerekli çalışmaların iş birimlerimiz tarafından yapılması, iletişim faaliyetlerinin yürütülmesi ve taleplerinizin karşılanması amaçlarıyla KVKK'nın 5. ve 6. maddelerinde belirtilen kişisel veri işleme şartları ve amaçları dahilinde işlenecektir.
            </p>

            <h3 style={{ color: "var(--text-primary)", fontSize: "1.2rem", marginBottom: 16 }}>3. Kişisel Veri Toplamanın Yöntemi ve Hukuki Sebebi</h3>
            <p style={{ marginBottom: 24 }}>
              Kişisel verileriniz, iletişim formları, e-posta, telefon ve WhatsApp gibi elektronik ve fiziki ortamlar aracılığıyla, hukuki yükümlülüklerimizi yerine getirmek ve sizlere daha iyi hizmet verebilmek amacıyla toplanmaktadır.
            </p>

            <h3 style={{ color: "var(--text-primary)", fontSize: "1.2rem", marginBottom: 16 }}>4. İlgili Kişinin Hakları</h3>
            <p>
              KVKK'nın 11. maddesi uyarınca, kişisel veri sahibi olarak veri sorumlusuna başvurarak kendinizle ilgili kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme ve diğer haklarınızı kullanma yetkisine sahipsiniz.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
