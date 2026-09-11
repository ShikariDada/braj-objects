import type { Product } from "@/lib/productSchema";
import styles from "./ProductFacts.module.css";

function cell(label: string, value: string, state: string) {
  return (
    <div className={styles.row} key={label}>
      <dt>{label}</dt>
      <dd>
        {value}{" "}
        {state === "tbd" ? (
          <span className={styles.tbd} title="Awaiting verification against the physical sample">
            TBD
          </span>
        ) : null}
      </dd>
    </div>
  );
}

/** Technical facts rail — unknown values stay visibly TBD, never invented. */
export function ProductFacts({ product }: { product: Product }) {
  const dims = product.dimensionsMm
    ? `${product.dimensionsMm.width} × ${product.dimensionsMm.height} × ${product.dimensionsMm.depth} mm${product.dimensionsMm.verified ? "" : " · concept proportion"}`
    : "TBD";
  return (
    <dl className={styles.facts} aria-label={`${product.name} technical facts`}>
      {cell("Dimensions", dims, product.dimensionsMm?.verified ? "verified" : "tbd")}
      {product.materials.map((m) =>
        cell(m.label, m.value ?? "TBD", m.verification),
      )}
    </dl>
  );
}
