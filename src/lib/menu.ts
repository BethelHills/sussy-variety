export type MenuItem = {
  id: string;
  name: string;
  price: number;
  category: string;
  description?: string;
};

export const formatNaira = (n: number) =>
  "₦" + n.toLocaleString("en-NG");

export const menu: MenuItem[] = [
  // Peppered Snails - Medium
  { id: "snail-m-10", category: "Peppered Snails", name: "Peppered Snail (Medium) — 10 pcs", price: 8000 },
  { id: "snail-m-15", category: "Peppered Snails", name: "Peppered Snail (Medium) — 15 pcs", price: 12000 },
  { id: "snail-m-20", category: "Peppered Snails", name: "Peppered Snail (Medium) — 20 pcs", price: 16000 },
  { id: "snail-m-25", category: "Peppered Snails", name: "Peppered Snail (Medium) — 25 pcs", price: 20000 },
  { id: "snail-m-30", category: "Peppered Snails", name: "Peppered Snail (Medium) — 30 pcs", price: 24000 },
  { id: "snail-m-50", category: "Peppered Snails", name: "Peppered Snail (Medium) — 50 pcs", price: 40000 },
  // Odogwu
  { id: "snail-o-10", category: "Peppered Snails", name: "Peppered Snail (Odogwu) — 10 pcs", price: 9000 },
  { id: "snail-o-15", category: "Peppered Snails", name: "Peppered Snail (Odogwu) — 15 pcs", price: 13500 },
  { id: "snail-o-20", category: "Peppered Snails", name: "Peppered Snail (Odogwu) — 20 pcs", price: 18000 },
  { id: "snail-o-25", category: "Peppered Snails", name: "Peppered Snail (Odogwu) — 25 pcs", price: 22500 },
  { id: "snail-o-30", category: "Peppered Snails", name: "Peppered Snail (Odogwu) — 30 pcs", price: 27000 },
  { id: "snail-o-40", category: "Peppered Snails", name: "Peppered Snail (Odogwu) — 40 pcs", price: 36000 },
  { id: "snail-o-50", category: "Peppered Snails", name: "Peppered Snail (Odogwu) — 50 pcs", price: 45000 },

  // Parfait
  { id: "parfait-sm", category: "Fresh Fruit Parfait", name: "Small Cup", price: 3500 },
  { id: "parfait-bg", category: "Fresh Fruit Parfait", name: "Big Cup", price: 5000 },
  { id: "parfait-md", category: "Fresh Fruit Parfait", name: "Medium Plate", price: 7000 },
  { id: "parfait-jb", category: "Fresh Fruit Parfait", name: "Jumbo Plate", price: 9000 },

  // Peanuts
  { id: "peanut-25", category: "Peanuts", name: "Peanuts — 25cl", price: 1500 },
  { id: "peanut-50", category: "Peanuts", name: "Peanuts — 50cl", price: 3000 },

  // Soups
  { id: "soup-egusi", category: "Soup Bowls", name: "Egusi Soup", price: 4500 },
  { id: "soup-veg", category: "Soup Bowls", name: "Vegetable Soup", price: 4500 },
  { id: "soup-okro", category: "Soup Bowls", name: "Okro Soup", price: 4500 },
  { id: "soup-uha", category: "Soup Bowls", name: "Uha Soup", price: 5000 },

  // Stews
  { id: "stew-beef", category: "Stew Bowls", name: "Beef Stew", price: 4500 },
  { id: "stew-chick", category: "Stew Bowls", name: "Chicken Stew", price: 5000 },
  { id: "stew-turkey", category: "Stew Bowls", name: "Turkey Stew", price: 6000 },
  { id: "stew-banga", category: "Stew Bowls", name: "Banga Stew", price: 4500 },

  // Rice
  { id: "rice-jollof", category: "Rice Bowls", name: "Jollof Rice", price: 3500 },
  { id: "rice-fried", category: "Rice Bowls", name: "Fried Rice", price: 3500 },
  { id: "rice-native", category: "Rice Bowls", name: "Native Rice", price: 4000 },
  { id: "rice-coconut", category: "Rice Bowls", name: "Coconut Rice", price: 4000 },

  // Grills
  { id: "grill-ch-1", category: "Grills for Odogwu", name: "Chicken Grill — Size 1 Plate", price: 10000 },
  { id: "grill-ch-2", category: "Grills for Odogwu", name: "Chicken Grill — Size 2 Plate", price: 15000 },
  { id: "grill-ch-3", category: "Grills for Odogwu", name: "Chicken Grill — Size 3 Plate", price: 25000 },
  { id: "grill-tk-1", category: "Grills for Odogwu", name: "Turkey Grill — Size 1 Plate", price: 15000 },
  { id: "grill-tk-2", category: "Grills for Odogwu", name: "Turkey Grill — Size 2 Plate", price: 25000 },
  { id: "grill-tk-3", category: "Grills for Odogwu", name: "Turkey Grill — Size 3 Plate", price: 35000 },
  { id: "grill-gz-1", category: "Grills for Odogwu", name: "Gizzard Grill — Size 1 Plate", price: 10000 },
  { id: "grill-gz-2", category: "Grills for Odogwu", name: "Gizzard Grill — Size 2 Plate", price: 20000 },
  { id: "grill-gz-3", category: "Grills for Odogwu", name: "Gizzard Grill — Size 3 Plate", price: 30000 },

  // Drinks
  { id: "palm-wine", category: "Drinks", name: "Fresh Palm Wine", price: 2500, description: "Freshly tapped palm wine — bottled and chilled. Feed the body that works the money." },
];

export const categories = Array.from(new Set(menu.map((m) => m.category)));
