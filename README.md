# Nutra Grow E-Commerce Demo

A modern, futuristic, and highly responsive e-commerce demo for Nutra Grow Hair & Skin Support supplements. Built with Next.js 14, Tailwind CSS, and Framer Motion for a stunning client presentation.

## Tech Stack

- **Next.js 14** with App Router - Server-side rendering, excellent SEO
- **React 18** - Component-based architecture
- **Tailwind CSS** - Utility-first styling with custom health-themed colors
- **Framer Motion** - Smooth, health-themed animations
- **Lucide React** - Modern icon library
- **TypeScript** - Type-safe development

## Features

- **Animated Hero Section** - Floating leaves and natural elements
- **Benefits Showcase** - Scroll-triggered animations
- **Product Detail Page** - Ingredients, usage instructions, and benefits
- **Shopping Cart** - Add to cart, quantity controls, cart drawer
- **Checkout Flow** - Simulated checkout with form validation
- **Responsive Design** - Mobile-first approach (mobile, tablet, desktop)
- **Health-Themed Animations** - Smooth transitions and micro-interactions

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/
│   ├── checkout/          # Checkout page
│   ├── layout.tsx         # Root layout with CartProvider
│   └── page.tsx           # Home page
├── components/
│   ├── Benefits.tsx       # Benefits section
│   ├── CartDrawer.tsx     # Shopping cart drawer
│   ├── Footer.tsx         # Footer with contact info
│   ├── Header.tsx         # Navigation header
│   ├── Hero.tsx           # Hero section with animations
│   ├── Ingredients.tsx    # Ingredients display
│   ├── ProductCard.tsx    # Product card component
│   ├── ProductDetail.tsx  # Product detail section
│   └── Usage.tsx          # Usage instructions
├── lib/
│   ├── cart-context.tsx   # Cart state management
│   └── product-data.ts    # Product information
└── types/
    └── index.ts           # TypeScript types
```

## Deployment

This project is configured for Hostinger VPS deployment. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

### Quick Deploy to Vercel

The easiest way to deploy is using [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

## Product Information

- **Product:** Hair & Skin Support
- **Capsules:** 60 per bottle
- **Target:** Women 18-45
- **Key Ingredients:** Vitamin A, C, D3, E, Folate, Biotin, Zinc, Collagen, Ashwagandha, Saw Palmetto
- **Certifications:** GMP, Made in USA, Non-GMO

## Contact

- **Email:** Nutragrowsupplements@gmail.com
- **Company:** Parsa and Parsa LLC
- **Location:** Newark, DE 19713

## License

© 2024 Nutra Grow. All rights reserved.
