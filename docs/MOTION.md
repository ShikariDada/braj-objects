# Motion

Signature moments only: product reveal, macro inspection, exploded
construction, magnetic snap, collection assembly. Everything else uses
near-invisible transitions or stays static.

## Easing
- standard: power2.out → `cubic-bezier(0.2,0.7,0.2,1)`
- enter: power3.out → `cubic-bezier(0.16,1,0.3,1)`
- physical alignment: power1.inOut
- Never: elastic, bounce, exaggerated back easing.

## Durations
- micro hover: 120–200ms
- nav/menu: 250–450ms
- media crossfade: 300–600ms (poster→canvas uses 600ms)
- object pose change: 500–900ms

## Rules
- One authoritative progress value per story sequence (see `useStoryProgress`).
- Per-frame values live in refs/Three objects/`useFrame` — never React state.
- ScrollTrigger pins a stable wrapper and animates descendants; refresh after fonts/media load.
- Reduced motion: static representative states, same information, no waiting on animation.
- Lenis: not installed. Only after native scroll passes QA.
