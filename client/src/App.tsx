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
import AdminLoginPage from "@/pages/admin/login";
import AdminDashboard from "@/pages/admin/index";
import AdminUsers from "@/pages/admin/users";
import AdminBlog from "@/pages/admin/blog";
import AdminPricing from "@/pages/admin/pricing";
import AdminAnalytics from "@/pages/admin/analytics";
import AdminSettings from "@/pages/admin/settings";
import AdminLayout from "@/pages/admin/layout";
import { useAdminAuth, AdminAuthProvider } from "@/hooks/AdminAuthContext";

function ProtectedAdminRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, isLoading } = useAdminAuth();
  if (isLoading) return <div>Loading...</div>;
  if (!isLoggedIn) return <AdminLoginPage />;
  return <>{children}</>;
}

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
      <Route path="/admin/login" component={AdminLoginPage} />
      <Route path="/admin">
        {() => (
          <ProtectedAdminRoute>
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </ProtectedAdminRoute>
        )}
      </Route>
      <Route path="/admin/users">
        {() => (
          <ProtectedAdminRoute>
            <AdminLayout>
              <AdminUsers />
            </AdminLayout>
          </ProtectedAdminRoute>
        )}
      </Route>
      <Route path="/admin/blog">
        {() => (
          <ProtectedAdminRoute>
            <AdminLayout>
              <AdminBlog />
            </AdminLayout>
          </ProtectedAdminRoute>
        )}
      </Route>
      <Route path="/admin/pricing">
        {() => (
          <ProtectedAdminRoute>
            <AdminLayout>
              <AdminPricing />
            </AdminLayout>
          </ProtectedAdminRoute>
        )}
      </Route>
      <Route path="/admin/analytics">
        {() => (
          <ProtectedAdminRoute>
            <AdminLayout>
              <AdminAnalytics />
            </AdminLayout>
          </ProtectedAdminRoute>
        )}
      </Route>
      <Route path="/admin/settings">
        {() => (
          <ProtectedAdminRoute>
            <AdminLayout>
              <AdminSettings />
            </AdminLayout>
          </ProtectedAdminRoute>
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
        <AdminAuthProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </AdminAuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
