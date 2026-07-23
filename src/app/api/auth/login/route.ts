import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { comparePassword, signToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, message: "E-posta ve şifre zorunludur" }, { status: 400 });
    }

    const admin = await prisma.adminUser.findUnique({
      where: { email },
    });

    if (!admin || !admin.isActive) {
      return NextResponse.json({ success: false, message: "Geçersiz e-posta veya şifre" }, { status: 401 });
    }

    const isValid = await comparePassword(password, admin.passwordHash);

    if (!isValid) {
      return NextResponse.json({ success: false, message: "Geçersiz e-posta veya şifre" }, { status: 401 });
    }

    const token = signToken({
      userId: admin.id,
      email: admin.email,
      role: admin.role,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });

    response.cookies.set({
      name: "admin_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ success: false, message: "Sunucu hatası" }, { status: 500 });
  }
}
