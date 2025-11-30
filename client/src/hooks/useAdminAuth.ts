import { useState, useEffect } from "react";

const ADMIN_AUTH_KEY = "storedoctor_admin_auth_v1";
const DEFAULT_ADMIN_EMAIL = "admin@storedoctor.com";
const DEFAULT_ADMIN_PASSWORD = "admin123";

export function useAdminAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(ADMIN_AUTH_KEY);
    if (stored === "true") {
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, password: string): boolean => {
    if (email === DEFAULT_ADMIN_EMAIL && password === DEFAULT_ADMIN_PASSWORD) {
      localStorage.setItem(ADMIN_AUTH_KEY, "true");
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(ADMIN_AUTH_KEY);
    setIsLoggedIn(false);
  };

  return { isLoggedIn, isLoading, login, logout };
}
