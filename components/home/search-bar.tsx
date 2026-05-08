"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Calendar as CalendarIcon,
  MapPin,
  Search,
  Minus,
  Plus,
  Users,
} from "lucide-react";
import { DatePicker } from "./date-picker";

const popularDestinations = [
  { name: "New York, NY", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=100&h=100&fit=crop" },
  { name: "Los Angeles, CA", image: "https://images.unsplash.com/photo-1534190239940-9ba8944ea261?w=100&h=100&fit=crop" },
  { name: "Miami, FL", image: "https://images.unsplash.com/photo-1506966953602-c20cc11f75e3?w=100&h=100&fit=crop" },
  { name: "San Francisco, CA", image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=100&h=100&fit=crop" },
  { name: "Chicago, IL", image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=100&h=100&fit=crop" },
  { name: "Seattle, WA", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=100&h=100&fit=crop" },
  { name: "Austin, TX", image: "https://images.unsplash.com/photo-1531218150217-54595bc2b934?w=100&h=100&fit=crop" },
  { name: "Boston, MA", image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=100&h=100&fit=crop" },
  { name: "Denver, CO", image: "https://images.unsplash.com/photo-1619856699906-09e1f58c98b1?w=100&h=100&fit=crop" },
  { name: "Portland, OR", image: "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?w=100&h=100&fit=crop" },
];

interface SearchBarProps {
  /** Where to display. Both variants render identically — only max-width/margin differ. */
  variant?: 'hero' | 'compact';
}

export function SearchBar({ variant = 'hero' }: SearchBarProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showGuestsDropdown, setShowGuestsDropdown] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState(1);
  
  const locationRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const guestsRef = useRef<HTMLDivElement>(null);

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

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set('search', searchQuery);
    if (selectedDate) params.set('date', selectedDate.toISOString());
    if (guests > 1) params.set('guests', guests.toString());
    router.push(`/listings${params.toString() ? `?${params.toString()}` : ''}`);
  };

  const formatDate = (date: Date) =>
    date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  const isHero = variant === 'hero';

  return (
    <div className={`w-full ${isHero ? 'max-w-5xl mt-10' : 'max-w-full'} bg-background rounded-3xl shadow-2xl border border-border/50 flex flex-col md:flex-row items-stretch p-3 relative overflow-visible backdrop-blur-sm`}>
      {/* ── Location ── */}
      <div className="flex-1 relative overflow-visible" ref={locationRef}>
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
            <div className="space-y-2 max-h-80 overflow-y-auto scroll-styled">
              <p className="text-xs font-semibold text-muted-foreground px-3 mb-3 uppercase tracking-wide">
                {searchQuery ? 'Matching destinations' : 'Popular destinations'}
              </p>
              {popularDestinations
                .filter((dest) =>
                  !searchQuery || dest.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((destination) => (
                  <button
                    key={destination.name}
                    onClick={() => {
                      setSearchQuery(destination.name);
                      setShowLocationDropdown(false);
                    }}
                    className="w-full text-left px-4 py-4 hover:bg-secondary/70 rounded-2xl transition-all flex items-center gap-4 group"
                  >
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-muted">
                      <Image
                        src={destination.image}
                        alt={destination.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <span className="text-base font-medium">{destination.name}</span>
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>

      <div className="hidden md:block w-px h-12 bg-border self-center" />

      {/* ── Dates ── */}
      <div className="flex-1 relative overflow-visible" ref={dateRef}>
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

        {showDateDropdown && (
          <div className="absolute top-full left-0 mt-3 w-96 bg-background border border-border rounded-3xl shadow-2xl z-[100]">
            <DatePicker
              onSelectDate={(date) => {
                setSelectedDate(date);
                setShowDateDropdown(false);
              }}
            />
          </div>
        )}
      </div>

      <div className="hidden md:block w-px h-12 bg-border self-center" />

      {/* ── Guests ── */}
      <div className="flex-1 relative overflow-visible" ref={guestsRef}>
        <button
          onClick={() => {
            setShowGuestsDropdown(!showGuestsDropdown);
            setShowLocationDropdown(false);
            setShowDateDropdown(false);
          }}
          className="flex items-center px-8 py-5 w-full gap-4 hover:bg-secondary/50 rounded-2xl transition-all text-left group"
        >
          <Users className="h-6 w-6 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">Guests</span>
            <span className="text-sm text-muted-foreground">
              {guests} {guests === 1 ? "guest" : "guests"}
            </span>
          </div>
        </button>

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

      {/* ── Search Button ── */}
      <button
        onClick={handleSearch}
        className="bg-primary text-primary-foreground w-14 h-14 rounded-2xl flex items-center justify-center hover:bg-primary/90 hover:scale-105 transition-all shadow-lg ml-2 self-center group"
      >
        <Search className="h-6 w-6 group-hover:scale-110 transition-transform" />
      </button>
    </div>
  );
}
