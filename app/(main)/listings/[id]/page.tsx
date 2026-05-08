"use client";

import { use, useState, useEffect } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Property } from "@/types/property";
import { PropertyGallery } from "@/components/property/property-gallery";
import { PropertyHeader } from "@/components/property/property-header";
import { PropertyStats } from "@/components/property/property-stats";
import { PropertyAmenities } from "@/components/property/property-amenities";
import { BookingCard } from "@/components/property/booking-card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useApi } from "@/hooks/use-api";
import { api } from "@/lib/api-client";

interface PropertyDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { id } = use(params);
  const { data: property, loading, error, execute } = useApi<Property>();

  useEffect(() => {
    execute(api.get<Property>(`/api/listings/${id}`));
  }, [id, execute]);

  if (loading || (!property && !error)) {
    return (
      <div className="bg-background text-foreground min-h-screen flex items-center justify-center">
        <LoadingSpinner message="Loading property..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-background text-foreground min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">{error}</p>
          <button onClick={() => execute(api.get<Property>(`/api/listings/${id}`))} className="btn-base px-4 py-2 bg-primary text-primary-foreground">Retry</button>
        </div>
      </div>
    );
  }

  if (!property) {
    notFound();
  }

  const defaultDescription = `Experience luxury and comfort in this beautifully designed ${property.type.toLowerCase()}. 
    Perfect for families or groups, this property offers modern amenities and stunning views. 
    Located in the heart of ${property.location}, you'll have easy access to local attractions, 
    restaurants, and entertainment. The space features high-end furnishings, a fully equipped 
    kitchen, and comfortable sleeping arrangements for up to ${property.guests} guests.`;

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
        <PropertyGallery 
          mainImage={property.image}
          images={property.images || []}
          title={property.title}
        />

        {/* Property Details */}
        <section className="max-w-7xl mx-auto px-6 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <PropertyHeader
                title={property.title}
                location={property.location}
                rating={property.rating}
                reviews={property.reviews}
                type={property.type}
              />

              <PropertyStats
                bedrooms={property.bedrooms}
                bathrooms={property.bathrooms}
                guests={property.guests}
              />

              {/* Description */}
              <div className="mb-8 pb-8 border-b border-border">
                <h2 className="text-2xl font-heading font-semibold mb-4">About this place</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {property.description || defaultDescription}
                </p>
              </div>

              <PropertyAmenities amenities={property.amenities || []} />
            </div>

            {/* Booking Card */}
            <div className="lg:col-span-1">
              <BookingCard
                propertyId={id}
                price={property.price}
                rating={property.rating}
                reviews={property.reviews}
                maxGuests={property.guests}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
