"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";
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
    <div className={cn(
      "w-full bg-background rounded-[2rem] shadow-2xl border border-border/50 flex flex-col md:flex-row items-stretch p-2 relative z-50 overflow-visible backdrop-blur-sm",
      isHero ? "max-w-5xl mt-10" : "max-w-full"
    )}>
      {/* ── Location ── */}
      <div className="flex-[1.2] relative overflow-visible z-[60]" ref={locationRef}>
        <button
          onClick={() => {
            setShowLocationDropdown(!showLocationDropdown);
            setShowDateDropdown(false);
            setShowGuestsDropdown(false);
          }}
          className="flex items-center px-6 py-4 w-full gap-4 hover:bg-secondary/50 rounded-[1.5rem] transition-all text-left group"
        >
          <MapPin className="h-6 w-6 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-foreground uppercase tracking-wider opacity-strong mb-0.5">Where</span>
            <span className="text-sm font-medium text-foreground truncate">
              {searchQuery || "Search destinations"}
            </span>
          </div>
        </button>

        {showLocationDropdown && (
          <div className="dropdown-base top-full left-0 mt-3 w-96 p-6 z-[70]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search destinations..."
              className="input-base mb-4"
              autoFocus
            />
            <div className="space-y-2 max-h-80 overflow-y-auto scroll-styled">
              <p className="text-[10px] font-bold text-muted-foreground px-3 mb-3 uppercase tracking-widest">
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
                    className="w-full text-left px-4 py-3 hover:bg-secondary/70 rounded-xl transition-all flex items-center gap-4 group"
                  >
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-muted shadow-sm">
                      <Image
                        src={destination.image}
                        alt={destination.name}
                        fill
                        className="object-cover transition-transform group-hover:scale-110"
                        unoptimized
                      />
                    </div>
                    <span className="text-sm font-semibold text-foreground/80 group-hover:text-foreground">{destination.name}</span>
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>

      <div className="hidden md:block w-px h-10 bg-border/60 self-center opacity-medium" />

      {/* ── Dates ── */}
      <div className="flex-1 relative overflow-visible z-[60]" ref={dateRef}>
        <button
          onClick={() => {
            setShowDateDropdown(!showDateDropdown);
            setShowLocationDropdown(false);
            setShowGuestsDropdown(false);
          }}
          className="flex items-center px-6 py-4 w-full gap-4 hover:bg-secondary/50 rounded-[1.5rem] transition-all text-left group"
        >
          <CalendarIcon className="h-6 w-6 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
          <div className="flex flex-col">
            <span className="text-xs font-bold text-foreground uppercase tracking-wider opacity-strong mb-0.5">Dates</span>
            <span className="text-sm font-medium text-foreground">
              {selectedDate ? formatDate(selectedDate) : "Add dates"}
            </span>
          </div>
        </button>

        {showDateDropdown && (
          <div className="dropdown-base top-full left-0 mt-3 w-96 overflow-hidden z-[70]">
            <DatePicker
              onSelectDate={(date) => {
                setSelectedDate(date);
                setShowDateDropdown(false);
              }}
            />
          </div>
        )}
      </div>

      <div className="hidden md:block w-px h-10 bg-border/60 self-center opacity-medium" />

      {/* ── Guests ── */}
      <div className="flex-1 relative overflow-visible z-[60]" ref={guestsRef}>
        <button
          onClick={() => {
            setShowGuestsDropdown(!showGuestsDropdown);
            setShowLocationDropdown(false);
            setShowDateDropdown(false);
          }}
          className="flex items-center px-6 py-4 w-full gap-4 hover:bg-secondary/50 rounded-[1.5rem] transition-all text-left group"
        >
          <Users className="h-6 w-6 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
          <div className="flex flex-col">
            <span className="text-xs font-bold text-foreground uppercase tracking-wider opacity-strong mb-0.5">Guests</span>
            <span className="text-sm font-medium text-foreground">
              {guests} {guests === 1 ? "guest" : "guests"}
            </span>
          </div>
        </button>

        {showGuestsDropdown && (
          <div className="dropdown-base top-full right-0 mt-3 w-80 p-8 z-[70]">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-foreground text-base">Guests</p>
                <p className="text-xs text-muted-foreground mt-0.5">Number of travelers</p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  disabled={guests <= 1}
                  className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:border-primary hover:bg-primary/5 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center font-bold text-lg">{guests}</span>
                <button
                  onClick={() => setGuests(Math.min(16, guests + 1))}
                  disabled={guests >= 16}
                  className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:border-primary hover:bg-primary/5 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Search Button ── */}
      <div className="p-1.5 flex items-center">
        <button
          onClick={handleSearch}
          className="bg-primary text-primary-foreground h-full min-h-[3.5rem] px-8 rounded-[1.25rem] flex items-center justify-center gap-2 hover:bg-primary/90 hover:shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95 group"
        >
          <Search className="h-5 w-5 group-hover:scale-110 transition-transform" />
          <span className="font-bold text-sm tracking-wide">Search</span>
        </button>
      </div>
    </div>
  );
}
