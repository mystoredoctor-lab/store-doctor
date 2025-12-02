import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { apiRequest } from "@/lib/queryClient";

interface StoreDetailsProps {
  storeId: string;
}

interface ScanData {
  id: string;
  overallScore: number;
  issues: any[];
  createdAt: string;
}

export default function StoreDetailsPage() {
  const [location, navigate] = useLocation();
  const params = new URLSearchParams(location.split("?")[1]);
  const storeId = params.get("storeId");

  // Fetch store details
  const { data: store, isLoading: isLoadingStore } = useQuery({
    queryKey: ["/api/stores", storeId],
    queryFn: async () => {
      const response = await apiRequest("GET", `/api/stores/${storeId}`);
      if (!response.ok) throw new Error("Failed to load store");
      return response.json();
    },
    enabled: !!storeId,
  });

  // Fetch scan results for this store
  const { data: scans = [], isLoading: isLoadingScans } = useQuery<ScanData[]>({
    queryKey: ["/api/scans", storeId],
    queryFn: async () => {
      const response = await apiRequest("GET", `/api/scans?storeId=${storeId}`);
      if (!response.ok) return [];
      return response.json();
    },
    enabled: !!storeId,
  });

  const latestScan = scans[0];
  const hasScanData = latestScan && latestScan.overallScore;

  if (isLoadingStore) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/onboarding/connect-store")}
            className="mb-4"
            data-testid="button-back-to-stores"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Stores
          </Button>

          <div>
            <h1 className="text-3xl font-bold">{store?.name}</h1>
            <p className="text-muted-foreground">{store?.url}</p>
          </div>
        </div>

        {/* Empty State - No Scan Yet */}
        {!hasScanData && (
          <Card className="text-center py-12">
            <CardContent className="space-y-4">
              <div className="flex justify-center mb-4">
                <AlertCircle className="h-12 w-12 text-muted-foreground" />
              </div>
              <div>
                <p className="text-lg font-semibold mb-2">No Scan Data Yet</p>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  This store hasn't been scanned yet. Run a scan to get a detailed health analysis of your store.
                </p>
              </div>
              <Button
                size="lg"
                onClick={() => navigate("/onboarding/connect-store")}
                data-testid="button-run-scan"
              >
                Go Back & Run Scan
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Scan Results */}
        {hasScanData && (
          <div className="space-y-6">
            {/* Alert for Free Plan */}
            <Alert className="bg-primary/5 border-primary/20">
              <AlertCircle className="h-4 w-4 text-primary" />
              <AlertDescription>
                Free Plan: Showing top 3 critical issues. Upgrade to Pro or Advanced for full analysis, charts, and auto-fix suggestions.
              </AlertDescription>
            </Alert>

            {/* Score Card */}
            <Card>
              <CardHeader>
                <CardTitle>Overall Health Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-primary">{latestScan.overallScore}/100</div>
                <p className="text-sm text-muted-foreground mt-2">
                  Scanned on {new Date(latestScan.createdAt).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>

            {/* Issues - Free plan shows only 3 */}
            {latestScan.issues && latestScan.issues.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Top Critical Issues</CardTitle>
                  <CardDescription>Free plan shows 3 most critical issues</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {latestScan.issues.slice(0, 3).map((issue, idx) => (
                      <div key={idx} className="p-3 border rounded-md">
                        <p className="font-medium">{issue.title}</p>
                        <p className="text-sm text-muted-foreground mt-1">{issue.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
