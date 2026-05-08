"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";

interface BookingCardProps {
  propertyId: string;
  price: number;
  rating: number;
  reviews: number;
  maxGuests: number;
}

export function BookingCard({ propertyId, price, rating, reviews, maxGuests }: BookingCardProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [bookingLoading, setBookingLoading] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
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

    if (!checkIn || !checkOut) {
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
          checkIn,
          checkOut,
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

      setCheckIn("");
      setCheckOut("");
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
    <div className="sticky top-32 border border-border rounded-2xl p-6 shadow-lg bg-card">
      <div className="mb-6">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-3xl font-heading font-bold">${price}</span>
          <span className="text-muted-foreground">/ night</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Star size={14} className="fill-primary text-primary" />
          <span className="font-semibold">{rating}</span>
          <span className="text-muted-foreground">({reviews} reviews)</span>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="text-sm font-medium mb-2 block">Check-in</label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Check-out</label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            min={checkIn || new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Guests</label>
          <select 
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full px-4 py-3 border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {Array.from({ length: maxGuests }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'guest' : 'guests'}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Button 
        className="w-full py-6 text-base rounded-xl" 
        onClick={handleReserve}
        disabled={bookingLoading || !checkIn || !checkOut}
      >
        {bookingLoading ? "Processing..." : "Reserve Now"}
      </Button>

      <p className="text-center text-sm text-muted-foreground mt-4">
        {user ? "You won't be charged yet" : "Sign in to make a reservation"}
      </p>

      {nights > 0 && (
        <div className="mt-6 pt-6 border-t border-border space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">${price} × {nights} {nights === 1 ? 'night' : 'nights'}</span>
            <span>${totalPrice}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Service fee (10%)</span>
            <span>${serviceFee}</span>
          </div>
          <div className="flex justify-between font-semibold pt-3 border-t border-border text-lg">
            <span>Total</span>
            <span>${grandTotal}</span>
          </div>
        </div>
      )}
    </div>
  );
}
