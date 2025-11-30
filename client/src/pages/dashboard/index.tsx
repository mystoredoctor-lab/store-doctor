import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/ui/stat-card";
import { HealthScoreGauge } from "@/components/ui/health-score-gauge";
import { StoreCard } from "@/components/ui/store-card";
import { AlertBanner } from "@/components/ui/alert-banner";
import { RatingModal } from "@/components/ui/rating-modal";
import { dashboardStats, mockStores, mockUser } from "@/lib/data";
import { Activity, Calendar, Store, AlertTriangle, Plus, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const handleScrollToTop = () => {
  window.scrollTo(0, 0);
};

export default function DashboardPage() {
  const [showRatingModal, setShowRatingModal] = useState(false);
  const { toast } = useToast();

  const handleRunScan = () => {
    // Navigate to scanning page
    const link = document.createElement('a');
    link.href = '/dashboard/scanning';
    link.click();
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold" data-testid="text-welcome">Welcome back, {mockUser.name.split(" ")[0]}!</h1>
          <p className="text-muted-foreground">Here's an overview of your store health.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowRatingModal(true)} data-testid="button-rate-us">
            <Star className="mr-2 h-4 w-4" />
            Rate Us
          </Button>
          <Button asChild>
            <Link href="/dashboard/stores" onClick={handleScrollToTop} data-testid="button-connect-store">
              <Plus className="mr-2 h-4 w-4" />
              Connect Store
            </Link>
          </Button>
        </div>
      </div>

      {dashboardStats.scansLeft <= 3 && (
        <AlertBanner
          type="warning"
          title="Running low on scans"
          message={`You have ${dashboardStats.scansLeft} scans left this month. Upgrade your plan for more scans.`}
        />
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Scans Remaining"
          value={`${dashboardStats.scansLeft}/${dashboardStats.totalScans}`}
          subtitle="Resets in 10 days"
          icon={Activity}
        />
        <StatCard
          title="Last Scan"
          value={new Date(dashboardStats.lastScanDate).toLocaleDateString()}
          subtitle="Fashion Forward store"
          icon={Calendar}
        />
        <StatCard title="Connected Stores" value={dashboardStats.totalStores} icon={Store} />
        <StatCard
          title="Total Issues Found"
          value={dashboardStats.totalIssuesFound}
          icon={AlertTriangle}
          trend={{ value: -12, isPositive: true }}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Average Health Score</CardTitle>
            <CardDescription>Across all connected stores</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center py-6">
            <HealthScoreGauge score={dashboardStats.averageHealthScore} size="lg" />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between gap-4 flex-wrap">
            <div>
              <CardTitle>Your Stores</CardTitle>
              <CardDescription>Quick overview of connected stores</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/stores" onClick={handleScrollToTop} data-testid="button-view-all-stores">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {mockStores.slice(0, 2).map((store) => (
                <StoreCard key={store.id} store={store} onRunScan={handleRunScan} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks to manage your stores</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent" asChild>
              <Link href="/dashboard/scan" onClick={handleScrollToTop} data-testid="button-quick-action-scan">
                <Activity className="h-6 w-6" />
                <span>Run New Scan</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent" asChild>
              <Link href="/dashboard/stores" onClick={handleScrollToTop} data-testid="button-quick-action-stores">
                <Store className="h-6 w-6" />
                <span>Manage Stores</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent" asChild>
              <Link href="/dashboard/settings" onClick={handleScrollToTop} data-testid="button-quick-action-issues">
                <AlertTriangle className="h-6 w-6" />
                <span>View All Issues</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <RatingModal open={showRatingModal} onOpenChange={setShowRatingModal} />
    </div>
  );
}
