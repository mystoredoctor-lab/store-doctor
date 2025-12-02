import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Activity, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const navItems = [
  { name: "Features", href: "/#features" },
  { name: "Pricing", href: "/pricing" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const handleNavClick = (href: string) => {
  if (href.includes("#")) {
    setTimeout(() => {
      const id = href.split("#")[1];
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  } else {
    // Scroll to top for regular page links
    window.scrollTo(0, 0);
  }
};

export function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in by checking for user authentication
    const userAuth = localStorage.getItem("storedoctor_user_auth_v1");
    setIsLoggedIn(!!userAuth);

    // Listen for logout events from other parts of the app
    const handleLogout = () => {
      setIsLoggedIn(false);
    };

    // Listen for storage changes (when localStorage is cleared)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "storedoctor_user_auth_v1" && !e.newValue) {
        setIsLoggedIn(false);
      }
    };

    window.addEventListener("logout", handleLogout);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("logout", handleLogout);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" data-testid="link-logo">
          <img 
            src="/logo.jpg" 
            alt="Store Doctor Logo" 
            className="h-8 w-8 rounded-lg object-cover"
          />
          <span className="text-xl font-bold">Store Doctor</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => handleNavClick(item.href)}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location === item.href ? "text-primary" : "text-muted-foreground"
              )}
              data-testid={`link-nav-${item.name.toLowerCase()}`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden md:flex items-center gap-2">
            {isLoggedIn ? (
              <Button asChild>
                <Link href="/dashboard" data-testid="button-dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/auth/sign-in" data-testid="button-login">Log In</Link>
                </Button>
                <Button asChild>
                  <Link href="/auth/sign-up" data-testid="button-install">Get Started</Link>
                </Button>
              </>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background p-4 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block text-sm font-medium text-muted-foreground hover:text-primary"
              onClick={() => {
                setMobileMenuOpen(false);
                handleNavClick(item.href);
              }}
            >
              {item.name}
            </Link>
          ))}
          <div className="flex flex-col gap-2 pt-4 border-t">
            {isLoggedIn ? (
              <Button asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link href="/auth/sign-in">Log In</Link>
                </Button>
                <Button asChild>
                  <Link href="/auth/sign-up">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
