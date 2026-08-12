import Link from "next/link";
import type { Product } from "../data/products";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/produk/${product.id}`}
      className="group block overflow-hidden border border-[#16161A]/10 bg-white transition duration-300 hover:-translate-y-1 hover:border-[#16161A]/30"
    >
      <article>
        {/* Visual Produk */}
        <div className="relative aspect-[4/3] overflow-hidden bg-[#F0EEE9]">
          {/* Registration marks */}
          <span className="absolute left-4 top-4 h-5 w-5 text-[#16161A]/25">
            <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
            <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
          </span>

          <span className="absolute right-4 top-4 h-5 w-5 text-[#16161A]/25">
            <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
            <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
          </span>

          {/* Mockup produk */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative flex h-[55%] w-[64%] rotate-[-3deg] items-center justify-center border border-[#16161A]/20 bg-white shadow-[10px_10px_0_#16161A] transition duration-300 group-hover:-translate-y-2 group-hover:shadow-[14px_14px_0_#FF4713]">
              <div className="text-center">
                <div className="text-[9px] font-black uppercase tracking-[0.2em] text-[#16161A]/35">
                  VaPrint
                </div>

                <div className="mt-2 px-3 text-2xl font-black tracking-[-0.06em] sm:text-3xl">
                  {product.name}
                </div>

                <div className="mt-2 text-[9px] font-bold uppercase tracking-[0.15em] text-[#FF4713]">
                  {product.size}
                </div>
              </div>
            </div>
          </div>

          {/* Kategori */}
          <div className="absolute bottom-4 left-4 bg-[#16161A] px-2 py-1 text-[9px] font-black uppercase tracking-[0.15em] text-white">
            {product.category}
          </div>

          {/* Produk populer */}
          {product.popular && (
            <div className="absolute bottom-4 right-4 bg-[#FF4713] px-2 py-1 text-[9px] font-black uppercase tracking-[0.15em] text-white">
              Populer
            </div>
          )}
        </div>

        {/* Informasi Produk */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-black tracking-[-0.03em]">
                {product.name}
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#16161A]/55">
                {product.description}
              </p>
            </div>

            <span className="shrink-0 text-[#FF4713] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
              ↗
            </span>
          </div>

          {/* Harga */}
          <div className="mt-6 flex items-end justify-between border-t border-[#16161A]/10 pt-4">
            <div>
              <div className="text-[9px] font-bold uppercase tracking-wider text-[#16161A]/40">
                Harga
              </div>

              <div className="mt-1 text-sm font-black">
                {product.priceLabel}
              </div>
            </div>

            <span className="bg-[#16161A] px-4 py-2 text-xs font-black text-white transition group-hover:bg-[#FF4713]">
              Hitung
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}