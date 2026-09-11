"use client";

import Link from "next/link";
import { useState } from "react";
import { products } from "@/content/products";
import { ObjectPlate } from "@/components/product/ObjectPlate";
import { Price } from "@/components/ui/Price";
import styles from "./CollectionReveal.module.css";

export function CollectionReveal() {
  const [activeId, setActiveId] = useState(products[0].id);
  const active = products.find((p) => p.id === activeId) ?? products[0];

  return (
    <section className={`wrap ${styles.section}`} aria-labelledby="collection-title">
      <div className={styles.head}>
        <p className="t-micro">The archive</p>
        <h2 id="collection-title" className="t-h2">
          The Braj Objects
        </h2>
        <p className="t-body">
          Eight objects. Move through the index — each row an original
          study, each plate drawn for the 70 mm face.
        </p>
      </div>
      <div className={styles.grid}>
        <ol className={styles.index}>
          {products.map((p) => {
            const isActive = p.id === activeId;
            return (
              <li key={p.id}>
                <button
                  type="button"
                  className={styles.row}
                  aria-current={isActive}
                  onMouseEnter={() => setActiveId(p.id)}
                  onFocus={() => setActiveId(p.id)}
                  onClick={() => setActiveId(p.id)}
                >
                  <span className={`t-nums ${styles.num}`}>{p.objectNumber}</span>
                  <span className={styles.names}>
                    <strong>{p.name}</strong>
                    <span>{p.place}</span>
                  </span>
                  <span className={styles.rowPrice}>
                    <Price product={p} />
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
        <div className={styles.plate} key={active.id}>
          <ObjectPlate
            product={active}
            sizes="(max-width: 767px) 92vw, 44vw"
            label={`Braj Object ${active.objectNumber} — ${active.name}, ${active.place}`}
          />
          <Link href={`/collection/${active.slug}`} className={styles.view}>
            View object <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
