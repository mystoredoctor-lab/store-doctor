import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp, jsonb, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Users table
export const users = pgTable("users", {
  id: varchar("id", { length: 255 }).primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  avatar: text("avatar"),
  plan: text("plan").notNull().default("free"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  stores: many(stores),
  scans: many(scans),
}));

// Stores table
export const stores = pgTable("stores", {
  id: varchar("id", { length: 255 }).primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id", { length: 255 }).notNull().references(() => users.id),
  name: text("name").notNull(),
  url: text("url").notNull(),
  shopifyAccessToken: text("shopify_access_token"),
  healthScore: integer("health_score").default(0),
  status: text("status").notNull().default("pending"),
  issuesCount: integer("issues_count").default(0),
  lastScanAt: timestamp("last_scan_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const storesRelations = relations(stores, ({ one, many }) => ({
  user: one(users, {
    fields: [stores.userId],
    references: [users.id],
  }),
  scans: many(scans),
}));

// Scans table
export const scans = pgTable("scans", {
  id: varchar("id", { length: 255 }).primaryKey().default(sql`gen_random_uuid()`),
  storeId: varchar("store_id", { length: 255 }).notNull().references(() => stores.id),
  userId: varchar("user_id", { length: 255 }).notNull().references(() => users.id),
  overallScore: integer("overall_score").notNull(),
  seoScore: integer("seo_score"),
  speedScore: integer("speed_score"),
  uxScore: integer("ux_score"),
  croScore: integer("cro_score"),
  securityScore: integer("security_score"),
  mobileScore: integer("mobile_score"),
  issues: jsonb("issues").$type<ScanIssue[]>().default([]),
  recommendations: jsonb("recommendations").$type<ScanRecommendation[]>().default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const scansRelations = relations(scans, ({ one }) => ({
  store: one(stores, {
    fields: [scans.storeId],
    references: [stores.id],
  }),
  user: one(users, {
    fields: [scans.userId],
    references: [users.id],
  }),
}));

// Contact messages table
export const contactMessages = pgTable("contact_messages", {
  id: varchar("id", { length: 255 }).primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Ratings table
export const ratings = pgTable("ratings", {
  id: varchar("id", { length: 255 }).primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id", { length: 255 }).references(() => users.id),
  rating: integer("rating").notNull(),
  feedback: text("feedback"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Types for JSONB fields
export interface ScanIssue {
  id: string;
  title: string;
  category: string;
  severity: "high" | "medium" | "low";
  impact: string;
  recommendation: string;
}

export interface ScanRecommendation {
  category: string;
  items: string[];
}

export interface ScanCategory {
  name: string;
  score: number;
  icon: string;
  color: string;
}

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertStoreSchema = createInsertSchema(stores).omit({ id: true, createdAt: true, lastScanAt: true });
export const insertScanSchema = createInsertSchema(scans).omit({ id: true, createdAt: true });
export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({ id: true, createdAt: true });
export const insertRatingSchema = createInsertSchema(ratings).omit({ id: true, createdAt: true });

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertStore = z.infer<typeof insertStoreSchema>;
export type Store = typeof stores.$inferSelect;
export type InsertScan = z.infer<typeof insertScanSchema>;
export type Scan = typeof scans.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertRating = z.infer<typeof insertRatingSchema>;
export type Rating = typeof ratings.$inferSelect;

// Pricing plans (static configuration)
export const pricingPlans = [
  {
    id: "free",
    name: "Free",
    price: 0,
    interval: "month",
    description: "Perfect for trying out Store Doctor",
    scansPerMonth: 1,
    maxStores: 1,
    features: [
      { text: "1 scan per month", included: true },
      { text: "Basic health overview", included: true },
      { text: "Top 3 critical issues", included: true },
      { text: "Full analysis & charts", included: false },
      { text: "Conversation insights", included: false },
      { text: "Multiple stores", included: false },
      { text: "Autofix suggestions", included: false },
      { text: "Competition benchmark", included: false },
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: 12,
    interval: "month",
    description: "For growing stores that need insights",
    scansPerMonth: 10,
    maxStores: 2,
    features: [
      { text: "10 scans per month", included: true },
      { text: "Full analysis & charts", included: true },
      { text: "Conversation insights", included: true },
      { text: "All critical issues", included: true },
      { text: "Priority support", included: true },
      { text: "Up to 2 stores", included: true },
      { text: "Autofix suggestions", included: false },
      { text: "Competition benchmark", included: false },
    ],
    cta: "Upgrade to Pro",
    popular: true,
  },
  {
    id: "advanced",
    name: "Advanced",
    price: 25,
    interval: "month",
    description: "For serious merchants who want it all",
    scansPerMonth: 30,
    maxStores: 5,
    features: [
      { text: "30 scans per month", included: true },
      { text: "Full analysis & charts", included: true },
      { text: "Conversation insights", included: true },
      { text: "All critical issues", included: true },
      { text: "Priority support", included: true },
      { text: "Up to 5 stores", included: true },
      { text: "Autofix suggestions", included: true },
      { text: "Competition benchmark", included: true },
    ],
    cta: "Go Advanced",
    popular: false,
  },
] as const;

export type PricingPlan = typeof pricingPlans[number];
