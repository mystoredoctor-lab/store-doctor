import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertScanSchema, insertStoreSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // ============ AUTH ENDPOINTS ============
  
  app.post("/api/auth/sign-in", async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password required" });
      }
      
      // Mock authentication - store in session
      (req as any).userId = email;
      
      // Fetch user's stores for smart redirect
      const stores = await storage.getStoresByUserId(email);
      const hasStores = stores && stores.length > 0;
      
      res.json({
        success: true,
        user: {
          email,
          plan: "free", // Default plan - will be fetched from DB in production
        },
        stores: stores || [],
        hasStores,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to sign in" });
    }
  });

  app.post("/api/auth/sign-up", async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ error: "Name, email, and password required" });
      }
      
      // Mock authentication - store in session
      (req as any).userId = email;
      
      // New users start with no stores
      res.json({
        success: true,
        user: {
          email,
          name,
          plan: "free", // All new users start on free plan
        },
        stores: [],
        hasStores: false,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to create account" });
    }
  });

  app.get("/api/auth/google", async (req, res) => {
    try {
      // Mock Google OAuth - in production, this would handle OAuth flow
      // For now, redirect to onboarding (user needs to connect store)
      res.redirect("/onboarding/connect-store");
    } catch (error) {
      res.status(500).json({ error: "Failed to authenticate with Google" });
    }
  });

  app.post("/api/auth/logout", async (req, res) => {
    try {
      // Clear session data
      (req as any).userId = null;
      res.json({ success: true, message: "Logged out successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to logout" });
    }
  });

  // ============ STORES ENDPOINTS ============
  
  // GET all stores for user
  app.get("/api/stores", async (req, res) => {
    try {
      const userId = (req as any).userId || "demo-user";
      if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      const stores = await storage.getStoresByUserId(userId);
      res.json(stores || []);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stores" });
    }
  });

  // GET single store
  app.get("/api/stores/:storeId", async (req, res) => {
    try {
      const store = await storage.getStore(req.params.storeId);
      if (!store) return res.status(404).json({ error: "Store not found" });
      res.json(store);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch store" });
    }
  });

  // CREATE store
  app.post("/api/stores", async (req, res) => {
    try {
      const userId = (req as any).userId || "demo-user";
      if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      const store = await storage.createStore({
        userId,
        name: req.body.name,
        url: req.body.url,
        shopifyAccessToken: req.body.shopifyAccessToken,
      });
      res.json(store);
    } catch (error) {
      res.status(400).json({ error: "Failed to create store" });
    }
  });

  // UPDATE store
  app.patch("/api/stores/:storeId", async (req, res) => {
    try {
      const store = await storage.updateStore(req.params.storeId, req.body);
      res.json(store);
    } catch (error) {
      res.status(400).json({ error: "Failed to update store" });
    }
  });

  // DELETE store
  app.delete("/api/stores/:storeId", async (req, res) => {
    try {
      const success = await storage.deleteStore(req.params.storeId);
      if (!success) return res.status(404).json({ error: "Store not found" });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete store" });
    }
  });

  // ============ SCANS ENDPOINTS ============

  // GET all scans for store (with optional filter)
  app.get("/api/stores/:storeId/scans", async (req, res) => {
    try {
      const scans = await storage.getScansByStoreId(req.params.storeId);
      res.json(scans || []);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch scans" });
    }
  });

  // GET single scan with detailed analysis
  app.get("/api/scans/:scanId", async (req, res) => {
    try {
      const scan = await storage.getScan(req.params.scanId);
      if (!scan) return res.status(404).json({ error: "Scan not found" });

      // Include auto-fix history and benchmark data
      const fixHistory = await storage.getAutoFixHistory(req.params.scanId);
      
      res.json({
        ...scan,
        autoFixHistory: fixHistory,
        benchmark: {
          yourStore: {
            name: "Your Store",
            overallScore: scan.overallScore,
            seo: scan.seoScore,
            speed: scan.speedScore,
            ux: scan.uxScore,
            cro: scan.croScore,
            security: scan.securityScore,
            mobile: scan.mobileScore,
          },
          industry: {
            name: "Industry Average",
            overallScore: 68,
            seo: 72,
            speed: 70,
            ux: 75,
            cro: 65,
            security: 88,
            mobile: 71,
          },
          topPerformer: {
            name: "Top Performer",
            overallScore: 85,
            seo: 88,
            speed: 82,
            ux: 89,
            cro: 81,
            security: 94,
            mobile: 86,
          },
        },
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch scan" });
    }
  });

  // CREATE new scan (PRIMARY ROUTE)
  app.post("/api/stores/:storeId/scans", async (req, res) => {
    try {
      const userId = (req as any).userId || "demo-user";
      if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      const scan = await storage.createScan({
        storeId: req.params.storeId,
        userId,
        overallScore: req.body.overallScore || 72,
        seoScore: req.body.seoScore,
        speedScore: req.body.speedScore,
        uxScore: req.body.uxScore,
        croScore: req.body.croScore,
        securityScore: req.body.securityScore,
        mobileScore: req.body.mobileScore,
        issues: req.body.issues || [],
        recommendations: req.body.recommendations || [],
      });
      res.json(scan);
    } catch (error) {
      res.status(400).json({ error: "Failed to create scan" });
    }
  });

  // ============ SMART AI SCAN ENDPOINT ============

  // SMART AI SCAN with Llama 3.3 70B and intelligent sampling
  app.post("/api/stores/:storeId/smart-scan", async (req, res) => {
    try {
      const userId = (req as any).userId || "demo-user";
      if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      const { planType } = req.body;

      if (!planType) {
        return res.status(400).json({ error: "planType required" });
      }

      // Plan-based smart sampling configuration
      const samplingConfig = {
        free: {
          productsToScan: 50,
          analysisDepth: "quick",
          estimatedTokens: 500,
          categories: ["seo", "speed", "ux", "security"],
        },
        pro: {
          productsToScan: 150,
          analysisDepth: "standard",
          estimatedTokens: 2000,
          categories: ["seo", "speed", "ux", "cro", "security", "mobile"],
        },
        advanced: {
          productsToScan: 500,
          analysisDepth: "deep",
          estimatedTokens: 5000,
          categories: ["seo", "speed", "ux", "cro", "security", "mobile"],
        },
      };

      const config = samplingConfig[planType as keyof typeof samplingConfig];
      if (!config) {
        return res.status(400).json({ error: "Invalid plan type" });
      }

      // In production, this would:
      // 1. Fetch store data from Shopify using smart sampling
      // 2. Call Groq API with Llama 3.3 70B model
      // 3. Parse AI response and save to database
      // For now, return realistic mock data based on sampling

      const mockScores = {
        seo: 72 + Math.random() * 20,
        speed: 68 + Math.random() * 20,
        ux: 75 + Math.random() * 15,
        cro: 65 + Math.random() * 25,
        security: 88 + Math.random() * 10,
        mobile: 70 + Math.random() * 20,
      };

      const overallScore = Math.round(
        Object.values(mockScores).reduce((a, b) => a + b) / 6
      );

      const mockIssues = [
        {
          id: "1",
          title: "Mobile Loading Speed",
          category: "speed",
          severity: "high",
          impact: "Affects user experience and SEO rankings",
          recommendation: "Enable GZIP compression and optimize images",
        },
        {
          id: "2",
          title: "Missing SEO Meta Tags",
          category: "seo",
          severity: "high",
          impact: "Reduces search engine visibility",
          recommendation: "Add descriptive meta titles and descriptions to all pages",
        },
        {
          id: "3",
          title: "No SSL Certificate",
          category: "security",
          severity: "critical",
          impact: "Customer data is not encrypted",
          recommendation: "Install an SSL certificate immediately",
        },
      ];

      const scan = await storage.createScan({
        storeId: req.params.storeId,
        userId,
        overallScore,
        seoScore: Math.round(mockScores.seo),
        speedScore: Math.round(mockScores.speed),
        uxScore: Math.round(mockScores.ux),
        croScore: Math.round(mockScores.cro),
        securityScore: Math.round(mockScores.security),
        mobileScore: Math.round(mockScores.mobile),
        issues: mockIssues,
        recommendations: [
          {
            category: "speed",
            items: ["Enable caching", "Compress images", "Use CDN"],
          },
          {
            category: "seo",
            items: ["Optimize meta tags", "Improve site structure", "Add schema markup"],
          },
        ],
      });

      res.json({
        success: true,
        scan,
        sampling: {
          productsScanned: config.productsToScan,
          analysisDepth: config.analysisDepth,
          estimatedTokens: config.estimatedTokens,
          tokenSavings: Math.round(
            ((5000 - config.estimatedTokens) / 5000) * 100
          ),
        },
      });
    } catch (error) {
      console.error("Smart scan error:", error);
      res.status(500).json({ error: "Failed to perform smart scan" });
    }
  });

  // ============ AUTO-FIX ENDPOINTS (ADVANCED FEATURE) ============

  // APPLY auto-fix to issue
  app.post("/api/scans/:scanId/issues/:issueId/auto-fix", async (req, res) => {
    try {
      const userId = (req as any).userId;
      if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      const scan = await storage.getScan(req.params.scanId);
      if (!scan) return res.status(404).json({ error: "Scan not found" });

      // Verify issue exists
      const issue = scan.issues?.find((i: any) => i.id === req.params.issueId);
      if (!issue) return res.status(404).json({ error: "Issue not found" });

      // Apply auto-fix (simulated)
      const updated = await storage.applyAutoFix(req.params.scanId, req.params.issueId);
      
      res.json({
        success: true,
        issue: {
          id: req.params.issueId,
          title: issue.title,
          status: "fixed",
        },
        scan: updated,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to apply auto-fix" });
    }
  });

  // GET auto-fix history
  app.get("/api/scans/:scanId/auto-fixes", async (req, res) => {
    try {
      const history = await storage.getAutoFixHistory(req.params.scanId);
      res.json({ autoFixes: history });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch auto-fix history" });
    }
  });

  // ============ COMPETITION BENCHMARK (ADVANCED FEATURE) ============

  app.get("/api/scans/:scanId/benchmark", async (req, res) => {
    try {
      const scan = await storage.getScan(req.params.scanId);
      if (!scan) return res.status(404).json({ error: "Scan not found" });

      res.json({
        yourStore: {
          name: "Your Store",
          overallScore: scan.overallScore,
          seo: scan.seoScore,
          speed: scan.speedScore,
          ux: scan.uxScore,
          cro: scan.croScore,
          security: scan.securityScore,
          mobile: scan.mobileScore,
        },
        industry: {
          name: "Industry Average",
          overallScore: 68,
          seo: 72,
          speed: 70,
          ux: 75,
          cro: 65,
          security: 88,
          mobile: 71,
        },
        topPerformer: {
          name: "Top Performer",
          overallScore: 85,
          seo: 88,
          speed: 82,
          ux: 89,
          cro: 81,
          security: 94,
          mobile: 86,
        },
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch benchmark data" });
    }
  });

  // ============ ISSUE DETAILS (ADVANCED FEATURE) ============

  app.get("/api/scans/:scanId/issues/:issueId", async (req, res) => {
    try {
      const scan = await storage.getScan(req.params.scanId);
      if (!scan) return res.status(404).json({ error: "Scan not found" });

      const issue = scan.issues?.find((i: any) => i.id === req.params.issueId);
      if (!issue) return res.status(404).json({ error: "Issue not found" });

      res.json({
        ...issue,
        scanId: req.params.scanId,
        autoFixAvailable: true,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch issue details" });
    }
  });

  // ============ USER PROFILE ENDPOINTS ============

  // GET user profile
  app.get("/api/users/:userId/profile", async (req, res) => {
    try {
      res.json({
        success: true,
        userId: req.params.userId,
        profile: {
          email: req.params.userId,
          name: "User",
          plan: "free",
        }
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch profile" });
    }
  });

  // PATCH user profile
  app.patch("/api/users/:userId/profile", async (req, res) => {
    try {
      const { name, email } = req.body;
      res.json({
        success: true,
        profile: { email: email || req.params.userId, name: name || "User" }
      });
    } catch (error) {
      res.status(400).json({ error: "Failed to update profile" });
    }
  });

  // DELETE user account
  app.delete("/api/users/:userId", async (req, res) => {
    try {
      res.json({ success: true, message: "Account deleted" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete account" });
    }
  });

  // ============ USER PLAN ENDPOINTS ============
  
  app.patch("/api/users/:userId/plan", async (req, res) => {
    try {
      const { plan } = req.body;
      if (!plan || !["free", "pro", "advanced"].includes(plan)) {
        return res.status(400).json({ error: "Invalid plan" });
      }
      // Mock update - in production would update database
      res.json({ success: true, userId: req.params.userId, plan });
    } catch (error) {
      res.status(400).json({ error: "Failed to update plan" });
    }
  });

  // ============ ALTERNATIVE SCANS QUERY ENDPOINT ============

  // GET scans by storeId (alternative query endpoint for store-details page)
  app.get("/api/scans", async (req, res) => {
    try {
      const { storeId } = req.query;
      if (!storeId) {
        return res.status(400).json({ error: "storeId query parameter required" });
      }
      const scans = await storage.getScansByStoreId(storeId as string);
      res.json(scans || []);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch scans" });
    }
  });

  // ============ SCAN RESULTS ENDPOINT (WITH PLAN-AWARE DATA) ============
  
  // GET latest scan results for a store (returns plan-specific data)
  app.get("/api/stores/:storeId/scan-results", async (req, res) => {
    try {
      const storeId = req.params.storeId;
      const plan = req.query.plan as string || "free";
      
      // Return mock scan results (will be replaced with real data from database)
      // This endpoint is plan-aware and can return different levels of detail
      const scanResults = {
        storeId,
        plan,
        overallScore: 72,
        scanDate: new Date().toISOString(),
        categories: [
          { name: "SEO", score: 78, icon: "search", color: "#10b981" },
          { name: "Speed", score: 65, icon: "zap", color: "#f59e0b" },
          { name: "UX", score: 82, icon: "layout", color: "#10b981" },
          { name: "CRO", score: 58, icon: "trending-up", color: "#f59e0b" },
          { name: "Security", score: 91, icon: "shield", color: "#10b981" },
          { name: "Mobile", score: 69, icon: "smartphone", color: "#f59e0b" },
        ],
        // Free plan shows limited issues, Pro/Advanced show all
        issuesCount: plan === "free" ? 3 : 8,
        message: "Scan results retrieved successfully",
      };
      
      res.json(scanResults);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch scan results" });
    }
  });

  // ============ PAYMENT ENDPOINTS (SHOPIFY INTEGRATION) ============
  
  app.post("/api/payment/checkout/pro", async (req, res) => {
    try {
      // In production, this would initiate Shopify payment flow
      // For now, return info about the upgrade
      res.json({
        plan: "pro",
        price: 29,
        currency: "USD",
        billingCycle: "monthly",
        message: "Redirect to Shopify checkout - not yet implemented",
        status: "pending_implementation",
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to initiate checkout" });
    }
  });

  app.post("/api/payment/checkout/advanced", async (req, res) => {
    try {
      // In production, this would initiate Shopify payment flow
      // For now, return info about the upgrade
      res.json({
        plan: "advanced",
        price: 99,
        currency: "USD",
        billingCycle: "monthly",
        message: "Redirect to Shopify checkout - not yet implemented",
        status: "pending_implementation",
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to initiate checkout" });
    }
  });

  return httpServer;
}
