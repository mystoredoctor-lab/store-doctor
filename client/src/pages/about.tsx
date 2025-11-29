import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 bg-primary/5">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About Store Doctor</h1>
              <p className="text-xl text-muted-foreground">
                Empowering e-commerce merchants with AI-powered store diagnostics and actionable optimization insights.
              </p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 container max-w-3xl">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-4">
                Store Doctor is built on a simple mission: to democratize access to store optimization expertise. We believe every e-commerce merchant, regardless of size or budget, deserves access to sophisticated diagnostics and actionable recommendations to grow their business.
              </p>
              <p className="text-lg text-muted-foreground">
                We combine advanced artificial intelligence with deep e-commerce expertise to identify issues you might miss and provide specific, implementable solutions that drive real revenue growth.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-4">Why Store Doctor?</h2>
              <p className="text-lg text-muted-foreground mb-4">
                Hiring consultants or agencies can cost thousands monthly. Yet many store owners don't know where to start optimizing or what changes will have the biggest impact. Store Doctor changes that equation.
              </p>
              <p className="text-lg text-muted-foreground">
                Our AI analyzes your entire store across six critical categories—SEO, speed, UX, conversion, security, and mobile—in minutes. You get a comprehensive health score and prioritized recommendations, all at a fraction of traditional consulting costs.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-4">Our Approach</h2>
              <p className="text-lg text-muted-foreground mb-4">
                We believe in practical, data-driven optimization. We don't overwhelm you with jargon or hypothetical scenarios. Instead, we provide:
              </p>
              <ul className="space-y-3 text-lg text-muted-foreground">
                <li>✓ <strong>Smart Sampling</strong> - Intelligent product sampling that minimizes API usage while capturing accurate insights</li>
                <li>✓ <strong>Prioritized Recommendations</strong> - Fix the highest-impact issues first to maximize ROI</li>
                <li>✓ <strong>Clear Explanations</strong> - Understand exactly what's wrong and why it matters</li>
                <li>✓ <strong>Actionable Steps</strong> - Know exactly what to do to improve each issue</li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-4">Results-Driven</h2>
              <p className="text-lg text-muted-foreground mb-4">
                Stores using Store Doctor recommendations report typical improvements of:
              </p>
              <ul className="space-y-2 text-lg text-muted-foreground mb-4">
                <li>• 40% increase in organic search traffic</li>
                <li>• 25% improvement in conversion rates</li>
                <li>• 3+ second reduction in page load times</li>
                <li>• 60% reduction in bounce rates</li>
              </ul>
              <p className="text-lg text-muted-foreground">
                These aren't theoretical improvements—they're real results from real merchants implementing Store Doctor recommendations.
              </p>
            </div>

            <div className="pt-8 border-t">
              <p className="text-lg text-muted-foreground mb-6">
                Ready to get a comprehensive health check for your store?
              </p>
              <Button asChild size="lg">
                <Link href="/dashboard">Get Started Today</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
