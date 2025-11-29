"use client"

import * as React from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatCard } from "@/components/ui/stat-card"
import { HealthScoreGauge } from "@/components/ui/health-score-gauge"
import { StoreCard } from "@/components/ui/store-card"
import { AlertBanner } from "@/components/ui/alert-banner"
import { RatingModal } from "@/components/ui/rating-modal"
import { dashboardStats, mockStores, mockUser } from "@/lib/mock-data"
import { Activity, Calendar, Store, AlertTriangle, Plus, Star } from "lucide-react"

export default function DashboardPage() {
  const [showRatingModal, setShowRatingModal] = React.useState(false)

  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {mockUser.name.split(" ")[0]}!</h1>
          <p className="text-muted-foreground">Here&apos;s an overview of your store health.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowRatingModal(true)}>
            <Star className="mr-2 h-4 w-4" />
            Rate Us
          </Button>
          {/* TODO: Connect to actual store connection flow */}
          <Button asChild>
            <Link href="/dashboard/stores">
              <Plus className="mr-2 h-4 w-4" />
              Connect Store
            </Link>
          </Button>
        </div>
      </div>

      {/* Alert for users approaching scan limit */}
      {dashboardStats.scansLeft <= 3 && (
        <AlertBanner
          type="warning"
          title="Running low on scans"
          message={`You have ${dashboardStats.scansLeft} scans left this month. Upgrade your plan for more scans.`}
        />
      )}

      {/* Stats grid */}
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

      {/* Health Score Overview */}
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
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Your Stores</CardTitle>
              <CardDescription>Quick overview of connected stores</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/stores">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {mockStores.slice(0, 2).map((store) => (
                <StoreCard key={store.id} store={store} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks to manage your stores</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {/* TODO: Connect these buttons to actual functionality */}
            <Button variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent" asChild>
              <Link href="/dashboard/scan">
                <Activity className="h-6 w-6" />
                <span>Run New Scan</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent" asChild>
              <Link href="/dashboard/stores">
                <Store className="h-6 w-6" />
                <span>Manage Stores</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent" asChild>
              <Link href="/dashboard/settings">
                <AlertTriangle className="h-6 w-6" />
                <span>View All Issues</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Rating Modal */}
      <RatingModal open={showRatingModal} onOpenChange={setShowRatingModal} />
    </div>
  )
}
