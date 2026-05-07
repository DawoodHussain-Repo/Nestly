# Components Conventions

## Primitive vs Feature Components

- Create or extend a primitive in `components/ui/` when:
  - The same visual structure appears in 2+ places.
  - The same Tailwind classes are copy-pasted with minor differences.
  - The component is generic (buttons, fields, cards, badges, layout primitives, typography).
- Create a feature component (outside `components/ui/`) when:
  - It contains domain-specific composition (for example `how-it-works/section`).
  - It depends on feature-specific data shape or route-level behavior.
- Prefer extending an existing primitive with `className` and composition before creating new primitives.

## Naming Conventions

- Component names: PascalCase exports (for example `PropertyCard`, `HowItWorksSection`).
- File names:
  - `components/ui/`: kebab-case files (for example `form-controls.tsx`, `typography.tsx`).
  - Feature folders: kebab-case directories and files.
- Hooks: `use-*.ts` file names with `useXxx` export (for example `use-password-visibility.ts`).

## Shared Types

- Shared app/domain types live in `lib/` (for example `lib/mock-data.ts`).
- Primitive-level types stay close to component files unless reused by multiple features.
- Avoid duplicating interface definitions across pages; extract shared interfaces when reused in 2+ files.

## Styling Rules

- No inline styles in JSX.
- All variants must flow through props (`variant`, `size`, `tone`, etc.).
- All primitives must accept `className` for extension.
- Use `forwardRef` for DOM-backed primitives where refs are expected.
- Use token-based Tailwind utility classes (`bg-background`, `text-foreground`, `border-border`, etc.) consistently.

## Composition Rules

- Prefer composition over large prop matrices.
- Keep components small and focused; split when behavior or view responsibility diverges.
- If uncertain whether two patterns should be merged, add:

```ts
// TODO: consider merging
```
