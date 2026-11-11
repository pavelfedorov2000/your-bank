/**
 * Public API of the auth feature: import { useAuth, AUTH_MODES } from "@features/auth";
 * Fake auth without a backend (localStorage). Swap storage.ts for real API calls when there is a backend.
 */
export { AUTH_CHANGE_EVENT, AUTH_MESSAGES, AUTH_MODES, AUTH_REDIRECT_PATH, AUTH_STORAGE_KEYS } from "./constants";
export type { TAuthMode, TAuthResult, TAuthUser } from "./types";
export {
  getSessionEmail,
  getUserByEmail,
  loginUser,
  logoutUser,
  registerUser,
  subscribeToAuth,
} from "./storage";
export { getFormValues, getUserInitials } from "./utils";
export { useAuth, useRedirectIfAuthenticated } from "./hooks";
