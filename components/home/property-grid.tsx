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
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center py-24">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">Loading properties...</p>
        </div>
      </section>
    );
  }

  if (properties.length === 0) {
    return (
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-16">
          <div>
            <h2 className="text-4xl font-heading font-bold text-foreground mb-3">
              {title}
            </h2>
            <p className="text-lg text-muted-foreground">
              {subtitle}
            </p>
          </div>
        </div>
        <div className="text-center py-24 bg-secondary/30 rounded-3xl">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="h-10 w-10 text-primary" />
          </div>
          <p className="text-xl font-semibold text-foreground mb-2">No properties found</p>
          <p className="text-muted-foreground mb-6">Try adjusting your search or filters</p>
          {onClearFilters && (
            <button
              onClick={onClearFilters}
              className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
            >
              Clear all filters
            </button>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-16">
        <div>
          <h2 className="text-4xl font-heading font-bold text-foreground mb-3">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {subtitle}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
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
