import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromRequest } from "@/lib/auth";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) return NextResponse.json({ success: false, message: "Yetkisiz" }, { status: 401 });

    const references = await prisma.reference.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ success: true, data: references });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Hata oluştu" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) return NextResponse.json({ success: false, message: "Yetkisiz" }, { status: 401 });

    const data = await request.json();
    const reference = await prisma.reference.create({
      data: {
        name: data.name,
        description: data.description,
        logoUrl: data.logoUrl,
        websiteUrl: data.websiteUrl,
        order: data.order || 0,
        isVisible: data.isVisible !== undefined ? data.isVisible : true,
      },
    });

    return NextResponse.json({ success: true, data: reference });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Hata oluştu" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) return NextResponse.json({ success: false, message: "Yetkisiz" }, { status: 401 });

    const { id, ...data } = await request.json();
    if (!id) return NextResponse.json({ success: false, message: "ID gereklidir" }, { status: 400 });

    const reference = await prisma.reference.update({
      where: { id },
      data,
    });

    return NextResponse.json({ success: true, data: reference });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Hata oluştu" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) return NextResponse.json({ success: false, message: "Yetkisiz" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ success: false, message: "ID gereklidir" }, { status: 400 });

    await prisma.reference.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Hata oluştu" }, { status: 500 });
  }
}
