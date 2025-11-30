import { Card, CardContent } from "@/components/ui/card";
import { Footer } from "@/components/layout/footer";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6 space-y-4">
            <div className="flex gap-2">
              <AlertCircle className="h-8 w-8 text-destructive shrink-0" />
              <h1 className="text-2xl font-bold">404 Page Not Found</h1>
            </div>
            <p className="text-sm text-muted-foreground">
              The page you're looking for doesn't exist.
            </p>
            <Button asChild className="w-full" data-testid="button-home">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
