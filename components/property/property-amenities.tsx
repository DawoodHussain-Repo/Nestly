import { Wifi, Car, Tv, Wind } from "lucide-react";

interface PropertyAmenitiesProps {
  amenities: string[];
}

export function PropertyAmenities({ amenities }: PropertyAmenitiesProps) {
  const getIcon = (amenity: string) => {
    const lower = amenity.toLowerCase();
    if (lower.includes('wifi')) return Wifi;
    if (lower.includes('parking') || lower.includes('car')) return Car;
    if (lower.includes('tv')) return Tv;
    return Wind;
  };

  const displayAmenities = amenities.length > 0 
    ? amenities 
    : ['WiFi', 'Kitchen', 'Air Conditioning', 'Heating'];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-heading font-semibold mb-4">Amenities</h2>
      <div className="grid grid-cols-2 gap-4">
        {displayAmenities.map((amenity, idx) => {
          const Icon = getIcon(amenity);
          return (
            <div key={idx} className="flex items-center gap-3 p-4 border border-border rounded-xl">
              <Icon size={20} className="text-primary" />
              <span>{amenity}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
