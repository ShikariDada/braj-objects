import { ObjectPlate } from "@/components/product/ObjectPlate";
import { getProduct } from "@/content/products";
import styles from "./PackagingStory.module.css";

export function PackagingStory() {
  const a = getProduct("kusum-sarovar")!;
  const b = getProduct("braj-84-kos")!;
  return (
    <section className={`wrap ${styles.pack}`} aria-labelledby="pack-title">
      <div className={styles.copy}>
        <p className="t-micro">The sleeve</p>
        <h2 id="pack-title" className="t-h2">
          Packaging is part of the object.
        </h2>
        <p className="t-body">
          Each magnet seats in a die-cut paper sleeve carrying its archive mark &mdash;
          object number, place, and one line about the study. The sleeve&rsquo;s
          stencil window is drawn from Sanjhi negative-space logic, then cut for
          real. No foil is rendered here that the real sleeve will not carry.
        </p>
        <dl className={styles.grammar}>
          <div>
            <dt>Front</dt>
            <dd>Braj Objects · Object number · Place</dd>
          </div>
          <div>
            <dt>Back</dt>
            <dd>One-line study note · care · archive mark</dd>
          </div>
          <div>
            <dt>Material</dt>
            <dd>TBD</dd>
          </div>
        </dl>
      </div>
      <div className={styles.plates}>
        <ObjectPlate product={a} label="Sleeve front — stencil window study." />
        <ObjectPlate product={b} label="Magnet seated in sleeve — fit study." />
      </div>
    </section>
  );
}
