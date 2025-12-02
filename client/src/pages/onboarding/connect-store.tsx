import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Loader2, Store, ArrowRight, CheckCircle2 } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserPlan } from "@/lib/planManager";
import { UpgradeModal } from "@/components/ui/upgrade-modal";

const connectStoreSchema = z.object({
  shopUrl: z.string().min(1, "Store URL is required").regex(/\.myshopify\.com$/, "Must be a valid Shopify store URL"),
});

type ConnectStoreFormValues = z.infer<typeof connectStoreSchema>;

interface ConnectedStore {
  id: string;
  name: string;
  url: string;
  status: string;
  healthScore?: number | null;
  issuesCount?: number | null;
  lastScanAt?: string | null;
}

export default function ConnectStorePage() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [showAddStore, setShowAddStore] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const userPlan = getUserPlan();

  const form = useForm<ConnectStoreFormValues>({
    resolver: zodResolver(connectStoreSchema),
    defaultValues: {
      shopUrl: "",
    },
  });

  // Fetch user's stores
  const { data: stores = [], isLoading: isLoadingStores } = useQuery<ConnectedStore[]>({
    queryKey: ["/api/stores"],
    queryFn: async () => {
      try {
        const response = await apiRequest("GET", "/api/stores");
        if (!response.ok) throw new Error("Failed to load stores");
        return response.json();
      } catch (error) {
        return [];
      }
    },
  });

  // Connect store mutation
  const connectStoreMutation = useMutation({
    mutationFn: async (data: ConnectStoreFormValues) => {
      return apiRequest("POST", "/api/stores", {
        name: data.shopUrl.split(".")[0],
        url: data.shopUrl,
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Store connected successfully",
      });
      
      // Invalidate stores cache
      queryClient.invalidateQueries({ queryKey: ["/api/stores"] });
      
      // Reset form
      form.reset();
      setShowAddStore(false);
      
      // Redirect to dashboard after a brief delay
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to connect store",
        variant: "destructive",
      });
    },
  });

  const handleScanStore = async (storeId: string) => {
    try {
      // Initiate scan using correct endpoint
      const response = await apiRequest("POST", `/api/stores/${storeId}/scans`, {
        type: "full",
      });
      
      toast({
        title: "Scan started",
        description: "Your store is being analyzed...",
      });
      
      // Redirect to scanning page
      navigate(`/dashboard/scanning?storeId=${storeId}`);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to start scan",
        variant: "destructive",
      });
    }
  };

  const onSubmit = (data: ConnectStoreFormValues) => {
    connectStoreMutation.mutate(data);
  };

  return (
    <>
      <UpgradeModal
        open={showUpgradeModal}
        onOpenChange={setShowUpgradeModal}
        title="Store Limit Reached"
        description="You've reached your store limit on the Free plan. Upgrade to Pro (2 stores) or Advanced (5 stores) to connect more stores."
      />
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Store className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Connect Your Store</h1>
          </div>
          <p className="text-muted-foreground">
            Connect your Shopify store to start getting AI-powered diagnostics
          </p>
        </div>

        {/* Connected Stores List */}
        {stores.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Your Connected Stores</h2>
            <div className="grid gap-3">
              {stores.map((store) => (
                <Card key={store.id} className="hover-elevate">
                  <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-medium">{store.name}</p>
                      <p className="text-sm text-muted-foreground">{store.url}</p>
                      {!store.lastScanAt && (
                        <p className="text-xs text-muted-foreground mt-2">No scans yet - click scan to get started</p>
                      )}
                    </div>
                    <Button
                      onClick={() => handleScanStore(store.id)}
                      disabled={connectStoreMutation.isPending}
                      data-testid={`button-scan-store-${store.id}`}
                    >
                      Scan Store
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {!showAddStore && (
              <Button
                variant="outline"
                className="mt-4 w-full"
                onClick={() => {
                  const maxStores = userPlan === "free" ? 1 : userPlan === "pro" ? 2 : 5;
                  if (stores.length >= maxStores) {
                    setShowUpgradeModal(true);
                  } else {
                    setShowAddStore(true);
                  }
                }}
                data-testid="button-add-another-store"
              >
                <ArrowRight className="mr-2 h-4 w-4" />
                Add Another Store
              </Button>
            )}
          </div>
        )}

        {/* Empty State or Add Store Form */}
        {stores.length === 0 && !showAddStore && (
          <Card className="text-center py-12">
            <CardContent className="space-y-4">
              <div className="flex justify-center mb-4">
                <Store className="h-12 w-12 text-muted-foreground" />
              </div>
              <div>
                <p className="text-lg font-semibold mb-2">No stores connected yet</p>
                <p className="text-muted-foreground mb-6">
                  Connect your first Shopify store to get started with StoreDoctor
                </p>
              </div>
              <Button
                onClick={() => setShowAddStore(true)}
                size="lg"
                data-testid="button-connect-first-store"
              >
                Connect Your Store
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Add Store Form */}
        {showAddStore && (
          <Card>
            <CardHeader>
              <CardTitle>Connect a New Store</CardTitle>
              <CardDescription>
                Enter your Shopify store URL (e.g., mystore.myshopify.com)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="shopUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Store URL</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="mystore.myshopify.com" 
                            disabled={connectStoreMutation.isPending}
                            data-testid="input-shop-url"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-3">
                    <Button 
                      type="submit" 
                      className="flex-1"
                      disabled={connectStoreMutation.isPending}
                      data-testid="button-connect-store"
                    >
                      {connectStoreMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {connectStoreMutation.isPending ? "Connecting..." : "Connect Store"}
                    </Button>
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={() => setShowAddStore(false)}
                      data-testid="button-cancel-connect"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}

        {/* Info Box */}
        <Card className="mt-8 bg-primary/5 border-primary/20">
          <CardContent className="p-4 flex gap-3">
            <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p className="font-medium text-sm">Free Plan Features:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✓ 1 scan per month</li>
                <li>✓ 1 connected store</li>
                <li>✓ Basic health overview</li>
                <li>✓ Top 3 critical issues only</li>
                <li>✗ Full analysis & charts (upgrade to Pro)</li>
                <li>✗ Auto-fix suggestions (upgrade to Advanced)</li>
                <li>✗ Competition benchmark (upgrade to Advanced)</li>
              </ul>
              <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-primary/20">
                Scans reset monthly. Upgrade anytime for more features.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  );
}
