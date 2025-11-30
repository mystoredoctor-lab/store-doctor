import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { AdminUserGrowthChart } from "@/components/admin/user-growth-chart";
import { AdminRevenueChart } from "@/components/admin/revenue-chart";
import { AdminTokenUsageChart } from "@/components/admin/token-usage-chart";
import { Users, Download, CreditCard, TrendingUp, Activity, XCircle, Zap, Calendar } from "lucide-react";

const adminStats = {
  totalUsers: 2847,
  totalInstalls: 3421,
  mrr: 14250,
  conversionRate: 3.2,
  arr: 171000,
  freeUsers: 1890,
  paidUsers: 957,
  uninstalls: 14,
  churnRate: 1.2,
  dailyScans: 856,
  monthlyScans: 18420,
};

const adminRecentUsers = [
  { name: "Sarah Johnson", email: "sarah@fashionforward.com", plan: "pro", joinedAt: "2024-11-15" },
  { name: "Mike Chen", email: "mike@techgadgets.com", plan: "advanced", joinedAt: "2024-11-14" },
  { name: "Emma Williams", email: "emma@homegarden.com", plan: "free", joinedAt: "2024-11-13" },
  { name: "David Rodriguez", email: "david@ecommercepro.com", plan: "pro", joinedAt: "2024-11-12" },
  { name: "Lisa Anderson", email: "lisa@shopify.com", plan: "advanced", joinedAt: "2024-11-11" },
];

export default function AdminDashboard() {
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
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4 font-semibold">Name</th>
                  <th className="text-left py-2 px-4 font-semibold">Email</th>
                  <th className="text-left py-2 px-4 font-semibold">Plan</th>
                  <th className="text-left py-2 px-4 font-semibold">Joined</th>
                </tr>
              </thead>
              <tbody>
                {adminRecentUsers.map((user, idx) => (
                  <tr key={idx} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">{user.name}</td>
                    <td className="py-3 px-4 text-muted-foreground">{user.email}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium capitalize">
                        {user.plan}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{user.joinedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
