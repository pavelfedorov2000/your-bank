import { AUTH_FIELDS } from "./constants";
import type { TAuthFieldName, TAuthUser } from "./types";

import type { TNullable } from "@box/types";

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

/** Values of the auth form fields by AUTH_FIELDS; a field missing in the form (login has no names) gives "". */
export const getAuthFormValues = (form: HTMLFormElement): TAuthUser => {
  const formData = new FormData(form);
  const getValue = (name: TAuthFieldName) => String(formData.get(name) ?? "");

  return {
    firstName: getValue(AUTH_FIELDS.firstName),
    lastName: getValue(AUTH_FIELDS.lastName),
    email: getValue(AUTH_FIELDS.email),
    password: getValue(AUTH_FIELDS.password),
  };
};

/** Data parsed from localStorage is untrusted: a user must have every field as a string. */
export const getIsAuthUser = (value: unknown): value is TAuthUser =>
  typeof value === "object" &&
  value !== null &&
  Object.values(AUTH_FIELDS).every((field) => typeof Reflect.get(value, field) === "string");
