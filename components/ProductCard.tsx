import Link from "next/link";
import type { Product } from "../data/products";

type ProductCardProps = {
  product: Product;
};

function ArrowRight() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function ArrowUpRight() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

function PlusMark() {
  return (
    <span className="product-plus" aria-hidden="true">
      <span />
      <span />
    </span>
  );
}

export default function ProductCard({ product }: ProductCardProps) {
  const displayName = product.name.replace(" / Spanduk", "");

  return (
    <article className="product-card">
      <Link
        href={`/produk/${product.id}`}
        className="product-visual"
        aria-label={`Lihat detail ${product.name}`}
      >
        {/* Background accent */}
        <div
          className={`product-swatch ${
            product.id === "banner"
              ? "swatch-1"
              : product.id === "brosur"
              ? "swatch-2"
              : product.id === "poster"
              ? "swatch-3"
              : "swatch-4"
          }`}
        />

        {/* Registration marks */}
        <span className="product-registration product-registration-left">
          <span />
          <span />
        </span>

        <span className="product-registration product-registration-right">
          <span />
          <span />
        </span>

        {/* Product mockup */}
        <div className="mini-sheet">
          <span>VaPrint / Print Series</span>

          <strong>{displayName}</strong>

          <small>{product.size}</small>

          <div className="mini-sheet-line" />

          <div className="mini-cmyk">
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>

        {/* Bottom labels */}
        <div className="product-visual-bottom">
          <span>{product.category}</span>

          {product.popular && <b>Populer</b>}
        </div>

        {/* Corner decoration */}
        <span className="product-corner">
          <PlusMark />
        </span>
      </Link>

      {/* Product information */}
      <div className="product-body">
        <div className="product-topline">
          <span>{product.unit}</span>
          <ArrowUpRight />
        </div>

        <h2>{product.name}</h2>

        <p>{product.description}</p>

        <div className="product-footer">
          <div>
            <span>Mulai dari</span>
            <strong>{product.priceLabel}</strong>
          </div>

          <Link
            href={`/produk/${product.id}`}
            className="product-card-action"
            aria-label={`Hitung harga ${product.name}`}
          >
            Hitung
            <ArrowRight />
          </Link>
        </div>
      </div>
    </article>
  );
}