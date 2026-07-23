// src/lib/constants.ts

export const SITE_NAME = "Able Ajans";
export const SITE_URL  = "https://ableajans.com";
export const SITE_DESC =
  "Able Ajans — Yazılım, sosyal medya yönetimi, web tasarım, dijital pazarlama ve drone çekimi alanlarında yenilikçi çözümler.";

export const NAV_LINKS = [
  { label: "Ana Sayfa",   href: "/"          },
  { label: "Hakkımızda", href: "/about"      },
  { label: "Çözümler",   href: "/solutions"  },
  { label: "Projeler",   href: "/projects"   },
  { label: "İletişim",   href: "/contact"    },
] as const;

export const CONTACT_PHONE    = "+90 545 855 00 89";
export const CONTACT_PHONE_LINK = "tel:+905458550089";
export const CONTACT_WA_LINK  = "https://wa.me/905458550089";

export const SERVICES = [
  {
    id: "software",
    icon: "code",
    name: "Özel Yazılım Geliştirme",
    desc: "İşletmenizin ihtiyaçlarına özel, ölçeklenebilir ve güvenli yazılım çözümleri üretiyoruz.",
  },
  {
    id: "ecommerce",
    icon: "ecommerce",
    name: "E-Ticaret Çözümleri",
    desc: "Satışlarınızı artıracak, modern ve kullanıcı dostu e-ticaret altyapıları kuruyoruz.",
  },
  {
    id: "web",
    icon: "web",
    name: "Kurumsal Web Siteleri",
    desc: "Marka kimliğinizi yansıtan, performanslı ve etkileyici web deneyimleri tasarlıyoruz.",
  },
  {
    id: "automation",
    icon: "automation",
    name: "İş Süreci Otomasyonları",
    desc: "Operasyonel verimliliğinizi artırmak için iş süreçlerinizi dijitalleştiriyoruz.",
  },
  {
    id: "seo",
    icon: "strategy",
    name: "SEO / AIO",
    desc: "Arama motorlarında ve yapay zeka platformlarında görünürlüğünüzü maksimize ediyoruz.",
  },
  {
    id: "marketing",
    icon: "marketing",
    name: "Dijital Reklam Yönetimi",
    desc: "Veri odaklı reklam kampanyaları ile hedef kitlenize doğrudan ve etkili şekilde ulaşıyoruz.",
  },
  {
    id: "social",
    icon: "social",
    name: "Sosyal Medya Yönetimi",
    desc: "Markanızı sosyal medyada güçlü kılan yaratıcı içerikler ve stratejiler oluşturuyoruz.",
  },
  {
    id: "video",
    icon: "drone",
    name: "Profesyonel Foto & Video",
    desc: "Marka hikayenizi anlatan yüksek kaliteli görsel ve profesyonel çekimler yapıyoruz.",
  },
] as const;
