import { apiRequest } from "./queryClient";

const PLAN_STORAGE_KEY = "storedoctor_user_plan_v1";

export async function updateUserPlan(planId: string): Promise<boolean> {
  try {
    // Get user email from localStorage (set during login)
    const userAuthStr = localStorage.getItem("storedoctor_user_auth_v1");
    if (!userAuthStr) {
      throw new Error("User not authenticated");
    }
    
    const userAuth = JSON.parse(userAuthStr);
    const userId = userAuth.email || "demo-user";
    
    // Call backend to update plan
    const response = await apiRequest("PATCH", `/api/users/${userId}/plan`, { plan: planId });
    
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
