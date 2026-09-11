import {
  assertNoConceptPosingAsReal,
  validateProducts,
  type Product,
} from "@/lib/productSchema";

// Subpath prefix for the permanent static build (GitHub Pages serves the
// site under /braj-objects). Empty in dev/normal prod, so behaviour there
// is byte-identical to before.
const P = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const TBD = {
  label: "",
  value: null as string | null,
  verification: "tbd" as const,
};

function facts(): Product["materials"] {
  return [
    { ...TBD, label: "Material" },
    { ...TBD, label: "Finish" },
    { ...TBD, label: "Backing" },
    { ...TBD, label: "Made in" },
    { ...TBD, label: "Edition" },
  ];
}

const raw: Product[] = [
  {
    id: "obj001",
    slug: "krishna-janmabhoomi",
    objectNumber: "001",
    name: "Krishna Janmabhoomi",
    devanagariName: "मथुरा",
    place: "Mathura",
    shortDescription: "The old doorway at Janmabhoomi, reduced to arch and courtyard.",
    longDescription:
      "A study of the cusped doorway — concentric arches in the red-stone family, with a single lamp kept at the courtyard's centre. The first object in the Braj archive.",
    priceInr: null,
    currency: "INR",
    status: "concept",
    materials: facts(),
    dimensionsMm: { width: 70, height: 70, depth: 5, verified: false },
    weightGrams: undefined,
    editionSize: null,
    posterUrl: `${P}/assets/product/krishna-janmabhoomi-front.webp`,
    media: [
      {
        type: "poster",
        src: `${P}/assets/product/krishna-janmabhoomi-front.webp`,
        alt: "Braj Object 001 — Krishna Janmabhoomi magnet face, arch study in sandstone red",
        provenance: "render",
      },
      {
        type: "poster",
        src: `${P}/assets/product/krishna-janmabhoomi-hero.webp`,
        alt: "Braj Object 001 — three-quarter studio view of the magnet on a sweep",
        provenance: "render",
      },
      {
        type: "poster",
        src: `${P}/assets/product/krishna-janmabhoomi-edge.webp`,
        alt: "Braj Object 001 — edge and bevel macro of the magnet body",
        provenance: "render",
      },
      {
        type: "poster",
        src: `${P}/assets/product/krishna-janmabhoomi-back.webp`,
        alt: "Braj Object 001 — rear plate with inset magnet disc",
        provenance: "render",
      },
    ],
    rightsStatus: "pending",
  },
  {
    id: "obj002",
    slug: "vishram-ghat",
    objectNumber: "002",
    name: "Vishram Ghat",
    devanagariName: "विश्राम घाट",
    place: "Mathura",
    shortDescription: "Steps down to the Yamuna, one lamp on dark water.",
    longDescription:
      "Five bands of ghat steps fall to a field of deep Yamuna green. A single brass lamp burns on the water with its reflection drawn beneath it.",
    priceInr: null,
    currency: "INR",
    status: "concept",
    materials: facts(),
    dimensionsMm: { width: 70, height: 70, depth: 5, verified: false },
    editionSize: null,
    posterUrl: `${P}/assets/product/vishram-ghat-front.webp`,
    media: [
      {
        type: "poster",
        src: `${P}/assets/product/vishram-ghat-front.webp`,
        alt: "Braj Object 002 — Vishram Ghat magnet face, ghat steps meeting dark water",
        provenance: "render",
      },
      {
        type: "poster",
        src: `${P}/assets/product/vishram-ghat-hero.webp`,
        alt: "Braj Object 002 — three-quarter studio view of the magnet on a sweep",
        provenance: "render",
      },
      {
        type: "poster",
        src: `${P}/assets/product/vishram-ghat-edge.webp`,
        alt: "Braj Object 002 — edge and bevel macro of the magnet body",
        provenance: "render",
      },
      {
        type: "poster",
        src: `${P}/assets/product/vishram-ghat-back.webp`,
        alt: "Braj Object 002 — rear plate with inset magnet disc",
        provenance: "render",
      },
    ],
    rightsStatus: "pending",
  },
  {
    id: "obj003",
    slug: "dwarkadhish",
    objectNumber: "003",
    name: "Dwarkadhish",
    devanagariName: "द्वारकाधीश",
    place: "Mathura",
    shortDescription: "The temple tower as pure geometry — five tiers and a finial.",
    longDescription:
      "An architectural study, not a likeness: the shikhara drawn as five measured tiers with an amalaka disc and finial, flanked by two attendant shrines.",
    priceInr: null,
    currency: "INR",
    status: "concept",
    materials: facts(),
    dimensionsMm: { width: 70, height: 70, depth: 5, verified: false },
    editionSize: null,
    posterUrl: `${P}/assets/product/dwarkadhish-front.webp`,
    media: [
      {
        type: "poster",
        src: `${P}/assets/product/dwarkadhish-front.webp`,
        alt: "Braj Object 003 — Dwarkadhish magnet face, tiered tower study",
        provenance: "render",
      },
      {
        type: "poster",
        src: `${P}/assets/product/dwarkadhish-hero.webp`,
        alt: "Braj Object 003 — three-quarter studio view of the magnet on a sweep",
        provenance: "render",
      },
      {
        type: "poster",
        src: `${P}/assets/product/dwarkadhish-edge.webp`,
        alt: "Braj Object 003 — edge and bevel macro of the magnet body",
        provenance: "render",
      },
      {
        type: "poster",
        src: `${P}/assets/product/dwarkadhish-back.webp`,
        alt: "Braj Object 003 — rear plate with inset magnet disc",
        provenance: "render",
      },
    ],
    rightsStatus: "pending",
  },
  {
    id: "obj004",
    slug: "govardhan",
    objectNumber: "004",
    name: "Govardhan",
    devanagariName: "गोवर्धन",
    place: "Braj",
    shortDescription: "The long hill and the dotted parikrama path around it.",
    longDescription:
      "Govardhan drawn as one low ridge under a sandstone sun. A dotted circuit marks the parikrama — the walk that defines the hill more than any single view.",
    priceInr: null,
    currency: "INR",
    status: "concept",
    materials: facts(),
    dimensionsMm: { width: 70, height: 70, depth: 5, verified: false },
    editionSize: null,
    posterUrl: `${P}/assets/product/govardhan-front.webp`,
    media: [
      {
        type: "poster",
        src: `${P}/assets/product/govardhan-front.webp`,
        alt: "Braj Object 004 — Govardhan magnet face, hill ridge with dotted pilgrim circuit",
        provenance: "render",
      },
      {
        type: "poster",
        src: `${P}/assets/product/govardhan-hero.webp`,
        alt: "Braj Object 004 — three-quarter studio view of the magnet on a sweep",
        provenance: "render",
      },
      {
        type: "poster",
        src: `${P}/assets/product/govardhan-edge.webp`,
        alt: "Braj Object 004 — edge and bevel macro of the magnet body",
        provenance: "render",
      },
      {
        type: "poster",
        src: `${P}/assets/product/govardhan-back.webp`,
        alt: "Braj Object 004 — rear plate with inset magnet disc",
        provenance: "render",
      },
    ],
    rightsStatus: "pending",
  },
  {
    id: "obj005",
    slug: "kusum-sarovar",
    objectNumber: "005",
    name: "Kusum Sarovar",
    devanagariName: "कुसुम सरोवर",
    place: "Govardhan",
    shortDescription: "The pavilion mirrored in still water.",
    longDescription:
      "A symmetrical study: the chhatri pavilion above, its reflection below, split by one hard line of water. Symmetry does the devotional work here.",
    priceInr: null,
    currency: "INR",
    status: "concept",
    materials: facts(),
    dimensionsMm: { width: 70, height: 70, depth: 5, verified: false },
    editionSize: null,
    posterUrl: `${P}/assets/product/kusum-sarovar-front.webp`,
    media: [
      {
        type: "poster",
        src: `${P}/assets/product/kusum-sarovar-front.webp`,
        alt: "Braj Object 005 — Kusum Sarovar magnet face, pavilion mirrored in water",
        provenance: "render",
      },
      {
        type: "poster",
        src: `${P}/assets/product/kusum-sarovar-hero.webp`,
        alt: "Braj Object 005 — three-quarter studio view of the magnet on a sweep",
        provenance: "render",
      },
      {
        type: "poster",
        src: `${P}/assets/product/kusum-sarovar-edge.webp`,
        alt: "Braj Object 005 — edge and bevel macro of the magnet body",
        provenance: "render",
      },
      {
        type: "poster",
        src: `${P}/assets/product/kusum-sarovar-back.webp`,
        alt: "Braj Object 005 — rear plate with inset magnet disc",
        provenance: "render",
      },
    ],
    rightsStatus: "pending",
  },
  {
    id: "obj006",
    slug: "braj-84-kos",
    objectNumber: "006",
    name: "Braj 84 Kos",
    devanagariName: "ब्रज",
    place: "Braj",
    shortDescription: "The eighty-four kos circuit as a map-derived diagram.",
    longDescription:
      "A symbolic map of the Braj 84 Kos yatra: concentric circuits, twelve radial stations, one marked node for Mathura. The set's closing object.",
    priceInr: null,
    currency: "INR",
    status: "concept",
    materials: facts(),
    dimensionsMm: { width: 70, height: 70, depth: 5, verified: false },
    editionSize: null,
    posterUrl: `${P}/assets/product/braj-84-kos-front.webp`,
    media: [
      {
        type: "poster",
        src: `${P}/assets/product/braj-84-kos-front.webp`,
        alt: "Braj Object 006 — Braj 84 Kos magnet face, circular pilgrim-circuit diagram",
        provenance: "render",
      },
      {
        type: "poster",
        src: `${P}/assets/product/braj-84-kos-hero.webp`,
        alt: "Braj Object 006 — three-quarter studio view of the magnet on a sweep",
        provenance: "render",
      },
      {
        type: "poster",
        src: `${P}/assets/product/braj-84-kos-edge.webp`,
        alt: "Braj Object 006 — edge and bevel macro of the magnet body",
        provenance: "render",
      },
      {
        type: "poster",
        src: `${P}/assets/product/braj-84-kos-back.webp`,
        alt: "Braj Object 006 — rear plate with inset magnet disc",
        provenance: "render",
      },
    ],
    rightsStatus: "pending",
  },
  {
    // Owner-asserted name clearance 2026-09-11. Symbolic devotional study —
    // no portrait likeness, no biographical claims; all specs remain TBD.
    id: "obj007",
    slug: "premanand-ji",
    objectNumber: "007",
    name: "Premanand Ji",
    devanagariName: "प्रेमानंद जी",
    place: "Braj",
    shortDescription: "A devotional study — mala circle and lamp in the Braj palette.",
    longDescription:
      "A quiet devotional study for the archive: a mala circle around a single lamp, drawn in sandstone, brass and Yamuna green. A symbolic face, not a portrait.",
    priceInr: null,
    currency: "INR",
    status: "concept",
    materials: facts(),
    dimensionsMm: { width: 70, height: 70, depth: 5, verified: false },
    editionSize: null,
    posterUrl: `${P}/assets/product/premanand-ji-front.webp`,
    media: [
      {
        type: "poster",
        src: `${P}/assets/product/premanand-ji-front.webp`,
        alt: "Braj Object 007 — Premanand Ji magnet face, mala circle study",
        provenance: "render",
      },
      {
        type: "poster",
        src: `${P}/assets/product/premanand-ji-hero.webp`,
        alt: "Braj Object 007 — three-quarter studio view of the magnet on a sweep",
        provenance: "render",
      },
      {
        type: "poster",
        src: `${P}/assets/product/premanand-ji-edge.webp`,
        alt: "Braj Object 007 — edge and bevel macro of the magnet body",
        provenance: "render",
      },
      {
        type: "poster",
        src: `${P}/assets/product/premanand-ji-back.webp`,
        alt: "Braj Object 007 — rear plate with inset magnet disc",
        provenance: "render",
      },
    ],
    rightsStatus: "cleared",
  },
  {
    // Owner-asserted name clearance 2026-09-11. Symbolic devotional study —
    // no portrait likeness, no biographical claims; all specs remain TBD.
    id: "obj008",
    slug: "sharnanand-ji",
    objectNumber: "008",
    name: "Sharnanand Ji",
    devanagariName: "शरणानंद जी",
    place: "Braj",
    shortDescription: "A peacock-feather study — the mor-pankh eye as geometry.",
    longDescription:
      "A companion devotional study: the eye of the peacock feather reduced to concentric geometry in Yamuna green and brass. Symbolic, not a likeness.",
    priceInr: null,
    currency: "INR",
    status: "concept",
    materials: facts(),
    dimensionsMm: { width: 70, height: 70, depth: 5, verified: false },
    editionSize: null,
    posterUrl: `${P}/assets/product/sharnanand-ji-front.webp`,
    media: [
      {
        type: "poster",
        src: `${P}/assets/product/sharnanand-ji-front.webp`,
        alt: "Braj Object 008 — Sharnanand Ji magnet face, feather-eye study",
        provenance: "render",
      },
      {
        type: "poster",
        src: `${P}/assets/product/sharnanand-ji-hero.webp`,
        alt: "Braj Object 008 — three-quarter studio view of the magnet on a sweep",
        provenance: "render",
      },
      {
        type: "poster",
        src: `${P}/assets/product/sharnanand-ji-edge.webp`,
        alt: "Braj Object 008 — edge and bevel macro of the magnet body",
        provenance: "render",
      },
      {
        type: "poster",
        src: `${P}/assets/product/sharnanand-ji-back.webp`,
        alt: "Braj Object 008 — rear plate with inset magnet disc",
        provenance: "render",
      },
    ],
    rightsStatus: "cleared",
  },
];

export const products: Product[] = validateProducts(raw);
assertNoConceptPosingAsReal(products);

export function getProduct(slug: string): Product | null {
  return products.find((p) => p.slug === slug) ?? null;
}

export function getRelated(product: Product, count = 3): Product[] {
  const others = products.filter((p) => p.id !== product.id);
  const samePlace = others.filter((p) => p.place === product.place);
  const rest = others.filter((p) => p.place !== product.place);
  return [...samePlace, ...rest].slice(0, count);
}
