import { HowItWorksTimeline, type TimelineStep } from '@/components/how-it-works/timeline'
import { Container, Grid, Stack } from '@/components/ui/layout'
import { Heading, Text } from '@/components/ui/typography'
import { cn } from '@/lib/utils'
import { Search, CreditCard, Home } from 'lucide-react'

interface HowItWorksSectionProps {
  title?: string
  description?: string
  steps: TimelineStep[]
  variant?: 'cards' | 'timeline'
  className?: string
}

const stepIcons = {
  discover: Search,
  book: CreditCard,
  stay: Home,
}

export function HowItWorksSection({
  title = 'How Nestly Works',
  description = 'Find, book, and stay in unique spaces around the world in three simple steps.',
  steps,
  variant = 'cards',
  className,
}: HowItWorksSectionProps) {
  return (
    <section id="how-it-works" className={cn('py-32 bg-gradient-to-b from-background via-secondary/20 to-background', className)}>
      <Container>
        <Stack gap="xl" className="text-center">
          <div className="mb-8">
            <Heading as="h2" className="mb-6 text-5xl">
              {title}
            </Heading>
            <Text muted size="lg" className="max-w-3xl mx-auto text-xl">
              {description}
            </Text>
          </div>

          {variant === 'timeline' ? (
            <HowItWorksTimeline steps={steps} />
          ) : (
            <Grid cols={3} gap="xl" className="text-left mt-12">
              {steps.map((item, index) => {
                const Icon = stepIcons[item.id as keyof typeof stepIcons] || Search;
                return (
                  <div
                    key={item.id}
                    className="group relative text-center p-10 rounded-3xl bg-background border-2 border-border hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-2"
                  >
                    {/* Number Badge */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center text-2xl font-bold shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    
                    {/* Icon */}
                    <div className="w-20 h-20 mx-auto mb-6 mt-4 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-10 h-10 text-primary" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </Grid>
          )}
        </Stack>
      </Container>
    </section>
  )
}
