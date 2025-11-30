import { createContext, useContext, useState, useEffect, ReactNode } from "react";

const ADMIN_AUTH_KEY = "storedoctor_admin_auth_v1";
const DEFAULT_ADMIN_EMAIL = "admin@storedoctor.com";
const DEFAULT_ADMIN_PASSWORD = "admin123";

interface AdminAuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
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

  return (
    <AdminAuthContext.Provider value={{ isLoggedIn, isLoading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return context;
}
