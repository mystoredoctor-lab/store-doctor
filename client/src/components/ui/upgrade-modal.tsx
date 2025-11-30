import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

interface UpgradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  autoRedirectDelay?: number;
}

export function UpgradeModal({
  open,
  onOpenChange,
  title = "Upgrade Your Plan",
  description = "This feature is only available on Pro and Advanced plans. Upgrade now to unlock more capabilities.",
  autoRedirectDelay = 3000,
}: UpgradeModalProps) {
  const [, navigate] = useLocation();
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [countdown, setCountdown] = useState(autoRedirectDelay / 1000);

  useEffect(() => {
    if (!open) {
      setCountdown(autoRedirectDelay / 1000);
      setShouldRedirect(false);
      return;
    }

    let timer: NodeJS.Timeout;
    if (shouldRedirect) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            navigate("/pricing");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [shouldRedirect, open, navigate, autoRedirectDelay]);

  const handleUpgradeClick = () => {
    setShouldRedirect(true);
  };

  const handleCancel = () => {
    onOpenChange(false);
    setShouldRedirect(false);
    setCountdown(autoRedirectDelay / 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center animate-in fade-in zoom-in duration-500">
              <Zap className="h-6 w-6 text-primary" />
            </div>
          </div>
          <DialogTitle className="text-center text-xl">{title}</DialogTitle>
          <DialogDescription className="text-center">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Benefits list */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">
              Unlock with upgrade:
            </p>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                <span>Up to 25 scans per month</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                <span>Multiple stores (Pro: 2, Advanced: 5)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                <span>Full analysis & detailed charts</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                <span>Auto-fix suggestions (Advanced only)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={shouldRedirect}
            className="flex-1"
            data-testid="button-upgrade-modal-cancel"
          >
            Not now
          </Button>
          <Button
            onClick={handleUpgradeClick}
            className="flex-1 gap-2"
            data-testid="button-upgrade-modal-confirm"
          >
            {shouldRedirect ? (
              <>
                <span className="animate-spin">
                  <Zap className="h-4 w-4" />
                </span>
                Redirecting in {countdown}s...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4" />
                Upgrade Plan
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
