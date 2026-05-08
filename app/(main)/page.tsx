"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { HeroSection } from "@/components/home/hero-section";
import { CategoryBar, categories } from "@/components/home/category-bar";
import { PropertyGrid } from "@/components/home/property-grid";
import { HowItWorksSection } from "@/components/how-it-works/section";
import { Property } from "@/types/property";
import { ArrowRight } from "lucide-react";
import { useProperties } from "@/hooks/use-api";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorState } from "@/components/ui/error-state";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { data: properties, loading, error, refetch } = useProperties();

  // Filter properties by category
  const filteredListings = (properties || []).filter((p) => {
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

  if (error) {
    return (
      <div className="bg-background text-foreground min-h-screen flex flex-col antialiased">
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
    <div className="bg-background text-foreground min-h-screen flex flex-col antialiased">
      {/* Spacer for fixed pill nav */}
      <div className="h-28" />

      <main className="flex-grow">
        <HeroSection />

        <CategoryBar 
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {loading ? (
          <LoadingSpinner message="Loading properties..." />
        ) : (
          <PropertyGrid
            properties={filteredListings}
            loading={false}
            title={getTitle()}
            subtitle="Discover unique stays handpicked for you"
            onClearFilters={handleClearFilters}
          />
        )}

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

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center bg-foreground rounded-3xl px-8 py-16 md:py-20 relative overflow-hidden">
            {/* Subtle decorative dots */}
            <div className="absolute top-6 left-6 w-2 h-2 bg-background/10 rounded-full" />
            <div className="absolute top-6 right-6 w-2 h-2 bg-background/10 rounded-full" />
            <div className="absolute bottom-6 left-6 w-2 h-2 bg-background/10 rounded-full" />
            <div className="absolute bottom-6 right-6 w-2 h-2 bg-background/10 rounded-full" />

            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-background/40 mb-4">For property owners</p>
            <h2 className="font-heading text-3xl md:text-4xl text-background font-bold mb-4">
              Become a Host
            </h2>
            <p className="text-base text-background/60 mb-8 max-w-md mx-auto">
              Earn extra income and welcome guests to unforgettable stays.
            </p>
            <Link 
              href="/signup" 
              className="inline-flex items-center gap-2 rounded-full bg-background text-foreground px-7 py-3 text-sm font-semibold hover:opacity-90 transition-opacity group"
            >
              Start Hosting
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
