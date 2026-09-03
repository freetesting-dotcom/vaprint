import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VaPrint — Digital Printing Online",
  description: "Solusi digital printing untuk personal, bisnis, promosi, dan event.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
