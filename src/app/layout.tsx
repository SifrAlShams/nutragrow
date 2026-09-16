import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const isComingSoon = process.env.NEXT_PUBLIC_COMING_SOON === 'true';

export const metadata: Metadata = {
  title: isComingSoon
    ? "Nutra Grow — Coming Soon | Premium Hair & Skin Support"
    : "Nutra Grow - Wellness for Life | Hair & Skin Support",
  description: isComingSoon
    ? "Nutra Grow is launching soon. Premium dietary supplements formulated to support healthy hair, radiant skin, and overall beauty wellness in women. Sign up to be the first to know."
    : "Formulated to support healthy hair and scalp health, radiant skin, and overall beauty wellness in women. Premium dietary supplements made in USA.",
  keywords: "nutra grow, hair support, skin support, dietary supplement, wellness, women health, beauty supplement, coming soon",
  openGraph: {
    title: isComingSoon
      ? "Nutra Grow — Coming Soon"
      : "Nutra Grow - Wellness for Life",
    description: "Premium Hair & Skin Support supplements — formulated for women who radiate health and confidence.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" }}
      >
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
