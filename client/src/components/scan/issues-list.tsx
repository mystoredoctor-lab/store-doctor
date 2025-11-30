import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, AlertCircle, Info, Lock, ChevronDown, ChevronUp, Wand2, MapPin, Code } from "lucide-react";
import { useState } from "react";
import type { ScanIssue } from "@shared/schema";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

const handleScrollToTop = () => {
  window.scrollTo(0, 0);
};

interface IssuesListProps {
  issues: ScanIssue[];
  limitToFree?: boolean;
  showAutoFix?: boolean;
}

export function IssuesList({ issues, limitToFree = false, showAutoFix = false }: IssuesListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { toast } = useToast();

  const displayedIssues = limitToFree ? issues.slice(0, 3) : issues;
  const hiddenCount = limitToFree ? issues.length - 3 : 0;

  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case "high":
        return {
          icon: AlertTriangle,
          className: "bg-red-500/10 text-red-500 border-red-500/20",
          label: "High",
        };
      case "medium":
        return {
          icon: AlertCircle,
          className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
          label: "Medium",
        };
      default:
        return {
          icon: Info,
          className: "bg-blue-500/10 text-blue-500 border-blue-500/20",
          label: "Low",
        };
    }
  };

  return (
    <div className="space-y-4">
      {displayedIssues.map((issue) => {
        const config = getSeverityConfig(issue.severity);
        const Icon = config.icon;
        const isExpanded = expandedId === issue.id;

        return (
          <div key={issue.id} className="border rounded-lg overflow-hidden" data-testid={`issue-${issue.id}`}>
            <button
              onClick={() => setExpandedId(isExpanded ? null : issue.id)}
              className="w-full text-left hover:bg-muted/30 transition-colors"
              data-testid={`button-expand-issue-${issue.id}`}
            >
              <div className="p-4 space-y-3">
                {/* Header: Icon, Title, Severity, Category */}
                <div className="flex items-start gap-4">
                  <div className={cn("p-2 rounded-lg shrink-0 mt-0.5", config.className)}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-base">{issue.title}</p>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <Badge variant="outline" className={config.className}>
                        {config.label} Severity
                      </Badge>
                      <Badge variant="secondary">{issue.category}</Badge>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />
                  )}
                </div>

                {/* Key Info Grid (shown by default) */}
                <div className="ml-12 grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">Impact</p>
                    <p className="text-sm line-clamp-2">{issue.impact}</p>
                  </div>
                  {showAutoFix && issue.location?.page && (
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">Location</p>
                      <p className="text-sm line-clamp-2">{issue.location.page}</p>
                    </div>
                  )}
                </div>
              </div>
            </button>
            {isExpanded && (
              <div className="px-4 pb-4 pt-0 border-t bg-muted/30">
                <div className="pt-4 space-y-4">
                  {/* Full Impact */}
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Business Impact</p>
                    <p className="text-sm">{issue.impact}</p>
                  </div>

                  {/* Location Details for Advanced Users */}
                  {showAutoFix && issue.location && (
                    <div className="space-y-3 p-3 rounded-lg bg-background/50 border border-primary/20">
                      <p className="text-sm font-semibold flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        Where the issue is
                      </p>
                      
                      <div className="space-y-2 text-sm">
                        {issue.location.url && (
                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wide">URL</p>
                            <p className="font-mono text-xs bg-muted/50 p-2 rounded border border-border/50">{issue.location.url}</p>
                          </div>
                        )}
                        
                        {issue.location.page && (
                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wide">Section/App</p>
                            <p className="text-sm font-medium">{issue.location.page}</p>
                          </div>
                        )}

                        {issue.location.element && (
                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wide">HTML Element</p>
                            <p className="font-mono text-xs bg-muted/50 p-2 rounded border border-border/50">{issue.location.element}</p>
                          </div>
                        )}

                        {issue.location.lineNumbers && (
                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wide">Code Location</p>
                            <p className="text-xs">Lines {issue.location.lineNumbers}</p>
                          </div>
                        )}
                      </div>

                      {issue.location.codeSnippet && (
                        <div className="space-y-1">
                          <p className="text-sm font-semibold flex items-center gap-2">
                            <Code className="h-4 w-4 text-primary" />
                            Code Details
                          </p>
                          <pre className="text-xs bg-muted/50 p-2 rounded border border-border/50 overflow-x-auto whitespace-pre-wrap break-words">
                            {issue.location.codeSnippet}
                          </pre>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Recommendation */}
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">How to Fix</p>
                    <p className="text-sm">{issue.recommendation}</p>
                  </div>

                  {/* Auto-fix button */}
                  {showAutoFix && (
                    <div className="flex items-center gap-2 pt-2 border-t">
                      <Button 
                        size="sm" 
                        className="bg-primary hover:bg-primary/90 gap-2"
                        onClick={() => toast({ title: "Auto-fix applied", description: `Fixing: ${issue.title}` })}
                        data-testid={`button-autofix-${issue.id}`}
                      >
                        <Wand2 className="h-4 w-4" />
                        Apply Auto-Fix
                      </Button>
                      <span className="text-xs text-muted-foreground">Advanced Plan</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {limitToFree && hiddenCount > 0 && (
        <div className="border rounded-lg p-6 bg-muted/30 text-center">
          <Lock className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
          <p className="font-medium mb-1">{hiddenCount} more issues found</p>
          <p className="text-sm text-muted-foreground mb-4">
            Upgrade to Pro to see all issues and detailed recommendations.
          </p>
          <Button asChild>
            <Link href="/pricing" onClick={handleScrollToTop} data-testid="button-upgrade-to-pro">Upgrade to Pro</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
