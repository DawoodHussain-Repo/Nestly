# Tailwind v4 Production Setup - Nestly

This project uses **Tailwind CSS v4** with production-scalable best practices.

## Key Changes from v3

1. **No `tailwind.config.js`** - Configuration is now CSS-native via `@theme`
2. **Rust-based build engine** - 5x faster full builds, 100x faster incremental builds
3. **CSS variables at runtime** - Design tokens are real CSS variables
4. **`@utility` instead of `@apply`** - Custom utilities support all variants

## Architecture

### Design Token Layers

```
Base Tokens → Semantic Tokens → Component Tokens
```

- **Base**: Raw color values (e.g., `--color-primary-500`)
- **Semantic**: Purpose-driven (e.g., `--color-primary`, `--color-surface`)
- **Component**: Specific use cases (e.g., `--color-card`, `--color-input`)

### File Structure

```
app/
├── globals.css          ← All @theme tokens + @utility definitions
└── layout.tsx

lib/
└── utils.ts             ← cn() helper for safe class merging

components/
├── ui/                  ← Primitive components (Button, Input, Card)
└── features/            ← Composed feature components
```

## Core Concepts

### 1. Design Tokens via @theme

All design tokens are defined in `app/globals.css`:

```css
@theme {
  /* Colors use OKLCH for perceptual consistency */
  --color-primary-500: oklch(0.55 0.18 15);
  --color-primary: var(--color-primary-500);
  
  /* Typography */
  --font-sans: 'Public Sans', system-ui, sans-serif;
  
  /* Spacing */
  --spacing-md: 1rem;
  
  /* Radius */
  --radius-md: 0.5rem;
}
```

### 2. Dark Mode

Dark mode uses CSS variable overrides:

```css
@variant dark (&:where(.dark, .dark *));

.dark {
  --color-background: oklch(0.15 0 0);
  --color-on-background: oklch(0.95 0 0);
}
```

Toggle dark mode by adding/removing the `dark` class on the root element.

### 3. Custom Utilities

Use `@utility` for custom classes that need variant support:

```css
@utility btn-primary {
  background-color: var(--color-primary);
  color: var(--color-on-primary);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
}
```

Now you can use: `hover:btn-primary`, `dark:btn-primary`, `md:btn-primary`

### 4. Safe Class Merging

Always use the `cn()` helper for dynamic classes:

```tsx
import { cn } from '@/lib/utils';

// ✅ Good - Static class names
<div className={cn('btn-primary', isActive && 'opacity-50')} />

// ❌ Bad - Dynamic class generation (won't work in production)
<div className={`text-${color}-500`} />

// ✅ Good - Use a map instead
const colorMap = {
  red: 'text-red-500',
  blue: 'text-blue-500',
};
<div className={colorMap[color]} />
```

## Component Patterns

### Variant-Based Components

```tsx
import { cn } from '@/lib/utils';

const variants = {
  primary: 'bg-[--color-primary] text-[--color-on-primary]',
  secondary: 'bg-[--color-secondary] text-[--color-on-secondary]',
  ghost: 'bg-transparent border border-[--color-outline]',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  className, 
  ...props 
}) {
  return (
    <button
      className={cn(
        'rounded-[--radius-md] font-semibold transition-opacity',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}
```

### Container Queries

Use container queries for truly reusable components:

```tsx
<div className="@container">
  <div className="grid grid-cols-1 @md:grid-cols-2 @lg:grid-cols-3">
    {/* Cards adapt to container, not viewport */}
  </div>
</div>
```

## Available Custom Utilities

### Typography
- `body-sm`, `body-md`, `body-lg`
- `label-sm`, `label-md`, `label-lg`
- `heading-h1`, `heading-h2`, `heading-h3`, `heading-h4`

### Layout
- `content-max-width` - Max-width container with auto margins
- `section-padding` - Standard section padding (3rem)
- `section-padding-lg` - Large section padding (5rem)
- `container-section` - Full container with max-width and padding

### Buttons
- `btn-primary` - Primary button style
- `btn-secondary` - Secondary button style
- `btn-outlined` - Outlined button style
- `btn-sm` - Small button size modifier

### Cards
- `card` - Card container with border and shadow
- `card-padding` - Standard card padding

### Inputs
- `input-base` - Base input styling with focus states

### Flex
- `flex-center` - Center items both axes
- `flex-between` - Space between with center alignment
- `flex-col-center` - Column flex with center alignment

### Grid
- `grid-3-cols` - Responsive 3-column grid
- `grid-4-cols` - Responsive 4-column grid

### Utilities
- `no-scrollbar` - Hide scrollbar

## Color System

### OKLCH Benefits

We use OKLCH color space for:
- **Perceptual uniformity** - Equal lightness values look equally bright
- **Wider gamut** - Access to more vibrant colors
- **Better interpolation** - Smooth gradients and transitions

### Color Token Structure

```
--color-primary-50   (lightest)
--color-primary-100
...
--color-primary-500  (base)
...
--color-primary-900  (darkest)

--color-primary      (semantic alias to -500)
--color-on-primary   (text color on primary)
```

## Production Checklist

- ✅ All design tokens in `@theme`
- ✅ No `tailwind.config.js` (v4 auto-scans)
- ✅ `@utility` for custom utilities (not `@apply`)
- ✅ `cn()` helper for safe class merging
- ✅ Static class names only (no dynamic generation)
- ✅ OKLCH colors for perceptual consistency
- ✅ Dark mode via CSS variable overrides
- ✅ Container queries for portable components

## Build Performance

Tailwind v4 build times:
- **Full builds**: ~5x faster than v3
- **Incremental builds**: ~100x faster (microseconds)
- **No JavaScript config**: Faster startup and HMR

## Browser Support

Tailwind v4 targets modern browsers (last 3 years). If you need to support older browsers (IE11, older Safari), consider staying on v3.

## Resources

- [Tailwind v4 Docs](https://tailwindcss.com/docs)
- [OKLCH Color Picker](https://oklch.com/)
- [Container Queries Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries)
