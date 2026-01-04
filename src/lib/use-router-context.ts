import { useEffect, useState } from "react";

export type UserRole = "admin" | "client" | null;
export type RouterContext = {
  role: UserRole;
  login: (role: "admin" | "client") => void;
  logout: () => void;
  isAdmin: boolean;
  isClient: boolean;
  isAuthenticated: boolean;
};

export function useRouterContext(): RouterContext {
  const [role, setRole] = useState<UserRole>(() => {
    const savedRole = localStorage.getItem("userRole") as UserRole | null;
    return savedRole ?? null;
  });

useEffect(() => {
    if (role !== null) {
      localStorage.setItem("userRole", role);
    } else {
      localStorage.removeItem("userRole");
    }
  }, [role]);

  const login = (newRole: "admin" | "client") => {
      setRole(newRole);
  };

  const logout = () => {
      setRole(null);
  };

  const isAdmin = role === "admin";
  const isClient = role === "client";
  const isAuthenticated = !!role;

  return {
    role,
    login,
    logout,
    isAdmin,
    isClient,
    isAuthenticated,
  };
}