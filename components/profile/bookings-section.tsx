import { Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingCard } from "./booking-card";

interface Booking {
  _id: string;
  bookingReference: string;
  propertyId: {
    title: string;
    location: string;
    image: string;
    price: number;
  };
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
  grandTotal: number;
  status: string;
  paymentStatus: string;
}

interface BookingsSectionProps {
  bookings: Booking[];
  loading: boolean;
  onBrowseListings: () => void;
}

export function BookingsSection({ bookings, loading, onBrowseListings }: BookingsSectionProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-heading font-bold mb-1">My Bookings</h2>
          <p className="text-muted-foreground">View and manage your reservations</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
          <Receipt className="h-5 w-5 text-primary" />
          <span className="font-semibold text-primary">
            {bookings.length} {bookings.length === 1 ? 'Booking' : 'Bookings'}
          </span>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading bookings...</p>
        </div>
      ) : bookings.length === 0 ? (
        <div className="bg-card border border-border rounded-3xl p-12 text-center">
          <div className="w-20 h-20 rounded-full bg-secondary/50 flex items-center justify-center mx-auto mb-4">
            <Receipt className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-heading font-semibold mb-2">No bookings yet</h3>
          <p className="text-muted-foreground mb-6">Start exploring and book your perfect stay</p>
          <Button onClick={onBrowseListings} className="rounded-full">
            Browse Listings
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <BookingCard key={booking._id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
}
