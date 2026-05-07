"use client";

import Link from "next/link";

interface NavbarProps {
  activePage?: "listings" | "messages" | "home";
}

export function Navbar({ activePage = "home" }: NavbarProps) {
  return (
    <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-md shadow-sm">
      <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
        <Link
          href="/"
          className="text-headline-lg font-headline-lg tracking-tight text-on-surface italic"
        >
          nest<span className="text-primary">ly</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/listings"
            className={`text-label-lg font-label-lg transition-colors ${
              activePage === "listings"
                ? "text-primary border-b-2 border-primary pb-1"
                : "text-secondary hover:text-primary"
            }`}
          >
            Listings
          </Link>
          <Link
            href="/how-it-works"
            className="text-label-lg font-label-lg text-secondary hover:text-primary transition-colors"
          >
            How it Works
          </Link>
          <Link
            href="/messages"
            className={`text-label-lg font-label-lg transition-colors ${
              activePage === "messages"
                ? "text-primary border-b-2 border-primary pb-1"
                : "text-secondary hover:text-primary"
            }`}
          >
            Messages
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/signin"
            className="text-label-lg font-label-lg text-on-surface border border-outline px-4 py-2 rounded-full hover:bg-surface-container transition-all duration-200"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="text-label-lg font-label-lg bg-primary text-on-primary px-6 py-2 rounded-full hover:bg-primary-container transition-all duration-200"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}
