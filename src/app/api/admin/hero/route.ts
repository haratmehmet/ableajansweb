import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromRequest } from "@/lib/auth";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) return NextResponse.json({ success: false, message: "Yetkisiz" }, { status: 401 });

    const hero = await prisma.heroContent.findFirst();
    return NextResponse.json({ success: true, data: hero });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Hata oluştu" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) return NextResponse.json({ success: false, message: "Yetkisiz" }, { status: 401 });

    const data = await request.json();
    
    // As there is only one hero content typically
    const existing = await prisma.heroContent.findFirst();

    if (existing) {
      const updated = await prisma.heroContent.update({
        where: { id: existing.id },
        data: {
          eyebrow: data.eyebrow,
          title: data.title,
          titleAccent: data.titleAccent,
          titleLine2: data.titleLine2,
          subtitle: data.subtitle,
          ctaText: data.ctaText,
          ctaLink: data.ctaLink,
          ctaText2: data.ctaText2,
          ctaLink2: data.ctaLink2,
          socialStrip1: data.socialStrip1,
          socialStrip2: data.socialStrip2,
          socialStrip3: data.socialStrip3,
        },
      });
      return NextResponse.json({ success: true, data: updated });
    } else {
      const created = await prisma.heroContent.create({
        data: {
          eyebrow: data.eyebrow || "Able Ajans Hoşgeldiniz",
          title: data.title,
          titleAccent: data.titleAccent || "Güçlü",
          titleLine2: data.titleLine2 || "Varoluş Başladı",
          subtitle: data.subtitle,
          ctaText: data.ctaText || "Bizi Arayın",
          ctaLink: data.ctaLink || "tel:+905458550089",
          ctaText2: data.ctaText2 || "WhatsApp İletişim",
          ctaLink2: data.ctaLink2 || "https://wa.me/905458550089",
          socialStrip1: data.socialStrip1 || "Güvenilir Ajans",
          socialStrip2: data.socialStrip2 || "Premium Çözümler",
          socialStrip3: data.socialStrip3 || "Yenilikçi Yaklaşım",
        },
      });
      return NextResponse.json({ success: true, data: created });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: "Hata oluştu" }, { status: 500 });
  }
}
