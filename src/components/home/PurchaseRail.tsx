import Link from "next/link";
import { products } from "@/content/products";
import { ObjectPlate } from "@/components/product/ObjectPlate";
import { Price } from "@/components/ui/Price";
import styles from "./PurchaseRail.module.css";

export function PurchaseRail() {
  return (
    <section className={`wrap ${styles.rail}`} aria-labelledby="buy-title">
      <div className={styles.head}>
        <h2 id="buy-title" className="t-h2">
          Take the set home.
        </h2>
        <p className="t-body">
          The numbered set — pricing on release.
        </p>
      </div>
      <ol className={styles.rows}>
        {products.map((p) => (
          <li key={p.id} className={styles.row}>
            <span className={styles.thumb}>
              <ObjectPlate product={p} sizes="(max-width: 767px) 30vw, 160px" />
            </span>
            <span className={styles.info}>
              <span className="t-micro t-nums">
                Braj Object {p.objectNumber} · {p.place}
              </span>
              <Link href={`/collection/${p.slug}`} className={styles.name}>
                {p.name}
              </Link>
            </span>
            <span className={styles.buy}>
              <Price product={p} />
              <Link href={`/collection/${p.slug}`} className={styles.cta}>
                {p.priceInr != null && p.status === "available" ? "Add to bag" : "View object"}
              </Link>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
