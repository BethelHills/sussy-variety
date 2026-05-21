import { Link } from "@tanstack/react-router";
import { Instagram, Phone, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-wood-grain text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-display text-2xl font-bold text-gradient-gold">
            Sussy Variety
          </div>
          <p className="mt-3 max-w-sm text-sm text-cream/70">
            A delightful mix of confectioneries, fresh fruits parfait, local &amp; continental
            meals, grillz and peppered snails. Feed the body that works the money.
          </p>
        </div>
        <div>
          <div className="mb-3 text-xs uppercase tracking-[0.2em] text-accent">Explore</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/menu" className="hover:text-accent">Menu</Link></li>
            <li><Link to="/track" className="hover:text-accent">Track order</Link></li>
            <li><Link to="/about" className="hover:text-accent">About</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
          </ul>
        </div>
        <div>
          <div className="mb-3 text-xs uppercase tracking-[0.2em] text-accent">Reach us</div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> 0810 034 5787</li>
            <li className="flex items-center gap-2"><MessageCircle className="h-4 w-4" /> WhatsApp 0810 034 5787</li>
            <li className="flex items-center gap-2"><Instagram className="h-4 w-4" /> @Sussy_Variety</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 text-xs text-cream/60">
          <span>© {new Date().getFullYear()} Sussy Variety Edible Treats</span>
          <span className="italic">Feed the body that works the money.</span>
        </div>
      </div>
    </footer>
  );
}
