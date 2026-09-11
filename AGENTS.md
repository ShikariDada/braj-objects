# AGENTS.md — Braj Objects

## Project mission
Build a premium physical-product experience for collectible Mathura/Braj souvenir magnets. The product must feel like a contemporary collectible object, not a tourist-shop commodity, SaaS landing page, Shopify theme, generic devotional website, or WebGL demo.

## Absolute rules
- Never invent product facts. Use TBD / TBD_VERIFIED.
- Never present AI/code-generated imagery as a photograph of the manufactured product. All current plates are provenance "render" concept studies.
- Never alter approved product artwork unless explicitly asked.
- Product fidelity is more important than spectacle.
- DOM contains all important text, actions, price, facts and accessibility content.
- 3D is progressive enhancement. Poster first, canvas only after first frame.
- Do not add dependencies without a concrete need.
- No component library. No Tailwind. No Framer Motion (GSAP only, and only where needed).
- No global smooth scrolling before native-scroll QA passes.
- No per-frame React state for 3D/scroll animation — refs/uniforms/useFrame only.
- No global noise filter, glow, gradient, glassmorphism or pill-card system as decoration.

## Visual anti-slop rules
Avoid default AI-generated web grammar:
- centered badge + huge headline + two CTAs
- three equal feature cards
- icon tiles above headings
- rounded cards everywhere
- pill buttons by default
- default Lucide icons as decoration
- giant italic serif headlines
- Inter/Geist/Fraunces/Instrument Serif chosen without proofing
- cream/sage palette simply to look tasteful
- purple/cyan gradients
- dark + neon glow
- gradient text
- tiny monospace labels everywhere
- fake coordinates/catalog numbers
- decorative section numbering
- every section using the same spacing and composition
- fade-up animation on every heading/card
- bounce/elastic easing
- hover lift/scale on every card
- generic marketing copy

## Design principle
Every major visual decision must answer at least one of:
1. What does it reveal about the physical object?
2. What does it derive from Mathura/Braj?
3. What user task does it improve?
If none applies, remove it.

## Implementation workflow
Work phase by phase. At every phase:
1. implement
2. run lint/typecheck/tests
3. capture screenshots at required widths
4. compare to DESIGN.md
5. run anti-slop audit
6. fix problems
7. only then continue

## Product facts
Read docs/PRODUCT_FACTS.md before writing copy or material claims.

## Motion
Read docs/MOTION.md. Motion must be sparse, weighted, reversible and accessible.

## 3D
Read docs/THREE.md. Use real product dimensions. Keep heavy values out of React renders.

## Definition of done
A page is not done because it compiles. It is done when visual, responsive, accessibility, performance, content and fallback acceptance criteria all pass.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
