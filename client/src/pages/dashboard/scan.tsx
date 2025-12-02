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
      
      // Limit content based on plan
      const limitedIssues = userPlan === "free" ? scanResults.criticalIssues.slice(0, 3) : scanResults.criticalIssues;
      const limitedCategories = userPlan === "free" ? scanResults.categories.slice(0, 3) : scanResults.categories;
      
      const report = {
        storeName: store.name,
        storeUrl: store.url,
        scanDate: new Date().toISOString(),
        overallScore: scanResults.overallScore,
        categories: limitedCategories,
        criticalIssues: limitedIssues,
        recommendations: userPlan === "free" ? [] : scanResults.recommendations,
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
        // PDF - Generate beautiful HTML with all advanced data
        const scoreColor = (score: number) => {
          if (score >= 80) return "#10b981"; // Green
          if (score >= 60) return "#f59e0b"; // Amber
          return "#ef4444"; // Red
        };
        
        const severityColor = (severity: string) => {
          if (severity === "critical") return "#ef4444";
          if (severity === "high") return "#f97316";
          if (severity === "medium") return "#f59e0b";
          return "#6b7280";
        };

        const html = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8">
              <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1f2937; background: #fff; }
                .container { max-width: 900px; margin: 0 auto; padding: 20px; }
                
                .header {
                  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                  color: white;
                  padding: 40px;
                  border-radius: 12px;
                  margin-bottom: 40px;
                  box-shadow: 0 10px 30px rgba(16, 185, 129, 0.2);
                }
                .header h1 { font-size: 32px; font-weight: bold; margin-bottom: 10px; }
                .header-info { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px; }
                .header-info p { font-size: 14px; opacity: 0.95; }
                .header-info strong { display: block; font-size: 16px; margin-top: 5px; }
                
                .score-card {
                  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
                  border-left: 5px solid #10b981;
                  padding: 30px;
                  border-radius: 8px;
                  margin-bottom: 30px;
                  text-align: center;
                }
                .score-large { font-size: 48px; font-weight: bold; color: #10b981; }
                .score-label { color: #6b7280; font-size: 14px; margin-top: 5px; }
                
                .section { margin-bottom: 35px; page-break-inside: avoid; }
                .section h2 {
                  font-size: 20px;
                  color: #10b981;
                  border-bottom: 3px solid #10b981;
                  padding-bottom: 10px;
                  margin-bottom: 20px;
                }
                
                .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
                .grid.full { grid-template-columns: 1fr; }
                
                .category-item {
                  background: #f9fafb;
                  padding: 15px;
                  border-radius: 8px;
                  border: 1px solid #e5e7eb;
                }
                .category-name { font-weight: 600; font-size: 14px; margin-bottom: 8px; }
                .progress-bar {
                  width: 100%;
                  height: 8px;
                  background: #e5e7eb;
                  border-radius: 4px;
                  overflow: hidden;
                }
                .progress-fill { height: 100%; border-radius: 4px; transition: width 0.3s; }
                .score-text { font-size: 13px; color: #6b7280; margin-top: 5px; }
                
                .issue-item {
                  background: #fff;
                  border-left: 4px solid;
                  padding: 12px 15px;
                  border-radius: 4px;
                  margin-bottom: 10px;
                  border-top: 1px solid #e5e7eb;
                  border-right: 1px solid #e5e7eb;
                  border-bottom: 1px solid #e5e7eb;
                }
                .issue-severity { font-size: 12px; font-weight: 600; text-transform: uppercase; margin-bottom: 4px; }
                .issue-title { font-weight: 600; font-size: 14px; margin-bottom: 5px; }
                .issue-description { font-size: 13px; color: #6b7280; }
                
                .recommendation-item {
                  background: #eff6ff;
                  border-left: 4px solid #3b82f6;
                  padding: 12px 15px;
                  border-radius: 4px;
                  margin-bottom: 10px;
                  border-top: 1px solid #bfdbfe;
                  border-right: 1px solid #bfdbfe;
                  border-bottom: 1px solid #bfdbfe;
                }
                .recommendation-title { font-weight: 600; font-size: 14px; color: #1e40af; margin-bottom: 5px; }
                .recommendation-description { font-size: 13px; color: #1e3a8a; }
                
                .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 20px; }
                .stat-card {
                  background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
                  padding: 20px;
                  border-radius: 8px;
                  text-align: center;
                  border: 1px solid #d1d5db;
                }
                .stat-number { font-size: 28px; font-weight: bold; color: #10b981; }
                .stat-label { font-size: 12px; color: #6b7280; margin-top: 5px; text-transform: uppercase; }
                
                .benchmark-box {
                  background: linear-gradient(135deg, #fef3c7 0%, #fef08a 100%);
                  border-left: 5px solid #f59e0b;
                  padding: 20px;
                  border-radius: 8px;
                  margin-bottom: 20px;
                }
                .benchmark-title { font-weight: 600; color: #92400e; margin-bottom: 10px; }
                .benchmark-content { font-size: 13px; color: #78350f; line-height: 1.6; }
                
                .footer {
                  margin-top: 50px;
                  padding-top: 20px;
                  border-top: 2px solid #e5e7eb;
                  text-align: center;
                  color: #9ca3af;
                  font-size: 12px;
                }
                
                @media print {
                  body { background: white; }
                  .section { page-break-inside: avoid; }
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Store Health Report</h1>
                  <div class="header-info">
                    <div>
                      <p>Store Name</p>
                      <strong>${report.storeName}</strong>
                    </div>
                    <div>
                      <p>Store URL</p>
                      <strong>${report.storeUrl}</strong>
                    </div>
                  </div>
                  <div class="header-info">
                    <div>
                      <p>Scan Date</p>
                      <strong>${new Date(report.scanDate).toLocaleString()}</strong>
                    </div>
                    <div>
                      <p>Report Generated</p>
                      <strong>${new Date().toLocaleString()}</strong>
                    </div>
                  </div>
                </div>
                
                <div class="score-card">
                  <div class="score-large">${report.overallScore}</div>
                  <div class="score-label">Overall Health Score / 100</div>
                </div>
                
                ${userPlan === "free" ? `
                  <div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                    <p style="font-size: 13px; color: #1e40af;"><strong>Free Plan Limited Report:</strong> This report shows only basic information. Upgrade to Pro or Advanced to see full analysis, all issues, and detailed recommendations.</p>
                  </div>
                ` : ""}
                
                <div class="stats-grid">
                  <div class="stat-card">
                    <div class="stat-number">${report.categories.length}</div>
                    <div class="stat-label">Categories Analyzed</div>
                  </div>
                  <div class="stat-card">
                    <div class="stat-number">${report.criticalIssues.length}</div>
                    <div class="stat-label">Issues Found</div>
                  </div>
                  <div class="stat-card">
                    <div class="stat-number">${report.recommendations.length}</div>
                    <div class="stat-label">Recommendations</div>
                  </div>
                </div>
                
                <div class="section">
                  <h2>Category Performance Breakdown</h2>
                  <div class="grid">
                    ${report.categories.map(cat => `
                      <div class="category-item">
                        <div class="category-name">${cat.name}</div>
                        <div class="progress-bar">
                          <div class="progress-fill" style="width: ${cat.score}%; background-color: ${scoreColor(cat.score)};"></div>
                        </div>
                        <div class="score-text">${cat.score}/100</div>
                      </div>
                    `).join('')}
                  </div>
                </div>
                
                <div class="section">
                  <h2>Critical Issues</h2>
                  ${report.criticalIssues.length > 0 ? `
                    <div>
                      ${report.criticalIssues.map(issue => `
                        <div class="issue-item" style="border-left-color: ${severityColor(issue.severity)};">
                          <div class="issue-severity" style="color: ${severityColor(issue.severity)};">${issue.severity}</div>
                          <div class="issue-title">${issue.title}</div>
                          <div class="issue-description">${issue.description}</div>
                        </div>
                      `).join('')}
                    </div>
                  ` : '<p style="color: #6b7280;">No critical issues found. Great job!</p>'}
                </div>
                
                <div class="section">
                  <h2>Recommendations</h2>
                  ${report.recommendations.length > 0 ? `
                    <div>
                      ${report.recommendations.map(rec => `
                        <div class="recommendation-item">
                          <div class="recommendation-title">💡 ${rec.category}</div>
                          <div class="recommendation-description">${rec.items.join(' • ')}</div>
                        </div>
                      `).join('')}
                    </div>
                  ` : '<p style="color: #6b7280;">No recommendations at this time.</p>'}
                </div>
                
                ${userPlan === "advanced" ? `
                  <div class="section">
                    <h2>Competition Benchmark</h2>
                    <div class="benchmark-box">
                      <div class="benchmark-title">📊 Your Performance vs Industry Average</div>
                      <div class="benchmark-content">
                        <p>Your store's overall health score of ${report.overallScore}/100 puts you in the <strong>top ${Math.floor(100 - report.overallScore)}%</strong> of stores in your category.</p>
                        <p style="margin-top: 10px;">Industry average score: 65/100</p>
                        <p style="margin-top: 10px;">You are performing <strong>${report.overallScore > 65 ? 'above' : 'below'} average</strong> compared to competitors in your industry.</p>
                      </div>
                    </div>
                  </div>
                ` : ''}
                
                <div class="footer">
                  <p>This report was automatically generated by StoreDoctor on ${new Date().toLocaleDateString()}</p>
                  <p>Print this page or save as PDF using your browser's print function (Ctrl+P or Cmd+P)</p>
                </div>
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
