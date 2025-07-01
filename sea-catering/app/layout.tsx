import type { Metadata } from "next";
// 1. Hapus impor Geist, ganti dengan Poppins
import { Poppins } from "next/font/google";
import "./globals.css";

// 2. Konfigurasi Poppins dengan weight yang dibutuhkan
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // 400=regular, 600=semibold, 700=bold
});

// 3. (Saran) Update metadata agar sesuai dengan proyek Anda
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
    // 4. Ubah bahasa ke "id"
    <html lang="id">
      {/* 5. Terapkan class Poppins secara langsung ke body */}
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
