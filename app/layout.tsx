import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { site } from "@/content/landing";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});



export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: site.title,
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  keywords: [
    "CRM para concesionarias",
    "CRM automotor",
    "software para concesionarias",
    "WhatsApp con IA para concesionarias",
    "calificación de leads",
    "CRM con inteligencia artificial",
    "GoConcesionaria",
  ],
  authors: [{ name: "GODREAMAI", url: "https://www.godreamai.com" }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: site.name,
    title: site.title,
    description: site.description,
    url: "/",
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geist.variable}`}>
      {/* Algunas extensiones del navegador (p. ej. ColorZilla) agregan atributos al body antes de hidratar */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
