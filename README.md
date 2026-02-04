# Oppr.ai Website

The marketing website for **Oppr.ai** — The Digital Operator Platform for Manufacturing.

Built with [Next.js](https://nextjs.org), React, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **UI Components:** Shadcn/ui, Radix UI
- **Icons:** Phosphor Icons, Lucide React
- **Animations:** Framer Motion
- **Database:** SQLite (better-sqlite3) for blog content

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

## Project Structure

```
src/
├── app/                # Next.js App Router pages
│   ├── about/          # About page
│   ├── blog/           # Blog with dynamic [slug] routes
│   ├── contact/        # Contact form
│   ├── demo/           # Demo booking
│   ├── examples/       # Use case examples
│   ├── faq/            # FAQ
│   ├── how-it-works/   # Platform explanation
│   ├── insights/       # Oppr Insights product page
│   ├── solutions/      # Audience-specific solutions
│   ├── privacy-policy/ # Privacy policy
│   └── term/           # Terms of service
├── components/         # Reusable React components
├── data/               # Static data (articles metadata)
├── hooks/              # Custom React hooks
└── lib/                # Utilities and helpers
public/                 # Static assets (images, icons, articles)
articles/               # Blog content (Markdown)
data/                   # SQLite database (gitignored)
```

## Deployment

This site is designed to deploy on platforms that support Next.js:

- **Vercel** — zero-config deployment for Next.js
- **Netlify** — with the Next.js runtime plugin
- **Railway / Render** — container-based deployment

> **Note:** The site uses `better-sqlite3` which requires a Node.js runtime (not static export). Choose a hosting platform that supports server-side rendering.

## License

All rights reserved. This is proprietary software.
