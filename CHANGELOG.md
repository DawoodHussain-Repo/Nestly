# Changelog

## [Unreleased] - 2026-05-07

### Added
- **TAILWIND_V4_GUIDE.md**: Comprehensive production-scalable Tailwind v4 documentation
- **OKLCH Color System**: Perceptually uniform color tokens for consistent visual design
- **Design Token Architecture**: Three-layer system (base → semantic → component)
- **Dark Mode Support**: CSS variable-based dark mode with `.dark` class toggle
- **Custom Utilities**: Production-ready utilities using `@utility` directive
  - Typography: `body-sm/md/lg`, `label-sm/md/lg`, `heading-h1/h2/h3/h4`
  - Layout: `content-max-width`, `section-padding`, `container-section`
  - Buttons: `btn-primary`, `btn-secondary`, `btn-outlined`, `btn-sm`
  - Cards: `card`, `card-padding`
  - Inputs: `input-base`
  - Flex: `flex-center`, `flex-between`, `flex-col-center`
  - Grid: `grid-3-cols`, `grid-4-cols` (responsive)
  - Utilities: `no-scrollbar`

### Changed
- **Migrated from Tailwind v3 to v4**: CSS-native configuration via `@theme`
- **Removed tailwind.config.ts**: Configuration now lives in `app/globals.css`
- **Build Performance**: 
  - Full builds: ~5x faster
  - Incremental builds: ~100x faster (microseconds)
- **Color System**: Migrated from RGB/HSL to OKLCH for better perceptual uniformity
- **Custom Utilities**: Switched from `@apply` to `@utility` for full variant support

### Removed
- **tailwind.config.ts**: No longer needed in Tailwind v4

## [Initial] - 2026-05-07

### Added
- Initial Nestly real estate platform setup
- Next.js 16.2.4 with App Router
- Tailwind CSS v4 with PostCSS
- shadcn/ui component library
- Authentication pages (sign in/sign up)
- Listings page
- Messages page
- How It Works page
- Mock data and validators
- Responsive design system

### Fixed
- Tailwind CSS v4 compatibility issues with custom utility classes
- Build errors related to `@apply` usage in components layer
