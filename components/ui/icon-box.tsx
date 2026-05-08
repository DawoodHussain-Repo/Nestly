import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconBoxProps {
  icon: LucideIcon;
  variant?: "default" | "interactive";
  className?: string;
}

export function IconBox({ icon: Icon, variant = "default", className }: IconBoxProps) {
  return (
    <div className={cn(
      variant === "interactive" ? "icon-box-interactive" : "icon-box",
      className
    )}>
      <Icon className="h-6 w-6 text-primary" />
    </div>
  );
}
