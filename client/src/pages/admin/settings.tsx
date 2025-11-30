import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Admin Settings</h1>
        <p className="text-muted-foreground">Configure platform settings and preferences.</p>
      </div>

      <div className="grid gap-6 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>API Configuration</CardTitle>
            <CardDescription>Configure API keys and settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Groq API Key</Label>
              <Input placeholder="Enter Groq API key" type="password" className="mt-2" />
            </div>
            <div>
              <Label>Max Tokens Per Scan</Label>
              <Input placeholder="5000" type="number" className="mt-2" />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pricing Plans</CardTitle>
            <CardDescription>Manage subscription pricing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Pro Plan Price ($/month)</Label>
              <Input placeholder="12" type="number" className="mt-2" />
            </div>
            <div>
              <Label>Advanced Plan Price ($/month)</Label>
              <Input placeholder="25" type="number" className="mt-2" />
            </div>
            <Button>Update Pricing</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Scan Configuration</CardTitle>
            <CardDescription>Configure scanning behavior</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Sample Size (products to analyze)</Label>
              <Input placeholder="50" type="number" className="mt-2" />
            </div>
            <div>
              <Label>Scan Timeout (seconds)</Label>
              <Input placeholder="300" type="number" className="mt-2" />
            </div>
            <Button>Update Configuration</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Email notification settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <input type="checkbox" id="churn" defaultChecked className="rounded" />
              <label htmlFor="churn">Notify on user churn</label>
            </div>
            <div className="flex items-center gap-4">
              <input type="checkbox" id="errors" defaultChecked className="rounded" />
              <label htmlFor="errors">Notify on scan errors</label>
            </div>
            <Button>Save Preferences</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
