"use client";

import { useAuth } from "@/contexts/auth-context";
import { LogOut } from "lucide-react";
import { PillNavAnimated } from "./pill-nav-animated";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function Nav() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  const navItems = user ? [
    { label: "Home", href: "/", icon: "home" },
    { label: "Listings", href: "/listings", icon: "list" },
    { label: "How it Works", href: "/how-it-works", icon: "help" },
    { label: "Messages", href: "/messages", icon: "message" },
    { label: user.name, href: "/profile", icon: "user", variant: "dark" as const },
  ] : [
    { label: "Home", href: "/", icon: "home" },
    { label: "Listings", href: "/listings", icon: "list" },
    { label: "How it Works", href: "/how-it-works", icon: "help" },
    { label: "Messages", href: "/messages", icon: "message" },
    { label: "Sign In", href: "/signin", icon: "login", variant: "dark" as const },
    { label: "Sign Up", href: "/signup", icon: "user-plus", variant: "dark" as const },
  ];
  
  if (loading) {
    return null;
  }
  
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-[72rem] flex items-center gap-3">
      <div className="flex-1">
        <PillNavAnimated
          items={navItems}
          ease="power2.easeOut"
          initialLoadAnimation={true}
        />
      </div>
      {user && (
        <button
          onClick={handleLogout}
          className="w-14 h-14 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 flex items-center justify-center transition-all hover:scale-105 shadow-lg"
          aria-label="Logout"
          title="Logout"
        >
          <LogOut className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
