import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/ableadmin")) {
    if (pathname === "/ableadmin/login") {
      return NextResponse.next();
    }

    const token = request.cookies.get("admin_token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/ableadmin/login", request.url));
    }

    try {
      // Edge runtime doesn't support jsonwebtoken natively for verify
      const [, payload] = token.split(".");
      const decodedPayload = JSON.parse(atob(payload));
      
      if (decodedPayload.exp && decodedPayload.exp * 1000 < Date.now()) {
        return NextResponse.redirect(new URL("/ableadmin/login", request.url));
      }
    } catch (e) {
      return NextResponse.redirect(new URL("/ableadmin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/ableadmin/:path*"],
};
