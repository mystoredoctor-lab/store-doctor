import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Bell, Settings, User, LogOut, Check } from "lucide-react";
import { mockUser } from "@/lib/data";
import { Link, useLocation } from "wouter";
import { clearUserContext } from "@/lib/planManager";

const handleLogout = async () => {
  // Try to call backend logout endpoint (non-blocking)
  try {
    await fetch("/api/auth/logout", { 
      method: "POST",
      credentials: "include",
    }).catch(() => {
      // Silently fail if backend logout doesn't work
    });
  } catch (error) {
    // Silently fail
  }
  
  // Clear user context and all localStorage keys
  clearUserContext();
  localStorage.clear();
  
  // Force redirect to sign-in page (not home)
  window.location.href = "/auth/sign-in";
};

const notifications = [
  { id: 1, message: "Your store scan completed successfully", time: "5 min ago" },
  { id: 2, message: "New critical issue found in your store", time: "1 hour ago" },
  { id: 3, message: "Plan upgrade available - get more scans", time: "2 hours ago" },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const handleScrollToTop = () => {
  window.scrollTo(0, 0);
};

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [location] = useLocation();

  const getBreadcrumb = () => {
    switch (location) {
      case "/dashboard":
        return "Overview";
      case "/dashboard/stores":
        return "Stores";
      case "/dashboard/scan":
        return "Scan Results";
      case "/dashboard/settings":
        return "Settings";
      default:
        return "Dashboard";
    }
  };

  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b bg-background/95 backdrop-blur px-4 gap-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger data-testid="button-sidebar-toggle" />
              <Separator orientation="vertical" className="h-6" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="/dashboard" data-testid="link-breadcrumb-dashboard">Dashboard</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {location !== "/dashboard" && (
                    <>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage data-testid="text-breadcrumb-current">{getBreadcrumb()}</BreadcrumbPage>
                      </BreadcrumbItem>
                    </>
                  )}
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            <div className="flex items-center gap-2">
              <ThemeToggle />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative" data-testid="button-notifications">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                      {notifications.length}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <p className="text-sm font-medium">Notifications</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {notifications.map((notif) => (
                    <DropdownMenuItem key={notif.id} className="flex flex-col items-start py-3 px-3 cursor-default hover:bg-muted" data-testid={`notification-${notif.id}`}>
                      <p className="text-sm font-medium leading-tight">{notif.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-center justify-center py-2 cursor-pointer text-sm hover:bg-muted" data-testid="link-view-all-notifications">
                    View all notifications
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full" data-testid="button-header-user-menu">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={mockUser.avatar || undefined} alt={mockUser.name} />
                      <AvatarFallback>{mockUser.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium" data-testid="text-user-name">{mockUser.name}</p>
                      <p className="text-xs text-muted-foreground" data-testid="text-user-email">{mockUser.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings" className="cursor-pointer w-full" onClick={handleScrollToTop} data-testid="link-header-profile">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings" className="cursor-pointer w-full" onClick={handleScrollToTop} data-testid="link-header-settings">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="text-destructive cursor-pointer"
                    onClick={handleLogout}
                    data-testid="button-header-logout"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
