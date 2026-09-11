"use client";

import { useState } from "react";
import { HeroObject } from "@/components/home/HeroObject";
import { ConstructionStory } from "@/components/home/ConstructionStory";
import { MagneticSnap } from "@/components/home/MagneticSnap";

/** Internal motion lab — the three signature moments, isolated. */
export default function MotionLabPage() {
  const [reduced, setReduced] = useState(false);
  return (
    <div>
      <div className="wrap" style={{ paddingBlock: 32, display: "grid", gap: 12 }}>
        <p className="t-micro">Lab — motion (internal)</p>
        <h1 className="t-h1">Signature moments</h1>
        <label style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <input type="checkbox" checked={reduced} onChange={(e) => setReduced(e.target.checked)} />
          Simulate reduced motion (static states below)
        </label>
        <p className="t-body">
          Each moment must have a clear start/end state and reverse cleanly.
          Timings: media crossfade 300–600ms, object pose change 500–900ms,
          standard ease power2.out. No elastic, no bounce.
        </p>
      </div>
      <div style={reduced ? { filter: "none" } : undefined}>
        <HeroObject />
        <ConstructionStory />
        <MagneticSnap />
      </div>
    </div>
  );
}
