import { useLocalStorage } from './useLocalStorage';

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  scans: number;
  stores: number;
  features: string[];
}

const defaultPlans: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    scans: 1,
    stores: 1,
    features: ["1 scan per month", "Basic overview", "Top 3 issues"],
  },
  {
    id: "pro",
    name: "Pro",
    price: 12,
    scans: 10,
    stores: 2,
    features: ["10 scans per month", "Full analysis", "All issues", "Priority support"],
  },
  {
    id: "advanced",
    name: "Advanced",
    price: 25,
    scans: 30,
    stores: 5,
    features: ["30 scans per month", "Full analysis", "All issues", "Priority support", "Autofix", "Benchmarking"],
  },
];

export function usePricingPlans() {
  const [plans] = useLocalStorage<PricingPlan[]>("storedoctor_pricing_plans", defaultPlans);
  return plans;
}
