"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/lib/productSchema";
import styles from "./ObjectPlate.module.css";

export function ObjectPlate({
  product,
  priority = false,
  sizes,
  label,
  view = 0,
}: {
  product: Product;
  priority?: boolean;
  sizes?: string;
  label?: string;
  /** Index into product.media — 0 front, 1 hero, 2 edge, 3 back. */
  view?: number;
}) {
  // Error state is keyed by src, so switching views retries the new plate
  // instead of sticking on a stale fallback.
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const media = product.media[view] ?? product.media[0];
  const src = media?.src ?? product.posterUrl;
  const failed = failedSrc === src;
  if (failed) {
    return (
      <div className={styles.fallback} role="img" aria-label={`${product.name} — image unavailable`}>
        <span>Braj Object {product.objectNumber}</span>
        <strong>{product.name}</strong>
      </div>
    );
  }
  return (
    <div className={styles.plate}>
      <Image
        src={src}
        alt={media?.alt ?? `Braj Object ${product.objectNumber} — ${product.name}`}
        width={800}
        height={800}
        priority={priority}
        sizes={sizes ?? "(max-width: 767px) 92vw, 50vw"}
        onError={() => setFailedSrc(src)}
      />
      {label ? <p className={styles.label}>{label}</p> : null}
    </div>
  );
}
