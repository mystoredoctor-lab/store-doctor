import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertScanSchema, insertStoreSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // ============ STORES ENDPOINTS ============
  
  // GET all stores for user
  app.get("/api/stores", async (req, res) => {
    try {
      const userId = (req as any).userId || "demo-user";
      const stores = await storage.getStoresByUserId(userId);
      res.json(stores);
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

  // GET all scans for store
  app.get("/api/stores/:storeId/scans", async (req, res) => {
    try {
      const scans = await storage.getScansByStoreId(req.params.storeId);
      res.json(scans);
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

  // CREATE new scan
  app.post("/api/stores/:storeId/scans", async (req, res) => {
    try {
      const userId = (req as any).userId || "demo-user";
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

  // ============ AUTO-FIX ENDPOINTS (ADVANCED FEATURE) ============

  // APPLY auto-fix to issue
  app.post("/api/scans/:scanId/issues/:issueId/auto-fix", async (req, res) => {
    try {
      const scan = await storage.getScan(req.params.scanId);
      if (!scan) return res.status(404).json({ error: "Scan not found" });

      // Verify issue exists
      const issue = scan.issues.find((i: any) => i.id === req.params.issueId);
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

      const issue = scan.issues.find((i: any) => i.id === req.params.issueId);
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

  // ============ PAYMENT ENDPOINTS (NOT IMPLEMENTED) ============
  
  app.get("/api/payment/checkout/pro", async (req, res) => {
    res.status(404).json({ error: "Payment endpoint not implemented" });
  });

  app.get("/api/payment/checkout/advanced", async (req, res) => {
    res.status(404).json({ error: "Payment endpoint not implemented" });
  });

  return httpServer;
}
