import { getProduct, products } from "@/content/products";
import type { CommerceAdapter } from "./types";

/** Local commerce adapter — real backend swaps in behind this interface. */
export const localAdapter: CommerceAdapter = {
  async getProducts() {
    return products;
  },
  async getProduct(slug: string) {
    return getProduct(slug);
  },
  async createCart() {
    return { id: `local-${Date.now()}` };
  },
  async addLine() {
    return;
  },
  async getCheckoutUrl(cartId: string) {
    return `/bag?cart=${encodeURIComponent(cartId)}`;
  },
};
