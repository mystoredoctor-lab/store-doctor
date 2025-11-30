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
import AboutPage from "@/pages/about";
import TermsPage from "@/pages/terms";
import PrivacyPage from "@/pages/privacy";
import BlogPage from "@/pages/blog";
import BlogPostPage from "@/pages/blog-post";
import DashboardPage from "@/pages/dashboard/index";
import StoresPage from "@/pages/dashboard/stores";
import ScanPage from "@/pages/dashboard/scan";
import ScanningPage from "@/pages/dashboard/scanning";
import SettingsPage from "@/pages/dashboard/settings";
import { DashboardLayout } from "@/pages/dashboard/layout";
import AdminDashboard from "@/pages/admin/index";
import AdminUsers from "@/pages/admin/users";
import AdminAnalytics from "@/pages/admin/analytics";
import AdminSettings from "@/pages/admin/settings";
import AdminLayout from "@/pages/admin/layout";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/pricing" component={PricingPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/terms" component={TermsPage} />
      <Route path="/privacy" component={PrivacyPage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/blog/:slug" component={BlogPostPage} />
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
      <Route path="/admin">
        {() => (
          <AdminLayout>
            <AdminDashboard />
          </AdminLayout>
        )}
      </Route>
      <Route path="/admin/users">
        {() => (
          <AdminLayout>
            <AdminUsers />
          </AdminLayout>
        )}
      </Route>
      <Route path="/admin/analytics">
        {() => (
          <AdminLayout>
            <AdminAnalytics />
          </AdminLayout>
        )}
      </Route>
      <Route path="/admin/settings">
        {() => (
          <AdminLayout>
            <AdminSettings />
          </AdminLayout>
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
