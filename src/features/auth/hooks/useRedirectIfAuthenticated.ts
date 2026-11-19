import { useEffect } from "react";
import { navigate } from "gatsby";

import { useAuth } from "./useAuth";

import { ROUTES } from "@box/constants";

/**
 * Guest-only pages (Login, Sign Up): a logged-in user is sent to `path`, home by default (history entry replaced, so "Back" doesn't loop).
 * Also covers the moment right after a successful login / sign up. Returns true while redirecting.
 */
export const useRedirectIfAuthenticated = (path: string = ROUTES.home) => {
  const { user } = useAuth();

  useEffect(() => {
    if (user) navigate(path, { replace: true });
  }, [user, path]);

  return Boolean(user);
};
