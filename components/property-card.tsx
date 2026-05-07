'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Heart, MapPin, Star, Bed, Bath, Users } from 'lucide-react'
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
  const link = href ?? `/listings/${property.id}`
  const compact = variant === 'compact'

  return (
    <Link href={link}>
      <div className="overflow-hidden group cursor-pointer transition-all hover:shadow-2xl rounded-3xl border border-border bg-background hover:-translate-y-1 duration-300">
        <div className={cn('relative overflow-hidden bg-muted', compact ? 'h-44' : 'h-56')}>
          {property.image ? (
            <Image
              src={property.image}
              alt={property.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              unoptimized
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-secondary to-muted flex items-center justify-center text-sm text-muted-foreground">
              Property Image
            </div>
          )}
          <button
            onClick={(e) => e.preventDefault()}
            className="absolute top-4 right-4 p-2.5 bg-background/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
          >
            <Heart size={18} className="text-muted-foreground hover:text-primary transition-colors" />
          </button>
          {property.type ? (
            <Badge variant="secondary" className="absolute top-4 left-4 capitalize backdrop-blur-sm bg-background/90 shadow-md">
              {property.type}
            </Badge>
          ) : null}
        </div>

        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-heading font-semibold mb-2 line-clamp-1 group-hover:text-primary transition-colors">{property.title}</h3>
            <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
              <MapPin size={16} className="flex-shrink-0" />
              <span className="line-clamp-1">{property.location}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              <Star size={16} className="fill-primary text-primary" />
              <span className="text-sm font-semibold">{property.rating}</span>
            </div>
            {property.reviews ? (
              <span className="text-sm text-muted-foreground">({property.reviews} reviews)</span>
            ) : null}
          </div>

          {!compact && (property.bedrooms || property.bathrooms || property.guests) ? (
            <div className="flex gap-3 mb-4 pb-4 border-t border-border pt-4">
              {property.bedrooms ? (
                <div className="flex items-center gap-2 px-3 py-2 bg-secondary/50 rounded-full">
                  <Bed size={16} className="text-primary" />
                  <span className="text-sm font-medium">{property.bedrooms}</span>
                </div>
              ) : null}
              {property.bathrooms ? (
                <div className="flex items-center gap-2 px-3 py-2 bg-secondary/50 rounded-full">
                  <Bath size={16} className="text-primary" />
                  <span className="text-sm font-medium">{property.bathrooms}</span>
                </div>
              ) : null}
              {property.guests ? (
                <div className="flex items-center gap-2 px-3 py-2 bg-secondary/50 rounded-full">
                  <Users size={16} className="text-primary" />
                  <span className="text-sm font-medium">{property.guests}</span>
                </div>
              ) : null}
            </div>
          ) : null}

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">From</p>
              <p className="text-xl font-heading font-bold">${property.price}<span className="text-sm font-normal text-muted-foreground">/night</span></p>
            </div>
            <div className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium group-hover:bg-primary/90 transition-colors">
              View
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
