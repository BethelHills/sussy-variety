import { createFileRoute } from "@tanstack/react-router";
import { Phone, MessageCircle, Instagram, MapPin } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Sussy Variety" },
      { name: "description", content: "Get in touch with Sussy Variety. Call, WhatsApp or DM us on Instagram." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Get in touch</div>
      <h1 className="mt-2 font-display text-5xl font-bold">Let's feed you.</h1>
      <p className="mt-3 max-w-xl text-muted-foreground">
        Catering, bulk orders, or just a craving — we're a call away. Delivery fee depends on your location.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <a href="tel:08100345787" className="group rounded-2xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-warm">
          <Phone className="h-7 w-7 text-primary" />
          <div className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">Call us</div>
          <div className="mt-1 font-display text-2xl font-bold">0810 034 5787</div>
        </a>
        <a href="https://wa.me/2348100345787" className="group rounded-2xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-warm">
          <MessageCircle className="h-7 w-7 text-primary" />
          <div className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">WhatsApp</div>
          <div className="mt-1 font-display text-2xl font-bold">0810 034 5787</div>
        </a>
        <a href="https://instagram.com/Sussy_Variety" className="group rounded-2xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-warm">
          <Instagram className="h-7 w-7 text-primary" />
          <div className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">Instagram</div>
          <div className="mt-1 font-display text-2xl font-bold">@Sussy_Variety</div>
        </a>
        <div className="rounded-2xl border border-border bg-card p-7">
          <MapPin className="h-7 w-7 text-primary" />
          <div className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">Delivery</div>
          <div className="mt-1 font-display text-xl font-bold">Asaba &amp; surrounding areas</div>
          <p className="mt-2 text-sm text-muted-foreground">Live rider tracking on every order.</p>
        </div>
      </div>
    </section>
  );
}
