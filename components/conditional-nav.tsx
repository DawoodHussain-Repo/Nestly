"use client";

import { usePathname } from "next/navigation";
import { PillNavAnimated } from "./pill-nav-animated";

export function ConditionalNav() {
  const pathname = usePathname();
  const hideNav = pathname === '/signin' || pathname === '/signup';

  if (hideNav) return null;

  const navItems = [
    { label: "Home", href: "/", icon: "home" },
    { label: "Listings", href: "/listings", icon: "list" },
    { label: "How it Works", href: "/how-it-works", icon: "help" },
    { label: "Messages", href: "/messages", icon: "message" },
    { label: "Sign In", href: "/signin", icon: "login", variant: "dark" as const },
    { label: "Sign Up", href: "/signup", icon: "user-plus", variant: "dark" as const },
  ];
  
  return (
    <PillNavAnimated
      items={navItems}
      baseColor="#FFFAF0"
      pillColor="#B31C33"
      hoveredPillTextColor="#1A1A1A"
      pillTextColor="#FFFFFF"
      ease="power2.easeOut"
      initialLoadAnimation={true}
    />
  );
}
