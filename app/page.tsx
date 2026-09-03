"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { products } from "../data/products";

const WHATSAPP_NUMBER = "6285802506149";

function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
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

function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
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

function XIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </svg>
  );
}

function PlusMark() {
  return (
    <span className="plus-mark" aria-hidden="true">
      <span />
      <span />
    </span>
  );
}

function Eyebrow({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <div className={`eyebrow ${light ? "eyebrow-light" : ""}`}>
      <span className="eyebrow-dot" />
      {children}
    </div>
  );
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div
      className={`reveal ${className}`}
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function PillButton({
  href,
  children,
  dark = false,
  onClick,
}: {
  href?: string;
  children: ReactNode;
  dark?: boolean;
  onClick?: () => void;
}) {
  const className = `pill-button ${dark ? "pill-button-dark" : ""}`;

  if (href) {
    return (
      <a href={href} className={className}>
        {children}
        <ArrowRight className="pill-arrow" />
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {children}
      <ArrowRight className="pill-arrow" />
    </button>
  );
}

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState(
    products[0]?.id ?? "banner"
  );
  const [bannerWidth, setBannerWidth] = useState(1);
  const [bannerHeight, setBannerHeight] = useState(1);
  const [quantity, setQuantity] = useState(1);

  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  const nameRef = useRef<HTMLInputElement>(null);

  const calculatorProduct = useMemo(
    () =>
      products.find((item) => item.id === selectedProduct) ??
      products[0] ??
      null,
    [selectedProduct]
  );

  const isBanner = calculatorProduct?.id === "banner";
  const safeQuantity = Math.max(1, quantity || 1);
  const safeWidth = Math.max(0.1, bannerWidth || 0.1);
  const safeHeight = Math.max(0.1, bannerHeight || 0.1);

  const estimatedPrice = useMemo(() => {
    if (!calculatorProduct) return 0;

    if (calculatorProduct.id === "banner") {
      return Math.ceil(
        safeWidth * safeHeight * calculatorProduct.price * safeQuantity
      );
    }

    return calculatorProduct.price * safeQuantity;
  }, [calculatorProduct, safeHeight, safeQuantity, safeWidth]);

  const quickWhatsAppMessage = encodeURIComponent(
    [
      "Halo VaPrint, saya ingin konsultasi dan memesan produk.",
      "",
      `Produk: ${calculatorProduct?.name ?? "-"}`,
      isBanner
        ? `Ukuran: ${safeWidth} × ${safeHeight} meter`
        : `Ukuran: ${calculatorProduct?.size ?? "-"}`,
      `Jumlah: ${safeQuantity}`,
      `Estimasi harga: Rp${estimatedPrice.toLocaleString("id-ID")}`,
      "",
      "Mohon informasi lebih lanjut mengenai pesanan saya.",
    ].join("\n")
  );

  const quickWhatsAppUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${quickWhatsAppMessage}`;

  useEffect(() => {
    const items = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal")
    );
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

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
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const previous = document.body.style.overflow;

    if (menuOpen || contactOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen, contactOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      setContactOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!contactOpen) return;

    const timer = window.setTimeout(() => nameRef.current?.focus(), 120);
    return () => window.clearTimeout(timer);
  }, [contactOpen]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    window.setTimeout(() => {
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  };

  const openContact = () => {
    setMenuOpen(false);
    setSubmitted(false);
    setSending(false);
    setContactOpen(true);
  };

  const closeContact = () => {
    setContactOpen(false);

    window.setTimeout(() => {
      setContactName("");
      setContactEmail("");
      setContactMessage("");
      setSubmitted(false);
      setSending(false);
    }, 350);
  };

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSending(true);

    const message = encodeURIComponent(
      [
        "Halo VaPrint, saya ingin konsultasi.",
        "",
        `Nama: ${contactName.trim()}`,
        `Email: ${contactEmail.trim()}`,
        "",
        "Kebutuhan cetak:",
        contactMessage.trim(),
      ].join("\n")
    );

    window.setTimeout(() => {
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
        "_blank",
        "noopener,noreferrer"
      );
      setSending(false);
      setSubmitted(true);
    }, 450);
  };

  return (
    <main className="site-shell">
      <section className="hero-card" id="top">
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />

        <header className="site-header">
          <button
            type="button"
            className="brand-link"
            onClick={() => scrollTo("top")}
            aria-label="VaPrint home"
          >
            <Image
              src="/vaprint.png"
              alt="Logo VaPrint"
              width={40}
              height={40}
              className="brand-logo"
              priority
            />
            <span className="brand-copy">
              <strong>VaPrint</strong>
              <small>Digital Printing Online</small>
            </span>
          </button>

          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#produk">Produk</a>
            <a href="#kalkulator">Kalkulator Harga</a>
            <a href="#cara-order">Cara Order</a>
            <a href="#kenapa-vaprint">Tentang</a>
          </nav>

          <div className="header-actions">
            <button
              type="button"
              className="header-visit"
              onClick={openContact}
            >
              Konsultasi
            </button>
            <button
              type="button"
              className="menu-button"
              onClick={() => setMenuOpen(true)}
              aria-label="Buka menu"
              aria-expanded={menuOpen}
            >
              <span />
              <span />
            </button>
          </div>
        </header>

        <div className="hero-content">
          <Reveal className="hero-copy">
            <Eyebrow light>Digital printing online</Eyebrow>
            <h1>
              <span>Cetak.</span>
              <span>Buat terlihat.</span>
              <span>Siap dipakai.</span>
            </h1>
            <p>
              Temukan kebutuhan printing Anda, lihat estimasi harga, lalu pesan
              langsung lewat WhatsApp. Sederhana, transparan, tanpa checkout
              yang ribet.
            </p>
            <div className="hero-buttons">
              <PillButton href="#produk">Lihat produk</PillButton>
              <PillButton href="#kalkulator" dark>
                Hitung harga
              </PillButton>
            </div>
          </Reveal>

          <Reveal className="hero-visual" delay={160}>
            <div className="visual-frame">
              <PlusMark />
              <span className="crop crop-a">
                <i />
              </span>
              <span className="crop crop-b">
                <i />
              </span>
              <span className="crop crop-c">
                <i />
              </span>
              <span className="crop crop-d">
                <i />
              </span>

              <Image
                src="/ikon.png"
                alt="VaPrint Digital Printing"
                width={900}
                height={700}
                className="hero-print-image"
                priority
              />
              
              <div className="ready-sticker">Siap Cetak</div>
            </div>
            <div className="visual-note">
              <span /> Print with purpose.
            </div>
          </Reveal>
        </div>

        <div className="hero-bottom">
          <div className="hero-bottom-meta">
            <span className="live-dot" /> Harga transparan · Konsultasi
            langsung · WhatsApp
          </div>
        </div>
      </section>

      <section className="statement-band">
        <div>
          <span className="statement-kicker">VaPrint / 2026</span>
          <p>Dari ide di layar → jadi sesuatu yang bisa dipegang.</p>
        </div>
        <span className="statement-arrow">01 — 08</span>
      </section>

      <section id="kenapa-vaprint" className="section section-light">
        <div className="section-grid-two">
          <Reveal>
            <Eyebrow>Kenapa VaPrint</Eyebrow>
            <h2>
              Printing tidak harus terasa <span>rumit.</span>
            </h2>
            <p className="section-lead">
              Kami membuat proses mencari produk, memahami harga, dan melakukan
              pemesanan menjadi lebih sederhana — tanpa mengorbankan tampilan
              dan hasil akhir.
            </p>
          </Reveal>

          <div className="benefit-grid">
            {[
              [
                "01",
                "Harga transparan",
                "Lihat estimasi harga sebelum menghubungi kami.",
              ],
              [
                "02",
                "Tidak ribet",
                "Tidak perlu akun dan tidak ada checkout panjang.",
              ],
              [
                "03",
                "Bisa konsultasi",
                "Kebutuhan khusus? Langsung diskusikan dengan tim.",
              ],
              [
                "04",
                "Fokus kualitas",
                "Setiap pesanan diperhatikan dari file sampai hasil.",
              ],
            ].map(([number, title, text], index) => (
              <Reveal key={number} delay={index * 90}>
                <div className="benefit-card">
                  <div className="benefit-number">{number}</div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <span className="benefit-arrow">
                    <ArrowUpRight />
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="produk" className="section section-surface overlap-section">
        <div className="section-head">
          <Reveal>
            <Eyebrow>Produk unggulan</Eyebrow>
            <h2>
              Yang paling sering <span>dicetak.</span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="section-sidecopy">
              Pilih kebutuhan Anda. Untuk ukuran atau spesifikasi khusus,
              langsung konsultasikan dengan tim VaPrint.
            </p>
          </Reveal>
        </div>

        <div className="products-grid">
          {products.slice(0, 4).map((product, index) => (
            <Reveal key={product.id} delay={index * 90}>
              <article className="product-card">
                <Link
                  href={`/produk/${product.id}`}
                  className="product-visual"
                >
                  <div className={`product-swatch swatch-${index + 1}`} />
                  <div
                    className={`mini-sheet ${
                      index % 2 === 0 ? "tilt-left" : "tilt-right"
                    }`}
                  >
                    <span>VaPrint</span>
                    <strong>
                      {product.name.replace(" / Spanduk", "")}
                    </strong>
                    <small>{product.size}</small>
                  </div>
                  {product.popular && (
                    <span className="popular-tag">Populer</span>
                  )}
                  <span className="corner-plus">
                    <PlusMark />
                  </span>
                </Link>

                <div className="product-body">
                  <div className="product-topline">
                    <span>{product.category}</span>
                    <ArrowUpRight />
                  </div>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <div className="product-footer">
                    <span>{product.priceLabel}</span>
                    <Link href={`/produk/${product.id}`}>
                      Hitung <ArrowRight />
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="center-action">
          <PillButton href="/produk" dark>
            Lihat semua produk
          </PillButton>
        </div>
      </section>

      <section id="kalkulator" className="section section-dark">
        <div className="section-grid-two calculator-layout">
          <Reveal>
            <Eyebrow light>Kalkulator harga</Eyebrow>
            <h2 className="dark-title">
              Tahu kisaran harga <span>sebelum chat.</span>
            </h2>
            <p className="dark-lead">
              Gunakan kalkulator sederhana untuk mendapatkan estimasi awal.
              Harga final dapat berubah sesuai bahan, ukuran, finishing, dan
              spesifikasi produksi.
            </p>
            <div className="stats-mini">
              <div>
                <strong>4+</strong>
                <span>Produk populer</span>
              </div>
              <div>
                <strong>WA</strong>
                <span>Konsultasi langsung</span>
              </div>
              <div>
                <strong>0</strong>
                <span>Checkout ribet</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="calculator-card">
              <div className="calc-head">
                <div>
                  <span>Quick estimate</span>
                  <h3>Estimasi cetak</h3>
                </div>
                <div className="cmyk-mini">
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
              </div>

              <label>
                Produk
                <select
                  value={selectedProduct}
                  onChange={(event) => {
                    setSelectedProduct(event.target.value);
                  }}
                >
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </label>

              {isBanner && (
                <div className="banner-size-fields">
                  <label>
                    Lebar (meter)
                    <input
                      type="number"
                      min={0.1}
                      step={0.1}
                      value={bannerWidth}
                      onChange={(event) =>
                        setBannerWidth(
                          Math.max(0.1, Number(event.target.value) || 0.1)
                        )
                      }
                    />
                  </label>
                  <div className="banner-x">×</div>
                  <label>
                    Tinggi (meter)
                    <input
                      type="number"
                      min={0.1}
                      step={0.1}
                      value={bannerHeight}
                      onChange={(event) =>
                        setBannerHeight(
                          Math.max(0.1, Number(event.target.value) || 0.1)
                        )
                      }
                    />
                  </label>
                </div>
              )}

              <label>
                Jumlah
                <div className="quantity-control">
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((current) => Math.max(1, current - 1))
                    }
                    aria-label="Kurangi jumlah"
                  >
                    −
                  </button>
                  <input
                    aria-label="Jumlah"
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(event) =>
                      setQuantity(
                        Math.max(1, Number(event.target.value) || 1)
                      )
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity((current) => current + 1)}
                    aria-label="Tambah jumlah"
                  >
                    +
                  </button>
                </div>
              </label>

              <div className="estimate-row">
                <div>
                  <span>Estimasi mulai dari</span>
                  <strong>Rp{estimatedPrice.toLocaleString("id-ID")}</strong>
                </div>
                <small>
                  {isBanner
                    ? "berdasarkan ukuran"
                    : `per ${calculatorProduct?.unit ?? "unit"}`}
                </small>
              </div>

              <a
                className="calc-submit"
                href={quickWhatsAppUrl}
                target="_blank"
                rel="noreferrer"
              >
                Lanjut konsultasi via WhatsApp <ArrowUpRight />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="cara-order" className="section section-light">
        <div className="section-head order-head">
          <Reveal>
            <Eyebrow>Cara order</Eyebrow>
            <h2>
              Empat langkah.
              <br />
              <span>Selesai.</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="section-sidecopy">
              Dari pilih produk sampai produksi, semua dibuat sesederhana
              mungkin.
            </p>
          </Reveal>
        </div>

        <div className="process-grid">
          {[
            ["01", "Pilih Produk", "Temukan kebutuhan printing yang sesuai."],
            ["02", "Hitung Estimasi", "Lihat kisaran harga sebelum chat."],
            [
              "03",
              "Pesan via WhatsApp",
              "Kirim detail dan konsultasikan kebutuhan.",
            ],
            ["04", "Produksi", "Setelah detail dikonfirmasi, kami proses."],
          ].map(([number, title, text], index) => (
            <Reveal key={number} delay={index * 100}>
              <div className="process-card">
                <span>{number}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
                <ArrowUpRight />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-decoration">
          <PlusMark />
        </div>
        <Reveal>
          <Eyebrow light>Butuh sesuatu yang spesifik?</Eyebrow>
          <h2>
            Ceritakan kebutuhan
            <br />
            <span>cetak Anda.</span>
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <PillButton href={`https://wa.me/${WHATSAPP_NUMBER}`} dark>
            Chat WhatsApp
          </PillButton>
        </Reveal>
      </section>

      <footer id="contact" className="footer-card">
        <div className="footer-cta">
          <div>
            <Eyebrow light>Mulai pesan</Eyebrow>
            <h2>
              Siap untuk
              <br />
              <span>dicetak?</span>
            </h2>
          </div>
          <button
            type="button"
            className="footer-book"
            onClick={openContact}
          >
            Konsultasi <ArrowRight />
          </button>
        </div>

        <div className="footer-grid">
          <div>
            <div className="brand-footer">
              <Image
                src="/vaprint.png"
                alt="Logo VaPrint"
                width={40}
                height={40}
              />
              <div>
                <strong>VaPrint</strong>
                <small>Digital Printing Online</small>
              </div>
            </div>
            <p>
              Solusi digital printing untuk kebutuhan personal, bisnis,
              promosi, dan event.
            </p>
          </div>

          <div>
            <h3>Navigasi</h3>
            <a href="#produk">Produk</a>
            <a href="#kalkulator">Kalkulator Harga</a>
            <a href="#cara-order">Cara Order</a>
            <a href="#kenapa-vaprint">Tentang</a>
          </div>

          <div>
            <h3>Hubungi</h3>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
            <a href="mailto:play@vaprint.id">play@vaprint.id</a>
            <span>Indonesia</span>
            <span>Digital Printing Online</span>
          </div>

          <div>
            <h3>Explore</h3>
            <Link href="/produk">Katalog</Link>
            <Link href="/produk/banner">Banner</Link>
            <Link href="/produk/brosur">Brosur</Link>
            <Link href="/produk/sticker">Sticker</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 VaPrint. All rights reserved.</span>
          <span>Print better. Print smarter.</span>
        </div>
      </footer>

      {menuOpen && (
        <div
          className="overlay menu-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <button
            className="overlay-backdrop"
            aria-label="Tutup menu"
            onClick={() => setMenuOpen(false)}
          />
          <div className="menu-panel">
            <div className="menu-top">
              <div className="brand-footer">
                <Image
                  src="/vaprint.png"
                  alt="Logo VaPrint"
                  width={40}
                  height={40}
                />
                <div>
                  <strong>VaPrint</strong>
                  <small>Digital Printing Online</small>
                </div>
              </div>
              <button
                className="close-circle"
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Tutup menu"
              >
                <XIcon />
              </button>
            </div>

            <div className="menu-links">
              <button onClick={() => scrollTo("produk")}>Produk</button>
              <button onClick={() => scrollTo("kalkulator")}>Kalkulator</button>
              <button onClick={() => scrollTo("cara-order")}>Cara Order</button>
              <button onClick={() => scrollTo("contact")}>Kontak</button>
            </div>

            <div className="menu-bottom">
              <button className="footer-book" onClick={openContact}>
                Konsultasi <ArrowRight />
              </button>
              <span>Instagram</span>
            </div>
          </div>
        </div>
      )}

      {contactOpen && (
        <div
          className="overlay contact-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Form konsultasi"
        >
          <button
            className="overlay-backdrop"
            aria-label="Tutup konsultasi"
            onClick={closeContact}
          />

          <div className="contact-panel">
            <div className="contact-head">
              <div>
                <Eyebrow>Konsultasi</Eyebrow>
                <h2>
                  Ceritakan
                  <br />
                  <span>kebutuhan cetak.</span>
                </h2>
              </div>
              <button
                className="close-circle close-light"
                type="button"
                onClick={closeContact}
                aria-label="Tutup konsultasi"
              >
                <XIcon />
              </button>
            </div>

            {!submitted ? (
              <form onSubmit={submitContact} className="contact-form">
                <label>
                  Nama lengkap
                  <input
                    ref={nameRef}
                    required
                    type="text"
                    value={contactName}
                    onChange={(event) => setContactName(event.target.value)}
                    placeholder="Nama Anda"
                  />
                </label>

                <label>
                  Email
                  <input
                    required
                    type="email"
                    value={contactEmail}
                    onChange={(event) => setContactEmail(event.target.value)}
                    placeholder="anda@email.com"
                  />
                </label>

                <label>
                  Kebutuhan cetak
                  <textarea
                    required
                    rows={4}
                    value={contactMessage}
                    onChange={(event) =>
                      setContactMessage(event.target.value)
                    }
                    placeholder="Saya ingin mencetak banner untuk event..."
                  />
                </label>

                <button
                  disabled={sending}
                  className="form-submit"
                  type="submit"
                >
                  {sending ? "Membuka WhatsApp…" : "Lanjut ke WhatsApp"}
                  <ArrowRight />
                </button>
              </form>
            ) : (
              <div className="success-panel">
                <div className="success-icon">✓</div>
                <h3>Pesan siap dikirim</h3>
                <p>
                  WhatsApp sudah dibuka dengan detail konsultasi Anda.
                  Lanjutkan pengiriman pesan di WhatsApp untuk menghubungi tim
                  VaPrint.
                </p>
                <button
                  type="button"
                  className="form-submit"
                  onClick={closeContact}
                >
                  Selesai
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
