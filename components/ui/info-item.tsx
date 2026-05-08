import { LucideIcon } from "lucide-react";
import { IconBox } from "./icon-box";

interface InfoItemProps {
  icon: LucideIcon;
  label: string;
  value: string;
  valueClassName?: string;
}

export function InfoItem({ icon, label, value, valueClassName }: InfoItemProps) {
  return (
    <div className="flex items-start gap-4 p-4 bg-secondary/30 rounded-2xl">
      <IconBox icon={icon} />
      <div>
        <p className="text-sm text-muted-foreground mb-1">{label}</p>
        <p className={valueClassName || "font-semibold"}>{value}</p>
      </div>
    </div>
  );
}
