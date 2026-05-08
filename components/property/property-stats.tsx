import { Bed, Bath, Users } from "lucide-react";

interface PropertyStatsProps {
  bedrooms: number;
  bathrooms: number;
  guests: number;
}

export function PropertyStats({ bedrooms, bathrooms, guests }: PropertyStatsProps) {
  const stats = [
    { icon: Bed, label: "Bedrooms", value: bedrooms },
    { icon: Bath, label: "Bathrooms", value: bathrooms },
    { icon: Users, label: "Guests", value: guests },
  ];

  return (
    <div className="flex gap-4 mb-8 pb-8 border-b border-border/50">
      {stats.map(({ icon: Icon, label, value }) => (
        <div key={label} className="flex items-center gap-3 px-5 py-3.5 bg-secondary/40 rounded-xl border border-border/30">
          <Icon size={18} className="text-primary" />
          <div>
            <p className="text-[0.65rem] text-muted-foreground uppercase tracking-wider font-medium">{label}</p>
            <p className="text-sm font-bold text-foreground">{value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
