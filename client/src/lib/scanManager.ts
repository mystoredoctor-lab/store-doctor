// Scan usage tracking
const SCAN_USAGE_KEY = "storedoctor_scan_usage_v1";
const SCAN_LIMITS_KEY = "storedoctor_scan_limits_v1";

export interface ScanUsage {
  month: string; // YYYY-MM format
  count: number;
}

export interface ScanLimits {
  free: number;
  pro: number;
  advanced: number;
}

export const DEFAULT_LIMITS: ScanLimits = {
  free: 1,
  pro: 10,
  advanced: 15,
};

export function getScanLimits(): ScanLimits {
  try {
    const stored = localStorage.getItem(SCAN_LIMITS_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_LIMITS;
  } catch {
    return DEFAULT_LIMITS;
  }
}

export function setScanLimits(limits: ScanLimits): void {
  localStorage.setItem(SCAN_LIMITS_KEY, JSON.stringify(limits));
}

export function getCurrentMonth(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

export function getScanUsage(): ScanUsage {
  try {
    const stored = localStorage.getItem(SCAN_USAGE_KEY);
    if (!stored) {
      return { month: getCurrentMonth(), count: 0 };
    }
    const usage = JSON.parse(stored);
    const currentMonth = getCurrentMonth();
    
    // Reset count if we're in a new month
    if (usage.month !== currentMonth) {
      return { month: currentMonth, count: 0 };
    }
    return usage;
  } catch {
    return { month: getCurrentMonth(), count: 0 };
  }
}

export function incrementScanCount(): void {
  const usage = getScanUsage();
  usage.count += 1;
  localStorage.setItem(SCAN_USAGE_KEY, JSON.stringify(usage));
}

export function resetScanCount(): void {
  localStorage.setItem(SCAN_USAGE_KEY, JSON.stringify({
    month: getCurrentMonth(),
    count: 0,
  }));
}

export function getScansRemaining(plan: "free" | "pro" | "advanced"): number {
  const limits = getScanLimits();
  const usage = getScanUsage();
  const limit = limits[plan];
  return Math.max(0, limit - usage.count);
}

export function canRunScan(plan: "free" | "pro" | "advanced"): boolean {
  return getScansRemaining(plan) > 0;
}
