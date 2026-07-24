import { NextResponse } from "next/server";
import { storage } from "@/lib/storage";
import { prisma } from "@/lib/prisma";
import { getAdminFromRequest } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) {
      return NextResponse.json({ success: false, message: "Yetkisiz erişim" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ success: false, message: "Dosya bulunamadı" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const url = await storage.uploadFile(buffer, file.name, file.type);

    const media = await prisma.media.create({
      data: {
        filename: file.name,
        url: url,
        contentType: file.type,
        sizeBytes: file.size,
        uploadedBy: admin.id,
      },
    });

    return NextResponse.json({ success: true, url: media.url, filename: media.filename, media });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ success: false, message: error instanceof Error ? error.message : "Sunucu hatası", details: String(error) }, { status: 500 });
  }
}
