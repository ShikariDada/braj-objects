export type Vector3Tuple = [number, number, number];

export type ProductPose = {
  position: Vector3Tuple;
  rotation: Vector3Tuple;
  scale: number;
};

export type CameraPreset = {
  position: Vector3Tuple;
  target: Vector3Tuple;
  fov: number;
};

export type LightPreset = {
  keyPosition: Vector3Tuple;
  keyIntensity: number;
  fillIntensity: number;
  environmentIntensity: number;
};

export type ScenePreset = {
  id: string;
  product: ProductPose;
  camera: CameraPreset;
  lighting: LightPreset;
  mobile?: Partial<ScenePreset>;
};

/**
 * Shared preset contract — the _lab/materials page and production
 * components read the same numbers. Tune in the lab, ship everywhere.
 */
export const scenePresets: Record<string, ScenePreset> = {
  heroIdle: {
    id: "heroIdle",
    product: { position: [0, 0, 0], rotation: [0.06, 0.22, 0], scale: 1 },
    camera: { position: [0, 0.12, 3.4], target: [0, 0, 0], fov: 34 },
    lighting: {
      keyPosition: [2.4, 3.2, 3.4],
      keyIntensity: 2.4,
      fillIntensity: 0.5,
      environmentIntensity: 0.55,
    },
  },
  macroFace: {
    id: "macroFace",
    product: { position: [0, 0, 0], rotation: [0.02, 0.06, 0], scale: 1 },
    camera: { position: [0.4, 0.1, 1.6], target: [0.2, 0, 0], fov: 30 },
    lighting: {
      keyPosition: [1.6, 2.2, 2.4],
      keyIntensity: 2.8,
      fillIntensity: 0.4,
      environmentIntensity: 0.5,
    },
  },
  macroEdge: {
    id: "macroEdge",
    product: { position: [0, 0, 0], rotation: [0.1, 1.15, 0], scale: 1 },
    camera: { position: [0.2, 0.1, 2.2], target: [0, 0, 0], fov: 30 },
    lighting: {
      keyPosition: [-2.2, 1.6, 2.2],
      keyIntensity: 2.6,
      fillIntensity: 0.45,
      environmentIntensity: 0.5,
    },
  },
  exploded: {
    id: "exploded",
    product: { position: [0, 0, 0], rotation: [0.32, -0.5, 0], scale: 1 },
    camera: { position: [0.6, 0.5, 3.2], target: [0, 0, 0], fov: 32 },
    lighting: {
      keyPosition: [2.4, 3.2, 3.4],
      keyIntensity: 2.4,
      fillIntensity: 0.6,
      environmentIntensity: 0.6,
    },
  },
  snapApproach: {
    id: "snapApproach",
    product: { position: [0, 0.5, 0.9], rotation: [0.04, 0.1, 0], scale: 1 },
    camera: { position: [0, 0.2, 3.6], target: [0, 0.1, 0], fov: 34 },
    lighting: {
      keyPosition: [2.4, 3.2, 3.4],
      keyIntensity: 2.2,
      fillIntensity: 0.5,
      environmentIntensity: 0.55,
    },
  },
  pdpDefault: {
    id: "pdpDefault",
    product: { position: [0, 0, 0], rotation: [0.05, 0.35, 0], scale: 1 },
    camera: { position: [0, 0.1, 3.65], target: [0, 0, 0], fov: 34 },
    lighting: {
      keyPosition: [2.4, 3.2, 3.4],
      keyIntensity: 2.4,
      fillIntensity: 0.5,
      environmentIntensity: 0.55,
    },
  },
  pdpBack: {
    id: "pdpBack",
    product: { position: [0, 0, 0], rotation: [0.05, Math.PI - 0.35, 0], scale: 1 },
    camera: { position: [0, 0.1, 3.65], target: [0, 0, 0], fov: 34 },
    lighting: {
      keyPosition: [-2.4, 3.2, 3.4],
      keyIntensity: 2.4,
      fillIntensity: 0.5,
      environmentIntensity: 0.55,
    },
  },
};
