import type { User } from "../entities/User";

export function validateUserCredentials(user: User): boolean {
  return user.username === "admin" && user.password === "admin";
}
