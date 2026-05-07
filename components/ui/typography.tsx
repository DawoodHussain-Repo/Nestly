import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * Heading primitive for standardized typography scale.
 * Supports semantic levels `h1`..`h6`.
 */
export const Heading = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  }
>(({ as: Comp = 'h2', className, ...props }, ref) => {
  const sizeClass: Record<string, string> = {
    h1: 'text-4xl md:text-6xl font-heading',
    h2: 'text-3xl md:text-4xl font-heading',
    h3: 'text-2xl md:text-3xl font-heading',
    h4: 'text-xl md:text-2xl font-heading',
    h5: 'text-lg font-heading',
    h6: 'text-base font-heading',
  }
  return <Comp ref={ref} className={cn(sizeClass[Comp], 'text-foreground', className)} {...props} />
})
Heading.displayName = 'Heading'

/**
 * Body text primitive for consistent copy styles.
 */
export const Text = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & {
    muted?: boolean
    size?: 'sm' | 'md' | 'lg'
  }
>(({ className, muted, size = 'md', ...props }, ref) => {
  const sizeClass = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base'
  return (
    <p
      ref={ref}
      className={cn(sizeClass, muted ? 'text-muted-foreground' : 'text-foreground', className)}
      {...props}
    />
  )
})
Text.displayName = 'Text'

/**
 * Label text primitive for forms and compact metadata labels.
 */
export const LabelText = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => {
  return <span ref={ref} className={cn('text-sm font-medium text-foreground', className)} {...props} />
})
LabelText.displayName = 'LabelText'
