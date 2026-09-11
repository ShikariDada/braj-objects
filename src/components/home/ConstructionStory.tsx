"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import { getProduct } from "@/content/products";
import { getRuntimeInfo } from "@/lib/runtimeTier";
import { ObjectPlate } from "@/components/product/ObjectPlate";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import styles from "./ConstructionStory.module.css";

const ExplodedView = dynamic(
  () => import("@/components/three/ExplodedView").then((m) => m.ExplodedView),
  { ssr: false },
);

const LAYERS = [
  { name: "FACE_COATING", note: "Clear protective face · TBD" },
  { name: "FACE_ART", note: "Printed artwork surface · TBD" },
  { name: "BODY", note: "Cast body · TBD" },
  { name: "BACK_PLATE", note: "Back plate · TBD" },
  { name: "MAGNET", note: "Inset magnet disc · TBD" },
];

export function ConstructionStory() {
  const product = getProduct("dwarkadhish")!;
  const reduced = useReducedMotion();
  const [explode, setExplode] = useState(0.65);
  // Same hydration contract as ProductViewer: the first client pass must
  // match SSR (static plate, no slider). The 3D upgrade lands in an effect.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // Mount flag: first client pass must match SSR (see above).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);
  // The slider only appears next to a live 3D view — never next to a
  // static fallback, where dragging it would look broken.
  const [webglOK] = useState(
    () => typeof window !== "undefined" && getRuntimeInfo().webgl,
  );
  const show3D = mounted && !reduced && webglOK;

  return (
    <section className={styles.construction} aria-labelledby="construction-title">
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.copy}>
          <p className="t-micro">What it is made of</p>
          <h2 id="construction-title" className="t-h2">
            Five layers, no mystery.
          </h2>
          <p className="t-body">
            Every layer shown here must match the manufactured object. If the real
            magnet has fewer layers, this diagram loses one — the animation never
            invents construction.
          </p>
          {!show3D ? null : (
            <>
              <label className={styles.slider}>
                <span>Drag to separate the layers</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={Math.round(explode * 100)}
                  onChange={(e) => setExplode(Number(e.target.value) / 100)}
                  aria-label="Exploded view separation"
                />
              </label>
              <p className={styles.readout} aria-live="polite">
                Separated {Math.round(explode * 100)}%
              </p>
            </>
          )}
          <ol className={styles.layers}>
            {LAYERS.map((l) => (
              <li key={l.name}>
                <code className="t-nums">{l.name}</code>
                <span>{l.note}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className={styles.stage}>
          {show3D ? (
            <Suspense fallback={<ObjectPlate product={product} />}>
              <ExplodedView product={product} amount={explode} />
            </Suspense>
          ) : (
            <ObjectPlate product={product} label="Layer stack — static view for reduced motion." />
          )}
        </div>
      </div>
    </section>
  );
}
