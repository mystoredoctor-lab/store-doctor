import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const [, navigate] = useLocation();
  const { login } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email || !password) {
      setError("Please enter both email and password");
      setIsLoading(false);
      return;
    }

    if (login(email, password)) {
      navigate("/admin");
    } else {
      setError("Invalid email or password");
      setPassword("");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/50 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="/logo.jpg" 
              alt="Store Doctor Logo" 
              className="h-12 w-12 rounded-lg object-cover"
            />
          </div>
          <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
          <CardDescription className="text-center">
            Store Doctor Administration Panel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@storedoctor.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-testid="input-admin-email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSubmit(e as any)}
                data-testid="input-admin-password"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
              data-testid="button-admin-login"
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>

            <div className="pt-4 border-t">
              <p className="text-xs text-muted-foreground text-center mb-2">Demo credentials:</p>
              <p className="text-xs text-center font-mono text-muted-foreground">
                admin@storedoctor.com
              </p>
              <p className="text-xs text-center font-mono text-muted-foreground">
                admin123
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
