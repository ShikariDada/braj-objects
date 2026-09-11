# Three.js

- R3F v9 is the React integration layer. No raw Three lifecycle unless a feature truly requires it.
- One canvas per story moment; never one context per card.
- DOM owns copy/labels/facts/CTA/price. WebGL owns object/camera/lights/shadows/material response.
- Discrete React state only (`idle | loading | ready | failed`). Animation progress in refs.
- Lighting: one large soft key + subtle rim/fill + restrained environment. No post-processing in v1.
- Camera poses come from `src/lib/scenePresets.ts` — shared by `/_lab/materials` and production.
- DPR clamped: 1.0 mobile, 1.5 tablet, 2.0 max desktop.
- Dispose geometries/textures/materials on unmount.
- Poster and first WebGL frame share crop/orientation/light direction so the crossfade has no teleport.
- Mesh names follow the spec convention: FACE_ART, FACE_COATING, BODY, BACK_PLATE, MAGNET.
