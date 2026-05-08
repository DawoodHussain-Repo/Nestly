import { Bed, Bath, Users } from "lucide-react";

interface PropertyStatsProps {
  bedrooms: number;
  bathrooms: number;
  guests: number;
}

export function PropertyStats({ bedrooms, bathrooms, guests }: PropertyStatsProps) {
  return (
    <div className="flex gap-6 mb-8 pb-8 border-b border-border">
      <div className="flex items-center gap-3 px-4 py-3 bg-secondary rounded-xl">
        <Bed size={20} className="text-primary" />
        <div>
          <p className="text-sm text-muted-foreground">Bedrooms</p>
          <p className="font-semibold">{bedrooms}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 px-4 py-3 bg-secondary rounded-xl">
        <Bath size={20} className="text-primary" />
        <div>
          <p className="text-sm text-muted-foreground">Bathrooms</p>
          <p className="font-semibold">{bathrooms}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 px-4 py-3 bg-secondary rounded-xl">
        <Users size={20} className="text-primary" />
        <div>
          <p className="text-sm text-muted-foreground">Guests</p>
          <p className="font-semibold">{guests}</p>
        </div>
      </div>
    </div>
  );
}
