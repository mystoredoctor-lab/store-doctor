import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

interface StatItem {
  value: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const stats: StatItem[] = [
  {
    value: "10,000+",
    label: "Stores Analyzed",
    description: "Trusted by e-commerce brands worldwide",
    icon: TrendingUp,
  },
  {
    value: "94%",
    label: "Average Store Health Improvement",
    description: "After implementing recommended optimizations",
    icon: TrendingUp,
  },
  {
    value: "$2.4M+",
    label: "Revenue Recovered for Our Clients",
    description: "Through improved conversion and customer experience",
    icon: TrendingUp,
  },
];

export function StatsSection() {
  return (
    <section className="py-20 bg-background" data-testid="section-stats">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card
                key={stat.label}
                className="border border-border/50 hover:border-primary/50 transition-colors bg-card/50 backdrop-blur"
                data-testid={`stat-card-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <CardContent className="pt-8 text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <div className="text-4xl md:text-5xl font-bold text-primary mb-3">
                      {stat.value}
                    </div>
                    <div className="font-semibold text-foreground">{stat.label}</div>
                    <p className="text-sm text-muted-foreground mt-2">{stat.description}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
