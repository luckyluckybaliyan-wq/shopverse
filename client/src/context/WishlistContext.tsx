import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Product } from "../types";

interface WishlistState {
  items: Product[];
  has: (id: number) => boolean;
  toggle: (p: Product) => void;
}

const Ctx = createContext<WishlistState | null>(null);
const KEY = "shopverse_wishlist";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>(() => {
    try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
  });
  useEffect(() => localStorage.setItem(KEY, JSON.stringify(items)), [items]);

  const value: WishlistState = {
    items,
    has: (id) => items.some((p) => p.id === id),
    toggle: (p) => setItems((prev) => (prev.some((x) => x.id === p.id) ? prev.filter((x) => x.id !== p.id) : [...prev, p])),
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useWishlist = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useWishlist must be used inside WishlistProvider");
  return c;
};
