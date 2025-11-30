import { type Store, type Scan, type ScanIssue, type User } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  createUser(user: any): Promise<User>;
  
  // Stores
  getStore(id: string): Promise<Store | undefined>;
  getStoresByUserId(userId: string): Promise<Store[]>;
  createStore(store: any): Promise<Store>;
  updateStore(id: string, updates: any): Promise<Store>;
  deleteStore(id: string): Promise<boolean>;
  
  // Scans
  getScan(id: string): Promise<Scan | undefined>;
  getScansByStoreId(storeId: string): Promise<Scan[]>;
  createScan(scan: any): Promise<Scan>;
  updateScan(id: string, updates: any): Promise<Scan>;
  
  // Auto-fixes
  applyAutoFix(scanId: string, issueId: string): Promise<Scan>;
  getAutoFixHistory(scanId: string): Promise<any[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private stores: Map<string, Store> = new Map();
  private scans: Map<string, Scan> = new Map();
  private autoFixes: Map<string, any[]> = new Map();

  // ============ USERS ============
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async createUser(user: any): Promise<User> {
    const id = randomUUID();
    const newUser: User = {
      id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      plan: user.plan || "free",
      createdAt: new Date(),
    };
    this.users.set(id, newUser);
    return newUser;
  }

  // ============ STORES ============
  async getStore(id: string): Promise<Store | undefined> {
    return this.stores.get(id);
  }

  async getStoresByUserId(userId: string): Promise<Store[]> {
    return Array.from(this.stores.values()).filter((s) => s.userId === userId);
  }

  async createStore(store: any): Promise<Store> {
    const id = randomUUID();
    const newStore: Store = {
      id,
      userId: store.userId,
      name: store.name,
      url: store.url,
      shopifyAccessToken: store.shopifyAccessToken,
      healthScore: 0,
      status: "pending",
      issuesCount: 0,
      lastScanAt: undefined,
      createdAt: new Date(),
    };
    this.stores.set(id, newStore);
    return newStore;
  }

  async updateStore(id: string, updates: any): Promise<Store> {
    const store = this.stores.get(id);
    if (!store) throw new Error("Store not found");
    
    const updated = { ...store, ...updates, lastScanAt: new Date() };
    this.stores.set(id, updated);
    return updated;
  }

  async deleteStore(id: string): Promise<boolean> {
    return this.stores.delete(id);
  }

  // ============ SCANS ============
  async getScan(id: string): Promise<Scan | undefined> {
    return this.scans.get(id);
  }

  async getScansByStoreId(storeId: string): Promise<Scan[]> {
    return Array.from(this.scans.values()).filter((s) => s.storeId === storeId);
  }

  async createScan(scan: any): Promise<Scan> {
    const id = randomUUID();
    const newScan: Scan = {
      id,
      storeId: scan.storeId,
      userId: scan.userId,
      overallScore: scan.overallScore || 72,
      seoScore: scan.seoScore,
      speedScore: scan.speedScore,
      uxScore: scan.uxScore,
      croScore: scan.croScore,
      securityScore: scan.securityScore,
      mobileScore: scan.mobileScore,
      issues: scan.issues || [],
      recommendations: scan.recommendations || [],
      createdAt: new Date(),
    };
    this.scans.set(id, newScan);

    // Update store health score and issues count
    const store = this.stores.get(scan.storeId);
    if (store) {
      store.healthScore = scan.overallScore || 72;
      store.issuesCount = (scan.issues || []).length;
      store.lastScanAt = new Date();
      this.stores.set(scan.storeId, store);
    }

    return newScan;
  }

  async updateScan(id: string, updates: any): Promise<Scan> {
    const scan = this.scans.get(id);
    if (!scan) throw new Error("Scan not found");
    
    const updated = { ...scan, ...updates };
    this.scans.set(id, updated);
    return updated;
  }

  // ============ AUTO-FIXES (ADVANCED FEATURE) ============
  async applyAutoFix(scanId: string, issueId: string): Promise<Scan> {
    const scan = this.scans.get(scanId);
    if (!scan) throw new Error("Scan not found");

    // Find and mark issue as fixed
    const updatedIssues = scan.issues.map((issue: ScanIssue) => 
      issue.id === issueId ? { ...issue, status: "fixed" } : issue
    );

    // Record auto-fix in history
    if (!this.autoFixes.has(scanId)) {
      this.autoFixes.set(scanId, []);
    }
    
    const history = this.autoFixes.get(scanId)!;
    history.push({
      issueId,
      appliedAt: new Date(),
      success: true,
    });

    // Update scan
    const updated: Scan = {
      ...scan,
      issues: updatedIssues,
    };
    this.scans.set(scanId, updated);

    return updated;
  }

  async getAutoFixHistory(scanId: string): Promise<any[]> {
    return this.autoFixes.get(scanId) || [];
  }
}

export const storage = new MemStorage();
