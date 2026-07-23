import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const existing = await prisma.heroContent.findFirst()
  if (existing) {
    await prisma.heroContent.update({
      where: { id: existing.id },
      data: {
        eyebrow: "Able Ajans Hoşgeldiniz",
        title: "Dijitalde ",
        titleAccent: "Güçlü",
        subtitle: "İşletmeleri dijital dünyada büyüten yenilikçi çözümler geliştiriyoruz.",
        ctaText: "Bizi Arayın",
        ctaLink: "tel:+905458550089",
        ctaText2: "WhatsApp İletişim",
        ctaLink2: "https://wa.me/905458550089",
        socialStrip1: "Güvenilir Ajans",
        socialStrip2: "Premium Çözümler",
        socialStrip3: "Yenilikçi Yaklaşım",
      }
    })
  } else {
    await prisma.heroContent.create({
      data: {
        eyebrow: "Able Ajans Hoşgeldiniz",
        title: "Dijitalde ",
        titleAccent: "Güçlü",
        subtitle: "İşletmeleri dijital dünyada büyüten yenilikçi çözümler geliştiriyoruz.",
        ctaText: "Bizi Arayın",
        ctaLink: "tel:+905458550089",
        ctaText2: "WhatsApp İletişim",
        ctaLink2: "https://wa.me/905458550089",
        socialStrip1: "Güvenilir Ajans",
        socialStrip2: "Premium Çözümler",
        socialStrip3: "Yenilikçi Yaklaşım",
      }
    })
  }
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect())
