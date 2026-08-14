import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "フラネコ | Personal Homepage",
  description:
    "アイデア、物語、画像、Web制作を見える形にしていくための個人ホームページです。",
  openGraph: {
    title: "フラネコ | Personal Homepage",
    description: "アイデアを、見える形へ。",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "フラネコ - アイデアを、見える形へ。",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "フラネコ | Personal Homepage",
    description: "アイデアを、見える形へ。",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
