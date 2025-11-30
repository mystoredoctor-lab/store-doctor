import { useLocalStorage } from './useLocalStorage';

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
}

const defaultPosts: BlogPost[] = [
  {
    id: 1,
    title: "How AI-Powered Store Analysis is Revolutionizing E-commerce in 2025",
    slug: "ai-powered-store-analysis",
    excerpt: "Discover how artificial intelligence is transforming the way online merchants optimize their stores and boost revenue with intelligent diagnostics.",
    content: "Artificial intelligence has fundamentally transformed how e-commerce businesses operate. What once required manual analysis and guesswork now happens automatically through machine learning algorithms.",
    category: "Technology",
    author: "Sarah Chen",
    date: "November 15, 2025",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1677442d019cecf8920f254b09b04b24143f3f7fa?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    title: "The Complete Guide to E-commerce SEO: Strategies That Drive Organic Traffic in 2025",
    slug: "shopify-seo-guide",
    excerpt: "Learn proven SEO strategies that top e-commerce merchants use to dominate search rankings and attract consistent organic traffic.",
    content: "Search engine optimization remains the most cost-effective way to drive traffic to e-commerce stores. Unlike paid advertising, which stops working when you stop paying, SEO builds lasting value.",
    category: "SEO",
    author: "Marcus Johnson",
    date: "November 12, 2025",
    readTime: "15 min read",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    title: "5 Critical Issues Killing Your Online Store's Conversion Rate and How to Fix Them",
    slug: "conversion-rate-optimization",
    excerpt: "Identify and fix the most common conversion killers that are costing your e-commerce business thousands in lost revenue.",
    content: "The average e-commerce conversion rate hovers between 2-3%. This means 97-98% of visitors leave without purchasing. Many businesses are leaving substantial money on the table by ignoring conversion killers.",
    category: "Conversion",
    author: "Emma Williams",
    date: "October 28, 2025",
    readTime: "14 min read",
    image: "https://images.unsplash.com/photo-1460925895917-adf4e565c472?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    title: "Mobile Optimization in E-commerce: Why Your Store Must Be Mobile-First in 2025",
    slug: "mobile-optimization",
    excerpt: "Why mobile optimization isn't optional and how to ensure your e-commerce store performs flawlessly on all devices.",
    content: "Mobile commerce has transformed from a niche market to the dominant sales channel. Over 70% of e-commerce traffic now comes from mobile devices.",
    category: "Mobile",
    author: "John Smith",
    date: "October 22, 2025",
    readTime: "13 min read",
    image: "https://images.unsplash.com/photo-1512941691920-25bda36dc643?w=400&h=300&fit=crop",
  },
  {
    id: 5,
    title: "Website Speed Optimization: The Complete Technical Guide to Faster E-commerce Sites",
    slug: "website-speed-optimization",
    excerpt: "Master the technical aspects of website speed optimization and learn how faster-loading pages increase revenue and rankings.",
    content: "Website speed isn't just about user experience—it directly impacts revenue. Amazon found that every 100ms of slowness cost them 1% of sales.",
    category: "Performance",
    author: "Lisa Rodriguez",
    date: "October 15, 2025",
    readTime: "16 min read",
    image: "https://images.unsplash.com/photo-1551073645-f4c6bff1c85b?w=400&h=300&fit=crop",
  },
  {
    id: 6,
    title: "E-commerce Security: Complete Guide to Protecting Your Store and Customer Data",
    slug: "ecommerce-security",
    excerpt: "Essential security practices every e-commerce merchant needs to implement to protect customer data and build customer trust.",
    content: "E-commerce security breaches are costly. The average data breach costs businesses $3.86 million. Beyond financial costs, breaches damage reputation and erode customer trust.",
    category: "Security",
    author: "David Kim",
    date: "October 8, 2025",
    readTime: "14 min read",
    image: "https://images.unsplash.com/photo-1563986768711-b3bbb3c0ae2e?w=400&h=300&fit=crop",
  },
  {
    id: 7,
    title: "Shopify Product Page Optimization: Complete SEO Checklist for 2025",
    slug: "shopify-product-page-seo",
    excerpt: "Master product page optimization with this complete SEO checklist. Learn how to structure product pages that rank higher and convert better on Shopify stores.",
    content: "Product pages are the foundation of e-commerce SEO. Each product page is an opportunity to capture search traffic and drive conversions. Optimizing product pages correctly can dramatically increase organic visibility and sales.",
    category: "SEO",
    author: "Alex Rivera",
    date: "November 8, 2025",
    readTime: "18 min read",
    image: "https://images.unsplash.com/photo-1523475335684-37898b6baf30?w=400&h=300&fit=crop",
  },
  {
    id: 8,
    title: "Best Shopify Theme for SEO: Top Themes Ranked and Compared for 2025",
    slug: "best-shopify-theme-seo",
    excerpt: "Not all Shopify themes are created equal when it comes to SEO. Compare the best SEO-friendly themes and learn which one will give your store the biggest organic traffic boost.",
    content: "Your Shopify theme choice impacts SEO more than you realize. From page speed to structured data markup, the right theme can accelerate your organic growth significantly.",
    category: "SEO",
    author: "Jordan Martinez",
    date: "November 5, 2025",
    readTime: "14 min read",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
  },
  {
    id: 9,
    title: "Shopify Meta Tags and Schema Markup: Complete Implementation Guide",
    slug: "shopify-meta-tags-schema-markup",
    excerpt: "Implement meta tags and schema markup on Shopify to boost search rankings and rich snippets. Step-by-step guide for maximum SEO impact.",
    content: "Meta tags and schema markup are critical SEO signals that most Shopify store owners overlook. This guide shows you exactly how to implement them for competitive advantage.",
    category: "SEO",
    author: "Taylor Chen",
    date: "October 31, 2025",
    readTime: "16 min read",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop",
  },
  {
    id: 10,
    title: "How to Improve Shopify Store Google Rankings: Advanced SEO Tactics",
    slug: "improve-shopify-google-rankings",
    excerpt: "Go beyond the basics with advanced SEO tactics proven to improve Shopify store rankings in Google. Discover strategies used by top-performing e-commerce brands.",
    content: "Ranking in Google's competitive e-commerce space requires more than basic SEO. Learn advanced tactics including link building, content clusters, and technical SEO optimizations specifically for Shopify.",
    category: "SEO",
    author: "Casey Wright",
    date: "October 25, 2025",
    readTime: "19 min read",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
  },
];

export function useBlogPosts() {
  const [posts] = useLocalStorage<BlogPost[]>("storedoctor_blog_posts_v2", defaultPosts);
  return posts;
}
