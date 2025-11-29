import { Link } from "wouter";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "How AI-Powered Store Analysis is Revolutionizing E-commerce",
    slug: "ai-powered-store-analysis",
    excerpt: "Discover how artificial intelligence is transforming the way Shopify merchants optimize their stores and boost revenue.",
    content: "AI-powered store analysis has become essential for modern e-commerce businesses. In this comprehensive guide, we explore how machine learning algorithms can identify critical issues in your Shopify store that you might miss. From SEO optimization to conversion rate optimization, AI tools like Store Doctor analyze thousands of data points to provide actionable recommendations that directly impact your bottom line.",
    category: "Technology",
    author: "Sarah Chen",
    date: "January 15, 2025",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1677442d019cecf8920f254b09b04b24143f3f7fa?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    title: "The Complete Guide to Shopify Store SEO in 2025",
    slug: "shopify-seo-guide",
    excerpt: "Learn proven SEO strategies that top Shopify merchants use to dominate search rankings and attract organic traffic.",
    content: "Search engine optimization is critical for Shopify success. This guide covers meta tags, structured data, site speed optimization, mobile responsiveness, and content strategy. We break down technical SEO requirements, on-page optimization best practices, and link-building strategies specifically for e-commerce sites. Implement these strategies to significantly improve your organic visibility.",
    category: "SEO",
    author: "Marcus Johnson",
    date: "January 12, 2025",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    title: "5 Critical Issues Killing Your Store's Conversion Rate",
    slug: "conversion-rate-optimization",
    excerpt: "Identify and fix the most common conversion killers that are costing you thousands in lost revenue.",
    content: "Your store could be losing significant revenue due to preventable issues. This article identifies the five most common conversion killers: slow page speed, unclear value propositions, missing trust signals, complicated checkout processes, and poor mobile experience. We provide specific fixes for each issue with real case studies showing revenue impact. Learn how to audit and improve your conversion funnel systematically.",
    category: "Conversion",
    author: "Emma Williams",
    date: "January 10, 2025",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    title: "Mobile Optimization: Why Your Store Must Be Mobile-First",
    slug: "mobile-optimization",
    excerpt: "Why mobile optimization isn't optional anymore and how to ensure your Shopify store performs flawlessly on all devices.",
    content: "Over 70% of e-commerce traffic comes from mobile devices. Optimizing for mobile isn't just about responsive design—it's about performance, navigation, and conversion. This guide covers viewport configuration, touch-friendly interfaces, mobile payment optimization, and testing strategies. We share benchmark data showing how mobile improvements directly correlate with increased conversions and customer satisfaction.",
    category: "Mobile",
    author: "John Smith",
    date: "January 8, 2025",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1512941691920-25bda36dc643?w=400&h=300&fit=crop",
  },
  {
    id: 5,
    title: "Website Speed Optimization: The Complete Technical Guide",
    slug: "website-speed-optimization",
    excerpt: "Master the technical aspects of website speed optimization and learn how fast-loading pages increase your revenue.",
    content: "Page speed directly impacts user experience and conversion rates. This comprehensive guide covers image optimization, lazy loading, code splitting, server response time, caching strategies, and CDN implementation. We explain the technical details in practical terms and provide specific recommendations for Shopify stores. See how every second of load time affects your bottom line with real-world metrics.",
    category: "Performance",
    author: "Lisa Rodriguez",
    date: "January 5, 2025",
    readTime: "11 min read",
    image: "https://images.unsplash.com/photo-1460925895917-adf4e565c472?w=400&h=300&fit=crop",
  },
  {
    id: 6,
    title: "E-commerce Security: Protecting Your Store and Customers",
    slug: "ecommerce-security",
    excerpt: "Essential security practices every Shopify merchant needs to implement to protect customer data and build trust.",
    content: "Security is paramount in e-commerce. This guide covers SSL certificates, PCI compliance, secure payment processing, fraud detection, data protection, and customer privacy. We explain common vulnerabilities, how hackers exploit them, and concrete steps to secure your store. Trust badges and security certifications also impact conversion rates—learn which ones matter most.",
    category: "Security",
    author: "David Kim",
    date: "January 2, 2025",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=300&fit=crop",
  },
];

const categories = ["All", "Technology", "SEO", "Conversion", "Mobile", "Performance", "Security"];

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <section className="py-16 md:py-24 border-b">
          <div className="container">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
                Store Doctor Blog
              </h1>
              <p className="text-lg text-muted-foreground">
                Expert insights on Shopify optimization, e-commerce strategy, and store growth. Get actionable advice to improve your store's health and revenue.
              </p>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 border-b">
          <div className="container">
            <div className="flex gap-3 overflow-x-auto pb-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === "All" ? "default" : "outline"}
                  className="whitespace-nowrap"
                  data-testid={`filter-category-${category.toLowerCase()}`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-16">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post) => (
                <Card
                  key={post.id}
                  className="overflow-hidden hover:border-primary/50 transition-all"
                  data-testid={`blog-post-${post.slug}`}
                >
                  <div className="h-40 bg-muted overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-primary">{post.category}</span>
                    </div>
                    <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
                    <CardDescription>{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">{post.content}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {post.author}
                      </div>
                      <span>{post.readTime}</span>
                    </div>
                    <Button variant="ghost" className="w-full justify-start pl-0" asChild>
                      <Link href={`/blog/${post.slug}`} data-testid={`link-read-more-${post.slug}`}>
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary/5 border-t">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your Store?</h2>
              <p className="text-muted-foreground mb-8">
                Start your AI-powered store analysis today and get actionable insights to boost your revenue.
              </p>
              <Button size="lg" asChild>
                <Link href="/dashboard" data-testid="button-blog-cta">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
