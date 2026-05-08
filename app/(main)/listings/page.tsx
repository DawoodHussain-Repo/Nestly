"use client";

import { Suspense, useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import { PROPERTY_TYPES, PRICE_RANGES, UI } from "@/constants";
import { PropertyCard } from "@/components/property-card";
import { Container } from "@/components/ui/layout";
import { Property } from "@/types/property";
import { SearchBar } from "@/components/home/search-bar";
import { ChevronDown, X } from "lucide-react";

function FilterPill({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const isActive = value !== options[0];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-medium transition-all ${
          isActive
            ? 'bg-foreground text-background border-foreground'
            : 'bg-transparent text-foreground border-border hover:border-foreground/40'
        }`}
      >
        <span>{isActive ? value : label}</span>
        {isActive ? (
          <X
            className="h-3.5 w-3.5 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onChange(options[0]);
              setOpen(false);
            }}
          />
        ) : (
          <ChevronDown className="h-3.5 w-3.5" />
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-full left-0 mt-2 min-w-[180px] bg-background border border-border rounded-xl shadow-xl z-50 py-1 max-h-60 overflow-y-auto scroll-styled">
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                  value === opt
                    ? 'bg-primary/10 text-primary font-semibold'
                    : 'text-foreground hover:bg-secondary/50'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ListingsContent() {
  const searchParams = useSearchParams();
  const [propertyType, setPropertyType] = useState<string>(PROPERTY_TYPES[0] ?? "All Types");
  const [priceRange, setPriceRange] = useState<string>(PRICE_RANGES[0] ?? "Price: Any");
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const searchQuery = searchParams.get('search') || "";
  const dateParam = searchParams.get('date') || "";
  const guestsParam = searchParams.get('guests') || "";
  const debouncedQuery = useDebounce(searchQuery, UI.DEBOUNCE_DELAY_MS);

  useEffect(() => {
    async function fetchProperties() {
      try {
        setLoading(true);
        const response = await fetch('/api/listings');
        const data = await response.json();
        if (data.success) {
          setProperties(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch properties:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProperties();
  }, []);

  const filteredProperties = useMemo(() => {
    let filtered = [...properties];

    if (debouncedQuery.trim()) {
      const q = debouncedQuery.toLowerCase();
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q)
      );
    }

    if (guestsParam) {
      filtered = filtered.filter((p) => p.guests >= Number(guestsParam));
    }

    if (propertyType !== PROPERTY_TYPES[0]) {
      filtered = filtered.filter((p) =>
        p.type.toLowerCase() === propertyType.toLowerCase()
      );
    }

    if (priceRange !== PRICE_RANGES[0]) {
      if (priceRange.includes("-")) {
        const [minStr, maxStr] = priceRange.split("-");
        const min = Number(minStr.replace(/\D/g, ""));
        const max = Number(maxStr.replace(/\D/g, ""));
        filtered = filtered.filter((p) => p.price >= min && p.price <= max);
      } else if (priceRange.includes("+")) {
        const min = Number(priceRange.replace(/\D/g, ""));
        filtered = filtered.filter((p) => p.price >= min);
      }
    }

    return filtered;
  }, [properties, debouncedQuery, guestsParam, propertyType, priceRange]);

  const hasActiveFilters = propertyType !== PROPERTY_TYPES[0] || priceRange !== PRICE_RANGES[0] || debouncedQuery || guestsParam;

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      <div className="h-28" />

      <main className="flex-grow">
        {/* Search Header */}
        <section className="bg-gradient-to-b from-secondary/30 via-secondary/10 to-background py-14">
          <Container>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6 text-center">
              Find your perfect stay
            </h1>
            <SearchBar variant="compact" />
          </Container>
        </section>

        {/* Filters + Results */}
        <section className="py-10">
          <Container>
            {/* Filter pills */}
            <div className="flex items-center gap-3 flex-wrap mb-8">
              <FilterPill
                label="Property Type"
                options={PROPERTY_TYPES}
                value={propertyType}
                onChange={setPropertyType}
              />
              <FilterPill
                label="Price Range"
                options={PRICE_RANGES}
                value={priceRange}
                onChange={setPriceRange}
              />
              {hasActiveFilters && (
                <button
                  onClick={() => {
                    setPropertyType(PROPERTY_TYPES[0]);
                    setPriceRange(PRICE_RANGES[0]);
                    window.location.href = '/listings';
                  }}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Results header */}
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="text-sm text-muted-foreground">
                  {debouncedQuery && `Results for "${debouncedQuery}"`}
                  {guestsParam && `${debouncedQuery ? ' · ' : ''}${guestsParam} ${Number(guestsParam) === 1 ? 'guest' : 'guests'}`}
                  {dateParam && `${(debouncedQuery || guestsParam) ? ' · ' : ''}${new Date(dateParam).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
                  {!debouncedQuery && !guestsParam && !dateParam && `${filteredProperties.length} properties available`}
                </p>
              </div>
            </div>

            {/* Grid */}
            {loading ? (
              <div className="text-center py-20">
                <div className="w-12 h-12 border-[3px] border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-5" />
                <p className="text-muted-foreground">Loading properties...</p>
              </div>
            ) : filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property._id} property={{ ...property, id: property._id }} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-lg font-semibold text-foreground mb-1">No properties found</p>
                <p className="text-sm text-muted-foreground mb-5">Try adjusting your search or filters</p>
                <button
                  onClick={() => {
                    setPropertyType(PROPERTY_TYPES[0]);
                    setPriceRange(PRICE_RANGES[0]);
                    window.location.href = '/listings';
                  }}
                  className="px-6 py-2.5 bg-foreground text-background rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </Container>
        </section>
      </main>
    </div>
  );
}

export default function ListingsPage() {
  return (
    <Suspense fallback={
      <div className="bg-background text-foreground min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-[3px] border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-5" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    }>
      <ListingsContent />
    </Suspense>
  );
}
