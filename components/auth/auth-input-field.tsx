import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { LucideIcon } from "lucide-react";

interface AuthInputFieldProps extends React.ComponentProps<"input"> {
  id: string;
  label: string;
  icon: LucideIcon;
  rightAdornment?: React.ReactNode;
}

export function AuthInputField({
  id,
  label,
  icon: Icon,
  className,
  rightAdornment,
  ...props
}: AuthInputFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          id={id}
          className={`h-12 rounded-full bg-secondary border-border pl-10 ${rightAdornment ? "pr-10" : ""} ${className ?? ""}`}
          {...props}
        />
        {rightAdornment ? (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightAdornment}</div>
        ) : null}
      </div>
    </div>
  );
}
