"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StoreCard } from "@/components/ui/store-card"
import { AlertBanner } from "@/components/ui/alert-banner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { mockStores, mockUser } from "@/lib/mock-data"
import { Plus, Search, Store } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function StoresPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [isConnectDialogOpen, setIsConnectDialogOpen] = React.useState(false)
  const [storeUrl, setStoreUrl] = React.useState("")
  const { toast } = useToast()

  const filteredStores = mockStores.filter(
    (store) =>
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.url.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const maxStores = mockUser.plan === "free" ? 1 : mockUser.plan === "pro" ? 2 : 5
  const canAddMore = mockStores.length < maxStores

  const handleConnectStore = () => {
    // TODO: Connect to actual Shopify OAuth flow
    toast({
      title: "Store connection initiated",
      description: "Redirecting to Shopify for authorization...",
    })
    setIsConnectDialogOpen(false)
    setStoreUrl("")
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Your Stores</h1>
          <p className="text-muted-foreground">Manage and monitor your connected Shopify stores.</p>
        </div>
        <Dialog open={isConnectDialogOpen} onOpenChange={setIsConnectDialogOpen}>
          <DialogTrigger asChild>
            <Button disabled={!canAddMore}>
              <Plus className="mr-2 h-4 w-4" />
              Connect Store
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Connect a Shopify Store</DialogTitle>
              <DialogDescription>Enter your Shopify store URL to connect it to Store Doctor.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="store-url">Store URL</Label>
                <Input
                  id="store-url"
                  placeholder="yourstore.myshopify.com"
                  value={storeUrl}
                  onChange={(e) => setStoreUrl(e.target.value)}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                You&apos;ll be redirected to Shopify to authorize the connection.
              </p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsConnectDialogOpen(false)}>
                Cancel
              </Button>
              {/* TODO: Connect to actual Shopify OAuth */}
              <Button onClick={handleConnectStore} disabled={!storeUrl}>
                Connect Store
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Store limit warning */}
      {!canAddMore && (
        <AlertBanner
          type="info"
          title={`You've reached your store limit (${maxStores} stores)`}
          message="Upgrade your plan to connect more stores."
        />
      )}

      {/* Search and filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Connected Stores</CardTitle>
              <CardDescription>
                {mockStores.length} of {maxStores} stores connected
              </CardDescription>
            </div>
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search stores..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredStores.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredStores.map((store) => (
                <StoreCard key={store.id} store={store} />
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
                <Button onClick={() => setIsConnectDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Connect Your First Store
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Store management tips */}
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
  )
}
