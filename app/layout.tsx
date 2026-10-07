import type { Metadata } from "next";
import "./globals.css";
import OrganizationSchema from "./organization-schema";

export const metadata: Metadata = {
  title: "VaPrint Digital Printing Semarang | Banner, Brosur & Sticker",
  description:
    "VaPrint adalah digital printing di Semarang untuk banner, brosur, poster, sticker, dan kebutuhan cetak custom. Lihat produk, hitung estimasi harga, dan pesan melalui WhatsApp.",
  keywords: [
    "VaPrint",
    "digital printing Semarang",
    "printing Semarang",
    "cetak banner Semarang",
    "cetak brosur Semarang",
    "cetak poster Semarang",
    "cetak sticker Semarang",
    "digital printing",
  ],
  icons: {
    icon: "/iconweb.png",
  },
  verification: {
    google: "stUx1e27OpMHplEzJKFdPgz_foVrZCvlQQ1V-Z65T3k",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        <OrganizationSchema />
        {children}
      </body>
    </html>
  );
}