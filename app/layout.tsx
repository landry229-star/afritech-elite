import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  process.env.RENDER_EXTERNAL_URL?.trim() ||
  (process.env.NODE_ENV === "development" ? "http://localhost:3000" : undefined);

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: {
    default: "AfriTech Elite | Sites web & cours de maths au Bénin",
    template: "%s | AfriTech Elite",
  },
  description:
    "Création de sites web professionnels au Bénin et cours particuliers de mathématiques de la 6e à la Terminale. Découvrez nos services et contactez AfriTech Elite.",
  alternates: siteUrl ? { canonical: "/" } : undefined,
  applicationName: "AfriTech Elite",
  category: "Services professionnels et éducation",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/pwa-192.png", sizes: "192x192", type: "image/png" },
      { url: "/pwa-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "AfriTech Elite | Sites web & cours de maths au Bénin",
    description:
      "Création de sites web professionnels et cours de mathématiques de la 6e à la Terminale. Un accompagnement adapté à vos besoins.",
    locale: "fr_BJ",
    type: "website",
    siteName: "AfriTech Elite",
    ...(siteUrl ? { url: siteUrl } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: "AfriTech Elite | Sites web & cours de maths au Bénin",
    description:
      "Création de sites web professionnels et cours de mathématiques de la 6e à la Terminale.",
  },
};

export const viewport: Viewport = {
  themeColor: "#f6f1e7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "AfriTech Elite",
        ...(siteUrl ? { url: siteUrl } : {}),
        description:
          "Création de sites web professionnels et accompagnement en mathématiques au Bénin.",
        areaServed: {
          "@type": "Country",
          name: "Bénin",
        },
      },
      {
        "@type": "Service",
        name: "Création de sites web professionnels",
        serviceType: "Conception et création de sites web",
        provider: {
          "@type": "Organization",
          name: "AfriTech Elite",
        },
        areaServed: {
          "@type": "Country",
          name: "Bénin",
        },
      },
      {
        "@type": "Course",
        name: "Cours particuliers de mathématiques",
        description:
          "Cours de mathématiques selon le programme béninois, de la 6e à la Terminale, à domicile ou à distance.",
        provider: {
          "@type": "Organization",
          name: "AfriTech Elite",
        },
        educationalLevel: "Collège et lycée",
        inLanguage: "fr",
        availableLanguage: "French",
      },
    ],
  };

  return (
    <html lang="fr">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
