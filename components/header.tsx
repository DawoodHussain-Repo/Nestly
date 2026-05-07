'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="content-max-width">
        <nav className="flex-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-sm flex-center">
              <span className="text-white font-serif font-bold text-lg">N</span>
            </div>
            <span className="font-serif text-xl font-bold text-foreground hidden sm:inline">Nestly</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="body-sm text-foreground hover:text-primary transition-colors">
              Explore
            </Link>
            <Link href="/" className="body-sm text-foreground hover:text-primary transition-colors">
              Become a Host
            </Link>
            <Link href="/" className="body-sm text-foreground hover:text-primary transition-colors">
              Help
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            <Link href="/signin" className="btn-outlined btn-sm hidden sm:inline-flex">
              Sign In
            </Link>
            <Link href="/signup" className="btn-primary btn-sm">
              Sign Up
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-foreground hover:bg-muted rounded-sm transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-border">
            <Link href="/" className="block py-3 body-sm text-foreground hover:text-primary">
              Explore
            </Link>
            <Link href="/" className="block py-3 body-sm text-foreground hover:text-primary">
              Become a Host
            </Link>
            <Link href="/" className="block py-3 body-sm text-foreground hover:text-primary">
              Help
            </Link>
            <Link href="/signin" className="block py-3 body-sm text-foreground hover:text-primary">
              Sign In
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
