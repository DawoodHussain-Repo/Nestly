"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterPillProps {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
}

export function FilterPill({
  label,
  options,
  value,
  onChange,
}: FilterPillProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isActive = value !== options[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-medium transition-all",
          isActive
            ? "bg-foreground text-background border-foreground shadow-sm"
            : "bg-transparent text-foreground border-border hover:border-foreground/40"
        )}
      >
        <span>{isActive ? value : label}</span>
        {isActive ? (
          <X
            className="h-3.5 w-3.5 cursor-pointer hover:scale-110 transition-transform"
            onClick={(e) => {
              e.stopPropagation();
              onChange(options[0]);
              setOpen(false);
            }}
          />
        ) : (
          <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", open && "rotate-180")} />
        )}
      </button>

      {open && (
        <div className="dropdown-base top-full left-0 mt-2 min-w-[200px] py-1 max-h-60 overflow-y-auto scroll-styled">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={cn(
                "w-full text-left px-4 py-2.5 text-sm transition-colors",
                value === opt
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-foreground hover:bg-secondary/50"
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
