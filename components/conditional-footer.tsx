"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./footer";

export function ConditionalFooter() {
  const pathname = usePathname();
  const hideFooter = pathname === '/signin' || pathname === '/signup' || pathname === '/messages';

  if (hideFooter) return null;
  
  return <Footer />;
}
