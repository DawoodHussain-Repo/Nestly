"use client";

import { Suspense, useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import { PROPERTY_TYPES, PRICE_RANGES, UI } from "@/constants";
import { FormSelect } from "@/components/ui/form-controls";
import { PropertyCard } from "@/components/property-card";
import { Container } from "@/components/ui/layout";
import { Heading, Text } from "@/components/ui/typography";
import { Property } from "@/types/property";
import { SearchBar } from "@/components/home/search-bar";

function ListingsContent() {
  const searchParams = useSearchParams();
  const [propertyType, setPropertyType] = useState<string>(PROPERTY_TYPES[0] ?? "All Types");
  const [priceRange, setPriceRange] = useState<string>(PRICE_RANGES[0] ?? "Price: Any");
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  // Get filters from URL params
  const searchQuery = searchParams.get('search') || "";
  const dateParam = searchParams.get('date') || "";
  const guestsParam = searchParams.get('guests') || "";

  const debouncedQuery = useDebounce(searchQuery, UI.DEBOUNCE_DELAY_MS);

  // Fetch properties from API
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

    // Apply search filter (location/destination)
    if (debouncedQuery.trim()) {
      const q = debouncedQuery.toLowerCase();
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q)
      );
    }

    // Apply guests filter
    if (guestsParam) {
      const guestCount = Number(guestsParam);
      filtered = filtered.filter((p) => p.guests >= guestCount);
    }

    // Apply type filter
    if (propertyType !== PROPERTY_TYPES[0]) {
      filtered = filtered.filter((p) =>
        p.type.toLowerCase() === propertyType.toLowerCase()
      );
    }

    // Apply price filter
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

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      {/* Spacer for fixed pill nav */}
      <div className="h-28" />

      <main className="flex-grow">
        <section className="bg-secondary/30 py-16">
          <Container>
            <Heading as="h1" className="mb-8 text-center">
              Browse Our Collection
            </Heading>

            <div className="mb-6">
              <SearchBar variant="compact" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <FormSelect
                  value={propertyType}
                  onValueChange={setPropertyType}
                  options={PROPERTY_TYPES.map((t) => ({ label: t, value: t }))}
                  triggerClassName="h-11 rounded-full bg-background border-border"
                />
              </div>
              <div>
                <FormSelect
                  value={priceRange}
                  onValueChange={setPriceRange}
                  options={PRICE_RANGES.map((r) => ({ label: r, value: r }))}
                  triggerClassName="h-11 rounded-full bg-background border-border"
                />
              </div>
            </div>
          </Container>
        </section>

        <section className="py-16">
          <Container>
            <Heading as="h2" className="mb-2">
            Available Properties ({filteredProperties.length})
            {(debouncedQuery || guestsParam || dateParam) && (
                <span className="text-sm font-normal text-muted-foreground ml-2">
                &mdash; filtered results
              </span>
            )}
            </Heading>
            <Text muted className="mb-8">
              {debouncedQuery && `Showing results for "${debouncedQuery}"`}
              {guestsParam && ` • ${guestsParam} ${Number(guestsParam) === 1 ? 'guest' : 'guests'}`}
              {dateParam && ` • ${new Date(dateParam).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
              {!debouncedQuery && !guestsParam && !dateParam && 'Filter by destination, property type, and budget to find your best match.'}
            </Text>

            {loading ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-lg text-muted-foreground">Loading properties...</p>
              </div>
            ) : filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property._id} property={{ ...property, id: property._id }} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground">No properties found matching your criteria.</p>
                <button
                  onClick={() => {
                    setPropertyType(PROPERTY_TYPES[0]);
                    setPriceRange(PRICE_RANGES[0]);
                    window.location.href = '/listings';
                  }}
                  className="mt-4 text-primary hover:underline"
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
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">Loading...</p>
        </div>
      </div>
    }>
      <ListingsContent />
    </Suspense>
  );
}
