import { Badge } from "@/components/ui/badge";
import { Shield, Zap, Users, Award } from "lucide-react";

const trustItems = [
  {
    icon: Shield,
    text: "Enterprise Security",
  },
  {
    icon: Zap,
    text: "99.9% Uptime",
  },
  {
    icon: Users,
    text: "5,000+ Merchants",
  },
  {
    icon: Award,
    text: "Shopify Partner",
  },
];

export function TrustBar() {
  return (
    <section className="border-y bg-muted/30 py-6" data-testid="section-trust-bar">
      <div className="container">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.text} 
                className="flex items-center gap-2 text-sm text-muted-foreground"
                data-testid={`trust-item-${item.text.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <Icon className="h-4 w-4 text-primary" />
                <span>{item.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
