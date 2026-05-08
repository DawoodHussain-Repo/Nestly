"use client";

import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ProfileInfoCard } from "@/components/profile/profile-info-card";
import { BookingsSection } from "@/components/profile/bookings-section";
import { QuickActions } from "@/components/profile/quick-actions";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorState } from "@/components/ui/error-state";
import { useApi } from "@/hooks/use-api";
import { api } from "@/lib/api-client";

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
  const { data: bookingsData, loading: bookingsLoading, error, execute: fetchBookings } = useApi<{ bookings: Booking[] }>();
  const bookings = bookingsData?.bookings || [];

  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchBookings(api.get<{ bookings: Booking[] }>("/api/bookings"));
    }
  }, [user, fetchBookings]);

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
        <LoadingSpinner message="Loading profile..." />
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
          {error ? (
            <ErrorState 
              message={error}
              onRetry={() => fetchBookings(api.get<{ bookings: Booking[] }>("/api/bookings"))}
            />
          ) : (
            <BookingsSection
              bookings={bookings}
              loading={bookingsLoading}
              onBrowseListings={() => router.push("/listings")}
            />
          )}

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
