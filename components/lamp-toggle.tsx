"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function LampToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isPulling, setIsPulling] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    if (isPulling) return;
    setIsPulling(true);
    
    // Switch theme halfway through the pull animation
    setTimeout(() => {
      setTheme(isDark ? "light" : "dark");
    }, 150);
    
    // Reset pull state
    setTimeout(() => {
      setIsPulling(false);
    }, 400);
  };

  return (
    <div className="fixed top-0 right-8 md:right-12 z-[100] flex flex-col items-center">
      {/* The string/cord */}
      <div 
        className={cn(
          "w-0.5 bg-foreground/30 transition-all duration-300 origin-top shadow-sm",
          isPulling ? "h-20" : "h-12 hover:h-14"
        )} 
      />
      
      {/* The pull handle / lamp knob */}
      <button
        onClick={toggleTheme}
        className={cn(
          "w-10 h-10 rounded-full bg-card border-2 border-border shadow-lg flex items-center justify-center cursor-pointer transition-all duration-300",
          "hover:shadow-xl hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/50",
          isPulling ? "scale-95 bg-secondary" : "hover:scale-105"
        )}
        aria-label="Toggle theme"
      >
        {isDark ? (
          <Moon className="w-4 h-4 text-primary" strokeWidth={2.5} />
        ) : (
          <Sun className="w-4 h-4 text-primary" strokeWidth={2.5} />
        )}
      </button>
    </div>
  );
}
