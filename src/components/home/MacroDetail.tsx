import { ObjectPlate } from "@/components/product/ObjectPlate";
import { getProduct } from "@/content/products";
import styles from "./MacroDetail.module.css";

export function MacroDetail() {
  const obj = getProduct("vishram-ghat")!;
  return (
    <section className={`wrap ${styles.macro}`} aria-labelledby="macro-title">
      <div className={styles.rail}>
        <p className="t-micro">Look closer</p>
        <h2 id="macro-title" className="t-h2">
          The edge is the evidence.
        </h2>
        <p className="t-body">
          Hold the object sideways. Thickness, a clean cut, print that runs to the
          rim with no white flash — that is what separates a kept object from a
          market-stall trinket.
        </p>
        <dl className={styles.specs} aria-label="Specifications">
          <div>
            <dt>Thickness</dt>
            <dd className="t-nums">5 mm · concept proportion</dd>
          </div>
          <div>
            <dt>Face</dt>
            <dd>Full-bleed artwork · TBD</dd>
          </div>
          <div>
            <dt>Finish</dt>
            <dd>Soft matte · TBD</dd>
          </div>
        </dl>
      </div>
      <div className={styles.visual}>
        <ObjectPlate
          product={obj}
          sizes="(max-width: 767px) 92vw, 60vw"
          label="Edge study — thickness and bevel."
        />
      </div>
    </section>
  );
}
