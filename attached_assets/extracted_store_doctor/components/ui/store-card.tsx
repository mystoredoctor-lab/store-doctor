"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { HealthScoreGauge } from "@/components/ui/health-score-gauge"
import { ExternalLink, AlertTriangle, CheckCircle, XCircle } from "lucide-react"

interface StoreCardProps {
  store: {
    id: string
    name: string
    url: string
    healthScore: number
    lastScan: string
    status: "healthy" | "warning" | "critical"
    issues: number
  }
}

export function StoreCard({ store }: StoreCardProps) {
  const statusConfig = {
    healthy: {
      label: "Healthy",
      variant: "default" as const,
      icon: CheckCircle,
      className: "bg-green-500/10 text-green-500 border-green-500/20",
    },
    warning: {
      label: "Needs Attention",
      variant: "secondary" as const,
      icon: AlertTriangle,
      className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    },
    critical: {
      label: "Critical",
      variant: "destructive" as const,
      icon: XCircle,
      className: "bg-red-500/10 text-red-500 border-red-500/20",
    },
  }

  const config = statusConfig[store.status]
  const StatusIcon = config.icon

  return (
    <Card className="transition-all hover:border-primary/50">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{store.name}</CardTitle>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              {store.url}
              <ExternalLink className="h-3 w-3" />
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
              <span>{new Date(store.lastScan).toLocaleDateString()}</span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Issues found: </span>
              <span className={store.issues > 10 ? "text-red-500" : "text-yellow-500"}>{store.issues}</span>
            </div>
          </div>
          <HealthScoreGauge score={store.healthScore} size="sm" showLabel={false} />
        </div>
        <div className="mt-4 flex gap-2">
          {/* TODO: Connect to actual scan functionality */}
          <Button size="sm" className="flex-1" asChild>
            <Link href="/dashboard/scan">View Details</Link>
          </Button>
          <Button size="sm" variant="outline">
            Run Scan
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
