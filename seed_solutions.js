const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.solutionItem.deleteMany({});
  
  const data = [
    { number: "01", icon: "code", title: "Özel Yazılım / Geliştirme", description: "İş süreçlerinizi hızlandıran, tamamen size özel web tabanlı yazılımlar geliştiriyoruz." },
    { number: "02", icon: "automation", title: "Yapay Zekâ / Çözümleri", description: "İş süreçlerini hızlandıran AI destekli otomasyonlar ve akıllı sistemler." },
    { number: "03", icon: "ecommerce", title: "E-Ticaret / Çözümleri", description: "Markanıza özel e-ticaret altyapıları ve yönetim panelleri." },
    { number: "04", icon: "web", title: "Kurumsal / Web Siteleri", description: "Modern, hızlı, SEO uyumlu ve mobil öncelikli web siteleri." },
    { number: "05", icon: "strategy", title: "İş Süreci / Otomasyonları", description: "Tekrarlayan işleri otomatikleştiren özel yazılım çözümleri." },
    { number: "06", icon: "marketing", title: "SEO / / AIO", description: "Google’da ve AI araçlarında görünür olmanız için teknik ve içerik odaklı SEO / AIO çalışmaları." },
    { number: "07", icon: "social", title: "Dijital Reklam / Yönetimi", description: "Google Ads ve Meta reklam kampanyalarının stratejik yönetimi." },
    { number: "08", icon: "marketing", title: "Sosyal Medya / Yönetimi", description: "Markanızı sosyal medyada güçlü kılan içerikler ve kampanyalar." },
    { number: "09", icon: "code", title: "ERP / API / Entegrasyonu", description: "Logo ERP, muhasebe yazılımları ve üçüncü parti servis entegrasyonu." },
    { number: "10", icon: "drone", title: "Profesyonel / Foto & Video", description: "Profesyonel drone çekimleri ve fotoğraf, video çekimi hizmetleri." }
  ];

  let order = 0;
  for (const item of data) {
    await prisma.solutionItem.create({
      data: { ...item, order: order++ }
    });
  }
  console.log("Solutions seeded!");
}
main().catch(console.error).finally(() => prisma.$disconnect());
