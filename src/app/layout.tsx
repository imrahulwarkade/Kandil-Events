import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kandil-events.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Kandil Events — Where Moments Become Magic",
    template: "%s | Kandil Events",
  },
  description:
    "Kandil Events orchestrates bespoke celebrations — from grand weddings and elegant corporate galas to intimate cultural ceremonies.",
  openGraph: {
    title: "Kandil Events — Where Moments Become Magic",
    description:
      "Bespoke event design and flawless execution for weddings, corporate galas, and cultural celebrations.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kandil Events — Where Moments Become Magic",
    description:
      "Bespoke event design and flawless execution for weddings, corporate galas, and cultural celebrations.",
  },
  icons: {
    icon: "/assets/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jost.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
