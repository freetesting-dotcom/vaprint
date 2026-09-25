import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://vaprint.vercel.app",
      lastModified: new Date(),
    },
    {
      url: "https://vaprint.vercel.app/produk",
      lastModified: new Date(),
    },
    {
      url: "https://vaprint.vercel.app/cara-order",
      lastModified: new Date(),
    },
    {
      url: "https://vaprint.vercel.app/tentang",
      lastModified: new Date(),
    },
  ];
}