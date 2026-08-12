import Link from "next/link";
import ProductCard from "../../components/ProductCard";
import { products } from "../../data/products";

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[#FAF9F6] text-[#16161A]">
      {/* Header */}
      <section className="border-b border-[#16161A]/10">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-2 text-xs font-bold text-[#16161A]/50 transition hover:text-[#FF4713]"
          >
            ← Kembali ke Beranda
          </Link>

          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-[#FF4713]">
              Katalog VaPrint
            </p>

            <h1 className="text-5xl font-black leading-[0.9] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
              Cetak apa yang
              <br />
              Anda butuhkan.
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-[#16161A]/60">
              Pilih produk printing yang sesuai dengan kebutuhan Anda. Lihat
              spesifikasi, estimasi harga, dan lanjutkan pemesanan melalui
              WhatsApp.
            </p>
          </div>
        </div>
      </section>

      {/* Filter kategori */}
      <section className="border-b border-[#16161A]/10">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 py-5 lg:px-8">
          <button
            type="button"
            className="shrink-0 bg-[#16161A] px-4 py-2 text-xs font-black text-white"
          >
            Semua Produk
          </button>

          <button
            type="button"
            className="shrink-0 border border-[#16161A]/15 bg-white px-4 py-2 text-xs font-bold transition hover:border-[#16161A]"
          >
            Promosi
          </button>

          <button
            type="button"
            className="shrink-0 border border-[#16161A]/15 bg-white px-4 py-2 text-xs font-bold transition hover:border-[#16161A]"
          >
            Business
          </button>

          <button
            type="button"
            className="shrink-0 border border-[#16161A]/15 bg-white px-4 py-2 text-xs font-bold transition hover:border-[#16161A]"
          >
            Event
          </button>

          <button
            type="button"
            className="shrink-0 border border-[#16161A]/15 bg-white px-4 py-2 text-xs font-bold transition hover:border-[#16161A]"
          >
            Branding
          </button>
        </div>
      </section>

      {/* Product Grid */}
      <section>
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
          <div className="mb-8 flex items-center justify-between">
            <p className="text-sm font-bold text-[#16161A]/50">
              {products.length} produk tersedia
            </p>

            <p className="hidden text-xs text-[#16161A]/40 sm:block">
              Harga dapat berubah sesuai spesifikasi
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#FF4713] text-white">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/60">
                Tidak menemukan yang dicari?
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] sm:text-4xl">
                Konsultasikan kebutuhan cetak Anda.
              </h2>
            </div>

            <a
              href="https://wa.me/628XXXXXXXXXX"
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center justify-center bg-[#16161A] px-6 py-4 text-sm font-black transition hover:bg-white hover:text-[#16161A]"
            >
              Chat WhatsApp ↗
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}