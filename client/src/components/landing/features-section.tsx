import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Zap, Layout, TrendingUp, Shield, Smartphone, BarChart2, Wand2 } from "lucide-react";
import { features } from "@/lib/data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  search: Search,
  zap: Zap,
  layout: Layout,
  "trending-up": TrendingUp,
  shield: Shield,
  smartphone: Smartphone,
  "bar-chart-2": BarChart2,
  wand: Wand2,
};

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Everything You Need to Optimize Your Store
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive analysis across all critical areas that impact your store's performance and sales.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = iconMap[feature.icon] || Search;
            return (
              <Card
                key={feature.title}
                className="bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-colors"
                data-testid={`feature-card-${feature.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <CardHeader className="gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
