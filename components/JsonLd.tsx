import { faq, site, whatsapp } from "@/content/landing";
import { siteUrl } from "@/lib/site-url";

/** Datos estructurados (schema.org) para buscadores: producto, empresa y preguntas frecuentes. */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#org`,
        name: "GODREAMAI",
        url: "https://www.godreamai.com",
        email: "go@godreamai.com",
        sameAs: ["https://www.instagram.com/godreamai.ar/"],
        address: { "@type": "PostalAddress", addressLocality: "Buenos Aires", addressCountry: "AR" },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${siteUrl}/#app`,
        name: site.name,
        description: site.description,
        url: siteUrl,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        inLanguage: "es",
        publisher: { "@id": `${siteUrl}/#org` },
        potentialAction: { "@type": "CommunicateAction", target: whatsapp.link() },
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.items.map((i) => ({
          "@type": "Question",
          name: i.q,
          acceptedAnswer: { "@type": "Answer", text: i.a },
        })),
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
