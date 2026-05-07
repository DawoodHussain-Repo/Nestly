'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  properties: number;
}

// Mock destinations data - can be replaced with real API
const mockDestinations: Destination[] = [
  { id: '1', name: 'Maldives', country: 'Maldives', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400', properties: 1250 },
  { id: '2', name: 'Bali', country: 'Indonesia', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400', properties: 3420 },
  { id: '3', name: 'Santorini', country: 'Greece', image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=400', properties: 890 },
  { id: '4', name: 'Dubai', country: 'UAE', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400', properties: 2100 },
  { id: '5', name: 'Paris', country: 'France', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400', properties: 4500 },
  { id: '6', name: 'Tokyo', country: 'Japan', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400', properties: 3200 },
  { id: '7', name: 'New York', country: 'USA', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400', properties: 5600 },
  { id: '8', name: 'London', country: 'UK', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400', properties: 4200 },
];

interface DestinationSearchProps {
  onSelect?: (destination: Destination) => void;
}

export function DestinationSearch({ onSelect }: DestinationSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Destination[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query.length > 0) {
      // Simulate API search with debounce
      const timer = setTimeout(() => {
        const filtered = mockDestinations.filter(dest =>
          dest.name.toLowerCase().includes(query.toLowerCase()) ||
          dest.country.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
        setIsOpen(true);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      gsap.fromTo(
        dropdownRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [isOpen]);

  const handleSelect = (destination: Destination) => {
    setQuery(destination.name);
    setIsOpen(false);
    onSelect?.(destination);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleSelect(results[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[var(--color-secondary)]">
          location_on
        </span>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query && setIsOpen(true)}
          placeholder="Search destinations..."
          className="w-full pl-12 pr-4 py-3 bg-[var(--color-surface-container)] rounded-full border border-transparent focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 text-[var(--color-on-surface)] placeholder:text-[var(--color-secondary)] transition-all outline-none"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
              inputRef.current?.focus();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-secondary)] hover:text-[var(--color-on-surface)] transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 bg-[var(--color-surface-container-lowest)] rounded-2xl border border-[var(--color-surface-variant)] shadow-lg overflow-hidden z-50 max-h-96 overflow-y-auto"
        >
          {results.map((destination, index) => (
            <button
              key={destination.id}
              onClick={() => handleSelect(destination)}
              onMouseEnter={() => setSelectedIndex(index)}
              className={cn(
                'w-full flex items-center gap-4 p-4 transition-colors text-left',
                selectedIndex === index
                  ? 'bg-[var(--color-surface-container)]'
                  : 'hover:bg-[var(--color-surface-container)]'
              )}
            >
              <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-[var(--color-surface-dim)]">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-[var(--color-on-surface)] truncate">
                  {destination.name}
                </h4>
                <p className="text-sm text-[var(--color-secondary)]">
                  {destination.country}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-medium text-[var(--color-primary)]">
                  {destination.properties}
                </p>
                <p className="text-xs text-[var(--color-secondary)]">
                  properties
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

      {isOpen && results.length === 0 && query && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 bg-[var(--color-surface-container-lowest)] rounded-2xl border border-[var(--color-surface-variant)] shadow-lg p-8 text-center z-50"
        >
          <span className="material-symbols-outlined text-4xl text-[var(--color-secondary)] mb-2">
            travel_explore
          </span>
          <p className="text-[var(--color-secondary)]">
            No destinations found for &quot;{query}&quot;
          </p>
        </div>
      )}
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
