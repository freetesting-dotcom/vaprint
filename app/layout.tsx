import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VaPrint Digital Printing Online Semarang",
  description:
    "VaPrint adalah layanan digital printing di Semarang untuk cetak brosur, sticker, banner, spanduk, kartu nama, dan berbagai kebutuhan printing custom.",
  keywords: [
    "VaPrint",
    "digital printing Semarang",
    "printing Semarang",
    "cetak brosur Semarang",
    "cetak sticker Semarang",
    "cetak banner Semarang",
    "digital printing",
  ],
  icons: {
    icon: "/iconweb.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
