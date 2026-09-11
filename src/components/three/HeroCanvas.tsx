"use client";

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import type { Product } from "@/lib/productSchema";
import type { CanvasStatus } from "./CanvasShell";
import { ObjectPlate } from "@/components/product/ObjectPlate";

const CanvasShell = dynamic(
  () => import("./CanvasShell").then((m) => m.CanvasShell),
  { ssr: false },
);

/**
 * Poster-first progressive enhancement: the SVG poster is the LCP element
 * and stays until the first WebGL frame is confirmed. On failure the poster
 * remains permanently — the page never depends on WebGL.
 * Single canvas instance: the poster is purely an overlay that fades out.
 */
export function HeroCanvas({ product }: { product: Product }) {
  const [status, setStatus] = useState<CanvasStatus>("idle");
  const onStatus = useCallback((s: CanvasStatus) => setStatus(s), []);
  const ready = status === "ready";

  return (
    <>
      {status !== "failed" ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: ready ? 1 : 0,
            transition: "opacity 600ms cubic-bezier(0.2,0.7,0.2,1)",
            pointerEvents: "none",
          }}
        >
          <CanvasShell product={product} presetId="heroIdle" interactive onStatus={onStatus} />
        </div>
      ) : null}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: ready ? 0 : 1,
          transition: "opacity 600ms cubic-bezier(0.2,0.7,0.2,1)",
          pointerEvents: ready ? "none" : undefined,
        }}
      >
        <ObjectPlate product={product} priority />
      </div>
    </>
  );
}
