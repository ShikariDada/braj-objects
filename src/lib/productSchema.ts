import { z } from "zod";

export const verificationState = z.enum(["verified", "tbd", "concept_only"]);

export const productMaterialSchema = z.object({
  label: z.string(),
  value: z.string().nullable(),
  verification: verificationState,
});

export const productMediaSchema = z.object({
  type: z.enum(["photo", "poster", "model", "sequence", "video"]),
  src: z.string(),
  alt: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  provenance: z.enum(["real_product", "render", "generated_concept", "licensed"]),
});

export const productSchema = z.object({
  id: z.string(),
  slug: z.string(),
  objectNumber: z.string(),
  name: z.string(),
  devanagariName: z.string().optional(),
  place: z.string(),
  shortDescription: z.string(),
  longDescription: z.string().optional(),
  priceInr: z.number().nullable(),
  currency: z.literal("INR"),
  status: z.enum(["concept", "preorder", "available", "sold_out"]),
  materials: z.array(productMaterialSchema),
  dimensionsMm: z
    .object({
      width: z.number(),
      height: z.number(),
      depth: z.number(),
      verified: z.boolean(),
    })
    .optional(),
  weightGrams: z
    .object({ value: z.number(), verified: z.boolean() })
    .optional(),
  editionSize: z.number().nullable().optional(),
  modelUrl: z.string().optional(),
  posterUrl: z.string(),
  media: z.array(productMediaSchema),
  rightsStatus: z.enum(["pending", "cleared", "not_required"]),
});

export type VerificationState = z.infer<typeof verificationState>;
export type ProductMaterial = z.infer<typeof productMaterialSchema>;
export type ProductMedia = z.infer<typeof productMediaSchema>;
export type Product = z.infer<typeof productSchema>;

export function validateProducts(input: unknown[]): Product[] {
  return input.map((p, i) => {
    const parsed = productSchema.safeParse(p);
    if (!parsed.success) {
      throw new Error(
        `Invalid product record at index ${i}: ${parsed.error.message}`,
      );
    }
    return parsed.data;
  });
}

/** Guards production pages: concept_only media must never pose as real_product. */
export function assertNoConceptPosingAsReal(products: Product[]) {
  for (const p of products) {
    for (const m of p.media) {
      if (m.provenance === "generated_concept" && m.type === "photo") {
        throw new Error(
          `Product ${p.id}: generated_concept media must not use type "photo".`,
        );
      }
    }
  }
}
