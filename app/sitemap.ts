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
      url: "https://vaprint.vercel.app/produk/banner",
      lastModified: new Date(),
    },
    {
      url: "https://vaprint.vercel.app/produk/brosur",
      lastModified: new Date(),
    },
    {
      url: "https://vaprint.vercel.app/produk/poster",
      lastModified: new Date(),
    },
    {
      url: "https://vaprint.vercel.app/produk/sticker",
      lastModified: new Date(),
    },
  ];
}