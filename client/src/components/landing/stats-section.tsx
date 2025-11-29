import { Card, CardContent } from "@/components/ui/card";

interface StatItem {
  value: string;
  label: string;
  color: "green" | "purple" | "pink";
}

const stats: StatItem[] = [
  {
    value: "10,000+",
    label: "Stores Analyzed",
    color: "green",
  },
  {
    value: "94%",
    label: "Health Improvement",
    color: "green",
  },
  {
    value: "$2.4M",
    label: "Revenue Recovered",
    color: "green",
  },
];

const colorClasses = {
  green: "bg-primary/10 dark:bg-primary/10",
  purple: "bg-primary/10 dark:bg-primary/10",
  pink: "bg-primary/10 dark:bg-primary/10",
};

const textColorClasses = {
  green: "text-primary",
  purple: "text-primary",
  pink: "text-primary",
};

export function StatsSection() {
  return (
    <section className="py-16 bg-muted/30" data-testid="section-stats">
      <div className="container">
        <div className="grid gap-6 md:grid-cols-3">
          {stats.map((stat) => (
            <Card
              key={stat.label}
              className={`border-0 ${colorClasses[stat.color]}`}
              data-testid={`stat-card-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <CardContent className="pt-8 text-center">
                <div className={`text-4xl font-bold ${textColorClasses[stat.color]} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
