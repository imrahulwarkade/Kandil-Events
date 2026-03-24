# Kandil Events — Next.js

Luxury event landing site built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**.

## Prerequisites

- Node.js 20+
- npm (or pnpm/yarn)

## Assets

Copy your image and logo files into **`public/assets/`** so they match the paths used in the app (same filenames as the original HTML site):

- `favicon.png`
- `logo-transparent.png`
- `hero-bg.webp`
- `gallery-1.webp` … `gallery-8.webp`, plus `gallery-2.jpg`, `gallery-4.jpg`, `gallery-5.jpg`, `gallery-6.png`, `gallery-7.webp` as referenced in [`lib/data.ts`](lib/data.ts)

Without these files, the site will run but images will 404 until you add them.

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run build
npm start
```

## Lint

```bash
npm run lint
```

## Environment

Optional: set `NEXT_PUBLIC_SITE_URL` to your production URL for Open Graph `metadataBase` in [`app/layout.tsx`](app/layout.tsx).

## Contact API

`POST /api/contact` accepts JSON from the contact form and returns `{ ok: true }`. Replace the handler in [`app/api/contact/route.ts`](app/api/contact/route.ts) with your email provider or database integration.
