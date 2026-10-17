import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { CartLine, Product } from "../types";

interface CartState {
  lines: CartLine[];
  count: number;
  subtotal: number;
  mrpTotal: number;
  add: (p: Product, qty?: number) => void;
  setQty: (id: number, qty: number) => void;
  remove: (id: number) => void;
  clear: () => void;
}

const Ctx = createContext<CartState | null>(null);
const KEY = "shopverse_cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => {
    try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
  });

  useEffect(() => localStorage.setItem(KEY, JSON.stringify(lines)), [lines]);

  const value = useMemo<CartState>(() => ({
    lines,
    count: lines.reduce((s, l) => s + l.qty, 0),
    subtotal: lines.reduce((s, l) => s + l.product.price * l.qty, 0),
    mrpTotal: lines.reduce((s, l) => s + l.product.mrp * l.qty, 0),
    add: (p, qty = 1) =>
      setLines((prev) => {
        const found = prev.find((l) => l.product.id === p.id);
        if (found) return prev.map((l) => (l.product.id === p.id ? { ...l, qty: Math.min(10, l.qty + qty) } : l));
        return [...prev, { product: p, qty }];
      }),
    setQty: (id, qty) =>
      setLines((prev) => prev.map((l) => (l.product.id === id ? { ...l, qty: Math.max(1, Math.min(10, qty)) } : l))),
    remove: (id) => setLines((prev) => prev.filter((l) => l.product.id !== id)),
    clear: () => setLines([]),
  }), [lines]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useCart = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
};
