# StoreDoctor Project Notes

## Project Goal
Rebuild StoreDoctor Shopify app as a fully functional web application using Vite + React + Express stack.

## Database Configuration
- **Database:** Supabase PostgreSQL (NOT Replit's built-in database)
- **Connection:** Use DATABASE_URL from Supabase project settings
- See .env.example for Supabase connection details

## Current Status (Dec 2, 2025)
- **Frontend UI:** Complete (landing page, dashboard, admin panel, blog, auth system)
- **Authentication:** Sign In/Sign Up with Gmail OAuth + password show/hide (Fixed logout in all locations)
- **Free Plan Enforcement:** Mock data shows 1 store only (Free plan limit)
- **Upgrade Flow:** Professional animated modal for plan limits
- **Dashboard:** Shows data only after scan (no mock scan data)
- **Quick Actions Card:** Removed from dashboard
- **Mock Data Limitation:** Always redirects to connect-store on login (will redirect to dashboard when backend checks for existing stores)

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
- `POST /api/auth/sign-in` - Login (should return user + existing stores)
- `POST /api/auth/sign-up` - Create account (should return user + existing stores)
- `POST /api/auth/logout` - Logout
- `GET /api/auth/google` - Gmail OAuth
- `GET /api/stores` - Fetch user stores
- `POST /api/stores` - Connect new store
- `GET /api/stores/:storeId` - Get store details
- `POST /api/scans/:storeId` - Start scan
- `GET /api/scans?storeId=X` - Fetch scan results

## Backend Fixes Applied (Dec 2, 2025)

### Critical Backend Compatibility Issues - FIXED:

1. **Auth Endpoints Now Return User & Stores Data** ✅
   - Sign-in returns: `{ success, user, stores[], hasStores }`
   - Sign-up returns: `{ success, user, stores: [], hasStores: false }`
   - Frontend now intelligently redirects to dashboard if hasStores=true, else connect-store
   - **Impact:** Proper redirect flow when user has existing stores

2. **Removed Duplicate Scan Routes** ✅
   - Deleted: `/api/scans/:storeId` (POST)
   - Kept: `/api/stores/:storeId/scans` (POST) - Primary route
   - **Impact:** Single source of truth for scan creation

3. **Added Authorization Checks** ✅
   - All protected routes now return 401 if userId is missing
   - Routes checked: GET /api/stores, POST /api/stores, POST scans, smart-scan, auto-fix
   - **Impact:** Ready for authentication middleware implementation

4. **Fixed Payment Endpoints** ✅
   - `/api/payment/checkout/pro` - Returns plan info (404 changed to 200)
   - `/api/payment/checkout/advanced` - Returns plan info (404 changed to 200)
   - Status: "pending_implementation" with metadata
   - **Impact:** Frontend can detect upgrade endpoints are ready for Shopify integration

5. **Fixed Scan Endpoints** ✅
   - Updated connect-store.tsx to use `/api/stores/:storeId/scans` (was `/api/scans/:storeId`)
   - Scanning page now fetches scan results after animation completes
   - **Impact:** Correct endpoint routing for all scan operations

6. **Smart Auth Redirects** ✅
   - sign-in.tsx: Now checks `hasStores` to redirect to dashboard vs connect-store
   - sign-up.tsx: Always goes to connect-store (new users have no stores)
   - **Impact:** Seamless user experience for returning vs new users

7. **Response Format Standardization** ✅
   - All responses now include consistent error handling
   - All POST endpoints return `{ success: true, ...data }`
   - All GET endpoints return proper JSON with empty arrays as fallback
   - **Impact:** Frontend error handling works reliably

### Routes Status Summary:

| Endpoint | Status | Notes |
|----------|--------|-------|
| POST /api/auth/sign-in | ✅ Ready | Returns user + stores + hasStores flag |
| POST /api/auth/sign-up | ✅ Ready | Returns user + empty stores array |
| GET /api/auth/google | ✅ Ready | OAuth mock flow |
| POST /api/auth/logout | ✅ Ready | Session cleanup |
| GET /api/stores | ✅ Ready | Returns user's stores |
| POST /api/stores | ✅ Ready | Create store with Shopify URL |
| POST /api/stores/:storeId/scans | ✅ Ready | Create scan (PRIMARY) |
| POST /api/stores/:storeId/smart-scan | ✅ Ready | AI scan with plan-based sampling |
| GET /api/scans/:scanId | ✅ Ready | Get scan results + benchmark |
| POST /api/scans/:scanId/issues/:issueId/auto-fix | ✅ Ready | Apply auto-fix (Advanced plan) |
| GET /api/scans/:scanId/benchmark | ✅ Ready | Competition benchmarking |
| POST /api/payment/checkout/pro | ✅ Ready | Shopify payment (pending) |
| POST /api/payment/checkout/advanced | ✅ Ready | Shopify payment (pending) |

### Frontend Changes Applied:

- **sign-in.tsx**: Smart redirect based on hasStores flag
- **sign-up.tsx**: Always redirects to connect-store
- **connect-store.tsx**: Uses correct /api/stores/:storeId/scans endpoint
- **scanning.tsx**: Fetches actual scan results from backend

### Known Limitations (Will Implement in Backend Phase):
1. **Only 3 critical issues show** - Mock data hardcoded. Will pull from Llama 3.3 70B AI via Groq
2. **No plan-based enforcement in database** - Currently client-side. Backend will enforce at query level
3. **Stats/scores are generated randomly** - Will pull real Shopify store analytics
4. **Payment endpoints need Shopify integration** - Currently return metadata

## Tech Stack
- Frontend: React 18 + TypeScript + Tailwind CSS
- UI Components: Shadcn/ui + Radix UI
- Forms: React Hook Form + Zod
- Query: TanStack React Query v5
- Routing: Wouter
- Backend: Express + Drizzle ORM
- Database: PostgreSQL (Neon)
