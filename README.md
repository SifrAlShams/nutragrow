# NutraGrow — E-Commerce Website

A full-stack e-commerce website for **NutraGrow**, a premium hair & skin supplement brand. Built with Next.js 14, Supabase, Stripe, and an AI-powered chatbot backed by a Retrieval-Augmented Generation (RAG) pipeline.

---

## 🗂 Table of Contents

1. [Tech Stack](#tech-stack)
2. [Project Structure](#project-structure)
3. [Key Features](#key-features)
4. [Environment Variables](#environment-variables)
5. [Database Setup (Supabase)](#database-setup-supabase)
6. [Local Development](#local-development)
7. [Deployment (Hostinger VPS)](#deployment-hostinger-vps)
8. [Stripe Integration](#stripe-integration)
9. [AI Chatbot (RAG Pipeline)](#ai-chatbot-rag-pipeline)
10. [Coming Soon Mode](#coming-soon-mode)
11. [Admin Panel](#admin-panel)
12. [Discount Codes](#discount-codes)
13. [Useful Scripts](#useful-scripts)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion, GSAP |
| Database | Supabase (PostgreSQL + pgvector) |
| Payments | Stripe Checkout |
| AI / Chatbot | Groq (Llama via OpenAI-compatible API) |
| Embeddings | `@xenova/transformers` (all-MiniLM-L6-v2, runs locally on the server) |
| AI SDK | Vercel AI SDK v4 (`ai`, `@ai-sdk/react`, `@ai-sdk/openai`) |

---

## Project Structure

```
nutragrow/
├── public/               # Static assets (images, fonts)
├── scripts/              # Utility scripts (seeding, scraping)
├── src/
│   ├── app/
│   │   ├── admin/        # Protected admin dashboard (order management)
│   │   ├── api/
│   │   │   ├── admin/    # Admin API routes (list/update orders)
│   │   │   ├── chat/     # AI chatbot RAG endpoint
│   │   │   ├── checkout/ # Stripe checkout session creation
│   │   │   ├── validate-code/ # Discount code validation
│   │   │   └── webhooks/stripe/ # Stripe webhook handler
│   │   ├── checkout/     # Checkout page (success/cancel)
│   │   ├── orders/       # Order lookup page
│   │   ├── privacy-policy/
│   │   ├── refund-policy/
│   │   ├── shipping-policy/
│   │   ├── terms/
│   │   ├── layout.tsx    # Root layout (includes Chatbot globally)
│   │   └── page.tsx      # Homepage (or Coming Soon, controlled by env var)
│   ├── components/
│   │   ├── Chatbot.tsx         # AI chatbot widget (floating button + window)
│   │   ├── CartDrawer.tsx      # Slide-out cart with discount code field
│   │   ├── ComingSoon.tsx      # Coming Soon landing page
│   │   ├── Header.tsx          # Navigation with cart icon
│   │   ├── Hero.tsx            # Hero section
│   │   ├── ProductCard.tsx     # Product card component
│   │   ├── ProductDetail.tsx   # Full product detail with add-to-cart
│   │   ├── Footer.tsx
│   │   ├── Benefits.tsx
│   │   ├── Ingredients.tsx
│   │   ├── Reviews.tsx
│   │   ├── Usage.tsx
│   │   ├── FloatingBottle.tsx  # 3D-style animated product visual
│   │   ├── ScrollLeaves.tsx    # Scroll-triggered leaf animations
│   │   ├── VideoBackground.tsx # Video/media background component
│   │   └── ScrollProgress.tsx
│   ├── lib/
│   │   └── cart-context.tsx   # React context for cart state
│   ├── middleware.ts           # Route protection for /admin
│   └── types/                 # TypeScript type definitions
├── supabase_schema.sql         # Database table definitions + RLS policies
├── supabase_seed.sql           # Seed data for website_content (chatbot RAG knowledge base)
├── supabase_vector_setup.sql   # pgvector extension + match_website_content function
├── update_schema.sql           # Schema migrations (order_items, customer_name columns)
├── update_stock.sql            # Stock-related schema update
├── .env.example                # Template for environment variables
├── next.config.mjs             # Next.js config (externalizes binary packages)
└── DEPLOYMENT.md               # Detailed Hostinger VPS deployment guide
```

---

## Key Features

- **Full E-Commerce Flow**: Browse products → Add to cart → Apply discount code → Stripe Checkout → Order confirmation
- **Stripe Webhook Processing**: Automatically marks orders as paid and marks discount codes as used upon successful payment
- **AI Chatbot (RAG)**: A floating chatbot that answers questions using NutraGrow website content retrieved from Supabase (pgvector), powered by Groq/Llama
- **Admin Dashboard**: Password-protected admin panel at `/admin` to view and manage orders
- **Discount Codes**: One-time-use discount codes (e.g., 30% off) validated server-side before checkout
- **Coming Soon Mode**: Toggle between the full site and a "Coming Soon" landing page via a single environment variable
- **SEO Optimised**: Sitemap, robots.txt, OpenGraph tags, semantic HTML

---

## Environment Variables

Copy `.env.example` to `.env.local` (for development) or set these in your hosting panel.

```bash
# ---- SITE ----
NEXT_PUBLIC_COMING_SOON=false        # Set to 'true' to show Coming Soon page
NEXT_PUBLIC_SITE_URL=https://nutragrow.com

# ---- SUPABASE ----
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key   # Only used server-side

# ---- STRIPE ----
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# ---- AI / GROQ ----
GROQ_API_KEY=gsk_...

# ---- ADMIN ----
ADMIN_PASSWORD=your_secure_admin_password

# ---- NODE ----
NODE_ENV=production
```

> ⚠️ **Never commit `.env.local`** — it is already in `.gitignore`. The file `hostinger-import.env` is a formatted copy for bulk-importing into Hostinger's environment variable panel.

---

## Database Setup (Supabase)

Run these SQL files **in order** in the Supabase SQL Editor (`https://supabase.com/dashboard → Your Project → SQL Editor`):

### Step 1 — Core Tables & RLS
```sql
-- Run: supabase_schema.sql
```
Creates: `products`, `discount_codes`, `orders` tables with Row Level Security policies.

### Step 2 — Vector Store for Chatbot
```sql
-- Run: supabase_vector_setup.sql
```
Enables the `pgvector` extension and creates the `website_content` table plus the `match_website_content` RPC function used by the chatbot.

### Step 3 — Seed Chatbot Knowledge Base
```sql
-- Run: supabase_seed.sql
```
Inserts pre-embedded NutraGrow website content chunks into `website_content` so the chatbot has knowledge to answer from.

### Step 4 — Schema Updates (run if upgrading from an older version)
```sql
-- Run: update_schema.sql   (adds order_items JSON column, customer_name column)
-- Run: update_stock.sql    (adds stock-tracking)
```

---

## Local Development

### Prerequisites
- **Node.js 22+** and **npm**
- A Supabase project (free tier is fine)
- A Groq API key (free at [console.groq.com](https://console.groq.com/))
- A Stripe account (test mode is fine for development)

### Setup

```bash
# 1. Clone the repository
git clone git@github.com:SifrAlShams/nutragrow.git
cd nutragrow

# 2. Install dependencies
npm install

# 3. Copy and fill in environment variables
cp .env.example .env.local
# Edit .env.local with your actual keys

# 4. Run the database setup scripts in Supabase (see above)

# 5. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deployment (Hostinger VPS)

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for the complete Hostinger VPS deployment guide.

**Quick summary:**
1. SSH into your VPS and clone the repo
2. Install Node.js 22 via `nvm`
3. Copy `hostinger-import.env` values into the VPS environment
4. Run `npm install && npm run build && npm start`
5. Use **PM2** to keep the server alive: `pm2 start "npm start" --name nutragrow`
6. Configure Nginx as a reverse proxy on port 80/443
7. Point your domain DNS A record to the VPS IP

---

## Stripe Integration

### How it Works
1. User clicks **Checkout** → frontend calls `/api/checkout` → creates a Stripe Checkout Session
2. User completes payment on Stripe's hosted page
3. Stripe sends a `checkout.session.completed` event to `/api/webhooks/stripe`
4. The webhook verifies the signature, creates an order in Supabase, marks the discount code as used, and marks the order as `paid`

### Webhook Setup
In your Stripe Dashboard → Developers → Webhooks:
- **Endpoint URL**: `https://yourdomain.com/api/webhooks/stripe`
- **Events to listen for**: `checkout.session.completed`
- Copy the **Signing Secret** (`whsec_...`) and add it to your environment variables

### Test Stripe Locally
```bash
# Install Stripe CLI
stripe login
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

---

## AI Chatbot (RAG Pipeline)

The chatbot is a **Retrieval-Augmented Generation (RAG)** system:

```
User Message
    │
    ▼
Embed message using @xenova/transformers
(all-MiniLM-L6-v2 model, runs on the server)
    │
    ▼
Query Supabase pgvector for top 5 similar chunks
(match_website_content RPC function)
    │
    ▼
Inject matching content as context into system prompt
    │
    ▼
Send to Groq (model: openai/gpt-oss-20b) via streaming
    │
    ▼
Stream response back to frontend using
Vercel AI SDK UIMessageStreamResponse format
```

**Frontend**: `src/components/Chatbot.tsx` uses `useChat` from `@ai-sdk/react`.

**Backend**: `src/app/api/chat/route.ts`

### Important SDK Notes
The project uses **Vercel AI SDK v4+** (`ai@^7.x`). This version uses a **UIMessage format** — messages have a `parts` array instead of a `content` string. The backend `route.ts` has helper functions (`getMessageText`, `toModelMessages`) to convert between formats.

---

## Coming Soon Mode

Toggle the full site vs. the Coming Soon landing page with a single environment variable:

```bash
NEXT_PUBLIC_COMING_SOON=true   # Shows ComingSoon.tsx
NEXT_PUBLIC_COMING_SOON=false  # Shows the full e-commerce site
```

The Coming Soon page includes:
- Email waitlist form (connected to Supabase)
- Countdown timer
- Early-bird discount code reveal

---

## Admin Panel

The admin panel is at `/admin`. It is protected by the `ADMIN_PASSWORD` environment variable via Next.js middleware.

**Features:**
- View all orders (customer email, total, date, status)
- Mark orders as shipped / fulfilled
- See which discount code was used per order

**Login:**
Navigate to `/admin` → enter the `ADMIN_PASSWORD` from your environment variables.

---

## Discount Codes

The `discount_codes` table stores one-time-use codes (e.g., from the NutraGrow promotional campaign).

- Codes are validated server-side at `/api/validate-code`
- They are marked as `is_used = true` when the Stripe webhook fires after a successful payment
- The Excel file `NutraGrow_30000_Letter_Only_Discount_Codes.xlsx` contains the original batch of codes (already seeded into the database via `supabase_seed.sql`)

---

## Useful Scripts

| File | Purpose |
|---|---|
| `generate_seed.js` | Re-generates `supabase_seed.sql` by scraping the website and creating embeddings |
| `scripts/` | Additional one-off utility scripts |
| `qr-code-generator.html` | Standalone HTML tool to generate QR codes for the product |
| `nutragrow-qr-print.png` | Print-ready QR code image |
| `supabase_schema.sql` | Master schema — run first on a fresh database |
| `supabase_vector_setup.sql` | Enables pgvector and creates the chatbot's search function |
| `supabase_seed.sql` | Seeds the chatbot's knowledge base (pre-computed embeddings) |

---

## Branch Strategy

| Branch | Purpose |
|---|---|
| `main` | Stable, defaults to Coming Soon mode |
| `release/v1` | Full e-commerce site (current active branch) |

The production server should be running from `release/v1`.

---

## Contact & Handover Notes

- **Supabase Project**: Check the `.env.local` / Hostinger environment variables for the project URL
- **Stripe Account**: Belongs to the client — they should have invited you as a Developer via `Settings → Team`
- **Domain**: Managed on Hostinger — DNS A record should point to the VPS IP
- **Groq API**: Free tier key — can be regenerated at [console.groq.com](https://console.groq.com/)
