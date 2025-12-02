import { apiRequest } from "./queryClient";

const PLAN_STORAGE_KEY = "storedoctor_user_plan_v1";
const USER_CONTEXT_KEY = "storedoctor_user_context_v1";

export interface UserContext {
  id: string;
  email: string;
  name?: string;
  plan: string;
}

export async function updateUserPlan(planId: string): Promise<boolean> {
  try {
    const userContext = getUserContext();
    if (!userContext?.id) {
      throw new Error("User not authenticated");
    }
    
    // Call backend to update plan
    const response = await apiRequest("PATCH", `/api/users/${userContext.id}/plan`, { plan: planId });
    
    // Update cached plan
    setUserPlan(planId);
    
    return true;
  } catch (error) {
    console.error("Failed to update plan:", error);
    return false;
  }
}

export function getUserPlan(): string {
  // First check user context (set after backend auth)
  const userContext = getUserContext();
  if (userContext?.plan) {
    return userContext.plan;
  }
  
  // Fallback to localStorage
  return localStorage.getItem(PLAN_STORAGE_KEY) || "free";
}

export function setUserPlan(planId: string): void {
  localStorage.setItem(PLAN_STORAGE_KEY, planId);
  // Also update user context if it exists
  const userContext = getUserContext();
  if (userContext) {
    setUserContext({ ...userContext, plan: planId });
  }
}

export function getUserContext(): UserContext | null {
  try {
    const stored = localStorage.getItem(USER_CONTEXT_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function setUserContext(context: UserContext): void {
  localStorage.setItem(USER_CONTEXT_KEY, JSON.stringify(context));
  // Also set plan for backward compatibility
  localStorage.setItem(PLAN_STORAGE_KEY, context.plan);
}

export function clearUserContext(): void {
  localStorage.removeItem(USER_CONTEXT_KEY);
  localStorage.removeItem(PLAN_STORAGE_KEY);
}

export async function handleLogout(): Promise<void> {
  try {
    await fetch("/api/auth/logout", { 
      method: "POST", 
      credentials: "include",
      headers: { "Content-Type": "application/json" }
    }).catch(() => {});
  } catch (error) {
    console.error("Logout failed:", error);
  }
  clearUserContext();
  localStorage.clear();
  window.location.href = "/auth/sign-in";
}
