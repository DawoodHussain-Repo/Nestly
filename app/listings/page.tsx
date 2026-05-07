"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useDebounce } from "@/hooks/useDebounce";
import { PROPERTY_TYPES, PRICE_RANGES, UI } from "@/constants";
import { FormSelect } from "@/components/ui/form-controls";
import { PropertyCard } from "@/components/property-card";
import { Container } from "@/components/ui/layout";
import { Heading, Text } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";

export default function ListingsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [propertyType, setPropertyType] = useState<string>(PROPERTY_TYPES[0] ?? "All Types");
  const [priceRange, setPriceRange] = useState<string>(PRICE_RANGES[0] ?? "Any Price");
  const debouncedQuery = useDebounce(searchQuery, UI.DEBOUNCE_DELAY_MS);

  const properties = [
    {
      id: 1,
      title: "Modern Loft Downtown",
      location: "New York, NY",
      price: 185,
      rating: 4.92,
      reviews: 28,
      bedrooms: 1,
      bathrooms: 1,
      guests: 2,
      type: "Studio",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=400&fit=crop",
    },
    {
      id: 2,
      title: "Beachfront Villa",
      location: "Malibu, CA",
      price: 850,
      rating: 4.96,
      reviews: 45,
      bedrooms: 4,
      bathrooms: 3,
      guests: 8,
      type: "Villa",
      image: "https://images.unsplash.com/photo-1512917774080-9b274b3c4a7f?w=500&h=400&fit=crop",
    },
    {
      id: 3,
      title: "Mountain Cabin Retreat",
      location: "Aspen, CO",
      price: 210,
      rating: 4.85,
      reviews: 32,
      bedrooms: 2,
      bathrooms: 1,
      guests: 4,
      type: "Cabin",
      image: "https://images.unsplash.com/photo-1505873242700-f289a29e7e0a?w=500&h=400&fit=crop",
    },
    {
      id: 4,
      title: "Seaside Cottage",
      location: "Santorini, Greece",
      price: 320,
      rating: 4.88,
      reviews: 52,
      bedrooms: 2,
      bathrooms: 2,
      guests: 4,
      type: "Beach",
      image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=500&h=400&fit=crop",
    },
    {
      id: 5,
      title: "Urban Studio",
      location: "Los Angeles, CA",
      price: 155,
      rating: 4.79,
      reviews: 18,
      bedrooms: 1,
      bathrooms: 1,
      guests: 2,
      type: "Studio",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=400&fit=crop",
    },
    {
      id: 6,
      title: "Luxury Penthouse",
      location: "Miami, FL",
      price: 550,
      rating: 4.94,
      reviews: 67,
      bedrooms: 3,
      bathrooms: 3,
      guests: 6,
      type: "Penthouse",
      image: "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=500&h=400&fit=crop",
    },
    {
      id: 7,
      title: "Forest Lodge",
      location: "Portland, OR",
      price: 225,
      rating: 4.87,
      reviews: 41,
      bedrooms: 3,
      bathrooms: 2,
      guests: 5,
      type: "Cabin",
      image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=500&h=400&fit=crop",
    },
    {
      id: 8,
      title: "Desert Villa",
      location: "Scottsdale, AZ",
      price: 380,
      rating: 4.91,
      reviews: 35,
      bedrooms: 2,
      bathrooms: 2,
      guests: 4,
      type: "Villa",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&h=400&fit=crop",
    },
  ];

  const filteredProperties = useMemo(() => {
    if (!debouncedQuery.trim()) return properties;
    const q = debouncedQuery.toLowerCase();
    return properties.filter((p) => {
      const matchesQuery =
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q);
      const matchesType =
        propertyType === PROPERTY_TYPES[0] ||
        p.type.toLowerCase() === propertyType.toLowerCase();
      let matchesPrice = false;
      if (priceRange === PRICE_RANGES[0]) {
        matchesPrice = true;
      } else if (priceRange.includes("-")) {
        const [minStr, maxStr] = priceRange.split("-");
        const min = Number(minStr.replace(/\D/g, ""));
        const max = Number(maxStr.replace(/\D/g, ""));
        matchesPrice = p.price >= min && p.price <= max;
      } else if (priceRange.includes("+")) {
        const min = Number(priceRange.replace(/\D/g, ""));
        matchesPrice = p.price >= min;
      }
      return matchesQuery && matchesType && matchesPrice;
    });
  }, [debouncedQuery, propertyType, priceRange]);

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      <Navbar activePage="listings" />

      <main className="flex-grow pt-[72px]">
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
            ))}
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
