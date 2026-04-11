# react-auth-starter

A production-ready React authentication starter built with **Vite + React 19 + TypeScript**, mirroring the structure and quality of `next-auth-starter` but without the Next.js dependency.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Vite 8 + React 19 + TypeScript |
| Router | React Router v7 (`createBrowserRouter`) |
| Styling | Tailwind CSS v4 + OKLCH design tokens |
| State | Zustand v5 (persist + devtools) |
| Server State | TanStack Query v5 |
| Forms | React Hook Form v7 + Zod v4 |
| UI Components | shadcn/ui (new-york style, 35 components) |
| HTTP Client | Axios (dual versioned instances v1/v2) |
| Charts | Recharts v3 |
| Animations | Framer Motion v12 |

## Project Structure

\`\`\`
src/
├── assets/           # Static assets (warehouse.webp, etc.)
├── components/
│   ├── layout/       # App shell (header, sidebar, nav)
│   ├── loader/       # Full-screen loader
│   ├── providers/    # AuthGuard, AuthLayout, QueryProvider
│   ├── shared/       # Reusable page components
│   ├── ui/           # shadcn/ui components (35 components)
│   └── visuals/      # Decorative components
├── constants/        # Routes, roles, sidebar items
├── features/
│   ├── auth/         # Login + forgot-password flows
│   └── dashboards/   # Admin dashboard
├── hooks/            # Shared custom hooks
├── lib/              # Utilities (api, format, error, etc.)
├── pages/            # Route page components
│   ├── access-denied.tsx
│   ├── dashboard.tsx
│   ├── management.tsx
│   ├── not-found.tsx
│   └── theme-switcher/   # Multi-theme picker (6 themes)
├── stores/           # Zustand stores (auth, breadcrumb, sidebar, theme)
├── systems/
│   ├── confirmation/ # Confirmation dialog system
│   ├── data-table/   # Full-featured data table with URL sync
│   └── form-input/   # Dynamic form field system
├── types/            # Global TypeScript types
├── validators/       # Shared Zod schemas
├── App.tsx           # Root: <Providers><RouterProvider/>
├── main.tsx          # Entry point
└── router.tsx        # createBrowserRouter route config
\`\`\`

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9+

### Installation

\`\`\`bash
pnpm install
\`\`\`

### Environment Variables

Copy \`.env.example\` to \`.env.local\` and fill in your values:

\`\`\`bash
cp .env.example .env.local
\`\`\`

| Variable | Description |
|---|---|
| \`VITE_API_URL\` | Backend API base URL |
| \`VITE_FILES_URL\` | File storage base URL |

### Development

\`\`\`bash
pnpm dev
\`\`\`

### Build

\`\`\`bash
pnpm build
\`\`\`

### Type-check + Lint + Format

\`\`\`bash
pnpm check-all   # type-check + lint + format check
pnpm fix-all     # format + lint --fix
\`\`\`

## Authentication Flow

- **\`AuthGuard\`** — Protects routes; redirects unauthenticated users to \`/login\`
- **\`AuthLayout\`** — Wraps auth pages; redirects authenticated users to their default dashboard
- Token refresh is handled automatically via Axios interceptors (\`src/lib/api/interceptors.ts\`)
- Auth state is persisted in cookies via Zustand + \`cookieStorage\` adapter

## Theme System

Six handcrafted OKLCH colour themes, each with a light and dark variant:

| Theme | Light ID | Dark ID |
|---|---|---|
| Stone (default) | \`light\` | \`dark\` |
| Forest | \`forest-light\` | \`forest\` |
| Crimson | \`crimson\` | \`crimson-dark\` |
| Amber | \`amber\` | \`amber-dark\` |
| Obsidian | \`obsidian-light\` | \`obsidian\` |
| Violet | \`violet-light\` | \`violet-dark\` |

Navigate to \`/theme-switcher\` to preview and apply themes. The selected theme is persisted in \`localStorage\`.

## Key Adaptations from next-auth-starter

| Next.js API | React Router Equivalent |
|---|---|
| \`useRouter().push(path)\` | \`useNavigate()(path)\` |
| \`usePathname()\` | \`useLocation().pathname\` |
| \`<Link href="">\` | \`<Link to="">\` |
| \`nuqs useQueryState\` | \`useSearchParams\` + \`useNavigate\` |
| \`next/image <Image>\` | Plain \`<img>\` |
| \`process.env.NEXT_PUBLIC_*\` | \`import.meta.env.VITE_*\` |
| \`next-themes useTheme\` | Custom \`useThemeStore\` (Zustand) |
| Route groups / layouts | \`createBrowserRouter\` flat routes with wrapper components |

## Systems

### Data Table (\`src/systems/data-table/\`)

Full-featured TanStack Table implementation with:
- URL-synced pagination via \`useSearchParams\`
- Inline row editing (\`EditableCell\`)
- Sort, column visibility, skeleton loading states

### Form Input (\`src/systems/form-input/\`)

Dynamic form field dispatcher supporting:
- Text, number, password, item-list inputs
- Single/multi-select with cascade support
- Textarea, checkbox, switch, radio group, slider
- File upload with progress bar and drag-and-drop

### Confirmation (\`src/systems/confirmation/\`)

Global confirmation dialog system with variant styles (delete/confirm/warning) driven by a Zustand store.
