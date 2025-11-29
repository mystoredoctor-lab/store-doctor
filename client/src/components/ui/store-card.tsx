import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HealthScoreGauge } from "@/components/ui/health-score-gauge";
import { ExternalLink, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import type { Store } from "@shared/schema";

interface StoreCardProps {
  store: Store;
  onRunScan?: () => void;
}

export function StoreCard({ store, onRunScan }: StoreCardProps) {
  const statusConfig = {
    healthy: {
      label: "Healthy",
      icon: CheckCircle,
      className: "bg-green-500/10 text-green-500 border-green-500/20",
    },
    warning: {
      label: "Needs Attention",
      icon: AlertTriangle,
      className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    },
    critical: {
      label: "Critical",
      icon: XCircle,
      className: "bg-red-500/10 text-red-500 border-red-500/20",
    },
    pending: {
      label: "Pending",
      icon: AlertTriangle,
      className: "bg-muted text-muted-foreground border-muted",
    },
  };

  const status = (store.status as keyof typeof statusConfig) || "pending";
  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <Card className="transition-all hover:border-primary/50" data-testid={`store-card-${store.id}`}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <CardTitle className="text-lg truncate">{store.name}</CardTitle>
            <p className="text-sm text-muted-foreground flex items-center gap-1 truncate">
              {store.url}
              <ExternalLink className="h-3 w-3 shrink-0" />
            </p>
          </div>
          <Badge variant="outline" className={config.className}>
            <StatusIcon className="h-3 w-3 mr-1" />
            {config.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="text-sm">
              <span className="text-muted-foreground">Last scan: </span>
              <span>{store.lastScanAt ? new Date(store.lastScanAt).toLocaleDateString() : "Never"}</span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Issues found: </span>
              <span className={store.issuesCount && store.issuesCount > 10 ? "text-red-500" : "text-yellow-500"}>
                {store.issuesCount || 0}
              </span>
            </div>
          </div>
          <HealthScoreGauge score={store.healthScore || 0} size="sm" showLabel={false} />
        </div>
        <div className="mt-4 flex gap-2">
          <Button size="sm" className="flex-1" asChild>
            <Link href="/dashboard/scan" data-testid={`button-view-details-${store.id}`}>View Details</Link>
          </Button>
          <Button size="sm" variant="outline" onClick={onRunScan} data-testid={`button-run-scan-${store.id}`}>
            Run Scan
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
