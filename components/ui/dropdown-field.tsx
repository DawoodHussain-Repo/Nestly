import { ReactNode, useRef, useEffect } from "react";
import { LucideIcon } from "lucide-react";

interface DropdownFieldProps {
  icon: LucideIcon;
  label: string;
  value: string;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export function DropdownField({
  icon: Icon,
  label,
  value,
  isOpen,
  onToggle,
  onClose,
  children,
  className,
}: DropdownFieldProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose]);

  return (
    <div className="flex-1 relative overflow-visible" ref={ref}>
      <button
        onClick={onToggle}
        className="flex items-center px-8 py-5 w-full gap-4 hover:bg-secondary/50 rounded-2xl transition-all text-left group"
      >
        <Icon className="h-6 w-6 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-semibold text-foreground">{label}</span>
          <span className="text-sm text-muted-foreground truncate">{value}</span>
        </div>
      </button>

      {isOpen && (
        <div className={`dropdown-base top-full left-0 mt-3 w-96 ${className || ''}`}>
          {children}
        </div>
      )}
    </div>
  );
}
