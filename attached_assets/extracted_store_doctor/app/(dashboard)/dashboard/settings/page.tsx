"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
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
import { mockUser, pricingPlans } from "@/lib/mock-data"
import { User, CreditCard, Mail, Key, AlertTriangle, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false)
  const { toast } = useToast()
  const currentPlan = pricingPlans.find((p) => p.id === mockUser.plan)

  const handleSaveProfile = () => {
    // TODO: Connect to actual profile update API
    toast({
      title: "Profile updated",
      description: "Your profile has been saved successfully.",
    })
  }

  const handleConnectGmail = () => {
    // TODO: Connect to Gmail OAuth
    toast({
      title: "Gmail connection initiated",
      description: "Redirecting to Google for authorization...",
    })
  }

  const handleDeleteAccount = () => {
    // TODO: Connect to actual account deletion
    toast({
      title: "Account deletion requested",
      description: "We've sent a confirmation email.",
      variant: "destructive",
    })
    setIsDeleteDialogOpen(false)
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      {/* Profile Section */}
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
              <AvatarImage src={mockUser.avatar || "/placeholder.svg"} alt={mockUser.name} />
              <AvatarFallback>{mockUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            {/* TODO: Connect to avatar upload */}
            <Button variant="outline">Change Avatar</Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue={mockUser.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={mockUser.email} />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          {/* TODO: Connect to profile update API */}
          <Button onClick={handleSaveProfile}>Save Changes</Button>
        </CardFooter>
      </Card>

      {/* Billing Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            <CardTitle>Billing & Subscription</CardTitle>
          </div>
          <CardDescription>Manage your subscription plan and billing.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
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
              {/* TODO: Connect to payment/upgrade system */}
              {mockUser.plan !== "advanced" && <Button>Upgrade Plan</Button>}
              {mockUser.plan !== "free" && <Button variant="outline">Downgrade</Button>}
            </div>
          </div>
          {mockUser.plan !== "free" && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Payment Method</p>
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-12 rounded bg-muted flex items-center justify-center text-xs">VISA</div>
                  <span className="text-sm">•••• •••• •••• 4242</span>
                </div>
                {/* TODO: Connect to payment method update */}
                <Button variant="ghost" size="sm">
                  Update
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Gmail Integration */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            <CardTitle>Email Integration</CardTitle>
          </div>
          <CardDescription>Connect your Gmail for scan reports and notifications.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Gmail Account</p>
              <p className="text-sm text-muted-foreground">Not connected</p>
            </div>
            {/* TODO: Connect to Gmail OAuth */}
            <Button variant="outline" onClick={handleConnectGmail}>
              Connect Gmail
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* API Keys Section */}
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
                  <p className="text-xs text-muted-foreground font-mono">sk_live_••••••••••••••••</p>
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

      {/* Notification Preferences */}
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
            <div key={item.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              {/* TODO: Connect to actual notification preferences */}
              <Switch defaultChecked={item.id !== "marketing"} />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/50">
        <CardHeader>
          <div className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            <CardTitle>Danger Zone</CardTitle>
          </div>
          <CardDescription>Irreversible and destructive actions.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Delete Account</p>
              <p className="text-sm text-muted-foreground">Permanently delete your account and all associated data.</p>
            </div>
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive">
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
                  {/* TODO: Connect to actual account deletion */}
                  <Button variant="destructive" onClick={handleDeleteAccount}>
                    Delete Account
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
