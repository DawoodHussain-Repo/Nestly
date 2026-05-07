"use client";

import Link from "next/link";
import {
  Building2,
  Calendar,
  MapPin,
  Mountain,
  Palmtree,
  Search,
  Snowflake,
  Tent,
  TreePine,
  Waves,
} from "lucide-react";
import { HowItWorksSection } from "@/components/how-it-works/section";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PropertyCard } from "@/components/property-card";

const categories = [
  { name: "Beachfront", icon: Waves },
  { name: "Cabins", icon: Tent },
  { name: "City", icon: Building2 },
  { name: "Countryside", icon: TreePine },
  { name: "Mountains", icon: Mountain },
  { name: "Ski", icon: Snowflake },
  { name: "Tropical", icon: Palmtree },
];

const listings = [
  { id: "h-1", title: "Oceanfront Villa", location: "Malibu, California", price: 450, rating: 4.97, reviews: 58, bedrooms: 3, bathrooms: 2, guests: 6, image: "https://images.unsplash.com/photo-1512917774080-9b274b3c4a7f?w=500&h=400&fit=crop", type: "Villa" },
  { id: "h-2", title: "Urban Loft", location: "New York, NY", price: 275, rating: 4.89, reviews: 41, bedrooms: 1, bathrooms: 1, guests: 2, image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=400&fit=crop", type: "Studio" },
  { id: "h-3", title: "Cozy Mountain Cabin", location: "Aspen, Colorado", price: 320, rating: 4.95, reviews: 72, bedrooms: 2, bathrooms: 2, guests: 4, image: "https://images.unsplash.com/photo-1505873242700-f289a29e7e0a?w=500&h=400&fit=crop", type: "Cabin" },
  { id: "h-4", title: "Lake Retreat", location: "Lake Tahoe, California", price: 380, rating: 4.94, reviews: 36, bedrooms: 3, bathrooms: 2, guests: 5, image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=500&h=400&fit=crop", type: "Cabin" },
];

export default function Home() {
  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col antialiased">
      <Navbar activePage="home" />

      <main className="flex-grow pt-[72px]">
        <section className="relative py-20 px-6 overflow-hidden bg-secondary/40">
          <div className="w-full max-w-7xl mx-auto flex flex-col items-center text-center gap-8">
            <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
              OVER 50,000 STAYS WORLDWIDE
            </span>
            <h1 className="w-full text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-foreground leading-tight">
              Find a place that feels like{" "}
              <span className="italic text-primary">home.</span>
            </h1>
            <p className="w-full text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
              Unique spaces across Pakistan and beyond — no booking fees, ever.
            </p>

            <div className="mt-8 w-full max-w-4xl bg-background rounded-2xl md:rounded-full shadow-lg border border-border flex flex-col md:flex-row items-center p-2 divide-y md:divide-y-0 md:divide-x divide-border">
              <div className="flex-1 flex items-center px-6 py-4 w-full gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <div className="flex flex-col text-left">
                  <span className="text-xs font-medium text-foreground">Where</span>
                  <input
                    className="bg-transparent border-none p-0 focus:ring-0 text-base text-foreground placeholder:text-muted-foreground w-full outline-none"
                    placeholder="Search destinations"
                    type="text"
                  />
                </div>
              </div>
              <div className="flex-1 flex items-center px-6 py-4 w-full gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <div className="flex flex-col text-left">
                  <span className="text-xs font-medium text-foreground">Dates</span>
                  <span className="text-base text-muted-foreground">Add dates</span>
                </div>
              </div>
              <div className="flex-1 flex items-center justify-between px-6 py-4 w-full">
                <div className="flex items-center gap-3">
                  <Search className="h-5 w-5 text-primary" />
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-medium text-foreground">Guests</span>
                    <span className="text-base text-muted-foreground">Add guests</span>
                  </div>
                </div>
                <button className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors shadow-md ml-3">
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="sticky top-[72px] z-40 bg-background/95 backdrop-blur-md border-b border-border pt-4 pb-2 px-6">
          <div className="max-w-7xl mx-auto flex gap-8 overflow-x-auto scrollbar-hide items-center pb-2">
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              const active = idx === 0;
              return (
              <button
                key={cat.name}
                className={`flex flex-col items-center gap-1 min-w-[64px] pb-2 transition-all border-b-2 ${
                  active
                    ? "opacity-100 border-primary text-primary"
                    : "opacity-70 border-transparent text-muted-foreground hover:opacity-100 hover:border-muted-foreground"
                }`}
              >
                <Icon className="h-6 w-6" />
                <span className="text-xs font-medium">{cat.name}</span>
              </button>
            )})}
          </div>
        </div>

        <section className="py-16 px-6 max-w-7xl mx-auto">
          <h2 className="text-3xl font-heading font-semibold mb-12 text-foreground">
            Popular destinations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {listings.map((property) => (
              <PropertyCard key={property.id} property={property} variant="compact" />
            ))}
          </div>
        </section>

        <HowItWorksSection
          steps={[
            { id: "discover", title: "Discover", description: "Browse thousands of verified properties across every category imaginable." },
            { id: "book", title: "Book", description: "Reserve instantly with secure payments and flexible cancellation policies." },
            { id: "stay", title: "Stay", description: "Enjoy your trip with 24/7 support and a seamless check-in experience." },
          ]}
          variant="cards"
        />

        <section className="py-20 px-6 bg-primary">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading text-4xl md:text-5xl text-primary-foreground mb-6">Become a Host</h2>
            <p className="text-lg text-primary-foreground/90 mb-8">
              Earn extra income and welcome guests to unforgettable stays.
            </p>
            <Link href="/signup" className="inline-flex rounded-full bg-background text-foreground px-8 py-3 font-medium hover:bg-background/90 transition-colors">
              Start Hosting
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
