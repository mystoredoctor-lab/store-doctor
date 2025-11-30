import type { Store, Scan, User, ScanIssue, ScanRecommendation, ScanCategory } from "@shared/schema";
import { pricingPlans } from "@shared/schema";
import profileImage from "@assets/generated_images/professional_male_profile_picture.png";

export { pricingPlans };

export const mockUser: User = {
  id: "user_123",
  email: "john@mystore.com",
  name: "John Merchant",
  avatar: profileImage,
  plan: "advanced",
  createdAt: new Date("2025-11-20"),
};

export const mockStores: Store[] = [
  {
    id: "store_1",
    userId: "user_123",
    name: "Fashion Forward",
    url: "fashionforward.myshopify.com",
    shopifyAccessToken: null,
    healthScore: 87,
    status: "healthy",
    issuesCount: 3,
    lastScanAt: new Date("2025-11-20"),
    createdAt: new Date("2025-11-20"),
  },
  {
    id: "store_2",
    userId: "user_123",
    name: "Tech Gadgets Pro",
    url: "techgadgetspro.myshopify.com",
    shopifyAccessToken: null,
    healthScore: 62,
    status: "warning",
    issuesCount: 12,
    lastScanAt: new Date("2025-11-20"),
    createdAt: new Date("2025-11-20"),
  },
  {
    id: "store_3",
    userId: "user_123",
    name: "Home & Garden Hub",
    url: "homegardenhub.myshopify.com",
    shopifyAccessToken: null,
    healthScore: 45,
    status: "critical",
    issuesCount: 24,
    lastScanAt: new Date("2025-11-20"),
    createdAt: new Date("2025-11-20"),
  },
];

export const dashboardStats = {
  scansLeft: 7,
  totalScans: 10,
  lastScanDate: "2025-11-20",
  averageHealthScore: 65,
  totalStores: 3,
  totalIssuesFound: 39,
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

export const mockScanResults = {
  overallScore: 72,
  scanDate: "2025-11-20T14:30:00Z",
  categories: mockScanCategories,
  criticalIssues: mockScanIssues,
  recommendations: mockScanRecommendations,
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
