# StoreDoctor Project Notes

## Project Goal
Rebuild StoreDoctor Shopify app as a fully functional web application using Vite + React + Express stack.

## Current Status
- Frontend UI: Complete (landing page, dashboard, admin panel, blog, auth system)
- Dashboard is using Advanced plan tier
- Store connection dialog has popup styling with rounded edges
- Store disconnect feature: **Advanced Plan only** (not available in Pro or Free plans)

## Key Features Implemented
- Complete landing page with hero, features, pricing sections
- Dashboard with sidebar navigation
- Admin panel with authentication (demo@storedoctor.com / admin123)
- Blog with 10 SEO-optimized posts with AI-generated images
- Store management with add/remove capabilities
- Plan-based feature restrictions
- Dark mode support with green theme

## Design Specifications
- **Color Theme:** StoreDoctor green (#10b981)
- **Typography:** Inter (primary), JetBrains Mono (code/metrics)
- **Dialogs:** Rounded-3xl with shadow-2xl for popup appearance
- **Plan Tiers:** Free (1 store), Pro (2 stores), Advanced (5 stores)
- **Premium Features:** Store disconnection is Advanced Plan only

## Important Feature Restrictions
- Store disconnection (Settings > Connected Stores): **Advanced Plan ONLY**
  - Pro and Free plans show the stores but cannot delete them
  - Premium badge shown for non-Advanced users
  - Remove button only visible for Advanced plan users

## Storage Keys (localStorage)
- `storedoctor_admin_auth_v1` - Admin authentication status
- `storedoctor_connected_stores_v1` - User's connected stores
- `storedoctor_blog_posts_v2` - Blog posts
- `storedoctor_pricing_plans_v2` - Pricing plans
- `storedoctor-theme` - Theme preference

## Tech Stack
- Frontend: React 18 + TypeScript + Tailwind CSS
- UI Components: Shadcn/ui + Radix UI
- Forms: React Hook Form + Zod
- Query: TanStack React Query v5
- Routing: Wouter
- Backend: Express + Drizzle ORM
- Database: PostgreSQL (Neon)
