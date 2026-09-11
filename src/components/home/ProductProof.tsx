import { ObjectPlate } from "@/components/product/ObjectPlate";
import { getProduct } from "@/content/products";
import styles from "./ProductProof.module.css";

export function ProductProof() {
  const front = getProduct("krishna-janmabhoomi")!;
  const edge = getProduct("dwarkadhish")!;
  const back = getProduct("vishram-ghat")!;
  return (
    <section className={styles.proof} aria-labelledby="proof-title">
      <div className={`wrap ${styles.head}`}>
        <p className="t-micro">Object study</p>
        <h2 id="proof-title" className="t-h2">
          What the camera confirms.
        </h2>
        <p className="t-body">
          Three studies every object passes — straight front, edge, and rear
          magnet.
        </p>
      </div>
      <div className={`wrap ${styles.grid}`}>
        <figure className={styles.wide}>
          <ObjectPlate product={front} view={0} label="01 — Straight front, parallel camera." />
        </figure>
        <figure>
          <ObjectPlate product={edge} view={2} label="02 — Edge and bevel macro." />
        </figure>
        <figure>
          <ObjectPlate product={back} view={3} label="03 — Rear magnet detail." />
        </figure>
      </div>
    </section>
  );
}
