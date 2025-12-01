# StoreDoctor Next.js Migration Package

This package contains:
1. ✅ Your current Vite/React/Express app (as reference)
2. ✅ Complete Next.js migration prompt with all code
3. ✅ Admin user setup (mystoredoctor@gmail.com)
4. ✅ Smart AI scanning with token optimization
5. ✅ Vercel deployment instructions

## Quick Start

### Step 1: Upload to New Replit
1. Create a new Replit project
2. Upload this entire folder/zip file
3. Extract if needed

### Step 2: Read the Migration Prompt
Open `COMPLETE_MIGRATION_PROMPT.md` - it contains the complete specification.

### Step 3: Setup Supabase
1. Create Supabase project at https://supabase.com
2. Run the SQL schema from **PART 2: DATABASE MIGRATION**
3. Get your API keys and set environment variables

### Step 4: Create Next.js App
```bash
npx create-next-app@latest storedoctor-nextjs --typescript --tailwind --eslint
cd storedoctor-nextjs
```

### Step 5: Follow the Prompt
- **PART 1:** Copy project structure from prompt
- **PART 2:** Create Supabase schema (includes admin user)
- **PART 3:** Implement smart AI scanning
- **PART 4:** Create API routes
- **PART 5:** Build frontend pages
- **PART 6:** Deploy to Vercel

### Admin Credentials
**Email:** mystoredoctor@gmail.com
**Password:** 11nastore@*#
**Role:** Admin
**Status:** Active (in admin_users table)

## Files in This Package

### Migration Documents
- `COMPLETE_MIGRATION_PROMPT.md` - Full Next.js migration specification
- `MIGRATION_PACKAGE_README.md` - This file
- `SHOPIFY_SCREENSHOTS_GUIDE.md` - Screenshot guide (reference)

### Current App Reference (Vite)
- `client/` - React frontend code
- `server/` - Express backend code
- `shared/` - Shared types and schema
- `package.json` - Current dependencies

### Configuration
- `design_guidelines.md` - UI/design specifications
- `replit.md` - Project notes
- `tailwind.config.ts` - Tailwind configuration
- `.env.example` - Environment variables template

### Assets
- `attached_assets/generated_images/` - App screenshots (5 images)

## Key Features to Implement (In Order)

### Phase 1: Setup
- [ ] Supabase project created
- [ ] Next.js app initialized
- [ ] Environment variables set
- [ ] GitHub repository created

### Phase 2: Database
- [ ] Run SQL schema (users, stores, scans, issues, admin_users)
- [ ] Set up Row Level Security (RLS) policies
- [ ] Create indexes

### Phase 3: Backend
- [ ] NextAuth.js configuration
- [ ] Google OAuth setup
- [ ] Admin login endpoint (/api/admin/login)
- [ ] Stores API routes
- [ ] Scans API routes with Groq integration

### Phase 4: Frontend
- [ ] Landing page (/)
- [ ] Sign In page (/auth/sign-in)
- [ ] Sign Up page (/auth/sign-up)
- [ ] Dashboard (/dashboard)
- [ ] Scan results page (/dashboard/scan)
- [ ] Pricing page (/pricing)
- [ ] Blog pages (/blog)

### Phase 5: Integration
- [ ] Connect frontend to backend APIs
- [ ] Test auth flow
- [ ] Test store management
- [ ] Test scanning with Groq AI
- [ ] Test plan-based restrictions

### Phase 6: Deployment
- [ ] Set Vercel environment variables
- [ ] Deploy to Vercel
- [ ] Test production app
- [ ] Set custom domain (optional)

## Plan Limits (Implemented)

**Free Plan**
- 1 store max
- 1 scan per month
- 50 products sampled
- Quick analysis (~500 tokens)
- Top 3 critical issues
- Categories: SEO, Speed, Mobile

**Pro Plan**
- 2 stores max
- 5 scans per month
- 150 products sampled
- Standard analysis (~2000 tokens)
- All issues
- All categories

**Advanced Plan**
- 5 stores max
- 15 scans per month
- 500 products sampled
- Deep analysis (~5000 tokens)
- Auto-fix suggestions
- All categories + benchmarking

## Token Optimization Savings

- Free: 75% token reduction (2000 → 500)
- Pro: 50% token reduction (4000 → 2000)
- Advanced: 37% token reduction (8000 → 5000)

## Environment Variables

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key

# NextAuth
NEXTAUTH_SECRET=your-generated-secret
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your-google-id
GOOGLE_CLIENT_SECRET=your-google-secret

# Groq AI
GROQ_API_KEY=your-groq-api-key
```

## Current App Structure (For Reference)

The included Vite app has:
- Working UI (landing, dashboard, pricing, blog, auth)
- Authentication system
- Store management
- Scan functionality (mock)
- Plan-based restrictions
- Dark mode support
- Responsive design
- SEO optimization

You can use this as a reference while building the Next.js version.

## Next.js App Structure (To Build)

```
storedoctor-nextjs/
├── app/
│   ├── api/ (API routes)
│   ├── auth/ (Auth pages)
│   ├── dashboard/ (Dashboard pages)
│   ├── pricing/ (Pricing page)
│   ├── blog/ (Blog pages)
│   ├── page.tsx (Landing)
│   └── layout.tsx (Root)
├── components/ (Reusable components)
├── lib/ (Utilities)
├── types/ (TypeScript types)
├── public/ (Static assets)
└── middleware.ts (Route protection)
```

## Deployment to Vercel

1. Push Next.js code to GitHub
2. Connect repo to Vercel project
3. Set environment variables in Vercel dashboard
4. Deploy with `vercel deploy`
5. Auto-deploys on push to main branch

## Support

- Full prompt included in `COMPLETE_MIGRATION_PROMPT.md`
- Reference current app in `client/`, `server/`, `shared/`
- Screenshots in `attached_assets/generated_images/`
- Design guidelines in `design_guidelines.md`

## Notes

- The current Vite app remains unchanged and can be used as reference
- The Next.js app is completely new and separate
- Smart sampling reduces token costs by 50-75%
- Admin authentication uses bcrypt hashing
- All API routes have proper error handling
- Row Level Security (RLS) on Supabase for data protection

---

**Ready to start migrating? Open `COMPLETE_MIGRATION_PROMPT.md` and follow it section by section!**
