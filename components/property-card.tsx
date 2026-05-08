'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Heart, MapPin, Star, Bed, Bath, Users, Building2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { useState } from 'react'

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
  const [imageError, setImageError] = useState(false)
  const [liked, setLiked] = useState(false)

  return (
    <Link href={link} className="block group">
      <article className={cn(
        'overflow-hidden rounded-2xl bg-card transition-all duration-300',
        'border border-border/60',
        'hover:shadow-[0_8px_30px_-8px_rgba(179,28,51,0.12)]',
        'hover:-translate-y-1',
      )}>
        {/* Image Container */}
        <div className={cn(
          'relative overflow-hidden bg-muted',
          compact ? 'aspect-[4/3]' : 'aspect-[16/11]'
        )}>
          {property.image && !imageError ? (
            <Image
              src={property.image}
              alt={property.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              onError={() => setImageError(true)}
              unoptimized
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-secondary via-muted to-secondary/60 flex items-center justify-center">
              <Building2 className="h-10 w-10 text-muted-foreground/30" />
            </div>
          )}

          {/* Gradient overlay at bottom for readability */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

          {/* Heart button */}
          <button
            onClick={(e) => {
              e.preventDefault()
              setLiked(!liked)
            }}
            className={cn(
              'absolute top-3 right-3 p-2 rounded-full transition-all duration-200',
              'backdrop-blur-md shadow-sm',
              liked
                ? 'bg-primary/90 text-white'
                : 'bg-white/80 text-muted-foreground hover:bg-white hover:text-primary'
            )}
          >
            <Heart size={16} className={cn(liked && 'fill-current')} />
          </button>

          {/* Type badge */}
          {property.type && (
            <Badge
              variant="secondary"
              className="absolute bottom-3 left-3 capitalize backdrop-blur-md bg-white/85 text-foreground border-0 text-xs font-semibold shadow-sm"
            >
              {property.type}
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className={cn('p-4', !compact && 'p-6')}>
          {/* Title & Location */}
          <div className="mb-3">
            <h3 className="text-[0.95rem] font-semibold leading-snug line-clamp-1 text-foreground group-hover:text-primary transition-colors duration-200">
              {property.title}
            </h3>
            <div className="flex items-center gap-1 mt-1 text-muted-foreground">
              <MapPin size={13} className="flex-shrink-0" />
              <span className="text-[0.8rem] line-clamp-1">{property.location}</span>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-3">
            <Star size={13} className="fill-amber-400 text-amber-400" />
            <span className="text-sm font-semibold text-foreground">{property.rating}</span>
            {property.reviews ? (
              <span className="text-xs text-muted-foreground">({property.reviews})</span>
            ) : null}
          </div>

          {/* Stats — only in default variant */}
          {!compact && (property.bedrooms || property.bathrooms || property.guests) && (
            <div className="flex items-center gap-3 mb-3 pt-3 border-t border-border/50">
              {property.bedrooms ? (
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Bed size={14} />
                  <span className="text-xs font-medium">{property.bedrooms}</span>
                </div>
              ) : null}
              {property.bathrooms ? (
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Bath size={14} />
                  <span className="text-xs font-medium">{property.bathrooms}</span>
                </div>
              ) : null}
              {property.guests ? (
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Users size={14} />
                  <span className="text-xs font-medium">{property.guests}</span>
                </div>
              ) : null}
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline justify-between pt-2">
            <p className="text-lg font-bold text-foreground tracking-tight">
              ${property.price}
              <span className="text-xs font-normal text-muted-foreground ml-0.5">/night</span>
            </p>
          </div>
        </div>
      </article>
    </Link>
  )
}
