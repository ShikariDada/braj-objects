import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProduct, getRelated, products } from "@/content/products";
import { site } from "@/content/site";
import { ObjectPlate } from "@/components/product/ObjectPlate";
import { ProductFacts } from "@/components/product/ProductFacts";
import { AddToBag } from "@/components/product/AddToBag";
import { ProductViewer } from "@/components/product/ProductViewer";
import styles from "./page.module.css";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return { title: "Object not found" };
  return {
    title: `Braj Object ${p.objectNumber} — ${p.name}`,
    description: p.shortDescription,
    openGraph: {
      title: `Braj Object ${p.objectNumber} — ${p.name}`,
      description: p.shortDescription,
      images: [{ url: `${site.url}${p.posterUrl}`, width: 800, height: 800 }],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const related = getRelated(product);

  return (
    <div className={`wrap ${styles.page}`}>
      <nav aria-label="Breadcrumb" className={styles.crumb}>
        <Link href="/collection">Collection</Link>
        <span aria-hidden="true"> / </span>
        <span aria-current="page">
          Object {product.objectNumber} — {product.name}
        </span>
      </nav>
      <div className={styles.grid}>
        <div className={styles.stage}>
          <ProductViewer product={product} />
        </div>
        <div className={styles.buy}>
          <p className="t-micro t-nums">
            Braj Object {product.objectNumber} · {product.place}
          </p>
          <h1 className="t-h1">{product.name}</h1>
          {product.devanagariName ? (
            <p className="t-devanagari" lang="hi">
              {product.devanagariName}
            </p>
          ) : null}
          <p className="t-lede">{product.shortDescription}</p>
          <AddToBag product={product} />
          <ProductFacts product={product} />
        </div>
      </div>
      {product.longDescription ? (
        <section className={styles.story} aria-label={`About ${product.name}`}>
          <h2 className="t-h2">About this object</h2>
          <p className="t-body">{product.longDescription}</p>
        </section>
      ) : null}
      <section className={styles.gallery} aria-label="Views of the object">
        <h2 className="t-h2">Views</h2>
        <div className={styles.shots}>
          <ObjectPlate product={product} view={1} label="Three-quarter studio view — body and shadow." />
          <ObjectPlate product={product} view={2} label="Edge and bevel macro." />
          <ObjectPlate product={product} view={3} label="Rear plate with inset magnet disc." />
        </div>
      </section>
      <section aria-label="Related objects">
        <h2 className="t-h2">Keep going</h2>
        <ol className={styles.related}>
          {related.map((r) => (
            <li key={r.id}>
              <Link href={`/collection/${r.slug}`}>
                <ObjectPlate product={r} sizes="(max-width: 767px) 44vw, 300px" />
                <span className={styles.relatedMeta}>
                  <span className="t-micro t-nums">
                    {r.objectNumber} · {r.place}
                  </span>
                  <strong>{r.name}</strong>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
