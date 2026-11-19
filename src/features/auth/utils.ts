import { AUTH_FIELDS, AUTH_MESSAGES, AUTH_MODES, AUTH_PASSWORD_MIN_LENGTH } from "./constants";
import type { TAuthFieldName, TAuthFormErrors, TAuthMode, TAuthUser } from "./types";

import { mapValues } from "@box/utils";
import { REG_EXP_PATTERNS } from "@box/constants";
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

  return mapValues(AUTH_FIELDS, getValue);
};

/** Data parsed from localStorage is untrusted: a user must have every field as a string. */
export const getIsAuthUser = (value: unknown): value is TAuthUser =>
  typeof value === "object" &&
  value !== null &&
  Object.values(AUTH_FIELDS).every((field) => typeof Reflect.get(value, field) === "string");

/** Error of one field or null: required → email shape → password length (sign up only). */
const getFieldError = (name: TAuthFieldName, value: string, mode: TAuthMode): TNullable<string> => {
  if (!value.trim()) return AUTH_MESSAGES.required;
  if (name === AUTH_FIELDS.email && !REG_EXP_PATTERNS.email.test(value.trim())) return AUTH_MESSAGES.invalidEmail;
  if (name === AUTH_FIELDS.password && mode === AUTH_MODES.signUp && value.length < AUTH_PASSWORD_MIN_LENGTH) {
    return AUTH_MESSAGES.shortPassword;
  }

  return null;
};

/**
 * Validates the fields present in the form (login has no names): { email: "Enter a valid email…" }, {} when all are valid.
 * Runs on submit instead of the browser validation (the form has noValidate).
 */
export const getAuthFormErrors = (values: TAuthUser, fieldNames: readonly TAuthFieldName[], mode: TAuthMode) => {
  const errors: TAuthFormErrors = {};

  fieldNames.forEach((name) => {
    const error = getFieldError(name, values[name], mode);

    if (error) errors[name] = error;
  });

  return errors;
};
