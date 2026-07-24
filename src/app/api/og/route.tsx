import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    // Allow overriding the logo via query param, fallback to default square logo
    const logoUrl = searchParams.get('logo') || "https://vfjxf35lrpm1bcqz.public.blob.vercel-storage.com/1784854878097-Ablelogo.png";

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0a0a0c', // Dark background matching site
            backgroundImage: 'radial-gradient(circle at center, rgba(245, 90, 0, 0.15) 0%, #0a0a0c 70%)',
          }}
        >
          {/* Subtle noise/grid effect using simple borders and text could be done, but keep it clean */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              padding: '40px',
            }}
          >
            {/* The Logo */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoUrl}
              alt="Able Ajans Logo"
              style={{
                maxWidth: '600px',
                maxHeight: '300px',
                objectFit: 'contain',
              }}
            />
          </div>
          <div
            style={{
              marginTop: '40px',
              fontSize: '32px',
              fontWeight: 'bold',
              color: 'rgba(255, 255, 255, 0.9)',
              letterSpacing: '-0.02em',
              textAlign: 'center',
            }}
          >
            Yenilikçi Yazılım ve Tasarım Çözümleri
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.error(e);
    return new Response('Failed to generate OG image', { status: 500 });
  }
}
