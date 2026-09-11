import type { Product } from "@/lib/productSchema";

export interface CommerceAdapter {
  getProducts(): Promise<Product[]>;
  getProduct(slug: string): Promise<Product | null>;
  createCart(): Promise<{ id: string }>;
  addLine(input: { cartId: string; productId: string; quantity: number }): Promise<void>;
  getCheckoutUrl(cartId: string): Promise<string>;
}
