/**
 * Public API of the auth feature: import { useAuth, AUTH_MODES } from "@features/auth";
 * Fake auth without a backend (localStorage). Swap storage.ts for real API calls when there is a backend.
 */
export * from "./constants";
export * from "./types";
export * from "./storage";
export * from "./hooks";
export { getFormValues, getUserInitials } from "./utils";
