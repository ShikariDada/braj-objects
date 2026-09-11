# Implementation Status

| Phase | Status | Last verified | Notes |
|---|---|---|---|
| 0 Product truth/references | PASSED | 2026-09-11 | PRODUCT_FACTS, RIGHTS, ASSET_MANIFEST created; no invented facts |
| 1 Bootstrap/guardrails | PASSED | 2026-09-11 | deps installed; structure/tokens/schema/tests green |
| 2 Typography proof | PASSED | 2026-09-11 | /_lab/type with Newsreader + Anek Devanagari proof |
| 3 Static homepage | PASSED | 2026-09-11 | 9 narrative sections built poster-first, Blender plates live |
| 4 Catalog/PDP static | PASSED | 2026-09-11 | collection, PDP with 3-view Blender gallery, about, bag, sitemap/robots |
| 5 3D product lab | PASSED | 2026-09-11 | /_lab/materials + CanvasShell/MagnetModel with Blender face plates |
| 6 Hero enhancement | PASSED | 2026-09-11 | poster→WebGL crossfade after first frame, Blender hero poster |
| 7 Motion lab | PASSED | 2026-09-11 | /_lab/motion + reduced-motion branches |
| 8 Scroll integration | PASSED | 2026-09-11 | useStoryProgress central progress; sliders for construction/snap (no scroll-jack) |
| 9 Optional render sequence | SUPERSEDED | 2026-09-11 | Blender stills ship as posters/gallery; realtime canvas matches via face plates |
| 10 Collection interaction | PASSED | 2026-09-11 | archival index, single active plate, keyboard accessible |
| 11 Commerce | IN_PROGRESS | — | provider-independent adapter + local stub; test purchase path in bag |
| 12 Real photography | BLOCKED | — | waiting on physical samples + photographer shot list |
| 13 Perf/a11y/fallback | IN_PROGRESS | 2026-09-11 | tiers, DPR caps, reduced motion, fallback tests; 42/42 playwright green (chromium+mobile+firefox) |
| 14 Final anti-slop audit | IN_PROGRESS | — | prototype banners removed (minimal studio-render/TBD labels kept); PDP duplicate removed; mobile overflow test green |
| 15 Saints expansion (owner clearance 2026-09-11) | PASSED | 2026-09-11 | obj007 Premanand Ji (mala) + obj008 Sharnanand Ji (feather-eye) symbolic studies; full-res Standard renders live |
| 16 Full-res Standard render pass | PASSED | 2026-09-11 | all 8 objects × 4 views (1400px, 64spp) + dusk re-rendered, webp recompressed |
| 17 Cohesion + interaction polish | PASSED | 2026-09-11 | shared brass-thumb slider grammar; square view toggles; collection crossfade; hero spec line; packaging/PDP copy cleanup; 42/42 e2e |
| 18 Stale-server incident + hero scroll | PASSED | 2026-09-11 | :3000 was a 04:53 production snapshot — killed, fresh build serving; hero scroll hint was a false promise, now a real scroll-linked zoom (ref-only, reduced-motion safe); all interactions re-verified live on :3000 |
