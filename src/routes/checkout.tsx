import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Lock } from "lucide-react";
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

  const [deliveryDetails, setDeliveryDetails] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    landmark: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (lines.length === 0) return;

    setSubmitting(true);

    const orderId = "SV-" + Math.random().toString(36).slice(2, 8).toUpperCase();

    const orderItems = lines.map((line) => ({
      id: line.item.id,
      name: line.item.name,
      price: line.item.price,
      quantity: line.qty,
      total: line.item.price * line.qty,
    }));

    const { error } = await supabase.from("orders").insert({
      customer_name: deliveryDetails.name,
      customer_phone: deliveryDetails.phone,
      customer_email: deliveryDetails.email,
      delivery_address: `${deliveryDetails.address}, ${deliveryDetails.city}${
        deliveryDetails.landmark ? `, ${deliveryDetails.landmark}` : ""
      }`,
      items: orderItems,
      total_amount: total,
      payment_reference: orderId,
      payment_status: "pending",
      order_status: "pending",
    });

    if (error) {
      console.error("Order save error:", error);
      alert("Could not save order. Please try again.");
      setSubmitting(false);
      return;
    }

    clear();
    navigate({ to: "/track", search: { order: orderId } });
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
              <Field label="Full name" required>
                <input
                  required
                  className="input"
                  placeholder="Jane Doe"
                  value={deliveryDetails.name}
                  onChange={(e) => setDeliveryDetails({ ...deliveryDetails, name: e.target.value })}
                />
              </Field>

              <Field label="Phone" required>
                <input
                  required
                  className="input"
                  placeholder="0801 234 5678"
                  value={deliveryDetails.phone}
                  onChange={(e) => setDeliveryDetails({ ...deliveryDetails, phone: e.target.value })}
                />
              </Field>

              <Field label="Email">
                <input
                  type="email"
                  className="input"
                  placeholder="customer@email.com"
                  value={deliveryDetails.email}
                  onChange={(e) => setDeliveryDetails({ ...deliveryDetails, email: e.target.value })}
                />
              </Field>

              <Field label="Address" required className="sm:col-span-2">
                <input
                  required
                  className="input"
                  placeholder="House 12, Sample Street"
                  value={deliveryDetails.address}
                  onChange={(e) => setDeliveryDetails({ ...deliveryDetails, address: e.target.value })}
                />
              </Field>

              <Field label="City" required>
                <input
                  required
                  className="input"
                  placeholder="Asaba"
                  value={deliveryDetails.city}
                  onChange={(e) => setDeliveryDetails({ ...deliveryDetails, city: e.target.value })}
                />
              </Field>

              <Field label="Landmark">
                <input
                  className="input"
                  placeholder="Near the junction"
                  value={deliveryDetails.landmark}
                  onChange={(e) => setDeliveryDetails({ ...deliveryDetails, landmark: e.target.value })}
                />
              </Field>
            </div>
          </Card>

          <Card title="Payment">
            <p className="text-sm text-muted-foreground">
              You will be redirected to Paystack to complete your payment securely.
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

