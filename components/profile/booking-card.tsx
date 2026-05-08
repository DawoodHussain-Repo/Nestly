"use client";

import { useState } from "react";
import { MapPin, Calendar, Users, Building2 } from "lucide-react";

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

interface BookingCardProps {
  booking: Booking;
}

export function BookingCard({ booking }: BookingCardProps) {
  const [imageError, setImageError] = useState(false);

  const getStatusColor = (status: string) => {
    if (status === 'confirmed') return 'bg-green-500/90 text-white';
    if (status === 'pending') return 'bg-yellow-500/90 text-white';
    return 'bg-red-500/90 text-white';
  };

  const getPaymentStatusColor = (status: string) => {
    if (status === 'completed') return 'text-green-600';
    if (status === 'pending') return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-card border border-border rounded-3xl p-6 hover:shadow-lg transition-all group">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Property Image */}
        <div className="relative w-full md:w-48 h-48 rounded-2xl overflow-hidden flex-shrink-0 bg-muted">
          {!imageError ? (
            <img
              src={booking.propertyId.image}
              alt={booking.propertyId.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
              <Building2 className="h-12 w-12 text-muted-foreground/50" />
            </div>
          )}
          <div className={`absolute top-3 right-3 px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </div>
        </div>

        {/* Booking Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
            <div>
              <h3 className="text-xl font-heading font-bold mb-1 group-hover:text-primary transition-colors">
                {booking.propertyId.title}
              </h3>
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <MapPin size={16} />
                <span className="text-sm">{booking.propertyId.location}</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary rounded-full text-sm">
                <span className="font-mono font-semibold text-primary">{booking.bookingReference}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-heading font-bold text-primary mb-1">
                ${booking.grandTotal}
              </div>
              <div className={`text-sm font-semibold ${getPaymentStatusColor(booking.paymentStatus)}`}>
                Payment {booking.paymentStatus}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-xl">
              <Calendar className="h-5 w-5 text-primary flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground mb-0.5">Check-in</p>
                <p className="font-semibold text-sm truncate">
                  {new Date(booking.checkIn).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-xl">
              <Calendar className="h-5 w-5 text-primary flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground mb-0.5">Check-out</p>
                <p className="font-semibold text-sm truncate">
                  {new Date(booking.checkOut).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-xl">
              <Users className="h-5 w-5 text-primary flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground mb-0.5">Guests</p>
                <p className="font-semibold text-sm">
                  {booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-border flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="font-medium">Nights:</span>
              <span>{booking.nights}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Price/night:</span>
              <span>${booking.propertyId.price}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Service fee:</span>
              <span>${Math.round(booking.grandTotal - (booking.propertyId.price * booking.nights))}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
