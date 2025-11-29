import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Activity, LayoutDashboard, Store, Settings, HelpCircle, CreditCard, LogOut } from "lucide-react";

const sidebarItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Stores", href: "/dashboard/stores", icon: Store },
  { name: "Scan Results", href: "/dashboard/scan", icon: Activity },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

const bottomItems = [
  { name: "Pricing", href: "/pricing", icon: CreditCard },
  { name: "Help & Support", href: "/contact", icon: HelpCircle },
];

export function DashboardSidebar() {
  const [location] = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-sidebar">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/dashboard" className="flex items-center gap-2" data-testid="link-dashboard-logo">
            <img 
              src="/logo.jpg" 
              alt="Store Doctor Logo" 
              className="h-8 w-8 rounded-lg object-cover"
            />
            <span className="text-xl font-bold">Store Doctor</span>
          </Link>
        </div>

        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.href || (item.href !== "/dashboard" && location.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                  data-testid={`link-sidebar-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </ScrollArea>

        <div className="border-t p-3">
          <nav className="space-y-1">
            {bottomItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                  data-testid={`link-sidebar-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 px-3 text-muted-foreground hover:text-accent-foreground"
              onClick={() => {
                window.location.href = "/";
              }}
              data-testid="button-logout"
            >
              <LogOut className="h-4 w-4" />
              Log Out
            </Button>
          </nav>
        </div>
      </div>
    </aside>
  );
}
