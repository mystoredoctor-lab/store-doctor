import { useState, useEffect, useCallback } from "react";

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const userAuth = localStorage.getItem("storedoctor_user_auth_v1");
    setIsLoggedIn(!!userAuth);
    setIsLoading(false);
  }, []);

  const logout = useCallback(() => {
    // Clear all auth data
    localStorage.removeItem("storedoctor_user_auth_v1");
    localStorage.removeItem("storedoctor_connected_stores_v1");
    localStorage.removeItem("storedoctor_plan_v1");
    localStorage.removeItem("storedoctor_admin_auth_v1");
    
    // Update state immediately
    setIsLoggedIn(false);
    
    // Redirect after state update
    setTimeout(() => {
      window.location.href = "/";
    }, 50);
  }, []);

  return { isLoggedIn, isLoading, logout, setIsLoggedIn };
}
