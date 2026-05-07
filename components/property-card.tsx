'use client'

import Link from 'next/link'
import { Heart, MapPin, Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface PropertyCardProps {
  property: {
    id: string | number
    title: string
    location: string
    price: number
    rating: number
    reviews?: number
    image?: string
    bedrooms?: number
    bathrooms?: number
    guests?: number
    type?: string
  }
  variant?: 'default' | 'compact'
  href?: string
}

export function PropertyCard({
  property,
  variant = 'default',
  href,
}: PropertyCardProps) {
  const link = href ?? `/listings?property=${property.id}`
  const compact = variant === 'compact'

  return (
    <Link href={link}>
      <div className="overflow-hidden group cursor-pointer transition-all hover:shadow-lg rounded-2xl border border-border bg-background">
        <div className={cn('relative overflow-hidden bg-muted', compact ? 'h-44' : 'h-48')}>
          {property.image ? (
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-secondary to-muted flex items-center justify-center text-sm text-muted-foreground">
              Property Image
            </div>
          )}
          <button
            onClick={(e) => e.preventDefault()}
            className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
          >
            <Heart size={18} className="text-muted-foreground hover:text-primary" />
          </button>
          {property.type ? (
            <Badge variant="secondary" className="absolute top-3 left-3 capitalize">
              {property.type}
            </Badge>
          ) : null}
        </div>

        <div className="p-5">
          <div className="mb-3">
            <h3 className="text-lg font-heading mb-1 line-clamp-1">{property.title}</h3>
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <MapPin size={16} />
              <span>{property.location}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              <Star size={16} className="fill-primary text-primary" />
              <span className="text-sm font-semibold">{property.rating}</span>
            </div>
            {property.reviews ? (
              <span className="text-sm text-muted-foreground">({property.reviews} reviews)</span>
            ) : null}
          </div>

          {!compact ? (
            <div className="flex gap-4 mb-4 py-3 border-t border-b border-border">
              <div>
                <p className="text-sm text-muted-foreground">{property.bedrooms ?? 0} bedrooms</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{property.bathrooms ?? 0} bathrooms</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{property.guests ?? 0} guests</p>
              </div>
            </div>
          ) : null}

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">From</p>
              <p className="text-lg font-heading">${property.price}/night</p>
            </div>
            <span className="text-sm text-primary font-medium">View</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
