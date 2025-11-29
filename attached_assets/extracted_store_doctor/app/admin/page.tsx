"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatCard } from "@/components/ui/stat-card"
import { DataTable, PlanBadge } from "@/components/ui/data-table"
import { AdminUserGrowthChart } from "@/components/admin/user-growth-chart"
import { AdminRevenueChart } from "@/components/admin/revenue-chart"
import { AdminTokenUsageChart } from "@/components/admin/token-usage-chart"
import { adminStats, adminRecentUsers } from "@/lib/mock-data"
import { Users, Download, CreditCard, TrendingUp, Activity, XCircle, Zap, Calendar } from "lucide-react"

export default function AdminDashboard() {
  const userColumns = [
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    {
      key: "plan",
      header: "Plan",
      render: (user: (typeof adminRecentUsers)[0]) => <PlanBadge plan={user.plan} />,
    },
    { key: "joinedAt", header: "Joined" },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of Store Doctor platform metrics.</p>
      </div>

      {/* Key metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value={adminStats.totalUsers.toLocaleString()}
          icon={Users}
          trend={{ value: 8.2, isPositive: true }}
        />
        <StatCard
          title="Total Installs"
          value={adminStats.totalInstalls.toLocaleString()}
          icon={Download}
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatCard
          title="MRR"
          value={`$${adminStats.mrr.toLocaleString()}`}
          icon={CreditCard}
          trend={{ value: 7.8, isPositive: true }}
        />
        <StatCard
          title="Conversion Rate"
          value={`${adminStats.conversionRate}%`}
          icon={TrendingUp}
          trend={{ value: 2.1, isPositive: true }}
        />
      </div>

      {/* Secondary metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="ARR" value={`$${adminStats.arr.toLocaleString()}`} icon={Calendar} />
        <StatCard
          title="Free Users"
          value={adminStats.freeUsers.toLocaleString()}
          subtitle={`${((adminStats.freeUsers / adminStats.totalUsers) * 100).toFixed(1)}% of total`}
          icon={Users}
        />
        <StatCard
          title="Paid Users"
          value={adminStats.paidUsers.toLocaleString()}
          subtitle={`${((adminStats.paidUsers / adminStats.totalUsers) * 100).toFixed(1)}% of total`}
          icon={CreditCard}
        />
        <StatCard
          title="Uninstalls"
          value={adminStats.uninstalls}
          subtitle={`${adminStats.churnRate}% churn rate`}
          icon={XCircle}
        />
      </div>

      {/* Scan metrics */}
      <div className="grid gap-4 md:grid-cols-2">
        <StatCard title="Daily Scans" value={adminStats.dailyScans.toLocaleString()} icon={Activity} />
        <StatCard title="Monthly Scans" value={adminStats.monthlyScans.toLocaleString()} icon={Zap} />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>Total users over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <AdminUserGrowthChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
            <CardDescription>Monthly recurring revenue trend</CardDescription>
          </CardHeader>
          <CardContent>
            <AdminRevenueChart />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Token Usage</CardTitle>
          <CardDescription>AI token consumption this week</CardDescription>
        </CardHeader>
        <CardContent>
          <AdminTokenUsageChart />
        </CardContent>
      </Card>

      {/* Recent users table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Users</CardTitle>
          <CardDescription>Latest users who signed up</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable data={adminRecentUsers} columns={userColumns} />
        </CardContent>
      </Card>
    </div>
  )
}
