"use client"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, AlertCircle, Info, Lock, ChevronDown, ChevronUp } from "lucide-react"
import * as React from "react"

interface Issue {
  id: string
  title: string
  category: string
  severity: string
  impact: string
  recommendation: string
}

interface IssuesListProps {
  issues: Issue[]
  limitToFree?: boolean
}

export function IssuesList({ issues, limitToFree = false }: IssuesListProps) {
  const [expandedId, setExpandedId] = React.useState<string | null>(null)

  const displayedIssues = limitToFree ? issues.slice(0, 3) : issues
  const hiddenCount = limitToFree ? issues.length - 3 : 0

  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case "high":
        return {
          icon: AlertTriangle,
          className: "bg-red-500/10 text-red-500 border-red-500/20",
          label: "High",
        }
      case "medium":
        return {
          icon: AlertCircle,
          className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
          label: "Medium",
        }
      default:
        return {
          icon: Info,
          className: "bg-blue-500/10 text-blue-500 border-blue-500/20",
          label: "Low",
        }
    }
  }

  return (
    <div className="space-y-4">
      {displayedIssues.map((issue) => {
        const config = getSeverityConfig(issue.severity)
        const Icon = config.icon
        const isExpanded = expandedId === issue.id

        return (
          <div key={issue.id} className="border rounded-lg overflow-hidden">
            <button
              onClick={() => setExpandedId(isExpanded ? null : issue.id)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className={cn("p-2 rounded-lg", config.className)}>
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">{issue.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className={config.className}>
                      {config.label}
                    </Badge>
                    <Badge variant="secondary">{issue.category}</Badge>
                  </div>
                </div>
              </div>
              {isExpanded ? (
                <ChevronUp className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              )}
            </button>
            {isExpanded && (
              <div className="px-4 pb-4 pt-0 border-t bg-muted/30">
                <div className="pt-4 space-y-3">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Impact</p>
                    <p className="text-sm">{issue.impact}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Recommendation</p>
                    <p className="text-sm">{issue.recommendation}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      })}

      {/* Upgrade prompt for free users */}
      {limitToFree && hiddenCount > 0 && (
        <div className="border rounded-lg p-6 bg-muted/30 text-center">
          <Lock className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
          <p className="font-medium mb-1">{hiddenCount} more issues found</p>
          <p className="text-sm text-muted-foreground mb-4">
            Upgrade to Pro to see all issues and detailed recommendations.
          </p>
          {/* TODO: Connect to payment system */}
          <Button>Upgrade to Pro</Button>
        </div>
      )}
    </div>
  )
}
