import type { Metadata } from "next";
import { Syne, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Font configurations
const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
  weight: ["400", "500"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "STARLY.DEV | Creative Developer",
  description: "Muhammad Ali — Full-stack developer & AI systems architect building immersive digital experiences. WebGL, Next.js, Three.js specialist.",
  keywords: ["creative developer", "webgl", "three.js", "react", "next.js", "portfolio", "Lahore", "Pakistan"],
  authors: [{ name: "Muhammad Ali", url: "https://starly.dev" }],
  creator: "Muhammad Ali",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://starly.dev",
    siteName: "STARLY.DEV",
    title: "STARLY.DEV | Creative Developer",
    description: "Building the web's unreasonable things.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "STARLY.DEV",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "STARLY.DEV | Creative Developer",
    description: "Building the web's unreasonable things.",
    creator: "@starly101",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${instrumentSans.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
