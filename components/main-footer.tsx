"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./footer";

export function MainFooter() {
  const pathname = usePathname();
  const hideFooter = pathname === '/messages';

  if (hideFooter) return null;
  
  return <Footer />;
}
