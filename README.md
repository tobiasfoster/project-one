# Eagle Bank

A responsive, accessible, production-grade banking frontend built for the Eagle Bank take-home assessment. It implements the full feature set in the brief — authentication, dashboard, accounts, transactions, profile, and resilient error handling — against a mock API that runs entirely in the browser (no backend required).

The codebase is deliberately structured to demonstrate **systems thinking** rather than a collection of pages: a typed router with route-level guards, a design-token theme with light/dark support, a headless-component design system, server/client state separation, and CI that gates every push.

---

## Live demo

> Deployed on Vercel. Add the deployment URL here after `vercel deploy`.

**Demo credentials** (pre-filled on the login screen):

| Email | Password |
|---|---|
| `jane.doe@email.com` | `Password123!` |

---

## Run it locally

### Prerequisites

- **Node.js 22+** (matches CI and the Docker image)
- **npm**

### Install & run

```bash
npm install        
npm run dev        
```

The app boots the [MSW](https://mswjs.io/) mock worker before React mounts, so every `/api/*` request is served from local JSON fixtures. There is nothing else to start.

### All commands

```bash
npm run dev           
npm run build          
npm run preview        
npm test               
npm run test:watch     
npm run lint           
npm run type-check     
npm run storybook      
npm run build-storyboo
npm run lighthouse     
```

### Run with Docker

```bash
# Production-like build, served with `vite preview` on :8080
docker compose up app

# Hot-reloading dev server on :5173 (installs deps in-container)
docker compose up dev

# Run the test suite in a container
docker compose run --rm dev npm test
```

### Pointing at a real backend

The app calls real `fetch('/api/...')` paths through a thin client. To swap the mock layer for a real API, set `VITE_API_ORIGIN` (see `.env.example`) and the requests will target that origin instead of same-origin paths.

---

## How this submission maps to the assessment

The sections below follow the brief's **Evaluation Breakdown** and defend each decision with concrete, file-level evidence.

### Frontend Architecture — 20%

**Decision: feature-first modules + a typed, code-based router with route-level data/guard boundaries.**

- **Feature-sliced structure.** Each domain (`auth`, `dashboard`, `accounts`, `transactions`, `profile`) owns its pages, API calls, schemas, and store. Cross-cutting concerns live in `components/`, `lib/`, and `mocks/`. This keeps blast radius small and makes the app scale by *adding folders, not growing files*.
- **Type-safe routing with TanStack Router** (`src/app/Router/Router.tsx`). Routes are code-defined with full type inference for params and search. Auth is enforced *at the route boundary*, not inside components:

  ```ts
  // appLayoutRoute.beforeLoad — runs before any protected page renders
  const user = await context.queryClient.ensureQueryData(meQueryOptions)
  useAuthStore.getState().setAuth(user)
  // ...on failure:
  throw redirect({ to: "/login", search: { redirect: location.href } })
  ```

  `ensureQueryData` resolves the session **once per cold load** (cached + in-flight deduped), and the `redirect` search param means users return to where they were after signing in.
- **URL as state.** Transaction filters/sort/pagination are validated, typed search params (`src/features/transactions/transactions.search.ts`). Defaults are stripped from the URL so `/transactions` stays clean, and any view is shareable/bookmarkable.
- **A single layered API client** (`src/lib/api/client.ts`) centralizes JSON handling, content-type defaults, typed `ApiClientError`, and global `401` handling that clears auth and redirects — so no component re-implements fetch semantics.

### Responsive & Accessible Design — 15%

**Decision: semantic HTML + headless primitives (Base UI).**

- **Skip link + landmarks** (`src/components/layout/AppShell/AppShell.tsx`): a visually-hidden "Skip to main content" link, `<nav aria-label="Main navigation">`, `<main id="main-content">`, `<header>`, `<aside>`.
- **Keyboard & focus management.** The mobile menu is a `role="dialog"` with `aria-modal`, closes on `Escape`, and every interactive element gets a global `:focus-visible` ring (`src/index.css`). Icons are `aria-hidden`; icon-only buttons have `aria-label`.
- **Forms are accessible by construction.** `Field` + `FieldLabel` + `FormError` wire up labels and error messaging; server errors render in `role="alert"` (`src/features/auth/LoginPage/LoginPage.tsx`).
- **Responsive layouts.** Sidebar collapses into a drawer below `lg`; the dashboard grid flows `1 → 2 → 4` columns; transactions use a responsive table.
- **Contrast tuned for both themes.** The dark palette brightens mid/light steps specifically so muted text clears WCAG AA on dark surfaces (commented in `src/index.css`).
- **Evidence:** Lighthouse tests can be used to determine success in this arena

### Performance Optimisation — 15%

**Decision: split aggressively, cache server state, and never block the screen on data.**

- **Route-level code splitting.** Every page is loaded via `lazyRouteComponent(() => import(...))`, so the dashboard, accounts, transactions, and profile bundles are fetched on demand.
- **Deliberate vendor chunking** (`vite.config.ts` `manualChunks`): `react-vendor`, `tanstack`, and `motion` are split for long-term caching, and **MSW is isolated in its own chunk** so the mock layer never bloats the main bundle.
- **Server-state caching with TanStack Query** (`src/lib/query/queryClient.ts`): `staleTime` of 60s, `refetchOnWindowFocus: false`, and a retry policy that **never retries 401s**.
- **Perceived performance.** Skeleton loaders replace blocking spinners (dashboard cards, tables), and the router's `defaultPendingMs: 0` shows pending UI immediately on cold/slow loads instead of a blank screen.
- **Account for user preferences with animation.** `<MotionConfig reducedMotion="user">` plus a `prefers-reduced-motion` CSS guard disables animation for users who ask for it.
- **Measurements** A scripted Lighthouse harness (`npm run lighthouse`)
- **Latest tech** Uses React 19 which should automatically bake in React-specific optimisations

### Design System Thinking — 10%

**Decision: tokens first, then headless components with variant APIs.**

- **A real token system** (`src/index.css`): a `--db-*` palette split into *inverting* scales (content), *semantic surfaces* (elevation that must stay correct in both themes), and *fixed chrome* (brand/sidebar/scrims). Light/dark switch automatically via `prefers-color-scheme`. Spacing, radius, and font are tokens too (`gap-md`, `rounded-lg`, etc.).
- **Variant-driven components** via `class-variance-authority` — e.g. `Button` exposes 5 variants × 4 sizes from a single source of truth (`src/components/ui/Button/Button.tsx`), composed over Base UI for behavior/ARIA.
 **25 Storybook stories** document the UI kit (Button, Badge, Card, Input, Skeleton, EmptyState, ApiErrorState, plus feature components) with controls and a11y notes.

### Backend Integration — 10%

**Decision: integrate against realistic HTTP, not in-memory stubs.**

- **MSW intercepts real network requests** in three runtimes from one set of handlers: the browser worker (`src/mocks/browser.ts`) for dev and the deployed build, and a Node server (`src/mocks/server.ts`) for tests.
- **The mocks behave like a real API.** Handlers enforce a **session cookie**, return proper `401`s, and do **server-side filtering, sorting, and pagination** (`src/mocks/handlers/transactions/transactions.ts`). The frontend sends query params and renders whatever the "server" returns — exactly the contract a real backend would impose.
- **Clean integration contract.** Components never call `fetch` directly; they go through the typed `apiClient` and TanStack Query, so switching to a real backend is a config change (`VITE_API_ORIGIN`), not a refactor.

### Testing Quality — 15%

**Decision: test the logic most likely to break silently, with the same network layer the app uses.**

- **Stack:** Vitest + React Testing Library + jsdom, with the **MSW Node server wired into the test runtime** (`src/test/setup.ts`) and `onUnhandledRequest: "error"` so no request escapes a mock.
- **Auth validation** — `loginSchema` / `registerSchema` happy-path and failure cases incl. password rules and confirm-password matching (`src/features/auth/schemas.test.ts`).
- **Money & data formatting** — currency, date, and account-number formatters (`src/lib/utils/**/*.test.ts`), the helpers that render balances users actually read.
- **Why this split:** Zod schemas and formatters are the units where a regression is both easy to introduce and invisible in a quick manual check, so they earn automated coverage first. The MSW server is already configured in the test setup, so component/integration tests can be added without further plumbing.

### Code Maintainability — 10%

**Decision: enforce consistency mechanically, keep modules small and single-purpose.**

- **Quality gates on every commit and push.** Husky + `lint-staged` run ESLint on staged files; CI (`.github/workflows/ci.yml`) runs **lint, type-check, test, and build in a matrix** on every PR, with `node_modules` caching.
- **Strict, opinionated linting** — `typescript-eslint`, `eslint-plugin-react-hooks`, and `@stylistic` for formatting, so style is never a review topic.
- **Separation of concerns.** API (`*.api.ts`), validation (`*.schemas.ts`), client state (`*.store.ts`), and UI live in separate files per feature. The `@/` path alias keeps imports stable across refactors.
- **Readable Git history** with conventional commits and a PR-based flow (`feat:`, `fix:`, `chore:` …).

### Documentation & Communication — 5%

- This README documents architecture, folder rationale, state management, performance, accessibility, and how to run/test — the brief's required topics — and ties each decision back to the evaluation criteria.
- **Storybook** is living documentation of the design system.
- Non-obvious decisions are explained *in code* where they matter (e.g. the theming model in `src/index.css`, session resolution in the router, MSW chunk isolation in `vite.config.ts`).

---

## Architecture reference

### Folder structure

```
src/
  app/            # App, Providers (Query + Motion + Toast), Router (route tree + guards)
  features/       # Domain modules: auth, dashboard, accounts, transactions, profile
                  #   each with PascalCase page folders + *.api.ts / *.schemas.ts / *.store.ts
  components/
    ui/           # Design system: Button, Input, Card, Dialog, Select, Badge, Toast, icons…
    layout/       # AppShell (sidebar, header, skip link, mobile drawer)
    shared/       # ErrorBoundary, NotFound, EmptyState, ApiErrorState, PageHeader, loaders
  lib/            # api/ (client, config, query-keys), query/, navigation/, utils/ (formatters)
  mocks/          # MSW: browser.ts, server.ts, handlers/, data/ fixtures
  types/          # Shared TypeScript types
  test/           # Vitest setup + helpers
```

**Convention:** every React component is a PascalCase folder with a matching `.tsx` (and usually a `.stories.tsx`). Non-component modules stay flat at the feature root.

### State management

| Concern | Tool | Notes |
|---|---|---|
| Server data (dashboard, accounts, transactions, profile, session) | **TanStack Query** | Caching, retries, loading/error states for free |
| Auth user + profile snapshot | **Zustand** | Persisted to `sessionStorage` (`eagle-bank-auth`), `partialized` to store only what's needed |
| Session token | **HTTP cookie** | Set by the MSW auth handlers; sent automatically with each request |
| URL / view state (filters, sort, page) | **Router search params** | Typed + validated, shareable URLs |

The split keeps client state minimal: anything that comes from the "server" is owned by Query; only genuinely client-side state lives in Zustand. A global `401` handler (in the Query cache and the API client) clears auth and redirects to login from one place.

### Error handling & resilience

- **App-level `ErrorBoundary`** (`src/components/shared/ErrorBoundary`) catches render crashes and offers a reload.
- **Router-level** `defaultErrorComponent` and a `notFoundComponent` provide a 404 page and per-route error fallback.
- **Data-level** `ApiErrorState` with a retry button (wired to `refetch()`), `EmptyState` for no-data cases, and skeletons for loading.
- **Auth-level** automatic redirect to login on `401`, preserving the intended destination.

---

## Deployment (Vercel)

CI/CD runs from `.github/workflows/deploy.yml`: on push to `main`, it runs the full check matrix, then builds and deploys to Vercel. `vercel.json` includes SPA fallback rewrites so client-side routes resolve on hard refresh. Auto-deploys from the Vercel Git integration are disabled in favor of the workflow.

## Future considerations

- E2E testing
- Semantic versioning
- Complete environment deployment pipelines
- Use a private design system library
- Renovate
- Expand the lighthouse testing, include in pipelines
- Wider test coverage

## Disclaimer regarding AI usage

AI has been used to complement the overall output of this project. The scaffolding of Storybook stories has largely been deferred to agents, as well as the initial implementation of tests. It has also acted as a reviewer, leveraging some of the skills included publicly in this repository, and I have applied its suggestions where deemed appropriate. It has also helped structure this README.

## License

MIT
