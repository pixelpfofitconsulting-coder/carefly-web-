// File: src/app/layout.tsx
// Function: Root layout configuration setting up fonts, global dark theme, and mobile viewport scaling.

import type { Metadata, Viewport } from "next";
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
  title: "CareFly Intelligence",
  description: "Cross-Border Unified Healthcare Ecosystem",
};

// মোবাইলে জুম এবং স্কেলিং ইস্যু ফিক্স করার জন্য Viewport এক্সপোর্ট করা হলো
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      {/* overflow-x-hidden যোগ করা হয়েছে যাতে স্ক্রিন ডানে-বাঁয়ে না নড়ে */}
      <body className="min-h-screen bg-[#010c0c] text-white flex flex-col overflow-x-hidden w-full">
        {children}
      </body>
    </html>
  );
}