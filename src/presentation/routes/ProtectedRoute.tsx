import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../state/auth";
import type { JSX } from "react";

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? children : <Navigate to="/login" />;
}
