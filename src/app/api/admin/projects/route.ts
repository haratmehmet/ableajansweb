import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromRequest } from "@/lib/auth";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) return NextResponse.json({ success: false, message: "Yetkisiz" }, { status: 401 });

    const projects = await prisma.project.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Hata oluştu" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) return NextResponse.json({ success: false, message: "Yetkisiz" }, { status: 401 });

    const data = await request.json();
    const project = await prisma.project.create({
      data: {
        slug: data.slug,
        title: data.title,
        description: data.description,
        category: data.category,
        tags: data.tags || [],
        imageUrl: data.imageUrl,
        projectUrl: data.projectUrl,
        isVisible: data.isVisible !== undefined ? data.isVisible : true,
        isFeatured: data.isFeatured || false,
        order: data.order || 0,
        statusBadge: data.statusBadge || "Canlıda",
        problem: data.problem,
        solution: data.solution,
        features: data.features || [],
        gallery: data.gallery || [],
        results: data.results || [],
      },
    });

    return NextResponse.json({ success: true, data: project });
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

    const project = await prisma.project.update({
      where: { id },
      data,
    });

    return NextResponse.json({ success: true, data: project });
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

    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Hata oluştu" }, { status: 500 });
  }
}
