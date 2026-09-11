import type { Metadata } from "next";
import { Newsreader, Anek_Devanagari } from "next/font/google";
import "@/styles/tokens.css";
import "@/styles/globals.css";
import "@/styles/typography.css";
import { SiteHeader } from "@/components/chrome/SiteHeader";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { CartProvider } from "@/lib/commerce/CartContext";
import { site } from "@/content/site";

const display = Newsreader({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Anek_Devanagari({
  subsets: ["latin", "devanagari"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Braj Objects — Collectible magnets from Mathura and Braj",
    template: "%s · Braj Objects",
  },
  description:
    "Numbered collectible refrigerator magnets drawn from real places in Mathura and Braj. An object archive, made to be kept.",
  metadataBase: new URL(site.url),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <CartProvider>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  );
}
