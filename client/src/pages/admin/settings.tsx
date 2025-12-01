import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { getScanLimits, setScanLimits, DEFAULT_LIMITS, resetScanCount } from "@/lib/scanManager";
import { Zap } from "lucide-react";

export default function AdminSettingsPage() {
  const { toast } = useToast();
  const [scanLimits, setScanLimitsState] = useState(getScanLimits());
  const [tempLimits, setTempLimits] = useState(getScanLimits());

  const handleSaveScanLimits = () => {
    setScanLimits(tempLimits);
    setScanLimitsState(tempLimits);
    toast({
      title: "Scan limits updated",
      description: "Monthly scan limits have been saved successfully.",
    });
  };

  const handleResetScanLimits = () => {
    setTempLimits(DEFAULT_LIMITS);
    setScanLimits(DEFAULT_LIMITS);
    setScanLimitsState(DEFAULT_LIMITS);
    resetScanCount();
    toast({
      title: "Scan limits reset",
      description: "Limits have been reset to defaults and usage counter has been cleared.",
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Admin Settings</h1>
        <p className="text-muted-foreground">Configure platform settings and preferences.</p>
      </div>

      <div className="grid gap-6 max-w-2xl">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              <CardTitle>Scan Limits</CardTitle>
            </div>
            <CardDescription>Configure monthly scan limits for each plan.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="free-scans">Free Plan Scans/Month</Label>
                <Input 
                  id="free-scans" 
                  type="number" 
                  min="1"
                  value={tempLimits.free} 
                  onChange={(e) => setTempLimits({...tempLimits, free: parseInt(e.target.value) || 1})}
                  data-testid="input-free-scans"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pro-scans">Pro Plan Scans/Month</Label>
                <Input 
                  id="pro-scans" 
                  type="number" 
                  min="1"
                  value={tempLimits.pro} 
                  onChange={(e) => setTempLimits({...tempLimits, pro: parseInt(e.target.value) || 10})}
                  data-testid="input-pro-scans"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="advanced-scans">Advanced Plan Scans/Month</Label>
                <Input 
                  id="advanced-scans" 
                  type="number" 
                  min="1"
                  value={tempLimits.advanced} 
                  onChange={(e) => setTempLimits({...tempLimits, advanced: parseInt(e.target.value) || 25})}
                  data-testid="input-advanced-scans"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button onClick={handleSaveScanLimits} data-testid="button-save-scan-limits">Save Limits</Button>
            <Button variant="outline" onClick={handleResetScanLimits} data-testid="button-reset-scan-limits">Reset to Defaults</Button>
          </CardFooter>
        </Card>

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
