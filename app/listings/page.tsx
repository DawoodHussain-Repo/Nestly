"use client";

import { useState, useMemo, useEffect } from "react";
import { Search } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { PROPERTY_TYPES, PRICE_RANGES, UI } from "@/constants";
import { FormSelect } from "@/components/ui/form-controls";
import { PropertyCard } from "@/components/property-card";
import { Container } from "@/components/ui/layout";
import { Heading, Text } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import { Property } from "@/types/property";

export default function ListingsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [propertyType, setPropertyType] = useState<string>(PROPERTY_TYPES[0] ?? "All Types");
  const [priceRange, setPriceRange] = useState<string>(PRICE_RANGES[0] ?? "Price: Any");
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
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

    // Apply search filter
    if (debouncedQuery.trim()) {
      const q = debouncedQuery.toLowerCase();
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q)
      );
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
  }, [properties, debouncedQuery, propertyType, priceRange]);

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

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by location, name, or type..."
                    className="h-11 rounded-full bg-background border-border pl-10"
                  />
                </div>
              </div>
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
            {debouncedQuery && (
                <span className="text-sm font-normal text-muted-foreground ml-2">
                &mdash; showing results for &ldquo;{debouncedQuery}&rdquo;
              </span>
            )}
            </Heading>
            <Text muted className="mb-8">
              Filter by destination, property type, and budget to find your best match.
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
                    setSearchQuery("");
                    setPropertyType(PROPERTY_TYPES[0]);
                    setPriceRange(PRICE_RANGES[0]);
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
