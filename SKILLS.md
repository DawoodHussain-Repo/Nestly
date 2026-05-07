---
name: code-quality
description: "Apply this skill on every code generation or editing task. Enforces production-level architecture: small focused files, strict separation of concerns, typed contracts, error boundaries, environment handling, and documentation conventions. Use for Next.js / React / TypeScript projects but principles apply to any stack."
---

# Code Quality & Production Architecture

## Core Philosophy

> One file = one responsibility. If you have to scroll to understand a file, it's already too large.

Every file should answer one question clearly. Split early, merge never.

---

## File Size Limits

| File Type | Hard Limit | Trigger to Split |
|-----------|-----------|-----------------|
| React component | 120 lines | Component has >1 logical section |
| API route handler | 60 lines | Handler does >1 thing |
| Utility/helper | 80 lines | >3 unrelated helpers in one file |
| Type definition file | 100 lines | Mixing domain types |
| Hook | 60 lines | Hook manages >1 concern |
| Service/lib module | 100 lines | Module has side effects + logic |

**When a file hits its limit — stop and split before continuing.**

---

## Project Structure

```
/app                    — Next.js routes only (no logic here)
  /api
    /auth
      /signup
        route.ts        — parse → validate → call service → respond
      /listings
        route.ts
  /(pages)
    /dashboard
      page.tsx          — layout + data fetch only
      loading.tsx
      error.tsx

/components
  /ui                   — stateless, dumb, reusable primitives
    Button.tsx
    Input.tsx
    Badge.tsx
  /features             — smart, domain-aware components
    /listings
      ListingCard.tsx
      ListingsGrid.tsx
    /auth
      SignupForm.tsx

/hooks                  — one hook per file, one concern per hook
  useListings.ts
  useAuth.ts
  useDebounce.ts

/services               — all external I/O lives here (API calls, DB, auth)
  listings.service.ts
  auth.service.ts

/lib                    — pure utilities, no side effects
  cn.ts
  formatPrice.ts
  validators.ts

/types                  — domain types, no logic
  listing.types.ts
  auth.types.ts
  api.types.ts

/constants              — magic values, enums, config keys
  routes.ts
  config.ts
```

**Rule:** App router files (`page.tsx`, `route.ts`, `layout.tsx`) contain zero business logic. They call services and render components only.

---

## Component Rules

### Anatomy of a clean component

```tsx
// ✅ GOOD — ListingCard.tsx (~40 lines, one job)
import type { Listing } from '@/types/listing.types'
import { formatPrice } from '@/lib/formatPrice'
import { Badge } from '@/components/ui/Badge'

interface ListingCardProps {
  listing: Listing
  onWishlist?: (id: string) => void
}

export function ListingCard({ listing, onWishlist }: ListingCardProps) {
  return (
    <div className="listing-card ...">
      {/* markup only — no data fetching, no business logic */}
    </div>
  )
}
```

```tsx
// ❌ BAD — component doing too many things
export function ListingCard({ id }) {
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => { fetch(`/api/listings/${id}`).then(...) }, [id])
  // 80 more lines of formatting, error UI, wishlist logic...
}
```

### Split triggers

Split a component when it has:
- Its own `useState` + `useEffect` that could be a hook
- A section with its own conditional render tree
- Props passed down 2+ levels without use at intermediate levels (prop drill → extract or use context)

---

## API Route Rules

Every route handler follows the same 4-step shape:

```ts
// app/api/listings/route.ts
import { NextResponse } from 'next/server'
import { validateCreateListing } from '@/lib/validators'
import { createListing } from '@/services/listings.service'
import type { ApiResponse } from '@/types/api.types'

export async function POST(req: Request) {
  // 1. Parse
  const body = await req.json()

  // 2. Validate
  const { data, error } = validateCreateListing(body)
  if (error) return NextResponse.json({ error }, { status: 400 })

  // 3. Call service
  const result = await createListing(data)

  // 4. Respond
  return NextResponse.json({ data: result }, { status: 201 })
}
```

**Never put DB queries, fetch calls, or business rules directly in a route handler.**

---

## Service Layer Rules

Services own all side effects. They are the only files allowed to call external APIs, databases, or third-party SDKs.

```ts
// services/listings.service.ts
import type { Listing, CreateListingInput } from '@/types/listing.types'

export async function getListings(): Promise<Listing[]> {
  // fetch / db query here
}

export async function createListing(input: CreateListingInput): Promise<Listing> {
  // validation of domain rules (not HTTP concerns) here
}
```

**Services never import from `/components` or `/app`.**

---

## Type Conventions

```ts
// types/listing.types.ts

// Domain model — what the DB/API returns
export interface Listing {
  id: string
  title: string
  price: number
  location: string
  category: ListingCategory
  rating: number
  reviewCount: number
  imageUrl: string
  hostName: string
}

// Input types — what the user/form sends
export interface CreateListingInput {
  title: string
  price: number
  location: string
  category: ListingCategory
}

// Enums over magic strings
export type ListingCategory =
  | 'Beach'
  | 'City'
  | 'Mountains'
  | 'Villa'
  | 'Cabin'
  | 'Studio'
  | 'Penthouse'
  | 'Farm'
```

**Rules:**
- No `any` — ever. Use `unknown` and narrow it.
- No inline object types in component props — always a named interface.
- Export types from `/types`, never define them inside components.

---

## Hook Rules

```ts
// hooks/useListings.ts — one concern: listings data
import { useState, useEffect } from 'react'
import type { Listing } from '@/types/listing.types'

interface UseListingsResult {
  listings: Listing[]
  isLoading: boolean
  error: string | null
}

export function useListings(category?: string): UseListingsResult {
  const [listings, setListings] = useState<Listing[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setIsLoading(true)

    fetch(`/api/listings${category ? `?category=${category}` : ''}`)
      .then(r => r.json())
      .then(data => { if (!cancelled) setListings(data) })
      .catch(err => { if (!cancelled) setError(err.message) })
      .finally(() => { if (!cancelled) setIsLoading(false) })

    return () => { cancelled = true } // cleanup — prevent stale state
  }, [category])

  return { listings, isLoading, error }
}
```

**Rules:**
- Return a typed object, never a positional array (except `[value, setter]` pairs)
- Always cancel async work on unmount (`cancelled` flag or `AbortController`)
- One hook = one domain concern

---

## Error Handling

### API routes — always return typed errors

```ts
// types/api.types.ts
export interface ApiResponse<T> {
  data?: T
  error?: string
  details?: Record<string, string> // field-level validation errors
}
```

```ts
// In route handler
try {
  const result = await riskyOperation()
  return NextResponse.json({ data: result })
} catch (err) {
  const message = err instanceof Error ? err.message : 'Unexpected error'
  console.error('[listings/POST]', message) // always log with context
  return NextResponse.json({ error: message }, { status: 500 })
}
```

### Client components — error boundaries per feature

```tsx
// app/(pages)/listings/error.tsx  ← Next.js error boundary
'use client'
export default function ListingsError({ error, reset }: {
  error: Error
  reset: () => void
}) {
  return (
    <div>
      <p>Failed to load listings: {error.message}</p>
      <button onClick={reset}>Retry</button>
    </div>
  )
}
```

**Never swallow errors silently.** `catch (e) {}` is always wrong.

---

## Environment & Config

```ts
// constants/config.ts — single source of truth for env vars
const required = (key: string): string => {
  const val = process.env[key]
  if (!val) throw new Error(`Missing required env var: ${key}`)
  return val
}

export const config = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000',
  databaseUrl: required('DATABASE_URL'),        // throws at boot if missing
  jwtSecret: required('JWT_SECRET'),
  isDev: process.env.NODE_ENV === 'development',
} as const
```

**Never access `process.env` directly in components or services — always via `config`.**

---

## Documentation Conventions

### What to document (and what not to)

```ts
// ✅ Document WHY, not WHAT
// Delay required — search API rate-limits to 1 req/300ms
await delay(300)

// ❌ Useless comment
// Set loading to true
setIsLoading(true)
```

### JSDoc for public service functions

```ts
/**
 * Fetches paginated listings filtered by category.
 * Returns empty array (not throws) when category has no results.
 *
 * @param category - Optional filter. Omit for all listings.
 * @param page - 1-indexed. Defaults to 1.
 */
export async function getListings(
  category?: ListingCategory,
  page = 1
): Promise<Listing[]> { ... }
```

Document: services, hooks, utility functions, non-obvious constants.  
Skip: component internals, obvious state setters, trivial helpers.

---

## Naming Rules

| Thing | Convention | Example |
|-------|-----------|---------|
| Component | PascalCase | `ListingCard` |
| Hook | camelCase + `use` prefix | `useListings` |
| Service function | camelCase verb | `createListing`, `getUser` |
| Type / Interface | PascalCase | `Listing`, `ApiResponse` |
| Constants | SCREAMING_SNAKE or `const` object | `MAX_PRICE`, `config.apiUrl` |
| Event handler | `handle` prefix | `handleSubmit`, `handleClick` |
| Boolean state/prop | `is` / `has` prefix | `isLoading`, `hasError` |

---

## Pre-commit Checklist

Before finishing any file, confirm:

- [ ] File is under its line limit
- [ ] No `any` types
- [ ] No business logic in components or route handlers
- [ ] Every async function has error handling
- [ ] Every `useEffect` with async work has cleanup
- [ ] No hardcoded strings that belong in `/constants` or `.env`
- [ ] New types are in `/types`, not inline
- [ ] No `process.env` accessed outside `config.ts`
- [ ] Comments explain why, not what