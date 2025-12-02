import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Search, Zap, Layout, TrendingUp, Shield, Smartphone, CheckCircle, Clock } from "lucide-react";
import { mockStoresByPlan } from "@/lib/data";
import { getUserPlan } from "@/lib/planManager";
import { useToast } from "@/hooks/use-toast";

const scanSteps = [
  { name: "SEO Analysis", icon: Search, duration: 1500 },
  { name: "Speed Check", icon: Zap, duration: 1500 },
  { name: "UX Evaluation", icon: Layout, duration: 1500 },
  { name: "Conversion Rate", icon: TrendingUp, duration: 1500 },
  { name: "Security Scan", icon: Shield, duration: 1500 },
  { name: "Mobile Ready", icon: Smartphone, duration: 1500 },
];

export default function ScanningPage() {
  const [location, navigate] = useLocation();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [scanId, setScanId] = useState(0);
  const userPlan = getUserPlan();

  // Get storeId from URL params
  const params = new URLSearchParams(location.split("?")[1]);
  const storeId = params.get("storeId");
  
  // Get stores for current plan and find the requested store
  const planStores = mockStoresByPlan[userPlan as "free" | "pro" | "advanced"] || mockStoresByPlan.free;
  const store = storeId ? planStores.find((s) => s.id === storeId) : planStores[0];
  const progress = ((currentStep + 1) / scanSteps.length) * 100;

  // Update elapsed time
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 100);
    return () => clearInterval(interval);
  }, [startTime]);

  // Main animation loop - calls smart AI scan endpoint
  useEffect(() => {
    if (isComplete) return;
    
    let stepIndex = 0;
    let isMounted = true;

    const runAnimation = async () => {
      // Call smart AI scan endpoint during animation
      if (stepIndex === 0 && isMounted) {
        try {
          const apiUrl = import.meta.env.VITE_API_URL || "";
          const endpoint = `${apiUrl}/api/stores/${store?.id}/smart-scan`;
          await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ planType: userPlan }),
          });
        } catch (error) {
          console.error("Smart scan failed:", error);
          toast({
            title: "Scan Error",
            description: "Failed to perform smart scan. Using demo data.",
            variant: "destructive",
          });
        }
      }

      while (stepIndex < scanSteps.length && isMounted) {
        setCurrentStep(stepIndex);
        await new Promise((resolve) => setTimeout(resolve, scanSteps[stepIndex].duration));
        stepIndex += 1;
      }

      if (isMounted && stepIndex >= scanSteps.length) {
        setIsComplete(true);
      }
    };

    runAnimation();

    return () => {
      isMounted = false;
    };
  }, [scanId, isComplete, store?.id, userPlan, toast]);

  const formatTime = (seconds: number) => {
    return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
  };

  const handleViewResults = () => {
    navigate(`/dashboard/scan?storeId=${store?.id}`);
  };

  const handleNewScan = () => {
    setCurrentStep(0);
    setIsComplete(false);
    setStartTime(Date.now());
    setElapsedTime(0);
    setScanId((prev) => prev + 1);
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  return (
    <div className="space-y-8" data-testid="page-scanning">
      <div>
        <h1 className="text-3xl font-bold">Scanning Store</h1>
        {store && (
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline">{store.name}</Badge>
            <span className="text-sm text-muted-foreground">{store.url}</span>
          </div>
        )}
      </div>

      {isComplete && (
        <Card className="border-green-500/50 bg-green-500/5" data-testid="card-scan-complete">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold">Scan Complete!</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Your store has been fully analyzed. We found actionable insights to help improve your store's health
                and increase conversions.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                <Button onClick={handleViewResults} data-testid="button-view-results">
                  View Results
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card data-testid="card-scan-progress">
        <CardHeader>
          <CardTitle>Scan Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Overall Progress</span>
              <span className="font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" data-testid="progress-overall" />
          </div>

          <div className="space-y-3">
            {scanSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === index;
              const isStepComplete = index < currentStep;
              const isPending = index > currentStep;

              return (
                <div
                  key={step.name}
                  className="flex items-center gap-4 p-4 rounded-lg border transition-all"
                  data-testid={`scan-step-${step.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div
                    className={`p-2 rounded-lg shrink-0 transition-all ${
                      isActive
                        ? "bg-primary/20 text-primary animate-pulse"
                        : isStepComplete
                        ? "bg-green-500/10 text-green-500"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{step.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {isActive && "In progress..."}
                      {isStepComplete && !isActive && "Complete"}
                      {isPending && "Waiting..."}
                    </p>
                  </div>
                  {isStepComplete && !isActive && (
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0" data-testid={`check-${step.name.toLowerCase().replace(/\s+/g, '-')}`} />
                  )}
                  {isActive && (
                    <div className="animate-spin">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {!isComplete && (
        <Card className="bg-muted/30 border-dashed">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground text-center">
              ⏱️ Scanning typically takes 10-15 seconds. Please don't close this page or disconnect.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
