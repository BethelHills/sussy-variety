import { createFileRoute } from "@tanstack/react-router";
import chefBlack from "@/assets/chef-black.jpg";
import logo from "@/assets/logo-wall.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Sussy Variety" },
      { name: "description", content: "The story behind Sussy Variety Edible Treats — feeding the body that works the money." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="bg-wood-grain text-cream">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Our story</div>
          <h1 className="mt-3 font-display text-5xl font-bold sm:text-6xl max-w-3xl">
            A delightful mix of <span className="text-gradient-gold">treats &amp; tradition.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-cream/75">
            Sussy Variety is a homegrown kitchen serving confectioneries, fresh fruit parfait,
            local &amp; continental meals, grillz and the famous Odogwu peppered snails. Every
            plate is made for people who hustle hard and deserve to eat well.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2">
        <img src={chefBlack} alt="Chef portrait" className="rounded-3xl shadow-warm" />
        <div>
          <h2 className="font-display text-4xl font-bold">Cooked the way mama taught us.</h2>
          <p className="mt-4 text-muted-foreground">
            Every recipe starts in our home kitchen. We pick the snails ourselves, marinate
            the grills overnight and serve everything fresh. No shortcuts, no compromises.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex gap-2"><span className="text-primary">✓</span> Locally sourced ingredients</li>
            <li className="flex gap-2"><span className="text-primary">✓</span> Same-day cooking, no day-old plates</li>
            <li className="flex gap-2"><span className="text-primary">✓</span> Live rider tracking on every order</li>
            <li className="flex gap-2"><span className="text-primary">✓</span> Secure card payments</li>
          </ul>
        </div>
      </section>

      <section className="bg-secondary/40">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center">
          <img src={logo} alt="Sussy Variety brand wall" className="mx-auto max-h-72 rounded-2xl object-cover shadow-warm" />
          <p className="mx-auto mt-8 max-w-2xl font-display text-2xl italic text-foreground/80">
            “Feed the body that works the money.”
          </p>
        </div>
      </section>
    </>
  );
}
