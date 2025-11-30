import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Plus_Jakarta_Sans, Inter, Sora } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800"],
    variable: "--font-jakarta",
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const sora = Sora({
    subsets: ["latin"],
    variable: "--font-sora",
});

const plusJakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800"],
    variable: "--font-jakarta",
});


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kampus",
  description: "Cross-semester communities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body
        className={`${jakarta.variable} ${inter.variable} ${sora.variable} ${geistSans.variable} ${geistMono.variable} min-h-screen bg-gradient-to-b from-white to-slate-50`}
    >
    {children}
    </body>
    </html>
  );
}
