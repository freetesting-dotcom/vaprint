"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { products } from "../../data/products";

const WHATSAPP_NUMBER = "6285802506149";

const filters = [
  { label: "Semua", value: "all" },
  { label: "Outdoor & Event", value: "Outdoor & Event" },
  { label: "Promosi", value: "Promosi" },
  { label: "Promosi & Event", value: "Promosi & Event" },
  { label: "Branding", value: "Branding" },
];

export default function ProductsPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProducts = useMemo(() => {
    if (activeFilter === "all") return products;
    return products.filter((product) => product.category === activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [activeFilter]);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <main className="site-shell catalog-page">
      <section className="catalog-hero section section-dark">
        <div className="catalog-topbar">
          <Link href="/" className="catalog-back">
            <span aria-hidden="true">←</span>
            Kembali ke beranda
          </Link>
          <span className="catalog-code">VaPrint / Katalog</span>
        </div>

        <div className="catalog-hero-grid">
          <div>
            <div className="reveal">
              <div className="eyebrow eyebrow-light">
                <span className="eyebrow-dot" />
                Katalog VaPrint
              </div>

              <h1 className="catalog-title">
                Cetak apa yang
                <br />
                Anda <span>butuhkan.</span>
              </h1>

              <p className="catalog-lead">
                Pilih produk printing sesuai kebutuhan Anda. Lihat spesifikasi,
                estimasi harga, lalu lanjutkan pemesanan melalui WhatsApp.
              </p>
            </div>

            <div
              className="catalog-meta reveal"
              style={{ ["--reveal-delay" as string]: "120ms" }}
            >
              <div>
                <strong>{products.length}</strong>
                <span>produk tersedia</span>
              </div>
              <div>
                <strong>WA</strong>
                <span>konsultasi langsung</span>
              </div>
            </div>
          </div>

          <div
            className="catalog-hero-art reveal"
            style={{ ["--reveal-delay" as string]: "180ms" }}
          >
            <div className="catalog-art-card">
              <div className="catalog-art-orb" />
              <div className="catalog-art-sheet">
                <span>VAPRINT</span>
                <strong>
                  PRINT
                  <br />
                  BETTER.
                </strong>
                <small>Digital Printing Online</small>
                <div className="catalog-cmyk">
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
              </div>
              <div className="catalog-art-label">READY TO PRINT</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-light catalog-products-section">
        <div className="catalog-heading">
          <div className="reveal">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              Semua produk
            </div>
            <h2>
              Pilih. Hitung.
              <br />
              <span>Pesan.</span>
            </h2>
          </div>

          <div
            className="catalog-heading-copy reveal"
            style={{ ["--reveal-delay" as string]: "120ms" }}
          >
            <p>
              Harga yang tampil merupakan harga awal. Ukuran, bahan, finishing,
              dan jumlah dapat memengaruhi harga final.
            </p>
          </div>
        </div>

        <div
          className="catalog-filters reveal"
          style={{ ["--reveal-delay" as string]: "180ms" }}
          role="group"
          aria-label="Filter kategori produk"
        >
          {filters.map((filter) => {
            const active = activeFilter === filter.value;

            return (
              <button
                key={filter.value}
                type="button"
                className={`catalog-filter ${active ? "is-active" : ""}`}
                onClick={() => setActiveFilter(filter.value)}
                aria-pressed={active}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <div className="catalog-results-bar">
          <span>
            <strong>{filteredProducts.length}</strong> produk ditampilkan
          </span>
          <span className="catalog-results-note">
            Pilih produk untuk melihat kalkulator
          </span>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="products-grid catalog-grid">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="reveal"
                style={{
                  ["--reveal-delay" as string]: `${index * 80}ms`,
                }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="catalog-empty reveal">
            <span>Belum ada produk pada kategori ini.</span>
            <button type="button" onClick={() => setActiveFilter("all")}>
              Lihat semua produk
            </button>
          </div>
        )}
      </section>

      <section className="catalog-cta">
        <div>
          <div className="eyebrow eyebrow-light">
            <span className="eyebrow-dot" />
            Tidak menemukan yang dicari?
          </div>

          <h2>
            Punya kebutuhan
            <br />
            <span>khusus?</span>
          </h2>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="pill-button pill-button-dark"
        >
          Konsultasi via WhatsApp
          <span className="pill-arrow">→</span>
        </a>
      </section>

      <footer className="footer-card">
        <div className="footer-cta">
          <div>
            <div className="eyebrow eyebrow-light">
              <span className="eyebrow-dot" />
              Mulai pesan
            </div>

            <h2>
              Siap untuk
              <br />
              <span>dicetak?</span>
            </h2>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="footer-book"
          >
            Hubungi VaPrint <span>→</span>
          </a>
        </div>

        <div className="footer-grid">
          <div>
            <div className="brand-footer">
              <strong>VaPrint</strong>
              <small>Digital Printing Online</small>
            </div>
            <p>
              Solusi digital printing untuk kebutuhan personal, bisnis,
              promosi, dan event.
            </p>
          </div>

          <div>
            <h3>Navigasi</h3>
            <Link href="/#produk">Produk</Link>
            <Link href="/#kalkulator">Kalkulator Harga</Link>
            <Link href="/#cara-order">Cara Order</Link>
            <Link href="/#kenapa-vaprint">Tentang</Link>
          </div>

          <div>
            <h3>Hubungi</h3>
            <a href={whatsappUrl} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
            <a href="mailto:play@vaprint.id">play@vaprint.id</a>
            <span>Indonesia</span>
          </div>

          <div>
            <h3>Explore</h3>
            <Link href="/produk/banner">Banner</Link>
            <Link href="/produk/brosur">Brosur</Link>
            <Link href="/produk/poster">Poster</Link>
            <Link href="/produk/sticker">Sticker</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 VaPrint. All rights reserved.</span>
          <span>Print better. Print smarter.</span>
        </div>
      </footer>
    </main>
  );
}
