import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { AlertBanner } from "@/components/ui/alert-banner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { mockUser, pricingPlans } from "@/lib/data";
import { User, CreditCard, Mail, Key, AlertTriangle, Trash2, Store, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { STORES_STORAGE_KEY } from "@/pages/dashboard/stores";
import type { Store as StoreType } from "@shared/schema";

export default function SettingsPage() {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [stores, setStores] = useState<StoreType[]>([]);
  const { toast } = useToast();
  const currentPlan = pricingPlans.find((p) => p.id === mockUser.plan);

  // Load stores from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORES_STORAGE_KEY);
    if (stored) {
      try {
        setStores(JSON.parse(stored));
      } catch {
        setStores([]);
      }
    }
  }, []);

  const handleRemoveStore = (storeId: string) => {
    const storeName = stores.find(s => s.id === storeId)?.url || "Store";
    const updatedStores = stores.filter(s => s.id !== storeId);
    setStores(updatedStores);
    localStorage.setItem(STORES_STORAGE_KEY, JSON.stringify(updatedStores));
    toast({
      title: "Store removed",
      description: `${storeName} has been disconnected.`,
    });
  };

  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile has been saved successfully.",
    });
  };

  const handleConnectGmail = () => {
    toast({
      title: "Gmail connection initiated",
      description: "Redirecting to Google for authorization...",
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Account deletion requested",
      description: "We've sent a confirmation email.",
      variant: "destructive",
    });
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5" />
            <CardTitle>Profile</CardTitle>
          </div>
          <CardDescription>Update your personal information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={mockUser.avatar || undefined} alt={mockUser.name} />
              <AvatarFallback className="text-2xl">{mockUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button variant="outline" data-testid="button-change-avatar">Change Avatar</Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue={mockUser.name} data-testid="input-name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={mockUser.email} data-testid="input-email" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveProfile} data-testid="button-save-profile">Save Changes</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            <CardTitle>Billing & Subscription</CardTitle>
          </div>
          <CardDescription>Manage your subscription plan and billing.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-muted/50">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p className="font-medium">Current Plan</p>
                <Badge>{currentPlan?.name}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {currentPlan?.price === 0 ? "Free forever" : `$${currentPlan?.price}/${currentPlan?.interval}`}
              </p>
            </div>
            <div className="flex gap-2">
              {mockUser.plan !== "advanced" && (
                <Button asChild>
                  <Link href="/pricing" data-testid="button-upgrade-plan">Upgrade Plan</Link>
                </Button>
              )}
              {mockUser.plan !== "free" && <Button variant="outline" data-testid="button-downgrade">Downgrade</Button>}
            </div>
          </div>
          {mockUser.plan !== "free" && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Payment Method</p>
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-12 rounded bg-muted flex items-center justify-center text-xs font-bold">VISA</div>
                  <span className="text-sm">&bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; 4242</span>
                </div>
                <Button variant="ghost" size="sm" data-testid="button-update-payment">
                  Update
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Store className="h-5 w-5" />
            <CardTitle>Connected Stores</CardTitle>
          </div>
          <CardDescription>Manage your connected Shopify stores.</CardDescription>
        </CardHeader>
        <CardContent>
          {stores.length > 0 ? (
            <div className="space-y-3">
              {stores.map((store) => (
                <div
                  key={store.id}
                  className="flex items-center justify-between p-4 rounded-lg border bg-muted/30"
                >
                  <div className="min-w-0">
                    <p className="font-medium truncate">{store.name}</p>
                    <p className="text-sm text-muted-foreground truncate">{store.url}</p>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="shrink-0 text-destructive hover:text-destructive"
                    onClick={() => handleRemoveStore(store.id)}
                    data-testid={`button-remove-store-${store.id}`}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Store className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-50" />
              <p className="text-muted-foreground">No stores connected yet</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            <CardTitle>Email Integration</CardTitle>
          </div>
          <CardDescription>Connect your Gmail for scan reports and notifications.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="font-medium">Gmail Account</p>
              <p className="text-sm text-muted-foreground">Not connected</p>
            </div>
            <Button variant="outline" onClick={handleConnectGmail} data-testid="button-connect-gmail">
              Connect Gmail
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            <CardTitle>API Keys</CardTitle>
          </div>
          <CardDescription>Manage your API keys for programmatic access.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <AlertBanner
              type="info"
              title="API access coming soon"
              message="We're working on API access for advanced users. Stay tuned!"
            />
            <div className="opacity-50 pointer-events-none">
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div>
                  <p className="text-sm font-medium">Production Key</p>
                  <p className="text-xs text-muted-foreground font-mono">sk_live_&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" disabled>
                    Copy
                  </Button>
                  <Button variant="ghost" size="sm" disabled>
                    Regenerate
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Choose what notifications you want to receive.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { id: "scan-complete", label: "Scan completion alerts", description: "Get notified when scans finish" },
            { id: "weekly-report", label: "Weekly health reports", description: "Summary of your store health" },
            {
              id: "critical-issues",
              label: "Critical issue alerts",
              description: "Immediate alerts for critical problems",
            },
            { id: "marketing", label: "Product updates", description: "New features and improvements" },
          ].map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-4">
              <div>
                <p className="font-medium">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <Switch defaultChecked={item.id !== "marketing"} data-testid={`switch-${item.id}`} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-destructive/50">
        <CardHeader>
          <div className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            <CardTitle>Danger Zone</CardTitle>
          </div>
          <CardDescription>Irreversible and destructive actions.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="font-medium">Delete Account</p>
              <p className="text-sm text-muted-foreground">Permanently delete your account and all associated data.</p>
            </div>
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive" data-testid="button-delete-account">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Account
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete your account and remove all your data
                    from our servers.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={handleDeleteAccount} data-testid="button-confirm-delete">
                    Delete Account
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
