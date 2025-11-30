# StoreDoctor Project Notes

## Project Goal
Rebuild StoreDoctor Shopify app as a fully functional web application using Vite + React + Express stack.

## Current Status (Nov 30, 2025)
- **Frontend UI:** Complete (landing page, dashboard, admin panel, blog, auth system)
- **Authentication:** Sign In/Sign Up with Gmail OAuth + password show/hide
- **Free Plan Enforcement:** Mock data shows 1 store only (Free plan limit)
- **Upgrade Flow:** Professional animated modal for plan limits
- **Dashboard:** Shows data only after scan (no mock scan data)

## Key Features Implemented
- Complete landing page with hero, features, pricing sections
- Full auth flow: Sign In/Sign Up with Gmail OAuth option
- Password show/hide toggles on all password fields
- Professional upgrade modal with 3-second auto-redirect to pricing
- Redesigned pricing page: more mature and professional layout with plan highlights
- Navbar shows logged-in state (Dashboard button for authenticated users)
- Payment buttons on pricing: "Go Pro" and "Subscribe" (404 endpoints for unimplemented backend)
- Dashboard with sidebar navigation
- Admin panel with authentication (demo@storedoctor.com / admin123)
- Blog with 10 SEO-optimized posts with AI-generated images
- Store management with smart plan enforcement
- Plan-based feature restrictions
- Dark mode support with green theme

## Design Specifications
- **Color Theme:** StoreDoctor green (#10b981)
- **Typography:** Inter (primary), JetBrains Mono (code/metrics)
- **Dialogs:** Rounded-3xl with shadow-2xl for popup appearance
- **Plan Tiers:** Free (1 store, 1 scan/month), Pro (2 stores, 10 scans), Advanced (5 stores, 25 scans)
- **Upgrade Modal:** Smooth animations with countdown redirect
- **Empty States:** All pages show empty states until user takes action

## Important Feature Restrictions
- **Free Plan Limits:**
  - 1 store only (Add Another Store → modal → pricing)
  - 1 scan per month (Rescan → modal → pricing)
  - Top 3 critical issues only
  - No auto-fix suggestions
  - No competition benchmark
  - No full analysis charts
- **Pricing Page:**
  - Free plan: "Get Started" button
  - Pro/Advanced: "Go Pro"/"Subscribe" buttons (return 404 - not implemented)
  - Navbar shows "Dashboard" for logged-in users, "Log In"/"Get Started" for guests

## Mock Data
- **Mock Stores:** 1 store (Fashion Forward - fashionforward.myshopify.com)
- **Mock User:** Free plan, health score 87, 3 issues, 1 scan limit
- **Dashboard Stats:** 1 scan/month, 1 store, 3 issues

## Storage Keys (localStorage)
- `storedoctor_admin_auth_v1` - Admin authentication status
- `storedoctor_connected_stores_v1` - User's connected stores
- `storedoctor_blog_posts_v2` - Blog posts
- `storedoctor_pricing_plans_v2` - Pricing plans
- `storedoctor-theme` - Theme preference

## Backend Routes (Frontend Ready)
- `POST /api/auth/sign-in` - Login
- `POST /api/auth/sign-up` - Create account
- `GET /api/auth/google` - Gmail OAuth
- `GET /api/stores` - Fetch user stores
- `POST /api/stores` - Connect new store
- `GET /api/stores/:storeId` - Get store details
- `POST /api/scans/:storeId` - Start scan
- `GET /api/scans?storeId=X` - Fetch scan results

## Tech Stack
- Frontend: React 18 + TypeScript + Tailwind CSS
- UI Components: Shadcn/ui + Radix UI
- Forms: React Hook Form + Zod
- Query: TanStack React Query v5
- Routing: Wouter
- Backend: Express + Drizzle ORM
- Database: PostgreSQL (Neon)
