"use client";

import { Search } from "lucide-react";
import { PropertyCard } from "@/components/property-card";
import { Property } from "@/types/property";

interface PropertyGridProps {
  properties: Property[];
  loading: boolean;
  title: string;
  subtitle: string;
  onClearFilters?: () => void;
}

export function PropertyGrid({ 
  properties, 
  loading, 
  title, 
  subtitle,
  onClearFilters 
}: PropertyGridProps) {
  if (loading) {
    return (
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center py-20">
          <div className="w-12 h-12 border-[3px] border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-5" />
          <p className="text-muted-foreground">Loading properties...</p>
        </div>
      </section>
    );
  }

  if (properties.length === 0) {
    return (
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-2">
            {title}
          </h2>
          <p className="text-muted-foreground">
            {subtitle}
          </p>
        </div>
        <div className="text-center py-20 bg-secondary/20 rounded-2xl border border-border/40">
          <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Search className="h-7 w-7 text-muted-foreground" />
          </div>
          <p className="text-lg font-semibold text-foreground mb-1">No properties found</p>
          <p className="text-sm text-muted-foreground mb-6">Try adjusting your search or filters</p>
          {onClearFilters && (
            <button
              onClick={onClearFilters}
              className="px-6 py-2.5 bg-foreground text-background rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Clear all filters
            </button>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="text-3xl font-heading font-bold text-foreground mb-2">
            {title}
          </h2>
          <p className="text-muted-foreground">
            {subtitle}
          </p>
        </div>
        <span className="text-sm text-muted-foreground hidden sm:block">
          {properties.length} {properties.length === 1 ? 'property' : 'properties'}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {properties.slice(0, 8).map((property) => (
          <PropertyCard 
            key={property._id} 
            property={{ ...property, id: property._id }} 
            variant="compact" 
          />
        ))}
      </div>
    </section>
  );
}
