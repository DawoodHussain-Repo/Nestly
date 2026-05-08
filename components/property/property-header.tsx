import { MapPin, Star, Share2, Heart } from "lucide-react";

interface PropertyHeaderProps {
  title: string;
  location: string;
  rating: number;
  reviews: number;
  type: string;
}

export function PropertyHeader({ title, location, rating, reviews, type }: PropertyHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h1 className="text-4xl font-heading font-bold mb-2">{title}</h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin size={18} />
            <span className="text-lg">{location}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-3 border border-border rounded-full hover:bg-secondary transition-colors">
            <Share2 size={18} />
          </button>
          <button className="p-3 border border-border rounded-full hover:bg-secondary transition-colors">
            <Heart size={18} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Star size={18} className="fill-primary text-primary" />
          <span className="font-semibold">{rating}</span>
          <span className="text-muted-foreground">({reviews} reviews)</span>
        </div>
        <span className="px-4 py-1.5 bg-secondary rounded-full text-sm font-medium capitalize">
          {type}
        </span>
      </div>
    </div>
  );
}
