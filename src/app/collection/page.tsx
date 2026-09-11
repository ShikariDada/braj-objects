import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/content/products";
import { ObjectPlate } from "@/components/product/ObjectPlate";
import { Price } from "@/components/ui/Price";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "The collection",
  description: "All eight Braj Objects — numbered collectible magnets from Mathura and Braj.",
};

export default function CollectionPage() {
  return (
    <div className={`wrap ${styles.page}`}>
      <header className={styles.head}>
        <p className="t-micro">The archive</p>
        <h1 className="t-h1">Braj Objects</h1>
        <p className="t-lede">
          {products.length.toString().padStart(2, "0")} objects. Six places and
          two devotional studies, one shelf.
        </p>
      </header>
      <ol className={styles.list}>
        {products.map((p) => (
          <li key={p.id}>
            <Link href={`/collection/${p.slug}`} className={styles.row}>
              <span className={`t-nums ${styles.num}`}>{p.objectNumber}</span>
              <span className={styles.thumb}>
                <ObjectPlate product={p} sizes="(max-width: 767px) 40vw, 220px" />
              </span>
              <span className={styles.info}>
                <strong>{p.name}</strong>
                <span>
                  {p.place} · {p.shortDescription}
                </span>
              </span>
              <span className={styles.price}>
                <Price product={p} />
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
