"use client";

import { usePathname } from "next/navigation";
import { PillNavAnimated } from "./pill-nav-animated";

export function ConditionalNav() {
  const pathname = usePathname();
  const hideNav = pathname === '/signin' || pathname === '/signup';

  if (hideNav) return null;

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Listings", href: "/listings" },
    { label: "How it Works", href: "/how-it-works" },
    { label: "Messages", href: "/messages" },
    { label: "Sign In", href: "/signin" },
    { label: "Sign Up", href: "/signup" },
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
