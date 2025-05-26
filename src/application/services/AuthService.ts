import type { User } from "../../domain/entities/User";
import { validateUserCredentials } from "../../domain/usecases/LoginUser";
import { useAuthStore } from "../../state/auth";

export function loginUser(user: User): boolean {
  const isValid = validateUserCredentials(user);
  if (isValid) {
    useAuthStore.getState().login();
    localStorage.setItem("isAuthenticated", "true");
  }
  return isValid;
}

export function logoutUser() {
  useAuthStore.getState().logout();
  localStorage.removeItem("isAuthenticated");
}

export function checkAuth(): boolean {
  const stored = localStorage.getItem("isAuthenticated");
  if (stored === "true") {
    useAuthStore.getState().login();
    return true;
  }
  return false;
}
