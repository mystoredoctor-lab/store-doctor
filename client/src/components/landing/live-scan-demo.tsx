import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { HealthScoreGauge } from "@/components/ui/health-score-gauge";
import { Search, Zap, Layout, TrendingUp, Shield, Smartphone, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const scanSteps = [
  { name: "SEO Analysis", icon: Search, score: 78 },
  { name: "Speed Check", icon: Zap, score: 65 },
  { name: "UX Evaluation", icon: Layout, score: 82 },
  { name: "Conversion Rate", icon: TrendingUp, score: 71 },
  { name: "Security Scan", icon: Shield, score: 95 },
  { name: "Mobile Ready", icon: Smartphone, score: 74 },
];

export function LiveScanDemo() {
  const [isScanning, setIsScanning] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [showResults, setShowResults] = useState(false);
  const [progress, setProgress] = useState(0);

  const startDemo = () => {
    setIsScanning(true);
    setCurrentStep(0);
    setShowResults(false);
    setProgress(0);
  };

  useEffect(() => {
    if (!isScanning || currentStep < 0) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const target = ((currentStep + 1) / scanSteps.length) * 100;
        const newProgress = prev + (target - prev) * 0.1;
        return newProgress;
      });
    }, 50);

    const timer = setTimeout(() => {
      if (currentStep < scanSteps.length - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        setIsScanning(false);
        setShowResults(true);
        setProgress(100);
      }
    }, 1200);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [currentStep, isScanning]);

  const averageScore = Math.round(scanSteps.reduce((acc, step) => acc + step.score, 0) / scanSteps.length);

  return (
    <section className="py-20 bg-muted/30" data-testid="section-live-scan-demo">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            See Store Doctor in Action
          </h2>
          <p className="text-lg text-muted-foreground">
            Watch how our AI analyzes a store across 6 critical categories in seconds.
          </p>
        </div>

        <Card className="max-w-4xl mx-auto" data-testid="card-scan-demo">
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <CardTitle>Store Health Scan Demo</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">demo-store.myshopify.com</p>
              </div>
              <Button 
                onClick={startDemo} 
                disabled={isScanning}
                data-testid="button-start-demo-scan"
              >
                {isScanning ? "Scanning..." : showResults ? "Scan Again" : "Start Demo Scan"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isScanning && (
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>Analyzing store...</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {scanSteps.map((step, index) => {
                const Icon = step.icon;
                const isActive = isScanning && currentStep === index;
                const isComplete = showResults || (isScanning && currentStep > index);
                const isPending = !isScanning && !showResults;

                return (
                  <div
                    key={step.name}
                    className={cn(
                      "flex items-center gap-3 p-4 rounded-lg border transition-all",
                      isActive && "border-primary bg-primary/5 animate-pulse",
                      isComplete && "border-green-500/50 bg-green-500/5",
                      isPending && "border-muted bg-muted/50"
                    )}
                    data-testid={`scan-step-${step.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <div className={cn(
                      "p-2 rounded-lg",
                      isComplete ? "bg-green-500/10 text-green-500" : "bg-muted text-muted-foreground"
                    )}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{step.name}</p>
                      {isComplete && (
                        <div className="flex items-center gap-2 mt-1">
                          <span className={cn(
                            "text-sm font-semibold",
                            step.score >= 80 ? "text-green-500" : step.score >= 60 ? "text-yellow-500" : "text-red-500"
                          )}>
                            {step.score}/100
                          </span>
                          {step.score >= 80 ? (
                            <CheckCircle className="h-3 w-3 text-green-500" />
                          ) : (
                            <AlertCircle className="h-3 w-3 text-yellow-500" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {showResults && (
              <div className="mt-8 pt-8 border-t">
                <div className="grid gap-8 md:grid-cols-2 items-center">
                  <div className="flex justify-center">
                    <HealthScoreGauge score={averageScore} size="lg" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4" data-testid="text-demo-results-title">Scan Complete!</h3>
                    <p className="text-muted-foreground mb-4">
                      This demo store has an overall health score of {averageScore}/100. 
                      {averageScore >= 80 
                        ? " Great job! The store is in good shape."
                        : averageScore >= 60
                        ? " There's room for improvement in some areas."
                        : " Several critical issues need attention."}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {scanSteps.map((step) => (
                        <Badge 
                          key={step.name}
                          variant={step.score >= 80 ? "default" : "secondary"}
                          className={step.score >= 80 ? "bg-green-500/10 text-green-500 border-green-500/20" : ""}
                          data-testid={`badge-result-${step.name.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          {step.name}: {step.score}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
