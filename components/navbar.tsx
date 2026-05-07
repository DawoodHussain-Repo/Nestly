"use client";

import Link from "next/link";

interface NavbarProps {
  activePage?: "listings" | "messages" | "home";
}

export function Navbar({ activePage = "home" }: NavbarProps) {
  const navLinks = [
    { href: "/listings", label: "Listings", key: "listings" },
    { href: "/how-it-works", label: "How it Works", key: "how" },
    { href: "/messages", label: "Messages", key: "messages" },
  ] as const;

  return (
    <header className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
        <Link
          href="/"
          className="text-2xl font-heading font-semibold tracking-tight text-foreground"
        >
          nest<span className="text-primary">ly</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activePage === link.key;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/signin"
            className="text-sm font-medium text-foreground border border-border px-4 py-2 rounded-full hover:bg-secondary transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="text-sm font-medium bg-primary text-primary-foreground px-6 py-2 rounded-full hover:bg-primary/90 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}
