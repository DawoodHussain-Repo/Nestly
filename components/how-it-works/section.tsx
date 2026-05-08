import { HowItWorksTimeline, type TimelineStep } from '@/components/how-it-works/timeline'
import { Container, Stack } from '@/components/ui/layout'
import { cn } from '@/lib/utils'
import { Compass, CalendarCheck, Key, ArrowRight } from 'lucide-react'

interface HowItWorksSectionProps {
  title?: string
  description?: string
  steps: TimelineStep[]
  variant?: 'cards' | 'timeline'
  className?: string
}

const stepIcons = {
  discover: Compass,
  book: CalendarCheck,
  stay: Key,
}

export function HowItWorksSection({
  title = 'Three steps to extraordinary.',
  description = 'Find, book, and stay in unique spaces around the world in three simple steps.',
  steps,
  variant = 'cards',
  className,
}: HowItWorksSectionProps) {
  return (
    <section id="how-it-works" className={cn('py-24 bg-secondary/10', className)}>
      <Container>
        <Stack gap="xl" className="text-center">
          <div className="mb-16 md:mb-24 space-y-4">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4">Your Journey</p>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              {title}
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              {description}
            </p>
          </div>

          {variant === 'timeline' ? (
            <HowItWorksTimeline steps={steps} />
          ) : (
            <div className="relative mt-8">
              {/* Continuous Connecting Line (Desktop Only) */}
              <div className="absolute top-12 left-[10%] right-[10%] h-[2px] hidden md:block">
                {/* Base dashed line */}
                <div className="absolute inset-0 border-t-2 border-dashed border-border" />
                {/* Gradient overlay for visual interest */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-left">
                {steps.map((item, index) => {
                  const Icon = stepIcons[item.id as keyof typeof stepIcons] || Compass;
                  const stepNumber = String(index + 1).padStart(2, '0');
                  return (
                    <div 
                      key={item.id} 
                      className="group relative flex flex-col pt-8 md:pt-0"
                    >
                      {/* Card Content (z-10) */}
                      <div className="relative z-10 flex flex-col h-full min-h-[340px] bg-card/80 backdrop-blur-xl rounded-3xl p-8 shadow-sm border border-border/60 transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-1 group-hover:border-primary/20">
                        
                        {/* Icon & Chapter Badge */}
                        <div className="relative z-10 flex items-center justify-between mb-10">
                          {/* Pill-shaped icon container */}
                          <div className="w-20 h-12 shrink-0 rounded-full flex items-center justify-center bg-primary/10 transition-transform duration-500 group-hover:scale-105">
                            <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                              Chapter
                            </span>
                            <span className="text-sm font-heading font-medium text-foreground bg-secondary px-2 py-1 rounded-md">
                              {stepNumber}
                            </span>
                          </div>
                        </div>

                        {/* Text Content */}
                        <div className="relative z-10 flex-grow">
                          <h3 className="text-2xl font-heading font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed text-sm">
                            {item.description}
                          </p>
                        </div>

                        {/* Subtle storytelling interaction at the bottom */}
                        <div className="relative z-10 mt-8 pt-6 border-t border-border/60 flex items-center justify-between opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            {index === steps.length - 1 ? 'Your destination' : 'Next chapter'}
                          </span>
                          {index !== steps.length - 1 && (
                            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                          )}
                        </div>

                        {/* Decorative gradient blur behind the card on hover */}
                        <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </Stack>
      </Container>
    </section>
  )
}
