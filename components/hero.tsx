'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Link from 'next/link'
import { Search } from 'lucide-react'

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Animate elements on mount
    const tl = gsap.timeline()

    tl.from(headingRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
    })
      .from(
        subtitleRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: 'power3.out',
        },
        '-=0.4'
      )
      .from(
        searchRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: 'power3.out',
        },
        '-=0.4'
      )
      .from(
        buttonsRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: 'power3.out',
        },
        '-=0.4'
      )
  }, [])

  return (
    <section ref={containerRef} className="section-padding" style={{ backgroundImage: 'linear-gradient(to bottom, var(--linen), var(--background))' }}>
      <div className="content-max-width flex flex-col items-center text-center">
        {/* Heading */}
        <h1
          ref={headingRef}
          className="heading-h1 mb-4 max-w-3xl"
        >
          Discover Your Next Home Away
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="body-lg mb-8 max-w-2xl text-muted-foreground"
        >
          Explore unique properties from local hosts in unique destinations across the globe.
        </p>

        {/* Search Bar */}
        <div
          ref={searchRef}
          className="w-full max-w-2xl mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-2 bg-white p-2 rounded-sm border border-border shadow-sm">
            <input
              type="text"
              placeholder="Where do you want to go?"
              className="flex-1 px-4 py-3 font-sans text-base text-foreground placeholder-muted-foreground outline-none"
            />
            <button className="btn-primary btn-sm flex-center gap-2">
              <Search size={18} />
              <span>Search</span>
            </button>
          </div>
        </div>

        {/* CTA Buttons */}
        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4">
          <Link href="/explore" className="btn-primary">
            Explore Properties
          </Link>
          <Link href="/become-host" className="btn-secondary">
            Become a Host
          </Link>
        </div>
      </div>
    </section>
  )
}
