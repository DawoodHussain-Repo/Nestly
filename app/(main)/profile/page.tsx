"use client";

import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ProfileInfoCard } from "@/components/profile/profile-info-card";
import { BookingsSection } from "@/components/profile/bookings-section";
import { QuickActions } from "@/components/profile/quick-actions";

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

          {/* Profile Info Card */}
          <ProfileInfoCard user={user} onLogout={handleLogout} />

          {/* Bookings Section */}
          <BookingsSection
            bookings={bookings}
            loading={bookingsLoading}
            onBrowseListings={() => router.push("/listings")}
          />

          {/* Quick Actions */}
          <QuickActions
            onBrowseListings={() => router.push("/listings")}
            onViewMessages={() => router.push("/messages")}
            onOpenSettings={() => toast.info("Settings coming soon!")}
          />
        </div>
      </main>
    </div>
  );
}
