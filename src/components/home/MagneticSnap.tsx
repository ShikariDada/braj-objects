"use client";

import { useState } from "react";
import { getProduct } from "@/content/products";
import { site } from "@/content/site";
import { ObjectPlate } from "@/components/product/ObjectPlate";
import styles from "./MagneticSnap.module.css";

function contactShadow(p: number): { blur: number; width: number; opacity: number; gap: number } {
  // p 0→1: slow approach, acceleration near contact, hard stop, no bounce.
  const approach = p < 0.65 ? p / 0.65 : 1;
  const near = p < 0.65 ? 0 : (p - 0.65) / 0.35;
  const gap = Math.round((1 - (approach * 0.55 + near * 0.45)) * 120);
  return {
    gap,
    blur: 18 - Math.round(near * 12),
    width: 78 - Math.round(near * 22),
    opacity: 0.22 + near * 0.3,
  };
}

export function MagneticSnap() {
  const product = getProduct("govardhan")!;
  const [p, setP] = useState(0.55);
  const s = contactShadow(p);

  return (
    <section className={styles.snap} aria-labelledby="snap-title">
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.copy}>
          <p className="t-micro">The snap</p>
          <h2 id="snap-title" className="t-h2">
            {site.snapLine}
          </h2>
          <p className="t-body">
            Approach, align, contact — then stop completely. A magnet either seats
            with a clean click or it does not. Drag the control to feel the
            distance close.
          </p>
          <label className={styles.slider}>
            <span>Distance to the fridge door</span>
            <input
              type="range"
              min={0}
              max={100}
              value={Math.round(p * 100)}
              onChange={(e) => setP(Number(e.target.value) / 100)}
              aria-label="Magnet distance to fridge surface"
            />
          </label>
          <p className={styles.readout} aria-live="polite">
            {p >= 0.985 ? "Seated. Holding." : `${s.gap} mm to contact (illustrative)`}
          </p>
        </div>
        <div className={styles.stage} aria-hidden="true">
          <div className={styles.fridge}>
            <div className={styles.plate} style={{ transform: `translateY(${s.gap * 1.6}px)` }}>
              <ObjectPlate product={product} />
            </div>
            <div
              className={styles.shadow}
              style={{
                width: `${s.width}%`,
                filter: `blur(${s.blur}px)`,
                opacity: s.opacity,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
