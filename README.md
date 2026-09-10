# TOFA Marketplace Admin v3

Administration console for the TOFA marketplace. The application uses Next.js 16, React 19, TypeScript, Tailwind CSS 4, shadcn, Axios, TanStack Query, Zustand, and Framer Motion.

## Getting started

Requirements:

- Node.js 20 or newer
- npm
- A running TOFA API

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_API_BASE_URL=https://your-api.example.com
```

Then install and run the application:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Both `/` and `/login` display the administrator login screen.

## Commands

```bash
npm run dev        # Start the development server
npm run build      # Create a production build
npm run start      # Run the production build
npm run lint       # Run ESLint
npm run typecheck  # Run TypeScript without emitting files
```

## Authentication

The authentication flow follows the marketplace frontend conventions:

1. `POST /admin/auth/login` receives `email` and `password`.
2. The returned token is stored in the `tofaAdminToken` cookie.
3. Axios attaches the token as a Bearer authorization header.
4. `GET /admin/auth/me` validates the session and retrieves the current administrator.
5. Zustand stores `currentAdmin` and the authentication initialization state.
6. Protected admin routes redirect unauthenticated visitors to `/login`.

Selecting “Remember me” gives the cookie a 30-day lifetime; otherwise it remains a browser-session cookie. Password recovery screens are available at `/forgot-password` and `/reset-password`.

## Architecture

The App Router owns routing and layouts only. Business logic lives in feature folders, shared UI follows atomic design, and cross-cutting infrastructure lives in `src/lib`.

```text
src/
├── app/                    # Routes, route groups, layouts, and global styles
├── components/
│   ├── atoms/              # Shared indivisible UI elements
│   ├── molecules/          # Small shared component compositions
│   ├── organisms/          # Shared application sections
│   ├── templates/          # Shared page layouts
│   └── providers/          # Query and authentication providers
├── features/               # Business capability boundaries
├── lib/                    # Axios, helpers, shared constants, and types
└── store/                  # Cross-feature Zustand stores
```

Every business feature uses the same internal contract:

```text
feature/
├── api/
├── hooks/
├── helpers/
├── types/
├── constants/
└── components/
    ├── atoms/
    ├── molecules/
    ├── organisms/
    └── templates/
```

Feature-specific code should remain inside its feature. Only reusable, domain-independent components belong in `src/components`.

## Feature areas

- Authentication and administrator session management
- Dashboard and marketplace overview
- Users, sellers, verification, roles, and permissions
- Products, categories, and orders
- Payments, refunds, settlements, payouts, and payout-account review
- Delivery and logistics operations
- Direct and market RFQs
- Disputes, returns, cancellations, reviews, and communication oversight
- Subscription plans and user subscriptions
- Notifications, referrals, and rewards
- Analytics, reporting, and audit logs
- Marketplace, country, currency, language, payment, logistics, settlement, and payout configuration

## Design system

Navy blue is the primary color. Sky blue, gray, white, and orange are supporting colors. Shared theme tokens are defined in `src/app/globals.css`, and the application uses transparent TOFA marketplace logo variants for light and dark surfaces.

## API organization

The shared Axios instance is in `src/lib/api`. It handles the API base URL and authorization header. Individual feature endpoint functions remain in their own `api` directories, while TanStack Query hooks manage remote state and Zustand stores only client-accessible application state.
