import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const serifDisplay = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
});

const sansBody = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Husn-e-Hijab — Contemporary Luxury Modest Fashion",
  description:
    "Explore Husn-e-Hijab: luxury modest wear, hijabs, niqabs, and abayas crafted around grace, movement, and quiet confidence.",
  keywords: ["Husn-e-Hijab", "Modest Fashion", "Hijab", "Niqab", "Abaya", "Khimar", "Luxury Modest Wear"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${serifDisplay.variable} ${sansBody.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-[#F5F0E9] text-[#1C1B1B] font-sans selection:bg-[#B98388] selection:text-white flex flex-col overflow-x-hidden">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
