import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromRequest } from "@/lib/auth";
export const dynamic = "force-dynamic";

const CONTACT_KEYS = [
  "contact_phone",
  "contact_email",
  "contact_whatsapp",
  "contact_address",
  "working_hours_weekday",
  "working_hours_saturday",
  "working_model",
];

export async function GET(request: Request) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) return NextResponse.json({ success: false, message: "Yetkisiz" }, { status: 401 });

    const settings = await prisma.siteSetting.findMany({
      where: { key: { in: CONTACT_KEYS } },
    });

    const data = settings.reduce((acc, setting) => {
      acc[setting.key] = setting.value;
      return acc;
    }, {} as Record<string, string>);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Hata oluştu" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) return NextResponse.json({ success: false, message: "Yetkisiz" }, { status: 401 });

    const { settings } = await request.json();
    if (!settings || typeof settings !== "object") {
      return NextResponse.json({ success: false, message: "Geçersiz veri formatı" }, { status: 400 });
    }

    const updates = Object.entries(settings)
      .filter(([key]) => CONTACT_KEYS.includes(key))
      .map(([key, value]) => {
        return prisma.siteSetting.upsert({
          where: { key },
          update: { value: String(value) },
          create: { key, value: String(value) },
        });
      });

    await prisma.$transaction(updates);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Hata oluştu" }, { status: 500 });
  }
}
