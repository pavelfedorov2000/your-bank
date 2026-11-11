import { useMemo, useSyncExternalStore } from "react";

import { getSessionEmail, getUserByEmail, loginUser, logoutUser, registerUser, subscribeToAuth } from "../storage";

/** Fake auth state (localStorage): current user + actions. Logged out during SSR, real state after hydration. */
export const useAuth = () => {
  const sessionEmail = useSyncExternalStore(subscribeToAuth, getSessionEmail, () => null);
  const user = useMemo(() => (sessionEmail ? getUserByEmail(sessionEmail) : null), [sessionEmail]);

  return { user, login: loginUser, register: registerUser, logout: logoutUser };
};
