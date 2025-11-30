import type { Store, Scan, User, ScanIssue, ScanRecommendation, ScanCategory } from "@shared/schema";
import { pricingPlans } from "@shared/schema";
import profileImage from "@assets/generated_images/professional_male_profile_picture.png";

export { pricingPlans };

export const mockUser: User = {
  id: "user_123",
  email: "john@mystore.com",
  name: "John Merchant",
  avatar: profileImage,
  plan: "free",
  createdAt: new Date("2025-11-20"),
};

// Plan-specific mock stores
export const mockStoresByPlan = {
  free: [
    {
      id: "store_1",
      userId: "user_123",
      name: "Fashion Forward",
      url: "fashionforward.myshopify.com",
      shopifyAccessToken: null,
      healthScore: 72,
      status: "healthy",
      issuesCount: 3,
      lastScanAt: new Date("2025-11-20"),
      createdAt: new Date("2025-11-20"),
    },
  ],
  pro: [
    {
      id: "store_1",
      userId: "user_123",
      name: "Fashion Forward",
      url: "fashionforward.myshopify.com",
      shopifyAccessToken: null,
      healthScore: 72,
      status: "healthy",
      issuesCount: 8,
      lastScanAt: new Date("2025-11-20"),
      createdAt: new Date("2025-11-20"),
    },
    {
      id: "store_2",
      userId: "user_123",
      name: "Tech Gadgets Pro",
      url: "techgadgets.myshopify.com",
      shopifyAccessToken: null,
      healthScore: 68,
      status: "warning",
      issuesCount: 12,
      lastScanAt: new Date("2025-11-19"),
      createdAt: new Date("2025-11-15"),
    },
  ],
  advanced: [
    {
      id: "store_1",
      userId: "user_123",
      name: "Fashion Forward",
      url: "fashionforward.myshopify.com",
      shopifyAccessToken: null,
      healthScore: 82,
      status: "healthy",
      issuesCount: 8,
      lastScanAt: new Date("2025-11-20"),
      createdAt: new Date("2025-11-20"),
    },
    {
      id: "store_2",
      userId: "user_123",
      name: "Tech Gadgets Pro",
      url: "techgadgets.myshopify.com",
      shopifyAccessToken: null,
      healthScore: 78,
      status: "healthy",
      issuesCount: 12,
      lastScanAt: new Date("2025-11-19"),
      createdAt: new Date("2025-11-15"),
    },
    {
      id: "store_3",
      userId: "user_123",
      name: "Home & Garden Store",
      url: "homeandgarden.myshopify.com",
      shopifyAccessToken: null,
      healthScore: 65,
      status: "warning",
      issuesCount: 15,
      lastScanAt: new Date("2025-11-18"),
      createdAt: new Date("2025-11-10"),
    },
    {
      id: "store_4",
      userId: "user_123",
      name: "Luxury Watches Co",
      url: "luxurywatches.myshopify.com",
      shopifyAccessToken: null,
      healthScore: 88,
      status: "excellent",
      issuesCount: 4,
      lastScanAt: new Date("2025-11-17"),
      createdAt: new Date("2025-11-05"),
    },
    {
      id: "store_5",
      userId: "user_123",
      name: "Organic Beauty",
      url: "organicbeauty.myshopify.com",
      shopifyAccessToken: null,
      healthScore: 75,
      status: "healthy",
      issuesCount: 10,
      lastScanAt: new Date("2025-11-16"),
      createdAt: new Date("2024-11-01"),
    },
  ],
};

export const mockStores = mockStoresByPlan.free;

export const dashboardStats = {
  scansLeft: 1,
  totalScans: 1,
  lastScanDate: "2025-11-20",
  averageHealthScore: 87,
  totalStores: 1,
  totalIssuesFound: 3,
  scanStrategy: "Smart sampling - analyzes top products, key pages, and critical areas only to minimize token usage and scanning time for large stores"
};

export const mockScanCategories: ScanCategory[] = [
  { name: "SEO", score: 78, icon: "search", color: "#10b981" },
  { name: "Speed", score: 65, icon: "zap", color: "#f59e0b" },
  { name: "UX", score: 82, icon: "layout", color: "#10b981" },
  { name: "CRO", score: 58, icon: "trending-up", color: "#f59e0b" },
  { name: "Security", score: 91, icon: "shield", color: "#10b981" },
  { name: "Mobile", score: 69, icon: "smartphone", color: "#f59e0b" },
];

export const mockScanIssues: ScanIssue[] = [
  {
    id: "issue_1",
    title: "Missing meta descriptions on 15 product pages",
    category: "SEO",
    severity: "high",
    impact: "Can reduce click-through rates from search results by up to 30%",
    recommendation: "Add unique, compelling meta descriptions (150-160 chars) to each product page",
    theme: "Dawn 8.1",
    description: "Theme doesn't auto-generate meta descriptions for product pages. Manual addition required in Shopify admin.",
    location: {
      url: "/products/category/shoes",
      page: "Product Listing Pages (PLP)",
      element: "<meta name=\"description\">",
      lineNumbers: "45-60",
      codeSnippet: `<!-- Missing on pages like:
/products/shoes/running
/products/shoes/casual
/products/shoes/formal
Found 15 instances without meta description tag`,
    },
  },
  {
    id: "issue_2",
    title: "Large unoptimized images causing slow load times",
    category: "Speed",
    severity: "high",
    impact: "Page load time increased by 3.2 seconds, potentially losing 40% of visitors",
    recommendation: "Compress images and use WebP format. Consider lazy loading for below-fold images",
    app: "Infinite Scroll",
    theme: "Premium Plus Theme",
    description: "Infinite Scroll app loads all product images without lazy loading, combined with uncompressed images from theme.",
    location: {
      url: "/",
      page: "Homepage & Product Pages",
      element: "<img class=\"hero-banner\">",
      lineNumbers: "24-28",
      codeSnippet: `<!-- Images not optimized:
hero-banner.jpg: 4.2MB (should be <500KB)
product-image-*.jpg: 2.1MB each (should be <800KB)
Using JPEG instead of WebP format`,
    },
  },
  {
    id: "issue_3",
    title: "No trust badges on checkout page",
    category: "CRO",
    severity: "medium",
    impact: "Cart abandonment may increase by 15-20% without visible security indicators",
    recommendation: "Add SSL badge, payment icons, and money-back guarantee near checkout button",
    app: "Checkout Boost",
    description: "Missing trust badge integration in Checkout Boost app configuration. Enable payment method logos in settings.",
    location: {
      url: "/checkout",
      page: "Checkout Page",
      element: ".payment-section",
      lineNumbers: "112-145",
      codeSnippet: `<!-- Missing trust signals in payment area:
No SSL certificate badge display
No payment method logos (Visa, Mastercard, PayPal)
No money-back guarantee message
No customer review ratings visible`,
    },
  },
  {
    id: "issue_4",
    title: "Mobile menu not accessible via keyboard",
    category: "UX",
    severity: "medium",
    impact: "Accessibility issues affecting 15% of users",
    recommendation: "Ensure all interactive elements are keyboard-navigable",
    theme: "Dawn 8.1",
    description: "Theme's mobile navigation menu lacks ARIA attributes and proper keyboard support. Requires theme customization.",
    location: {
      url: "/",
      page: "All Mobile Pages",
      element: ".mobile-nav-menu",
      lineNumbers: "89-110",
      codeSnippet: `<!-- ARIA attributes missing:
- Menu toggle button lacks aria-expanded
- Menu items not keyboard-focusable
- No role="navigation" on menu container
- Tab order not properly managed`,
    },
  },
  {
    id: "issue_5",
    title: "Missing alt text on hero images",
    category: "SEO",
    severity: "low",
    impact: "Reduced image search visibility and accessibility concerns",
    recommendation: "Add descriptive alt text to all images",
    theme: "Premium Plus Theme",
    description: "Hero section allows image upload without requiring alt text. Update images in theme settings.",
    location: {
      url: "/",
      page: "Homepage Hero Section",
      element: "<img class=\"hero-section\">",
      lineNumbers: "15-18",
      codeSnippet: `<!-- Current (bad):
<img src="hero.jpg" />

<!-- Should be:
<img src="hero.jpg" alt="Summer collection sale - 50% off all items" />`,
    },
  },
];

export const mockScanRecommendations: ScanRecommendation[] = [
  {
    category: "Quick Wins",
    items: ["Add meta descriptions to product pages", "Compress hero images", "Add trust badges to checkout"],
  },
  {
    category: "Medium Priority",
    items: ["Implement lazy loading for images", "Improve mobile navigation", "Add structured data markup"],
  },
  {
    category: "Long Term",
    items: ["Complete accessibility audit", "Implement CDN for global performance", "A/B test checkout flow"],
  },
];

// Store-specific issues - each store has realistic issues based on their category scores
const storeIssues = {
  store_1: [mockScanIssues[0], mockScanIssues[1], mockScanIssues[2]], // SEO, Speed, CRO issues
  store_2: [mockScanIssues[1], mockScanIssues[3], mockScanIssues[2], mockScanIssues[4], mockScanIssues[0]], // All 5: Speed, UX, CRO, ALT text, Meta descriptions
  store_3: [mockScanIssues[0], mockScanIssues[1], mockScanIssues[2], mockScanIssues[3], mockScanIssues[4]], // All 5 issues
  store_4: [mockScanIssues[4], mockScanIssues[2]], // Only 2 minor issues: ALT text, CRO
  store_5: [mockScanIssues[2], mockScanIssues[3], mockScanIssues[0]], // CRO, UX, SEO issues
};

// Store-specific scan results
export const mockScanResultsByStore = {
  store_1: {
    overallScore: 72,
    scanDate: "2025-11-20T14:30:00Z",
    categories: mockScanCategories,
    criticalIssues: storeIssues.store_1,
    recommendations: mockScanRecommendations,
  },
  store_2: {
    overallScore: 68,
    scanDate: "2025-11-19T10:15:00Z",
    categories: [
      { name: "SEO", score: 75, icon: "search", color: "#10b981" },
      { name: "Speed", score: 62, icon: "zap", color: "#f59e0b" },
      { name: "UX", score: 70, icon: "layout", color: "#f59e0b" },
      { name: "CRO", score: 65, icon: "trending-up", color: "#10b981" },
      { name: "Security", score: 85, icon: "shield", color: "#10b981" },
      { name: "Mobile", score: 72, icon: "smartphone", color: "#10b981" },
    ],
    criticalIssues: storeIssues.store_2,
    recommendations: mockScanRecommendations,
  },
  store_3: {
    overallScore: 65,
    scanDate: "2025-11-18T09:00:00Z",
    categories: [
      { name: "SEO", score: 60, icon: "search", color: "#f59e0b" },
      { name: "Speed", score: 58, icon: "zap", color: "#f59e0b" },
      { name: "UX", score: 68, icon: "layout", color: "#10b981" },
      { name: "CRO", score: 64, icon: "trending-up", color: "#f59e0b" },
      { name: "Security", score: 75, icon: "shield", color: "#10b981" },
      { name: "Mobile", score: 69, icon: "smartphone", color: "#10b981" },
    ],
    criticalIssues: storeIssues.store_3,
    recommendations: mockScanRecommendations,
  },
  store_4: {
    overallScore: 88,
    scanDate: "2025-11-17T16:45:00Z",
    categories: [
      { name: "SEO", score: 92, icon: "search", color: "#10b981" },
      { name: "Speed", score: 85, icon: "zap", color: "#10b981" },
      { name: "UX", score: 90, icon: "layout", color: "#10b981" },
      { name: "CRO", score: 84, icon: "trending-up", color: "#10b981" },
      { name: "Security", score: 95, icon: "shield", color: "#10b981" },
      { name: "Mobile", score: 86, icon: "smartphone", color: "#10b981" },
    ],
    criticalIssues: storeIssues.store_4,
    recommendations: mockScanRecommendations,
  },
  store_5: {
    overallScore: 75,
    scanDate: "2025-11-16T11:20:00Z",
    categories: [
      { name: "SEO", score: 80, icon: "search", color: "#10b981" },
      { name: "Speed", score: 72, icon: "zap", color: "#10b981" },
      { name: "UX", score: 76, icon: "layout", color: "#10b981" },
      { name: "CRO", score: 70, icon: "trending-up", color: "#f59e0b" },
      { name: "Security", score: 88, icon: "shield", color: "#10b981" },
      { name: "Mobile", score: 75, icon: "smartphone", color: "#10b981" },
    ],
    criticalIssues: storeIssues.store_5,
    recommendations: mockScanRecommendations,
  },
};

export const mockScanResults = mockScanResultsByStore.store_1;

export const competitionBenchmark = {
  yourStore: {
    name: "Fashion Forward",
    overallScore: 72,
    seo: 78,
    speed: 65,
    ux: 82,
    cro: 58,
    security: 91,
    mobile: 69,
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
};

export const scanHistoryData = [
  { date: "Nov 16", score: 45 },
  { date: "Nov 17", score: 52 },
  { date: "Nov 18", score: 58 },
  { date: "Nov 19", score: 65 },
  { date: "Nov 20", score: 72 },
];

export const issueSeverityData = [
  { severity: "Critical", count: 2, color: "#ef4444" },
  { severity: "High", count: 5, color: "#f97316" },
  { severity: "Medium", count: 12, color: "#f59e0b" },
  { severity: "Low", count: 20, color: "#10b981" },
];

export const categoryBreakdownData = [
  { name: "SEO", value: 25, color: "#3b82f6" },
  { name: "Speed", value: 20, color: "#10b981" },
  { name: "UX", value: 18, color: "#8b5cf6" },
  { name: "CRO", value: 15, color: "#f59e0b" },
  { name: "Security", value: 12, color: "#ef4444" },
  { name: "Mobile", value: 10, color: "#06b6d4" },
];

export const testimonials = [
  {
    name: "Sarah Chen",
    role: "Owner, Luxe Boutique",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    content:
      "Store Doctor helped me identify critical SEO issues I didn't even know existed. My organic traffic increased by 40% after implementing their recommendations.",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "Founder, Tech Gadgets Pro",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    content:
      "The speed optimization suggestions alone were worth it. My store loads 3 seconds faster now, and I've seen a noticeable drop in bounce rates.",
    rating: 4,
  },
  {
    name: "Emma Williams",
    role: "E-commerce Manager",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    content:
      "Good actionable insights and the conversion rate analysis helped us improve checkout by 25%. A bit of a learning curve with the interface though.",
    rating: 4,
  },
];

export const features = [
  {
    title: "SEO Analysis",
    description: "Optimize meta tags, headings, alt text, and structured data for better search rankings.",
    icon: "search",
  },
  {
    title: "Speed Optimization",
    description: "Identify slow-loading elements, large images, and render-blocking resources.",
    icon: "zap",
  },
  {
    title: "UX Evaluation",
    description: "Assess navigation, accessibility, and overall user experience patterns.",
    icon: "layout",
  },
  {
    title: "Conversion Rate",
    description: "Find friction points in your checkout and boost your conversion rates.",
    icon: "trending-up",
  },
  {
    title: "Security Check",
    description: "Ensure SSL, secure payments, and protection against common vulnerabilities.",
    icon: "shield",
  },
  {
    title: "Mobile Ready",
    description: "Test mobile responsiveness and touch-friendly interactions.",
    icon: "smartphone",
  },
  {
    title: "Competition Benchmark",
    description: "Compare your store against industry standards and top competitors.",
    icon: "bar-chart-2",
  },
  {
    title: "Autofix Suggestions",
    description: "One-click fixes for common issues to save time and effort.",
    icon: "wand",
  },
];

export const howItWorksSteps = [
  {
    step: "01",
    title: "Connect Your Store",
    description: "Install Store Doctor from the Shopify App Store with one click. No coding required.",
  },
  {
    step: "02",
    title: "Run Your First Scan",
    description: "Our AI analyzes your entire store across 6 critical categories in just minutes.",
  },
  {
    step: "03",
    title: "Get Recommendations",
    description: "Receive prioritized, actionable recommendations tailored to your store.",
  },
  {
    step: "04",
    title: "Implement & Track",
    description: "Apply fixes, track improvements, and watch your health score rise.",
  },
];
