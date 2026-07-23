import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromRequest } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) return NextResponse.json({ success: false, message: "Yetkisiz" }, { status: 401 });

    const aboutContent = await prisma.aboutContent.findMany();
    const dataMap = aboutContent.reduce((acc, item) => {
      acc[item.section] = item.content;
      return acc;
    }, {} as Record<string, any>);

    return NextResponse.json({ success: true, data: dataMap });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Hata oluştu" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) return NextResponse.json({ success: false, message: "Yetkisiz" }, { status: 401 });

    const { section, content } = await request.json();
    if (!section || !content) {
      return NextResponse.json({ success: false, message: "Bölüm ve içerik gereklidir" }, { status: 400 });
    }

    const updated = await prisma.aboutContent.upsert({
      where: { section },
      update: { content },
      create: { section, content },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Hata oluştu" }, { status: 500 });
  }
}
