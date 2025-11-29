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
                  Install on Shopify
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
            <div className="relative rounded-xl border bg-card p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
                <div>
                  <p className="text-sm text-muted-foreground">Store Health</p>
                  <h3 className="text-xl font-semibold">Fashion Forward</h3>
                </div>
                <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Healthy</Badge>
              </div>

              <div className="flex items-center justify-center py-8">
                <HealthScoreGauge score={87} size="lg" />
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6">
                {[
                  { label: "SEO", score: 92 },
                  { label: "Speed", score: 78 },
                  { label: "UX", score: 88 },
                ].map((item) => (
                  <div key={item.label} className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="text-lg font-semibold">{item.score}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 rounded-lg border bg-card p-4 shadow-lg max-w-[200px]">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Issues Fixed</p>
                  <p className="font-semibold">12 this week</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
