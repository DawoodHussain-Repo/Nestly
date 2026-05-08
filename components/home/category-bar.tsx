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
import { cn } from "@/lib/utils";

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
    <div className="relative bg-background border-b border-border/60">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-center gap-2 sm:gap-4 flex-wrap">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={cn(
                  'flex items-center gap-2.5 px-5 py-3 rounded-full transition-all duration-200 border',
                  'text-sm font-medium whitespace-nowrap',
                  active
                    ? 'bg-foreground text-background border-foreground shadow-lg'
                    : 'bg-transparent text-muted-foreground border-border/80 hover:border-foreground/30 hover:text-foreground hover:bg-secondary/50'
                )}
              >
                <Icon className={cn(
                  'h-4 w-4 flex-shrink-0 transition-colors',
                  active ? 'text-background' : 'text-muted-foreground'
                )} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export { categories };
