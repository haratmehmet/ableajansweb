// src/lib/metadata.ts
import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, SITE_DESC } from "./constants";

interface PageMetaOptions {
  title?: string;
  description?: string;
  path?: string;
  siteName?: string;
  siteUrl?: string;
  favicon?: string;
  ogImage?: string;
}

export function buildMetadata({
  title,
  description,
  path = "/",
  siteName,
  siteUrl,
  favicon,
  ogImage,
}: PageMetaOptions = {}): Metadata {
  const name = siteName || SITE_NAME;
  const desc = description || SITE_DESC;
  const url = siteUrl || SITE_URL;
  const fullTitle = title ? (title === name ? name : `${name} | ${title}`) : name;
  const fullUrl = `${url}${path}`;
  
  // Use the dynamic OG image API
  const defaultLogo = "https://vfjxf35lrpm1bcqz.public.blob.vercel-storage.com/1784854878097-Ablelogo.png";
  const ogLogoParam = ogImage ? encodeURIComponent(ogImage) : encodeURIComponent(defaultLogo);
  const previewImage = `${url}/api/og?logo=${ogLogoParam}`;

  return {
    title: fullTitle,
    description: desc,
    metadataBase: new URL(url),
    alternates: { canonical: fullUrl },
    icons: favicon ? [{ rel: "icon", url: favicon }] : undefined,
    openGraph: {
      type: "website",
      url: fullUrl,
      title: fullTitle,
      description: desc,
      siteName: name,
      images: [{ url: previewImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: [previewImage],
    },
    robots: { index: true, follow: true },
  };
}
