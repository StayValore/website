# Valoré Website

The marketing website for [Valoré](https://apps.apple.com/us/app/valor%C3%A9/id6760678152) — a social hotel review app where travelers discover, review, and rank hotels through recommendations from people they trust.

Built with [Next.js](https://nextjs.org/) and deployed on [Vercel](https://vercel.com/).

## Features

- **Landing page** with hero, feature highlights, screenshot showcase, and Instagram feed
- **Waitlist** signup form backed by Supabase
- **Legal pages** — Privacy Policy, Terms of Service, and Support
- **Deep link** routing for app deep links

## Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Supabase](https://supabase.com/) — waitlist data storage

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the root of the project:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── page.tsx          # Home / landing page
│   ├── layout.tsx        # Root layout
│   ├── globals.css       # Global styles
│   ├── (deeplink)/       # Deep link routes
│   ├── privacy/          # Privacy policy page
│   ├── support/          # Support page
│   └── terms/            # Terms of service page
├── components/           # Reusable UI components
│   ├── header.tsx
│   ├── footer.tsx
│   ├── waitlist.tsx
│   ├── contact-form.tsx
│   ├── feature-icon.tsx
│   ├── instagram-feed.tsx
│   └── screenshot-showcase.tsx
└── lib/
    └── supabase.ts       # Supabase client
```

## Deployment

The site is deployed automatically to Vercel on every push to the main branch.
