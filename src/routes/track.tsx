import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { Bike, Check, ChefHat, MapPin, Package, Phone } from "lucide-react";

const searchSchema = z.object({ order: z.string().optional() });

export const Route = createFileRoute("/track")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Track Your Order — Sussy Variety" },
      { name: "description", content: "Watch your Sussy Variety delivery in real time on a live map." },
    ],
  }),
  component: TrackPage,
});

// Asaba, Delta State — Nigeria (default demo coordinates)
const RESTAURANT = { lat: 6.198, lng: 6.733, label: "Sussy Variety Kitchen" };
const CUSTOMER = { lat: 6.226, lng: 6.712, label: "Your address" };

const stages = [
  { key: "received", label: "Order received", icon: Check },
  { key: "kitchen", label: "In the kitchen", icon: ChefHat },
  { key: "packed", label: "Packed for rider", icon: Package },
  { key: "transit", label: "Out for delivery", icon: Bike },
  { key: "delivered", label: "Delivered", icon: MapPin },
] as const;



function TrackPage() {
  const { order } = Route.useSearch();
  const orderId = order || "SV-DEMO01";
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [stage, setStage] = useState(3); // out for delivery
  const [eta, setEta] = useState(14);
  const [mapReady, setMapReady] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  // Load Google Maps once
  useEffect(() => {
    const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!key) {
      setMapError("Google Maps key not configured.");
      return;
    }
    if ((window as any).google?.maps) {
      drawMap();
      return;
    }
    (window as any).initSussyMap = () => drawMap();
    const tracking = import.meta.env.VITE_GOOGLE_MAPS_TRACKING_ID || "";
    const s = document.createElement("script");
    s.src = `https://maps.googleapis.com/maps/api/js?key=${key}&loading=async&callback=initSussyMap${tracking ? `&channel=${tracking}` : ""}`;
    s.async = true;
    s.defer = true;
    s.onerror = () => setMapError("Failed to load Google Maps.");
    document.head.appendChild(s);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Animate rider + ETA
  useEffect(() => {
    if (!mapReady) return;
    let t = 0;
    const id = setInterval(() => {
      t += 1;
      setEta((e) => Math.max(1, e - 1));
      if (t > 25 && stage < 4) setStage(4);
    }, 4000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapReady]);

  function drawMap() {
    if (!mapRef.current || !(window as any).google?.maps) return;
    const g = (window as any).google.maps;
    const map = new g.Map(mapRef.current, {
      center: { lat: (RESTAURANT.lat + CUSTOMER.lat) / 2, lng: (RESTAURANT.lng + CUSTOMER.lng) / 2 },
      zoom: 14,
      disableDefaultUI: true,
      zoomControl: true,
      styles: mapStyle,
    });

    new g.Marker({
      position: RESTAURANT, map,
      label: { text: "🍳", fontSize: "20px" },
      title: RESTAURANT.label,
    });
    new g.Marker({
      position: CUSTOMER, map,
      label: { text: "🏠", fontSize: "20px" },
      title: CUSTOMER.label,
    });

    // Simple curved path between the two points
    const path: { lat: number; lng: number }[] = [];
    const steps = 60;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const lat = RESTAURANT.lat + (CUSTOMER.lat - RESTAURANT.lat) * t;
      const lng = RESTAURANT.lng + (CUSTOMER.lng - RESTAURANT.lng) * t + Math.sin(t * Math.PI) * 0.006;
      path.push({ lat, lng });
    }
    new g.Polyline({
      path, map,
      strokeColor: "#d63838", strokeOpacity: 0.9, strokeWeight: 4,
    });

    const rider = new g.Marker({
      position: path[0], map,
      label: { text: "🛵", fontSize: "22px" },
      title: "Your rider",
    });

    let i = 0;
    setInterval(() => {
      i = (i + 1) % path.length;
      rider.setPosition(path[i]);
    }, 700);

    setMapReady(true);
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Live tracking</div>
          <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">Order {orderId}</h1>
          <p className="mt-2 text-muted-foreground">Estimated arrival in <span className="font-semibold text-foreground">{eta} min</span></p>
        </div>
        <a href="tel:08100345787" className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-warm">
          <Phone className="h-4 w-4" /> Call rider
        </a>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-warm">
          <div ref={mapRef} className="aspect-[4/3] w-full" />
          {!mapReady && !mapError && (
            <div className="absolute inset-0 grid place-items-center bg-muted text-sm text-muted-foreground">
              Loading live map…
            </div>
          )}
          {mapError && (
            <div className="absolute inset-0 grid place-items-center bg-muted p-6 text-center text-sm text-muted-foreground">
              {mapError}
            </div>
          )}
        </div>

        <aside className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-xl font-bold">Delivery status</h2>
          <ol className="mt-5 space-y-4">
            {stages.map((s, i) => {
              const done = i <= stage;
              const active = i === stage;
              const Icon = s.icon;
              return (
                <li key={s.key} className="flex items-start gap-3">
                  <div className={"mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border " +
                    (done ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground")}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="pt-1">
                    <div className={"font-semibold " + (done ? "" : "text-muted-foreground")}>{s.label}</div>
                    {active && <div className="text-xs text-primary">In progress</div>}
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="mt-6 rounded-xl bg-secondary p-4 text-sm">
            <div className="font-semibold">Rider · Emeka A.</div>
            <div className="text-muted-foreground">Honda — Plate LSR 472 XA</div>
          </div>
        </aside>
      </div>
    </section>
  );
}

const mapStyle = [
  { elementType: "geometry", stylers: [{ color: "#f5efe6" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#5b4636" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#fffaf2" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#fcebcf" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#f4c97b" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#bcd9e3" }] },
  { featureType: "poi", elementType: "geometry", stylers: [{ color: "#e8dcc4" }] },
  { featureType: "landscape.natural", elementType: "geometry", stylers: [{ color: "#ede2cc" }] },
];
