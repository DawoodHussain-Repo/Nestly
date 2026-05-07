"use client";

import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col antialiased">
      <Navbar activePage="home" />

      <main className="flex-grow pt-[72px]">
        {/* Hero Section */}
        <section className="bg-surface-container-low py-xxl px-lg relative overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-lg relative z-10">
            <span className="text-label-sm font-label-sm tracking-widest text-secondary uppercase">
              OVER 50,000 STAYS WORLDWIDE
            </span>
            <h1 className="text-display-lg font-display-lg max-w-4xl text-on-surface">
              Find a place that feels like{" "}
              <span className="italic text-primary">home.</span>
            </h1>
            <p className="text-body-lg font-body-lg text-secondary max-w-2xl">
              Unique spaces across Pakistan and beyond — no booking fees, ever.
            </p>

            {/* Search Bar Pill */}
            <div className="mt-xl w-full max-w-4xl bg-surface-container-lowest rounded-full shadow-lg border border-surface-variant flex flex-col md:flex-row items-center p-sm divide-y md:divide-y-0 md:divide-x divide-surface-variant">
              <div className="flex-1 flex items-center px-lg py-md w-full">
                <span className="material-symbols-outlined text-secondary mr-sm">
                  location_on
                </span>
                <div className="flex flex-col text-left">
                  <span className="text-label-sm font-label-sm text-on-surface">
                    Where
                  </span>
                  <input
                    className="bg-transparent border-none p-0 focus:ring-0 text-body-md text-on-surface placeholder-secondary w-full"
                    placeholder="Search destinations"
                    type="text"
                  />
                </div>
              </div>
              <div className="flex-1 flex items-center px-lg py-md w-full">
                <span className="material-symbols-outlined text-secondary mr-sm">
                  calendar_today
                </span>
                <div className="flex flex-col text-left">
                  <span className="text-label-sm font-label-sm text-on-surface">
                    Dates
                  </span>
                  <span className="text-body-md font-body-md text-secondary">
                    Add dates
                  </span>
                </div>
              </div>
              <div className="flex-1 flex items-center justify-between px-lg py-md w-full">
                <div className="flex items-center">
                  <span className="material-symbols-outlined text-secondary mr-sm">
                    group
                  </span>
                  <div className="flex flex-col text-left">
                    <span className="text-label-sm font-label-sm text-on-surface">
                      Guests
                    </span>
                    <span className="text-body-md font-body-md text-secondary">
                      Add guests
                    </span>
                  </div>
                </div>
                <button className="bg-primary text-on-primary w-12 h-12 rounded-full flex items-center justify-center hover:bg-surface-tint transition-colors shadow-md ml-sm">
                  <span className="material-symbols-outlined">search</span>
                </button>
              </div>
            </div>
          </div>

          <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-primary-fixed/20 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 bg-surface-variant rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        </section>

        {/* Category Filter Bar */}
        <div className="sticky top-[72px] z-40 bg-surface/95 backdrop-blur-md border-b border-surface-container pt-md pb-sm px-lg">
          <div className="max-w-7xl mx-auto flex gap-lg overflow-x-auto no-scrollbar items-center pb-sm">
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
                className={`flex flex-col items-center gap-xs min-w-[64px] pb-sm transition-all border-b-2 ${
                  cat.active
                    ? "opacity-100 border-primary text-primary"
                    : "opacity-70 border-transparent text-secondary hover:opacity-100 hover:border-secondary-fixed"
                }`}
              >
                <span className="material-symbols-outlined text-[28px]">
                  {cat.icon}
                </span>
                <span className="text-label-sm font-label-sm">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Listings Section */}
        <section className="py-xxl px-lg max-w-7xl mx-auto">
          <h2 className="text-headline-lg font-headline-lg mb-xl text-on-surface">
            Popular destinations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
            {[
              {
                name: "The Glass House",
                location: "Malibu, California",
                price: 850,
                rating: 4.96,
                type: "Villa",
              },
              {
                name: "Pine Haven",
                location: "Aspen, Colorado",
                price: 210,
                rating: 4.85,
                type: "Cabin",
              },
              {
                name: "Urban Oasis Loft",
                location: "New York City, NY",
                price: 185,
                rating: 4.92,
                type: "Studio",
              },
              {
                name: "Seaside Retreat",
                location: "Santorini, Greece",
                price: 320,
                rating: 4.88,
                type: "Beach",
              },
            ].map((property) => (
              <div key={property.name} className="group cursor-pointer">
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
                <p className="text-label-lg font-label-lg text-primary">
                  ${property.price}{" "}
                  <span className="text-body-sm font-body-sm font-normal text-secondary">
                    / night
                  </span>
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-xxl px-lg bg-surface">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-xl">
              <h2 className="text-headline-lg font-headline-lg text-on-surface mb-sm">
                How Nestly Works
              </h2>
              <p className="text-body-lg font-body-lg text-secondary max-w-2xl mx-auto">
                Find, book, and stay in unique spaces around the world in three
                simple steps.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-xl">
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
                  className="text-center p-lg rounded-xl bg-surface-container-lowest border border-surface-variant"
                >
                  <span className="text-display-md font-display-md text-primary/20 block mb-sm">
                    {item.step}
                  </span>
                  <h3 className="text-headline-md font-headline-md text-on-surface mb-sm">
                    {item.title}
                  </h3>
                  <p className="text-body-md font-body-md text-secondary">
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
