import { PropertyCard } from './property-card'
import { mockProperties } from '@/lib/mock-data'

export function FeaturedProperties() {
  return (
    <section className="section-padding bg-background">
      <div className="content-max-width">
        {/* Header */}
        <div className="mb-12">
          <h2 className="heading-h2 mb-3">Featured Properties</h2>
          <p className="body-lg text-muted-foreground max-w-2xl">
            Discover handpicked properties from our community of trusted hosts around the world.
          </p>
        </div>

        {/* Properties Grid */}
        <div className="grid-3-cols">
          {mockProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  )
}
