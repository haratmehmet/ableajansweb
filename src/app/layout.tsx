// src/app/layout.tsx
export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import AmbientBackground from "@/components/layout/AmbientBackground";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { buildMetadata } from "@/lib/metadata";
import { prisma } from "@/lib/prisma";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  let settingsMap: Record<string, string> = {};
  try {
    const settings = await prisma.siteSetting.findMany({
      where: { key: { in: ['site_name', 'site_description', 'site_url', 'site_favicon', 'site_logo'] } }
    });
    settingsMap = settings.reduce((acc, s) => ({ ...acc, [s.key]: s.value }), {});
  } catch (e) {
    console.error("Error fetching metadata settings", e);
  }

  return buildMetadata({
    siteName: settingsMap.site_name,
    description: settingsMap.site_description,
    siteUrl: settingsMap.site_url,
    favicon: settingsMap.site_favicon,
    ogImage: settingsMap.site_logo
  });
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  let settingsMap: Record<string, string> = {};
  try {
    const settings = await prisma.siteSetting.findMany({
      where: { key: { in: ['site_logo', 'portal_text', 'portal_url', 'site_favicon'] } }
    });
    settingsMap = settings.reduce((acc, s) => ({ ...acc, [s.key]: s.value }), {});
  } catch (e) {
    console.error("Error fetching root layout settings", e);
  }

  return (
    <html lang="tr" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        {settingsMap.site_favicon && (
          <link rel="icon" href={`${settingsMap.site_favicon}?v=${Date.now()}`} />
        )}
      </head>
      <body>
        {/* Ambient glow + grid + noise (fixed, behind everything) */}
        <AmbientBackground />

        <div className="page-wrapper">
          <ClientLayoutContent
            logoUrl={settingsMap.site_logo}
            portalText={settingsMap.portal_text}
            portalUrl={settingsMap.portal_url}
            footer={<Footer />}
          >
            {children}
          </ClientLayoutContent>
        </div>
      </body>
    </html>
  );
}

// We need a separate client component to check the pathname and conditionally render Navbar/Footer
import ClientLayoutContent from "@/components/layout/ClientLayoutContent";
