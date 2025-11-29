import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="relative rounded-2xl bg-primary/10 border border-primary/20 p-8 md:p-16 text-center overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.2),rgba(255,255,255,0))]" />
          </div>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Ready to Boost Your Store's Health?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of Shopify merchants who use Store Doctor to optimize their stores and increase sales. Start
            your free scan today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2" asChild>
              <Link href="/dashboard" data-testid="button-cta-install">
                Install on Shopify
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/pricing" data-testid="button-cta-pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
