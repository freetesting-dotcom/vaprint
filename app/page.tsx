"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Image from 'next/image'

const WHATSAPP_NUMBER = "6285802506149";

const products = [
  {
    name: "Banner",
    category: "Outdoor & Event",
    price: "Mulai Rp23.000",
    description: "Banner untuk promosi, event, toko, dan kebutuhan outdoor.",
    size: "100 × 50 cm",
    color: "bg-orange-100",
  },
  {
    name: "Sticker",
    category: "Promosi & Branding",
    price: "Mulai Rp10.000",
    description: "Sticker custom untuk kemasan, branding, dan kebutuhan promosi.",
    size: "A3+",
    color: "bg-orange-100",
  },
  {
    name: "Brosur",
    category: "Promosi",
    price: "Mulai Rp75.000",
    description: "Brosur informatif untuk promosi produk dan layanan.",
    size: "A5",
    color: "bg-orange-100",
  },
  {
    name: "Poster",
    category: "Promosi & Event",
    price: "Mulai Rp8.000",
    description: "Poster dengan tampilan tajam untuk event dan promosi.",
    size: "A3+",
    color: "bg-orange-100",
  },
];

const calculatorProducts = [
  { name: "Banner", price: 23000 },
  { name: "Sticker", price: 10000 },
  { name: "Brosur", price: 75000 },
  { name: "Poster", price: 8000 },
];

function ArrowUpRight() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function PrintMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`pointer-events-none absolute h-5 w-5 ${className}`}
      aria-hidden="true"
    >
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
    </span>
  );
}

function VaPrintMark() {
  return (
    <div className="flex h-9 w-9 items-center justify-center border border-[#16161A] bg-[#FF4713]">
      <div className="relative h-5 w-5">
        <span className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-[#16161A]" />
        <span className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-[#16161A]" />
        <span className="absolute left-1 top-1 h-1.5 w-1.5 rounded-full bg-[#16161A]" />
      </div>
    </div>
  );
}

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState("Banner");
  const [quantity, setQuantity] = useState(1);

  const estimatedPrice = useMemo(() => {
    const product = calculatorProducts.find(
      (item) => item.name === selectedProduct
    );

    if (!product) return 0;

    return Number(product.price) * quantity;
  }, [selectedProduct, quantity]);

  const whatsappMessage = encodeURIComponent(
    `Halo VaPrint, saya ingin konsultasi dan memesan produk ${selectedProduct}. Estimasi jumlah: ${quantity} pcs.`
  );

  return (
    <main className="min-h-screen overflow-hidden bg-[#FAF9F6] text-[#16161A]">
      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-50 border-b border-[#16161A]/10 bg-[#FAF9F6]/95 backdrop-blur">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">
          <a href="#" className="flex items-center gap-3">
            <Image
            src="/vaprint.png"
            alt="Logo VaPrint"
            width={36}
            height={36}
            className="h-9 w-auto object-contain"
            />

            <div className="leading-none">
              <div className="text-[19px] font-black tracking-[-0.04em]">
                VaPrint
              </div>
              <div className="mt-1 text-[8px] font-semibold uppercase tracking-[0.18em] text-[#16161A]/50">
                Digital Printing Online
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-semibold md:flex">
            <Link
              href="#produk"
              className="transition hover:text-[#FF4713]"
            >
              Produk
            </Link>
            <a
              href="#kalkulator"
              className="transition hover:text-[#FF4713]"
            >
              Kalkulator Harga
            </a>
            <a
              href="#cara-order"
              className="transition hover:text-[#FF4713]"
            >
              Cara Order
            </a>
            <a
              href="#kenapa-vaprint"
              className="transition hover:text-[#FF4713]"
            >
              Tentang
            </a>
          </nav>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center px-2 py-2 text-xs font-bold text-[#16161A] transition hover:text-[#FF4713] sm:px-5 sm:py-3 sm:text-sm"
            aria-label="Pesan via WhatsApp"
          >
            <span>Pesan via WhatsApp</span>
          </a>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="relative border-b border-[#16161A]/10">
        <PrintMark className="left-[7%] top-12 text-[#16161A]/20" />
        <PrintMark className="right-[8%] top-20 text-[#FF4713]/40" />

        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-24">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 border border-[#16161A]/15 bg-white px-3 py-2 text-[11px] font-bold uppercase tracking-[0.16em]">
              <span className="h-2 w-2 rounded-full bg-[#FF4713]" />
              Digital Printing Online
            </div>

            <h1 className="max-w-4xl text-[clamp(3.2rem,7vw,6.5rem)] font-black leading-[0.88] tracking-[-0.065em]">
              Cetak,
              <br />
              tapi harganya
              <br />
              <span className="text-[#FF4713]">kelihatan duluan.</span>
            </h1>

            <p className="mt-8 max-w-xl text-base leading-7 text-[#16161A]/65 md:text-lg">
              Temukan kebutuhan printing Anda, lihat estimasi harga, lalu
              pesan langsung melalui WhatsApp. Sederhana tanpa proses checkout
              yang ribet.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#produk"
                className="inline-flex items-center justify-center gap-3 bg-[#FF4713] px-6 py-4 text-sm font-black text-white transition hover:bg-[#16161A]"
              >
                Lihat Produk
                <ArrowRight />
              </Link>

              <a
                href="#kalkulator"
                className="inline-flex items-center justify-center gap-3 border border-[#16161A]/20 bg-white px-6 py-4 text-sm font-black transition hover:border-[#16161A]"
              >
                Hitung Harga
                <ArrowRight />
              </a>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-[#16161A]/55">
              <span className="flex items-center gap-2">
                <CheckIcon />
                Harga transparan
              </span>
              <span className="flex items-center gap-2">
                <CheckIcon />
                Konsultasi langsung
              </span>
              <span className="flex items-center gap-2">
                <CheckIcon />
                Pesan via WhatsApp
              </span>
            </div>
          </div>

          {/* HERO PRINT VISUAL */}
          <div className="relative mx-auto w-full max-w-[580px]">
            <div className="relative aspect-square border border-[#16161A]/15 bg-[#F0EEE9] p-5 sm:p-8">
              <PrintMark className="-left-3 -top-3 text-[#16161A]/60" />
              <PrintMark className="-right-3 -top-3 text-[#16161A]/60" />
              <PrintMark className="-bottom-3 -left-3 text-[#16161A]/60" />
              <PrintMark className="-bottom-3 -right-3 text-[#16161A]/60" />

              <div className="relative flex h-full items-center justify-center overflow-hidden border border-[#16161A]/10 bg-white">
                {/* paper stack */}
                <div className="absolute h-[58%] w-[63%] translate-x-8 translate-y-8 rotate-[5deg] border border-[#16161A]/10 bg-[#DDD9D0]" />

                <div className="absolute h-[58%] w-[63%] -translate-x-2 translate-y-3 rotate-[-4deg] border border-[#16161A]/10 bg-[#FAF9F6]" />

                <div className="relative h-[58%] w-[63%] -rotate-[2deg] border border-[#16161A] bg-white p-5 shadow-[18px_18px_0_#16161A] sm:p-7">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#16161A]/45">
                        VaPrint
                      </div>
                      <div className="mt-3 text-2xl font-black tracking-[-0.05em] sm:text-3xl">
                        PRINT
                        <br />
                        READY.
                      </div>
                    </div>

                    <div className="border border-[#16161A] px-2 py-1 text-[8px] font-black uppercase tracking-widest">
                      CMYK
                    </div>
                  </div>

                  <div className="absolute bottom-7 left-7 right-7">
                    <div className="h-3 bg-[#16161A]" />
                    <div className="mt-2 grid grid-cols-4 gap-1">
                      <div className="h-2 bg-cyan-400" />
                      <div className="h-2 bg-pink-500" />
                      <div className="h-2 bg-yellow-300" />
                      <div className="h-2 bg-[#16161A]" />
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-5 right-5 bg-[#FF4713] px-3 py-2 text-[9px] font-black uppercase tracking-[0.16em] text-white sm:bottom-8 sm:right-8">
                  Siap Cetak
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-4 bg-[#16161A] px-4 py-3 text-xs font-bold text-white shadow-lg sm:-left-8">
              <span className="mr-2 text-[#FF4713]">●</span>
              Print with purpose.
            </div>
          </div>
        </div>
      </section>

      {/* ================= MARQUEE / STATEMENT ================= */}
      <section className="border-b border-[#16161A]/10 bg-[#16161A] text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-5 py-7 lg:px-8">
          <p className="text-xl font-black tracking-[-0.03em] sm:text-2xl">
            Dari ide di layar → jadi sesuatu yang bisa dipegang.
          </p>

          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.15em] text-white/50">
            <span className="h-2 w-2 bg-[#FF4713]" />
            VaPrint / Digital Printing
          </div>
        </div>
      </section>

      {/* ================= WHY VAPRINT ================= */}
      <section id="kenapa-vaprint" className="border-b border-[#16161A]/10">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <p className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-[#FF4713]">
                Kenapa VaPrint
              </p>

              <h2 className="max-w-md text-4xl font-black leading-[0.95] tracking-[-0.055em] sm:text-5xl">
                Printing tidak harus terasa rumit.
              </h2>

              <p className="mt-6 max-w-md text-sm leading-6 text-[#16161A]/60">
                Kami membuat proses mencari produk, memahami harga, dan
                melakukan pemesanan menjadi lebih sederhana.
              </p>
            </div>

            <div className="grid gap-px border border-[#16161A]/10 bg-[#16161A]/10 sm:grid-cols-2">
              {[
                {
                  number: "01",
                  title: "Harga transparan",
                  text: "Lihat estimasi harga sebelum menghubungi kami.",
                },
                {
                  number: "02",
                  title: "Tidak ribet",
                  text: "Tidak perlu membuat akun atau melewati checkout panjang.",
                },
                {
                  number: "03",
                  title: "Bisa konsultasi",
                  text: "Punya kebutuhan khusus? Langsung diskusikan dengan kami.",
                },
                {
                  number: "04",
                  title: "Fokus kualitas",
                  text: "Setiap kebutuhan printing diproses dengan perhatian pada hasil.",
                },
              ].map((item) => (
                <div
                  key={item.number}
                  className="bg-[#FAF9F6] p-7 transition hover:bg-white"
                >
                  <div className="mb-12 text-xs font-black text-[#FF4713]">
                    {item.number}
                  </div>

                  <h3 className="text-xl font-black tracking-[-0.03em]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#16161A]/55">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= PRODUCTS ================= */}
      <section id="produk" className="border-b border-[#16161A]/10">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
          <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-[#FF4713]">
                Produk
              </p>

              <h2 className="text-4xl font-black tracking-[-0.055em] sm:text-5xl">
                Yang paling sering dicetak.
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-6 text-[#16161A]/55">
              Pilih kebutuhan Anda. Untuk ukuran atau spesifikasi khusus,
              langsung konsultasikan dengan tim VaPrint.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <article
                key={product.name}
                className="group border border-[#16161A]/10 bg-white transition duration-300 hover:-translate-y-1 hover:border-[#16161A]/30"
              >
                <Link
                  href={`/produk/${product.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`relative block aspect-[4/3] overflow-hidden ${product.color}`}
                >
                  <PrintMark className="left-4 top-4 text-[#16161A]/25" />
                  <PrintMark className="right-4 top-4 text-[#16161A]/25" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className={`relative flex h-[55%] w-[64%] items-center justify-center border border-[#16161A]/20 bg-white shadow-[10px_10px_0_#16161A] transition duration-300 group-hover:-translate-y-2 group-hover:shadow-[14px_14px_0_#FF4713] ${
                        index % 2 === 0 ? "rotate-[-4deg]" : "rotate-[3deg]"
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-[9px] font-black uppercase tracking-[0.2em] text-[#16161A]/35">
                          VaPrint
                        </div>
                        <div className="mt-2 text-2xl font-black tracking-[-0.06em] sm:text-3xl">
                          {product.name}
                        </div>
                        <div className="mt-2 text-[9px] font-bold uppercase tracking-[0.15em] text-[#FF4713]">
                          {product.size}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 bg-[#16161A] px-2 py-1 text-[9px] font-black uppercase tracking-[0.15em] text-white">
                    {product.category}
                  </div>
                </Link>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-black tracking-[-0.03em]">
                        {product.name}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-[#16161A]/55">
                        {product.description}
                      </p>
                    </div>

                    <span className="shrink-0 text-[#FF4713]">
                      <ArrowUpRight />
                    </span>
                  </div>

                  <div className="mt-6 flex items-end justify-between border-t border-[#16161A]/10 pt-4">
                    <div>
                      <div className="text-[9px] font-bold uppercase tracking-wider text-[#16161A]/40">
                        Harga
                      </div>
                      <div className="mt-1 text-sm font-black">
                        {product.price}
                      </div>
                    </div>

                    <Link
                       href={`/produk/${product.name.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-xs font-black underline decoration-[#FF4713] decoration-2 underline-offset-4"
                    >
                      Hitung
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              href="#kalkulator"
              className="inline-flex items-center gap-2 border border-[#16161A]/20 bg-white px-6 py-3 text-sm font-bold transition hover:border-[#16161A]"
            >
              Lihat & hitung semua produk
              <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= CALCULATOR ================= */}
      <section id="kalkulator" className="border-b border-[#16161A]/10 bg-[#F0EEE9]">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
            <div>
              <p className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-[#FF4713]">
                Kalkulator Harga
              </p>

              <h2 className="max-w-lg text-4xl font-black leading-[0.95] tracking-[-0.055em] sm:text-5xl">
                Tahu kisaran harganya sebelum chat.
              </h2>

              <p className="mt-6 max-w-md text-sm leading-6 text-[#16161A]/60">
                Gunakan kalkulator sederhana ini untuk mendapatkan estimasi
                awal. Harga final dapat berubah sesuai bahan, ukuran, finishing,
                dan spesifikasi produksi.
              </p>
            </div>

            <div className="border border-[#16161A] bg-[#FAF9F6] p-6 shadow-[12px_12px_0_#16161A] sm:p-8">
              <div className="mb-8 flex items-center justify-between border-b border-[#16161A]/10 pb-5">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.18em] text-[#16161A]/40">
                    Quick Estimate
                  </div>
                  <div className="mt-1 text-lg font-black">
                    Estimasi cetak
                  </div>
                </div>

                <div className="flex gap-1">
                  <span className="h-3 w-3 bg-cyan-400" />
                  <span className="h-3 w-3 bg-pink-500" />
                  <span className="h-3 w-3 bg-yellow-300" />
                  <span className="h-3 w-3 bg-[#16161A]" />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="product"
                    className="mb-2 block text-xs font-black uppercase tracking-wider"
                  >
                    Produk
                  </label>

                  <select
                    id="product"
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    className="w-full appearance-none border border-[#16161A]/20 bg-white px-4 py-4 text-sm font-bold outline-none transition focus:border-[#FF4713]"
                  >
                    {calculatorProducts.map((product) => (
                      <option key={product.name} value={product.name}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="quantity"
                    className="mb-2 block text-xs font-black uppercase tracking-wider"
                  >
                    Jumlah
                  </label>

                  <div className="flex border border-[#16161A]/20 bg-white">
                    <button
                      type="button"
                      onClick={() =>
                        setQuantity((current) => Math.max(1, current - 1))
                      }
                      className="w-14 text-xl font-bold transition hover:bg-[#16161A] hover:text-white"
                    >
                      −
                    </button>

                    <input
                      id="quantity"
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => {
                        const value = e.target.value;

                        if (value === "") {
                          setQuantity(1);
                          return;
                        }
                      
                       setQuantity(Math.max(1, Number(value)));
                    }}
                      className="w-full border-x border-[#16161A]/10 bg-transparent px-4 text-center text-sm font-black outline-none"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setQuantity((current) => Math.max(1, current - 1))
                      }
                      className="w-14 text-xl font-bold transition hover:bg-[#16161A] hover:text-white"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="border-t border-[#16161A]/10 pt-6">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold text-[#16161A]/45">
                        Estimasi mulai dari
                      </div>

                      <div className="mt-1 text-3xl font-black tracking-[-0.04em]">
                        Rp{estimatedPrice.toLocaleString("id-ID")}
                      </div>
                    </div>

                    <div className="text-right text-[10px] font-bold uppercase tracking-wider text-[#16161A]/40">
                      *Estimasi
                    </div>
                  </div>
                </div>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-2 bg-[#FF4713] px-5 py-4 text-sm font-black text-white transition hover:bg-[#16161A]"
                >
                  Lanjut konsultasi via WhatsApp
                  <ArrowUpRight />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ORDER PROCESS ================= */}
      <section id="cara-order" className="border-b border-[#16161A]/10">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
          <div className="mb-14 max-w-2xl">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-[#FF4713]">
              Cara Order
            </p>

            <h2 className="text-4xl font-black leading-[0.95] tracking-[-0.055em] sm:text-5xl">
              Empat langkah.
              <br />
              Selesai.
            </h2>
          </div>

          <div className="grid border-l border-t border-[#16161A]/10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                number: "01",
                title: "Pilih Produk",
                text: "Temukan produk printing yang sesuai dengan kebutuhan Anda.",
              },
              {
                number: "02",
                title: "Hitung Estimasi",
                text: "Gunakan kalkulator untuk melihat kisaran harga.",
              },
              {
                number: "03",
                title: "Pesan via WhatsApp",
                text: "Kirim detail pesanan dan konsultasikan kebutuhan khusus.",
              },
              {
                number: "04",
                title: "Produksi",
                text: "Setelah detail dikonfirmasi, pesanan masuk proses produksi.",
              },
            ].map((step) => (
              <div
                key={step.number}
                className="group border-b border-r border-[#16161A]/10 p-7 transition hover:bg-[#16161A] hover:text-white sm:p-8 lg:min-h-[280px]"
              >
                <div className="flex items-start justify-between">
                  <span className="text-xs font-black text-[#FF4713]">
                    {step.number}
                  </span>

                  <ArrowUpRight />
                </div>

                <div className="mt-20">
                  <h3 className="text-xl font-black tracking-[-0.03em]">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#16161A]/55 group-hover:text-white/55">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="relative overflow-hidden bg-[#FF4713] text-white">
        <PrintMark className="left-8 top-8 text-white/40" />
        <PrintMark className="right-8 bottom-8 text-white/40" />

        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="mb-5 text-xs font-black uppercase tracking-[0.2em] text-white/60">
                Butuh sesuatu yang spesifik?
              </p>

              <h2 className="max-w-3xl text-5xl font-black leading-[0.9] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
                Ceritakan kebutuhan
                <br />
                cetak Anda.
              </h2>
            </div>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-[#16161A] px-7 py-5 text-sm font-black text-white transition hover:bg-white hover:text-[#16161A]"
            >
              Chat WhatsApp
              <ArrowUpRight />
            </a>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#16161A] text-white">
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center bg-[#FF4713]">
                  <div className="relative h-5 w-5">
                    <span className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-[#16161A]" />
                    <span className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-[#16161A]" />
                  </div>
                </div>

                <div>
                  <div className="text-xl font-black tracking-[-0.04em]">
                    VaPrint
                  </div>
                  <div className="text-[8px] font-semibold uppercase tracking-[0.18em] text-white/40">
                    Digital Printing Online
                  </div>
                </div>
              </div>

              <p className="mt-5 max-w-sm text-sm leading-6 text-white/45">
                Solusi digital printing untuk kebutuhan personal, bisnis,
                promosi, dan event.
              </p>
            </div>

            <div>
              <div className="text-xs font-black uppercase tracking-[0.18em] text-white/40">
                Navigasi
              </div>

              <div className="mt-5 space-y-3 text-sm text-white/65">
                <a className="block hover:text-[#FF4713]" href="#produk">
                  Produk
                </a>
                <a
                  className="block hover:text-[#FF4713]"
                  href="#kalkulator"
                >
                  Kalkulator Harga
                </a>
                <a
                  className="block hover:text-[#FF4713]"
                  href="#cara-order"
                >
                  Cara Order
                </a>
                <a
                  className="block hover:text-[#FF4713]"
                  href="#kenapa-vaprint"
                >
                  Tentang VaPrint
                </a>
              </div>
            </div>

            <div>
              <div className="text-xs font-black uppercase tracking-[0.18em] text-white/40">
                Hubungi
              </div>

              <div className="mt-5 space-y-3 text-sm text-white/65">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noreferrer"
                  className="block hover:text-[#FF4713]"
                >
                  WhatsApp
                </a>

                <p>Indonesia</p>
                <p>Digital Printing Online</p>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/35 sm:flex-row">
            <p>© 2026 VaPrint. All rights reserved.</p>

            <p>Print better. Print smarter.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}