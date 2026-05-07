"use client";

import { useAuth } from "@/contexts/auth-context";
import { PillNavAnimated } from "./pill-nav-animated";

export function Nav() {
  const { user, loading } = useAuth();

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
    <PillNavAnimated
      items={navItems}
      ease="power2.easeOut"
      initialLoadAnimation={true}
    />
  );
}
