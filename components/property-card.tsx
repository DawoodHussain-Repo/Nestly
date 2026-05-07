'use client'

import Link from 'next/link'
import { Heart, MapPin, Star } from 'lucide-react'
import type { Property } from '@/lib/mock-data'

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link href={`/property/${property.id}`}>
      <div className="card overflow-hidden group cursor-pointer transition-all hover:shadow-lg">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-muted h-48">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <button
            onClick={(e) => e.preventDefault()}
            className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
          >
            <Heart size={18} className="text-muted-foreground hover:text-primary" />
          </button>
        </div>

        {/* Content */}
        <div className="card-padding">
          {/* Title & Location */}
          <div className="mb-3">
            <h3 className="heading-h4 mb-1 line-clamp-1">{property.title}</h3>
            <div className="flex items-center gap-1 text-muted-foreground body-sm">
              <MapPin size={16} />
              <span>{property.location}</span>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              <Star size={16} className="fill-primary text-primary" />
              <span className="label-md font-semibold">{property.rating}</span>
            </div>
            <span className="body-sm text-muted-foreground">({property.reviews} reviews)</span>
          </div>

          {/* Property Details */}
          <div className="flex gap-4 mb-4 py-3 border-t border-b border-border">
            <div>
              <p className="body-sm text-muted-foreground">{property.bedrooms} bedrooms</p>
            </div>
            <div>
              <p className="body-sm text-muted-foreground">{property.bathrooms} bathrooms</p>
            </div>
            <div>
              <p className="body-sm text-muted-foreground">{property.guests} guests</p>
            </div>
          </div>

          {/* Price */}
          <div className="flex-between">
            <div>
              <p className="body-sm text-muted-foreground">From</p>
              <p className="heading-h4">${property.price}/night</p>
            </div>
            <button
              onClick={(e) => e.preventDefault()}
              className="btn-primary btn-sm"
            >
              View
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
