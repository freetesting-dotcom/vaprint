export default function OrganizationSchema() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "VaPrint",
    alternateName: "VaPrint Digital Printing",
    url: "https://vaprint.vercel.app/",
    logo: "https://vaprint.vercel.app/vaprint.png",
    description:
      "VaPrint adalah layanan digital printing di Semarang untuk banner, brosur, poster, sticker, dan berbagai kebutuhan cetak custom.",
    email: "adiwibowodeva@gmail.com",
    telephone: "+6285802506149",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(organizationSchema),
      }}
    />
  );
}