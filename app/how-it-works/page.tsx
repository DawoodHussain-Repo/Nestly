'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

const steps = [
  {
    number: '01',
    title: 'Discover',
    description:
      'Browse thousands of verified properties across every category imaginable — from cozy cabins to luxury penthouses. Filter by location, price, amenities, and more to find your perfect stay.',
    icon: 'search',
  },
  {
    number: '02',
    title: 'Book',
    description:
      'Reserve instantly with secure payments and flexible cancellation policies. Our transparent pricing means no hidden fees — what you see is what you pay.',
    icon: 'calendar_month',
  },
  {
    number: '03',
    title: 'Stay',
    description:
      'Enjoy your trip with 24/7 support and a seamless check-in experience. Message your host anytime and get local recommendations for an unforgettable stay.',
    icon: 'hotel',
  },
]

const features = [
  {
    title: 'Verified Properties',
    description: 'Every listing is personally reviewed and verified by our team to ensure quality and accuracy.',
    icon: 'verified',
  },
  {
    number: '',
    title: 'Secure Payments',
    description: 'Your transactions are encrypted and protected. We never store your full card details.',
    icon: 'lock',
  },
  {
    title: '24/7 Support',
    description: 'Our dedicated support team is available around the clock to help with any issue.',
    icon: 'support_agent',
  },
  {
    title: 'Flexible Cancellation',
    description: 'Life happens. Most bookings offer free cancellation up to 48 hours before check-in.',
    icon: 'event_repeat',
  },
]

export default function HowItWorksPage() {
  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col antialiased">
      <Navbar activePage="home" />

      <main className="flex-grow pt-[72px]">
        {/* Hero */}
        <section className="bg-surface-container-low py-xxl px-lg relative overflow-hidden">
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <span className="text-label-sm font-label-sm tracking-widest text-secondary uppercase block mb-sm">
              HOW IT WORKS
            </span>
            <h1 className="text-display-lg font-display-lg text-on-surface max-w-3xl mx-auto mb-lg">
              Three simple steps to your next stay
            </h1>
            <p className="text-body-lg font-body-lg text-secondary max-w-2xl mx-auto">
              Nestly makes finding and booking unique spaces effortless. Here is how it works.
            </p>
          </div>

          <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-primary-fixed/20 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 bg-surface-variant rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        </section>

        {/* Steps */}
        <section className="py-xxl px-lg max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-xl">
            {steps.map((step) => (
              <div
                key={step.number}
                className="text-center p-lg rounded-xl bg-surface-container-lowest border border-surface-variant relative"
              >
                <div className="w-16 h-16 mx-auto mb-md bg-primary-container rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-primary-container text-3xl">
                    {step.icon}
                  </span>
                </div>
                <span className="text-display-md font-display-md text-primary/20 block mb-sm">
                  {step.number}
                </span>
                <h3 className="text-headline-md font-headline-md text-on-surface mb-sm">
                  {step.title}
                </h3>
                <p className="text-body-md font-body-md text-secondary">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-xxl px-lg bg-surface">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-xl">
              <h2 className="text-headline-lg font-headline-lg text-on-surface mb-sm">
                Why travelers choose Nestly
              </h2>
              <p className="text-body-lg font-body-lg text-secondary max-w-2xl mx-auto">
                We have built every feature with your comfort and security in mind.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="p-lg rounded-xl bg-surface-container-lowest border border-surface-variant"
                >
                  <div className="w-12 h-12 mb-sm bg-primary-container rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-primary-container text-xl">
                      {feature.icon}
                    </span>
                  </div>
                  <h4 className="text-headline-md font-headline-md text-on-surface mb-xs">
                    {feature.title}
                  </h4>
                  <p className="text-body-sm font-body-sm text-secondary">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
