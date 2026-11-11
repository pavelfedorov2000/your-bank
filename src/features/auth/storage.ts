import { AUTH_CHANGE_EVENT, AUTH_MESSAGES, AUTH_STORAGE_KEYS } from "./constants";
import type { TAuthResult, TAuthUser } from "./types";
import { normalizeEmail, readStorage, writeStorage } from "./utils";

const getUsers = (): TAuthUser[] => {
  try {
    const users: unknown = JSON.parse(readStorage(AUTH_STORAGE_KEYS.users) ?? "[]");
    return Array.isArray(users) ? (users as TAuthUser[]) : [];
  } catch {
    return [];
  }
};

const notifyAuthChange = () => window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));

const startSession = (user: TAuthUser): TAuthResult => {
  if (!writeStorage(AUTH_STORAGE_KEYS.session, user.email)) return { ok: false, error: AUTH_MESSAGES.storageUnavailable };
  notifyAuthChange();
  return { ok: true, user };
};

/** Email of the logged-in user (stable string: usable as a useSyncExternalStore snapshot). */
export const getSessionEmail = () => readStorage(AUTH_STORAGE_KEYS.session);

export const getUserByEmail = (email: string) => getUsers().find((user) => user.email === normalizeEmail(email)) ?? null;

export const registerUser = ({ firstName, lastName, email, password }: TAuthUser): TAuthResult => {
  const user = { firstName: firstName.trim(), lastName: lastName.trim(), email: normalizeEmail(email), password };

  if (getUserByEmail(user.email)) return { ok: false, error: AUTH_MESSAGES.userExists };
  if (!writeStorage(AUTH_STORAGE_KEYS.users, JSON.stringify([...getUsers(), user]))) {
    return { ok: false, error: AUTH_MESSAGES.storageUnavailable };
  }

  return startSession(user);
};

export const loginUser = (email: string, password: string): TAuthResult => {
  const user = getUserByEmail(email);
  if (!user || user.password !== password) return { ok: false, error: AUTH_MESSAGES.invalidCredentials };
  return startSession(user);
};

export const logoutUser = () => {
  writeStorage(AUTH_STORAGE_KEYS.session, null);
  notifyAuthChange();
};

/** Calls `onChange` on login / logout in this tab and in other tabs. Returns the unsubscribe function. */
export const subscribeToAuth = (onChange: () => void) => {
  const onStorage = (event: StorageEvent) => {
    if (event.key === null || event.key === AUTH_STORAGE_KEYS.session) onChange();
  };
  
  window.addEventListener(AUTH_CHANGE_EVENT, onChange);
  window.addEventListener("storage", onStorage);
  
  return () => {
    window.removeEventListener(AUTH_CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
};
