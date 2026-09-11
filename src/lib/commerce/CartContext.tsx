"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { Product } from "@/lib/productSchema";

export type CartLine = { product: Product; quantity: number };

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotalNote: string;
  add: (product: Product, quantity?: number) => { ok: boolean; message: string };
  remove: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  const add = useCallback(
    (product: Product, quantity = 1): { ok: boolean; message: string } => {
      if (product.status !== "available" || product.priceInr == null) {
        return {
          ok: false,
          message: "This object isn't purchasable yet — prices unlock after samples are verified.",
        };
      }
      setLines((prev) => {
        const found = prev.find((l) => l.product.id === product.id);
        if (found) {
          return prev.map((l) =>
            l.product.id === product.id
              ? { ...l, quantity: Math.min(99, l.quantity + quantity) }
              : l,
          );
        }
        return [...prev, { product, quantity }];
      });
      return { ok: true, message: "Added to bag." };
    },
    [],
  );

  const remove = useCallback((id: string) => {
    setLines((prev) => prev.filter((l) => l.product.id !== id));
  }, []);

  const setQuantity = useCallback((id: string, quantity: number) => {
    setLines((prev) =>
      quantity <= 0
        ? prev.filter((l) => l.product.id !== id)
        : prev.map((l) => (l.product.id === id ? { ...l, quantity } : l)),
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((n, l) => n + l.quantity, 0);
    return { lines, count, subtotalNote: "Shipping and taxes confirmed at checkout.", add, remove, setQuantity, clear };
  }, [lines, add, remove, setQuantity, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
