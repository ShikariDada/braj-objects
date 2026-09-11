"use client";

import { useState } from "react";
import type { Product } from "@/lib/productSchema";
import { useCart } from "@/lib/commerce/CartContext";
import { Button } from "@/components/ui/Button";
import { Price } from "@/components/ui/Price";
import styles from "./AddToBag.module.css";

export function AddToBag({ product }: { product: Product }) {
  const { add } = useCart();
  const [message, setMessage] = useState<string | null>(null);
  const purchasable = product.status === "available" && product.priceInr != null;

  return (
    <div className={styles.block}>
      <div className={styles.row}>
        <Price product={product} />
        <span className={styles.status}>
          {product.status === "concept" ? "Archive object — pricing on release" : product.status}
        </span>
      </div>
      <Button
        disabled={!purchasable}
        onClick={() => {
          const r = add(product);
          setMessage(r.message);
        }}
        aria-disabled={!purchasable}
      >
        {purchasable ? "Add to bag" : "Pricing on release"}
      </Button>
      {message ? (
        <p role="status" className={styles.message}>
          {message}
        </p>
      ) : (
        <p className={styles.hint}>Numbered archive object.</p>
      )}
    </div>
  );
}
