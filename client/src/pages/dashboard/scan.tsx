import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
import { RefreshCw, Download, ExternalLink, FileJson, FileText, Table } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getUserPlan } from "@/lib/planManager";
import { canRunScan, getScansRemaining, incrementScanCount } from "@/lib/scanManager";
import type { Store } from "@shared/schema";

export default function ScanPage() {
  const [location, navigate] = useLocation();
  const { toast } = useToast();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [store, setStore] = useState<Store | null>(null);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);
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
    setShowExportDialog(true);
  };

  const downloadReport = async (format: "json" | "csv" | "pdf") => {
    if (!store) return;
    
    setExportLoading(true);
    try {
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const scanResults = mockScanResultsByStore[store.id as keyof typeof mockScanResultsByStore] || mockScanResultsByStore.store_1;
      const date = new Date().toISOString().split("T")[0];
      
      const report = {
        storeName: store.name,
        storeUrl: store.url,
        scanDate: new Date().toISOString(),
        overallScore: scanResults.overallScore,
        categories: scanResults.categories,
        criticalIssues: scanResults.criticalIssues,
        recommendations: scanResults.recommendations,
      };

      let blob: Blob;
      let filename: string;
      let mimeType: string;

      if (format === "json") {
        blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
        filename = `${store.name}-scan-report-${date}.json`;
        mimeType = "application/json";
      } else if (format === "csv") {
        const csv = [
          ["Store", store.name],
          ["URL", store.url],
          ["Date", new Date().toLocaleString()],
          ["Overall Score", scanResults.overallScore],
          [],
          ["Categories"],
          ...scanResults.categories.map(c => [c.name, c.score]),
          [],
          ["Issues", scanResults.criticalIssues.length],
          ["Recommendations", scanResults.recommendations.length]
        ].map(row => row.join(",")).join("\n");
        blob = new Blob([csv], { type: "text/csv" });
        filename = `${store.name}-scan-report-${date}.csv`;
        mimeType = "text/csv";
      } else {
        // PDF - Generate as HTML which can be printed to PDF
        const html = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8">
              <style>
                body { font-family: Arial, sans-serif; margin: 40px; color: #333; }
                .header { border-bottom: 3px solid #10b981; padding-bottom: 20px; margin-bottom: 30px; }
                .header h1 { margin: 0; color: #10b981; }
                .header p { margin: 5px 0; color: #666; }
                .section { margin-bottom: 30px; }
                .section h2 { color: #10b981; border-left: 4px solid #10b981; padding-left: 10px; }
                table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
                th { background-color: #f0f0f0; font-weight: bold; }
                .score { font-size: 24px; font-weight: bold; color: #10b981; }
                .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; color: #999; font-size: 12px; }
                @media print { body { margin: 0; } }
              </style>
            </head>
            <body>
              <div class="header">
                <h1>Store Health Report</h1>
                <p><strong>${report.storeName}</strong></p>
                <p>${report.storeUrl}</p>
                <p>Generated: ${new Date(report.scanDate).toLocaleString()}</p>
              </div>
              
              <div class="section">
                <h2>Overall Health Score</h2>
                <div class="score">${report.overallScore}/100</div>
              </div>
              
              <div class="section">
                <h2>Category Scores</h2>
                <table>
                  <tr>
                    <th>Category</th>
                    <th>Score</th>
                  </tr>
                  ${report.categories.map(c => `<tr><td>${c.name}</td><td>${c.score}/100</td></tr>`).join('')}
                </table>
              </div>
              
              <div class="section">
                <h2>Issues Found</h2>
                <p><strong>${report.criticalIssues.length}</strong> critical issue(s) detected</p>
              </div>
              
              <div class="section">
                <h2>Recommendations</h2>
                <p><strong>${report.recommendations.length}</strong> recommendation(s) available</p>
              </div>
              
              <div class="footer">
                <p>This report was automatically generated by StoreDoctor.</p>
                <p>Print this page or save as PDF using your browser's print function.</p>
              </div>
            </body>
          </html>
        `;
        blob = new Blob([html], { type: "text/html" });
        filename = `${store.name}-scan-report-${date}.html`;
        mimeType = "text/html";
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setShowExportDialog(false);
      toast({
        title: "Report exported",
        description: `Your scan report has been downloaded as ${format.toUpperCase()}.`,
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "Failed to export report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setExportLoading(false);
    }
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
            ? "You've reached your monthly scan limit on the Free plan. Upgrade to Pro (5 scans/month) or Advanced (15 scans/month) to run more scans."
            : userPlan === "pro"
            ? "You've reached your monthly scan limit. Upgrade to Advanced (15 scans/month) for more scans."
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
          <Button variant="outline" onClick={handleExportReport} disabled={exportLoading} data-testid="button-export-report">
            <Download className="mr-2 h-4 w-4" />
            {exportLoading ? "Preparing..." : "Export Report"}
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
                scanId={store?.id}
              />
            </TabsContent>
            <TabsContent value="recommendations">
              <RecommendationsList recommendations={scanResults.recommendations} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      </div>

      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Export Scan Report</DialogTitle>
            <DialogDescription>
              Choose your preferred file format to download the complete scan report for {store?.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 py-4">
            <Button
              variant="outline"
              onClick={() => downloadReport("json")}
              disabled={exportLoading}
              className="justify-start h-auto p-4"
              data-testid="button-export-json"
            >
              <FileJson className="mr-3 h-5 w-5 text-primary" />
              <div className="text-left">
                <div className="font-medium">JSON Format</div>
                <div className="text-xs text-muted-foreground">Structured data format</div>
              </div>
            </Button>
            <Button
              variant="outline"
              onClick={() => downloadReport("csv")}
              disabled={exportLoading}
              className="justify-start h-auto p-4"
              data-testid="button-export-csv"
            >
              <Table className="mr-3 h-5 w-5 text-primary" />
              <div className="text-left">
                <div className="font-medium">CSV Format</div>
                <div className="text-xs text-muted-foreground">Spreadsheet format</div>
              </div>
            </Button>
            <Button
              variant="outline"
              onClick={() => downloadReport("pdf")}
              disabled={exportLoading}
              className="justify-start h-auto p-4"
              data-testid="button-export-pdf"
            >
              <FileText className="mr-3 h-5 w-5 text-primary" />
              <div className="text-left">
                <div className="font-medium">HTML Report</div>
                <div className="text-xs text-muted-foreground">Print to PDF in browser</div>
              </div>
            </Button>
          </div>
          {exportLoading && (
            <div className="flex items-center justify-center py-4 gap-2">
              <div className="h-2 w-2 bg-primary rounded-full animate-bounce" />
              <div className="h-2 w-2 bg-primary rounded-full animate-bounce delay-100" />
              <div className="h-2 w-2 bg-primary rounded-full animate-bounce delay-200" />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
