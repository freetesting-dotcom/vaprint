import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://vaprint.vercel.app";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/produk`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/cara-order`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/tentang`,
      lastModified: new Date(),
    },
  ];
}