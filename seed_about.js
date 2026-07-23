const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const sections = [
    {
      section: 'hero',
      content: {
        title: 'Yazılım Geliştiriyor, İşletmeleri Dijital Geleceğe Taşıyoruz.',
        subtitle: 'Able Ajans olarak işletmelerin ihtiyaçlarına özel yazılım, web teknolojileri ve dijital çözümler geliştiriyoruz. Hedefimiz yalnızca projeler teslim etmek değil, uzun vadeli teknoloji iş ortaklığı kurmaktır.'
      }
    },
    {
      section: 'who_we_are',
      content: {
        eyebrow: 'Biz Kimiz?',
        title: 'Uçtan Uca Dijital Dönüşüm',
        description: 'Able Ajans, modern teknolojileri kullanarak işletmeler için ölçeklenebilir yazılım sistemleri geliştiren bir teknoloji şirketidir. Web platformlarından özel otomasyonlara, yapay zekâ destekli çözümlerden SEO ve dijital pazarlamaya kadar tüm süreçleri yönetiyoruz.',
        node1_title: 'Kusursuz Mimari',
        node1_desc: 'İşletmenizin yapısına en uygun, büyümeye hazır modern teknoloji altyapısı.',
        node2_title: 'Sistem Entegrasyonu',
        node2_desc: 'Farklı platformların kusursuz ve senkronize çalışmasını sağlayan akıllı otomasyonlar.',
        node3_title: 'Veri Güvenliği & Hız',
        node3_desc: 'Kesintisiz hizmet veren, yüksek performanslı ve güvenli dijital ürünler.'
      }
    },
    {
      section: 'why_us',
      content: {
        title: 'Neden Able?',
        item1_title: 'Özel Yazılım',
        item1_desc: 'Her işletmeye özel, kuruma tam uyum sağlayan çözümler geliştiriyoruz.',
        item2_title: 'Modern Teknolojiler',
        item2_desc: 'Next.js, TypeScript, PostgreSQL gibi endüstri standartlarını kullanıyoruz.',
        item3_title: 'Ölçeklenebilir Sistemler',
        item3_desc: 'İşletmeniz büyüdükçe sisteminiz de aynı hızda ve sorunsuz büyür.',
        item4_title: 'Uzun Vadeli İş Ortaklığı',
        item4_desc: 'Projeyi teslim edip kaybolmuyoruz; sürekli teknik destek sağlıyoruz.'
      }
    },
    {
      section: 'timeline',
      content: {
        title: 'Çalışma Sürecimiz',
        step1_title: 'İhtiyacı Dinliyoruz',
        step1_desc: 'İşletmenizin hedeflerini ve dijital gereksinimlerini derinlemesine analiz ederiz.',
        step2_title: 'Planlıyoruz',
        step2_desc: 'En doğru teknoloji yığınını seçer, ölçeklenebilir sistem mimarisini çizeriz.',
        step3_title: 'Tasarlıyoruz',
        step3_desc: 'Modern, estetik ve kullanıcı deneyimi (UX) odaklı premium arayüzler tasarlarız.',
        step4_title: 'Geliştiriyoruz',
        step4_desc: 'Güncel teknolojilerle kodlamayı tamamlar ve modüler bir altyapı kurarız.',
        step5_title: 'Yayınlıyoruz',
        step5_desc: 'Tüm performans ve güvenlik testlerini tamamlayıp projeyi canlıya alırız.',
        step6_title: 'Destek Veriyoruz',
        step6_desc: 'Teslimat sonrası bakım, güncelleme ve iyileştirme desteklerimizi sürdürürüz.'
      }
    },
    {
      section: 'values',
      content: {
        title: 'Değerlerimiz',
        value1_title: 'Kalite ve Mühendislik',
        value1_desc: 'Her satır kod, yüksek standartlarda, sürdürülebilir ve işletmeniz büyüdükçe ölçeklenebilir olacak şekilde tasarlanır ve titizlikle yazılır.',
        value2_title: 'Şeffaflık',
        value2_desc: 'Sürecin her aşamasında açık iletişim kurar, düzenli raporlama yapar ve sürprizlerden uzak, net bir proje yönetimi sağlarız.',
        value3_title: 'Süreklilik',
        value3_desc: 'Projelerimizi sadece teslim edip bırakmaz; uzun soluklu bir vizyonla bakım, onarım ve teknik desteğimizi kesintisiz sürdürürüz.'
      }
    },
    {
      section: 'cta',
      content: {
        title: 'Fikrinizi Gerçeğe Dönüştürmeye Hazır mısınız?',
        buttonText: 'Projeni Başlat'
      }
    }
  ];

  for (const s of sections) {
    await prisma.aboutContent.upsert({
      where: { section: s.section },
      update: { content: s.content },
      create: { section: s.section, content: s.content }
    });
  }
  console.log('Seed done!');
}
main().catch(console.error).finally(() => prisma.$disconnect());
