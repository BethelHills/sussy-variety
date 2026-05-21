import { createFileRoute } from "@tanstack/react-router";
import { Plus, Check } from "lucide-react";
import { useMemo, useState } from "react";
import { categories, formatNaira, menu, type MenuItem } from "@/lib/menu";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Sussy Variety" },
      { name: "description", content: "Browse the full Sussy Variety menu: grills, peppered snails, parfait, soups, stews and rice bowls." },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const [active, setActive] = useState<string>("All");
  const { add } = useCart();

  const visible = useMemo(
    () => (active === "All" ? menu : menu.filter((m) => m.category === active)),
    [active]
  );

  return (
    <>
      <section className="bg-wood-grain text-cream">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Our menu</div>
          <h1 className="mt-3 font-display text-5xl font-bold sm:text-6xl">Pick your treats</h1>
          <p className="mt-3 max-w-2xl text-cream/75">All prices in Naira. Delivery fee depends on your location.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="sticky top-16 z-30 -mx-6 mb-8 overflow-x-auto bg-background/90 px-6 py-3 backdrop-blur">
          <div className="flex gap-2">
            {["All", ...categories].map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={
                  "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition " +
                  (active === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card hover:border-primary/40")
                }
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((m) => (
            <MenuCard key={m.id} item={m} onAdd={() => add(m)} />
          ))}
        </div>
      </section>
    </>
  );
}

function MenuCard({ item, onAdd }: { item: MenuItem; onAdd: () => void }) {
  const [added, setAdded] = useState(false);
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-border bg-card p-5 transition hover:border-primary/40 hover:shadow-warm">
      <div>
        <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          {item.category}
        </div>
        <div className="mt-1 font-display text-lg font-bold leading-snug">{item.name}</div>
        <div className="mt-2 font-semibold text-primary">{formatNaira(item.price)}</div>
      </div>
      <button
        onClick={() => {
          onAdd();
          setAdded(true);
          setTimeout(() => setAdded(false), 1200);
        }}
        className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground shadow-warm transition hover:bg-primary/90"
        aria-label={`Add ${item.name}`}
      >
        {added ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
      </button>
    </div>
  );
}
