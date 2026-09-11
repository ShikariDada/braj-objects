"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import type { Product } from "@/lib/productSchema";
import { getRuntimeInfo } from "@/lib/runtimeTier";
import { scenePresets } from "@/lib/scenePresets";
import { MagnetModel } from "./MagnetModel";
import styles from "./CanvasShell.module.css";

export type CanvasStatus = "idle" | "loading" | "ready" | "failed";

/**
 * Single-owner WebGL canvas with poster fallback.
 * React state holds only the discrete readiness status; per-frame
 * animation values live in refs inside the scene (see MagnetModel).
 */
export function CanvasShell({
  product,
  presetId = "heroIdle",
  interactive = false,
  className,
  onStatus,
}: {
  product: Product;
  presetId?: string;
  interactive?: boolean;
  className?: string;
  onStatus?: (s: CanvasStatus) => void;
}) {
  // Capability is computed once during initial render state (client-only
  // component, so no SSR mismatch): unsupported devices start failed.
  const [initial] = useState<CanvasStatus>(() => {
    if (typeof window === "undefined") return "idle";
    const info = getRuntimeInfo();
    return !info.webgl || info.tier === 0 ? "failed" : "idle";
  });
  const [status, setStatus] = useState<CanvasStatus>(initial);
  const [enabled, setEnabled] = useState(false);
  const preset = scenePresets[presetId] ?? scenePresets.heroIdle;
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onStatus?.(status);
  }, [status, onStatus]);

  useEffect(() => {
    if (initial === "failed") return;
    // Defer WebGL until after first paint so the poster is always LCP.
    const t = window.setTimeout(() => setEnabled(true), 60);
    return () => window.clearTimeout(t);
  }, [initial]);

  if (status === "failed") return null;

  return (
    <div ref={wrapRef} className={`${styles.stage} ${className ?? ""}`} data-canvas-shell>
      {enabled ? (
        <Canvas
          dpr={getRuntimeInfo().dpr}
          camera={{
            position: preset.camera.position,
            fov: preset.camera.fov,
          }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          onCreated={() => setStatus("loading")}
          onError={() => setStatus("failed")}
          aria-hidden="true"
        >
          <hemisphereLight args={["#f7f4ec", "#2a241d", preset.lighting.environmentIntensity]} />
          <directionalLight
            position={preset.lighting.keyPosition}
            intensity={preset.lighting.keyIntensity}
            color="#fff4e0"
          />
          <directionalLight
            position={[-2.5, 1.2, 2.0]}
            intensity={preset.lighting.fillIntensity}
            color="#cfe0da"
          />
          {/* Rear rim: the back plate + magnet disc face away from the key,
              so without a rear source they read near-black. Low and neutral —
              it reveals the disc edge without restyling the object. */}
          <directionalLight position={[0.8, 0.6, -2.6]} intensity={1.1} color="#f2ead8" />
          <Suspense fallback={null}>
            <MagnetModel
              product={product}
              presetId={presetId}
              interactive={interactive}
              onFirstFrame={() => setStatus("ready")}
            />
          </Suspense>
        </Canvas>
      ) : null}
    </div>
  );
}
