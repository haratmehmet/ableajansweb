"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";

interface LayoutProps {
  children: React.ReactNode;
  logoUrl?: string;
  portalText?: string;
  portalUrl?: string;
  footer?: React.ReactNode;
}

export default function ClientLayoutContent({ children, logoUrl, portalText, portalUrl, footer }: LayoutProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/ableadmin");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar logoUrl={logoUrl} portalText={portalText} portalUrl={portalUrl} />
      <main>{children}</main>
      {footer}
    </>
  );
}
