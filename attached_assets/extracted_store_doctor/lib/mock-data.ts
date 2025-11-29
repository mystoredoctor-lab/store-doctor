// =====================================================
// MOCK DATA FILE - Replace with actual API calls later
// =====================================================

// User profile mock data
export const mockUser = {
  id: "user_123",
  name: "John Merchant",
  email: "john@mystore.com",
  avatar: "/diverse-user-avatars.png",
  plan: "pro" as const,
  createdAt: "2024-01-15",
}

// Pricing plans configuration
export const pricingPlans = [
  {
    id: "free",
    name: "Free",
    price: 0,
    interval: "month",
    description: "Perfect for trying out Store Doctor",
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
]

// Mock stores data
export const mockStores = [
  {
    id: "store_1",
    name: "Fashion Forward",
    url: "fashionforward.myshopify.com",
    healthScore: 87,
    lastScan: "2024-01-20",
    status: "healthy" as const,
    issues: 3,
  },
  {
    id: "store_2",
    name: "Tech Gadgets Pro",
    url: "techgadgetspro.myshopify.com",
    healthScore: 62,
    lastScan: "2024-01-18",
    status: "warning" as const,
    issues: 12,
  },
  {
    id: "store_3",
    name: "Home & Garden Hub",
    url: "homegardenhub.myshopify.com",
    healthScore: 45,
    lastScan: "2024-01-15",
    status: "critical" as const,
    issues: 24,
  },
]

// Dashboard stats
export const dashboardStats = {
  scansLeft: 7,
  totalScans: 10,
  lastScanDate: "2024-01-20",
  averageHealthScore: 65,
  totalStores: 3,
  totalIssuesFound: 39,
}

// Scan results mock data
export const mockScanResults = {
  overallScore: 72,
  scanDate: "2024-01-20T14:30:00Z",
  categories: [
    { name: "SEO", score: 78, icon: "search", color: "#10b981" },
    { name: "Speed", score: 65, icon: "zap", color: "#f59e0b" },
    { name: "UX", score: 82, icon: "layout", color: "#10b981" },
    { name: "CRO", score: 58, icon: "trending-up", color: "#f59e0b" },
    { name: "Security", score: 91, icon: "shield", color: "#10b981" },
    { name: "Mobile", score: 69, icon: "smartphone", color: "#f59e0b" },
  ],
  criticalIssues: [
    {
      id: "issue_1",
      title: "Missing meta descriptions on 15 product pages",
      category: "SEO",
      severity: "high",
      impact: "Can reduce click-through rates from search results by up to 30%",
      recommendation: "Add unique, compelling meta descriptions (150-160 chars) to each product page",
    },
    {
      id: "issue_2",
      title: "Large unoptimized images causing slow load times",
      category: "Speed",
      severity: "high",
      impact: "Page load time increased by 3.2 seconds, potentially losing 40% of visitors",
      recommendation: "Compress images and use WebP format. Consider lazy loading for below-fold images",
    },
    {
      id: "issue_3",
      title: "No trust badges on checkout page",
      category: "CRO",
      severity: "medium",
      impact: "Cart abandonment may increase by 15-20% without visible security indicators",
      recommendation: "Add SSL badge, payment icons, and money-back guarantee near checkout button",
    },
    {
      id: "issue_4",
      title: "Mobile menu not accessible via keyboard",
      category: "UX",
      severity: "medium",
      impact: "Accessibility issues affecting 15% of users",
      recommendation: "Ensure all interactive elements are keyboard-navigable",
    },
    {
      id: "issue_5",
      title: "Missing alt text on hero images",
      category: "SEO",
      severity: "low",
      impact: "Reduced image search visibility and accessibility concerns",
      recommendation: "Add descriptive alt text to all images",
    },
  ],
  recommendations: [
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
  ],
}

// Chart data for scan history
export const scanHistoryData = [
  { date: "Jan 1", score: 45 },
  { date: "Jan 5", score: 52 },
  { date: "Jan 10", score: 58 },
  { date: "Jan 15", score: 65 },
  { date: "Jan 20", score: 72 },
]

// Issue severity distribution for bar chart
export const issueSeverityData = [
  { severity: "Critical", count: 2, color: "#ef4444" },
  { severity: "High", count: 5, color: "#f97316" },
  { severity: "Medium", count: 12, color: "#f59e0b" },
  { severity: "Low", count: 20, color: "#10b981" },
]

// Category breakdown for pie chart
export const categoryBreakdownData = [
  { name: "SEO", value: 25, color: "#3b82f6" },
  { name: "Speed", value: 20, color: "#10b981" },
  { name: "UX", value: 18, color: "#8b5cf6" },
  { name: "CRO", value: 15, color: "#f59e0b" },
  { name: "Security", value: 12, color: "#ef4444" },
  { name: "Mobile", value: 10, color: "#06b6d4" },
]

// Admin dashboard mock data
export const adminStats = {
  totalUsers: 2847,
  totalInstalls: 3521,
  freeUsers: 2102,
  paidUsers: 745,
  conversionRate: 26.2,
  mrr: 12840,
  arr: 154080,
  uninstalls: 234,
  dailyScans: 892,
  monthlyScans: 24650,
  churnRate: 4.2,
}

// Admin chart data
export const adminUserGrowthData = [
  { month: "Aug", users: 1200 },
  { month: "Sep", users: 1580 },
  { month: "Oct", users: 1920 },
  { month: "Nov", users: 2340 },
  { month: "Dec", users: 2650 },
  { month: "Jan", users: 2847 },
]

export const adminRevenueData = [
  { month: "Aug", revenue: 6200 },
  { month: "Sep", revenue: 7800 },
  { month: "Oct", revenue: 9400 },
  { month: "Nov", revenue: 10800 },
  { month: "Dec", revenue: 11900 },
  { month: "Jan", revenue: 12840 },
]

export const adminTokenUsageData = [
  { day: "Mon", tokens: 45000 },
  { day: "Tue", tokens: 52000 },
  { day: "Wed", tokens: 48000 },
  { day: "Thu", tokens: 61000 },
  { day: "Fri", tokens: 55000 },
  { day: "Sat", tokens: 32000 },
  { day: "Sun", tokens: 28000 },
]

export const adminRecentUsers = [
  { id: 1, name: "Sarah Johnson", email: "sarah@store.com", plan: "Pro", joinedAt: "2024-01-20" },
  { id: 2, name: "Mike Chen", email: "mike@shop.com", plan: "Free", joinedAt: "2024-01-19" },
  { id: 3, name: "Emma Wilson", email: "emma@boutique.com", plan: "Advanced", joinedAt: "2024-01-18" },
  { id: 4, name: "James Brown", email: "james@retail.com", plan: "Pro", joinedAt: "2024-01-17" },
  { id: 5, name: "Lisa Garcia", email: "lisa@ecom.com", plan: "Free", joinedAt: "2024-01-16" },
]

// Landing page features
export const landingFeatures = [
  {
    title: "Comprehensive Health Scans",
    description:
      "Analyze your store across 6 critical categories: SEO, Speed, UX, CRO, Security, and Mobile optimization.",
    icon: "activity",
  },
  {
    title: "Actionable Recommendations",
    description: "Get specific, prioritized recommendations to fix issues and improve your store's performance.",
    icon: "list-checks",
  },
  {
    title: "Performance Tracking",
    description: "Track your store's health score over time and measure the impact of your improvements.",
    icon: "trending-up",
  },
  {
    title: "Multiple Store Support",
    description: "Manage and monitor multiple Shopify stores from a single dashboard.",
    icon: "store",
  },
  {
    title: "Competition Benchmark",
    description: "See how your store compares to industry standards and competitors.",
    icon: "bar-chart-2",
  },
  {
    title: "Autofix Suggestions",
    description: "One-click fixes for common issues to save you time and effort.",
    icon: "wand-2",
  },
]

// Navigation items
export const sidebarNavItems = [
  { name: "Dashboard", href: "/dashboard", icon: "layout-dashboard" },
  { name: "Stores", href: "/dashboard/stores", icon: "store" },
  { name: "Scan Results", href: "/dashboard/scan", icon: "activity" },
  { name: "Settings", href: "/dashboard/settings", icon: "settings" },
]

export const adminNavItems = [
  { name: "Overview", href: "/admin", icon: "layout-dashboard" },
  { name: "Users", href: "/admin/users", icon: "users" },
  { name: "Analytics", href: "/admin/analytics", icon: "bar-chart-2" },
  { name: "Settings", href: "/admin/settings", icon: "settings" },
]
