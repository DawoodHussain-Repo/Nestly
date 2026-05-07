import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

/**
 * Airbnb-style max-width container component.
 * Provides consistent padding and centering across all screen sizes.
 * 
 * @example
 * <Container>
 *   <YourContent />
 * </Container>
 * 
 * @example With custom className
 * <Container className="py-8">
 *   <YourContent />
 * </Container>
 */
export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn(
        'max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4',
        className
      )}
    >
      {children}
    </div>
  )
}
