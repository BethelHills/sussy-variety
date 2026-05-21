import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatNaira } from "@/lib/menu";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [{ title: "Your Cart — Sussy Variety" }, { name: "description", content: "Review your order before checkout." }],
  }),
  component: CartPage,
});

function CartPage() {
  const { lines, setQty, remove, subtotal } = useCart();
  const deliveryEstimate = subtotal > 0 ? 1500 : 0;
  const total = subtotal + deliveryEstimate;

  return (
    <section className="mx-auto max-w-5xl px-6 py-14">
      <h1 className="font-display text-4xl font-bold sm:text-5xl">Your cart</h1>
      <p className="mt-2 text-muted-foreground">Review your items, then continue to checkout.</p>

      {lines.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed border-border bg-card p-12 text-center">
          <ShoppingBag className="mx-auto h-10 w-10 text-muted-foreground" />
          <p className="mt-4 text-muted-foreground">Your cart is empty.</p>
          <Link to="/menu" className="mt-6 inline-flex h-11 items-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground">
            Browse the menu
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <ul className="space-y-3">
            {lines.map((l) => (
              <li key={l.item.id} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
                <div className="h-16 w-16 shrink-0 rounded-xl bg-gradient-to-br from-primary/20 via-accent/30 to-wood/30" />
                <div className="min-w-0 flex-1">
                  <div className="truncate font-display font-bold">{l.item.name}</div>
                  <div className="text-xs text-muted-foreground">{l.item.category}</div>
                  <div className="mt-1 text-sm font-semibold text-primary">{formatNaira(l.item.price)}</div>
                </div>
                <div className="flex items-center gap-1 rounded-full border border-border">
                  <button onClick={() => setQty(l.item.id, l.qty - 1)} className="grid h-8 w-8 place-items-center rounded-full hover:bg-muted">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="min-w-6 text-center text-sm font-semibold">{l.qty}</span>
                  <button onClick={() => setQty(l.item.id, l.qty + 1)} className="grid h-8 w-8 place-items-center rounded-full hover:bg-muted">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <button onClick={() => remove(l.item.id)} className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive" aria-label="Remove">
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>

          <aside className="h-fit rounded-2xl border border-border bg-card p-6">
            <h2 className="font-display text-xl font-bold">Order summary</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <Row k="Subtotal" v={formatNaira(subtotal)} />
              <Row k="Delivery (est.)" v={formatNaira(deliveryEstimate)} />
              <div className="my-3 h-px bg-border" />
              <Row k="Total" v={formatNaira(total)} bold />
            </dl>
            <Link to="/checkout" className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-warm hover:bg-primary/90">
              Continue to checkout
            </Link>
            <p className="mt-3 text-center text-xs text-muted-foreground">Final delivery fee confirmed at checkout based on your location.</p>
          </aside>
        </div>
      )}
    </section>
  );
}

function Row({ k, v, bold }: { k: string; v: string; bold?: boolean }) {
  return (
    <div className={"flex items-center justify-between " + (bold ? "text-base font-bold" : "")}>
      <dt className={bold ? "" : "text-muted-foreground"}>{k}</dt>
      <dd>{v}</dd>
    </div>
  );
}
