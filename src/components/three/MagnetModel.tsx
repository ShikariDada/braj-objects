"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { Product } from "@/lib/productSchema";
import { scenePresets } from "@/lib/scenePresets";

/**
 * The collectible magnet as authored geometry.
 * Layer stack mirrors the (unverified) physical construction:
 * BODY → FACE_ART → FACE_COATING, BACK_PLATE → MAGNET.
 * Artwork faces load the same Blender-authored face plates the posters
 * display (public/assets/product/<slug>-face.webp), so poster and WebGL
 * framing match by construction. Per-frame values stay in refs.
 */

const ASSET_BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const FACE_BY_SLUG: Record<string, string> = {
  "krishna-janmabhoomi": `${ASSET_BASE}/assets/product/krishna-janmabhoomi-face.webp`,
  "vishram-ghat": `${ASSET_BASE}/assets/product/vishram-ghat-face.webp`,
  "dwarkadhish": `${ASSET_BASE}/assets/product/dwarkadhish-face.webp`,
  "govardhan": `${ASSET_BASE}/assets/product/govardhan-face.webp`,
  "kusum-sarovar": `${ASSET_BASE}/assets/product/kusum-sarovar-face.webp`,
  "braj-84-kos": `${ASSET_BASE}/assets/product/braj-84-kos-face.webp`,
  "premanand-ji": `${ASSET_BASE}/assets/product/premanand-ji-face.webp`,
  "sharnanand-ji": `${ASSET_BASE}/assets/product/sharnanand-ji-face.webp`,
};

function paintFace(): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 1024;
  const g = c.getContext("2d")!;
  // Fallback only: the shipped texture is the Blender face plate
  // (see faceTexture below). This flat fill keeps WebGL alive if the
  // plate fails to load — never the primary artwork path.
  g.fillStyle = "#9B4435";
  g.fillRect(0, 0, 1024, 1024);
  g.strokeStyle = "#181512";
  g.lineWidth = 3;
  g.globalAlpha = 0.55;
  g.strokeRect(48, 48, 928, 928);
  g.globalAlpha = 1;
  return c;
}

export function MagnetModel({
  product,
  presetId,
  interactive,
  onFirstFrame,
}: {
  product: Product;
  presetId: string;
  interactive: boolean;
  onFirstFrame: () => void;
}) {
  const group = useRef<THREE.Group>(null!);
  const inner = useRef<THREE.Group>(null!);
  const pointer = useRef({ x: 0, y: 0 });
  const reported = useRef(false);
  const { camera, invalidate, gl } = useThree();
  const preset = scenePresets[presetId] ?? scenePresets.heroIdle;

  const faceTexture = useMemo(() => {
    const tex = new THREE.CanvasTexture(paintFace());
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    return tex;
  }, []);
  const artMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: faceTexture,
        roughness: 0.42,
        metalness: 0.02,
      }),
    [faceTexture],
  );
  const artMatRef = useRef(artMat);
  useEffect(() => {
    artMatRef.current = artMat;
  }, [artMat]);

  useEffect(() => {
    // Upgrade to the Blender-authored face plate when it loads; the canvas
    // fill above is only the offline fallback. No React state here.
    let cancelled = false;
    const loader = new THREE.TextureLoader();
    loader.load(
      // Both map values and posterUrl already carry the static-build prefix.
      FACE_BY_SLUG[product.slug] ?? product.posterUrl,
      (plate) => {
        if (cancelled) {
          plate.dispose();
          return;
        }
        plate.colorSpace = THREE.SRGBColorSpace;
        plate.anisotropy = 4;
        artMatRef.current.map = plate;
        artMatRef.current.needsUpdate = true;
        invalidate();
      },
      undefined,
      () => {},
    );
    return () => {
      cancelled = true;
    };
  }, [product, invalidate]);

  useEffect(() => {
    camera.position.set(...preset.camera.position);
    camera.lookAt(...preset.camera.target);
    return () => {
      faceTexture.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presetId, product.id]);

  useEffect(() => {
    if (!interactive) return;
    const el = gl.domElement;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      pointer.current.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      pointer.current.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, [interactive, gl]);

  const edgeMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#2b2521",
        roughness: 0.55,
        metalness: 0.05,
      }),
    [],
  );
  const backMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#38302a",
        roughness: 0.62,
        metalness: 0.05,
      }),
    [],
  );
  const coatMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#ffffff",
        transparent: true,
        opacity: 0.08,
        roughness: 0.18,
        metalness: 0,
        clearcoat: 0.6,
        clearcoatRoughness: 0.35,
      }),
    [],
  );
  const magnetMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({ color: "#6e6e74", roughness: 0.42, metalness: 0.55 }),
    [],
  );

  useEffect(() => {
    return () => {
      edgeMat.dispose();
      backMat.dispose();
      artMat.dispose();
      coatMat.dispose();
      magnetMat.dispose();
    };
  }, [edgeMat, backMat, artMat, coatMat, magnetMat]);

  useFrame((_, delta) => {
    // Per-frame values stay in refs — no React state updates here.
    const t = THREE.MathUtils.damp;
    const px = interactive ? pointer.current.x * 0.05 : 0;
    const py = interactive ? pointer.current.y * 0.035 : 0;
    inner.current.rotation.y = t(
      inner.current.rotation.y,
      preset.product.rotation[1] + px,
      3.5,
      delta,
    );
    inner.current.rotation.x = t(
      inner.current.rotation.x,
      preset.product.rotation[0] + py,
      3.5,
      delta,
    );
    if (!reported.current) {
      reported.current = true;
      onFirstFrame();
      invalidate();
    }
  });

  return (
    <group ref={group} position={preset.product.position}>
      <group ref={inner} rotation={preset.product.rotation}>
        {/* BODY — cast block, 70×70×5 concept proportion.
            Dark edge all round, artwork face, dark back. */}
        <mesh material={[edgeMat, edgeMat, edgeMat, edgeMat, artMat, backMat]}>
          <boxGeometry args={[1.7, 1.7, 0.12]} />
        </mesh>
        {/* FACE_COATING — soft clear layer catching the key light */}
        <mesh material={coatMat} position={[0, 0, 0.062]}>
          <planeGeometry args={[1.62, 1.62]} />
        </mesh>
        {/* MAGNET — inset disc on the back face */}
        <mesh material={magnetMat} position={[0, 0, -0.062]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.42, 0.42, 0.035, 48]} />
        </mesh>
      </group>
    </group>
  );
}
