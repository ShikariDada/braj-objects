import type { Product } from "@/lib/productSchema";
import styles from "./Price.module.css";

export function Price({ product }: { product: Product }) {
  if (product.priceInr == null) {
    return (
      <span className={styles.price} aria-label="Price to be confirmed">
        ₹ TBD
      </span>
    );
  }
  return (
    <span className={`${styles.price} t-nums`}>
      ₹ {product.priceInr.toLocaleString("en-IN")}
    </span>
  );
}
