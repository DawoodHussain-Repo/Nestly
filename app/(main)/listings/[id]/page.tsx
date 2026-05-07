"use client";

import { use, useState, useEffect } from "react";
import { notFound, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  MapPin, 
  Star, 
  Bed, 
  Bath, 
  Users, 
  Wifi, 
  Car, 
  Tv, 
  Wind,
  ChevronLeft,
  Heart,
  Share2,
  Building2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Property } from "@/types/property";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";

interface PropertyDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { id } = use(params);
  const { user } = useAuth();
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [galleryErrors, setGalleryErrors] = useState<Record<number, boolean>>({});
  
  // Booking form state
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  useEffect(() => {
    async function fetchProperty() {
      try {
        setLoading(true);
        const response = await fetch(`/api/listings/${id}`);
        const data = await response.json();
        if (data.success) {
          setProperty(data.data);
        } else {
          setProperty(null);
        }
      } catch (error) {
        console.error('Failed to fetch property:', error);
        setProperty(null);
      } finally {
        setLoading(false);
      }
    }
    fetchProperty();
  }, [id]);

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const nights = calculateNights();
  const totalPrice = property ? property.price * nights : 0;
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
          propertyId: id,
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
      
      // Show booking details in a more prominent way
      setTimeout(() => {
        toast.success(
          `Payment completed! Total: $${data.booking.grandTotal}`,
          { duration: 5000 }
        );
      }, 1000);

      // Reset form
      setCheckIn("");
      setCheckOut("");
      setGuests(1);

      // Optionally redirect to bookings page
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

  if (loading) {
    return (
      <div className="bg-background text-foreground min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">Loading property...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    notFound();
  }

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      {/* Spacer for fixed pill nav */}
      <div className="h-28" />

      <main className="flex-grow">
        {/* Back Button */}
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link 
            href="/listings"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft size={16} />
            Back to listings
          </Link>
        </div>

        {/* Property Images */}
        <section className="max-w-7xl mx-auto px-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-2xl overflow-hidden">
            <div className="relative h-[400px] md:h-[500px] bg-muted">
              {!imageError ? (
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                  onError={() => setImageError(true)}
                  unoptimized
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
                  <div className="text-center">
                    <Building2 className="h-16 w-16 text-muted-foreground/50 mx-auto mb-3" />
                    <p className="text-muted-foreground">Property Image</p>
                  </div>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {(property.images && property.images.length > 0 
                ? property.images.slice(0, 4) 
                : Array(4).fill(property.image)
              ).map((img, idx) => (
                <div key={`${img}-${idx}`} className="relative h-[190px] md:h-[242px] bg-muted rounded-xl overflow-hidden">
                  {!galleryErrors[idx] ? (
                    <Image
                      src={img}
                      alt={`${property.title} - Gallery image ${idx + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover"
                      onError={() => setGalleryErrors(prev => ({ ...prev, [idx]: true }))}
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
                      <Building2 className="h-8 w-8 text-muted-foreground/50" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Property Details */}
        <section className="max-w-7xl mx-auto px-6 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-4xl font-heading font-bold mb-2">{property.title}</h1>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin size={18} />
                      <span className="text-lg">{property.location}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-3 border border-border rounded-full hover:bg-secondary transition-colors">
                      <Share2 size={18} />
                    </button>
                    <button className="p-3 border border-border rounded-full hover:bg-secondary transition-colors">
                      <Heart size={18} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Star size={18} className="fill-primary text-primary" />
                    <span className="font-semibold">{property.rating}</span>
                    <span className="text-muted-foreground">({property.reviews} reviews)</span>
                  </div>
                  <span className="px-4 py-1.5 bg-secondary rounded-full text-sm font-medium capitalize">
                    {property.type}
                  </span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex gap-6 mb-8 pb-8 border-b border-border">
                <div className="flex items-center gap-3 px-4 py-3 bg-secondary rounded-xl">
                  <Bed size={20} className="text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Bedrooms</p>
                    <p className="font-semibold">{property.bedrooms}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-4 py-3 bg-secondary rounded-xl">
                  <Bath size={20} className="text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Bathrooms</p>
                    <p className="font-semibold">{property.bathrooms}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-4 py-3 bg-secondary rounded-xl">
                  <Users size={20} className="text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Guests</p>
                    <p className="font-semibold">{property.guests}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8 pb-8 border-b border-border">
                <h2 className="text-2xl font-heading font-semibold mb-4">About this place</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {property.description || `Experience luxury and comfort in this beautifully designed ${property.type.toLowerCase()}. 
                  Perfect for families or groups, this property offers modern amenities and stunning views. 
                  Located in the heart of ${property.location}, you'll have easy access to local attractions, 
                  restaurants, and entertainment. The space features high-end furnishings, a fully equipped 
                  kitchen, and comfortable sleeping arrangements for up to ${property.guests} guests.`}
                </p>
              </div>

              {/* Amenities */}
              <div className="mb-8">
                <h2 className="text-2xl font-heading font-semibold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 gap-4">
                  {(property.amenities && property.amenities.length > 0 ? property.amenities : ['WiFi', 'Kitchen', 'Air Conditioning', 'Heating']).map((amenity, idx) => {
                    const Icon = amenity.toLowerCase().includes('wifi') ? Wifi : 
                                amenity.toLowerCase().includes('parking') || amenity.toLowerCase().includes('car') ? Car :
                                amenity.toLowerCase().includes('tv') ? Tv : Wind;
                    return (
                      <div key={idx} className="flex items-center gap-3 p-4 border border-border rounded-xl">
                        <Icon size={20} className="text-primary" />
                        <span>{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Booking Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 border border-border rounded-2xl p-6 shadow-lg bg-card">
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-heading font-bold">${property.price}</span>
                    <span className="text-muted-foreground">/ night</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Star size={14} className="fill-primary text-primary" />
                    <span className="font-semibold">{property.rating}</span>
                    <span className="text-muted-foreground">({property.reviews} reviews)</span>
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
                      {Array.from({ length: property.guests }, (_, i) => i + 1).map((num) => (
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
                      <span className="text-muted-foreground">${property.price} × {nights} {nights === 1 ? 'night' : 'nights'}</span>
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
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
