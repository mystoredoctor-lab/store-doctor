import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import NotFound from "@/pages/not-found";
import LandingPage from "@/pages/landing";
import PricingPage from "@/pages/pricing";
import ContactPage from "@/pages/contact";
import BlogPage from "@/pages/blog";
import DashboardPage from "@/pages/dashboard/index";
import StoresPage from "@/pages/dashboard/stores";
import ScanPage from "@/pages/dashboard/scan";
import ScanningPage from "@/pages/dashboard/scanning";
import SettingsPage from "@/pages/dashboard/settings";
import { DashboardLayout } from "@/pages/dashboard/layout";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/pricing" component={PricingPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/dashboard">
        {() => (
          <DashboardLayout>
            <DashboardPage />
          </DashboardLayout>
        )}
      </Route>
      <Route path="/dashboard/stores">
        {() => (
          <DashboardLayout>
            <StoresPage />
          </DashboardLayout>
        )}
      </Route>
      <Route path="/dashboard/scan">
        {() => (
          <DashboardLayout>
            <ScanPage />
          </DashboardLayout>
        )}
      </Route>
      <Route path="/dashboard/scanning">
        {() => (
          <DashboardLayout>
            <ScanningPage />
          </DashboardLayout>
        )}
      </Route>
      <Route path="/dashboard/settings">
        {() => (
          <DashboardLayout>
            <SettingsPage />
          </DashboardLayout>
        )}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="storedoctor-theme">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
