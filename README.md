# React Auth Starter

A feature-based React starter template focused on clean architecture, modern tooling, and a complete authentication flow.  
Originally built for personal use by **Akinur Rahman**, now shared publicly in case it helps someone skip the boring setup phase.

## Overview

This is a production-ready frontend starter built with Vite and structured around a scalable feature-based architecture.  
It includes a full authentication flow, token refresh handling, Axios utilities, UI foundations, and the essential setup needed to start shipping features immediately.

## Features

- Feature-based folder architecture
- React Router v7 with lazy-loaded pages
- Authentication (login, logout, refresh token)
- Access-denied handling & protected routes
- Role-based sidebar and route access control
- Zustand state with persisted auth (cookie storage)
- Axios instance with interceptors
- Token refresh queueing and retry logic
- TanStack Query integration
- Shadcn UI with TailwindCSS v4
- Multi-theme support (6 colour families, light/dark each)
- Reusable UI components (input, loader, data-table, dialogs, etc.)
- Helper utilities (cookies, debounce, API logging)
- Zod validation for forms
- Husky, lint-staged, and Prettier configured

## Tech Stack

- **Vite 8**
- **React 19**
- **TypeScript**
- **React Router v7**
- **Zustand**
- **TanStack Query**
- **TanStack Table**
- **Axios**
- **TailwindCSS 4**
- **Shadcn UI**
- **Zod**
- **Sonner**
- **Framer Motion**
- **Recharts**

## Folder Structure

```plaintext
src/
├─ features/
│  ├─ auth/
│  │  ├─ login/
│  │  └─ forgot-password/
│  └─ dashboards/
│
├─ components/
│  ├─ layout/          # sidebar, header, breadcrumb, nav-user
│  ├─ loader/
│  ├─ providers/       # auth-guard, query-provider, auth-layout
│  ├─ shared/          # page-header, stats-card, search-input, etc.
│  └─ ui/              # shadcn primitives
│
├─ systems/
│  ├─ data-table/
│  ├─ filters/
│  ├─ form-input/      # all field types
│  └─ confirmation/
│
├─ lib/
│  ├─ api/             # axios instance, interceptors, token refresh
│  ├─ cookie-helper.ts
│  ├─ route-access.ts
│  ├─ debounce.ts
│  └─ utils.ts
│
├─ stores/
│  ├─ auth.store.ts
│  ├─ sidebar.store.ts
│  ├─ breadcrumb.ts
│  └─ theme.store.ts
│
├─ constants/          # ROLES, SIDEBAR_ITEMS, routes
├─ hooks/
├─ types/
├─ validators/
├─ lazy-pages.ts       # all React.lazy() page imports
└─ router.tsx
```

## Notes

- Frontend-only template that works with any backend providing access and refresh tokens.
- Automatic token refreshing handled through Axios interceptors with request queuing.
- Authentication state persisted via Zustand + cookie storage.
- Role-based access: sidebar items and routes are filtered per role at runtime using `SIDEBAR_ITEMS` configuration.
- Multi-theme system: 12 themes (6 colour families × light/dark) applied via CSS class on `<html>`, persisted with Zustand.
- Folder structure kept intentionally minimal but scalable for real production use.
- Not a demo project. This template is meant to be a solid base for real applications.

## Author

**Akinur Rahman**  
Frontend-focused Fullstack Developer  
Originally created for personal use; shared publicly for anyone who wants a head start.

## License

MIT
