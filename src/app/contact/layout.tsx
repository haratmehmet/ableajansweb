import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const setting = await prisma.siteSetting.findUnique({
    where: { key: 'page_title_contact' }
  });
  return buildMetadata({
    title: setting?.value || "İletişim",
    description: "Able Ajans ile iletişime geçin. Projelerinizi konuşmak ve keşif görüşmesi yapmak için bize ulaşın.",
    path: "/contact",
  });
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
