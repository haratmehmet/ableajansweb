import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromRequest, hashPassword, comparePassword } from "@/lib/auth";

export async function PUT(request: Request) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { currentPassword, newPassword, newEmail } = body;

    if (!currentPassword) {
      return NextResponse.json({ success: false, error: "Mevcut şifre gereklidir." }, { status: 400 });
    }

    const isValid = await comparePassword(currentPassword, admin.passwordHash);
    if (!isValid) {
      return NextResponse.json({ success: false, error: "Mevcut şifre hatalı." }, { status: 400 });
    }

    const updateData: any = {};
    if (newPassword) {
      updateData.passwordHash = await hashPassword(newPassword);
    }
    if (newEmail && newEmail.trim() !== '') {
      const existingUser = await prisma.adminUser.findUnique({ where: { email: newEmail } });
      if (existingUser && existingUser.id !== admin.id) {
        return NextResponse.json({ success: false, error: "Bu e-posta adresi zaten kullanımda." }, { status: 400 });
      }
      updateData.email = newEmail;
    }

    if (Object.keys(updateData).length > 0) {
      await prisma.adminUser.update({
        where: { id: admin.id },
        data: updateData,
      });
    }

    return NextResponse.json({ success: true, message: "Hesap bilgileri başarıyla güncellendi." });
  } catch (error) {
    console.error("Password update error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
