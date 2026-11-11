import { useEffect } from "react";
import { navigate } from "gatsby";

import { AUTH_REDIRECT_PATH } from "../constants";

import { useAuth } from "./useAuth";

/**
 * Guest-only pages (Login, Sign Up): a logged-in user is sent to `path` (history entry replaced, so "Back" doesn't loop).
 * Also covers the moment right after a successful login / sign up. Returns true while redirecting.
 */
export const useRedirectIfAuthenticated = (path: string = AUTH_REDIRECT_PATH) => {
  const { user } = useAuth();

  useEffect(() => {
    if (user) navigate(path, { replace: true });
  }, [user, path]);

  return Boolean(user);
};
