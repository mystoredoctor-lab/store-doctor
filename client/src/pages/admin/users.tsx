import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Download } from "lucide-react";

const allUsers = [
  { id: 1, name: "Sarah Johnson", email: "sarah@fashionforward.com", plan: "pro", stores: 3, scans: 45, joined: "2024-10-15" },
  { id: 2, name: "Mike Chen", email: "mike@techgadgets.com", plan: "advanced", stores: 2, scans: 89, joined: "2024-10-10" },
  { id: 3, name: "Emma Williams", email: "emma@homegarden.com", plan: "free", stores: 1, scans: 2, joined: "2024-10-08" },
  { id: 4, name: "David Rodriguez", email: "david@ecommercepro.com", plan: "pro", stores: 5, scans: 102, joined: "2024-09-20" },
  { id: 5, name: "Lisa Anderson", email: "lisa@shopify.com", plan: "advanced", stores: 4, scans: 156, joined: "2024-09-15" },
];

export default function UsersPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Users</h1>
        <p className="text-muted-foreground">Manage and monitor all Store Doctor users.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Users</CardTitle>
              <CardDescription>Total: {allUsers.length} users</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search users..." className="pl-10" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">Name</th>
                  <th className="text-left py-3 px-4 font-semibold">Email</th>
                  <th className="text-left py-3 px-4 font-semibold">Plan</th>
                  <th className="text-left py-3 px-4 font-semibold">Stores</th>
                  <th className="text-left py-3 px-4 font-semibold">Scans</th>
                  <th className="text-left py-3 px-4 font-semibold">Joined</th>
                </tr>
              </thead>
              <tbody>
                {allUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">{user.name}</td>
                    <td className="py-3 px-4 text-muted-foreground">{user.email}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-medium capitalize ${
                        user.plan === 'free' ? 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300' :
                        user.plan === 'pro' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' :
                        'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
                      }`}>
                        {user.plan}
                      </span>
                    </td>
                    <td className="py-3 px-4">{user.stores}</td>
                    <td className="py-3 px-4">{user.scans}</td>
                    <td className="py-3 px-4 text-muted-foreground">{user.joined}</td>
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
