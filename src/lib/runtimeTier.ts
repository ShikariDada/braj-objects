export type RuntimeTier = 0 | 1 | 2 | 3;

export type RuntimeInfo = {
  tier: RuntimeTier;
  dpr: number;
  webgl: boolean;
  reducedMotion: boolean;
  coarsePointer: boolean;
};

function hasWebGL(): boolean {
  if (typeof document === "undefined") return false;
  try {
    const c = document.createElement("canvas");
    return !!(
      c.getContext("webgl2") ||
      c.getContext("webgl") ||
      c.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

/** Tiered capability probe. No fingerprinting, no analytics — local only. */
export function getRuntimeInfo(): RuntimeInfo {
  if (typeof window === "undefined") {
    return { tier: 0, dpr: 1, webgl: false, reducedMotion: false, coarsePointer: false };
  }
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const webgl = hasWebGL();
  const w = window.innerWidth;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  if (!webgl) return { tier: 0, dpr: 1, webgl, reducedMotion, coarsePointer };
  if (reducedMotion && w < 768) return { tier: 0, dpr: 1, webgl, reducedMotion, coarsePointer };
  if (w < 768 || coarsePointer) return { tier: 1, dpr: 1, webgl, reducedMotion, coarsePointer };
  if (w < 1280) return { tier: 2, dpr: Math.min(dpr, 1.5), webgl, reducedMotion, coarsePointer };
  return { tier: 3, dpr: Math.min(dpr, 2), webgl, reducedMotion, coarsePointer };
}
