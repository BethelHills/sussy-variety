import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CreditCard, Lock, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { formatNaira } from "@/lib/menu";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [{ title: "Checkout — Sussy Variety" }, { name: "description", content: "Pay securely with your card." }],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { lines, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const delivery = subtotal > 0 ? 1500 : 0;
  const total = subtotal + delivery;

  const [card, setCard] = useState({ number: "", name: "", exp: "", cvc: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const orderId = "SV-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    setTimeout(() => {
      clear();
      navigate({ to: "/track", search: { order: orderId } });
    }, 1100);
  };

  return (
    <section className="mx-auto max-w-6xl px-6 py-14">
      <h1 className="font-display text-4xl font-bold sm:text-5xl">Checkout</h1>
      <p className="mt-2 text-muted-foreground">
        Secure card payment. <span className="inline-flex items-center gap-1 text-primary"><Lock className="h-3.5 w-3.5" /> 256-bit encrypted</span>
      </p>

      <form onSubmit={handleSubmit} className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-8">
          <Card title="Delivery details">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name" required><input required className="input" placeholder="Jane Doe" /></Field>
              <Field label="Phone" required><input required className="input" placeholder="0801 234 5678" /></Field>
              <Field label="Address" required className="sm:col-span-2"><input required className="input" placeholder="House 12, Sample Street" /></Field>
              <Field label="City" required><input required className="input" placeholder="Asaba" /></Field>
              <Field label="Landmark"><input className="input" placeholder="Near the junction" /></Field>
            </div>
          </Card>

          <Card title="Payment">
            <div className="mb-4 flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground w-fit">
              <CreditCard className="h-3.5 w-3.5" /> Debit / Credit card
            </div>
            <div className="grid gap-4">
              <Field label="Card number" required>
                <input
                  required
                  inputMode="numeric"
                  value={card.number}
                  onChange={(e) => setCard({ ...card, number: formatCardNumber(e.target.value) })}
                  placeholder="1234 5678 9012 3456"
                  className="input font-mono tracking-wider"
                  maxLength={19}
                />
              </Field>
              <Field label="Name on card" required>
                <input
                  required
                  value={card.name}
                  onChange={(e) => setCard({ ...card, name: e.target.value })}
                  className="input"
                  placeholder="JANE DOE"
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Expiry" required>
                  <input
                    required
                    value={card.exp}
                    onChange={(e) => setCard({ ...card, exp: formatExp(e.target.value) })}
                    placeholder="MM / YY"
                    className="input"
                    maxLength={7}
                  />
                </Field>
                <Field label="CVC" required>
                  <input
                    required
                    value={card.cvc}
                    onChange={(e) => setCard({ ...card, cvc: e.target.value.replace(/\D/g, "").slice(0, 4) })}
                    placeholder="123"
                    className="input"
                  />
                </Field>
              </div>
            </div>
            <p className="mt-4 inline-flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Demo checkout — no real charge is made. Live Stripe processing can be enabled on request.
            </p>
          </Card>
        </div>

        <aside className="h-fit rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-xl font-bold">Your order</h2>
          <ul className="mt-4 max-h-72 space-y-2 overflow-auto pr-1 text-sm">
            {lines.length === 0 && <li className="text-muted-foreground">No items in cart.</li>}
            {lines.map((l) => (
              <li key={l.item.id} className="flex justify-between gap-3">
                <span className="truncate">{l.qty} × {l.item.name}</span>
                <span className="shrink-0 font-medium">{formatNaira(l.item.price * l.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="my-4 h-px bg-border" />
          <dl className="space-y-2 text-sm">
            <Row k="Subtotal" v={formatNaira(subtotal)} />
            <Row k="Delivery" v={formatNaira(delivery)} />
            <div className="my-2 h-px bg-border" />
            <Row k="Total" v={formatNaira(total)} bold />
          </dl>
          <button
            type="submit"
            disabled={lines.length === 0 || submitting}
            className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-warm transition hover:bg-primary/90 disabled:opacity-50"
          >
            {submitting ? "Processing…" : <>Pay {formatNaira(total)}</>}
          </button>
        </aside>
      </form>

      <style>{`.input{display:block;width:100%;height:44px;border-radius:10px;border:1px solid var(--color-border);background:var(--color-card);padding:0 14px;font-size:14px;outline:none;transition:border-color .15s,box-shadow .15s}.input:focus{border-color:var(--color-primary);box-shadow:0 0 0 3px color-mix(in oklab,var(--color-primary) 20%,transparent)}`}</style>
    </section>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h2 className="font-display text-xl font-bold">{title}</h2>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function Field({ label, required, className = "", children }: { label: string; required?: boolean; className?: string; children: React.ReactNode }) {
  return (
    <label className={"block " + className}>
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}{required && <span className="text-primary"> *</span>}
      </span>
      {children}
    </label>
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

function formatCardNumber(v: string) {
  return v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}
function formatExp(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 4);
  if (d.length < 3) return d;
  return d.slice(0, 2) + " / " + d.slice(2);
}
