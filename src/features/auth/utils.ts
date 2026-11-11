import type { TNullable } from "@box/types";

import type { TAuthUser } from "./types";

/** localStorage can be missing (SSR) or throw (private mode, blocked site data): every access is guarded. */
export const readStorage = (key: string): TNullable<string> => {
  try {
    return typeof window === "undefined" ? null : window.localStorage.getItem(key);
  } catch {
    return null;
  }
};

/** Writes a value (null removes the key). Returns false if the storage is unavailable. */
export const writeStorage = (key: string, value: TNullable<string>): boolean => {
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
};

/** " Pavel@Mail.com " → "pavel@mail.com": emails are compared case-insensitively. */
export const normalizeEmail = (email: string) => email.trim().toLowerCase();

/** "Pavel" + "Fedorov" → "PF". */
export const getUserInitials = ({ firstName, lastName }: Pick<TAuthUser, "firstName" | "lastName">) =>
  `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

/** Values of the form fields by their `name` (fields of the auth forms come from content.json). */
export const getFormValues = (form: HTMLFormElement) => {
  const values: Record<string, string> = {};
  new FormData(form).forEach((value, name) => {
    values[name] = String(value);
  });
  return values;
};
