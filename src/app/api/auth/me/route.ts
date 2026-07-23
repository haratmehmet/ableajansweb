import { NextResponse } from "next/server";
import { getAdminFromRequest } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const admin = await getAdminFromRequest(request);

    if (!admin) {
      return NextResponse.json({ success: false, message: "Yetkisiz erişim" }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Auth me error:", error);
    return NextResponse.json({ success: false, message: "Sunucu hatası" }, { status: 500 });
  }
}
