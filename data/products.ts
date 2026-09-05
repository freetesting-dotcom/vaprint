export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  priceLabel: string;
  price: number;
  unit: string;
  size: string;
  material: string[];
  popular?: boolean;
};

export const products: Product[] = [
  {
    id: "banner",
    name: "Banner",
    category: "Outdoor & Event",
    description:
      "Banner dan spanduk untuk promosi toko, event, acara, dan kebutuhan outdoor.",
    priceLabel: "Rp23.000",
    price: 23000,
    unit: "m²",
    size: "Custom",
    material: ["Flexi 280g"],
    popular: true,
  },

  {
    id: "brosur",
    name: "Brosur",
    category: "Promosi",
    description:
      "Brosur untuk memperkenalkan produk, layanan, promo, dan informasi bisnis.",
    priceLabel: "Rp75.000",
    price: 75000,
    unit: "paket",
    size: "A5 / A4",
    material: ["Art Paper 120g", "Art Paper 150g"],
    popular: true,
  },

  {
    id: "poster",
    name: "Poster",
    category: "Promosi & Event",
    description:
      "Poster untuk promosi, pengumuman, event, kampanye, dan kebutuhan visual lainnya.",
    priceLabel: "Rp8.000",
    price: 8000,
    unit: "lembar",
    size: "A3+",
    material: ["Art Paper", "Art Cartoon"],
  },

  {
    id: "sticker",
    name: "Sticker",
    category: "Branding",
    description:
      "Stiker custom untuk kemasan produk, branding, label, dan kebutuhan promosi.",
    priceLabel: "Rp10.000",
    price: 10000,
    unit: "lembar",
    size: "Custom",
    material: ["Vinyl", "Chromo"],
    popular: true,
  },

];