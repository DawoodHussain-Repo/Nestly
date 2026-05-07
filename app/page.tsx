"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Building2,
  Calendar as CalendarIcon,
  MapPin,
  Mountain,
  Palmtree,
  Search,
  Snowflake,
  Tent,
  TreePine,
  Waves,
  Minus,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { HowItWorksSection } from "@/components/how-it-works/section";
import { PropertyCard } from "@/components/property-card";
import { useDebounce } from "@/hooks/useDebounce";

interface Property {
  _id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  images?: string[];
  type: 'apartment' | 'house' | 'villa' | 'cabin';
  bedrooms: number;
  bathrooms: number;
  guests: number;
  description?: string;
  amenities?: string[];
}

const categories = [
  { id: "all", name: "All", icon: Building2, filter: null },
  { id: "beachfront", name: "Beachfront", icon: Waves, filter: "villa" },
  { id: "cabins", name: "Cabins", icon: Tent, filter: "cabin" },
  { id: "city", name: "City", icon: Building2, filter: "apartment" },
  { id: "countryside", name: "Countryside", icon: TreePine, filter: "house" },
  { id: "mountains", name: "Mountains", icon: Mountain, filter: "cabin" },
  { id: "ski", name: "Ski", icon: Snowflake, filter: "cabin" },
  { id: "tropical", name: "Tropical", icon: Palmtree, filter: "villa" },
];

const popularDestinations = [
  "New York, NY",
  "Los Angeles, CA",
  "Miami, FL",
  "San Francisco, CA",
  "Chicago, IL",
  "Seattle, WA",
  "Austin, TX",
  "Boston, MA",
  "Denver, CO",
  "Portland, OR",
];

// Simple calendar component
function Calendar({ onSelectDate }: { onSelectDate: (date: Date) => void }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = new Date();
  
  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();
  
  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="p-2 hover:bg-secondary rounded-full">
          <ChevronLeft size={16} />
        </button>
        <span className="font-medium">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </span>
        <button onClick={nextMonth} className="p-2 hover:bg-secondary rounded-full">
          <ChevronRight size={16} />
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div key={day} className="text-muted-foreground font-medium py-2">{day}</div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
          const isToday = date.toDateString() === today.toDateString();
          const isPast = date < today && !isToday;
          
          return (
            <button
              key={day}
              onClick={() => !isPast && onSelectDate(date)}
              disabled={isPast}
              className={`
                p-2 text-sm rounded-lg transition-colors
                ${isPast ? 'text-muted-foreground/30 cursor-not-allowed' : 'hover:bg-secondary'}
                ${isToday ? 'border border-primary' : ''}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showGuestsDropdown, setShowGuestsDropdown] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState(1);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const debouncedSearch = useDebounce(searchQuery, 300);
  
  const locationRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const guestsRef = useRef<HTMLDivElement>(null);

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

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setShowLocationDropdown(false);
      }
      if (dateRef.current && !dateRef.current.contains(event.target as Node)) {
        setShowDateDropdown(false);
      }
      if (guestsRef.current && !guestsRef.current.contains(event.target as Node)) {
        setShowGuestsDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredListings = properties.filter((p) => {
    const categoryFilter = categories.find(c => c.id === selectedCategory);
    const matchesCategory = !categoryFilter?.filter || p.type === categoryFilter.filter;
    const matchesSearch = !debouncedSearch || 
      p.location.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      p.title.toLowerCase().includes(debouncedSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `/listings?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col antialiased">
      {/* Spacer for fixed pill nav */}
      <div className="h-28" />

      <main className="flex-grow">
        <section className="relative py-32 px-6 overflow-hidden bg-gradient-to-br from-secondary/30 via-background to-secondary/20">
          {/* Decorative Elements */}
          <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/3 to-transparent rounded-full blur-3xl" />
          
          {/* Floating Cards */}
          <div className="absolute top-32 left-[10%] hidden lg:block">
            <div className="bg-background border border-border rounded-2xl p-4 shadow-lg transform rotate-[-8deg] hover:rotate-0 transition-transform duration-300">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🏠</span>
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-foreground">50,000+</p>
                  <p className="text-xs text-muted-foreground">Properties</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-32 right-[10%] hidden lg:block">
            <div className="bg-background border border-border rounded-2xl p-4 shadow-lg transform rotate-[8deg] hover:rotate-0 transition-transform duration-300">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">⭐</span>
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-foreground">4.9/5</p>
                  <p className="text-xs text-muted-foreground">Guest Rating</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full max-w-7xl mx-auto flex flex-col items-center text-center gap-10 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-background border border-primary/20 rounded-full shadow-sm">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-xs font-semibold tracking-wide text-foreground uppercase">
                Over 50,000 Stays Worldwide
              </span>
            </div>
            
            <h1 className="w-full max-w-5xl text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold text-foreground leading-[1.1] tracking-tight">
              Find a place that feels like{" "}
              <span className="relative inline-block">
                <span className="italic text-primary relative z-10">home.</span>
                <span className="absolute bottom-2 left-0 w-full h-4 bg-primary/10 -z-10" />
              </span>
            </h1>
            
            <p className="w-full max-w-2xl text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
              Unique spaces across Pakistan and beyond — no booking fees, ever.
            </p>

            {/* Airbnb-style Search Bar */}
            <div className="mt-12 w-full max-w-5xl bg-background rounded-3xl shadow-2xl border border-border/50 flex flex-col md:flex-row items-stretch p-3 relative backdrop-blur-sm">
              {/* Location */}
              <div className="flex-1 relative" ref={locationRef}>
                <button
                  onClick={() => {
                    setShowLocationDropdown(!showLocationDropdown);
                    setShowDateDropdown(false);
                    setShowGuestsDropdown(false);
                  }}
                  className="flex items-center px-8 py-5 w-full gap-4 hover:bg-secondary/50 rounded-2xl transition-all text-left group"
                >
                  <MapPin className="h-6 w-6 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-semibold text-foreground">Where</span>
                    <span className="text-sm text-muted-foreground truncate">
                      {searchQuery || "Search destinations"}
                    </span>
                  </div>
                </button>

                {/* Location Dropdown */}
                {showLocationDropdown && (
                  <div className="absolute top-full left-0 mt-3 w-96 bg-background border border-border rounded-3xl shadow-2xl z-[100] p-6">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search destinations..."
                      className="w-full px-5 py-4 border border-border rounded-2xl bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 mb-4 text-base"
                      autoFocus
                    />
                    <div className="space-y-2 max-h-80 overflow-y-auto">
                      <p className="text-xs font-semibold text-muted-foreground px-3 mb-3 uppercase tracking-wide">
                        {searchQuery ? 'Matching destinations' : 'Popular destinations'}
                      </p>
                      {popularDestinations
                        .filter((dest) =>
                          !searchQuery || dest.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((destination) => (
                          <button
                            key={destination}
                            onClick={() => {
                              setSearchQuery(destination);
                              setShowLocationDropdown(false);
                            }}
                            className="w-full text-left px-4 py-4 hover:bg-secondary/70 rounded-2xl transition-all flex items-center gap-4 group"
                          >
                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                              <MapPin className="h-5 w-5 text-primary" />
                            </div>
                            <span className="text-base font-medium">{destination}</span>
                          </button>
                        ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="hidden md:block w-px h-12 bg-border self-center" />

              {/* Dates */}
              <div className="flex-1 relative" ref={dateRef}>
                <button
                  onClick={() => {
                    setShowDateDropdown(!showDateDropdown);
                    setShowLocationDropdown(false);
                    setShowGuestsDropdown(false);
                  }}
                  className="flex items-center px-8 py-5 w-full gap-4 hover:bg-secondary/50 rounded-2xl transition-all text-left group"
                >
                  <CalendarIcon className="h-6 w-6 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-foreground">Dates</span>
                    <span className="text-sm text-muted-foreground">
                      {selectedDate ? formatDate(selectedDate) : "Add dates"}
                    </span>
                  </div>
                </button>

                {/* Date Dropdown */}
                {showDateDropdown && (
                  <div className="absolute top-full left-0 mt-3 w-96 bg-background border border-border rounded-3xl shadow-2xl z-[100]">
                    <Calendar
                      onSelectDate={(date) => {
                        setSelectedDate(date);
                        setShowDateDropdown(false);
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="hidden md:block w-px h-12 bg-border self-center" />

              {/* Guests */}
              <div className="flex-1 relative" ref={guestsRef}>
                <button
                  onClick={() => {
                    setShowGuestsDropdown(!showGuestsDropdown);
                    setShowLocationDropdown(false);
                    setShowDateDropdown(false);
                  }}
                  className="flex items-center px-8 py-5 w-full gap-4 hover:bg-secondary/50 rounded-2xl transition-all text-left group"
                >
                  <Search className="h-6 w-6 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-foreground">Guests</span>
                    <span className="text-sm text-muted-foreground">
                      {guests} {guests === 1 ? "guest" : "guests"}
                    </span>
                  </div>
                </button>

                {/* Guests Dropdown */}
                {showGuestsDropdown && (
                  <div className="absolute top-full right-0 mt-3 w-96 bg-background border border-border rounded-3xl shadow-2xl z-[100] p-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-foreground text-lg">Guests</p>
                        <p className="text-sm text-muted-foreground mt-1">How many people?</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => setGuests(Math.max(1, guests - 1))}
                          disabled={guests <= 1}
                          className="w-10 h-10 rounded-full border-2 border-border flex items-center justify-center hover:border-primary hover:bg-primary/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                          <Minus className="h-5 w-5" />
                        </button>
                        <span className="w-12 text-center font-semibold text-xl">{guests}</span>
                        <button
                          onClick={() => setGuests(Math.min(16, guests + 1))}
                          disabled={guests >= 16}
                          className="w-10 h-10 rounded-full border-2 border-border flex items-center justify-center hover:border-primary hover:bg-primary/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                          <Plus className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="bg-primary text-primary-foreground w-14 h-14 rounded-2xl flex items-center justify-center hover:bg-primary/90 hover:scale-105 transition-all shadow-lg ml-2 self-center group"
              >
                <Search className="h-6 w-6 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </section>

        {/* Category Bar */}
        <div className="bg-background border-b border-border">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex gap-8 overflow-x-auto scrollbar-hide items-center">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const active = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex flex-col items-center gap-3 min-w-[80px] transition-all ${
                      active
                        ? "opacity-100 text-primary scale-105"
                        : "opacity-70 text-muted-foreground hover:opacity-100 hover:scale-105"
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                      active ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-secondary/70 hover:bg-secondary'
                    }`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <span className="text-xs font-semibold whitespace-nowrap">{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-16">
            <div>
              <h2 className="text-4xl font-heading font-bold text-foreground mb-3">
                {selectedCategory !== "all" 
                  ? `${categories.find(c => c.id === selectedCategory)?.name} Properties` 
                  : debouncedSearch 
                    ? `Results for "${debouncedSearch}"` 
                    : 'Popular destinations'}
              </h2>
              <p className="text-lg text-muted-foreground">
                Discover unique stays handpicked for you
              </p>
            </div>
          </div>
          {filteredListings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {filteredListings.slice(0, 8).map((property) => (
                <PropertyCard key={property._id} property={{ ...property, id: property._id }} variant="compact" />
              ))}
            </div>
          ) : loading ? (
            <div className="text-center py-24">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">Loading properties...</p>
            </div>
          ) : (
            <div className="text-center py-24 bg-secondary/30 rounded-3xl">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-10 w-10 text-primary" />
              </div>
              <p className="text-xl font-semibold text-foreground mb-2">No properties found</p>
              <p className="text-muted-foreground mb-6">Try adjusting your search or filters</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
              >
                Clear all filters
              </button>
            </div>
          )}
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
    </div>
  );
}
