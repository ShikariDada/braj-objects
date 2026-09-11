import type { MetadataRoute } from "next";
import { products } from "@/content/products";
import { site } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/collection`, lastModified: new Date() },
    ...products.map((p) => ({
      url: `${base}/collection/${p.slug}`,
      lastModified: new Date(),
    })),
    { url: `${base}/about`, lastModified: new Date() },
    { url: `${base}/bag`, lastModified: new Date() },
  ];
}
