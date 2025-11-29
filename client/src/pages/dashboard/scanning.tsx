import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Search, Zap, Layout, TrendingUp, Shield, Smartphone, CheckCircle, Clock } from "lucide-react";
import { mockStores } from "@/lib/data";

const scanSteps = [
  { name: "SEO Analysis", icon: Search, duration: 1500 },
  { name: "Speed Check", icon: Zap, duration: 1500 },
  { name: "UX Evaluation", icon: Layout, duration: 1500 },
  { name: "Conversion Rate", icon: TrendingUp, duration: 1500 },
  { name: "Security Scan", icon: Shield, duration: 1500 },
  { name: "Mobile Ready", icon: Smartphone, duration: 1500 },
];

export default function ScanningPage() {
  const [, navigate] = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [scanId, setScanId] = useState(0);

  const store = mockStores[0];
  const progress = ((currentStep + 1) / scanSteps.length) * 100;

  // Update elapsed time
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 100);
    return () => clearInterval(interval);
  }, [startTime]);

  // Main animation loop
  useEffect(() => {
    if (isComplete) return;
    
    let stepIndex = 0;
    let isMounted = true;

    const runAnimation = async () => {
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
  }, [scanId, isComplete]);

  const formatTime = (seconds: number) => {
    return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
  };

  const handleViewResults = () => {
    navigate("/dashboard/scan");
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
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Scanning Store</h1>
          <p className="text-muted-foreground flex items-center gap-2 mt-1">
            <Badge variant="outline">{store.name}</Badge>
            <span className="text-sm">{store.url}</span>
          </p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-bold tabular-nums" data-testid="text-scan-time">
            {formatTime(elapsedTime)}
          </div>
          <p className="text-sm text-muted-foreground">Elapsed time</p>
        </div>
      </div>

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
                <Button variant="outline" onClick={handleNewScan} data-testid="button-scan-again">
                  Scan Again
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

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
