# Eagle Bank

A responsive banking frontend platform built for the Eagle Bank take-home assessment. The app integrates with mock APIs via MSW and demonstrates production-grade frontend engineering: accessible UI, performance optimisation, design system thinking, and comprehensive testing.

## Live Demo

> Deploy to Vercel and add your URL here after running `vercel deploy`.

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Vite + React 19 + TypeScript |
| Routing | React Router v7 (lazy-loaded routes) |
| UI | Base UI (headless) + Tailwind CSS v4 |
| Server state | TanStack Query v5 |
| Client state | Zustand (auth persistence) |
| Forms | React Hook Form + Zod |
| Mock API | MSW (browser worker + Vitest node server) |
| Testing | Vitest + React Testing Library |
| Documentation | Storybook 9 |
| Container | Docker (multi-stage nginx) |

## Getting Started

### Prerequisites

- Node.js 22+
- npm

### Install & run

```bash
npm install --legacy-peer-deps
npm run dev        # http://localhost:5173
```

### Demo credentials

| Email | Password |
|---|---|
| `jane.doe@email.com` | `Password123!` |

### Other commands

```bash
npm run build          # Production build
npm run preview        # Preview production build
npm test               # Run unit tests
npm run storybook      # Component docs at http://localhost:6006
npm run build-storybook
```

## Docker

```bash
# Production-like preview (nginx on :8080)
docker compose up app

# Dev server with hot reload (:5173)
docker compose up dev

# Run tests in container
docker compose run --rm dev npm test
```

The production image builds with `VITE_ENABLE_MOCKS=true` so MSW intercepts `/api/*` requests in the browser — no separate backend required.

## Architecture

### Folder structure

```
src/
  app/                    # App/, Providers/, Router/
  features/               # Feature modules with PascalCase page folders
  components/
    ui/                   # Button/, Input/, Card/, … (one folder per component)
    layout/               # AppShell/, ProtectedRoute/
    shared/               # EmptyState/, ApiErrorState/, …
  lib/                    # API client, utilities
  mocks/                  # MSW handlers and JSON fixtures
  types/                  # Shared TypeScript types
```

Every React component lives in its own **PascalCase** folder with a matching file (e.g. `components/ui/Button/Button.tsx`, `features/auth/LoginPage/LoginPage.tsx`). Non-component modules (`api.ts`, `schemas.ts`) remain at the feature root.

### State management

- **Zustand** — auth token and user profile, persisted to `localStorage`
- **TanStack Query** — all server data (dashboard, accounts, transactions, profile) with built-in loading, error, and retry states

This split keeps client state minimal and avoids over-engineering.

### Mock API (MSW)

MSW runs in three contexts with shared handlers:

| Context | Runtime |
|---|---|
| Development | Browser Service Worker (`setupWorker`) |
| Production / Docker | Same browser worker (`VITE_ENABLE_MOCKS=true`) |
| Tests | Node server (`setupServer`) |

The app calls real `fetch('/api/...')` endpoints. MSW intercepts and returns JSON fixtures, demonstrating proper API integration patterns without a real backend.

### Performance

- Route-level code splitting via `React.lazy()`
- TanStack Query caching (`staleTime: 30s`)
- Skeleton loaders instead of blocking spinners
- Semantic HTML tables with TanStack Table

### Accessibility

- Base UI primitives provide keyboard navigation, focus management, and ARIA attributes
- `Field` + `FieldLabel` + `FieldError` for form labelling
- Focus-visible styles on all interactive elements
- Screen reader labels on icon-only buttons
- Storybook a11y addon for component-level checks

## Testing

```bash
npm test
```

Coverage areas:

- **Auth** — login validation, credential errors, session persistence
- **Protected routes** — redirect when unauthenticated
- **Forms** — Zod schema validation (login, register, profile)
- **API integration** — dashboard error state with retry

## Storybook

```bash
npm run storybook
```

Documents the design system: Button, Badge, Card, Input, Skeleton, EmptyState, and ApiErrorState with variant controls and accessibility notes.

## Deployment (Vercel)

1. Push to GitHub
2. Import project in Vercel
3. Set environment variable: `VITE_ENABLE_MOCKS=true`
4. Build command: `npm run build`
5. Output directory: `dist`

`vercel.json` includes SPA fallback rewrites for client-side routing.

## License

MIT
