import { AUTH_FIELDS, AUTH_MESSAGES, AUTH_MODES, AUTH_PASSWORD_MIN_LENGTH } from "./constants";
import type { TAuthError, TAuthFieldName, TAuthFieldProps, TAuthFormErrors, TAuthMode, TAuthUser } from "./types";

import { getAriaIdList } from "@box/utils";
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

/** Id of a field's input in the auth form: `${formId}-email` (formId comes from useId() in useAuthForm). */
export const getAuthInputId = (formId: string, name: TAuthFieldName) => `${formId}-${name}`;

/** Id of a field's validation message: `${formId}-email-error`. */
export const getAuthFieldErrorId = (formId: string, name: TAuthFieldName) => `${formId}-${name}-error`;

/** Id of the form error (wrong credentials, user exists…): `${formId}-error`. */
export const getAuthFormErrorId = (formId: string) => `${formId}-error`;

type TGetAuthFieldParams = {
  formId: string;
  name: TAuthFieldName;
  message: TNullable<string>;
  formError: TNullable<TAuthError>;
  onInput: () => void;
};

/**
 * Props of one auth form field: input id, invalid state, link to its error and to the form error (aria-describedby),
 * input handler; `error` — the field's message with its id, null when the field is valid.
 */
export const getAuthFieldProps = ({
  formId,
  name,
  message,
  formError,
  onInput,
}: TGetAuthFieldParams): TAuthFieldProps => {
  const fieldError = message ? { id: getAuthFieldErrorId(formId, name), message } : null;

  return {
    inputProps: {
      id: getAuthInputId(formId, name),
      "aria-invalid": Boolean(fieldError || formError),
      "aria-describedby": getAriaIdList(fieldError?.id, formError?.id),
      onInput,
    },
    error: fieldError,
  };
};
