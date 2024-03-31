import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });
const META_INFO = {
  title: "gitpilled",
  description: "What language are you pilled in?",
};

export const metadata: Metadata = {
  title: META_INFO.title,
  description: META_INFO.description,
  openGraph: {
    title: META_INFO.title,
    description: META_INFO.description,
    images: ["https://gitpilled.vercel.app/og.png"],
    type: "website",
  },
  twitter: {
    title: META_INFO.title,
    description: META_INFO.description,
    images: ["https://gitpilled.vercel.app/og.png"],
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Analytics />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
