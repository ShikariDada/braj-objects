"use client";

import { Suspense, useState } from "react";
import dynamic from "next/dynamic";
import { products } from "@/content/products";
import { scenePresets } from "@/lib/scenePresets";
import { ObjectPlate } from "@/components/product/ObjectPlate";

const CanvasShell = dynamic(
  () => import("@/components/three/CanvasShell").then((m) => m.CanvasShell),
  { ssr: false },
);

const PRESETS = Object.keys(scenePresets);

/** Internal tuning lab — tune here, ship the numbers via scenePresets. */
export default function MaterialsLabPage() {
  const [productId, setProductId] = useState(products[0].id);
  const [presetId, setPresetId] = useState("heroIdle");
  const product = products.find((p) => p.id === productId)!;
  const preset = scenePresets[presetId];

  return (
    <div className="wrap" style={{ paddingBlock: 48, display: "grid", gap: 24 }}>
      <p className="t-micro">Lab — materials (internal)</p>
      <h1 className="t-h1">One perfect product lab</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        {products.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setProductId(p.id)}
            aria-pressed={p.id === productId}
            style={{
              padding: "10px 16px",
              borderRadius: 10,
              border: "1px solid var(--line-strong)",
              background: p.id === productId ? "var(--ink)" : "transparent",
              color: p.id === productId ? "var(--paper-bright)" : "inherit",
              cursor: "pointer",
            }}
          >
            {p.objectNumber} · {p.name}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        {PRESETS.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setPresetId(id)}
            aria-pressed={id === presetId}
            style={{
              padding: "8px 14px",
              borderRadius: 999,
              border: "1px solid var(--line-strong)",
              background: id === presetId ? "var(--sandstone-deep)" : "transparent",
              color: id === presetId ? "var(--paper-bright)" : "inherit",
              cursor: "pointer",
            }}
          >
            {id}
          </button>
        ))}
      </div>
      <div style={{ position: "relative", minHeight: 520, border: "1px solid var(--line-strong)" }}>
        <Suspense fallback={<ObjectPlate product={product} />}>
          <CanvasShell key={product.id + presetId} product={product} presetId={presetId} interactive />
        </Suspense>
      </div>
      <pre className="t-micro t-nums" style={{ whiteSpace: "pre-wrap" }}>
        {JSON.stringify(preset, null, 2)}
      </pre>
      <p className="t-body">
        Acceptance: compare this render against the physical sample photograph —
        edge thickness, gloss behaviour, colour shift, artwork distortion, back
        accuracy. “Looks cool” is not a pass.
      </p>
    </div>
  );
}
