"use client";

import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Mail, User, Calendar, Shield, LogOut, Receipt, MapPin, Users, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/avatar";
import { toast } from "sonner";

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

export default function ProfilePage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      setBookingsLoading(true);
      const response = await fetch("/api/bookings");
      const data = await response.json();
      if (data.success) {
        setBookings(data.bookings);
      }
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setBookingsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  if (loading) {
    return (
      <div className="bg-background text-foreground min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      {/* Spacer for fixed nav */}
      <div className="h-28" />

      <main className="flex-grow py-12">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-heading font-bold mb-2">My Profile</h1>
            <p className="text-muted-foreground">Manage your account information</p>
          </div>

          {/* Profile Card */}
          <div className="bg-card border border-border rounded-3xl p-8 mb-6 shadow-lg">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
              <Avatar 
                src={user.avatar || "/placeholder-user.jpg"} 
                name={user.name} 
                size="lg"
              />
              <div className="flex-1">
                <h2 className="text-2xl font-heading font-bold mb-1">{user.name}</h2>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
              <Button 
                variant="destructive" 
                onClick={handleLogout}
                className="rounded-full"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <div className="flex items-start gap-4 p-4 bg-secondary/30 rounded-2xl">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email Address</p>
                  <p className="font-semibold">{user.email}</p>
                </div>
              </div>

              {/* Name */}
              <div className="flex items-start gap-4 p-4 bg-secondary/30 rounded-2xl">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Full Name</p>
                  <p className="font-semibold">{user.name}</p>
                </div>
              </div>

              {/* Member Since */}
              <div className="flex items-start gap-4 p-4 bg-secondary/30 rounded-2xl">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Member Since</p>
                  <p className="font-semibold">May 2026</p>
                </div>
              </div>

              {/* Account Status */}
              <div className="flex items-start gap-4 p-4 bg-secondary/30 rounded-2xl">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Account Status</p>
                  <p className="font-semibold text-green-600">Active</p>
                </div>
              </div>
            </div>
          </div>

          {/* My Bookings Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-heading font-bold mb-1">My Bookings</h2>
                <p className="text-muted-foreground">View and manage your reservations</p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                <Receipt className="h-5 w-5 text-primary" />
                <span className="font-semibold text-primary">{bookings.length} {bookings.length === 1 ? 'Booking' : 'Bookings'}</span>
              </div>
            </div>

            {bookingsLoading ? (
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
                <Button onClick={() => router.push("/listings")} className="rounded-full">
                  Browse Listings
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div 
                    key={booking._id} 
                    className="bg-card border border-border rounded-3xl p-6 hover:shadow-lg transition-all group"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Property Image */}
                      <div className="relative w-full md:w-48 h-48 rounded-2xl overflow-hidden flex-shrink-0 bg-muted">
                        {!imageErrors[booking._id] ? (
                          <img
                            src={booking.propertyId.image}
                            alt={booking.propertyId.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={() => setImageErrors(prev => ({ ...prev, [booking._id]: true }))}
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
                            <Building2 className="h-12 w-12 text-muted-foreground/50" />
                          </div>
                        )}
                        <div className={`absolute top-3 right-3 px-3 py-1.5 rounded-full text-xs font-semibold ${
                          booking.status === 'confirmed' 
                            ? 'bg-green-500/90 text-white' 
                            : booking.status === 'pending'
                            ? 'bg-yellow-500/90 text-white'
                            : 'bg-red-500/90 text-white'
                        }`}>
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
                            <div className={`text-sm font-semibold ${
                              booking.paymentStatus === 'completed' 
                                ? 'text-green-600' 
                                : booking.paymentStatus === 'pending'
                                ? 'text-yellow-600'
                                : 'text-red-600'
                            }`}>
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
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              onClick={() => router.push("/listings")}
              className="p-6 bg-card border border-border rounded-2xl hover:bg-secondary/30 transition-all text-left group"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="font-heading font-semibold mb-1">Browse Listings</h3>
              <p className="text-sm text-muted-foreground">Find your perfect stay</p>
            </button>

            <button 
              onClick={() => router.push("/messages")}
              className="p-6 bg-card border border-border rounded-2xl hover:bg-secondary/30 transition-all text-left group"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="font-heading font-semibold mb-1">Messages</h3>
              <p className="text-sm text-muted-foreground">Check your conversations</p>
            </button>

            <button 
              onClick={() => toast.info("Settings coming soon!")}
              className="p-6 bg-card border border-border rounded-2xl hover:bg-secondary/30 transition-all text-left group"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-heading font-semibold mb-1">Settings</h3>
              <p className="text-sm text-muted-foreground">Manage preferences</p>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
