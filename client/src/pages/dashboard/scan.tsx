import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HealthScoreGauge } from "@/components/ui/health-score-gauge";
import { AlertBanner } from "@/components/ui/alert-banner";
import { UpgradeModal } from "@/components/ui/upgrade-modal";
import { CategoryScoreGrid } from "@/components/scan/category-score-grid";
import { IssuesList } from "@/components/scan/issues-list";
import { RecommendationsList } from "@/components/scan/recommendations-list";
import { ScanHistoryChart } from "@/components/scan/scan-history-chart";
import { IssueSeverityChart } from "@/components/scan/issue-severity-chart";
import { CategoryBreakdownChart } from "@/components/scan/category-breakdown-chart";
import { CompetitionBenchmarkChart } from "@/components/scan/competition-benchmark-chart";
import { mockStoresByPlan, mockScanResultsByStore, mockUser } from "@/lib/data";
import { RefreshCw, Download, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getUserPlan } from "@/lib/planManager";
import { canRunScan, getScansRemaining, incrementScanCount } from "@/lib/scanManager";
import type { Store } from "@shared/schema";

export default function ScanPage() {
  const [location, navigate] = useLocation();
  const { toast } = useToast();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [store, setStore] = useState<Store | null>(null);
  const userPlan = getUserPlan();
  const scansRemaining = getScansRemaining(userPlan as "free" | "pro" | "advanced");
  const canScan = canRunScan(userPlan as "free" | "pro" | "advanced");

  useEffect(() => {
    // Get storeId from URL params
    const params = new URLSearchParams(location.split("?")[1]);
    const storeId = params.get("storeId");

    // Get stores for current plan
    const planStores = mockStoresByPlan[userPlan as "free" | "pro" | "advanced"] || mockStoresByPlan.free;

    if (storeId) {
      const foundStore = planStores.find((s) => s.id === storeId);
      setStore(foundStore || planStores[0]);
    } else {
      setStore(planStores[0]);
    }
  }, [location, userPlan]);

  const handleRunScan = () => {
    if (!canScan) {
      setShowUpgradeModal(true);
    } else {
      incrementScanCount();
      navigate(`/dashboard/scanning?storeId=${store?.id}`);
    }
  };

  const handleExportReport = () => {
    toast({
      title: "Report exported",
      description: "Your scan report has been downloaded.",
    });
  };

  if (!store) return <div>Loading...</div>;

  // Get scan results for this store
  const scanResults = mockScanResultsByStore[store.id as keyof typeof mockScanResultsByStore] || mockScanResultsByStore.store_1;

  return (
    <>
      <UpgradeModal
        open={showUpgradeModal}
        onOpenChange={setShowUpgradeModal}
        title="Rescan Not Available"
        description={
          userPlan === "free"
            ? "You've reached your monthly scan limit on the Free plan. Upgrade to Pro (10 scans/month) or Advanced (25 scans/month) to run more scans."
            : userPlan === "pro"
            ? "You've reached your monthly scan limit. Upgrade to Advanced (25 scans/month) for more scans."
            : "You've reached your monthly scan limit. Please try again next month."
        }
      />
      <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold">Scan Results</h1>
            <Badge variant="outline" className="text-xs">
              {store.name}
            </Badge>
          </div>
          <p className="text-muted-foreground">Last scanned: {new Date(scanResults.scanDate).toLocaleString()}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportReport} data-testid="button-export-report">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button 
            onClick={handleRunScan}
            data-testid="button-run-scan"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Run New Scan
            <span className="ml-2 text-xs">({scansRemaining} left)</span>
          </Button>
        </div>
      </div>

      {userPlan === "free" && (
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
            <HealthScoreGauge score={scanResults.overallScore} size="lg" />
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
            <CategoryScoreGrid categories={scanResults.categories} />
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

      {userPlan === "advanced" && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Competition Benchmark</h2>
          <CompetitionBenchmarkChart />
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Detailed Analysis</CardTitle>
          <CardDescription>Issues found and recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="issues">
            <TabsList className="mb-4">
              <TabsTrigger value="issues" data-testid="tab-issues">
                Critical Issues ({scanResults.criticalIssues.length})
              </TabsTrigger>
              <TabsTrigger value="recommendations" data-testid="tab-recommendations">
                Recommendations
              </TabsTrigger>
            </TabsList>
            <TabsContent value="issues">
              <IssuesList 
                issues={scanResults.criticalIssues} 
                limitToFree={userPlan === "free"}
                showAutoFix={userPlan === "advanced"}
              />
            </TabsContent>
            <TabsContent value="recommendations">
              <RecommendationsList recommendations={scanResults.recommendations} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      </div>
    </>
  );
}
