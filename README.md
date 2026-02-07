# Oppr.ai Website

The marketing website for **[Oppr.ai](https://oppr.ai)** — The Digital Operator Platform for Manufacturing.

Oppr is the human data layer for manufacturing. It captures operator knowledge, connects it to machine data, and preserves expertise across your organisation. The website showcases the platform, its modules, and Oppr Insights — a standalone discovery tool for operational intelligence.

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org) | 16.1.6 | React framework (App Router) |
| [React](https://react.dev) | 19.2.3 | UI library |
| [TypeScript](https://typescriptlang.org) | 5.x | Type safety |
| [Tailwind CSS](https://tailwindcss.com) | 4.x | Utility-first styling |
| [Framer Motion](https://motion.dev) | 12.x | Animations and transitions |
| [Radix UI](https://radix-ui.com) | 1.4.x | Accessible component primitives |
| [Phosphor Icons](https://phosphoricons.com) | 2.1.x | Icon library |
| [Lucide React](https://lucide.dev) | 0.563.x | Additional icons |
| [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) | 12.x | SQLite database for blog articles |
| [Resend](https://resend.com) | 6.x | Transactional email for form submissions |

**Fonts:** Plus Jakarta Sans (primary), Instrument Serif (accent headings), JetBrains Mono (code)

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/opprflorisw/oppr-website.git
cd oppr-website
npm install
```

### Environment Variables

Create a `.env.local` file in the project root (see `.env.example`):

```env
RESEND_API_KEY=your_resend_api_key_here
```

The `RESEND_API_KEY` is required for the contact, demo, and insights forms to send emails.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Pages & Routes

### Public Pages

| Route | Description |
|---|---|
| `/` | Homepage — hero, platform overview, audiences, social proof |
| `/how-it-works` | Platform explanation with three core modules (LOGS, IDA, DOCS) |
| `/insights` | Oppr Insights product page with pricing tiers |
| `/insights/contact` | Insights-specific enquiry form |
| `/solutions` | Solutions overview |
| `/solutions/sme` | For SME manufacturers |
| `/solutions/enterprise` | For enterprise operations |
| `/solutions/consultants` | For consultants |
| `/solutions/oem` | For OEM partners |
| `/solutions/private-equity` | For private equity firms |
| `/examples` | Case studies with interactive before/after viewer |
| `/blog` | Blog listing with featured articles and category filters |
| `/blog/[slug]` | Individual blog articles |
| `/about` | Company info, mission, story, founders, values |
| `/contact` | General contact form |
| `/demo` | Demo request form |
| `/faq` | Frequently asked questions |
| `/operational-intelligence-matrix` | Operational intelligence resource |
| `/privacy-policy` | Privacy policy |
| `/term` | Terms of service |

### API Routes

| Route | Method | Description |
|---|---|---|
| `/api/contact` | POST | Handles contact form submissions |
| `/api/demo` | POST | Handles demo request submissions |
| `/api/insights` | POST | Handles Oppr Insights enquiry submissions |

All form submissions are sent via Resend to `info@oppr.ai`.

## Project Structure

```
src/
  app/                              # Next.js App Router pages & API routes
    api/                            # Server-side API route handlers
      contact/                      #   Contact form handler
      demo/                         #   Demo request handler
      insights/                     #   Insights enquiry handler
    about/                          # About page
    blog/                           # Blog listing and [slug] article pages
    contact/                        # Contact form page
    demo/                           # Demo request page
    examples/                       # Case studies page
    faq/                            # FAQ page
    how-it-works/                   # Platform explanation page
    insights/                       # Oppr Insights product + contact pages
    operational-intelligence-matrix/ # OI matrix resource
    privacy-policy/                 # Privacy policy
    solutions/                      # Audience-specific solution pages
    term/                           # Terms of service
  components/
    about/                          # About page sections
    blog/                           # Blog cards, filters, article components
    contact/                        # Contact form components
    demo/                           # Demo page components
    examples/                       # Case study viewer and cards
    faq/                            # FAQ accordion
    home/                           # Homepage sections and animations
    how-it-works/                   # How-it-works page sections
    icons/                          # Custom SVG icon components
    insights/                       # Insights product page sections
    insights-contact/               # Insights contact form
    layout/                         # Navbar and Footer
    shared/                         # Reusable (animations, modals, indicators)
    solutions/                      # Solution page components by audience
    ui/                             # Base UI primitives (Button, Badge)
  data/                             # Article type definitions
  hooks/                            # Custom React hooks
  lib/                              # Utilities, constants, database, animations
data/
  articles.json                     # Blog article content (loaded into SQLite)
scripts/
  seed.ts                           # Database seed script
public/
  images/                           # Static images, logos, visuals
  articles/                         # Article media assets (images, PDFs)
```

## Key Features

- **Responsive design** across all device sizes
- **Rich animations** powered by Framer Motion — scroll-triggered reveals, animated counters, floating orbs, custom motion presets
- **Blog system** backed by SQLite with categories, featured articles, reading time, and multi-language support (EN/NL)
- **Interactive case studies** with six detailed examples featuring before/after timelines and outcome metrics
- **Lead capture forms** for contact, demo requests, and Oppr Insights enquiries — all integrated with Resend email
- **Video modals** with YouTube embed support
- **Audience-specific solution pages** tailored for SME, enterprise, consultant, OEM, and private equity
- **Accessibility** built on Radix UI primitives

## Deployment

This site requires a Node.js runtime (not a static export) because it uses `better-sqlite3` for the blog system.

**Recommended platforms:**

- **Vercel** — zero-config deployment for Next.js
- **Railway / Render** — container-based deployment
- **Netlify** — with the Next.js runtime plugin

> Ensure `RESEND_API_KEY` is set as an environment variable on your hosting platform for form submissions to work.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## License

All rights reserved. This is proprietary software for Oppr.ai.
