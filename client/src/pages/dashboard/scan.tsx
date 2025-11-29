import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HealthScoreGauge } from "@/components/ui/health-score-gauge";
import { AlertBanner } from "@/components/ui/alert-banner";
import { CategoryScoreGrid } from "@/components/scan/category-score-grid";
import { IssuesList } from "@/components/scan/issues-list";
import { RecommendationsList } from "@/components/scan/recommendations-list";
import { ScanHistoryChart } from "@/components/scan/scan-history-chart";
import { IssueSeverityChart } from "@/components/scan/issue-severity-chart";
import { CategoryBreakdownChart } from "@/components/scan/category-breakdown-chart";
import { mockScanResults, mockStores, mockUser } from "@/lib/data";
import { RefreshCw, Download, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ScanPage() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const store = mockStores[0];

  const handleRunScan = () => {
    navigate("/dashboard/scanning");
  };

  const handleExportReport = () => {
    toast({
      title: "Report exported",
      description: "Your scan report has been downloaded.",
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold">Scan Results</h1>
            <Badge variant="outline" className="text-xs">
              {store.name}
            </Badge>
          </div>
          <p className="text-muted-foreground">Last scanned: {new Date(mockScanResults.scanDate).toLocaleString()}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportReport} data-testid="button-export-report">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button onClick={handleRunScan} data-testid="button-run-scan">
            <RefreshCw className="mr-2 h-4 w-4" />
            Run New Scan
          </Button>
        </div>
      </div>

      {mockUser.plan === "free" && (
        <AlertBanner
          type="info"
          title="Free Plan Limitations"
          message="You're viewing limited results. Upgrade to Pro to see full analysis, all issues, and detailed charts."
        />
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Overall Health Score</CardTitle>
            <CardDescription>Based on 6 category analysis</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-6">
            <HealthScoreGauge score={mockScanResults.overallScore} size="lg" />
            <div className="mt-4 flex items-center gap-2">
              <a
                href={`https://${store.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
                data-testid="link-store-url"
              >
                {store.url}
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Category Scores</CardTitle>
            <CardDescription>Performance breakdown by category</CardDescription>
          </CardHeader>
          <CardContent>
            <CategoryScoreGrid categories={mockScanResults.categories} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Issue Distribution</CardTitle>
            <CardDescription>By category</CardDescription>
          </CardHeader>
          <CardContent>
            <CategoryBreakdownChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Issue Severity</CardTitle>
            <CardDescription>Breakdown by priority</CardDescription>
          </CardHeader>
          <CardContent>
            <IssueSeverityChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Score History</CardTitle>
            <CardDescription>Last 5 scans trend</CardDescription>
          </CardHeader>
          <CardContent>
            <ScanHistoryChart />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Analysis</CardTitle>
          <CardDescription>Issues found and recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="issues">
            <TabsList className="mb-4">
              <TabsTrigger value="issues" data-testid="tab-issues">
                Critical Issues ({mockScanResults.criticalIssues.length})
              </TabsTrigger>
              <TabsTrigger value="recommendations" data-testid="tab-recommendations">
                Recommendations
              </TabsTrigger>
            </TabsList>
            <TabsContent value="issues">
              <IssuesList issues={mockScanResults.criticalIssues} limitToFree={mockUser.plan === "free"} />
            </TabsContent>
            <TabsContent value="recommendations">
              <RecommendationsList recommendations={mockScanResults.recommendations} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
