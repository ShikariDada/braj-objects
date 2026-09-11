import { products } from "@/content/products";

/** Internal type proof — Newsreader + Anek Devanagari against real content. */
export default function TypeLabPage() {
  const sample = products[1];
  return (
    <div className="wrap" style={{ paddingBlock: 48, display: "grid", gap: 40 }}>
      <div>
        <p className="t-micro">Lab — type proof (internal)</p>
        <h1 className="t-display">A piece of Braj, made to be kept.</h1>
        <p className="t-lede">
          Display: Newsreader, mostly upright. Body + Devanagari: Anek
          Devanagari. Proofed with real copy — including the ₹ sign, numerals
          and Braj names.
        </p>
      </div>
      <div style={{ display: "grid", gap: 12 }}>
        <h2 className="t-h2">{sample.name} — Vishram Ghat study</h2>
        <p className="t-devanagari" lang="hi" style={{ fontSize: 28 }}>
          विश्राम घाट · मथुरा · गोवर्धन · कुसुम सरोवर · ब्रज
        </p>
        <p className="t-body t-nums">
          0123456789 · ₹ TBD · 70 × 70 × 5 mm · Object 001–006 · Dimensions,
          Material, Finish, Backing, Made in, Edition.
        </p>
        <p className="t-body">
          Hold the object sideways. Thickness, a clean cut, print that runs to
          the rim with no white flash — that is what separates a kept object
          from a market-stall trinket.
        </p>
      </div>
      <div>
        <h3 className="t-h3">Decision</h3>
        <p className="t-body">
          System C (single versatile family, Latin + Devanagari) merged with a
          Newsreader display cut: hierarchy through size and weight, not font
          mixing. No italic luxury cliché, no mono labels beyond genuine
          measurements.
        </p>
      </div>
    </div>
  );
}
