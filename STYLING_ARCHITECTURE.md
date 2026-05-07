# Production-Grade Styling Architecture

## Overview
This document outlines the enterprise-grade styling architecture implemented for Nestly, following the "single point of change" design principle.

## Architecture Stack
- **Tailwind CSS v4** - CSS-based configuration (no JS config file needed)
- **CSS Variables** - HSL format for opacity support
- **tailwind-merge** - Intelligent class merging
- **class-variance-authority (cva)** - Type-safe component variants
- **clsx** - Conditional class composition

## Key Principles

### 1. Single Point of Change
All colors are defined as CSS variables in `app/globals.css`. Changing the brand color requires updating only the CSS variable, not individual components.

```css
:root {
  --primary: 350 72% 41%;  /* Airbnb red - change here to rebrand entire app */
}
```

### 2. No Hardcoded Colors
Components MUST use Tailwind classes that reference CSS variables:
- ✅ `bg-primary` (uses CSS variable)
- ❌ `bg-[#B31C33]` (hardcoded hex)
- ❌ `bg-red-500` (hardcoded Tailwind color)

### 3. HSL Format for Opacity
CSS variables use HSL format without the `hsl()` wrapper, enabling opacity modifiers:

```tsx
<div className="bg-primary/50">  {/* 50% opacity */}
<div className="bg-primary/90">  {/* 90% opacity */}
```

### 4. Component Variants with CVA
Use `class-variance-authority` for component variants, never complex ternaries:

```tsx
// ✅ Good - using cva
const buttonVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground",
        outline: "border bg-background"
      }
    }
  }
)

// ❌ Bad - complex ternaries
className={variant === 'primary' ? 'bg-primary' : 'border bg-background'}
```

### 5. Class Merging with cn()
Always use the `cn()` utility for className composition:

```tsx
import { cn } from '@/lib/utils'

<Button className={cn(buttonVariants({ variant }), "custom-class")} />
```

## File Structure

```
app/
  globals.css              # Design tokens (CSS variables)
lib/
  utils.ts                 # cn() utility function
components/
  ui/                      # Primitive components (Button, Input, etc.)
    button.tsx             # Uses cva for variants
  layout/                  # Layout wrappers
    container.tsx          # Airbnb-style max-width container
  home/                    # Feature-specific components
```

## Design Tokens (app/globals.css)

### Color Variables
```css
:root {
  /* Base */
  --background: 36 100% 97%;
  --foreground: 0 0% 10%;
  
  /* Primary - Airbnb red/pink */
  --primary: 350 72% 41%;
  --primary-foreground: 0 0% 100%;
  
  /* Secondary - Warm beige */
  --secondary: 40 50% 93%;
  --secondary-foreground: 0 0% 10%;
  
  /* Muted - Subtle backgrounds */
  --muted: 40 50% 93%;
  --muted-foreground: 0 0% 53%;
  
  /* Accent */
  --accent: 350 72% 41%;
  --accent-foreground: 0 0% 100%;
  
  /* Destructive - Error states */
  --destructive: 355 65% 51%;
  --destructive-foreground: 0 0% 100%;
  
  /* UI Elements */
  --border: 40 40% 88%;
  --input: 40 50% 93%;
  --ring: 350 72% 41%;
  
  /* Border radius */
  --radius: 0.75rem;
}
```

### Tailwind v4 Configuration
Tailwind v4 uses CSS-based configuration via `@theme inline`:

```css
@theme inline {
  --color-primary: hsl(var(--primary));
  --color-primary-foreground: hsl(var(--primary-foreground));
  /* ... other color mappings */
  
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}
```

## Core Utilities

### cn() Function (lib/utils.ts)
```typescript
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Purpose:** Safely merge Tailwind classes, resolving conflicts intelligently.

## Component Patterns

### Button Component (components/ui/button.tsx)
Demonstrates the complete pattern:

```typescript
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all",
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        outline: 'border bg-background hover:bg-accent',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 px-3',
        lg: 'h-10 px-6',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
)

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)
```

### Container Component (components/layout/container.tsx)
Airbnb-style responsive container:

```typescript
import { cn } from '@/lib/utils'

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
```

## Usage Examples

### Rebranding the App
To change from Airbnb red to Booking.com blue:

```css
/* app/globals.css */
:root {
  --primary: 213 94% 42%;  /* Booking.com blue */
}
```

That's it! All components automatically update.

### Using Opacity Modifiers
```tsx
<div className="bg-primary/10">     {/* 10% opacity */}
<div className="bg-primary/50">     {/* 50% opacity */}
<div className="bg-primary/90">     {/* 90% opacity */}
<div className="border-primary/20"> {/* 20% opacity border */}
```

### Creating New Components
```tsx
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground",
  {
    variants: {
      padding: {
        none: "p-0",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      padding: "md",
    },
  },
)

export function Card({ className, padding, ...props }: CardProps) {
  return (
    <div
      className={cn(cardVariants({ padding, className }))}
      {...props}
    />
  )
}
```

## Best Practices

### ✅ Do
- Use CSS variables for all colors
- Use `cn()` for className composition
- Use `cva` for component variants
- Use HSL format for opacity support
- Keep design tokens in `globals.css`
- Use semantic color names (primary, secondary, muted)

### ❌ Don't
- Hardcode hex colors in components
- Use `@apply` for component states
- Write complex ternaries for className logic
- Use hardcoded Tailwind colors (red-500, blue-600)
- Duplicate color definitions across files

## Migration Checklist

- [x] Install dependencies (clsx, tailwind-merge, cva, lucide-react)
- [x] Set up directory structure (lib/, components/ui/, components/layout/)
- [x] Create design token system in globals.css (HSL format)
- [x] Configure Tailwind v4 with @theme inline
- [x] Create cn() utility in lib/utils.ts
- [x] Update Button component with cva
- [x] Create Container layout component
- [x] Remove hardcoded colors from all components
- [x] Verify opacity modifiers work correctly

## Tailwind v4 Notes

This project uses **Tailwind CSS v4**, which has significant differences from v3:

1. **No JavaScript config file** - Configuration is done in CSS using `@theme`
2. **CSS-first approach** - All customization happens in `globals.css`
3. **Native CSS variables** - Direct integration with CSS custom properties
4. **Simplified setup** - No need for `tailwind.config.js/ts`

The `@theme inline` directive in `globals.css` handles all theme configuration that would traditionally be in `tailwind.config.js`.

## Support

For questions about this architecture:
1. Review this document
2. Check `app/globals.css` for design tokens
3. Reference `components/ui/button.tsx` for the pattern
4. Use `lib/utils.ts` for the cn() utility

---

**Last Updated:** May 8, 2026
**Architecture Status:** ✅ Complete
