import { Footer } from "@/components/layout/footer";
import { AlertCircle, ArrowLeft, Home, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-b from-background via-background to-muted/20">
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-2xl text-center space-y-8">
          {/* Error Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-destructive/20 rounded-full blur-3xl" />
              <div className="relative bg-destructive/10 p-6 rounded-full">
                <AlertCircle className="h-16 w-16 text-destructive" />
              </div>
            </div>
          </div>

          {/* Error Code */}
          <div>
            <div className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-destructive to-destructive/60 mb-2">
              404
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Page Not Found</h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              The page you're looking for has wandered off. Let's get you back on track.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Button size="lg" asChild data-testid="button-home">
              <Link href="/">
                <Home className="mr-2 h-5 w-5" />
                Back to Home
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild data-testid="button-dashboard">
              <Link href="/dashboard">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Go to Dashboard
              </Link>
            </Button>
            <Button size="lg" variant="ghost" asChild data-testid="button-help">
              <a href="mailto:support@storedoctor.com">
                <HelpCircle className="mr-2 h-5 w-5" />
                Get Help
              </a>
            </Button>
          </div>

          {/* Helpful Text */}
          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              If you think this is a mistake, please{" "}
              <a 
                href="mailto:support@storedoctor.com"
                className="text-primary hover:underline font-medium"
              >
                contact our support team
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
