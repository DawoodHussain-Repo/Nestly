import { Wifi, Car, Tv, Wind, Coffee, Flame, Waves, Dumbbell } from "lucide-react";

interface PropertyAmenitiesProps {
  amenities: string[];
}

const iconMap: Record<string, typeof Wifi> = {
  wifi: Wifi,
  parking: Car,
  car: Car,
  tv: Tv,
  pool: Waves,
  gym: Dumbbell,
  coffee: Coffee,
  fireplace: Flame,
};

function getIcon(amenity: string) {
  const lower = amenity.toLowerCase();
  for (const [key, icon] of Object.entries(iconMap)) {
    if (lower.includes(key)) return icon;
  }
  return Wind;
}

export function PropertyAmenities({ amenities }: PropertyAmenitiesProps) {
  const displayAmenities = amenities.length > 0 
    ? amenities 
    : ['WiFi', 'Kitchen', 'Air Conditioning', 'Heating'];

  return (
    <div className="mb-8">
      <h2 className="text-xl font-heading font-semibold mb-4">Amenities</h2>
      <div className="grid grid-cols-2 gap-2.5">
        {displayAmenities.map((amenity, idx) => {
          const Icon = getIcon(amenity);
          return (
            <div key={idx} className="flex items-center gap-3 p-3.5 border border-border/40 rounded-xl hover:bg-secondary/30 transition-colors">
              <Icon size={16} className="text-primary flex-shrink-0" />
              <span className="text-sm">{amenity}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
