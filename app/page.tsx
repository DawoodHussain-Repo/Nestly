"use client";

import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import FlowingMenu from "@/components/FlowingMenu";

const destinations = [
  { link: '/listings?location=maldives', text: 'Maldives', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&h=400&fit=crop' },
  { link: '/listings?location=bali', text: 'Bali', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=400&fit=crop' },
  { link: '/listings?location=santorini', text: 'Santorini', image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=600&h=400&fit=crop' },
  { link: '/listings?location=dubai', text: 'Dubai', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop' },
];

export default function Home() {
  return (
    <div className="bg-[var(--color-background)] text-[var(--color-on-background)] min-h-screen flex flex-col antialiased">
      <Navbar activePage="home" />

      <main className="flex-grow pt-[72px]">
        {/* Hero Section */}
        <section className="bg-[var(--color-surface-container-low)] py-20 px-6 relative overflow-hidden">
          <div className="w-full max-w-7xl mx-auto flex flex-col items-center text-center gap-8 relative z-10">
            <span className="text-xs font-medium tracking-widest text-[var(--color-secondary)] uppercase">
              OVER 50,000 STAYS WORLDWIDE
            </span>
            <h1 className="w-full text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[var(--color-on-surface)] leading-tight">
              Find a place that feels like{" "}
              <span className="italic text-[var(--color-primary)]">home.</span>
            </h1>
            <p className="w-full text-base sm:text-lg md:text-xl text-[var(--color-secondary)] leading-relaxed">
              Unique spaces across Pakistan and beyond — no booking fees, ever.
            </p>

            {/* Search Bar Pill */}
            <div className="mt-8 w-full max-w-4xl bg-[var(--color-surface-container-lowest)] rounded-full shadow-lg border border-[var(--color-surface-variant)] flex flex-col md:flex-row items-center p-2 divide-y md:divide-y-0 md:divide-x divide-[var(--color-surface-variant)]">
              <div className="flex-1 flex items-center px-6 py-4 w-full">
                <span className="material-symbols-outlined text-[var(--color-secondary)] mr-3">
                  location_on
                </span>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-medium text-[var(--color-on-surface)]">
                    Where
                  </span>
                  <input
                    className="bg-transparent border-none p-0 focus:ring-0 text-base text-[var(--color-on-surface)] placeholder:text-[var(--color-secondary)] w-full outline-none"
                    placeholder="Search destinations"
                    type="text"
                  />
                </div>
              </div>
              <div className="flex-1 flex items-center px-6 py-4 w-full">
                <span className="material-symbols-outlined text-[var(--color-secondary)] mr-3">
                  calendar_today
                </span>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-medium text-[var(--color-on-surface)]">
                    Dates
                  </span>
                  <span className="text-base text-[var(--color-secondary)]">
                    Add dates
                  </span>
                </div>
              </div>
              <div className="flex-1 flex items-center justify-between px-6 py-4 w-full">
                <div className="flex items-center">
                  <span className="material-symbols-outlined text-[var(--color-secondary)] mr-3">
                    group
                  </span>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-medium text-[var(--color-on-surface)]">
                      Guests
                    </span>
                    <span className="text-base text-[var(--color-secondary)]">
                      Add guests
                    </span>
                  </div>
                </div>
                <button className="bg-[var(--color-primary)] text-[var(--color-on-primary)] w-12 h-12 rounded-full flex items-center justify-center hover:bg-[var(--color-surface-tint)] transition-colors shadow-md ml-3">
                  <span className="material-symbols-outlined">search</span>
                </button>
              </div>
            </div>
          </div>

          <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-[var(--color-primary)]/10 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 bg-[var(--color-surface-variant)] rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        </section>

        {/* Flowing Menu Section - Destinations */}
        <section className="h-[600px] relative">
          <FlowingMenu 
            items={destinations}
            speed={12}
            textColor="#ffffff"
            bgColor="#1b1c1c"
            marqueeBgColor="#b31c33"
            marqueeTextColor="#ffffff"
            borderColor="#5f5e5e"
          />
        </section>

        {/* Category Filter Bar */}
        <div className="sticky top-[72px] z-40 bg-[var(--color-surface)]/95 backdrop-blur-md border-b border-[var(--color-surface-container)] pt-4 pb-2 px-6">
          <div className="max-w-7xl mx-auto flex gap-8 overflow-x-auto no-scrollbar items-center pb-2">
            {[
              { name: "Beach", icon: "beach_access", active: true },
              { name: "City", icon: "location_city", active: false },
              { name: "Mountains", icon: "landscape", active: false },
              { name: "Villa", icon: "villa", active: false },
              { name: "Cabin", icon: "cabin", active: false },
              { name: "Studio", icon: "apartment", active: false },
              { name: "Penthouse", icon: "domain", active: false },
              { name: "Farm", icon: "agriculture", active: false },
            ].map((cat) => (
              <button
                key={cat.name}
                className={`flex flex-col items-center gap-1 min-w-[64px] pb-2 transition-all border-b-2 ${
                  cat.active
                    ? "opacity-100 border-[var(--color-primary)] text-[var(--color-primary)]"
                    : "opacity-70 border-transparent text-[var(--color-secondary)] hover:opacity-100 hover:border-[var(--color-secondary)]"
                }`}
              >
                <span className="material-symbols-outlined text-[28px]">
                  {cat.icon}
                </span>
                <span className="text-xs font-medium">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Listings Section - Improved Spacing */}
        <section className="py-16 px-6 max-w-7xl mx-auto">
          <h2 className="text-3xl font-serif font-semibold mb-12 text-[var(--color-on-surface)]">
            Popular destinations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "The Glass House",
                location: "Malibu, California",
                price: 850,
                rating: 4.96,
                type: "Villa",
                beds: 3,
                baths: 2,
                guests: 6,
              },
              {
                name: "Pine Haven",
                location: "Aspen, Colorado",
                price: 210,
                rating: 4.85,
                type: "Cabin",
                beds: 2,
                baths: 1,
                guests: 4,
              },
              {
                name: "Urban Oasis Loft",
                location: "New York City, NY",
                price: 185,
                rating: 4.92,
                type: "Studio",
                beds: 1,
                baths: 1,
                guests: 2,
              },
              {
                name: "Seaside Retreat",
                location: "Santorini, Greece",
                price: 320,
                rating: 4.88,
                type: "Beach",
                beds: 2,
                baths: 2,
                guests: 4,
              },
            ].map((property) => (
              <div key={property.name} className="group cursor-pointer">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[var(--color-surface-container-high)] mb-4 border border-[var(--color-surface-variant)] shadow-sm transition-all duration-300 group-hover:shadow-lg">
                  <div className="w-full h-full bg-gradient-to-br from-[var(--color-surface-container)] to-[var(--color-surface-dim)] flex items-center justify-center">
                    <span className="text-[var(--color-surface-variant)] text-sm">
                      Property Image
                    </span>
                  </div>
                  <button className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-[var(--color-surface-container-lowest)]/90 backdrop-blur-sm text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors">
                    <span
                      className="material-symbols-outlined text-xl"
                      style={{ fontVariationSettings: "'FILL' 0" }}
                    >
                      favorite
                    </span>
                  </button>
                  <div className="absolute top-3 left-3 bg-[var(--color-surface-container-lowest)]/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <span className="text-xs font-medium text-[var(--color-on-surface)]">
                      {property.type}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-serif font-semibold text-[var(--color-on-surface)] truncate pr-2">
                      {property.name}
                    </h3>
                    <div className="flex items-center gap-1 shrink-0">
                      <span className="material-symbols-outlined text-base text-[var(--color-primary)]">
                        star
                      </span>
                      <span className="text-sm font-semibold text-[var(--color-on-surface)]">
                        {property.rating}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-[var(--color-secondary)] flex items-center">
                    <span className="material-symbols-outlined text-base mr-1">
                      location_on
                    </span>
                    {property.location}
                  </p>
                  
                  {/* Pill-shaped badges for amenities */}
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--color-surface-container)] text-[var(--color-on-surface)] rounded-full text-xs font-medium">
                      <span className="material-symbols-outlined text-sm">bed</span>
                      {property.beds} {property.beds === 1 ? 'bed' : 'beds'}
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--color-surface-container)] text-[var(--color-on-surface)] rounded-full text-xs font-medium">
                      <span className="material-symbols-outlined text-sm">bathtub</span>
                      {property.baths} {property.baths === 1 ? 'bath' : 'baths'}
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--color-surface-container)] text-[var(--color-on-surface)] rounded-full text-xs font-medium">
                      <span className="material-symbols-outlined text-sm">group</span>
                      {property.guests} guests
                    </span>
                  </div>
                  
                  <p className="text-base font-semibold text-[var(--color-primary)] pt-1">
                    ${property.price}{" "}
                    <span className="text-sm font-normal text-[var(--color-secondary)]">
                      / night
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 px-6 bg-[var(--color-surface)]">
          <div className="w-full max-w-7xl mx-auto">
            <div className="text-center mb-16 w-full mx-auto">
              <h2 className="w-full text-3xl sm:text-4xl md:text-5xl font-serif font-semibold text-[var(--color-on-surface)] mb-4 leading-tight">
                How Nestly Works
              </h2>
              <p className="w-full text-base sm:text-lg md:text-xl text-[var(--color-secondary)] leading-relaxed">
                Find, book, and stay in unique spaces around the world in three
                simple steps.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                {
                  step: "01",
                  title: "Discover",
                  desc: "Browse thousands of verified properties across every category imaginable.",
                },
                {
                  step: "02",
                  title: "Book",
                  desc: "Reserve instantly with secure payments and flexible cancellation policies.",
                },
                {
                  step: "03",
                  title: "Stay",
                  desc: "Enjoy your trip with 24/7 support and a seamless check-in experience.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="text-center p-8 rounded-2xl bg-[var(--color-surface-container-lowest)] border border-[var(--color-surface-variant)] hover:shadow-md transition-shadow"
                >
                  <span className="text-6xl md:text-7xl font-serif font-bold text-[var(--color-primary)]/20 block mb-4">
                    {item.step}
                  </span>
                  <h3 className="text-xl md:text-2xl font-serif font-semibold text-[var(--color-on-surface)] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-base md:text-lg text-[var(--color-secondary)] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
