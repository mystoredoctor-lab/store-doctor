import { useLocation } from "wouter";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { Link } from "wouter";

const blogPosts: Record<string, any> = {
  "ai-powered-store-analysis": {
    title: "How AI-Powered Store Analysis is Revolutionizing E-commerce",
    category: "Technology",
    author: "Sarah Chen",
    date: "January 15, 2025",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1677442d019cecf8920f254b09b04b24143f3f7fa?w=1200&h=600&fit=crop",
    content: `
      <h2>Introduction</h2>
      <p>AI-powered store analysis has become essential for modern e-commerce businesses. In this comprehensive guide, we explore how machine learning algorithms can identify critical issues in your Shopify store that you might miss.</p>
      
      <h2>The Power of AI in E-commerce</h2>
      <p>Artificial intelligence is transforming the way merchants optimize their stores. From SEO optimization to conversion rate optimization, AI tools like Store Doctor analyze thousands of data points to provide actionable recommendations that directly impact your bottom line.</p>
      
      <h2>Key Benefits</h2>
      <ul>
        <li>Automated issue detection across 6 key categories</li>
        <li>Personalized recommendations based on your store data</li>
        <li>Real-time monitoring and alerts</li>
        <li>Competitive analysis and benchmarking</li>
      </ul>
      
      <h2>How It Works</h2>
      <p>Store Doctor uses advanced AI algorithms to scan your Shopify store and analyze critical aspects including SEO, page speed, UX, conversion optimization, security, and mobile responsiveness.</p>
      
      <h2>Conclusion</h2>
      <p>AI-powered analysis is no longer a luxury—it's a necessity for staying competitive in modern e-commerce. Start optimizing your store today with intelligent insights.</p>
    `,
  },
  "shopify-seo-guide": {
    title: "The Complete Guide to Shopify Store SEO in 2025",
    category: "SEO",
    author: "Marcus Johnson",
    date: "January 12, 2025",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop",
    content: `
      <h2>Introduction</h2>
      <p>Search engine optimization is critical for Shopify success. This guide covers meta tags, structured data, site speed optimization, mobile responsiveness, and content strategy.</p>
      
      <h2>Technical SEO Essentials</h2>
      <p>We break down technical SEO requirements, on-page optimization best practices, and link-building strategies specifically for e-commerce sites.</p>
      
      <h2>On-Page Optimization</h2>
      <ul>
        <li>Meta descriptions and title tags</li>
        <li>Header structure and keyword placement</li>
        <li>Internal linking strategy</li>
        <li>Image optimization and alt text</li>
      </ul>
      
      <h2>Content Strategy</h2>
      <p>Create valuable content that ranks well and converts visitors into customers. Focus on user intent and search volume.</p>
      
      <h2>Measuring Success</h2>
      <p>Track your SEO improvements with Google Analytics, Google Search Console, and other monitoring tools to ensure your efforts are paying off.</p>
    `,
  },
  "conversion-rate-optimization": {
    title: "5 Critical Issues Killing Your Store's Conversion Rate",
    category: "Conversion",
    author: "Emma Williams",
    date: "January 10, 2025",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop",
    content: `
      <h2>The Conversion Crisis</h2>
      <p>Your store could be losing significant revenue due to preventable issues. This article identifies the five most common conversion killers.</p>
      
      <h2>Issue #1: Slow Page Speed</h2>
      <p>Every second of load time matters. Visitors abandon slow-loading pages, costing you thousands in lost sales.</p>
      
      <h2>Issue #2: Missing Trust Signals</h2>
      <p>Security badges, customer reviews, and guarantees build trust and increase conversion rates significantly.</p>
      
      <h2>Issue #3: Complicated Checkout</h2>
      <p>Streamline your checkout process. Remove unnecessary steps and friction points that cause cart abandonment.</p>
      
      <h2>Issue #4: Poor Mobile Experience</h2>
      <p>Over 70% of traffic is mobile. If your store isn't mobile-optimized, you're losing conversions.</p>
      
      <h2>Issue #5: Unclear Value Proposition</h2>
      <p>Visitors should immediately understand what you offer and why they should buy from you.</p>
    `,
  },
  "mobile-optimization": {
    title: "Mobile Optimization: Why Your Store Must Be Mobile-First",
    category: "Mobile",
    author: "John Smith",
    date: "January 8, 2025",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1512941691920-25bda36dc643?w=1200&h=600&fit=crop",
    content: `
      <h2>The Mobile-First Reality</h2>
      <p>Over 70% of e-commerce traffic comes from mobile devices. Optimizing for mobile isn't just about responsive design—it's about performance, navigation, and conversion.</p>
      
      <h2>Key Mobile Optimization Areas</h2>
      <ul>
        <li>Viewport configuration</li>
        <li>Touch-friendly interfaces</li>
        <li>Mobile payment optimization</li>
        <li>Performance optimization</li>
      </ul>
      
      <h2>Testing and Monitoring</h2>
      <p>Use tools like Google's Mobile-Friendly Test to ensure your store works perfectly on all devices.</p>
      
      <h2>Performance Metrics</h2>
      <p>Track mobile-specific metrics and correlate them with conversions to understand the impact of your optimizations.</p>
    `,
  },
  "website-speed-optimization": {
    title: "Website Speed Optimization: The Complete Technical Guide",
    category: "Performance",
    author: "Lisa Rodriguez",
    date: "January 5, 2025",
    readTime: "11 min read",
    image: "https://images.unsplash.com/photo-1460925895917-adf4e565c472?w=1200&h=600&fit=crop",
    content: `
      <h2>The Speed Imperative</h2>
      <p>Page speed directly impacts user experience and conversion rates. This comprehensive guide covers all aspects of speed optimization.</p>
      
      <h2>Image Optimization</h2>
      <p>Images are typically the largest files on your page. Compress and optimize them without losing quality.</p>
      
      <h2>Caching Strategies</h2>
      <p>Implement browser caching, server-side caching, and CDN solutions to serve content faster.</p>
      
      <h2>Code Optimization</h2>
      <ul>
        <li>Minify CSS and JavaScript</li>
        <li>Lazy loading for images and content</li>
        <li>Code splitting and bundling</li>
        <li>Reduce render-blocking resources</li>
      </ul>
      
      <h2>Measuring Impact</h2>
      <p>Use Core Web Vitals and other performance metrics to track improvements and ensure your optimizations are effective.</p>
    `,
  },
  "ecommerce-security": {
    title: "E-commerce Security: Protecting Your Store and Customers",
    category: "Security",
    author: "David Kim",
    date: "January 2, 2025",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200&h=600&fit=crop",
    content: `
      <h2>Security is Paramount</h2>
      <p>Security is paramount in e-commerce. This guide covers everything you need to know to protect your store and customers.</p>
      
      <h2>Essential Security Measures</h2>
      <ul>
        <li>SSL certificates and HTTPS</li>
        <li>PCI compliance</li>
        <li>Secure payment processing</li>
        <li>Fraud detection and prevention</li>
      </ul>
      
      <h2>Customer Privacy</h2>
      <p>Implement strong data protection measures and be transparent about how you handle customer information.</p>
      
      <h2>Common Vulnerabilities</h2>
      <p>Learn about common security vulnerabilities and how to protect your store from attacks and breaches.</p>
      
      <h2>Trust Signals</h2>
      <p>Security certifications and trust badges not only protect your store but also increase customer confidence and conversion rates.</p>
    `,
  },
};

export default function BlogPostPage() {
  const [location] = useLocation();
  const slug = location.split("/blog/")[1];
  const post = blogPosts[slug];

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/blog">Back to Blog</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Image */}
        <div className="h-96 overflow-hidden bg-muted">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" data-testid="blog-post-hero-image" />
        </div>

        {/* Content */}
        <article className="container py-16 max-w-3xl">
          <Button variant="ghost" className="mb-8" asChild>
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>

          <div className="space-y-8">
            <div>
              <span className="text-sm font-semibold text-primary">{post.category}</span>
              <h1 className="text-4xl font-bold mt-2 mb-4">{post.title}</h1>
              <div className="flex items-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {post.date}
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {post.author}
                </div>
                <span>{post.readTime}</span>
              </div>
            </div>

            <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} data-testid="blog-post-content" />
          </div>
        </article>

        {/* Related Posts CTA */}
        <section className="bg-primary/5 border-t border-b">
          <div className="container py-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Explore More Insights</h2>
            <p className="text-muted-foreground mb-8">Check out other articles to optimize your store further.</p>
            <Button asChild>
              <Link href="/blog">View All Posts</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
