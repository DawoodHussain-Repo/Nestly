import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * Container primitive for max-width constrained page sections.
 */
export const Container = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { size?: 'md' | 'lg' | 'xl' | '2xl' }
>(({ className, size = 'xl', ...props }, ref) => {
  const widthClass =
    size === 'md'
      ? 'max-w-3xl'
      : size === 'lg'
        ? 'max-w-5xl'
        : size === '2xl'
          ? 'max-w-[90rem]'
          : 'max-w-7xl'
  return <div ref={ref} className={cn('mx-auto w-full px-6', widthClass, className)} {...props} />
})
Container.displayName = 'Container'

/**
 * Stack primitive for vertical spacing layouts.
 */
export const Stack = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { gap?: 'sm' | 'md' | 'lg' | 'xl' }
>(({ className, gap = 'md', ...props }, ref) => {
  const gapClass = gap === 'sm' ? 'gap-2' : gap === 'lg' ? 'gap-6' : gap === 'xl' ? 'gap-10' : 'gap-4'
  return <div ref={ref} className={cn('flex flex-col', gapClass, className)} {...props} />
})
Stack.displayName = 'Stack'

/**
 * Grid primitive for repeatable responsive column layouts.
 */
export const Grid = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { cols?: 1 | 2 | 3 | 4; gap?: 'sm' | 'md' | 'lg' | 'xl' }
>(({ className, cols = 3, gap = 'md', ...props }, ref) => {
  const colClass =
    cols === 1
      ? 'grid-cols-1'
      : cols === 2
        ? 'grid-cols-1 md:grid-cols-2'
        : cols === 4
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
          : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  const gapClass = gap === 'sm' ? 'gap-2' : gap === 'lg' ? 'gap-6' : gap === 'xl' ? 'gap-10' : 'gap-4'
  return <div ref={ref} className={cn('grid', colClass, gapClass, className)} {...props} />
})
Grid.displayName = 'Grid'
