import type { Metadata } from "next";
import "./globals.css";
import { LayoutProvider } from "./components/LayoutProvider";

const BASE_URL = "https://paulosantos.design";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Paulo Santos | Product Designer Specialist",
    template: "%s | Paulo Santos",
  },

  description:
    "Portfolio de Paulo Santos, Product Designer Specialist com foco em produtos digitais. Staff designer no Mercado Livre, referência em UX, UI e design de produto.",

  keywords: [
    "Paulo Santos",
    "Product Designer",
    "Product Designer Specialist",
    "UX Designer",
    "UI Designer",
    "Design de Produto",
    "Digital Product Design",
    "Mercado Livre",
    "Portfolio Designer",
    "Staff Designer",
  ],

  authors: [{ name: "Paulo Santos", url: BASE_URL }],
  creator: "Paulo Santos",

  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: BASE_URL,
    siteName: "Paulo Santos — Portfolio",
    title: "Paulo Santos | Product Designer Specialist",
    description:
      "Portfolio de Paulo Santos, Product Designer Specialist com foco em produtos digitais. Staff designer no Mercado Livre.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Paulo Santos — Product Designer Specialist",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Paulo Santos | Product Designer Specialist",
    description:
      "Portfolio de Paulo Santos, Product Designer Specialist com foco em produtos digitais.",
    images: ["/og-image.png"],
    creator: "@paulosantos",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: BASE_URL,
  },
};

// JSON-LD structured data — Person schema
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Paulo Santos",
  jobTitle: "Product Designer Specialist",
  description:
    "Product Designer Specialist com foco em produtos digitais. Staff designer no Mercado Livre.",
  url: BASE_URL,
  worksFor: {
    "@type": "Organization",
    name: "Mercado Livre",
    url: "https://www.mercadolivre.com.br",
  },
  sameAs: ["https://www.mercadolivre.com.br"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LayoutProvider>{children}</LayoutProvider>
      </body>
    </html>
  );
}
