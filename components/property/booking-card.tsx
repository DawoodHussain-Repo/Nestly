"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Star, Shield, Calendar, Users, ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface BookingCardProps {
  propertyId: string;
  price: number;
  rating: number;
  reviews: number;
  maxGuests: number;
}

interface CustomDatePickerProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  minDate?: Date;
  label: string;
}

function CustomDatePicker({ selectedDate, onSelectDate, minDate, label }: CustomDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(selectedDate || new Date());
  const dropdownRef = useRef<HTMLDivElement>(null);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const formatDate = (date: Date | null) => {
    if (!date) return "Select date";
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const isDateDisabled = (date: Date) => {
    if (date < today) return true;
    if (minDate && date < minDate) return true;
    return false;
  };

  const isDateSelected = (date: Date) => {
    if (!selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full px-4 py-3 rounded-xl border border-border bg-background",
          "hover:border-primary/50 transition-all duration-200",
          "flex items-center justify-between gap-2 text-left",
          isOpen && "border-primary ring-2 ring-primary/20"
        )}
      >
        <span className={cn(
          "text-sm font-medium",
          selectedDate ? "text-foreground" : "text-muted-foreground"
        )}>
          {formatDate(selectedDate)}
        </span>
        <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-background border border-border rounded-2xl shadow-2xl z-50 p-4 w-80">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={prevMonth}
              className="p-2 hover:bg-secondary rounded-full transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="font-semibold text-sm">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </span>
            <button
              type="button"
              onClick={nextMonth}
              className="p-2 hover:bg-secondary rounded-full transition-colors"
              aria-label="Next month"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
              <div key={day} className="text-center text-xs font-semibold text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
              const isDisabled = isDateDisabled(date);
              const isSelected = isDateSelected(date);
              const isToday = date.toDateString() === today.toDateString();

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => {
                    if (!isDisabled) {
                      onSelectDate(date);
                      setIsOpen(false);
                    }
                  }}
                  disabled={isDisabled}
                  className={cn(
                    "h-9 w-9 text-sm rounded-lg transition-all duration-200 font-medium",
                    "flex items-center justify-center",
                    isDisabled && "text-muted-foreground/30 cursor-not-allowed",
                    !isDisabled && !isSelected && "hover:bg-secondary hover:scale-105",
                    isSelected && "bg-primary text-primary-foreground shadow-md scale-105",
                    isToday && !isSelected && "border border-primary/50",
                  )}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

interface GuestPickerProps {
  guests: number;
  maxGuests: number;
  onGuestsChange: (guests: number) => void;
}

function GuestPicker({ guests, maxGuests, onGuestsChange }: GuestPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
        Guests
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full px-4 py-3 rounded-xl border border-border bg-background",
          "hover:border-primary/50 transition-all duration-200",
          "flex items-center justify-between gap-2 text-left",
          isOpen && "border-primary ring-2 ring-primary/20"
        )}
      >
        <span className="text-sm font-medium text-foreground">
          {guests} {guests === 1 ? 'guest' : 'guests'}
        </span>
        <Users className="h-4 w-4 text-muted-foreground flex-shrink-0" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-background border border-border rounded-2xl shadow-2xl z-50 p-6 w-full min-w-[280px]">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-sm mb-0.5">Guests</p>
              <p className="text-xs text-muted-foreground">Maximum {maxGuests} guests</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => onGuestsChange(Math.max(1, guests - 1))}
                disabled={guests <= 1}
                className={cn(
                  "w-9 h-9 rounded-full border-2 border-border",
                  "flex items-center justify-center transition-all duration-200",
                  guests > 1
                    ? "hover:border-primary hover:bg-primary/5 hover:scale-110"
                    : "opacity-30 cursor-not-allowed"
                )}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center font-bold text-lg tabular-nums">{guests}</span>
              <button
                type="button"
                onClick={() => onGuestsChange(Math.min(maxGuests, guests + 1))}
                disabled={guests >= maxGuests}
                className={cn(
                  "w-9 h-9 rounded-full border-2 border-border",
                  "flex items-center justify-center transition-all duration-200",
                  guests < maxGuests
                    ? "hover:border-primary hover:bg-primary/5 hover:scale-110"
                    : "opacity-30 cursor-not-allowed"
                )}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function BookingCard({ propertyId, price, rating, reviews, maxGuests }: BookingCardProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [bookingLoading, setBookingLoading] = useState(false);
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState(1);

  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const nights = calculateNights();
  const totalPrice = price * nights;
  const serviceFee = Math.round(totalPrice * 0.1);
  const grandTotal = totalPrice + serviceFee;

  const handleReserve = async () => {
    if (!user) {
      toast.error("Please sign in to make a reservation");
      router.push("/signin");
      return;
    }

    if (!checkInDate || !checkOutDate) {
      toast.error("Please select check-in and check-out dates");
      return;
    }

    if (nights < 1) {
      toast.error("Please select valid dates");
      return;
    }

    setBookingLoading(true);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          propertyId,
          checkIn: checkInDate.toISOString(),
          checkOut: checkOutDate.toISOString(),
          guests,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Failed to create booking");
        return;
      }

      toast.success(`Booking confirmed! Reference: ${data.booking.bookingReference}`);

      setTimeout(() => {
        toast.success(
          `Payment completed! Total: $${data.booking.grandTotal}`,
          { duration: 5000 }
        );
      }, 1000);

      setCheckInDate(null);
      setCheckOutDate(null);
      setGuests(1);

      setTimeout(() => {
        router.push("/profile");
      }, 3000);
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="sticky top-32 border border-border/60 rounded-2xl p-6 shadow-sm bg-card">
      {/* Price & Rating */}
      <div className="mb-6">
        <div className="flex items-baseline gap-1.5 mb-2">
          <span className="text-2xl font-heading font-bold tracking-tight">${price}</span>
          <span className="text-sm text-muted-foreground">/ night</span>
        </div>
        <div className="flex items-center gap-1.5 text-sm">
          <Star size={13} className="fill-amber-400 text-amber-400" />
          <span className="font-semibold">{rating}</span>
          <span className="text-muted-foreground">·</span>
          <span className="text-muted-foreground">{reviews} reviews</span>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-3 mb-5">
        <CustomDatePicker
          label="Check-in"
          selectedDate={checkInDate}
          onSelectDate={setCheckInDate}
        />
        <CustomDatePicker
          label="Check-out"
          selectedDate={checkOutDate}
          onSelectDate={setCheckOutDate}
          minDate={checkInDate ? new Date(checkInDate.getTime() + 24 * 60 * 60 * 1000) : undefined}
        />
        <GuestPicker
          guests={guests}
          maxGuests={maxGuests}
          onGuestsChange={setGuests}
        />
      </div>

      <Button
        className="btn-base w-full py-3 px-4 rounded-xl font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
        onClick={handleReserve}
        disabled={bookingLoading || !checkInDate || !checkOutDate}
      >
        {bookingLoading ? "Processing..." : "Reserve Now"}
      </Button>

      <div className="flex items-center justify-center gap-1.5 mt-3">
        <Shield size={12} className="text-muted-foreground" />
        <p className="text-center text-xs text-muted-foreground">
          {user ? "You won't be charged yet" : "Sign in to make a reservation"}
        </p>
      </div>

      {nights > 0 && (
        <div className="mt-5 pt-5 border-t border-border/50 space-y-2.5">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">${price} × {nights} {nights === 1 ? 'night' : 'nights'}</span>
            <span className="font-medium">${totalPrice}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Service fee (10%)</span>
            <span className="font-medium">${serviceFee}</span>
          </div>
          <div className="flex justify-between font-bold pt-2.5 border-t border-border/50">
            <span>Total</span>
            <span>${grandTotal}</span>
          </div>
        </div>
      )}
    </div>
  );
}
