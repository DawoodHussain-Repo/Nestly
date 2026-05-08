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
      <div className="flex items-start justify-between mb-3">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-1.5 tracking-tight">{title}</h1>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin size={15} />
            <span className="text-sm">{location}</span>
          </div>
        </div>
        <div className="flex gap-1.5">
          <button className="p-2.5 border border-border/60 rounded-full hover:bg-secondary/50 transition-colors">
            <Share2 size={15} />
          </button>
          <button className="p-2.5 border border-border/60 rounded-full hover:bg-secondary/50 transition-colors">
            <Heart size={15} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <Star size={14} className="fill-amber-400 text-amber-400" />
          <span className="text-sm font-semibold">{rating}</span>
          <span className="text-sm text-muted-foreground">({reviews} reviews)</span>
        </div>
        <span className="px-3 py-1 bg-secondary/60 rounded-full text-xs font-semibold capitalize text-foreground">
          {type}
        </span>
      </div>
    </div>
  );
}
