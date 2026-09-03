"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { products } from "../../../data/products";

const WHATSAPP_NUMBER = "6285802506149";

function ArrowRight() {
  return (
    <svg
      width="18"
      height="18"
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
      width="18"
      height="18"
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
    <span className="detail-plus" aria-hidden="true">
      <span />
      <span />
    </span>
  );
}

function RegistrationMark({
  className = "",
}: {
  className?: string;
}) {
  return (
    <span className={`detail-registration ${className}`} aria-hidden="true">
      <span />
      <span />
    </span>
  );
}

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const product = products.find((item) => item.id === id);

  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [material, setMaterial] = useState("");

  const isBanner = product?.id === "banner";

  const selectedMaterial = material || product?.material[0] || "";

  const safeWidth = Math.max(0.1, width || 0.1);
  const safeHeight = Math.max(0.1, height || 0.1);
  const safeQuantity = Math.max(1, quantity || 1);

  const totalPrice = useMemo(() => {
    if (!product) return 0;

    if (product.id === "banner") {
      const area = safeWidth * safeHeight;

      return Math.ceil(
        area * product.price * safeQuantity
      );
    }

    return product.price * safeQuantity;
  }, [
    product,
    safeWidth,
    safeHeight,
    safeQuantity,
  ]);

  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(totalPrice);

  const whatsappMessage = encodeURIComponent(
    [
      "Halo VaPrint, saya ingin memesan:",
      "",
      `Produk: ${product?.name ?? "-"}`,
      isBanner
        ? `Ukuran: ${safeWidth} × ${safeHeight} meter`
        : `Ukuran: ${product?.size ?? "-"}`,
      `Bahan: ${selectedMaterial}`,
      `Jumlah: ${safeQuantity}`,
      `Estimasi harga: ${formattedPrice}`,
      "",
      "Mohon informasi lebih lanjut mengenai pesanan saya.",
    ].join("\n")
  );

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  if (!product) {
    return (
      <main className="site-shell">
        <section className="detail-not-found">
          <div className="detail-not-found-number">404</div>

          <h1>Produk tidak ditemukan.</h1>

          <p>
            Produk yang Anda cari tidak tersedia atau alamatnya tidak
            sesuai.
          </p>

          <Link
            href="/produk"
            className="pill-button pill-button-dark"
          >
            Kembali ke katalog
            <ArrowRight />
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="site-shell product-detail-page">
      <section className="detail-shell">
        <header className="detail-header">
          <Link href="/" className="detail-brand">
            <span className="detail-brand-mark">
              V
            </span>

            <span>
              <strong>VaPrint</strong>
              <small>Digital Printing Online</small>
            </span>
          </Link>

          <Link href="/produk" className="detail-back">
            <span aria-hidden="true">←</span>
            Kembali ke katalog
          </Link>
        </header>

        <div className="detail-grid">
          {/* =================================================
              PRODUCT VISUAL
             ================================================= */}
          <div className="detail-visual-column">
            <div className="detail-visual-card">
              <div className="detail-visual-glow" />

              <RegistrationMark className="detail-registration-top-left" />
              <RegistrationMark className="detail-registration-top-right" />
              <RegistrationMark className="detail-registration-bottom-left" />
              <RegistrationMark className="detail-registration-bottom-right" />

              <div className="detail-stack detail-stack-back-one" />
              <div className="detail-stack detail-stack-back-two" />

              <div
                className={`detail-main-sheet ${
                  product.id === "brosur"
                    ? "detail-sheet-brosur"
                    : product.id === "poster"
                    ? "detail-sheet-poster"
                    : product.id === "sticker"
                    ? "detail-sheet-sticker"
                    : ""
                }`}
              >
                <div className="detail-sheet-top">
                  <span>VaPrint</span>
                  <b>PRINT SERIES</b>
                </div>

                <div className="detail-sheet-content">
                  <small>{product.category}</small>

                  <h2>
                    {product.name.replace(" / Spanduk", "")}
                  </h2>

                  <span>{product.size}</span>
                </div>

                <div className="detail-sheet-bottom">
                  <div />
                  <div className="detail-cmyk">
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
              </div>

              <div className="detail-category-badge">
                {product.category}
              </div>

              {product.popular && (
                <div className="detail-popular-badge">
                  Populer
                </div>
              )}

              <div className="detail-plus-wrap">
                <PlusMark />
              </div>
            </div>

            <div className="detail-info-grid">
              <div className="detail-info-card">
                <span>Ukuran</span>
                <strong>
                  {isBanner
                    ? `${safeWidth} × ${safeHeight} m`
                    : product.size}
                </strong>
              </div>

              <div className="detail-info-card">
                <span>Bahan tersedia</span>
                <strong>
                  {product.material.join(" / ")}
                </strong>
              </div>

              <div className="detail-info-card">
                <span>Satuan harga</span>
                <strong>
                  {isBanner ? "per m²" : `per ${product.unit}`}
                </strong>
              </div>

              <div className="detail-info-card">
                <span>Pesanan</span>
                <strong>Via WhatsApp</strong>
              </div>
            </div>
          </div>

          {/* =================================================
              PRODUCT INFORMATION
             ================================================= */}
          <div className="detail-content">
            <div className="detail-eyebrow">
              <span />
              {product.category}
            </div>

            <h1 className="detail-title">
              {product.name}
            </h1>

            <p className="detail-description">
              {product.description}
            </p>

            <div className="detail-price-row">
              <div>
                <span>Harga mulai</span>
                <strong>{product.priceLabel}</strong>
              </div>

              <span>
                {isBanner ? "per m²" : product.unit}
              </span>
            </div>

            {/* =================================================
                CALCULATOR
               ================================================= */}
            <div className="detail-calculator">
              <div className="detail-calculator-head">
                <div>
                  <span>Quick estimate</span>
                  <h2>Hitung estimasi</h2>
                </div>

                <div className="detail-cmyk-mini">
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
              </div>

              {/* Banner dimensions */}
              {isBanner && (
                <div className="detail-field">
                  <label>Ukuran banner</label>

                  <div className="detail-size-inputs">
                    <div>
                      <input
                        type="number"
                        min="0.1"
                        step="0.1"
                        value={width}
                        onChange={(event) => {
                          const value =
                            event.target.value;

                          setWidth(
                            Math.max(
                              0.1,
                              Number(value) || 0.1
                            )
                          );
                        }}
                        aria-label="Lebar banner dalam meter"
                      />

                      <span>Lebar</span>
                    </div>

                    <b>×</b>

                    <div>
                      <input
                        type="number"
                        min="0.1"
                        step="0.1"
                        value={height}
                        onChange={(event) => {
                          const value =
                            event.target.value;

                          setHeight(
                            Math.max(
                              0.1,
                              Number(value) || 0.1
                            )
                          );
                        }}
                        aria-label="Tinggi banner dalam meter"
                      />

                      <span>Tinggi</span>
                    </div>
                  </div>

                  <small>
                    Satuan ukuran menggunakan meter.
                  </small>
                </div>
              )}

              {/* Material */}
              <div className="detail-field">
                <label htmlFor="material">
                  Pilihan bahan
                </label>

                <select
                  id="material"
                  value={selectedMaterial}
                  onChange={(event) =>
                    setMaterial(event.target.value)
                  }
                >
                  {product.material.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity */}
              <div className="detail-field">
                <label>Jumlah</label>

                <div className="detail-quantity">
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((current) =>
                        Math.max(1, current - 1)
                      )
                    }
                    aria-label="Kurangi jumlah"
                  >
                    −
                  </button>

                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(event) => {
                      const value =
                        event.target.value;

                      setQuantity(
                        Math.max(
                          1,
                          Number(value) || 1
                        )
                      );
                    }}
                    aria-label="Jumlah produk"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setQuantity(
                        (current) => current + 1
                      )
                    }
                    aria-label="Tambah jumlah"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Estimate */}
              <div className="detail-estimate">
                <div>
                  <span>Estimasi total</span>
                  <strong>{formattedPrice}</strong>
                </div>

                <small>
                  Harga final menyesuaikan spesifikasi
                </small>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="detail-whatsapp"
              >
                Pesan via WhatsApp
                <ArrowUpRight />
              </a>
            </div>

            <div className="detail-note">
              <span>+</span>
              Harga yang tampil merupakan estimasi awal.
              Tim VaPrint akan mengonfirmasi bahan, ukuran,
              finishing, dan jumlah sebelum produksi.
            </div>
          </div>
        </div>
      </section>

      <section className="detail-bottom-band">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            Butuh bantuan?
          </div>

          <h2>
            Konsultasikan spesifikasi
            <span> Anda.</span>
          </h2>
        </div>

        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noreferrer"
          className="pill-button pill-button-dark"
        >
          Chat dengan VaPrint
          <ArrowRight />
        </a>
      </section>
    </main>
  );
}