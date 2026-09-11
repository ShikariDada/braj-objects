"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import type { Product } from "@/lib/productSchema";
import { getRuntimeInfo } from "@/lib/runtimeTier";
import { ObjectPlate } from "@/components/product/ObjectPlate";
import { Button } from "@/components/ui/Button";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import styles from "./ProductViewer.module.css";

const CanvasShell = dynamic(
  () => import("@/components/three/CanvasShell").then((m) => m.CanvasShell),
  { ssr: false },
);

/** PDP viewer: poster by default, WebGL on capable devices or explicit tap. */
export function ProductViewer({ product }: { product: Product }) {
  const reduced = useReducedMotion();
  const [inspect, setInspect] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [face, setFace] = useState<"front" | "back">("front");
  // Capability-gated UI must match the server tree on first client render —
  // reading window/ WebGL during hydration produced a different tree than
  // SSR and React discarded the subtree (dead clicks, error #418). So the
  // first pass always renders the poster + tap affordance; the upgrade to
  // auto-3D happens in an effect, after hydration has committed.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // Mount flag: first client pass must match SSR (see above).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);
  const info =
    !mounted || typeof window === "undefined"
      ? { tier: 0 as const, webgl: false }
      : getRuntimeInfo();
  const auto3d = info.webgl && info.tier >= 2 && !reduced;

  const showCanvas = auto3d || inspect;

  return (
    <div className={styles.viewer}>
      <div
        className={styles.views}
        role="group"
        aria-label="Choose object view"
      >
        <button
          type="button"
          aria-pressed={face === "front"}
          onClick={() => {
            setFace("front");
            setReady(false);
            setFailed(false);
          }}
        >
          Front
        </button>
        <button
          type="button"
          aria-pressed={face === "back"}
          onClick={() => {
            setFace("back");
            setReady(false);
            setFailed(false);
          }}
        >
          Back + magnet
        </button>
      </div>
      <div className={styles.poster} style={{ opacity: ready ? 0 : 1 }} data-testid="pdp-stage">
        <ObjectPlate product={product} priority sizes="(max-width: 767px) 94vw, 60vw" view={face === "front" ? 0 : 3} />
        <p className={styles.faceNote}>
          {face === "front" ? "Face — studio render." : "Back — inset magnet disc."}
        </p>
      </div>
      {showCanvas && !failed ? (
        <div
          className={styles.canvas}
          style={{
            opacity: ready ? 1 : 0,
            visibility: ready ? "visible" : "hidden",
            pointerEvents: ready ? "auto" : "none",
          }}
        >
          <Suspense fallback={null}>
            <CanvasShell
              key={face}
              product={product}
              presetId={face === "front" ? "pdpDefault" : "pdpBack"}
              interactive
              onStatus={(s) => {
                if (s === "ready") setReady(true);
                if (s === "failed") setFailed(true);
              }}
            />
          </Suspense>
        </div>
      ) : null}
      {failed ? (
        <p className={styles.hint}>
          Interactive 3D is not available in this browser.
        </p>
      ) : !auto3d && !inspect ? (
        <div className={styles.tap}>
          <Button onClick={() => setInspect(true)}>View in 3D</Button>
          <p>Loads the interactive model.</p>
        </div>
      ) : (
        <p className={styles.hint} aria-live="polite">
          {ready ? "Drag to inspect. Scroll the page normally." : "Preparing the model."}
        </p>
      )}
    </div>
  );
}
