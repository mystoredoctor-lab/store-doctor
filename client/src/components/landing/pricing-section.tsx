import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { usePricingPlans } from "@/hooks/usePricingPlans";
import { cn } from "@/lib/utils";
import { useState } from "react";

const handleScrollToTop = () => {
  window.scrollTo(0, 0);
};

export function PricingSection() {
  const plans = usePricingPlans();
  const [isLoggedIn] = useState(!!localStorage.getItem("storedoctor_admin_auth_v1"));

  const getButtonConfig = (planId: string) => {
    if (planId === 'free') {
      return {
        text: 'Get Started',
        href: isLoggedIn ? '/dashboard' : '/auth/sign-up',
        onClick: handleScrollToTop,
      };
    }
    if (planId === 'pro') {
      return {
        text: 'Go Pro',
        href: '/api/payment/checkout/pro',
        onClick: handleScrollToTop,
      };
    }
    if (planId === 'advanced') {
      return {
        text: 'Subscribe',
        href: '/api/payment/checkout/advanced',
        onClick: handleScrollToTop,
      };
    }
    return { text: 'Get Started', href: '/dashboard', onClick: handleScrollToTop };
  };
  
  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">Transparent Pricing</h2>
          <p className="text-lg text-muted-foreground">
            Choose the plan that scales with your business. Start free, upgrade anytime.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const buttonConfig = getButtonConfig(plan.id);
            return (
              <Card
                key={plan.id}
                className={cn(
                  "relative flex flex-col transition-all hover:shadow-lg",
                  plan.id === 'pro' && "md:scale-105 border-primary shadow-lg shadow-primary/20 ring-1 ring-primary/50"
                )}
                data-testid={`pricing-card-${plan.id}`}
              >
                {plan.id === 'pro' && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-6">
                    <span className="text-5xl font-bold">{plan.price === 0 ? "Free" : `$${plan.price}`}</span>
                    {plan.price > 0 && <span className="text-muted-foreground text-lg">/month</span>}
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    variant={plan.id === 'pro' ? "default" : "outline"}
                    onClick={buttonConfig.onClick}
                    asChild
                    data-testid={`button-pricing-${plan.id}`}
                  >
                    <a href={buttonConfig.href}>{buttonConfig.text}</a>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">
            All plans include core diagnostics and recommendations. Advanced includes auto-fix.
          </p>
          <p className="text-sm text-muted-foreground">
            Have questions? <a href="#contact" className="text-primary hover:underline">Contact us</a>
          </p>
        </div>
      </div>
    </section>
  );
}
