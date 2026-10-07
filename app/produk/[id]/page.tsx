import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "../../../data/products";
import ProductDetailClient from "./ProductDetailClient";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;

  const product = products.find((item) => item.id === id);

  if (!product) {
    return {
      title: "Produk Tidak Ditemukan | VaPrint",
      description:
        "Produk yang Anda cari tidak tersedia di VaPrint Digital Printing.",
    };
  }

  const seoData: Record<
    string,
    {
      title: string;
      description: string;
    }
  > = {
    banner: {
      title: "Cetak Banner Semarang | VaPrint Digital Printing",
      description:
        "Cetak banner dan spanduk custom di Semarang. Pilih ukuran dan bahan, hitung estimasi harga, lalu pesan melalui WhatsApp VaPrint.",
    },
    brosur: {
      title: "Cetak Brosur Semarang | VaPrint Digital Printing",
      description:
        "Cetak brosur untuk promosi, bisnis, dan kebutuhan informasi di Semarang. Lihat bahan, ukuran, estimasi harga, dan pesan melalui WhatsApp VaPrint.",
    },
    poster: {
      title: "Cetak Poster Semarang | VaPrint Digital Printing",
      description:
        "Cetak poster custom di Semarang untuk promosi, event, pengumuman, dan kebutuhan visual. Lihat spesifikasi dan estimasi harga di VaPrint.",
    },
    sticker: {
      title: "Cetak Sticker Semarang | VaPrint Digital Printing",
      description:
        "Cetak sticker custom di Semarang untuk branding, label, kemasan, dan promosi. Lihat pilihan bahan, estimasi harga, dan pesan melalui WhatsApp VaPrint.",
    },
  };

  const current = seoData[id];

  return {
    title: current?.title ?? `${product.name} | VaPrint Digital Printing`,
    description:
      current?.description ??
      `${product.description} Pesan melalui WhatsApp VaPrint Digital Printing.`,
  };
}

export default async function ProductDetailPage({
  params,
}: ProductPageProps) {
  const { id } = await params;

  const product = products.find((item) => item.id === id);

  if (!product) {
    notFound();
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "VaPrint",
        item: "https://vaprint.vercel.app/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Produk",
        item: "https://vaprint.vercel.app/produk",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `https://vaprint.vercel.app/produk/${product.id}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <ProductDetailClient />
    </>
  );
}