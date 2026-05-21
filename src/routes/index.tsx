import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Flame, Soup, MapPin, ShieldCheck } from "lucide-react";
import chefWhite from "@/assets/chef-white.jpg";
import chefBlack from "@/assets/chef-black.jpg";
import { menu, formatNaira } from "@/lib/menu";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sussy Variety — Edible Treats, Grills & Peppered Snails" },
      { name: "description", content: "Order grills, peppered snails, parfait and home-cooked meals. Live delivery tracking and secure card checkout." },
    ],
  }),
  component: Home,
});

const featured = [
  menu.find((m) => m.id === "grill-ch-2")!,
  menu.find((m) => m.id === "snail-o-20")!,
  menu.find((m) => m.id === "parfait-jb")!,
  menu.find((m) => m.id === "rice-jollof")!,
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-wood-grain text-cream">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.1fr_1fr] lg:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              <Flame className="h-3.5 w-3.5" /> Now delivering
            </span>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
              Feed the body <br />
              that <span className="text-gradient-gold">works the money.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base text-cream/75 sm:text-lg">
              Hand-grilled Odogwu plates, peppered snails, fresh fruit parfait and rich
              continental bowls — delivered hot to your door with live rider tracking.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/menu"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-warm transition hover:bg-primary/90"
              >
                Order now <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/track"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-cream/30 px-6 text-sm font-semibold text-cream hover:bg-cream/10"
              >
                <MapPin className="h-4 w-4" /> Track an order
              </Link>
            </div>
            <div className="mt-10 grid max-w-md grid-cols-3 gap-6 text-cream/70">
              <Stat k="6yrs" v="Serving treats" />
              <Stat k="40+" v="Menu items" />
              <Stat k="Live" v="Rider tracking" />
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-accent/30 via-primary/20 to-transparent blur-2xl" />
            <div className="relative grid grid-cols-5 grid-rows-6 gap-3">
              <img
                src={chefWhite}
                alt="Sussy Variety chef in white"
                className="col-span-3 row-span-6 h-full w-full rounded-2xl object-cover shadow-warm"
              />
              <img
                src={chefBlack}
                alt="Sussy Variety chef in black"
                className="col-span-2 row-span-4 h-full w-full rounded-2xl object-cover"
              />
              <div className="col-span-2 row-span-2 rounded-2xl bg-primary p-4 text-primary-foreground">
                <div className="text-[10px] uppercase tracking-[0.2em] opacity-80">Hotline</div>
                <div className="mt-1 font-display text-lg font-bold">0810 034 5787</div>
                <div className="text-xs opacity-80">Call or WhatsApp</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Our Services</div>
            <h2 className="mt-2 font-display text-4xl font-bold sm:text-5xl">Made with fire, served with love</h2>
          </div>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { icon: Flame, t: "Grillz & Peppered Snails", d: "Chicken, turkey & gizzard plates plus our famous Odogwu peppered snails." },
            { icon: Soup, t: "Local & Continental", d: "Egusi, okro, uha, jollof, fried rice, native rice and rich stews." },
            { icon: ShieldCheck, t: "Fresh Fruit Parfait", d: "Hand-cut seasonal fruits layered for cups, plates and jumbo platters." },
          ].map((s) => (
            <div key={s.t} className="rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:shadow-warm">
              <s.icon className="h-7 w-7 text-primary" />
              <h3 className="mt-4 font-display text-xl font-bold">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED MENU */}
      <section className="bg-secondary/40">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Best sellers</div>
              <h2 className="mt-2 font-display text-4xl font-bold">Crowd favourites</h2>
            </div>
            <Link to="/menu" className="hidden text-sm font-semibold text-primary hover:underline sm:inline">
              Full menu →
            </Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((m) => (
              <div key={m.id} className="group rounded-2xl border border-border bg-card p-5">
                <div className="aspect-[5/4] rounded-xl bg-gradient-to-br from-primary/20 via-accent/30 to-wood/30" />
                <div className="mt-4 text-xs uppercase tracking-wider text-muted-foreground">{m.category}</div>
                <div className="mt-1 font-display text-lg font-bold leading-snug">{m.name}</div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-semibold text-primary">{formatNaira(m.price)}</span>
                  <Link to="/menu" className="text-xs font-semibold text-foreground/70 group-hover:text-primary">
                    Add →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRACKING TEASER */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid items-center gap-10 rounded-3xl bg-wood-grain p-8 text-cream md:grid-cols-2 md:p-14">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Live tracking</div>
            <h2 className="mt-3 font-display text-4xl font-bold">Watch your order ride to you.</h2>
            <p className="mt-4 text-cream/75">
              From the kitchen to your gate — follow your rider on a real map in real time. Get
              ETA updates and a delivery confirmation when it arrives.
            </p>
            <Link
              to="/track"
              className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground"
            >
              Try the tracker <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-cream/10 bg-cream/5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,oklch(0.82_0.13_80/.25),transparent_60%),radial-gradient(circle_at_70%_70%,oklch(0.56_0.21_28/.25),transparent_60%)]" />
            <div className="absolute left-6 top-6 rounded-xl bg-background/95 px-4 py-3 text-foreground shadow-warm">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Rider ETA</div>
              <div className="font-display text-xl font-bold">12 mins</div>
            </div>
            <div className="absolute bottom-6 right-6 rounded-xl bg-primary px-4 py-3 text-primary-foreground shadow-warm">
              <div className="text-[10px] uppercase tracking-widest opacity-80">Status</div>
              <div className="font-display text-lg font-bold">On the way</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className="font-display text-2xl font-bold text-cream">{k}</div>
      <div className="text-xs uppercase tracking-wider">{v}</div>
    </div>
  );
}
