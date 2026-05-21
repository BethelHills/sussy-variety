import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { MenuItem } from "./menu";

export type CartLine = { item: MenuItem; qty: number };

type CartCtx = {
  lines: CartLine[];
  add: (item: MenuItem, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  subtotal: number;
  count: number;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "sussy-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
      if (raw) setLines(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {}
  }, [lines]);

  const add: CartCtx["add"] = (item, qty = 1) =>
    setLines((cur) => {
      const i = cur.findIndex((l) => l.item.id === item.id);
      if (i >= 0) {
        const next = [...cur];
        next[i] = { ...next[i], qty: next[i].qty + qty };
        return next;
      }
      return [...cur, { item, qty }];
    });

  const remove: CartCtx["remove"] = (id) =>
    setLines((cur) => cur.filter((l) => l.item.id !== id));

  const setQty: CartCtx["setQty"] = (id, qty) =>
    setLines((cur) =>
      qty <= 0
        ? cur.filter((l) => l.item.id !== id)
        : cur.map((l) => (l.item.id === id ? { ...l, qty } : l))
    );

  const clear = () => setLines([]);
  const subtotal = lines.reduce((s, l) => s + l.item.price * l.qty, 0);
  const count = lines.reduce((s, l) => s + l.qty, 0);

  return (
    <Ctx.Provider value={{ lines, add, remove, setQty, clear, subtotal, count }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used within CartProvider");
  return c;
}
