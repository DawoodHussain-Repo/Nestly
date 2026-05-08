import { SearchX } from "lucide-react";
import { Button } from "./button";

interface EmptyStateProps {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ 
  title = "No results found", 
  message = "Try adjusting your filters or search terms to find what you're looking for.", 
  actionLabel,
  onAction 
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-6">
        <SearchX className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-heading font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-sm mb-8">{message}</p>
      {onAction && actionLabel && (
        <Button onClick={onAction} variant="default" className="rounded-full px-8">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
