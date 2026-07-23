import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromRequest } from "@/lib/auth";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) return NextResponse.json({ success: false, message: "Yetkisiz" }, { status: 401 });

    const stats = await prisma.statCard.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ success: true, data: stats });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Hata oluştu" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) return NextResponse.json({ success: false, message: "Yetkisiz" }, { status: 401 });

    const data = await request.json();
    if (!Array.isArray(data)) {
      return NextResponse.json({ success: false, message: "Dizi bekleniyor" }, { status: 400 });
    }

    await prisma.$transaction([
      prisma.statCard.deleteMany(),
      prisma.statCard.createMany({
        data: data.map((stat: any, index: number) => ({
          value: stat.value,
          label: stat.label,
          icon: stat.icon || "",
          order: typeof stat.order === "number" ? stat.order : index,
          isVisible: stat.isVisible !== undefined ? stat.isVisible : true,
        })),
      }),
    ]);

    const newStats = await prisma.statCard.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json({ success: true, data: newStats });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Hata oluştu" }, { status: 500 });
  }
}
