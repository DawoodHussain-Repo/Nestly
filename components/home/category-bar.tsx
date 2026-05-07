"use client";

import {
  Building2,
  Mountain,
  Palmtree,
  Snowflake,
  Tent,
  TreePine,
  Waves,
} from "lucide-react";

const categories = [
  { id: "all", name: "All", icon: Building2, filter: null },
  { id: "beachfront", name: "Beachfront", icon: Waves, filter: "villa" },
  { id: "cabins", name: "Cabins", icon: Tent, filter: "cabin" },
  { id: "city", name: "City", icon: Building2, filter: "apartment" },
  { id: "countryside", name: "Countryside", icon: TreePine, filter: "house" },
  { id: "mountains", name: "Mountains", icon: Mountain, filter: "cabin" },
  { id: "ski", name: "Ski", icon: Snowflake, filter: "cabin" },
  { id: "tropical", name: "Tropical", icon: Palmtree, filter: "villa" },
];

interface CategoryBarProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export function CategoryBar({ selectedCategory, onSelectCategory }: CategoryBarProps) {
  return (
    <div className="relative bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex gap-8 overflow-x-auto scrollbar-hide items-start">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex flex-col items-center gap-3 min-w-[80px] transition-all flex-shrink-0 ${
                  active
                    ? "opacity-100 text-primary"
                    : "opacity-70 text-muted-foreground hover:opacity-100"
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                  active ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105' : 'bg-secondary/70 hover:bg-secondary hover:scale-105'
                }`}>
                  <Icon className="h-7 w-7" />
                </div>
                <span className="text-xs font-semibold whitespace-nowrap">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export { categories };
