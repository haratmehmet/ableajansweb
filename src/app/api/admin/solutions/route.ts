import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromRequest } from "@/lib/auth";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) return NextResponse.json({ success: false, message: "Yetkisiz" }, { status: 401 });

    const solutions = await prisma.solutionItem.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ success: true, data: solutions });
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
      prisma.solutionItem.deleteMany(),
      prisma.solutionItem.createMany({
        data: data.map((item: any, index: number) => ({
          number: item.number,
          icon: item.icon,
          title: item.title,
          description: item.description,
          order: typeof item.order === "number" ? item.order : index,
          isVisible: item.isVisible !== undefined ? item.isVisible : true,
        })),
      }),
    ]);

    const newSolutions = await prisma.solutionItem.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json({ success: true, data: newSolutions });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Hata oluştu" }, { status: 500 });
  }
}
