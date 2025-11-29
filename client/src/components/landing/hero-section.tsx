import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HealthScoreGauge } from "@/components/ui/health-score-gauge";
import { ArrowRight, CheckCircle, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.15),rgba(255,255,255,0))]" />
      </div>

      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <div className="space-y-8">
            <Badge variant="outline" className="gap-2 px-4 py-1.5">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              AI-Powered Store Analysis
            </Badge>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-balance">
              Diagnose Your <span className="text-primary">Shopify Store</span> Health in Minutes
            </h1>

            <p className="text-lg text-muted-foreground max-w-[600px] text-pretty">
              Store Doctor analyzes your Shopify store across SEO, speed, UX, conversion optimization, and more. Get
              actionable recommendations to boost sales and improve performance.
            </p>

            <ul className="space-y-3">
              {["Comprehensive 6-category analysis", "Actionable recommendations", "Track improvements over time"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                )
              )}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gap-2" asChild>
                <Link href="/dashboard" data-testid="button-hero-install">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#features" data-testid="button-hero-features">See How It Works</Link>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">Free plan available. No credit card required.</p>
          </div>

          <div className="relative lg:ml-8">
            <div className="space-y-4">
              {[
                { icon: CheckCircle, title: "AI-Powered Analysis", desc: "Automatically scan and analyze your entire store" },
                { icon: CheckCircle, title: "Actionable Insights", desc: "Get specific, prioritized recommendations" },
                { icon: CheckCircle, title: "Track Progress", desc: "Monitor improvements over time with detailed reports" },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex gap-4 p-4 rounded-lg border bg-card/50">
                    <Icon className="h-6 w-6 text-primary shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
