import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StoreCard } from "@/components/ui/store-card";
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
import { Label } from "@/components/ui/label";
import { mockStores, mockUser } from "@/lib/data";
import { Plus, Search, Store, Shield, Zap, BarChart3, Lock, Zap as ZapIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Store as StoreType } from "@shared/schema";

export const STORES_STORAGE_KEY = "storedoctor_connected_stores_v1";

export default function StoresPage() {
  const [, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isConnectDialogOpen, setIsConnectDialogOpen] = useState(false);
  const [storeUrl, setStoreUrl] = useState("");
  const [stores, setStores] = useState<StoreType[]>([]);
  const { toast } = useToast();

  // Initialize stores from localStorage or use mock data
  useEffect(() => {
    const stored = localStorage.getItem(STORES_STORAGE_KEY);
    if (stored) {
      try {
        setStores(JSON.parse(stored));
      } catch {
        setStores(mockStores);
      }
    } else {
      setStores(mockStores);
    }
  }, []);

  // Save stores to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORES_STORAGE_KEY, JSON.stringify(stores));
  }, [stores]);

  const filteredStores = stores.filter(
    (store) =>
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.url.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const maxStores = mockUser.plan === "free" ? 1 : mockUser.plan === "pro" ? 2 : 5;
  const canAddMore = stores.length < maxStores;

  const handleConnectStore = () => {
    if (!storeUrl.trim()) return;

    const newStore: StoreType = {
      id: `store_${Date.now()}`,
      userId: mockUser.id,
      name: storeUrl.split(".")[0] || "New Store",
      url: storeUrl,
      shopifyAccessToken: null,
      healthScore: 0,
      status: "pending",
      issuesCount: 0,
      lastScanAt: null,
      createdAt: new Date(),
    };

    setStores([...stores, newStore]);
    toast({
      title: "Store connected successfully",
      description: `${storeUrl} has been added to your stores.`,
    });
    setIsConnectDialogOpen(false);
    setStoreUrl("");
  };

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
          <h1 className="text-3xl font-bold">Your Stores</h1>
          <p className="text-muted-foreground">Manage and monitor your connected Shopify stores.</p>
        </div>
        <Dialog open={isConnectDialogOpen} onOpenChange={setIsConnectDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              disabled={!canAddMore} 
              data-testid="button-connect-store"
              onClick={() => {
                if (!canAddMore) {
                  navigate("/pricing");
                }
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Connect Store
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-2xl">Connect Your Shopify Store</DialogTitle>
              <DialogDescription>
                Secure integration with real-time health monitoring
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 py-6">
              {/* Input Section */}
              <div className="space-y-3">
                <Label htmlFor="store-url" className="text-sm font-semibold">
                  Store URL
                </Label>
                <Input
                  id="store-url"
                  placeholder="yourstore.myshopify.com"
                  value={storeUrl}
                  onChange={(e) => setStoreUrl(e.target.value)}
                  data-testid="input-store-url"
                  className="h-10"
                />
                <p className="text-xs text-muted-foreground">
                  Enter your store's Myshopify domain
                </p>
              </div>

              {/* Benefits Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex gap-3 rounded-lg bg-muted/30 p-3 border border-border/30">
                  <Shield className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-xs font-medium leading-tight">Secure</p>
                    <p className="text-xs text-muted-foreground leading-tight">OAuth 2.0 encryption</p>
                  </div>
                </div>
                <div className="flex gap-3 rounded-lg bg-muted/30 p-3 border border-border/30">
                  <Zap className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-xs font-medium leading-tight">Smart Sampling</p>
                    <p className="text-xs text-muted-foreground leading-tight">Top 50-100 products</p>
                  </div>
                </div>
                <div className="flex gap-3 rounded-lg bg-muted/30 p-3 border border-border/30">
                  <BarChart3 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-xs font-medium leading-tight">Instant Reports</p>
                    <p className="text-xs text-muted-foreground leading-tight">Real-time analytics</p>
                  </div>
                </div>
                <div className="flex gap-3 rounded-lg bg-muted/30 p-3 border border-border/30">
                  <Lock className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-xs font-medium leading-tight">Privacy First</p>
                    <p className="text-xs text-muted-foreground leading-tight">No data stored</p>
                  </div>
                </div>
              </div>

              {/* Info Note */}
              <div className="rounded-lg bg-primary/5 border border-primary/10 p-3">
                <p className="text-xs text-foreground">
                  <span className="font-medium">What happens next:</span> You'll be securely redirected to Shopify to authorize the connection. Store Doctor never accesses sensitive customer data.
                </p>
              </div>
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button 
                variant="outline" 
                onClick={() => setIsConnectDialogOpen(false)}
                data-testid="button-cancel-connect"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleConnectStore} 
                disabled={!storeUrl} 
                data-testid="button-confirm-connect"
              >
                <Lock className="mr-2 h-4 w-4" />
                Connect Securely
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {!canAddMore && (
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-sm">You've reached your store limit ({maxStores} stores)</p>
              <p className="text-sm text-muted-foreground mt-1">Upgrade your plan to connect more stores.</p>
            </div>
            <Button 
              onClick={() => navigate("/pricing")}
              data-testid="button-upgrade-to-add-store"
            >
              <ZapIcon className="mr-2 h-4 w-4" />
              Upgrade Plan
            </Button>
          </div>
        </div>
      )}

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Connected Stores</CardTitle>
              <CardDescription>
                {stores.length} of {maxStores} stores connected
              </CardDescription>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search stores..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="input-search-stores"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredStores.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredStores.map((store) => (
                <StoreCard key={store.id} store={store} onRunScan={handleRunScan} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Store className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No stores found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery
                  ? "No stores match your search criteria."
                  : "Connect your first Shopify store to get started."}
              </p>
              {!searchQuery && (
                <Button onClick={() => setIsConnectDialogOpen(true)} data-testid="button-connect-first-store">
                  <Plus className="mr-2 h-4 w-4" />
                  Connect Your First Store
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tips for Better Store Health</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="font-medium text-foreground">Run regular scans:</span>
              We recommend scanning your store at least once a week to catch issues early.
            </li>
            <li className="flex items-start gap-2">
              <span className="font-medium text-foreground">Address critical issues first:</span>
              Focus on high-impact issues before moving to minor optimizations.
            </li>
            <li className="flex items-start gap-2">
              <span className="font-medium text-foreground">Track your progress:</span>
              Monitor your health score over time to see the impact of your improvements.
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
