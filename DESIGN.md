---
name: Nestly Refined
colors:
  surface: '#faf9f9'
  surface-dim: '#dbdad9'
  surface-bright: '#faf9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f3'
  surface-container: '#efeded'
  surface-container-high: '#e9e8e8'
  surface-container-highest: '#e3e2e2'
  on-surface: '#1b1c1c'
  on-surface-variant: '#5a4040'
  inverse-surface: '#303031'
  inverse-on-surface: '#f2f0f0'
  outline: '#8e706f'
  outline-variant: '#e2bebd'
  surface-tint: '#b71f35'
  primary: '#b31c33'
  on-primary: '#ffffff'
  primary-container: '#d63849'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb3b3'
  secondary: '#5f5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e2dfde'
  on-secondary-container: '#636262'
  tertiary: '#5e5c54'
  on-tertiary: '#ffffff'
  tertiary-container: '#77746c'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad9'
  primary-fixed-dim: '#ffb3b3'
  on-primary-fixed: '#400009'
  on-primary-fixed-variant: '#920022'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#e7e2d8'
  tertiary-fixed-dim: '#cac6bd'
  on-tertiary-fixed: '#1d1c16'
  on-tertiary-fixed-variant: '#494740'
  background: '#faf9f9'
  on-background: '#1b1c1c'
  surface-variant: '#e3e2e2'
typography:
  display-lg:
    fontFamily: Noto Serif
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
  display-md:
    fontFamily: Noto Serif
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg:
    fontFamily: Noto Serif
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Noto Serif
    fontSize: 22px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Public Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Public Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Public Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-lg:
    fontFamily: Public Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Public Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  xxl: 80px
---

## Brand & Style

This design system centers on a "Modern Heritage" aesthetic, blending the warmth of high-end hospitality with the precision of contemporary digital interfaces. It targets a discerning audience that values order, elegance, and clarity. 

The style is a synthesis of **Minimalism** and **Editorial Design**. It leverages significant whitespace to allow high-quality photography to breathe, while the contrast between the serif headlines and the sans-serif UI elements creates a professional, authoritative tone. The emotional response should be one of "calm luxury"—reliable, high-contrast, and meticulously organized.

## Colors

The color palette is anchored by **Linen**, which serves as the primary canvas color to provide a softer, more premium feel than pure white. **Crimson** is the active brand color, used intentionally for primary actions and brand identifiers to maintain high impact without overwhelming the user.

**Ink** provides the grounding for typography and structural elements, ensuring accessibility through high contrast. **Stone** is reserved for secondary metadata and disabled states. The interaction of Linen and Linen Deep should be used to define different content areas or "containers within containers" without relying on heavy borders.

## Typography

This design system utilizes a dual-font strategy to balance character with utility. **Noto Serif** (Libre Baskerville equivalent) is used for all narrative elements, page titles, and property headings to evoke a sense of tradition and literary quality.

**Public Sans** (Libre Franklin equivalent) handles all functional UI tasks: navigation, forms, price tags, and dense body copy. This ensures maximum readability and a clean, institutional feel in complex data views. Maintain a strict 1.6x line height for body text to support the emphasis on whitespace and readability.

## Layout & Spacing

The layout philosophy follows a **Fixed Grid** model on desktop to preserve the intentional whitespace characteristic of high-end editorial layouts. All spacing must be a multiple of the 8px base unit.

A 12-column grid is used for property listings and search results. Use the `xxl` (80px) spacing variable between major sections to prevent the interface from feeling "crowded." Horizontal margins are generous (32px minimum) to frame the content as if it were on a gallery wall.

## Elevation & Depth

Depth is conveyed through **Tonal Layers** and **Ambient Shadows**. Surfaces should primarily use color shifts (Linen to Linen Deep) to indicate hierarchy. 

When true elevation is required—such as on cards or floating navigation bars—use extra-diffused, low-opacity shadows. Shadows should be tinted with a hint of Ink (#1A1A1A) rather than pure black to keep the effect natural. Modals and pop-overs should utilize a background blur (12px) on the overlay to maintain focus on the elevated content while preserving the "airy" feel of the platform.

## Shapes

The shape language is characterized by "progressive rounding." Smaller, interactive elements like buttons and input fields use a **Pill-shaped** (rounded-full) geometry to provide a friendly, modern touchpoint. 

Structural containers like property cards use a refined **rounded-xl** (12px) radius. Larger, high-impact components like modals and bottom sheets use a **rounded-2xl** (24px) radius to soften the high-contrast color palette and create a more inviting presence. All image containers must match the radius of their parent cards.

## Components

### Buttons & Inputs
Buttons are exclusively pill-shaped. Primary buttons use Crimson backgrounds with Linen text. Secondary buttons use Ink text with a 1px Stone border. Input fields must be pill-shaped with Linen Deep backgrounds and 16px horizontal padding to accommodate the rounded ends.

### Cards
Cards (rounded-xl) should feature a subtle 1px border using Linen Deep to define the edges against the Linen background. No shadows are used for static cards; use a soft ambient shadow only on hover states to provide tactile feedback.

### Modals
Modals utilize the rounded-2xl radius and are centered with a 40% opacity Ink backdrop. The header of the modal should use Noto Serif to maintain brand continuity.

### Selection Controls
Checkboxes and radio buttons should be Crimson when active. Toggle switches should be oversized and pill-shaped, following the "soft-touch" philosophy of the platform.

### Navigation
The primary search bar is a large, pill-shaped "floating" component that uses an ambient shadow to sit above the page content, functioning as the central hub of the user experience.