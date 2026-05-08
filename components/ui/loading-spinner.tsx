import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md";
  message?: string;
  className?: string;
}

export function LoadingSpinner({ size = "md", message, className }: LoadingSpinnerProps) {
  return (
    <div className={cn("text-center py-20", className)}>
      <div className={size === "sm" ? "spinner-sm mx-auto" : "spinner mx-auto mb-5"} />
      {message && <p className="text-muted-foreground">{message}</p>}
    </div>
  );
}
