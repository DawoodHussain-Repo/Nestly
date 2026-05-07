import { HowItWorksTimeline, type TimelineStep } from '@/components/how-it-works/timeline'
import { Container, Grid, Stack } from '@/components/ui/layout'
import { Heading, Text } from '@/components/ui/typography'
import { cn } from '@/lib/utils'

interface HowItWorksSectionProps {
  title?: string
  description?: string
  steps: TimelineStep[]
  variant?: 'cards' | 'timeline'
  className?: string
}

export function HowItWorksSection({
  title = 'How Nestly Works',
  description = 'Find, book, and stay in unique spaces around the world in three simple steps.',
  steps,
  variant = 'cards',
  className,
}: HowItWorksSectionProps) {
  return (
    <section id="how-it-works" className={cn('py-20 bg-secondary/30', className)}>
      <Container>
        <Stack gap="xl" className="text-center">
          <div>
            <Heading as="h2" className="mb-4">
              {title}
            </Heading>
            <Text muted size="lg" className="max-w-3xl mx-auto">
              {description}
            </Text>
          </div>

          {variant === 'timeline' ? (
            <HowItWorksTimeline steps={steps} />
          ) : (
            <Grid cols={3} gap="xl" className="text-left">
              {steps.map((item, index) => (
                <div
                  key={item.id}
                  className="text-center p-8 rounded-2xl bg-background border border-border hover:shadow-md transition-shadow"
                >
                  <span className="text-6xl md:text-7xl font-heading font-bold text-primary/20 block mb-4">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-xl md:text-2xl font-heading font-semibold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </Grid>
          )}
        </Stack>
      </Container>
    </section>
  )
}
