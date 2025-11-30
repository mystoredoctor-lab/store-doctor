import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Users, BarChart2, Settings, ArrowLeft, FileText, DollarSign, Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import { useAdminAuth } from "@/hooks/AdminAuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const adminMenuItems = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Blog", href: "/admin/blog", icon: FileText },
  { name: "Pricing", href: "/admin/pricing", icon: DollarSign },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart2 },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminNavbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logout } = useAdminAuth();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-card">
      <div className="flex h-16 items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link href="/admin" className="flex items-center gap-2 shrink-0">
          <img 
            src="/logo.jpg" 
            alt="Store Doctor Logo" 
            className="h-8 w-8 rounded-lg object-cover"
          />
          <div className="hidden sm:block">
            <span className="text-lg font-bold">Store Doctor</span>
            <span className="text-xs text-muted-foreground block">Admin</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1">
          {adminMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
                data-testid={`admin-nav-${item.name.toLowerCase()}`}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-2">
          <DropdownMenu open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost" data-testid="button-admin-mobile-menu">
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {adminMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location === item.href;
                return (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2 cursor-pointer",
                        isActive && "bg-primary text-primary-foreground"
                      )}
                      data-testid={`admin-mobile-nav-${item.name.toLowerCase()}`}
                    >
                      <Icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                );
              })}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer" data-testid="admin-back-to-dashboard">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} data-testid="button-mobile-admin-logout">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" size="sm" className="gap-2" asChild>
            <Link href="/dashboard" data-testid="admin-back-button">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          </Button>
          <Button variant="ghost" size="sm" className="gap-2" onClick={logout} data-testid="button-admin-logout">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}
