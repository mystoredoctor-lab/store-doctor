import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import type { ScanRecommendation } from "@shared/schema";

interface RecommendationsListProps {
  recommendations: ScanRecommendation[];
}

export function RecommendationsList({ recommendations }: RecommendationsListProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Quick Wins":
        return "text-green-500";
      case "Medium Priority":
        return "text-yellow-500";
      case "Long Term":
        return "text-blue-500";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {recommendations.map((rec) => (
        <Card key={rec.category} className="bg-muted/30" data-testid={`recommendation-${rec.category.toLowerCase().replace(/\s+/g, '-')}`}>
          <CardHeader className="pb-3">
            <CardTitle className={`text-base ${getCategoryColor(rec.category)}`}>{rec.category}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {rec.items.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
