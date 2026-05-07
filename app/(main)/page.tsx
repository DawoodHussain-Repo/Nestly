"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { HeroSection } from "@/components/home/hero-section";
import { CategoryBar, categories } from "@/components/home/category-bar";
import { PropertyGrid } from "@/components/home/property-grid";
import { HowItWorksSection } from "@/components/how-it-works/section";
import { Property } from "@/types/property";
import { useDebounce } from "@/hooks/useDebounce";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

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

  // Filter properties by category
  const filteredListings = properties.filter((p) => {
    const categoryFilter = categories.find(c => c.id === selectedCategory);
    const matchesCategory = !categoryFilter?.filter || p.type === categoryFilter.filter;
    return matchesCategory;
  });

  // Get title based on selected category
  const getTitle = () => {
    if (selectedCategory !== "all") {
      const category = categories.find(c => c.id === selectedCategory);
      return `${category?.name} Properties`;
    }
    return 'Popular destinations';
  };

  const handleClearFilters = () => {
    setSelectedCategory("all");
  };

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col antialiased">
      {/* Spacer for fixed pill nav */}
      <div className="h-28" />

      <main className="flex-grow">
        <HeroSection />

        <CategoryBar 
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <PropertyGrid
          properties={filteredListings}
          loading={loading}
          title={getTitle()}
          subtitle="Discover unique stays handpicked for you"
          onClearFilters={handleClearFilters}
        />

        <HowItWorksSection
          steps={[
            { 
              id: "discover", 
              title: "Discover", 
              description: "Browse thousands of verified properties across every category imaginable." 
            },
            { 
              id: "book", 
              title: "Book", 
              description: "Reserve instantly with secure payments and flexible cancellation policies." 
            },
            { 
              id: "stay", 
              title: "Stay", 
              description: "Enjoy your trip with 24/7 support and a seamless check-in experience." 
            },
          ]}
          variant="cards"
        />

        <section className="py-20 px-6 bg-primary">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading text-4xl md:text-5xl text-primary-foreground mb-6">
              Become a Host
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8">
              Earn extra income and welcome guests to unforgettable stays.
            </p>
            <Link 
              href="/signup" 
              className="inline-flex rounded-full bg-background text-foreground px-8 py-3 font-medium hover:bg-background/90 transition-colors"
            >
              Start Hosting
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
