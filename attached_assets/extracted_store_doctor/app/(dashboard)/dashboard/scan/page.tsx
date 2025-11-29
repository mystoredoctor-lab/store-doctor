"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HealthScoreGauge } from "@/components/ui/health-score-gauge"
import { AlertBanner } from "@/components/ui/alert-banner"
import { CategoryScoreGrid } from "@/components/scan/category-score-grid"
import { IssuesList } from "@/components/scan/issues-list"
import { RecommendationsList } from "@/components/scan/recommendations-list"
import { ScanHistoryChart } from "@/components/scan/scan-history-chart"
import { IssueSeverityChart } from "@/components/scan/issue-severity-chart"
import { CategoryBreakdownChart } from "@/components/scan/category-breakdown-chart"
import { mockScanResults, mockStores, mockUser } from "@/lib/mock-data"
import { RefreshCw, Download, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ScanPage() {
  const [isScanning, setIsScanning] = React.useState(false)
  const { toast } = useToast()
  const store = mockStores[0] // Using first store for demo

  const handleRunScan = () => {
    // TODO: Connect to actual scan API
    setIsScanning(true)
    toast({
      title: "Scan started",
      description: "This may take a few minutes...",
    })
    // Simulate scan completion
    setTimeout(() => {
      setIsScanning(false)
      toast({
        title: "Scan complete",
        description: "Your store has been analyzed successfully.",
      })
    }, 3000)
  }

  const handleExportReport = () => {
    // TODO: Connect to actual export functionality
    toast({
      title: "Report exported",
      description: "Your scan report has been downloaded.",
    })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold">Scan Results</h1>
            <Badge variant="outline" className="text-xs">
              {store.name}
            </Badge>
          </div>
          <p className="text-muted-foreground">Last scanned: {new Date(mockScanResults.scanDate).toLocaleString()}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportReport}>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          {/* TODO: Connect to actual scan API */}
          <Button onClick={handleRunScan} disabled={isScanning}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isScanning ? "animate-spin" : ""}`} />
            {isScanning ? "Scanning..." : "Run New Scan"}
          </Button>
        </div>
      </div>

      {/* Free plan limitation notice */}
      {mockUser.plan === "free" && (
        <AlertBanner
          type="info"
          title="Free Plan Limitations"
          message="You're viewing limited results. Upgrade to Pro to see full analysis, all issues, and detailed charts."
        />
      )}

      {/* Main score and category grid */}
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

      {/* Charts section */}
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

      {/* Issues and Recommendations tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Analysis</CardTitle>
          <CardDescription>Issues found and recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="issues">
            <TabsList className="mb-4">
              <TabsTrigger value="issues">Critical Issues ({mockScanResults.criticalIssues.length})</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
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
  )
}
