'use client'

import { HowItWorksSection } from '@/components/how-it-works/section'
import { Container } from '@/components/ui/layout'
import { BadgeCheck, CalendarClock, Headphones, ShieldCheck, ArrowRight, Globe, Clock, Wallet } from 'lucide-react'
import Link from 'next/link'

const steps = [
  {
    id: 'discover',
    title: 'Discover',
    description:
      'Browse verified stays across cities, beaches, and mountains. Use filters to quickly narrow by location, dates, and budget.',
  },
  {
    id: 'book',
    title: 'Book',
    description:
      'Reserve in minutes with secure checkout and transparent pricing. Get instant confirmation and host details right away.',
  },
  {
    id: 'stay',
    title: 'Stay',
    description:
      'Check in smoothly, message your host any time, and enjoy 24/7 support throughout your trip.',
  },
]

const features = [
  {
    title: 'Verified Properties',
    description: 'Every listing is personally reviewed and verified by our team to ensure quality and accuracy.',
    icon: BadgeCheck,
  },
  {
    title: 'Secure Payments',
    description: 'Your transactions are encrypted and protected. We never store your full card details.',
    icon: ShieldCheck,
  },
  {
    title: '24/7 Support',
    description: 'Our dedicated support team is available around the clock to help with any issue.',
    icon: Headphones,
  },
  {
    title: 'Flexible Cancellation',
    description: 'Life happens. Most bookings offer free cancellation up to 48 hours before check-in.',
    icon: CalendarClock,
  },
]

const stats = [
  { value: '50K+', label: 'Properties worldwide', icon: Globe },
  { value: '4.9★', label: 'Average guest rating', icon: BadgeCheck },
  { value: '<2min', label: 'Average booking time', icon: Clock },
  { value: '$0', label: 'Booking fees, ever', icon: Wallet },
]

export default function HowItWorksPage() {
  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col antialiased">
      <div className="h-28" />

      <main className="flex-grow">
        {/* Hero */}
        <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4">How Nestly works</p>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-5 leading-tight">
                Your next stay is just<br />three steps away
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
                We&apos;ve designed every part of the experience to be fast, transparent, and stress-free.
              </p>
            </div>
          </Container>
        </section>

        {/* Stats bar */}
        <section className="border-y border-border/40 bg-card">
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border/40">
              {stats.map((stat) => (
                <div key={stat.label} className="py-8 px-6 text-center">
                  <p className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-1">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Timeline Steps */}
        <HowItWorksSection
          title="Three simple steps"
          description="From browsing to check-in, here's how the entire process works."
          steps={steps}
          variant="timeline"
          className="py-24"
        />

        {/* Why choose us */}
        <section className="py-20 bg-secondary/10">
          <Container>
            <div className="text-center mb-12">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4">Why Nestly</p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Built for travelers who care
              </h2>
              <p className="text-base text-muted-foreground max-w-xl mx-auto">
                Every feature exists because travelers asked for it.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, idx) => (
                <div
                  key={feature.title}
                  className="flex gap-5 p-6 rounded-2xl bg-card border border-border/40 hover:border-primary/20 hover:shadow-sm transition-all group"
                >
                  <div className="w-12 h-12 flex-shrink-0 bg-primary/8 rounded-xl flex items-center justify-center group-hover:bg-primary/12 transition-colors">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-heading font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto text-center bg-foreground rounded-3xl px-8 py-16 relative overflow-hidden">
            <div className="absolute top-6 left-6 w-2 h-2 bg-background/10 rounded-full" />
            <div className="absolute top-6 right-6 w-2 h-2 bg-background/10 rounded-full" />
            <div className="absolute bottom-6 left-6 w-2 h-2 bg-background/10 rounded-full" />
            <div className="absolute bottom-6 right-6 w-2 h-2 bg-background/10 rounded-full" />

            <h2 className="font-heading text-3xl text-background font-bold mb-3">
              Ready to explore?
            </h2>
            <p className="text-sm text-background/60 mb-7 max-w-md mx-auto">
              Browse thousands of verified properties and book your next adventure today.
            </p>
            <Link
              href="/listings"
              className="inline-flex items-center gap-2 rounded-full bg-background text-foreground px-7 py-3 text-sm font-semibold hover:opacity-90 transition-opacity group"
            >
              Browse Properties
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
