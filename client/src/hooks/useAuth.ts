import { useState, useEffect, useCallback } from "react";
import { getUserContext, clearUserContext } from "@/lib/planManager";

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in using new user context
    const userContext = getUserContext();
    setIsLoggedIn(!!userContext);
    setIsLoading(false);
  }, []);

  const logout = useCallback(() => {
    // Clear all auth data from localStorage
    clearUserContext();
    localStorage.clear();
    
    // Redirect to sign-in
    window.location.href = "/auth/sign-in";
  }, []);

  return { isLoggedIn, isLoading, logout, setIsLoggedIn };
}
