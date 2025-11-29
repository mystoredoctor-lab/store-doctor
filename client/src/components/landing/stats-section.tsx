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
    color: "purple",
  },
  {
    value: "$2.4M",
    label: "Revenue Recovered",
    color: "pink",
  },
];

const colorClasses = {
  green: "bg-emerald-50 dark:bg-emerald-950/20",
  purple: "bg-purple-50 dark:bg-purple-950/20",
  pink: "bg-pink-50 dark:bg-pink-950/20",
};

const textColorClasses = {
  green: "text-emerald-700 dark:text-emerald-400",
  purple: "text-purple-700 dark:text-purple-400",
  pink: "text-pink-700 dark:text-pink-400",
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
