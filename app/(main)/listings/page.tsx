"use client";

import { Suspense, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import { PROPERTY_TYPES, PRICE_RANGES, UI } from "@/constants";
import { PropertyCard } from "@/components/property-card";
import { Container } from "@/components/ui/layout";
import { SearchBar } from "@/components/home/search-bar";
import { FilterPill } from "@/components/ui/filter-pill";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { useProperties } from "@/hooks/use-api";

function ListingsContent() {
  const searchParams = useSearchParams();
  const [propertyType, setPropertyType] = useState<string>(PROPERTY_TYPES[0] ?? "All Types");
  const [priceRange, setPriceRange] = useState<string>(PRICE_RANGES[0] ?? "Price: Any");
  const { data: properties, loading, error, refetch } = useProperties();

  const searchQuery = searchParams.get('search') || "";
  const dateParam = searchParams.get('date') || "";
  const guestsParam = searchParams.get('guests') || "";
  const debouncedQuery = useDebounce(searchQuery, UI.DEBOUNCE_DELAY_MS);

  const filteredProperties = useMemo(() => {
    let filtered = [...(properties || [])];

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

  const handleClearAll = () => {
    setPropertyType(PROPERTY_TYPES[0]);
    setPriceRange(PRICE_RANGES[0]);
    window.location.href = '/listings';
  };

  if (error) {
    return (
      <div className="bg-background text-foreground min-h-screen flex flex-col">
        <div className="h-28" />
        <main className="flex-grow">
          <ErrorState 
            message={error}
            onRetry={refetch}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      <div className="h-28" />

      <main className="flex-grow">
        {/* Search Header */}
        <section className="bg-gradient-to-b from-secondary/30 via-secondary/10 to-background py-14 relative z-40">
          <Container>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6 text-center">
              Find your perfect stay
            </h1>
            <SearchBar 
              variant="compact"
              initialSearch={searchQuery}
              initialDate={dateParam}
              initialGuests={guestsParam}
            />
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
                  onClick={handleClearAll}
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
              <LoadingSpinner message="Loading properties..." />
            ) : filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property._id} property={{ ...property, id: property._id }} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No properties found"
                message="Try adjusting your search or filters"
                actionLabel="Clear all filters"
                onAction={handleClearAll}
              />
            )}
          </Container>
        </section>
      </main>
    </div>
  );
}

export default function ListingsPage() {
  return (
    <Suspense fallback={<LoadingSpinner message="Loading..." />}>
      <ListingsContent />
    </Suspense>
  );
}
