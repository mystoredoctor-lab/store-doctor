import { Link } from "wouter";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User } from "lucide-react";
import { useBlogPosts } from "@/hooks/useBlogPosts";

const categories = ["All", "Technology", "SEO", "Conversion", "Mobile", "Performance", "Security"];

export default function BlogPage() {
  const blogPosts = useBlogPosts();
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
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
