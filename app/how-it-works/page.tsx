'use client'

import { HowItWorksSection } from '@/components/how-it-works/section'
import { BadgeCheck, CalendarClock, Headphones, ShieldCheck } from 'lucide-react'

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

export default function HowItWorksPage() {
  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col antialiased">
      {/* Spacer for fixed pill nav */}
      <div className="h-28" />

      <main className="flex-grow">
        <HowItWorksSection
          title="Three simple steps to your next stay"
          description="Nestly makes finding and booking unique spaces effortless. Here is how it works."
          steps={steps}
          variant="timeline"
          className="pt-24"
        />

        <section className="py-20 px-6 bg-secondary/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-4">
                Why travelers choose Nestly
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We have built every feature with your comfort and security in mind.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="p-6 rounded-2xl bg-background border border-border"
                >
                  <div className="w-12 h-12 mb-4 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <h4 className="text-xl font-heading text-foreground mb-2">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
