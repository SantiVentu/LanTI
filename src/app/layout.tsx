import type { Metadata } from "next";
import ChatWidget from "@/components/Chat/ChatWidget";
import SmoothScroll from "@/components/SmoothScroll/SmoothScroll";
import localFont from "next/font/local";
import "./globals.css";

// Clash Display (variable) para títulos
const clashDisplay = localFont({
  src: "../fonts/ClashDisplay-Variable.woff2",
  variable: "--font-clash",
  weight: "200 700",
  display: "swap",
});

// Satoshi (variable) para texto de cuerpo
const satoshi = localFont({
  src: "../fonts/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  weight: "300 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LanTI — Software, diseño e inteligencia artificial",
  description: "Creamos en libertad para diseñar con calidad. Soluciones digitales a medida: software, diseño UI/UX, identidad y agentes de inteligencia artificial.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${clashDisplay.variable} ${satoshi.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
        <ChatWidget />
      </body>
    </html>
  );
}
