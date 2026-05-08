import { LucideIcon } from "lucide-react";
import { IconBox } from "./icon-box";

interface ActionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick: () => void;
}

export function ActionCard({ icon, title, description, onClick }: ActionCardProps) {
  return (
    <button 
      onClick={onClick}
      className="card-interactive p-6 text-left group"
    >
      <IconBox icon={icon} variant="interactive" className="mb-4" />
      <h3 className="font-heading font-semibold mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </button>
  );
}
