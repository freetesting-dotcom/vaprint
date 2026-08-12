"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { products } from "../../../data/products";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const product = products.find((item) => item.id === id);

  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [material, setMaterial] = useState("");

  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAF9F6] px-5 text-[#16161A]">
        <div className="text-center">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#FF4713]">
            404
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-[-0.05em]">
            Produk tidak ditemukan.
          </h1>

          <Link
            href="/produk"
            className="mt-8 inline-flex bg-[#16161A] px-6 py-3 text-sm font-black text-white transition hover:bg-[#FF4713]"
          >
            ← Kembali ke Katalog
          </Link>
        </div>
      </main>
    );
  }

  const selectedMaterial = material || product.material[0];

  const isBanner = product.id === "banner";

  const totalPrice = useMemo(() => {
    if (isBanner) {
      const area = Math.max(width, 0) * Math.max(height, 0);
      return Math.ceil(area * product.price * Math.max(quantity, 1));
    }

    return product.price * Math.max(quantity, 1);
  }, [width, height, quantity, product.price, isBanner]);

  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(totalPrice);

  const whatsappMessage = encodeURIComponent(
    `Halo VaPrint, saya ingin memesan:

Produk: ${product.name}
Ukuran: ${isBanner ? `${width} × ${height} meter` : product.size}
Bahan: ${selectedMaterial}
Jumlah: ${quantity}
Estimasi harga: ${formattedPrice}

Mohon informasi lebih lanjut mengenai pesanan saya.`
  );

  const whatsappUrl = `https://wa.me/6285802506149?text=${whatsappMessage}`;

  return (
    <main className="min-h-screen bg-[#FAF9F6] text-[#16161A]">
      {/* Header */}
      <header className="border-b border-[#16161A]/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
          <Link
            href="/"
            className="text-xl font-black tracking-[-0.06em]"
          >
            Va<span className="text-[#FF4713]">Print</span>
          </Link>

          <Link
            href="/produk"
            className="text-xs font-black uppercase tracking-[0.12em] text-[#16161A]/60 transition hover:text-[#FF4713]"
          >
            ← Katalog
          </Link>
        </div>
      </header>

      {/* Main */}
      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Visual */}
          <div>
            <div className="relative aspect-[4/3] overflow-hidden bg-[#F0EEE9]">
              <span className="absolute left-5 top-5 h-6 w-6 text-[#16161A]/20">
                <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
                <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
              </span>

              <span className="absolute right-5 top-5 h-6 w-6 text-[#16161A]/20">
                <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
                <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
              </span>

              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="flex aspect-[1.6/1] w-[75%] rotate-[-3deg] items-center justify-center border border-[#16161A]/20 bg-white p-6 shadow-[14px_14px_0_#16161A]">
                  <div className="text-center">
                    <div className="text-xs font-black uppercase tracking-[0.25em] text-[#16161A]/30">
                      VaPrint
                    </div>

                    <div className="mt-3 text-4xl font-black tracking-[-0.07em] sm:text-5xl">
                      {product.name}
                    </div>

                    <div className="mt-3 text-xs font-bold uppercase tracking-[0.15em] text-[#FF4713]">
                      {product.category}
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-5 left-5 bg-[#FF4713] px-3 py-2 text-[10px] font-black uppercase tracking-[0.15em] text-white">
                {product.category}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="border border-[#16161A]/10 bg-white p-4">
                <div className="text-[9px] font-black uppercase tracking-wider text-[#16161A]/40">
                  Ukuran
                </div>
                <div className="mt-1 text-sm font-black">
                  {product.size}
                </div>
              </div>

              <div className="border border-[#16161A]/10 bg-white p-4">
                <div className="text-[9px] font-black uppercase tracking-wider text-[#16161A]/40">
                  Bahan
                </div>
                <div className="mt-1 text-sm font-black">
                  {product.material.join(" / ")}
                </div>
              </div>
            </div>
          </div>

          {/* Detail + Calculator */}
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#FF4713]">
              {product.category}
            </p>

            <h1 className="mt-3 text-5xl font-black leading-[0.9] tracking-[-0.06em] sm:text-6xl">
              {product.name}
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-[#16161A]/60">
              {product.description}
            </p>

            <div className="mt-8 border-t border-[#16161A]/10 pt-8">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.15em] text-[#16161A]/40">
                    Harga mulai
                  </div>

                  <div className="mt-1 text-2xl font-black">
                    {product.priceLabel}
                  </div>
                </div>

                <div className="text-right text-xs font-bold text-[#16161A]/40">
                  {isBanner ? "per m²" : product.unit}
                </div>
              </div>
            </div>

            {/* Calculator */}
            <div className="mt-8 border border-[#16161A]/10 bg-white p-5 sm:p-7">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-black tracking-[-0.03em]">
                  Hitung Estimasi
                </h2>

                <span className="bg-[#F0EEE9] px-2 py-1 text-[9px] font-black uppercase tracking-wider">
                  Kalkulator
                </span>
              </div>

              {/* Ukuran Banner */}
              {isBanner && (
                <div className="mt-6">
                  <label className="text-[10px] font-black uppercase tracking-[0.12em] text-[#16161A]/50">
                    Ukuran Banner
                  </label>

                  <div className="mt-2 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                    <input
                      type="number"
                      min="0.1"
                      step="0.1"
                      value={width}
                      onChange={(e) =>
                        setWidth(Number(e.target.value))
                      }
                      className="w-full border border-[#16161A]/15 bg-[#FAF9F6] px-4 py-3 text-sm font-bold outline-none transition focus:border-[#FF4713]"
                      placeholder="Lebar"
                    />

                    <span className="text-sm font-black text-[#16161A]/30">
                      ×
                    </span>

                    <input
                      type="number"
                      min="0.1"
                      step="0.1"
                      value={height}
                      onChange={(e) =>
                        setHeight(Number(e.target.value))
                      }
                      className="w-full border border-[#16161A]/15 bg-[#FAF9F6] px-4 py-3 text-sm font-bold outline-none transition focus:border-[#FF4713]"
                      placeholder="Tinggi"
                    />
                  </div>

                  <p className="mt-2 text-[10px] text-[#16161A]/40">
                    Satuan ukuran: meter
                  </p>
                </div>
              )}

              {/* Bahan */}
              <div className="mt-5">
                <label className="text-[10px] font-black uppercase tracking-[0.12em] text-[#16161A]/50">
                  Pilihan Bahan
                </label>

                <select
                  value={selectedMaterial}
                  onChange={(e) => setMaterial(e.target.value)}
                  className="mt-2 w-full border border-[#16161A]/15 bg-[#FAF9F6] px-4 py-3 text-sm font-bold outline-none transition focus:border-[#FF4713]"
                >
                  {product.material.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* Jumlah */}
              <div className="mt-5">
                <label className="text-[10px] font-black uppercase tracking-[0.12em] text-[#16161A]/50">
                  Jumlah
                </label>

                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, Number(e.target.value)))
                  }
                  className="mt-2 w-full border border-[#16161A]/15 bg-[#FAF9F6] px-4 py-3 text-sm font-bold outline-none transition focus:border-[#FF4713]"
                />
              </div>

              {/* Total */}
              <div className="mt-7 border-t border-[#16161A]/10 pt-6">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.15em] text-[#16161A]/40">
                      Estimasi harga
                    </div>

                    <div className="mt-1 text-3xl font-black tracking-[-0.05em]">
                      {formattedPrice}
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-[10px] leading-5 text-[#16161A]/40">
                  Harga di atas merupakan estimasi. Harga final dapat
                  menyesuaikan spesifikasi dan jumlah pesanan.
                </p>
              </div>

              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 flex w-full items-center justify-center bg-[#FF4713] px-5 py-4 text-sm font-black text-white transition hover:bg-[#16161A]"
              >
                Pesan via WhatsApp ↗
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}