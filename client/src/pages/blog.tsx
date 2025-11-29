import { Link } from "wouter";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "How AI-Powered Store Analysis is Revolutionizing E-commerce in 2025",
    slug: "ai-powered-store-analysis",
    excerpt: "Discover how artificial intelligence is transforming the way online merchants optimize their stores and boost revenue with intelligent diagnostics.",
    content: "Artificial intelligence has fundamentally transformed how e-commerce businesses operate. What once required manual analysis and guesswork now happens automatically through machine learning algorithms.",
    category: "Technology",
    author: "Sarah Chen",
    date: "January 15, 2025",
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
    date: "January 12, 2025",
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
    date: "January 10, 2025",
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
    date: "January 8, 2025",
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
    date: "January 5, 2025",
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
    date: "January 2, 2025",
    readTime: "14 min read",
    image: "https://images.unsplash.com/photo-1563986768711-b3bbb3c0ae2e?w=400&h=300&fit=crop",
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
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover" 
                      loading="lazy"
                      width="400"
                      height="300"
                      decoding="async"
                    />
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
