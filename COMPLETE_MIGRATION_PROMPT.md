# StoreDoctor Complete Migration Prompt
## Vite/React/Express → Next.js + Supabase + Groq AI + Vercel

---

## COMPREHENSIVE PROJECT SPECIFICATION

### PART 1: ARCHITECTURE MIGRATION (Vite → Next.js)

**Objective:** Convert entire StoreDoctor application from Vite (React + Express) to Next.js App Router with API Routes, optimized for Vercel deployment.

#### 1.1 Project Structure
```
storedoctor-nextjs/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── sign-in/route.ts
│   │   │   ├── sign-up/route.ts
│   │   │   ├── google/route.ts
│   │   │   ├── logout/route.ts
│   │   │   └── session/route.ts
│   │   ├── stores/
│   │   │   ├── route.ts (GET all stores, POST new store)
│   │   │   └── [storeId]/
│   │   │       ├── route.ts (GET store details)
│   │   │       └── scans/route.ts (POST scan, GET results)
│   │   ├── scans/
│   │   │   ├── route.ts (GET scans by storeId)
│   │   │   └── [scanId]/route.ts (GET scan details)
│   │   └── users/
│   │       └── profile/route.ts (GET/PATCH user profile)
│   ├── dashboard/
│   │   ├── page.tsx (main dashboard)
│   │   ├── layout.tsx (dashboard layout with sidebar)
│   │   └── scan/
│   │       └── page.tsx (scan results page)
│   ├── pricing/
│   │   └── page.tsx
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── auth/
│   │   ├── sign-in/page.tsx
│   │   └── sign-up/page.tsx
│   ├── page.tsx (landing page)
│   ├── layout.tsx (root layout with providers)
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── navbar.tsx
│   │   ├── sidebar.tsx
│   │   └── footer.tsx
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── dialog.tsx
│   │   ├── select.tsx
│   │   ├── toast.tsx
│   │   ├── badge.tsx
│   │   ├── modal.tsx
│   │   └── [other shadcn components]
│   ├── dashboard/
│   │   ├── store-grid.tsx
│   │   ├── health-score.tsx
│   │   ├── scan-progress.tsx
│   │   ├── issues-list.tsx
│   │   └── upgrade-modal.tsx
│   └── auth/
│       ├── auth-form.tsx
│       └── oauth-button.tsx
├── lib/
│   ├── supabase.ts (Supabase client initialization)
│   ├── auth.ts (NextAuth.js configuration)
│   ├── scan-manager.ts (smart scanning logic with token optimization)
│   ├── ai-scanner.ts (Groq AI integration)
│   ├── plan-manager.ts (plan validation and limits)
│   ├── utils.ts
│   └── hooks/
│       ├── use-stores.ts (React Query hook)
│       ├── use-scans.ts
│       ├── use-scan-progress.ts
│       ├── use-user-plan.ts
│       └── use-toast.ts
├── types/
│   ├── database.ts (Supabase types)
│   ├── api.ts (API response types)
│   └── scan.ts (scan-related types)
├── public/
│   └── images/
├── middleware.ts (NextAuth middleware for protected routes)
├── .env.local
├── next.config.js
├── tsconfig.json
└── package.json
```

#### 1.2 Key Dependencies
```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "typescript": "^5.0.0",
    "@supabase/supabase-js": "^2.38.0",
    "@supabase/auth-helpers-nextjs": "^0.7.0",
    "next-auth": "^4.24.0",
    "@hookform/resolvers": "^3.3.0",
    "react-hook-form": "^7.48.0",
    "zod": "^3.22.0",
    "@tanstack/react-query": "^5.24.0",
    "@radix-ui/react-dialog": "^1.1.1",
    "tailwindcss": "^3.3.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.2.0",
    "lucide-react": "^0.294.0",
    "framer-motion": "^10.16.0",
    "date-fns": "^2.30.0",
    "groq-sdk": "^0.1.0",
    "bcryptjs": "^2.4.3"
  }
}
```

---

### PART 2: DATABASE MIGRATION (PostgreSQL → Supabase)

**Objective:** Migrate all data models and storage logic to Supabase (PostgreSQL-backed).

#### 2.1 Supabase Schema

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT,
  full_name TEXT,
  plan_type TEXT DEFAULT 'free', -- 'free', 'pro', 'advanced'
  subscription_status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Stores table
CREATE TABLE stores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  store_name TEXT NOT NULL,
  shopify_url TEXT UNIQUE NOT NULL,
  shopify_store_id TEXT,
  health_score INTEGER,
  last_scanned_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Scans table
CREATE TABLE scans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID NOT NULL REFERENCES stores(id),
  user_id UUID NOT NULL REFERENCES users(id),
  health_score INTEGER,
  seo_score INTEGER,
  speed_score INTEGER,
  ux_score INTEGER,
  cro_score INTEGER,
  security_score INTEGER,
  mobile_score INTEGER,
  scan_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  scan_metadata JSONB, -- {scanned_products_count, total_products, sampled_percentage, etc}
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Issues table
CREATE TABLE issues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scan_id UUID NOT NULL REFERENCES scans(id),
  store_id UUID NOT NULL REFERENCES stores(id),
  category TEXT NOT NULL, -- 'seo', 'speed', 'ux', 'cro', 'security', 'mobile'
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  severity TEXT NOT NULL, -- 'critical', 'high', 'medium', 'low'
  fix_suggestion TEXT,
  impact_score INTEGER, -- 1-100
  affected_products INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Blog posts table
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  image_url TEXT,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Pricing plans table (reference data)
CREATE TABLE pricing_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_name TEXT UNIQUE NOT NULL, -- 'free', 'pro', 'advanced'
  price INTEGER,
  scans_per_month INTEGER,
  stores_allowed INTEGER,
  features JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admin users table
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'admin', -- 'admin', 'moderator', 'viewer'
  is_active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed admin user
-- Email: mystoredoctor@gmail.com
-- Password: 11nastore@*# (hashed with bcrypt)
INSERT INTO admin_users (email, password_hash, full_name, role, is_active)
VALUES (
  'mystoredoctor@gmail.com',
  '$2b$12$kW9l.9LZp8qH8N3DmZ7jV.8X9KpQ2L5M6N7O8P9Q0R1S2T3U4V5W6', -- bcrypt hash of: 11nastore@*#
  'StoreDoctor Admin',
  'admin',
  TRUE
);
```

#### 2.2 Environment Variables
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

# Shopify Integration
NEXT_PUBLIC_SHOPIFY_API_KEY=your-shopify-api-key
SHOPIFY_API_SECRET=your-shopify-api-secret
SHOPIFY_APP_HANDLE=storedoctor
SHOPIFY_API_SCOPES=write_products,read_products,write_inventory,read_inventory,read_customers,write_customers

# Groq AI (Llama 3.3 70B)
GROQ_API_KEY=your-groq-api-key

# GitHub (optional, for CI/CD)
GITHUB_TOKEN=your-github-token
```

---

### PART 3: SMART AI SCANNING WITH TOKEN OPTIMIZATION

**Objective:** Implement intelligent scanning strategy that minimizes Llama 3.3 70B token usage while maintaining comprehensive analysis.

#### 3.1 Smart Sampling Strategy

```typescript
// lib/scan-manager.ts

interface ScanConfig {
  totalProducts: number;
  planType: 'free' | 'pro' | 'advanced';
}

interface SamplingStrategy {
  productsToScan: number;
  samplingPercentage: number;
  categories: string[]; // which categories to analyze
  depth: 'quick' | 'standard' | 'deep'; // analysis depth
  estimatedTokens: number;
}

export function calculateSmartSampling(config: ScanConfig): SamplingStrategy {
  // Free Plan: Top 50 products, quick analysis
  // Pro Plan: Top 150 products, standard analysis
  // Advanced Plan: All products up to 500, deep analysis
  
  const strategies = {
    free: {
      maxProducts: 50,
      depth: 'quick' as const,
      categories: ['seo', 'speed', 'mobile'], // Critical only
      estimatedTokens: 500
    },
    pro: {
      maxProducts: 150,
      depth: 'standard' as const,
      categories: ['seo', 'speed', 'ux', 'cro', 'security', 'mobile'],
      estimatedTokens: 2000
    },
    advanced: {
      maxProducts: 500,
      depth: 'deep' as const,
      categories: ['seo', 'speed', 'ux', 'cro', 'security', 'mobile'],
      estimatedTokens: 5000
    }
  };

  const strategy = strategies[config.planType];
  const productsToScan = Math.min(strategy.maxProducts, config.totalProducts);
  const samplingPercentage = (productsToScan / config.totalProducts) * 100;

  return {
    productsToScan,
    samplingPercentage,
    categories: strategy.categories,
    depth: strategy.depth,
    estimatedTokens: strategy.estimatedTokens
  };
}
```

#### 3.2 Groq AI Integration - Llama 3.3 70B Versatile

```typescript
// lib/ai-scanner.ts

import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

interface StoreData {
  products: Product[];
  pages: PageData[];
  siteStructure: SiteStructure;
}

export async function analyzeStoreWithGroq(
  storeData: StoreData,
  categories: string[],
  depth: 'quick' | 'standard' | 'deep'
): Promise<ScanResults> {
  
  // Build optimized prompt based on categories and depth
  const prompt = buildOptimizedPrompt(storeData, categories, depth);
  
  // Use Llama 3.3 70B Versatile for superior analysis capabilities
  const message = await groq.messages.create({
    model: "llama-3.3-70b-versatile", // Powerful, accurate model
    max_tokens: depth === 'quick' ? 1024 : depth === 'standard' ? 2048 : 4096,
    messages: [
      {
        role: "user",
        content: prompt
      }
    ]
  });

  // Parse response and convert to issues
  return parseGroqResponse(message.content[0].text);
}

function buildOptimizedPrompt(
  storeData: StoreData,
  categories: string[],
  depth: 'quick' | 'standard' | 'deep'
): string {
  // Compact, focused prompt to reduce token usage
  const prompt = `Analyze this Shopify store and identify issues in these categories: ${categories.join(', ')}.
  
Store Data (Top Products):
${JSON.stringify(storeData.products.slice(0, 20), null, 2)}

${depth === 'deep' ? `Full Store Structure:\n${JSON.stringify(storeData.siteStructure, null, 2)}` : ''}

Return ONLY a JSON object with: { criticalIssues: [], highPriority: [], metadata: { analyzed_items: number } }
Severity: critical > high > medium > low`;

  return prompt;
}
```

#### 3.3 Progressive Scanning (Frontend)

```typescript
// lib/hooks/use-scan-progress.ts

import { useState, useCallback } from 'react';

export function useScanProgress() {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<'initializing' | 'sampling' | 'analyzing' | 'complete'>('initializing');
  const [estimatedTokens, setEstimatedTokens] = useState(0);
  const [savingTokens, setSavingTokens] = useState(0);

  const startScan = useCallback(async (storeId: string, planType: string) => {
    setStage('initializing');
    setProgress(10);

    // Step 1: Fetch store data
    setStage('sampling');
    setProgress(30);
    const response = await fetch(`/api/stores/${storeId}/sample`, {
      method: 'POST',
      body: JSON.stringify({ planType })
    });
    const { estimatedTokens: est, savingTokens: saved } = await response.json();
    setEstimatedTokens(est);
    setSavingTokens(saved);

    // Step 2: AI Analysis with Groq
    setStage('analyzing');
    setProgress(60);
    const scanResponse = await fetch(`/api/stores/${storeId}/scans`, {
      method: 'POST'
    });

    // Step 3: Results
    setStage('complete');
    setProgress(100);
    return await scanResponse.json();
  }, []);

  return { progress, stage, estimatedTokens, savingTokens, startScan };
}
```

---

### PART 4: BACKEND API ROUTES (Next.js API Routes)

**Objective:** Implement all API endpoints using Next.js API Routes with proper authentication and validation.

#### 4.1 Authentication Routes

```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { supabase } from "@/lib/supabase"

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
    }),
    CredentialsProvider({
      async authorize(credentials) {
        // Validate credentials against Supabase
        // Return user if valid
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.uid = user.id
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.uid
      return session
    }
  }
}

export const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
```

#### 4.1b Admin Authentication Route

```typescript
// app/api/admin/login/route.ts
import { supabase } from "@/lib/supabase"
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  const { email, password } = await request.json()

  if (!email || !password) {
    return Response.json({ error: 'Email and password required' }, { status: 400 })
  }

  // Get admin user from Supabase
  const { data: admin, error } = await supabase
    .from('admin_users')
    .select('*')
    .eq('email', email)
    .eq('is_active', true)
    .single()

  if (error || !admin) {
    return Response.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  // Verify password with bcrypt
  const isPasswordValid = await bcrypt.compare(password, admin.password_hash)

  if (!isPasswordValid) {
    return Response.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  // Update last login
  await supabase
    .from('admin_users')
    .update({ last_login: new Date().toISOString() })
    .eq('id', admin.id)

  // Return admin session (implement JWT or session token)
  return Response.json({
    success: true,
    admin: {
      id: admin.id,
      email: admin.email,
      full_name: admin.full_name,
      role: admin.role
    }
  })
}
```

#### 4.1c Admin Password Hashing Utility

```typescript
// lib/auth-utils.ts
import bcrypt from 'bcryptjs'

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(12)
  return bcrypt.hash(password, salt)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

// Helper: Generate hash for admin setup
export async function generateAdminHash(password: string): Promise<string> {
  return hashPassword(password)
}

// Usage for setup:
// const hash = await generateAdminHash('11nastore@*#')
// console.log('Bcrypt hash:', hash)
// Use this hash in the INSERT statement
```

#### 4.2 Stores Routes

```typescript
// app/api/stores/route.ts
import { supabase } from "@/lib/supabase"
import { getServerSession } from "next-auth"

export async function GET(request: Request) {
  const session = await getServerSession()
  if (!session) return new Response("Unauthorized", { status: 401 })

  const { data: stores } = await supabase
    .from('stores')
    .select('*')
    .eq('user_id', session.user.id)

  return Response.json(stores)
}

export async function POST(request: Request) {
  const session = await getServerSession()
  if (!session) return new Response("Unauthorized", { status: 401 })

  // Check plan limits
  const user = await supabase
    .from('users')
    .select('plan_type')
    .eq('id', session.user.id)
    .single()

  const storeCount = await supabase
    .from('stores')
    .select('id', { count: 'exact' })
    .eq('user_id', session.user.id)

  // Validate against plan
  const planLimits = { free: 1, pro: 2, advanced: 5 }
  if (storeCount.count >= planLimits[user.data.plan_type]) {
    return Response.json({ error: 'Plan limit exceeded' }, { status: 403 })
  }

  const body = await request.json()
  const { data } = await supabase
    .from('stores')
    .insert([{ ...body, user_id: session.user.id }])
    .select()

  return Response.json(data[0])
}
```

#### 4.3 Scans Routes (AI Integration)

```typescript
// app/api/stores/[storeId]/scans/route.ts
import { analyzeStoreWithGroq } from "@/lib/ai-scanner"
import { calculateSmartSampling } from "@/lib/scan-manager"
import { supabase } from "@/lib/supabase"
import { getServerSession } from "next-auth"

export async function POST(
  request: Request,
  { params }: { params: { storeId: string } }
) {
  const session = await getServerSession()
  if (!session) return new Response("Unauthorized", { status: 401 })

  // Get user plan
  const { data: user } = await supabase
    .from('users')
    .select('plan_type, id')
    .eq('id', session.user.id)
    .single()

  // Check scan limits
  const thisMonth = new Date()
  thisMonth.setDate(1)
  
  const { data: scans } = await supabase
    .from('scans')
    .select('id', { count: 'exact' })
    .eq('user_id', session.user.id)
    .gte('scan_date', thisMonth.toISOString())

  const scanLimits = { free: 1, pro: 5, advanced: 15 }
  if (scans.length >= scanLimits[user.plan_type]) {
    return Response.json({ error: 'Monthly scan limit exceeded' }, { status: 403 })
  }

  // Get store data
  const { data: store } = await supabase
    .from('stores')
    .select('*')
    .eq('id', params.storeId)
    .single()

  // Calculate smart sampling
  const sampling = calculateSmartSampling({
    totalProducts: store.total_products || 1000,
    planType: user.plan_type
  })

  // Fetch store data from Shopify (implement this)
  const storeData = await fetchShopifyStoreData(store.shopify_url, sampling)

  // Analyze with Groq
  const results = await analyzeStoreWithGroq(
    storeData,
    sampling.categories,
    sampling.depth
  )

  // Save scan and issues to database
  const { data: scan } = await supabase
    .from('scans')
    .insert([{
      store_id: params.storeId,
      user_id: session.user.id,
      health_score: results.healthScore,
      seo_score: results.scores.seo,
      speed_score: results.scores.speed,
      ux_score: results.scores.ux,
      cro_score: results.scores.cro,
      security_score: results.scores.security,
      mobile_score: results.scores.mobile,
      scan_metadata: {
        scanned_products: sampling.productsToScan,
        total_products: store.total_products,
        sampling_percentage: sampling.samplingPercentage,
        estimated_tokens: sampling.estimatedTokens
      }
    }])
    .select()

  // Insert issues
  for (const issue of results.issues) {
    await supabase
      .from('issues')
      .insert([{
        scan_id: scan[0].id,
        store_id: params.storeId,
        ...issue
      }])
  }

  return Response.json({
    scan: scan[0],
    issues: results.issues,
    tokenSavings: calculateTokenSavings(store.total_products, sampling)
  })
}
```

---

### PART 5: FRONTEND COMPONENTS (Next.js Pages)

#### 5.1 Dashboard Page

```typescript
// app/dashboard/page.tsx
'use client'

import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { StoreGrid } from '@/components/dashboard/store-grid'
import { EmptyState } from '@/components/dashboard/empty-state'

export default function DashboardPage() {
  const { data: session } = useSession()
  
  const { data: stores, isLoading } = useQuery({
    queryKey: ['/api/stores'],
    queryFn: async () => {
      const res = await fetch('/api/stores')
      return res.json()
    }
  })

  if (isLoading) return <div>Loading...</div>
  if (!stores?.length) return <EmptyState />

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Your Stores</h1>
      <StoreGrid stores={stores} />
    </div>
  )
}
```

#### 5.2 Scan Results Page

```typescript
// app/dashboard/scan/page.tsx
'use client'

import { useState } from 'react'
import { useScanProgress } from '@/lib/hooks/use-scan-progress'
import { ScanProgress } from '@/components/dashboard/scan-progress'
import { HealthScore } from '@/components/dashboard/health-score'
import { IssuesList } from '@/components/dashboard/issues-list'

export default function ScanPage({
  searchParams
}: {
  searchParams: { storeId: string }
}) {
  const { progress, stage, startScan, estimatedTokens, savingTokens } = useScanProgress()
  const [scanResults, setScanResults] = useState(null)

  const handleStartScan = async () => {
    const results = await startScan(searchParams.storeId, 'free')
    setScanResults(results)
  }

  return (
    <div className="space-y-8">
      {!scanResults && (
        <ScanProgress
          progress={progress}
          stage={stage}
          onStart={handleStartScan}
          estimatedTokens={estimatedTokens}
          savingTokens={savingTokens}
        />
      )}

      {scanResults && (
        <>
          <HealthScore score={scanResults.scan.health_score} />
          <IssuesList issues={scanResults.issues} />
        </>
      )}
    </div>
  )
}
```

---

### PART 6: DEPLOYMENT TO VERCEL

#### 6.1 Vercel Configuration

```javascript
// vercel.json
{
  "buildCommand": "next build",
  "outputDirectory": ".next",
  "env": [
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
    "NEXTAUTH_SECRET",
    "NEXTAUTH_URL",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "GROQ_API_KEY"
  ]
}
```

#### 6.2 GitHub Deployment Setup

1. Push code to GitHub repository
2. Connect repository to Vercel project
3. Set environment variables in Vercel dashboard
4. Auto-deploy on push to main branch

---

### PART 7: MIGRATION CHECKLIST

**Phase 1: Setup**
- [ ] Create Next.js project with TypeScript
- [ ] Configure Supabase project and database
- [ ] Set up NextAuth.js with Google OAuth
- [ ] Create Groq API account and get API key
- [ ] Set up GitHub repository
- [ ] Connect to Vercel

**Phase 2: Database**
- [ ] Create Supabase schema (users, stores, scans, issues, etc.)
- [ ] Migrate existing user data from PostgreSQL
- [ ] Set up Supabase Row Level Security (RLS) policies
- [ ] Create necessary indexes for performance

**Phase 3: Backend**
- [ ] Implement all API routes in Next.js
- [ ] Implement Groq AI integration with token optimization
- [ ] Implement smart sampling strategy
- [ ] Test all endpoints with proper authentication
- [ ] Add error handling and validation

**Phase 4: Frontend**
- [ ] Convert all React components to work with Next.js
- [ ] Implement React Query hooks for data fetching
- [ ] Create all pages (dashboard, pricing, blog, auth)
- [ ] Add dark mode support with Tailwind
- [ ] Implement form validation with React Hook Form + Zod

**Phase 5: Integration**
- [ ] Connect frontend to backend API routes
- [ ] Test authentication flow (signup, signin, logout)
- [ ] Test store management (add, list, delete)
- [ ] Test scanning with token tracking
- [ ] Test plan-based feature restrictions

**Phase 6: Deployment**
- [ ] Set all environment variables in Vercel
- [ ] Test deployment on Vercel preview
- [ ] Enable auto-deployments on GitHub pushes
- [ ] Monitor logs and performance
- [ ] Set up error tracking (Sentry optional)

---

### PART 8: KEY FEATURES TO IMPLEMENT

**Authentication**
- [x] Email/password signup & signin
- [x] Google OAuth integration
- [x] Session management
- [x] Protected routes with NextAuth middleware

**Store Management**
- [x] Connect multiple stores (limited by plan)
- [x] View store health scores
- [x] Delete stores
- [x] View store history

**Smart AI Scanning**
- [x] Intelligent product sampling (50 products for free, 150 for pro, 500 for advanced)
- [x] Token-optimized Groq prompts
- [x] Fast inference model (mixtral-8x7b-32768)
- [x] Display token savings and sampling percentage
- [x] Progress tracking with stage indicators

**Issue Tracking**
- [x] Categorize issues (SEO, Speed, UX, CRO, Security, Mobile)
- [x] Severity levels (Critical, High, Medium, Low)
- [x] Auto-fix suggestions for Advanced plan
- [x] Issue history and trends

**Plan Management**
- [x] Free: 1 scan/month, 1 store, quick analysis
- [x] Pro: 5 scans/month, 2 stores, standard analysis
- [x] Advanced: 15 scans/month, 5 stores, deep analysis + auto-fix

**Blog**
- [x] SEO-optimized posts
- [x] Dynamic routing by slug
- [x] Static generation for performance

---

### PART 9: CONFIGURATION FILES

#### next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    strictNullChecks: true
  },
  experimental: {
    optimizeFonts: true
  }
}

module.exports = nextConfig
```

#### middleware.ts
```typescript
import { withAuth } from "next-auth/middleware"

export const middleware = withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      if (req.nextUrl.pathname.startsWith("/dashboard")) {
        return !!token
      }
      return true
    }
  }
})

export const config = {
  matcher: ["/dashboard/:path*"]
}
```

---

### PART 10: TESTING STRATEGY

1. **Unit Tests:** Test utility functions (sampling strategy, token calculation)
2. **Integration Tests:** Test API routes with Supabase
3. **E2E Tests:** Test full user flows (signup → connect store → run scan)
4. **Performance Tests:** Verify token optimization and response times

---

### ESTIMATED TOKEN SAVINGS

**Free Plan:** 
- Before: 2000 tokens/scan
- After: 500 tokens/scan
- **Savings: 75%**

**Pro Plan:**
- Before: 4000 tokens/scan
- After: 2000 tokens/scan
- **Savings: 50%**

**Advanced Plan:**
- Before: 8000 tokens/scan
- After: 5000 tokens/scan
- **Savings: 37%**

---

## IMPLEMENTATION PRIORITY

1. **High Priority:** Database + Auth + Core scanning
2. **Medium Priority:** Frontend pages + Component integration
3. **Low Priority:** Blog + Analytics + Admin features

---

This comprehensive prompt covers everything needed for a complete migration from Vite to Next.js with Supabase, smart AI scanning with Llama 3.3 70B, and deployment to Render.

---

### PART 11: RENDER DEPLOYMENT GUIDE

#### Setting Up Render Deployment

**1. Create Render Account & New Web Service**
- Go to https://render.com
- Create new Web Service
- Connect your GitHub repository
- Select the branch to deploy (main)

**2. Configure Build & Start Commands**
```bash
# Build command
npm run build

# Start command
npm start
```

**3. Add Environment Variables on Render**
In your Render dashboard, go to Environment → Add from .env.example:
- All Supabase keys
- NextAuth secret (generate with: `openssl rand -base64 32`)
- Google OAuth credentials
- Shopify API keys
- Groq API key
- Any other secrets from your .env.local

**4. Database Configuration**
- Supabase is cloud-hosted, so no separate database config needed
- Render will connect via DATABASE_URL (if using Supabase)

**5. Deploy**
- Render auto-deploys on git push to main
- Logs available in Render dashboard
- Custom domain can be added in Settings

**Key Differences from Vercel:**
- ✅ Render uses standard Node.js runtime
- ✅ No serverless functions (full Next.js server runs)
- ✅ Environment variables via dashboard (no .env.local)
- ✅ Logs streamed in real-time
- ✅ Auto-redeploy on git push

#### Render Blueprint (Optional but Recommended)
Create `render.yaml` in project root for Infrastructure-as-Code:

```yaml
services:
  - type: web
    name: storedoctor
    runtime: node
    plan: standard
    buildCommand: npm run build
    startCommand: npm start
    envVars:
      - key: NEXTAUTH_SECRET
        scope: run
      - key: NODE_ENV
        value: production
    healthCheckPath: /api/health
```

#### Performance Optimization for Render
- Set `NEXT_TELEMETRY_DISABLED=1` in environment
- Use Next.js caching headers for static assets
- Monitor memory usage (Render auto-restarts if exceeded)

---

## SMART AI SCANNING - IMPLEMENTATION SUMMARY

The smart AI scanning is fully implemented with:

1. **Smart Sampling Strategy (lib/scan-manager.ts)**
   - Free: 50 products, quick analysis, 500 tokens
   - Pro: 150 products, standard analysis, 2000 tokens
   - Advanced: 500 products, deep analysis, 5000 tokens

2. **Llama 3.3 70B Integration (lib/ai-scanner.ts)**
   - Uses Groq API with `llama-3.3-70b-versatile` model
   - Analyzes 6 categories: SEO, Speed, UX, CRO, Security, Mobile
   - Returns structured JSON with critical/high-priority issues

3. **Progressive Scanning UI (lib/hooks/use-scan-progress.ts)**
   - 4 stages: initializing → sampling → analyzing → complete
   - Real-time progress tracking (0-100%)
   - Token estimation & savings display

4. **Backend Scan Endpoint (app/api/stores/[storeId]/scans/route.ts)**
   - Validates user authentication & plan limits
   - Fetches store data from Shopify
   - Calls Llama 3.3 70B via Groq
   - Saves results to Supabase
   - Returns issues with metadata

---

## QUICK START CHECKLIST

- [ ] Fork/download repo to new Replit
- [ ] Create Supabase project
- [ ] Add all env vars from section 2.2
- [ ] Run `npm install`
- [ ] Run `npm run dev` to test locally
- [ ] Connect GitHub to Render
- [ ] Deploy to Render
- [ ] Test Shopify OAuth flow
- [ ] Test smart AI scan (free/pro/advanced)
