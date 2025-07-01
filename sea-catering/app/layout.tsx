import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "SEA Catering - Healthy Meals, Anytime, Anywhere",
  description: "Layanan katering makanan sehat di seluruh Indonesia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <Navbar />
      <body className={poppins.className}>{children}</body>
      <Footer />
    </html>
  );
}
