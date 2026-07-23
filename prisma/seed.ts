import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding started...");

  // 1. Admin User
  const passwordHash = await bcrypt.hash("able2026", 10);
  await prisma.adminUser.upsert({
    where: { email: "admin@ableajans.com" },
    update: {},
    create: {
      email: "admin@ableajans.com",
      name: "Admin",
      passwordHash,
      role: "SUPER_ADMIN",
      isActive: true,
    },
  });

  // 2. Site Settings
  const settings = [
    { key: "site_name", value: "Able Ajans" },
    { key: "site_url", value: "https://ableajans.com" },
    { key: "site_description", value: "Dijital mükemmellik, kod satırlarında başlar." },
    { key: "contact_phone", value: "+90 545 855 00 89" },
    { key: "contact_email", value: "info@ableajans.com" },
    { key: "contact_whatsapp", value: "905458550089" },
    { key: "instagram_url", value: "https://instagram.com/ableajans" },
    { key: "linkedin_url", value: "https://linkedin.com/company/ableajans" },
    { key: "x_url", value: "https://x.com/ableajans" },
    { key: "working_hours_weekday", value: "Hafta İçi: 09:00 – 18:00" },
    { key: "working_hours_saturday", value: "Cumartesi: 10:00 – 15:00" },
  ];

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: {},
      create: { key: setting.key, value: setting.value },
    });
  }

  // 3. Services
  const services = [
    { slug: "ozel-yazilim", icon: "code", name: "Özel Yazılım Geliştirme", description: "İşletmenizin ihtiyaçlarına özel, ölçeklenebilir ve güvenli web, mobil ve masaüstü uygulamaları geliştiriyoruz." },
    { slug: "e-ticaret", icon: "ecommerce", name: "E-Ticaret Çözümleri", description: "Satışlarınızı artıracak, kullanıcı dostu ve güvenli B2B/B2C e-ticaret altyapıları kuruyoruz." },
    { slug: "kurumsal-web", icon: "web", name: "Kurumsal Web Siteleri", description: "Marka kimliğinizi yansıtan, modern, hızlı ve mobil uyumlu kurumsal web siteleri tasarlıyoruz." },
    { slug: "otomasyon", icon: "automation", name: "İş Süreci Otomasyonları", description: "Tekrarlayan görevleri otomatikleştirerek zaman ve maliyet tasarrufu sağlayan sistemler kuruyoruz." },
    { slug: "seo-aio", icon: "strategy", name: "SEO / AIO", description: "Arama motorlarında ve yapay zeka platformlarında görünürlüğünüzü artıracak stratejiler uyguluyoruz." },
    { slug: "dijital-reklam", icon: "marketing", name: "Dijital Reklam Yönetimi", description: "Google, Meta ve diğer platformlarda veri odaklı reklam kampanyaları yöneterek ROI'nizi maksimize ediyoruz." },
    { slug: "sosyal-medya", icon: "social", name: "Sosyal Medya Yönetimi", description: "Hedef kitlenizle etkileşimi artıracak yaratıcı içerikler üretiyor ve hesaplarınızı yönetiyoruz." },
    { slug: "foto-video", icon: "drone", name: "Profesyonel Foto & Video", description: "Ürün, mekan ve kurumsal tanıtım çekimleriyle markanızın görsel dünyasını zenginleştiriyoruz." },
  ];

  for (let i = 0; i < services.length; i++) {
    await prisma.service.upsert({
      where: { slug: services[i].slug },
      update: {},
      create: {
        ...services[i],
        order: i,
        isVisible: true,
      },
    });
  }

  // 4. StatCards
  const statCards = [
    { value: "30+", label: "Tamamlanan Proje", icon: "check-circle", order: 0 },
    { value: "20+", label: "İş Ortağı", icon: "users", order: 1 },
    { value: "10+", label: "Farklı Sektör", icon: "briefcase", order: 2 },
    { value: "%100", label: "Müşteri Odaklı", icon: "target", order: 3 },
  ];

  for (const stat of statCards) {
    await prisma.statCard.create({
      data: stat,
    });
  }

  // 5. HeroContent
  const existingHero = await prisma.heroContent.findFirst();
  if (!existingHero) {
    await prisma.heroContent.create({
      data: {
        eyebrow: "Dijital Ajans",
        title: "Fikirlerinizi",
        titleAccent: "Gerçeğe",
        subtitle: "Dönüştürüyoruz",
        ctaText: "Ücretsiz Keşif Görüşmesi",
        ctaLink: "/contact",
      },
    });
  }

  // 6. AboutContent
  await prisma.aboutContent.upsert({
    where: { section: "main" },
    update: {},
    create: {
      section: "main",
      content: {
        title: "Biz Kimiz?",
        subtitle: "Dijital Dönüşüm Ortağınız",
        text1: "Able Ajans olarak, markaların dijital dünyada güçlü bir varlık göstermesi için yenilikçi, veriye dayalı ve kreatif çözümler üretiyoruz.",
        text2: "Yazılım geliştirmeden sosyal medya yönetimine, web tasarımdan drone çekimlerine kadar geniş bir yelpazede, 360 derece tam hizmet ajansı olarak faaliyet gösteriyoruz."
      }
    }
  });

  // 7. FooterContent
  await prisma.footerContent.upsert({
    where: { section: "main" },
    update: {},
    create: {
      section: "main",
      content: {
        description: "Dijital dünyada iz bırakan projeler için buradayız.",
        copyright: "© 2026 Able Ajans. Tüm hakları saklıdır."
      }
    }
  });

  // 8. References (Logolar)
  const refs = [
    { name: "Google", websiteUrl: "https://google.com" },
    { name: "Microsoft", websiteUrl: "https://microsoft.com" },
    { name: "Amazon", websiteUrl: "https://amazon.com" }
  ];
  for (let i = 0; i < refs.length; i++) {
    await prisma.reference.create({ data: { ...refs[i], order: i, isVisible: true } });
  }

  // 9. Projects
  const projs = [
    { title: "Kurumsal Web", slug: "kurumsal-web", category: "Web Tasarım", description: "Modern kurumsal kimlik.", tags: ["React", "Next.js"], imageUrl: "", projectUrl: "", isFeatured: true, isVisible: true, order: 0 },
    { title: "E-Ticaret App", slug: "e-ticaret-app", category: "Mobil Uygulama", description: "Hızlı alışveriş deneyimi.", tags: ["React Native"], imageUrl: "", projectUrl: "", isFeatured: true, isVisible: true, order: 1 }
  ];
  for (let i = 0; i < projs.length; i++) {
    await prisma.project.upsert({
      where: { slug: projs[i].slug },
      update: {},
      create: projs[i]
    });
  }

  // 10. Solutions
  const sols = [
    { number: "01", icon: "search", title: "Keşif ve Analiz", description: "Hedef kitlenizi ve pazar dinamiklerini inceliyoruz.", order: 0, isVisible: true },
    { number: "02", icon: "pen", title: "Strateji ve Tasarım", description: "Size özel dijital büyüme stratejisi oluşturuyoruz.", order: 1, isVisible: true },
    { number: "03", icon: "code", title: "Geliştirme", description: "Modern teknolojilerle fikirleri hayata geçiriyoruz.", order: 2, isVisible: true },
    { number: "04", icon: "rocket", title: "Yayın ve Optimizasyon", description: "Performans takibi ile sürekli büyüme sağlıyoruz.", order: 3, isVisible: true }
  ];
  for (let i = 0; i < sols.length; i++) {
    await prisma.solutionItem.create({ data: sols[i] });
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    // Ensure pool is ended
    await pool.end();
  });
