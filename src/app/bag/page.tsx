"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/commerce/CartContext";
import { localAdapter } from "@/lib/commerce/localAdapter";
import { Button } from "@/components/ui/Button";
import { ObjectPlate } from "@/components/product/ObjectPlate";
import styles from "./page.module.css";

export default function BagPage() {
  const { lines, setQuantity, remove, clear, subtotalNote } = useCart();
  const [checkout, setCheckout] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const beginCheckout = async () => {
    setError(null);
    try {
      const cart = await localAdapter.createCart();
      for (const l of lines) {
        await localAdapter.addLine({ cartId: cart.id, productId: l.product.id, quantity: l.quantity });
      }
      setCheckout(await localAdapter.getCheckoutUrl(cart.id));
    } catch {
      setError("We couldn't start checkout. Try again.");
    }
  };

  if (lines.length === 0) {
    return (
      <div className={`wrap ${styles.page}`}>
        <h1 className="t-h1">Your bag is empty.</h1>
        <p className="t-lede">
          Nothing here yet. The archive holds eight objects — start with the first.
        </p>
        <Link href="/collection">View the collection</Link>
      </div>
    );
  }

  return (
    <div className={`wrap ${styles.page}`}>
      <h1 className="t-h1">Bag</h1>
      <ol className={styles.lines}>
        {lines.map((l) => (
          <li key={l.product.id} className={styles.line}>
            <span className={styles.thumb}>
              <ObjectPlate product={l.product} sizes="160px" />
            </span>
            <span className={styles.info}>
              <span className="t-micro t-nums">
                Braj Object {l.product.objectNumber}
              </span>
              <strong>{l.product.name}</strong>
              <span className={styles.qty}>
                <button
                  type="button"
                  onClick={() => setQuantity(l.product.id, l.quantity - 1)}
                  aria-label={`Decrease quantity of ${l.product.name}`}
                >
                  −
                </button>
                <span aria-live="polite" aria-label={`Quantity ${l.quantity}`}>
                  {l.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(l.product.id, l.quantity + 1)}
                  aria-label={`Increase quantity of ${l.product.name}`}
                >
                  +
                </button>
              </span>
            </span>
            <button type="button" className={styles.remove} onClick={() => remove(l.product.id)}>
              Remove
            </button>
          </li>
        ))}
      </ol>
      <p className={styles.note}>{subtotalNote}</p>
      <div className={styles.actions}>
        <Button onClick={beginCheckout}>Begin checkout</Button>
        <button type="button" className={styles.clear} onClick={clear}>
          Clear bag
        </button>
      </div>
      {checkout ? (
        <p role="status" className={styles.status}>
          Checkout reference ready: <code>{checkout}</code>
        </p>
      ) : null}
      {error ? (
        <p role="alert" className={styles.error}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
