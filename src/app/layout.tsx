import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lejel Labs Media - Jasa Video Promosi Restoran & Kuliner Gratis",
  description: "Lejel Labs Media menyediakan jasa pembuatan video promosi restoran GRATIS. Konten video kuliner profesional untuk TikTok, Instagram & YouTube. Tingkatkan awareness restoran Anda!",
  keywords: [
    "video promosi restoran",
    "konten kuliner",
    "jasa video makanan",
    "promosi restoran gratis",
    "video marketing restoran",
    "food content creator",
    "TikTok food content",
    "Instagram reels restoran",
    "YouTube food video",
    "Lejel Labs Media",
    "Lejel Home Shopping",
  ],
  authors: [{ name: "Lejel Labs Media" }],
  creator: "Lejel Labs Media",
  publisher: "Lejel Labs Media",
  metadataBase: new URL("https://lejellabsmedia.com"), // Update with your actual domain
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://lejellabsmedia.com", // Update with your actual domain
    title: "Lejel Labs Media - Jasa Video Promosi Restoran & Kuliner Gratis",
    description: "Dapatkan video promosi restoran GRATIS dari Lejel Labs Media. Tim profesional siap membantu restoran Anda viral di TikTok, Instagram & YouTube.",
    siteName: "Lejel Labs Media",
    images: [
      {
        url: "/lejel-labs-media-1.png",
        width: 1200,
        height: 630,
        alt: "Lejel Labs Media - Video Promosi Restoran",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lejel Labs Media - Jasa Video Promosi Restoran & Kuliner Gratis",
    description: "Dapatkan video promosi restoran GRATIS dari Lejel Labs Media. Tingkatkan awareness restoran Anda di media sosial!",
    images: ["/lejel-labs-media-1.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification code
  },
  category: "Marketing Services",
  classification: "Video Production & Marketing",
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#FFD369" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <StructuredData />
        <GoogleAnalytics />
        <Analytics />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
