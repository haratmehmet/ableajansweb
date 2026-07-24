// src/app/page.tsx — Ana Sayfa (/)
export const dynamic = "force-dynamic";
import { buildMetadata } from "@/lib/metadata";
import HeroSection from "@/components/sections/home/HeroSection";
import TrustSection from "@/components/sections/home/TrustSection";
import { prisma } from "@/lib/prisma";

import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const setting = await prisma.siteSetting.findUnique({
    where: { key: 'page_title_home' }
  });
  return buildMetadata({
    title: setting?.value || undefined,
    path: "/",
  });
}

export default async function HomePage() {
  const heroData = await prisma.heroContent.findFirst();
  
  // Fetch home settings
  const settings = await prisma.siteSetting.findMany({
    where: { key: { in: ['home_trust_title', 'home_trust_subtitle'] } }
  });
  const settingsMap = settings.reduce((acc, s) => ({ ...acc, [s.key]: s.value }), {} as any);

  // Fetch active references ordered by order
  const references = await prisma.reference.findMany({
    where: { isVisible: true },
    orderBy: { order: 'asc' },
    select: { name: true, logoUrl: true }
  });

  // Fetch active stats ordered by order
  const stats = await prisma.statCard.findMany({
    where: { isVisible: true },
    orderBy: { order: 'asc' },
    select: { label: true, value: true, icon: true }
  });

  // Fetch active solutions
  const solutions = await prisma.solutionItem.findMany({
    where: { isVisible: true },
    orderBy: { order: 'asc' },
  });

  return (
    <>
      {heroData && <HeroSection hero={heroData as any} />}
      <TrustSection 
        stats={stats} 
        references={references} 
        title={settingsMap.home_trust_title} 
        subtitle={settingsMap.home_trust_subtitle} 
      />
    </>
  );
}
