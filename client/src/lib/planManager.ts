import { apiRequest } from "./queryClient";

const PLAN_STORAGE_KEY = "storedoctor_user_plan_v1";

export async function updateUserPlan(planId: string): Promise<boolean> {
  try {
    // Call backend to update plan
    await apiRequest("PATCH", "/api/users/demo-user/plan", { plan: planId });
    
    // Save to localStorage
    localStorage.setItem(PLAN_STORAGE_KEY, planId);
    
    return true;
  } catch (error) {
    console.error("Failed to update plan:", error);
    return false;
  }
}

export function getUserPlan(): string {
  return localStorage.getItem(PLAN_STORAGE_KEY) || "free";
}

export function setUserPlan(planId: string): void {
  localStorage.setItem(PLAN_STORAGE_KEY, planId);
}
