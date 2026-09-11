"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { Product } from "@/lib/productSchema";
import { getRuntimeInfo } from "@/lib/runtimeTier";
import styles from "./ExplodedView.module.css";

function LayerStack({ amount }: { amount: number }) {
  const g = useRef<THREE.Group>(null!);
  // eased separation: slow start, decisive middle, hard stop — no overshoot.
  const spread = THREE.MathUtils.smoothstep(amount, 0, 1) * 1.15;

  const mats = useMemo(
    () => ({
      coat: new THREE.MeshPhysicalMaterial({
        color: "#f7f4ec", transparent: true, opacity: 0.35,
        roughness: 0.2, clearcoat: 0.5,
      }),
      art: new THREE.MeshStandardMaterial({ color: "#9B4435", roughness: 0.5 }),
      body: new THREE.MeshStandardMaterial({ color: "#2b2521", roughness: 0.6 }),
       back: new THREE.MeshStandardMaterial({ color: "#4a4238", roughness: 0.6 }),
       magnet: new THREE.MeshStandardMaterial({ color: "#6e6e74", roughness: 0.42, metalness: 0.55 }),
    }),
    [],
  );

  const shown = useRef(spread);
  useFrame((_, delta) => {
    shown.current = THREE.MathUtils.damp(shown.current, spread, 8, delta);
    const s = shown.current;
    g.current.children.forEach((child, i) => {
      child.position.z = (i - 2) * s * 0.55;
    });
    g.current.rotation.y = THREE.MathUtils.damp(g.current.rotation.y, -0.5 + s * 0.25, 4, delta);
    g.current.rotation.x = THREE.MathUtils.damp(g.current.rotation.x, 0.32, 4, delta);
  });

  return (
    <group ref={g}>
      <mesh material={mats.coat}><boxGeometry args={[1.7, 1.7, 0.015]} /></mesh>
      <mesh material={mats.art}><boxGeometry args={[1.7, 1.7, 0.03]} /></mesh>
      <mesh material={mats.body}><boxGeometry args={[1.7, 1.7, 0.12]} /></mesh>
      <mesh material={mats.back}><boxGeometry args={[1.6, 1.6, 0.03]} /></mesh>
      <mesh material={mats.magnet}><cylinderGeometry args={[0.42, 0.42, 0.05, 40]} /></mesh>
    </group>
  );
}

export function ExplodedView({ product, amount }: { product: Product; amount: number }) {
  void product;
  const dpr = getRuntimeInfo().dpr;
  return (
    <div className={styles.box} role="img" aria-label="Exploded view of the five magnet layers">
      <Canvas dpr={dpr} camera={{ position: [0.6, 0.5, 3.4], fov: 32 }} gl={{ antialias: true, alpha: true }}>
        <hemisphereLight args={["#f7f4ec", "#2a241d", 0.6]} />
        <directionalLight position={[2.4, 3.2, 3.4]} intensity={2.4} color="#fff4e0" />
        <directionalLight position={[-2.5, 1.2, 2.0]} intensity={0.6} color="#cfe0da" />
        <LayerStack amount={amount} />
      </Canvas>
    </div>
  );
}
