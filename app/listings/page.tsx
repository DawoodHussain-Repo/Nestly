"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useDebounce } from "@/hooks/useDebounce";
import { PROPERTY_TYPES, PRICE_RANGES, UI } from "@/constants";

export default function ListingsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, UI.DEBOUNCE_DELAY_MS);

  const properties = [
    {
      id: 1,
      name: "Modern Loft Downtown",
      location: "New York, NY",
      price: 185,
      rating: 4.92,
      reviews: 28,
      beds: 1,
      baths: 1,
      type: "Studio",
    },
    {
      id: 2,
      name: "Beachfront Villa",
      location: "Malibu, CA",
      price: 850,
      rating: 4.96,
      reviews: 45,
      beds: 4,
      baths: 3,
      type: "Villa",
    },
    {
      id: 3,
      name: "Mountain Cabin Retreat",
      location: "Aspen, CO",
      price: 210,
      rating: 4.85,
      reviews: 32,
      beds: 2,
      baths: 1,
      type: "Cabin",
    },
    {
      id: 4,
      name: "Seaside Cottage",
      location: "Santorini, Greece",
      price: 320,
      rating: 4.88,
      reviews: 52,
      beds: 2,
      baths: 2,
      type: "Beach",
    },
    {
      id: 5,
      name: "Urban Studio",
      location: "Los Angeles, CA",
      price: 155,
      rating: 4.79,
      reviews: 18,
      beds: 1,
      baths: 1,
      type: "Studio",
    },
    {
      id: 6,
      name: "Luxury Penthouse",
      location: "Miami, FL",
      price: 550,
      rating: 4.94,
      reviews: 67,
      beds: 3,
      baths: 3,
      type: "Penthouse",
    },
    {
      id: 7,
      name: "Forest Lodge",
      location: "Portland, OR",
      price: 225,
      rating: 4.87,
      reviews: 41,
      beds: 3,
      baths: 2,
      type: "Cabin",
    },
    {
      id: 8,
      name: "Desert Villa",
      location: "Scottsdale, AZ",
      price: 380,
      rating: 4.91,
      reviews: 35,
      beds: 2,
      baths: 2,
      type: "Villa",
    },
  ];

  const filteredProperties = useMemo(() => {
    if (!debouncedQuery.trim()) return properties;
    const q = debouncedQuery.toLowerCase();
    return properties.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q),
    );
  }, [debouncedQuery]);

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col">
      <Navbar activePage="listings" />

      <main className="flex-grow pt-[72px]">
        {/* Hero Section with Search */}
        <section className="bg-surface-container-low py-xl px-lg">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-display-md font-display-md text-on-surface mb-lg text-center">
              Browse Our Collection
            </h1>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-md mb-xl">
              <div className="relative flex-1">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-secondary">
                  search
                </span>
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest rounded-full border border-surface-variant focus:ring-1 focus:ring-primary text-body-md font-body-md"
                  placeholder="Search by location, name, or type..."
                  type="text"
                />
              </div>
              <div className="flex gap-md">
                <select className="px-4 py-3 bg-surface-container-lowest rounded-full border border-surface-variant focus:ring-1 focus:ring-primary text-body-md font-body-md">
                  {PROPERTY_TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
                <select className="px-4 py-3 bg-surface-container-lowest rounded-full border border-surface-variant focus:ring-1 focus:ring-primary text-body-md font-body-md">
                  {PRICE_RANGES.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Properties Grid */}
        <section className="py-xl px-lg max-w-7xl mx-auto w-full">
          <h2 className="text-headline-lg font-headline-lg mb-lg text-on-surface">
            Available Properties ({filteredProperties.length})
            {debouncedQuery && (
              <span className="text-body-sm font-body-sm text-secondary ml-sm">
                &mdash; showing results for &ldquo;{debouncedQuery}&rdquo;
              </span>
            )}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
            {filteredProperties.map((property) => (
              <div key={property.id} className="group cursor-pointer">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-surface-container-high mb-md border border-surface-variant shadow-sm transition-all duration-300 group-hover:shadow-md">
                  <div className="w-full h-full bg-gradient-to-br from-surface-container to-surface-dim flex items-center justify-center">
                    <span className="text-surface-variant text-sm">
                      Property Image
                    </span>
                  </div>
                  <button className="absolute top-sm right-sm w-8 h-8 flex items-center justify-center rounded-full bg-surface-container-lowest/80 backdrop-blur-sm text-secondary hover:text-primary transition-colors">
                    <span
                      className="material-symbols-outlined"
                      style={{ fontVariationSettings: "'FILL' 0" }}
                    >
                      favorite
                    </span>
                  </button>
                  <div className="absolute top-sm left-sm bg-surface-container-lowest/90 backdrop-blur-sm px-xs py-1 rounded-md">
                    <span className="text-label-sm font-label-sm text-on-surface">
                      {property.type}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-start mb-xs">
                  <h3 className="text-headline-md font-headline-md text-on-surface truncate pr-2">
                    {property.name}
                  </h3>
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="material-symbols-outlined text-[16px]">
                      star
                    </span>
                    <span className="text-label-lg font-label-lg text-on-surface">
                      {property.rating}
                    </span>
                  </div>
                </div>
                <p className="text-body-sm font-body-sm text-secondary flex items-center mb-sm">
                  <span className="material-symbols-outlined text-[16px] mr-1">
                    location_on
                  </span>
                  {property.location}
                </p>
                <div className="flex gap-3 text-label-sm font-label-sm text-secondary mb-sm">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">
                      bed
                    </span>
                    {property.beds} bed{property.beds !== 1 ? "s" : ""}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">
                      bathroom
                    </span>
                    {property.baths} bath{property.baths !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex justify-between items-end">
                  <p className="text-label-lg font-label-lg text-primary">
                    ${property.price}{" "}
                    <span className="text-body-sm font-body-sm font-normal text-secondary">
                      / night
                    </span>
                  </p>
                  <span className="text-label-sm font-label-sm text-secondary">
                    ({property.reviews} reviews)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
